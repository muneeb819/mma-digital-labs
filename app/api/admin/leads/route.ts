import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isAdmin } from "@/lib/auth";
import type { LeadStatus } from "@/lib/products";

const prisma = new PrismaClient();

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ leads });
}

const STATUSES: LeadStatus[] = ["NEW", "CONTACTED", "PROPOSAL_SENT", "WON", "LOST"];

export async function PATCH(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const id = String(body.id ?? "");
  const status = String(body.status ?? "");
  if (!id || !STATUSES.includes(status as LeadStatus)) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }
  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const lead = await prisma.lead.update({ where: { id }, data: { status } });
  return NextResponse.json({ ok: true, lead });
}

export async function DELETE(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const id = String(body.id ?? "");
  if (!id) return NextResponse.json({ error: "Bad request" }, { status: 422 });
  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
