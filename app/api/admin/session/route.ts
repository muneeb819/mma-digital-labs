import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  authConfigured,
  checkPassword,
  cookieSecure,
  sessionToken,
} from "@/lib/auth";
import { clientIp, rateLimit, TOO_MANY } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Rate-limit password attempts (defense-in-depth against brute force).
  if (!rateLimit(`session:${clientIp(req)}`, 10, 60_000)) {
    return NextResponse.json(TOO_MANY, { status: 429 });
  }

  // A JSON body of `null` parses to null — normalize so property access
  // below can never throw a 500.
  const raw = await req.json().catch(() => null);
  const body = raw && typeof raw === "object" ? raw : {};

  if (!authConfigured()) {
    // Fail closed: the dashboard is not reachable until ADMIN_PASSWORD is set.
    return NextResponse.json(
      { error: "Admin dashboard is not configured." },
      { status: 503 },
    );
  }

  if (!checkPassword(String((body as Record<string, unknown>).password ?? ""))) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
  });
  return res;
}
