import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell us what you need — license a system, commission a custom build, or book a live demo.",
};

export default function ContactPage() {
  return (
    <div className="grid gap-12 py-14 md:grid-cols-[1fr_420px]">
      <header className="space-y-6">
        <h1 className="text-4xl font-black leading-tight text-white">
          Let&apos;s talk about
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            what you&apos;re building.
          </span>
        </h1>
        <p className="max-w-md leading-relaxed text-slate-400">
            Whether you need one of our systems licensed as-is, adapted to your business, or a
            ground-up custom platform — the fastest path is a short message here.
        </p>
        <div className="space-y-4 border-l-2 border-indigo-500/40 pl-5 text-sm text-slate-400">
          <p>
            <span className="font-bold text-slate-200">24h response.</span> Every inquiry lands
            directly with an engineer, not a sales queue.
          </p>
          <p>
            <span className="font-bold text-slate-200">Fixed-scope proposals</span> within 48 hours
            of a clear brief.
          </p>
          <p>
            <span className="font-bold text-slate-200">Full source handover</span> on licenses — you
            own your stack.
          </p>
        </div>
      </header>
      <InquiryForm />
    </div>
  );
}
