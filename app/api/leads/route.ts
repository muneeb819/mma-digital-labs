import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PRODUCTS, type OfferType } from "@/lib/products";

const prisma = new PrismaClient();

const OFFER_TYPES: OfferType[] = ["LICENSE", "CUSTOM", "DEMO"];

function clean(v: unknown, max: number): string {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  if (String(body?.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 4000);
  const offerType = String(body.offerType ?? "").toUpperCase();
  const productKey = clean(body.productKey, 40);

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !message || message.length < 10) {
    return NextResponse.json({ error: "Please fill in name, a valid email and a short message." }, { status: 422 });
  }
  if (!OFFER_TYPES.includes(offerType as OfferType)) {
    return NextResponse.json({ error: "Invalid offer type" }, { status: 422 });
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
      budget: clean(body.budget, 40) || null,
      message,
      source: clean(body.source, 120) || "direct",
      pagePath: clean(body.pagePath, 300) || null,
      referrer: clean(body.referrer, 500) || null,
    },
  });

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `New lead (${lead.source}): ${name} <${email}> — ${product?.name ?? "General"} (${offerType})`,
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, id: lead.id });
}
