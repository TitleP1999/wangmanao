import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
export const sessionCookie = "wangmanao-admin";
const secret = () => process.env.ADMIN_SESSION_SECRET;
export function matches(a: string, b: string) {
  const left = Buffer.from(a),
    right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
export function createSession() {
  const key = secret();
  if (!key || key.length < 32)
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters");
  const expires = String(Date.now() + 8 * 60 * 60 * 1000);
  return `${expires}.${createHmac("sha256", key).update(expires).digest("hex")}`;
}
export async function isAdmin() {
  const key = secret();
  if (!key || key.length < 32) return false;
  const token = (await cookies()).get(sessionCookie)?.value || "";
  const [expires, signature] = token.split(".");
  return (
    /^\d+$/.test(expires || "") &&
    Number(expires) > Date.now() &&
    matches(
      signature || "",
      createHmac("sha256", key).update(expires).digest("hex"),
    )
  );
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const url = new URL(origin);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.host === request.headers.get("host")
    );
  } catch {
    return false;
  }
}
