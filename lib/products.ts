export type OfferType = "LICENSE" | "CUSTOM" | "DEMO";
export type LeadStatus = "NEW" | "CONTACTED" | "PROPOSAL_SENT" | "WON" | "LOST";

export interface Product {
  key: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  icon: string;
  gradient: string;
  features: string[];
  stack: string[];
  demoUrl?: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    key: "mbpw",
    slug: "ai-business-development-platform",
    name: "MBPW — AI Business Development Platform",
    tagline: "An autonomous BD engine that hunts opportunities, writes proposals and runs outreach.",
    description:
      "A production business development platform that continuously scans global job and opportunity markets, scores them with AI, generates tailored winning proposals, and automates follow-up outreach. Deployed and running in production on Vercel with a live demo available.",
    category: "AI & Automation",
    icon: "🤖",
    gradient: "from-violet-600 to-indigo-600",
    features: [
      "Continuous multi-source opportunity discovery & scoring",
      "AI-generated, client-tailored proposals",
      "Automated outreach sequences & follow-up",
      "Pipeline analytics dashboard",
      "Production deployment on Vercel (live demo)",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Vercel"],
    demoUrl: "https://full-repo.vercel.app",
    featured: true,
  },
  {
    key: "casino",
    slug: "online-casino-platform",
    name: "GoldenSpin — Online Casino Platform",
    tagline: "Aggregator-model gaming platform with a double-entry wallet as the system of record.",
    description:
      "A complete reference implementation of the aggregator-model casino architecture used by real operators: one unified provider API (Hub88/SOFTSWISS-style), seamless per-round wallet settlement, KYC and responsible-gambling controls, payment rails, and a back office with live GGR reporting. Built ledger-first for financial integrity and auditability.",
    category: "Gaming & Fintech",
    icon: "🎰",
    gradient: "from-amber-500 to-orange-600",
    features: [
      "Double-entry ledger with append-only audit trail",
      "Seamless wallet: signed bet/win/rollback callbacks, idempotent rounds",
      "Single aggregator adapter — swap providers without touching the platform",
      "KYC queue, deposit limits, self-exclusion",
      "Back office: GGR per provider/game, player management, adjustments",
    ],
    stack: ["NestJS", "Next.js", "TypeScript", "Prisma", "PostgreSQL-ready"],
  },
  {
    key: "leadiq",
    slug: "leadiq-crm",
    name: "LeadIQ CRM",
    tagline: "A focused CRM for teams that live inside their lead pipeline.",
    description:
      "Custom CRM covering the full lead lifecycle — capture, qualification stages, owner assignment, activity tracking and conversion reporting. Designed to be white-labeled or extended into a bespoke sales platform for your team.",
    category: "CRM & Sales",
    icon: "📈",
    gradient: "from-cyan-500 to-blue-600",
    features: [
      "Lead capture & deduplication",
      "Configurable pipeline stages",
      "Activity & follow-up tracking",
      "Conversion reporting",
      "White-label ready",
    ],
    stack: ["TypeScript", "Node.js", "REST API"],
  },
  {
    key: "vici-scrubber",
    slug: "vici-cdr-scrubber",
    name: "Vici CDR Scrubber",
    tagline: "Enterprise-grade dialer CDR auditing with fraud detection baked in.",
    description:
      "High-throughput scrubber for Vici Dialer call detail records: fraud detection rules, data profiling, geo-analysis and advanced reporting. Written in Go for speed and built for compliance teams that need trustworthy telecom audits.",
    category: "Telecom & Compliance",
    icon: "🛡️",
    gradient: "from-emerald-500 to-teal-600",
    features: [
      "Fraud detection rule engine",
      "Data profiling & anomaly flags",
      "Geo / DID analysis",
      "Advanced audit reports",
      "Go core — high-throughput processing",
    ],
    stack: ["Go", "CLI/Service", "Reporting"],
  },
  {
    key: "bd-system",
    slug: "ai-powered-bd-system",
    name: "AI-Powered BD System",
    tagline: "Personal-brand site fused with an AI-assisted business development workflow.",
    description:
      "A web presence plus AI-assisted business development tooling: profile-driven positioning, opportunity matching and outreach content generation. Ideal as a starting point for founder-led agencies and consultancies.",
    category: "Web & Branding",
    icon: "🌐",
    gradient: "from-fuchsia-500 to-pink-600",
    features: [
      "Positioning & personal brand site",
      "AI-assisted content generation",
      "Opportunity matching workflow",
      "Extensible module structure",
    ],
    stack: ["TypeScript", "Next.js", "AI APIs"],
  },
];

export const OFFERS: {
  type: OfferType;
  title: string;
  blurb: string;
  icon: string;
}[] = [
  {
    type: "LICENSE",
    title: "License the source",
    blurb: "Get the full codebase, deploy it under your brand, own your infrastructure.",
    icon: "📦",
  },
  {
    type: "CUSTOM",
    title: "Commission a custom build",
    blurb: "We adapt any system — or build new — around your exact workflows.",
    icon: "🛠️",
  },
  {
    type: "DEMO",
    title: "Book a live demo",
    blurb: "Walk through the real product with the engineer who built it.",
    icon: "🎥",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];
