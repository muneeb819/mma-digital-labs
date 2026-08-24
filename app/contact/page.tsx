import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell us what you need — license a system, commission a custom build, or book a live demo.",
};

export default function ContactPage() {
  return (
    <div className="bg-labs-sky">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1fr_440px]">
        <header className="space-y-7 text-white">
          <h1 className="font-display text-5xl font-extrabold leading-tight">
            Let&apos;s talk about
            <br />
            <span className="text-labs-gold">what you&apos;re building.</span>
          </h1>
          <p className="max-w-md leading-relaxed text-blue-50">
            Whether you need one of our systems licensed as-is, adapted to your business, or a
            ground-up custom platform — the fastest path is a short message here.
          </p>
          <div className="space-y-4 border-l-2 border-white/40 pl-5 text-sm text-blue-50">
            <p>
              <span className="font-bold text-white">24h response.</span> Every inquiry lands
              directly with an engineer, not a sales queue.
            </p>
            <p>
              <span className="font-bold text-white">Fixed-scope proposals</span> within 48 hours of
              a clear brief.
            </p>
            <p>
              <span className="font-bold text-white">Full source handover</span> on licenses — you
              own your stack.
            </p>
          </div>
        </header>
        <div id="inquire" className="h-fit rounded-xl bg-white p-2 shadow-xl shadow-blue-900/10">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
