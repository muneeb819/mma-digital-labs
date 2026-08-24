import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Production-ready systems, licensed & customized for you",
};

export default function HomePage() {
  return (
    <div className="space-y-24 pb-8">
      <section className="relative overflow-hidden pt-20">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-block rounded-full border border-labs-line bg-labs-card px-4 py-1 text-xs font-medium tracking-wide text-indigo-300">
            5 production-grade systems · built & maintained by MMA Digital Labs
          </p>
          <h1 className="text-balance text-5xl font-black leading-[1.1] text-white sm:text-6xl">
            Buy the system.
            <br />
            Skip the{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              six-month build.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Battle-tested platforms — AI business development, online gaming, CRM and telecom
            compliance — available to license today, customize tomorrow, demo right now.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary">
              Browse the catalog
            </Link>
            <Link href="/contact" className="btn-outline">
              Commission a custom build
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["5", "systems ready to ship"],
          ["3", "ways to buy"],
          ["24h", "response time"],
          ["100%", "engineer-owned code"],
        ].map(([n, label]) => (
          <div key={label} className="panel py-5 text-center">
            <div className="text-3xl font-black text-white">{n}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">{label}</div>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">The catalog</h2>
            <p className="mt-1 text-slate-400">Every product is real, running code — not mockups.</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.slice(0, 3).map((p) => (
            <ProductCard key={p.key} p={p} />
          ))}
        </div>
      </section>

      <section className="panel relative overflow-hidden">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-600/10 blur-2xl" />
        <div className="relative grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "📦",
              t: "License the source",
              d: "Full codebase transfer with deployment support. Run it under your brand on your own infrastructure.",
            },
            {
              icon: "🛠️",
              t: "Commission a custom build",
              d: "Start from a proven base or from zero. Fixed-scope proposals within 48 hours of your brief.",
            },
            {
              icon: "🎥",
              t: "Book a live demo",
              d: "See the actual products running, with the engineer who wrote them. No sales deck.",
            },
          ].map((o) => (
            <div key={o.t}>
              <div className="text-3xl">{o.icon}</div>
              <h3 className="mt-3 font-bold text-white">{o.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{o.d}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-8 flex flex-wrap gap-3 border-t border-labs-line pt-6">
          {PRODUCTS.map((p) => (
            <Link key={p.key} href={`/products/${p.slug}`} className="chip hover:text-slate-200">
              {p.icon} {p.name.split("—")[0].trim()}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ProductCard({ p }: { p: import("@/lib/products").Product }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="group panel block transition hover:-translate-y-1 hover:border-indigo-500/50"
    >
      <div
        className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.gradient} text-2xl`}
      >
        {p.icon}
      </div>
      <div className="chip mb-2 inline-block !py-0.5 text-[11px]">{p.category}</div>
      <h3 className="font-bold leading-snug text-white group-hover:text-indigo-300">{p.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">{p.tagline}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        {p.demoUrl && <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-400">● Live demo</span>}
        <span>{p.stack.length} technologies</span>
      </div>
    </Link>
  );
}
