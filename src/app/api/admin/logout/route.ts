import { NextResponse } from "next/server";
import { sameOrigin, sessionCookie } from "@/lib/admin";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "คำขอไม่ถูกต้อง" }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie, "", { path: "/", maxAge: 0 });
  return response;
}
