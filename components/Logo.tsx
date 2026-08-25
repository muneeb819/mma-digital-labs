export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  const size = compact ? "h-8 w-auto" : "h-11 w-auto";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-sm.png"
      alt="MMA Digital Labs"
      className={light ? `${size} drop-shadow-lg` : size}
    />
  );
}
