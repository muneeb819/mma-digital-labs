"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-labs-gold">
          Something went wrong
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-neutral-900 sm:text-5xl">
          An unexpected error occurred.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-neutral-500">
          Try again — if it keeps happening, contact us and we&apos;ll sort it out.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button onClick={() => reset()} className="btn-primary">
            Try again
          </button>
          <a href="/contact" className="btn-outline">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
