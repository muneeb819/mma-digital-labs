import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-labs-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-labs-gold">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-slate-400">
          The link may be outdated — but the catalog is right where you left it.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/products" className="btn-primary">
            Browse the catalog
          </Link>
          <Link href="/" className="btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
