import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

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
  ["#5eb87a", "Days to launch", "Skip a 4–6 month development cycle — licensed systems deploy in days."],
  ["#8aa3c9", "100% source ownership", "Every license includes the complete repository. You own your stack."],
  ["#c8a24c", "Production-hardened", "Real systems already running in production — not prototypes or templates."],
  ["#c97a6a", "Zero hiring risk", "No recruiting, onboarding or managing a dev team. We engineer, you operate."],
];

export default function HomePage() {
  return (
    <div className="pb-0">
      {/* HERO */}
      <section className="hero-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <h1 className="fade-up d1 max-w-4xl font-display text-5xl font-extrabold leading-[1.08] text-white sm:text-7xl">
            BUILD FOR SIX MONTHS?
          </h1>
          <p className="fade-up d2 mt-4 max-w-3xl font-display text-3xl font-extrabold text-gradient sm:text-5xl">
            Or ship this week.
          </p>
          <p className="fade-up d3 mt-7 max-w-2xl text-lg leading-relaxed text-slate-300">
            Battle-tested platforms — AI business development, online gaming, CRM and telecom
            compliance — available to license today, customize tomorrow, demo right now.
          </p>
          <div className="fade-up d4 mt-10 flex flex-wrap gap-4">
            <Link href="/products" className="group btn-primary">
              Browse the catalog
              <span className="transition-transform duration-300 ease-fut group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3 font-medium text-white transition-all duration-300 ease-fut hover:border-labs-gold hover:text-labs-gold hover:-translate-y-0.5"
            >
              Commission a custom build
              <span className="transition-transform duration-300 ease-fut group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-labs-line bg-labs-panel">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {[
            [5, "", "systems ready to ship"],
            [3, "", "ways to buy"],
            [24, "h", "response time"],
            [100, "%", "engineer-owned code"],
          ].map(([n, suffix, label]) => (
            <div key={label as string} className="text-center">
              <div className="font-display text-4xl font-extrabold text-white tabular-nums">
                <Counter value={n as number} suffix={suffix as string} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="bg-labs-bg py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-4xl font-extrabold text-white sm:text-5xl">
            What we do for you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-slate-400">
            Four ways to put proven engineering to work inside your business — each with full
            source ownership.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((v) => (
              <Reveal key={v.t}>
                <div className="card-tick flex h-full flex-col bg-labs-panel p-7 transition-transform duration-300 ease-fut hover:-translate-y-1">
                  <div className="text-3xl">{v.icon}</div>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-white">
                    {v.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-labs-panel py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-4xl font-extrabold text-white sm:text-5xl">
            Sectors we serve
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-slate-400">
            Domain-specific systems, built by engineers who know these industries.
          </p>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SECTORS.map(([icon, label]) => (
              <Reveal key={label}>
                <div className="flex h-full flex-col items-center bg-labs-card p-6 text-center transition hover:-translate-y-1 hover:shadow-md">
                  <span className="text-3xl">{icon}</span>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-white">
                    {label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BUY — color-coded list */}
      <section className="bg-labs-bg py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
            Why businesses buy instead of build
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-2">
            {WHY_BUY.map(([color, head, body]) => (
              <Reveal key={head}>
                <div className="border-l-4 pl-5" style={{ borderColor: color }}>
                  <div className="font-display text-lg font-bold" style={{ color }}>
                    {head}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STACK WALL (logo-wall equivalent) */}
      <section className="border-y border-labs-line bg-labs-panel py-14">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Engineered with production-grade technology
          </p>
          <div className="marquee mt-6">
            <div className="marquee-track">
              {[...Array(2)].flatMap((_, dup) =>
                ["TypeScript", "NestJS", "Next.js", "Go", "Prisma", "PostgreSQL", "Python", "FastAPI"].map(
                  (t) => (
                    <span
                      key={`${t}-${dup}`}
                      className="whitespace-nowrap font-display text-lg font-bold text-slate-500 transition-colors duration-300 hover:text-labs-royal"
                    >
                      {t}
                    </span>
                  ),
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section className="bg-labs-bg py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                The catalog
              </h2>
              <p className="mt-3 text-slate-400">Every product is real, running code — not mockups.</p>
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
          <h2 className="text-center font-display text-4xl font-extrabold text-white sm:text-5xl">
            How buying works
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Pick a system", "Browse the catalog or bring us your brief. Every listing links to a live demo where one exists."],
              ["02", "Get a fixed proposal", "Within 48 hours: scope, price and timeline. License as-is or customize first."],
              ["03", "Own and operate", "Source-code handover session, deployment support, and documentation. It's yours."],
            ].map(([n, t, d], i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="h-full bg-labs-card p-8">
                  <div className="font-display text-5xl font-extrabold text-labs-gold">{n}</div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{d}</p>
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
            <p className="mt-3 max-w-xl text-slate-300">
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
