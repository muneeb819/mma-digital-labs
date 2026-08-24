import type { OfferType } from "./products";

export interface SeoPage {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  productKey?: string;
  offer: OfferType;
  intro: string[];
  bullets: string[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "turnkey-online-casino-platform",
    keyword: "Turnkey online casino platform",
    title: "Turnkey Online Casino Platform — License Working Source Code",
    description:
      "Launch a real-money gaming operation on a turnkey casino platform with double-entry wallet, provider aggregator, KYC and GGR back office. License the source today.",
    productKey: "casino",
    offer: "LICENSE",
    intro: [
      "Most 'turnkey casino' vendors rent you a black box. This is different: a complete aggregator-model casino platform whose full source code you license and own — wallet, game aggregation, back office, everything.",
      "It was built ledger-first by engineers who understand that in gaming, money integrity is the product. Every bet and win settles through a double-entry ledger with an append-only audit trail.",
    ],
    bullets: [
      "Seamless-wallet settlement: signed bet/win/rollback callbacks, idempotent rounds",
      "One aggregator adapter — plug Hub88/SOFTSWISS-style providers without rework",
      "KYC queue, deposit limits and self-exclusion built into the core",
      "Back office with live GGR per provider, per game",
    ],
    faqs: [
      {
        q: "Do I need a gambling license to run it?",
        a: "Yes — software is only half of a gaming operation. You need jurisdiction licensing (e.g. Anjouan, Malta), certified RNGs where required, and approved payment processing. The platform is engineered to be the software layer under your license.",
      },
      {
        q: "Which game providers can I connect?",
        a: "The aggregator adapter interface works with any provider exposing a seamless-wallet API (Hub88-style contract). One integration gives you their whole catalog.",
      },
      {
        q: "Can you customize branding and features?",
        a: "Yes — most buyers start with a license plus a customization sprint: branding, payment rails for their market, bonus engine, affiliate module.",
      },
    ],
  },
  {
    slug: "online-casino-source-code-for-sale",
    keyword: "Online casino source code for sale",
    title: "Online Casino Source Code for Sale — Own the Full Platform",
    description:
      "Buy complete online casino source code: Next.js + NestJS, double-entry wallet, game aggregator integration, admin back office. One-time license, full handover.",
    productKey: "casino",
    offer: "LICENSE",
    intro: [
      "Buying source code beats renting a white label: no monthly revenue share, no vendor lock-in, and the freedom to change anything. This listing is a working casino platform — not templates or mockups.",
      "You get the codebase, a walkthrough with the engineer who wrote it, and deployment support on your own infrastructure.",
    ],
    bullets: [
      "Full TypeScript stack: NestJS API, Next.js front end, Prisma ORM",
      "Double-entry financial ledger designed for auditability",
      "Player accounts, KYC workflow, responsible-gambling controls",
      "One-time license — no revenue share, ever",
    ],
    faqs: [
      {
        q: "Is this a demo or production system?",
        a: "It's a production-grade reference implementation running end-to-end (deposits, play, settlement, reporting). Production deployment requires your infrastructure, database hardening, and compliance setup — we help with all three.",
      },
      {
        q: "What about payment integration?",
        a: "The platform ships with a PSP stub behind a clean interface. We integrate your gambling-friendly PSP or crypto rails as a customization sprint.",
      },
      {
        q: "Can I see it before buying?",
        a: "Yes — book a live demo and walk through lobby, gameplay, wallet and back office with the builder.",
      },
    ],
  },
  {
    slug: "how-to-start-an-online-casino-business",
    keyword: "How to start an online casino business",
    title: "How to Start an Online Casino Business — The Software Layer Explained",
    description:
      "A practical breakdown of starting an online casino: license, games, payments, platform. See how owning your platform source changes the economics.",
    productKey: "casino",
    offer: "CUSTOM",
    intro: [
      "Starting an online casino comes down to four layers: a gambling license, games (via aggregators), payment rails, and the platform that ties them together. Most first-time operators overpay on the last one — renting a closed platform forever instead of owning it.",
      "This page explains the build-vs-rent tradeoff from operators who've made it, and shows the platform layer we provide as licensed source code you control.",
    ],
    bullets: [
      "License first: pick a jurisdiction before writing any code",
      "Games: one aggregator contract delivers hundreds of titles",
      "Payments: gambling-approved PSPs or stablecoin rails",
      "Platform: rent a black box — or own this one outright",
    ],
    faqs: [
      {
        q: "How much does the software layer really cost?",
        a: "Rented platforms typically take ongoing revenue share plus per-month fees. Licensing source is a one-time cost plus optional customization — after year one it usually pays for itself.",
      },
      {
        q: "How long until launch?",
        a: "With license and payments in progress in parallel: typically 4–8 weeks from license grant to soft launch using this platform as the base.",
      },
      {
        q: "Do you help with operations too?",
        a: "We're engineers, not lawyers. We handle software, integrations and infrastructure; licensing and compliance belong to your legal advisors.",
      },
    ],
  },
  {
    slug: "white-label-casino-solution",
    keyword: "White label casino solution alternative",
    title: "White Label Casino Alternative — Own Your Platform Code",
    description:
      "Compare white-label casino rentals vs owning licensed source code. Full platform: aggregator, seamless wallet, KYC, back office. No revenue share.",
    productKey: "casino",
    offer: "LICENSE",
    intro: [
      "White-label casino packages look cheap until you do the math: setup fee + monthly platform fee + revenue share, forever, on someone else's code. A licensed-source alternative flips every term.",
      "Pay once, run on your servers, keep 100% of GGR after your costs, and modify anything — providers, bonuses, UX — without asking a vendor.",
    ],
    bullets: [
      "No monthly platform fees, no revenue share",
      "Your infrastructure, your data, your rules",
      "Change anything — it's your code",
      "Same capabilities: aggregator catalog, seamless wallet, KYC/RG, reporting",
    ],
    faqs: [
      {
        q: "Isn't white-label faster to launch?",
        a: "Marginally. But you'll spend years paying for that head start. With source handover and our deployment support, launch timelines are close — ownership lasts much longer.",
      },
      {
        q: "Who maintains it after purchase?",
        a: "You can hire us on retainer, use your own team, or both. There's no technical lock-in either way.",
      },
    ],
  },
  {
    slug: "ai-proposal-writing-software",
    keyword: "AI proposal writing software for agencies",
    title: "AI Proposal Writing Software That Also Finds the Leads",
    description:
      "MBPW scans opportunity markets, scores leads and writes tailored proposals automatically — a live, deployed AI BD platform you can license or extend.",
    productKey: "mbpw",
    offer: "DEMO",
    intro: [
      "There are plenty of AI tools that polish a proposal you already wrote. MBPW starts earlier in the funnel: it continuously scans job boards and opportunity markets, scores what fits you, drafts the tailored proposal, and tracks follow-up.",
      "It's not a pitch deck — it's a deployed platform running in production, with a live demo you can click through right now.",
    ],
    bullets: [
      "Continuous multi-source opportunity discovery and scoring",
      "Proposals generated from your positioning and past wins",
      "Outreach sequences with follow-up automation",
      "Pipeline analytics: what was found, sent, opened, won",
    ],
    faqs: [
      {
        q: "Is there a live demo?",
        a: "Yes — MBPW is deployed publicly. Click the Live Demo button on its product page and explore with sample data.",
      },
      {
        q: "Can it learn my agency's voice?",
        a: "Proposal generation is driven by configurable positioning inputs — services, case studies, pricing logic — so output matches how you sell.",
      },
      {
        q: "License or SaaS?",
        a: "Both paths exist: license the source and run it privately, or commission us to host and customize it for your team.",
      },
    ],
  },
  {
    slug: "automate-business-development-process",
    keyword: "Automate your business development process",
    title: "Automate Business Development — From Lead Hunt to Proposal",
    description:
      "See how MBPW automates the BD cycle: market scanning, lead scoring, proposal drafting and outreach — deployed and available to license.",
    productKey: "mbpw",
    offer: "CUSTOM",
    intro: [
      "Business development dies by manual repetition: scroll job boards, copy requirements, write another bespoke proposal, forget the follow-up. Automating that loop is exactly what MBPW does.",
      "If your team sells services repeatedly, automating the top of the funnel compounds weekly — more shots on goal for the same headcount.",
    ],
    bullets: [
      "Replace hours of daily board-scrolling with scored opportunity feeds",
      "First-draft proposals in minutes, tuned by your positioning rules",
      "Structured follow-up so warm leads never evaporate",
      "Extensible: add sources, scoring models, channels",
    ],
    faqs: [
      {
        q: "We have a CRM — does this replace it?",
        a: "No, it feeds it. MBPW covers discovery-to-proposal; opportunities then flow into your CRM (or ours) for closing.",
      },
      {
        q: "Can you tailor it to our niche?",
        a: "That's the usual engagement: we configure sources, scoring weights and proposal templates around your market, usually inside a fixed-scope sprint.",
      },
    ],
  },
  {
    slug: "freelance-lead-generation-software",
    keyword: "Lead generation software for freelancers and studios",
    title: "Freelance Lead Generation Software — Built, Not Promised",
    description:
      "A working lead-gen and proposal platform (MBPW) plus a licensable CRM (LeadIQ): the full freelance sales stack, available with source code.",
    productKey: "mbpw",
    offer: "DEMO",
    intro: [
      "Freelancers don't lack hustle; they lack pipeline. Two systems solve that: MBPW finds opportunities and writes proposals while you sleep, and LeadIQ organizes everyone you've talked to.",
      "Both are real products with source available — license one, or combine them into your personal selling machine.",
    ],
    bullets: [
      "Opportunity feeds matched to your skills and rates",
      "AI-drafted proposals with your case studies baked in",
      "CRM pipeline for every conversation that follows",
      "Source licenses available — no subscriptions",
    ],
    faqs: [
      {
        q: "Do the two systems integrate?",
        a: "They're separate codebases today. As a custom engagement we wire MBPW outputs directly into the CRM pipeline.",
      },
      {
        q: "Solo-friendly pricing?",
        a: "Licensing is one-time. Book a demo and we'll scope what fits a solo operation versus a studio.",
      },
    ],
  },
  {
    slug: "crm-source-code-for-sale",
    keyword: "CRM source code for sale",
    title: "CRM Source Code for Sale — White-Label and Resell",
    description:
      "LeadIQ CRM: clean TypeScript codebase covering capture, pipeline stages, activities and reporting. Buy the source, brand it, resell or run internally.",
    productKey: "leadiq",
    offer: "LICENSE",
    intro: [
      "Per-seat SaaS CRMs cost thousands per rep per year — forever. LeadIQ is a compact CRM codebase you buy once: capture, qualify, track and report, under your own brand.",
      "Agencies use it internally; entrepreneurs rebrand and resell it into niches. Clean TypeScript keeps either path cheap.",
    ],
    bullets: [
      "Lead capture with deduplication",
      "Configurable pipeline stages and owners",
      "Activity tracking and conversion reports",
      "Small enough to fully understand, extend and maintain",
    ],
    faqs: [
      {
        q: "Can I resell it under my brand?",
        a: "Licensing terms cover white-label resale — let's talk about your target market and structure.",
      },
      {
        q: "What stack is it on?",
        a: "TypeScript/Node with a REST API — easy hiring pool, easy hosting.",
      },
    ],
  },
  {
    slug: "white-label-crm-for-agencies",
    keyword: "White label CRM for agencies",
    title: "White Label CRM for Agencies — Your Brand, Your Code",
    description:
      "Give clients a branded CRM without building one: license LeadIQ source, apply your brand, bundle it with your services. One-time license model.",
    productKey: "leadiq",
    offer: "CUSTOM",
    intro: [
      "Agencies that manage pipelines for clients eventually get asked: 'can we get your CRM?' White-labeling a rented SaaS means thin margins forever. Licensing source means the CRM becomes your product line.",
      "LeadIQ is deliberately small and clean — the kind of codebase an agency can actually rebrand, extend and operate.",
    ],
    bullets: [
      "Your logo, domain, colors — clients never see us",
      "Extend freely: add modules clients ask for",
      "Charge monthly for hosting/support — you keep it all",
      "Optional customization sprints from the original authors",
    ],
    faqs: [
      {
        q: "How many client instances can we run?",
        a: "Licensing is structured per-reseller, not per-instance — deploy as many branded instances as your business needs.",
      },
      {
        q: "Can you add features we need first?",
        a: "Yes — typical pre-sale customization: fields, stages, integrations, reporting tweaks.",
      },
    ],
  },
  {
    slug: "lightweight-crm-for-small-teams",
    keyword: "Lightweight CRM for small teams",
    title: "A Lightweight CRM Small Teams Actually Keep Using",
    description:
      "No bloat, no per-seat creep: LeadIQ covers capture → pipeline → activity → report. Run it yourself from source or let us host it for you.",
    productKey: "leadiq",
    offer: "LICENSE",
    intro: [
      "Big CRMs bury small teams in features nobody uses — then raise per-seat prices. LeadIQ is the opposite bet: just the pipeline essentials, fast UI, one page of config.",
      "Run it on a $5 VPS from source, or have us host and maintain it.",
    ],
    bullets: [
      "Capture → qualify → contact → win, nothing else in the way",
      "Self-host from source (one-time license) or managed by us",
      "Fast enough that reps actually update it",
      "Yours to grow: add modules when *you* need them",
    ],
    faqs: [
      {
        q: "Import from spreadsheets?",
        a: "Yes — CSV import gets your sheet-based pipeline in during onboarding.",
      },
      {
        q: "Mobile friendly?",
        a: "Responsive web UI works fine on phones; dedicated mobile apps are a customization option.",
      },
    ],
  },
  {
    slug: "vici-dialer-cdr-scrubber",
    keyword: "Vici Dialer CDR scrubber",
    title: "Vici Dialer CDR Scrubber — Fraud Detection Built In",
      description:
      "Enterprise CDR scrubbing for VICIdialer: fraud rule engine, data profiling, geo-analysis and audit reports. Go-powered throughput, source license available.",
    productKey: "vici-scrubber",
    offer: "LICENSE",
    intro: [
      "Dialer call records pile up faster than anyone audits them — which is exactly where fraud and compliance problems hide. This scrubber processes Vici CDRs at volume and flags what humans miss: duplicate patterns, geo anomalies, suspicious ratios.",
      "Written in Go for throughput, with reporting your compliance team will actually read.",
    ],
    bullets: [
      "Fraud detection rule engine over raw CDRs",
      "Data profiling with anomaly flagging",
      "Geo/DID analysis across campaigns",
      "Audit-ready reports; runs as CLI or service",
    ],
    faqs: [
      {
        q: "Which dialer versions are supported?",
        a: "Built against VICIdial CDR formats; schema adapters make other sources straightforward.",
      },
      {
        q: "On-prem or cloud?",
        a: "Either — it's a self-contained binary/service. Many compliance teams require on-prem; that's fully supported.",
      },
    ],
  },
  {
    slug: "cdr-fraud-detection-software",
    keyword: "CDR fraud detection software",
    title: "CDR Fraud Detection Software — Catch It Before the Regulator Does",
    description:
      "Rule-based fraud detection over telecom call detail records: patterns, duplicates, geo anomalies. License a working Go scrubber with source.",
    productKey: "vici-scrubber",
    offer: "LICENSE",
    intro: [
      "Telecom fraud — artificial inflation, call pumping, ghost campaigns — is found late because nobody re-reads millions of rows by hand. Automated scrubbing turns that haystack into a short flagged list.",
      "Our scrubber applies configurable fraud rules to CDR streams and produces evidence-ready reports.",
    ],
    bullets: [
      "Configurable rules: thresholds, ratios, repetition, geography",
      "Flags ranked by severity, with drill-down evidence",
      "Batch or scheduled processing",
      "Source license: tune detection to your traffic",
    ],
    faqs: [
      {
        q: "Does it use machine learning?",
        a: "Detection is deterministic and explainable by design — regulators accept 'here's the rule that fired' better than a model score. ML layers can be added later.",
      },
      {
        q: "What volumes can it handle?",
        a: "Go core comfortably handles daily dialer-scale batches; benchmarking against your volumes is part of presales.",
      },
    ],
  },
  {
    slug: "telecom-compliance-reporting-tools",
    keyword: "Telecom compliance reporting tools",
    title: "Telecom Compliance Reporting Without the Spreadsheet Marathon",
    description:
      "Automated CDR profiling, geo analysis and audit reports for compliance teams. Deploy the scrubber on-prem or cloud — source license available.",
    productKey: "vici-scrubber",
    offer: "CUSTOM",
    intro: [
      "Compliance reporting is usually a quarterly fire drill: export CSVs, pivot until midnight, hope nothing slipped through. The scrubber automates the pipeline from raw CDRs to a signed-off report pack.",
      "Because you license the source, the report formats match your regulator exactly — not whatever a vendor decided.",
    ],
    bullets: [
      "Scheduled runs produce consistent report packs",
      "Profiling summaries + anomaly appendices included",
      "On-prem deployment for data-residency requirements",
      "Report templates customized in engagement sprints",
    ],
    faqs: [
      {
        q: "Can reports match our regulatory template?",
        a: "Yes — template alignment is standard customization work.",
      },
      {
        q: "Who operates it day to day?",
        a: "It runs scheduled and hands back PDFs/reports; no specialist needed. Managed operation is also available.",
      },
    ],
  },
  {
    slug: "founder-led-sales-system",
    keyword: "Founder-led sales system for consultancies",
    title: "A Founder-Led Sales System for Consultancies",
      description:
      "Personal-brand site fused with AI-assisted BD workflows: positioning, opportunity matching and outreach content. A base you can license and shape.",
    productKey: "bd-system",
    offer: "LICENSE",
    intro: [
      "In founder-led sales, the founder *is* the channel — but positioning, prospecting and content eat all their hours. This system pairs a personal-brand web presence with AI-assisted BD tooling so the founder's time goes to conversations, not prep.",
      "License it as a starting point and shape it into your firm's growth engine.",
    ],
    bullets: [
      "Positioning site that makes referrals land somewhere real",
      "AI-assisted outreach content from your expertise",
      "Opportunity matching workflow",
      "Clean module structure for extension",
    ],
    faqs: [
      {
        q: "Website builder or system?",
        a: "System — the site is the public face; the value is the BD workflow underneath.",
      },
      {
        q: "Can it match my niche terminology?",
        a: "Yes — positioning inputs and content templates are yours to define; we help calibrate them.",
      },
    ],
  },
  {
    slug: "buy-source-code-instead-of-building",
    keyword: "Buy source code vs hiring developers",
    title: "Buy Source Code vs Hiring Developers — The Real Math",
    description:
      "Custom builds cost 4–6 months and $30k+. Buying proven source cuts that to days. Compare paths honestly, including when building still wins.",
    offer: "CUSTOM",
    intro: [
      "Building software from scratch is right when you're inventing something new. But most businesses need solved problems: a CRM, a pipeline, a platform backbone. For those, licensing proven source and customizing it is dramatically cheaper and faster.",
      "Here's the honest comparison from people who do both for a living.",
    ],
    bullets: [
      "From scratch: $30k–$100k+, 4–9 months, unknown quality until v2",
      "Licensed source: fixed price, running in weeks, known architecture",
      "Customization on top of source: fraction of greenfield cost",
      "When building wins: genuinely novel products, defensible IP",
    ],
    faqs: [
      {
        q: "Is bought code a security risk?",
        a: "Less than most think — you can audit every line and patch it yourselves. Closed SaaS is the actual black box.",
      },
      {
        q: "What if I outgrow it?",
        a: "You own it — extend it, or bring any team up to speed. Clean architecture matters here; ours is written to be handed over.",
      },
    ],
  },
  {
    slug: "custom-mvp-development-service",
    keyword: "Custom MVP development service",
    title: "Custom MVP Development — From Brief to Deployed in Weeks",
    description:
      "Fixed-scope MVP builds on proven foundations: Next.js/NestJS/AI integrations. Proposal within 48 hours of your brief, deployed product at handover.",
    offer: "CUSTOM",
    intro: [
      "An MVP has one job: put a working thing in front of users fast. Our approach starts from proven bases — platforms we've already shipped — so week one is configuration, not boilerplate.",
      "Fixed scope, fixed price, deployed at handover. Proposals within 48 hours of a clear brief.",
    ],
    bullets: [
      "Start from existing engines: wallets, pipelines, AI flows, dashboards",
      "Weekly demos — you watch it become your product",
      "Full source handover, no lock-in",
      "Post-launch retainers available",
    ],
    faqs: [
      {
        q: "What does an MVP cost?",
        a: "Depends on surface area, not magic: most land between $8k–$40k fixed scope. Send a brief for a real number within 48h.",
      },
      {
        q: "Who owns the code?",
        a: "You do, at handover. That's the point.",
      },
    ],
  },
  {
    slug: "hire-nestjs-nextjs-developers",
    keyword: "Hire NestJS / Next.js development team",
    title: "Hire the Team Behind These Platforms (NestJS · Next.js · Go)",
      description:
      "Contract the engineers who built a double-entry casino ledger, an AI BD platform and a Go telecom scrubber. Staff augmentation or fixed-scope teams.",
    offer: "CUSTOM",
    intro: [
      "Portfolio-first engineering: the systems on this site were built by the team you'd be hiring — financial ledgers, seamless gaming APIs, AI pipelines, high-throughput Go services.",
      "Engage us as a fixed-scope team or embedded augmentation. Same engineers from demo to delivery.",
    ],
    bullets: [
      "TypeScript depth: NestJS APIs, Next.js apps, Prisma/data modeling",
      "Financial-grade patterns: double-entry, idempotency, audit trails",
      "Go for throughput-heavy services",
      "Direct communication with builders, no account-manager telephone game",
    ],
    faqs: [
      {
        q: "Time zone / availability?",
        a: "Flexible overlap windows with EU/US/Asia clients — agreed per engagement.",
      },
      {
        q: "Can you join our existing codebase?",
        a: "Regularly do. First week is a paid architecture review so estimates mean something.",
      },
    ],
  },
  {
    slug: "own-the-code-alternative-to-saas-subscriptions",
    keyword: "Own-the-code alternative to SaaS subscriptions",
    title: "Tired of Per-Seat SaaS? Own the Code Instead",
    description:
      "Swap subscription rent for a one-time source license: CRM, BD automation, compliance tooling. Pay once, run anywhere, change anything.",
    offer: "LICENSE",
    intro: [
      "Ten SaaS tools at $99/month each is $12k a year — indefinitely — for code you'll never own. For several categories, the one-time-license alternative now exists: pay once, self-host, customize freely.",
      "Our catalog covers CRM, BD automation and telecom compliance this way. The math flips permanently after month ~18.",
    ],
    bullets: [
      "One-time license vs perpetual rent",
      "Your data on your infrastructure",
      "No feature gating, no seat counting",
      "Community-proof stacks (Node/Go/Postgres)",
    ],
    faqs: [
      {
        q: "Isn't self-hosting a hassle?",
        a: "For a single VPS-class app, an afternoon. Or we host it for you — you still own the code either way.",
      },
      {
        q: "Updates?",
        a: "You can pull improvements from us on retainer, or maintain in-house. Unlike SaaS, updates are a choice, not a hostage.",
      },
    ],
  },
];

export function getSeoPage(slug: string): SeoPage | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}

export function relatedPages(current: SeoPage, n = 3): SeoPage[] {
  const sameProduct = SEO_PAGES.filter(
    (p) => p.slug !== current.slug && p.productKey && p.productKey === current.productKey,
  );
  const others = SEO_PAGES.filter((p) => p.slug !== current.slug && !sameProduct.includes(p));
  return [...sameProduct, ...others].slice(0, n);
}
