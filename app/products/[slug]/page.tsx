import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/products";
import { InquiryForm } from "@/components/InquiryForm";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = getProduct(params.slug);
  return {
    title: p?.name ?? "System",
    description: p?.tagline,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        <header className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div
                className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${p.gradient} text-3xl`}
              >
                {p.icon}
              </div>
              <span className="rounded-full bg-labs-panel px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-labs-royal">
                {p.category}
              </span>
              {p.demoUrl && (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-100"
                >
                  ● Live demo →
                </a>
              )}
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-neutral-900 sm:text-5xl">
              {p.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">{p.description}</p>
          </div>
          <div className="h-fit rounded-lg bg-labs-panel p-7 md:min-w-[240px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-labs-gold">Stack</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {p.stack.map((s) => (
                <li key={s} className="flex items-center gap-2 text-neutral-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-labs-royal" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section>
          <h2 className="font-display text-2xl font-extrabold text-neutral-900">What you get</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {p.features.map((f, i) => (
              <div key={f} className="flex items-start gap-3 bg-labs-panel p-5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white text-xs font-bold text-labs-royal shadow-sm">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-neutral-700">{f}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-neutral-900">
              Three ways to move forward
            </h2>
            {[
              ["📦", "License the source", "One-time license for the full codebase + handover session and deployment support."],
              ["🛠️", "Commission a custom build", "We tailor this system to your workflows — branding, integrations, new modules."],
              ["🎥", "Book a live demo", "30-minute walkthrough of the running product with the engineer who built it."],
            ].map(([icon, t, d]) => (
              <div
                key={t}
                className="flex items-start gap-4 border border-labs-line bg-white p-5 transition hover:border-labs-gold/50"
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="font-display font-bold text-neutral-900">{t}</div>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">{d}</p>
                </div>
              </div>
            ))}
          </div>

          <div id="inquire" className="h-fit md:sticky md:top-24">
            <InquiryForm productKey={p.key} productName={p.name} />
          </div>
        </section>

        <section className="border-t border-labs-line pt-12">
          <h2 className="font-display text-xl font-bold text-neutral-800">Other systems</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {PRODUCTS.filter((x) => x.key !== p.key).map((x) => (
              <Link
                key={x.key}
                href={`/products/${x.slug}`}
                className="rounded-full bg-labs-panel px-4 py-1.5 text-sm text-labs-navy transition hover:bg-labs-gold hover:text-white"
              >
                {x.icon} {x.name.split("—")[0].trim()}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
