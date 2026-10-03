import { NextResponse } from "next/server";
import { createSession, matches, sameOrigin, sessionCookie } from "@/lib/admin";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "คำขอไม่ถูกต้อง" }, { status: 403 });
  if (
    !process.env.ADMIN_PASSWORD ||
    !process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_SESSION_SECRET.length < 32
  )
    return NextResponse.json(
      {
        error:
          "กรุณาตั้งค่า ADMIN_PASSWORD และ ADMIN_SESSION_SECRET บนเซิร์ฟเวอร์",
      },
      { status: 503 },
    );
  let password: unknown;
  try {
    password = (await request.json()).password;
  } catch {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }
  if (
    typeof password !== "string" ||
    !matches(password, process.env.ADMIN_PASSWORD)
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie, createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 28800,
  });
  return response;
}
