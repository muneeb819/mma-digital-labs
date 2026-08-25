export function Watermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 flex select-none items-center justify-center overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-md.png"
        alt=""
        className="w-[72vmin] max-w-[820px] opacity-[0.035] brightness-0"
        draggable={false}
      />
    </div>
  );
}
