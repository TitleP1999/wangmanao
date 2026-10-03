import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/admin";
import { saveProducts, validateProducts } from "@/lib/products";
export async function PUT(request: Request) {
  if (!sameOrigin(request) || !(await isAdmin()))
    return NextResponse.json(
      { error: "กรุณาเข้าสู่ระบบอีกครั้ง" },
      { status: 401 },
    );
  if (process.env.VERCEL && !process.env.DATABASE_URL)
    return NextResponse.json(
      {
        error:
          "กรุณาเชื่อม Neon Database และตั้งค่า DATABASE_URL ใน Vercel ก่อนบันทึกสินค้า",
      },
      { status: 503 },
    );
  let products;
  try {
    products = validateProducts(await request.json());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "ข้อมูลไม่ถูกต้อง" },
      { status: 400 },
    );
  }
  try {
    await saveProducts(products);
  } catch {
    return NextResponse.json(
      {
        error:
          "บันทึกไม่ได้ กรุณาตรวจสอบการเชื่อมต่อฐานข้อมูลหรือพื้นที่จัดเก็บ",
      },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
