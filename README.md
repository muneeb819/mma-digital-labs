# MMA Digital Labs — Lead-Generation Storefront

A storefront that sells **your** software systems: showcases every project you own
(AI business-development platform, online casino platform, CRM, telecom compliance
tooling, BD system) and converts visitors into a managed buyer pipeline.

Built as a single deployable Next.js app — no separate backend needed.

## What it does

- **Public catalog** (`/products`) of real, working systems — each with features,
  tech stack, live-demo link (where available) and a per-product inquiry form
- **Three offers** presented everywhere: *License the source · Commission a custom
  build · Book a live demo*
- **Lead capture API** with validation, honeypot spam trap, optional webhook
  notification (Slack/Discord/anything that accepts POST)
- **Owner dashboard** (`/admin`, password-gated): pipeline board with statuses
  New → Contacted → Proposal sent → Won/Lost, budget & product filters, delete,
  click-to-email

## Run locally

```bash
cd mma-digital-labs
npm install

# The app uses PostgreSQL (works with a local Postgres, Docker, or a free Neon
# branch — see .agents/skills/neon/ for Neon setup). Example with Docker:
#   docker run -d --name labs-db -e POSTGRES_PASSWORD=dev -p 5432:5432 postgres:16
# then set DATABASE_URL in .env (copy .env.example first).

cp .env.example .env       # then fill in ADMIN_PASSWORD (required!)
npx prisma db push         # creates the Lead table
npm run dev                # http://localhost:3100
```

Admin dashboard: `/admin` — password comes from `ADMIN_PASSWORD` in `.env`.
**There is no default password**: the dashboard stays locked until you set one,
and an empty password is always rejected. Use a long random value.

## Environment

| Variable            | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `DATABASE_URL`      | Prisma connection (PostgreSQL — local, Docker, Neon) |
| `ADMIN_PASSWORD`    | Password for the `/admin` dashboard. **Required** — the dashboard is disabled until set; empty passwords are rejected |
| `SESSION_SECRET`    | Optional. Peppers the admin session cookie so it can't be derived from the password alone |
| `COOKIE_SECURE`     | Optional. Set to `false` **only** for plain-HTTP deploys (bare-IP server before SSL) so the admin cookie works over HTTP. Defaults to `true` in production |
| `LEAD_WEBHOOK_URL`  | Optional. Every new lead is POSTed there as `{text}` — point it at a Slack/Discord webhook to get pinged instantly |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap/SEO metadata       |

## Editing your catalog

All products live in **`lib/products.ts`** as plain data — name, tagline,
description, features, stack, category, icon/gradient, live-demo URL. Add a new
product by appending one object; the catalog page, product page, sitemap of
routes and inquiry forms all pick it up automatically.

## Deploying (your own EC2)

One command on a fresh EC2 instance (works on **Amazon Linux 2023/2** and
**Ubuntu/Debian** — the script auto-detects):

```bash
curl -fsSL https://raw.githubusercontent.com/muneeb819/mma-digital-labs/main/deploy/ec2-setup.sh | sudo bash
```

The script sets up swap (for t3.micro builds), Node 20, PostgreSQL, Nginx,
PM2, generates strong secrets, and prints the site + admin URLs and the
generated `ADMIN_PASSWORD`. Re-run it any time to redeploy the latest `main`.

## Deploying (Vercel)

The app is Vercel-ready:

1. Push this repo to GitHub → import into Vercel.
2. Switch `prisma/schema.prisma` datasource from `sqlite` to `postgresql` and set
   `DATABASE_URL` to a hosted Postgres (Vercel Postgres / Neon / Supabase).
3. Set `ADMIN_PASSWORD`, `SESSION_SECRET` (recommended) and optionally `LEAD_WEBHOOK_URL` in Vercel env vars.
4. Point your domain at it.

> Any networked PostgreSQL works on Vercel (Neon, Vercel Postgres, Supabase) —
> the schema is already `postgresql`.

## Production notes

- Admin auth is a single shared password issuing an HMAC session cookie
  (httpOnly, `Secure` in production, 14-day expiry). Set `SESSION_SECRET` so the
  cookie isn't derivable from the password; upgrade to real accounts/OAuth if
  teammates join.
- Per-IP rate limiting is built in for `/api/leads` and `/api/admin/session`
  (in-memory, per-instance). For heavy traffic add an edge/WAF limit
  (Vercel WAF, Upstash, Cloudflare) in front of it.
- The lead API also has a honeypot spam trap, length caps, and whitelisted
  offer-type/budget values.
- Consider adding screenshots/GIFs per product — drop them in `public/` and add an
  image field to the product data.
