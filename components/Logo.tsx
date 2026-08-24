export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lmlg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="0.55" stopColor="#6366f1" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path
        d="M32 3.5 56.5 17.75 V46.25 L32 60.5 7.5 46.25 V17.75 Z"
        fill="url(#lmlg)"
        fillOpacity="0.12"
        stroke="url(#lmlg)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M20 43.5 V25 L32 37.5 L44 25 V43.5"
        stroke="url(#lmlg)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="47.5" r="3.2" fill="#22d3ee" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="flex items-center gap-2">
        <LogoMark className="h-6 w-6" />
        <span className="text-sm font-bold text-slate-300">MMA Digital Labs</span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="text-base font-black tracking-tight text-slate-100">MMA</span>
        <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.34em] text-indigo-400">
          Digital&nbsp;Labs
        </span>
      </span>
    </span>
  );
}
