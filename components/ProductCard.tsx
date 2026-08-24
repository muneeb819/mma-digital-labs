import Link from "next/link";

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
