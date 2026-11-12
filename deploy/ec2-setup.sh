#!/usr/bin/env bash
# ============================================================
# mma-digital-labs — one-shot EC2 deployment
#
# Supports:
#   • Amazon Linux 2023 / Amazon Linux 2   (dnf / yum)   ← AWS default AMI
#   • Ubuntu 22.04/24.04 / Debian           (apt-get)
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

log() { printf '\n\033[1;36m▸ %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31m✖ %s\033[0m\n' "$*"; exit 1; }

# ---------- OS family detection ----------
if command -v apt-get >/dev/null 2>&1; then
  PKG_FAMILY="debian"
elif command -v dnf >/dev/null 2>&1; then
  PKG_FAMILY="rhel"; PM="dnf"
elif command -v yum >/dev/null 2>&1; then
  PKG_FAMILY="rhel"; PM="yum"
else
  fail "Unsupported OS — need apt-get, dnf or yum. /etc/os-release: $(cat /etc/os-release 2>/dev/null | head -3 | tr '\n' ' ')"
fi
if [ -r /etc/os-release ]; then . /etc/os-release; OS_NAME="$NAME $VERSION_ID"; else OS_NAME="unknown"; fi
log "0/8 Detected: $OS_NAME (family: $PKG_FAMILY)"

# Bare IP → plain HTTP → Secure cookies would be rejected by browsers.
if [[ "$DOMAIN" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  SCHEME="http"; COOKIE_SECURE="false"
else
  SCHEME="https"; COOKIE_SECURE="true"
fi
SITE_URL="$SCHEME://$DOMAIN"

export DEBIAN_FRONTEND=noninteractive

# ---------- Package helpers ----------
# Amazon Linux 2023 ships `curl-minimal`, which CONFLICTS with the full `curl`
# package — asking dnf for `curl` aborts the whole transaction. curl-minimal
# provides a working curl binary, so only install curl when none exists.
install_base_pkgs() {
  if [ "$PKG_FAMILY" = "debian" ]; then
    apt-get update -y
    apt-get install -y nginx postgresql git curl ca-certificates openssl
  else
    pkgs="nginx git ca-certificates openssl"
    command -v curl >/dev/null 2>&1 || pkgs="$pkgs curl"
    echo "    installing: $pkgs"
    # --allowerasing fallback covers other curl-minimal-style conflicts
    $PM install -y $pkgs || $PM install -y --allowerasing $pkgs
  fi
}

install_postgres() {
  [ "$PKG_FAMILY" = "debian" ] && { apt-get install -y postgresql; return; }
  # Amazon Linux 2023 ships versioned packages; Amazon Linux 2 falls back.
  if $PM install -y postgresql16-server postgresql16 2>/dev/null; then return; fi
  if $PM install -y postgresql15-server postgresql15 2>/dev/null; then return; fi
  if command -v amazon-linux-extras >/dev/null 2>&1; then
    amazon-linux-extras enable postgresql11 >/dev/null 2>&1 || true
    $PM clean metadata >/dev/null 2>&1 || true
  fi
  $PM install -y postgresql-server postgresql || $PM install -y --allowerasing postgresql-server postgresql
}

install_node() {
  if command -v node >/dev/null 2>&1 && [[ "$(node -v)" == v20* ]]; then return; fi
  if [ "$PKG_FAMILY" = "debian" ]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
  else
    curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - || \
      echo "    NodeSource setup failed — will try distro packages"
    if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != v20* ]]; then
      $PM install -y nodejs20 npm 2>/dev/null || $PM install -y nodejs npm
    fi
  fi
  [[ "$(node -v 2>/dev/null)" == v20* ]] || echo "    ⚠ installed Node $(node -v 2>/dev/null) — v20 recommended"
}

# ============================================================
log "1/8 Swap (t3.micro has 1 GB — builds need breathing room)"
if ! swapon --show | grep -q .; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo "    2G swap created"
else
  echo "    swap already active — skipping"
fi

log "2/8 Packages: nginx, postgresql, git, Node.js 20, pm2"
install_base_pkgs
install_postgres
install_node
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
if [ "$PKG_FAMILY" = "rhel" ]; then
  # RHEL-family does NOT auto-initialize the data directory on install.
  PG_INITIALIZED=false
  for d in /var/lib/pgsql/data /var/lib/pgsql/*/data; do
    [ -f "$d/PG_VERSION" ] && PG_INITIALIZED=true
  done
  if ! $PG_INITIALIZED; then
    postgresql-setup --initdb >/dev/null 2>&1 || postgresql-setup initdb >/dev/null 2>&1 || \
      sudo -u postgres initdb -D /var/lib/pgsql/data
    echo "    data directory initialized"
  fi
  # RHEL-family ships pg_hba with `ident` for TCP — which rejects password
  # auth and breaks DATABASE_URL. Force md5 (works for every server version).
  for PGHBA in /var/lib/pgsql/data/pg_hba.conf /var/lib/pgsql/*/data/pg_hba.conf; do
    [ -f "$PGHBA" ] || continue
    sed -i -E 's/^(host[[:space:]]+all[[:space:]]+all[[:space:]]+(127\.0\.0\.1\/32|::1\/128)[[:space:]]+)(ident|md5|peer)$/\1md5/' "$PGHBA"
    echo "    pg_hba.conf: TCP auth set to md5 ($PGHBA)"
  done
  # SELinux blocks nginx → 127.0.0.1:3100 otherwise (classic 502).
  if command -v getenforce >/dev/null 2>&1 && [ "$(getenforce)" != "Disabled" ]; then
    setsebool -P httpd_can_network_connect 1
    echo "    SELinux: allowed nginx to proxy to the app"
  fi
fi
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
  chown "$RUN_AS":"$RUN_AS" .env
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
if [ "$PKG_FAMILY" = "debian" ]; then
  NGINX_CONF=/etc/nginx/sites-available/mma-labs
  ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/mma-labs
  rm -f /etc/nginx/sites-enabled/default
else
  NGINX_CONF=/etc/nginx/conf.d/mma-labs.conf
  rm -f /etc/nginx/conf.d/default.conf
fi
cat > "$NGINX_CONF" <<EOF
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
nginx -t && systemctl enable --now nginx && systemctl reload nginx

# ---------- Health check ----------
sleep 3
APP_CODE=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3100/ || echo "000")
WEB_CODE=$(curl -s -o /dev/null -w '%{http_code}' -H "Host: $DOMAIN" http://127.0.0.1/ || echo "000")

ADMIN_PW="$(grep '^ADMIN_PASSWORD=' "$APP_DIR/.env" | cut -d'"' -f2)"
log "✅ Deployment complete (app: HTTP $APP_CODE direct, HTTP $WEB_CODE via nginx)"
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
