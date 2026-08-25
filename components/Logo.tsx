export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  const size = compact ? "h-8 w-auto" : "h-11 w-auto";
  if (light) {
    return (
      <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-sm.jpg" alt="MMA Digital Labs" className={size} />
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-sm.jpg" alt="MMA Digital Labs" className={size} />
  );
}
