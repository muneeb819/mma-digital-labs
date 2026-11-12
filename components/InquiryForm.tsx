"use client";

import { useEffect, useState } from "react";
import { OFFERS, BUDGETS, type OfferType } from "@/lib/products";

export function InquiryForm({
  productKey,
  productName,
  defaultOffer = "DEMO",
  source,
}: {
  productKey?: string;
  productName?: string;
  defaultOffer?: OfferType;
  source?: string;
}) {
  const [offer, setOffer] = useState<OfferType>(defaultOffer);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [attribution, setAttribution] = useState<{ pagePath: string; referrer: string; utm: string }>({
    pagePath: "",
    referrer: "",
    utm: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Capture every utm_* parameter (source, medium, campaign, term, content),
    // not just utm_source, so campaign attribution survives the whole funnel.
    const utm = [...new Set(Array.from(params.keys()))]
      .filter((k) => k.toLowerCase().startsWith("utm_"))
      .map((k) => `${k}=${params.get(k) ?? ""}`)
      .join("&")
      .slice(0, 240);
    setAttribution({
      pagePath: window.location.pathname,
      referrer: document.referrer || "",
      utm,
    });
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"),
          budget: fd.get("budget"),
          message: fd.get("message"),
          website: fd.get("website"),
          offerType: offer,
          productKey,
          source: attribution.utm || source || undefined,
          pagePath: attribution.pagePath,
          referrer: attribution.referrer,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" aria-live="polite" className="panel text-center">
        <div className="text-4xl">✅</div>
        <h3 className="mt-3 font-display font-bold text-white">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Thanks — you&apos;ll hear back within 24 hours{productName ? ` about ${productName}` : ""}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="panel space-y-4">
      <div>
        <h3 className="font-display font-bold text-white">I&apos;m interested in…</h3>
        {productName && (
          <p className="mt-1 text-xs text-slate-400">{productName}</p>
        )}
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {OFFERS.map((o) => (
            <button
              type="button"
              key={o.type}
              onClick={() => setOffer(o.type)}
              className={`rounded-lg border px-2 py-2.5 text-center text-xs transition ${
                offer === o.type
                  ? "border-labs-gold bg-labs-gold/10 font-bold text-white"
                  : "border-labs-line text-slate-400 hover:border-labs-gold/50 hover:bg-labs-card"
              }`}
            >
              <div className="text-base">{o.icon}</div>
              {o.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <input name="name" required placeholder="Your name *" aria-label="Your name" className="input" />
      <input name="email" type="email" required placeholder="Work email *" aria-label="Work email" className="input" />
      <input name="company" placeholder="Company (optional)" aria-label="Company (optional)" className="input" />
      <select name="budget" aria-label="Budget range" className="input text-slate-400" defaultValue="">
        <option value="" disabled>
          Budget range
        </option>
        {BUDGETS.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        required
        minLength={10}
        rows={4}
        placeholder="Tell us what you need — timeline, use case, must-haves… *"
        aria-label="Message"
        className="input resize-none"
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {status === "error" && error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button className="btn-primary w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send inquiry →"}
      </button>
      <p className="text-center text-[11px] text-slate-500">
        Response within 24 hours. No spam, ever.
      </p>
    </form>
  );
}
