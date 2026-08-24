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

  const prod = page.productKey ? PRODUCTS.find((p) => p.key === page.productKey) : undefined;

  const related = relatedPages(page);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <header className="max-w-3xl space-y-6 border-b border-labs-line pb-10">
          <nav className="text-xs uppercase tracking-widest text-neutral-400">
            <Link href="/solutions" className="hover:text-labs-gold">
              Solutions
            </Link>{" "}
            / <span className="text-labs-royal">{page.keyword}</span>
          </nav>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-neutral-900 sm:text-5xl">
            {page.keyword}
          </h1>
          {prod && (
            <Link
              href={`/products/${prod.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-labs-panel px-5 py-2 text-sm text-labs-navy transition hover:bg-labs-gold hover:text-white"
            >
              {prod.icon} Based on: <b>{prod.name.split("—")[0].trim()}</b>
              {prod.demoUrl && <span>· live demo</span>} →
            </Link>
          )}
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <article className="max-w-2xl space-y-10">
            <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
              {page.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <section>
              <h2 className="mb-5 font-display text-xl font-extrabold text-neutral-900">
                What that means in practice
              </h2>
              <ul className="grid gap-3">
                {page.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 border-l-2 border-labs-gold/60 bg-labs-panel/70 p-4 text-sm leading-relaxed text-neutral-700"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-5 font-display text-xl font-extrabold text-neutral-900">
                Common questions
              </h2>
              <div className="space-y-3">
                {page.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group border border-labs-line bg-white p-5 open:border-labs-gold/50"
                  >
                    <summary className="cursor-pointer list-none font-display font-bold text-neutral-800 marker:hidden">
                      <span className="mr-2 text-labs-gold group-open:hidden">+</span>
                      <span className="mr-2 hidden text-labs-gold group-open:inline">–</span>
                      {f.q}
                    </summary>
                    <p className="mt-3 pl-6 text-sm leading-relaxed text-neutral-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="border-t border-labs-line pt-8">
              <h2 className="mb-4 font-display text-lg font-bold text-neutral-800">Related reading</h2>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/solutions/${r.slug}`}
                    className="rounded-full bg-labs-panel px-4 py-1.5 text-xs font-semibold text-labs-navy transition hover:bg-labs-gold hover:text-white"
                  >
                    {r.keyword}
                  </Link>
                ))}
              </div>
            </section>
          </article>

          <aside className="h-fit lg:sticky lg:top-24" id="inquire">
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
    </div>
  );
}
