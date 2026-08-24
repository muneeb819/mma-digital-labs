import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Systems catalog",
  description:
    "Production-ready platforms available to license or customize: AI business development, online casino, CRM, telecom compliance and more.",
};

export default function ProductsPage() {
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-20">
        <header className="max-w-2xl">
          <h1 className="font-display text-5xl font-extrabold text-neutral-900">
            Systems catalog
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-500">
            Each listing is a working system with real code behind it. License it as-is, book a
            demo, or use it as the foundation for your custom build.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c} className="rounded-full bg-labs-panel px-3 py-1 text-xs font-semibold text-labs-royal">
                {c}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.key} delay={(i % 3) * 70}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
