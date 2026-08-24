import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-labs-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 text-sm text-slate-500 sm:flex-row sm:items-center">
        <div>
          <div className="font-bold text-slate-300">MMA Digital Labs</div>
          <p className="mt-1 max-w-md text-xs leading-relaxed">
            Production-ready systems built by engineers — licensed, customized and shipped
            worldwide.
          </p>
        </div>
        <div className="flex gap-6 text-xs">
          <Link href="/products" className="hover:text-slate-300">
            Systems
          </Link>
          <Link href="/solutions" className="hover:text-slate-300">
            Guides
          </Link>
          <Link href="/contact" className="hover:text-slate-300">
            Contact
          </Link>
          <Link href="/admin" className="hover:text-slate-600">
            Owner login
          </Link>
        </div>
      </div>
    </footer>
  );
}
