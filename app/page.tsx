import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

const VALUE_PROPS = [
  {
    icon: "📦",
    t: "License the source code",
    d: "One-time payment transfers the full codebase. Deploy under your brand on your own infrastructure — no royalties, no lock-in.",
  },
  {
    icon: "🛠️",
    t: "Commission a custom build",
    d: "We adapt any system — or build new — around your exact workflows. Fixed-scope proposal within 48 hours of your brief.",
  },
  {
    icon: "🎥",
    t: "Book a live demo",
    d: "Walk through the running product with the engineer who wrote it. Real screens, real data flow — no sales deck.",
  },
  {
    icon: "🤝",
    t: "White-label partnership",
    d: "Agencies rebrand our platforms and resell them to their clients at their own margin. Full handover support included.",
  },
];

const SECTORS = [
  ["🎰", "Online Gaming & Betting"],
  ["📞", "Call Centers & BPO"],
  ["📈", "Sales & Lead-Gen Teams"],
  ["🤖", "AI & Automation Studios"],
  ["🛡️", "Telecom & Compliance"],
  ["🚀", "Founders & Agencies"],
];

const WHY_BUY: [string, string, string][] = [
  ["#046604", "Days to launch", "Skip a 4–6 month development cycle — licensed systems deploy in days."],
  ["#3e6b9e", "100% source ownership", "Every license includes the complete repository. You own your stack."],
  ["#b3870a", "Production-hardened", "Real systems already running in production — not prototypes or templates."],
  ["#851205", "Zero hiring risk", "No recruiting, onboarding or managing a dev team. We engineer, you operate."],
];

export default function HomePage() {
  return (
    <div className="pb-0">
      {/* HERO */}
      <section className="hero-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[1.08] text-white sm:text-7xl">
            BUILD FOR SIX MONTHS?
          </h1>
          <p className="mt-4 max-w-3xl font-display text-3xl font-extrabold text-labs-gold sm:text-5xl">
            Or ship this week.
          </p>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300">
            Battle-tested platforms — AI business development, online gaming, CRM and telecom
            compliance — available to license today, customize tomorrow, demo right now.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary">
              Browse the catalog
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 font-medium text-white transition hover:border-labs-gold hover:text-labs-gold"
            >
              Commission a custom build
            </Link>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-labs-line bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {[
            ["5", "systems ready to ship"],
            ["3", "ways to buy"],
            ["24h", "response time"],
            ["100%", "engineer-owned code"],
          ].map(([n, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-4xl font-extrabold text-labs-navy">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-neutral-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-4xl font-extrabold text-neutral-900 sm:text-5xl">
            What we do for you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-neutral-500">
            Four ways to put proven engineering to work inside your business — each with full
            source ownership.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((v) => (
              <Reveal key={v.t}>
                <div className="flex h-full flex-col bg-labs-panel p-7">
                  <div className="text-3xl">{v.icon}</div>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-labs-navy">
                    {v.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-labs-panel py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-4xl font-extrabold text-neutral-900 sm:text-5xl">
            Sectors we serve
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-neutral-600">
            Domain-specific systems, built by engineers who know these industries.
          </p>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SECTORS.map(([icon, label]) => (
              <Reveal key={label}>
                <div className="flex h-full flex-col items-center bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md">
                  <span className="text-3xl">{icon}</span>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-labs-navy">
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BUY — color-coded list */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl font-extrabold text-neutral-900 sm:text-5xl">
            Why businesses buy instead of build
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-2">
            {WHY_BUY.map(([color, head, body]) => (
              <Reveal key={head}>
                <div className="border-l-4 pl-5" style={{ borderColor: color }}>
                  <div className="font-display text-lg font-bold" style={{ color }}>
                    {head}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STACK WALL (logo-wall equivalent) */}
      <section className="border-y border-labs-line bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Engineered with production-grade technology
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {["TypeScript", "NestJS", "Next.js", "Go", "Prisma", "PostgreSQL", "Python", "FastAPI"].map(
              (t) => (
                <span key={t} className="font-display text-lg font-bold text-neutral-300 transition hover:text-labs-royal">
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl font-extrabold text-neutral-900 sm:text-5xl">
                The catalog
              </h2>
              <p className="mt-3 text-neutral-500">Every product is real, running code — not mockups.</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-labs-gold hover:text-labs-goldDark">
              View all →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.key} delay={i * 80}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-labs-panel py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-4xl font-extrabold text-neutral-900 sm:text-5xl">
            How buying works
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Pick a system", "Browse the catalog or bring us your brief. Every listing links to a live demo where one exists."],
              ["02", "Get a fixed proposal", "Within 48 hours: scope, price and timeline. License as-is or customize first."],
              ["03", "Own and operate", "Source-code handover session, deployment support, and documentation. It's yours."],
            ].map(([n, t, d], i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="h-full bg-white p-8">
                  <div className="font-display text-5xl font-extrabold text-labs-gold">{n}</div>
                  <h3 className="mt-4 font-display text-lg font-bold text-labs-navy">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-labs-sky">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
              Ready when you are.
            </h2>
            <p className="mt-3 max-w-xl text-blue-50">
              Tell us what you need — license a system as-is, adapt it to your business, or start
              from zero. Every inquiry lands directly with an engineer.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0 !px-9 !py-4 text-base">
            Start a project →
          </Link>
        </div>
      </section>
    </div>
  );
}
