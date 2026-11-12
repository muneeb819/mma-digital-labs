import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PRODUCTS, BUDGETS, type OfferType } from "@/lib/products";
import { clientIp, rateLimit, TOO_MANY } from "@/lib/rate-limit";

const OFFER_TYPES: OfferType[] = ["LICENSE", "CUSTOM", "DEMO"];

function clean(v: unknown, max: number): string {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  // Simple per-IP flood protection (see lib/rate-limit.ts for serverless notes).
  if (!rateLimit(`leads:${clientIp(req)}`, 8, 60_000)) {
    return NextResponse.json(TOO_MANY, { status: 429 });
  }

  // A JSON body of `null` parses to null — normalize so property access
  // below can never throw a 500.
  const raw = await req.json().catch(() => null);
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  // Honeypot: bots that fill the hidden "website" field get a fake success.
  if (String(body.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 4000);
  const offerType = String(body.offerType ?? "").toUpperCase();
  const productKey = clean(body.productKey, 40);
  const budget = clean(body.budget, 40);

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !message || message.length < 10) {
    return NextResponse.json({ error: "Please fill in name, a valid email and a short message." }, { status: 422 });
  }
  if (!OFFER_TYPES.includes(offerType as OfferType)) {
    return NextResponse.json({ error: "Invalid offer type" }, { status: 422 });
  }
  // Whitelist the budget values the UI offers — never persist arbitrary junk.
  if (budget && !BUDGETS.includes(budget)) {
    return NextResponse.json({ error: "Invalid budget range" }, { status: 422 });
  }

  const product = PRODUCTS.find((p) => p.key === productKey);

  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      company: clean(body.company, 160) || null,
      productKey: product?.key ?? null,
      productName: product?.name ?? null,
      offerType,
      budget: budget || null,
      message,
      source: clean(body.source, 120) || "direct",
      pagePath: clean(body.pagePath, 300) || null,
      referrer: clean(body.referrer, 500) || null,
    },
  });

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    // Fire-and-forget with a timeout so a slow webhook can't hold resources.
    fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `New lead (${lead.source}): ${name} <${email}> — ${product?.name ?? "General"} (${offerType})`,
      }),
      signal: AbortSignal.timeout(5000),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, id: lead.id });
}
