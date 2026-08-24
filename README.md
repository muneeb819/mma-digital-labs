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

```powershell
cd mma-digital-labs
npm install
npx prisma db push      # creates SQLite db for leads
npm run dev             # http://localhost:3100
```

Admin dashboard: `/admin` — password comes from `ADMIN_PASSWORD` in `.env`
(default `labs-admin-2026`; change it).

## Environment

| Variable           | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `DATABASE_URL`     | Prisma connection (SQLite file locally)            |
| `ADMIN_PASSWORD`   | Password for the `/admin` owner dashboard          |
| `LEAD_WEBHOOK_URL` | Optional. Every new lead is POSTed there as `{text}` — point it at a Slack/Discord webhook to get pinged instantly |

## Editing your catalog

All products live in **`lib/products.ts`** as plain data — name, tagline,
description, features, stack, category, icon/gradient, live-demo URL. Add a new
product by appending one object; the catalog page, product page, sitemap of
routes and inquiry forms all pick it up automatically.

## Deploying (Vercel)

The app is Vercel-ready:

1. Push this repo to GitHub → import into Vercel.
2. Switch `prisma/schema.prisma` datasource from `sqlite` to `postgresql` and set
   `DATABASE_URL` to a hosted Postgres (Vercel Postgres / Neon / Supabase).
3. Set `ADMIN_PASSWORD` (and optionally `LEAD_WEBHOOK_URL`) in Vercel env vars.
4. Point your domain at it.

> Note: SQLite only works locally — serverless platforms need a network database.

## Production notes

- Admin auth is a single shared password issuing an HMAC-derived httpOnly cookie —
  fine for a personal pipeline; upgrade to real accounts/OAuth if teammates join.
- Add rate limiting on `/api/leads` (e.g. Vercel WAF or Upstash) before heavy traffic.
- Consider adding screenshots/GIFs per product — drop them in `public/` and add an
  image field to the product data.
