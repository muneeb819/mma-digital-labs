import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-labs-navy text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Logo compact light />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Production-ready systems built by engineers — licensed, customized and shipped
              worldwide.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://github.com/muneeb819"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:border-labs-gold hover:text-labs-gold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:border-labs-gold hover:text-labs-gold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                </svg>
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:border-labs-gold hover:text-labs-gold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.23l-4.88-6.38L6.5 22H3.37l7.24-8.28L2.4 2h6.39l4.41 5.83L18.9 2Zm-1.09 18.13h1.72L7.86 3.77H6.02l11.79 16.36Z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex gap-16 text-sm">
            <div>
              <div className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-labs-gold">
                Explore
              </div>
              <ul className="space-y-2.5">
                <li><Link href="/products" className="hover:text-white">Systems catalog</Link></li>
                <li><Link href="/solutions" className="hover:text-white">Buyer guides</Link></li>
                <li><Link href="/contact" className="hover:text-white">Start a project</Link></li>
                <li><Link href="/admin" className="text-slate-500 hover:text-slate-400">Owner login</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-labs-gold">
                Systems
              </div>
              <ul className="space-y-2.5">
                <li><Link href="/products/online-casino-platform" className="hover:text-white">Casino platform</Link></li>
                <li><Link href="/products/ai-business-development-platform" className="hover:text-white">AI BD platform</Link></li>
                <li><Link href="/products/leadiq-crm" className="hover:text-white">LeadIQ CRM</Link></li>
                <li><Link href="/products/vici-cdr-scrubber" className="hover:text-white">CDR scrubber</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 MMA Digital Labs. All rights reserved.</span>
          <span>Built by engineers, not salespeople.</span>
        </div>
      </div>
    </footer>
  );
}
