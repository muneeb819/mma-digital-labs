#!/usr/bin/env bash
# ============================================================
# mma-digital-labs — one-shot EC2 deployment (Ubuntu 22.04/24.04)
#
# Usage on the server:
#   curl -fsSL https://raw.githubusercontent.com/muneeb819/mma-digital-labs/main/deploy/ec2-setup.sh | sudo bash
#
# Re-running is safe: it pulls latest main, rebuilds, migrates and restarts.
#
# Tunables (env vars, all optional):
#   DOMAIN=13.239.227.88   public IP or domain name of this server
#   APP_DIR=/var/www/mma-digital-labs
#   DB_NAME=mma_labs  DB_USER=mma_labs
# ============================================================
set -euo pipefail

DOMAIN="${DOMAIN:-13.239.227.88}"
REPO_URL="${REPO_URL:-https://github.com/muneeb819/mma-digital-labs.git}"
APP_DIR="${APP_DIR:-/var/www/mma-digital-labs}"
DB_NAME="${DB_NAME:-mma_labs}"
DB_USER="${DB_USER:-mma_labs}"
RUN_AS="${SUDO_USER:-root}"

# Bare IP → plain HTTP → Secure cookies would be rejected by browsers.
# A real domain → HTTPS + Secure cookies.
if [[ "$DOMAIN" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  SCHEME="http"; COOKIE_SECURE="false"
else
  SCHEME="https"; COOKIE_SECURE="true"
fi
SITE_URL="$SCHEME://$DOMAIN"

log() { printf '\n\033[1;36m▸ %s\033[0m\n' "$*"; }

export DEBIAN_FRONTEND=noninteractive

log "1/8 Swap (t3.micro has 1 GB — builds need breathing room)"
if ! swapon --show | grep -q .; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

log "2/8 Packages: nginx, postgresql, git, Node.js 20, pm2"
apt-get update -y
apt-get install -y nginx postgresql git curl ca-certificates
if ! command -v node >/dev/null || [[ "$(node -v)" != v20* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
npm install -g pm2

log "3/8 Application code → $APP_DIR"
mkdir -p "$APP_DIR"
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" fetch --all --quiet && git -C "$APP_DIR" reset --hard origin/HEAD --quiet
else
  git clone "$REPO_URL" "$APP_DIR"
fi
chown -R "$RUN_AS":"$RUN_AS" "$APP_DIR"

log "4/8 PostgreSQL database ($DB_NAME)"
systemctl enable --now postgresql
sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE ROLE $DB_USER LOGIN PASSWORD '$(openssl rand -hex 18)';"
sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

log "5/8 Environment (.env)"
cd "$APP_DIR"
if [ ! -f .env ]; then
  DB_PASS="$(openssl rand -hex 18)"
  sudo -u postgres psql -c "ALTER ROLE $DB_USER WITH PASSWORD '$DB_PASS';"
  cat > .env <<EOF
DATABASE_URL="postgresql://$DB_USER:$DB_PASS@127.0.0.1:5432/$DB_NAME?sslmode=disable"
ADMIN_PASSWORD="$(openssl rand -hex 18)"
SESSION_SECRET="$(openssl rand -hex 24)"
COOKIE_SECURE="$COOKIE_SECURE"
LEAD_WEBHOOK_URL=""
NEXT_PUBLIC_SITE_URL="$SITE_URL"
EOF
  echo "    created .env (fresh credentials)"
else
  echo "    .env already exists — keeping your credentials"
fi

log "6/8 Install, migrate, build (as $RUN_AS)"
sudo -u "$RUN_AS" bash -c "cd '$APP_DIR' && npm ci && npx prisma db push && npm run build"

log "7/8 PM2 process manager"
sudo -u "$RUN_AS" bash -c "cd '$APP_DIR' && (pm2 describe mma-labs >/dev/null 2>&1 && pm2 restart mma-labs --update-env || pm2 start npm --name mma-labs -- run start) && pm2 save"
pm2 startup systemd -u "$RUN_AS" --hp "$(eval echo "~$RUN_AS")" >/dev/null 2>&1 || true

log "8/8 Nginx reverse proxy"
cat > /etc/nginx/sites-available/mma-labs <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    client_max_body_size 2m;

    location / {
        proxy_pass http://127.0.0.1:3100;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
ln -sf /etc/nginx/sites-available/mma-labs /etc/nginx/sites-enabled/mma-labs
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

ADMIN_PW="$(grep '^ADMIN_PASSWORD=' "$APP_DIR/.env" | cut -d'"' -f2)"
log "✅ Deployment complete"
echo "
   Site:       $SITE_URL
   Catalog:    $SITE_URL/products
   Admin:      $SITE_URL/admin
   Admin password:  $ADMIN_PW
   (stored in $APP_DIR/.env — change it any time and run: pm2 restart mma-labs)

   Tip: when you attach a real domain + SSL (certbot), set
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com and COOKIE_SECURE=true in
   $APP_DIR/.env, then re-run this script to rebuild + restart.
"
