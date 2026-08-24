import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="card group block hover:-translate-y-1 hover:border-labs-gold/60 hover:shadow-lg hover:shadow-slate-200"
    >
      <div
        className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.gradient} text-2xl`}
      >
        {p.icon}
      </div>
      <span className="mb-2 inline-block rounded-full bg-labs-panel px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-labs-royal">
        {p.category}
      </span>
      <h3 className="font-display font-bold leading-snug text-neutral-900 group-hover:text-labs-gold">
        {p.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">{p.tagline}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
        {p.demoUrl && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-600">
            ● Live demo
          </span>
        )}
        <span>{p.stack.length} technologies</span>
      </div>
    </Link>
  );
}
