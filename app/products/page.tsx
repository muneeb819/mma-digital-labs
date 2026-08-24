import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/app/page";

export const metadata: Metadata = {
  title: "Systems catalog",
  description:
    "Production-ready platforms available to license or customize: AI business development, online casino, CRM, telecom compliance and more.",
};

export default function ProductsPage() {
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  return (
    <div className="space-y-10 py-14">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-black text-white">Systems catalog</h1>
        <p className="mt-3 text-slate-400">
          Each listing is a working system with real users of code behind it. License it as-is,
          book a demo, or use it as the foundation for your custom build.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.key} p={p} />
        ))}
      </div>
    </div>
  );
}
