import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="bg-white">
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-20">
        <header className="max-w-2xl">
          <h1 className="font-display text-5xl font-extrabold text-neutral-900">
            Solutions &amp; buyer guides
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-500">
            Straight answers to the searches that brought you here — each guide ties back to a
            system you can license or commission today.
          </p>
        </header>

        {[...groups.entries()].map(([group, pages]) => (
          <section key={group}>
            <h2 className="mb-5 border-b border-labs-line pb-2 font-display text-sm font-bold uppercase tracking-[0.25em] text-labs-gold">
              {labelFor(group)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/solutions/${p.slug}`}
                  className="bg-labs-panel p-6 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200"
                >
                  <div className="font-display font-bold leading-snug text-labs-navy">{p.keyword}</div>
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
