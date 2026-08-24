import Link from "next/link";

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-labs-line bg-labs-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-sm">
            M
          </span>
          <span className="text-slate-100">
            MMA<span className="text-indigo-400"> Digital Labs</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <Link
            href="/products"
            className="rounded-lg px-3 py-1.5 text-slate-300 transition hover:bg-labs-card"
          >
            Systems
          </Link>
          <Link href="/contact" className="btn-outline !px-4 !py-1.5 text-xs">
            Start a project
          </Link>
        </div>
      </div>
    </nav>
  );
}
