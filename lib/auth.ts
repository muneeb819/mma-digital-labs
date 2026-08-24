import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "labs_admin";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "labs-admin-2026";
}

export function sessionToken(): string {
  return crypto.createHash("sha256").update(`labs:${adminPassword()}`).digest("hex");
}

export function checkPassword(pw: string): boolean {
  const a = Buffer.from(sessionToken());
  const b = Buffer.from(crypto.createHash("sha256").update(`labs:${pw}`).digest("hex"));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function isAdmin(): boolean {
  const jar = cookies();
  return jar.get(ADMIN_COOKIE)?.value === sessionToken();
}
