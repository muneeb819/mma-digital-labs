import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-labs-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-4 py-3">
        <Link href="/" className="transition hover:opacity-90" aria-label="MMA Digital Labs — home">
          <Logo />
        </Link>
        <div className="ml-auto flex items-center gap-7">
          <Link href="/products" className="nav-link hidden sm:block">
            Systems
          </Link>
          <Link href="/solutions" className="nav-link hidden sm:block">
            Guides
          </Link>
          <Link href="/contact" className="btn-primary !px-5 !py-2 text-sm">
            Start a project
          </Link>
        </div>
      </div>
    </nav>
  );
}
