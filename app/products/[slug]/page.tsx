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
    <div className="space-y-14 py-14">
      <header className="grid gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${p.gradient} text-3xl`}
            >
              {p.icon}
            </div>
            <span className="chip">{p.category}</span>
            {p.demoUrl && (
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20"
              >
                ● Live demo →
              </a>
            )}
          </div>
          <h1 className="text-4xl font-black leading-tight text-white">{p.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">{p.description}</p>
        </div>
        <div className="panel h-fit min-w-[240px]">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Stack</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {p.stack.map((s) => (
              <li key={s} className="flex items-center gap-2 text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-bold text-white">What you get</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {p.features.map((f, i) => (
            <div key={f} className="panel flex items-start gap-3 !py-4">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-indigo-500/15 text-xs font-bold text-indigo-300">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-slate-300">{f}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-white">Three ways to move forward</h2>
          {[
            ["📦", "License the source", "One-time license for the full codebase + handover session and deployment support."],
            ["🛠️", "Commission a custom build", "We tailor this system to your workflows — branding, integrations, new modules."],
            ["🎥", "Book a live demo", "30-minute walkthrough of the running product with the engineer who built it."],
          ].map(([icon, t, d]) => (
            <div key={t} className="flex items-start gap-4 rounded-xl border border-labs-line bg-labs-panel/40 p-5">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="font-bold text-white">{t}</div>
                <p className="mt-1 text-sm text-slate-400">{d}</p>
              </div>
            </div>
          ))}
        </div>

        <div id="inquire" className="h-fit md:sticky md:top-20">
          <InquiryForm productKey={p.key} productName={p.name} />
        </div>
      </section>

      <section className="border-t border-labs-line pt-10">
        <h2 className="text-lg font-bold text-slate-300">Other systems</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {PRODUCTS.filter((x) => x.key !== p.key).map((x) => (
            <Link key={x.key} href={`/products/${x.slug}`} className="chip hover:text-slate-200">
              {x.icon} {x.name.split("—")[0].trim()}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
