import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEO_PAGES, getSeoPage, relatedPages } from "@/lib/seo";
import { PRODUCTS } from "@/lib/products";
import { InquiryForm } from "@/components/InquiryForm";

export function generateStaticParams() {
  return SEO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = getSeoPage(params.slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/solutions/${page.slug}` },
  };
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const page = getSeoPage(params.slug);
  if (!page) notFound();

  const prod = page.productKey
    ? PRODUCTS.find((p) => p.key === page.productKey)
    : undefined;

  const related = relatedPages(page);

  return (
    <div className="space-y-14 py-14">
      <header className="max-w-3xl space-y-5">
        <nav className="text-xs text-slate-500">
          <Link href="/solutions" className="hover:text-slate-300">
            Solutions
          </Link>{" "}
          / {page.keyword}
        </nav>
        <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">{page.keyword}</h1>
        {prod && (
          <Link
            href={`/products/${prod.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-labs-line bg-labs-card px-4 py-1.5 text-sm text-slate-300 hover:border-indigo-500/50"
          >
            {prod.icon} Based on: <b>{prod.name.split("—")[0].trim()}</b>
            {prod.demoUrl && <span className="text-emerald-400">· live demo</span>} →
          </Link>
        )}
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <article className="max-w-2xl space-y-10">
          <div className="space-y-4 text-lg leading-relaxed text-slate-300">
            {page.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">What that means in practice</h2>
            <ul className="grid gap-3">
              {page.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-labs-line bg-labs-panel/40 p-4 text-sm text-slate-300">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">Common questions</h2>
            <div className="space-y-3">
              {page.faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-labs-line bg-labs-panel/40 p-4 open:bg-labs-card/60">
                  <summary className="cursor-pointer list-none font-semibold text-slate-200 marker:hidden">
                    <span className="mr-2 text-indigo-400 group-open:hidden">+</span>
                    <span className="mr-2 hidden text-indigo-400 group-open:inline">–</span>
                    {f.q}
                  </summary>
                  <p className="mt-2 pl-6 text-sm leading-relaxed text-slate-400">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="border-t border-labs-line pt-8">
            <h2 className="mb-3 text-lg font-bold text-slate-300">Related reading</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/solutions/${r.slug}`}
                  className="chip hover:border-indigo-500/50 hover:text-slate-200"
                >
                  {r.keyword}
                </Link>
              ))}
            </div>
          </section>
        </article>

        <aside className="h-fit lg:sticky lg:top-20" id="inquire">
          <InquiryForm
            productKey={page.productKey}
            productName={page.keyword}
            defaultOffer={page.offer}
            source={`seo:${page.slug}`}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: page.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </aside>
      </div>
    </div>
  );
}
