import type { Metadata } from "next";
import { SEO_PAGES } from "@/lib/seo";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Solutions & guides",
  description:
    "Buyer guides for licensing software systems: turnkey casino platforms, CRM source code, AI business development, telecom compliance and more.",
};

export default function SolutionsIndexPage() {
  const groups = new Map<string, typeof SEO_PAGES>();
  for (const p of SEO_PAGES) {
    const key = p.productKey ?? "general";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }

  const labelFor = (key: string) =>
    key === "general"
      ? "Buying guides"
      : (PRODUCTS.find((p) => p.key === key)?.name.split("—")[0].trim() ?? key);

  return (
    <div className="space-y-12 py-14">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-black text-white">Solutions &amp; buyer guides</h1>
        <p className="mt-3 text-slate-400">
          Straight answers to the searches that brought you here — each guide ties back to a
          system you can license or commission today.
        </p>
      </header>

      {[...groups.entries()].map(([group, pages]) => (
        <section key={group}>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">
            {labelFor(group)}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((p) => (
              <a
                key={p.slug}
                href={`/solutions/${p.slug}`}
                className="panel block transition hover:border-indigo-500/50"
              >
                <div className="font-semibold leading-snug text-slate-200">{p.keyword}</div>
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{p.description}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
