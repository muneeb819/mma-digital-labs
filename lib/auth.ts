import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "labs_admin";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

/**
 * Pepper for session tokens. Falls back to the admin password so a single
 * env var still works, but a dedicated SESSION_SECRET is recommended: with it
 * set, the cookie value is not derivable from the password alone.
 */
function sessionSecret(): string {
  return process.env.SESSION_SECRET || adminPassword();
}

/** True only when the dashboard is explicitly configured. Fail closed. */
export function authConfigured(): boolean {
  return adminPassword().length > 0;
}

/**
 * Whether the session cookie gets the `Secure` flag.
 * Defaults to true in production, but can be overridden with COOKIE_SECURE=false
 * for plain-HTTP deployments (e.g. a bare-IP EC2 box before SSL exists) —
 * browsers refuse to store `Secure` cookies over HTTP, which would make the
 * admin dashboard unloginable there.
 */
export function cookieSecure(): boolean {
  const v = (process.env.COOKIE_SECURE ?? "").toLowerCase();
  if (v === "false" || v === "0" || v === "no") return false;
  if (v === "true" || v === "1" || v === "yes") return true;
  return process.env.NODE_ENV === "production";
}

export function sessionToken(): string {
  return crypto
    .createHmac("sha256", sessionSecret())
    .update("labs:admin-session")
    .digest("hex");
}

export function checkPassword(pw: string): boolean {
  // Fail closed: with no ADMIN_PASSWORD configured nobody can log in
  // (previously an empty password matched an empty env var and granted access).
  if (!authConfigured()) return false;
  const a = Buffer.from(
    crypto.createHash("sha256").update(`labs:${adminPassword()}`).digest("hex"),
  );
  const b = Buffer.from(
    crypto.createHash("sha256").update(`labs:${pw}`).digest("hex"),
  );
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function isAdmin(): boolean {
  // Fail closed: with no ADMIN_PASSWORD the token is meaningless, so never
  // accept a cookie in that state (prevents forged-cookie access).
  if (!authConfigured()) return false;
  const jar = cookies();
  const value = jar.get(ADMIN_COOKIE)?.value ?? "";
  if (!value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(sessionToken());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
