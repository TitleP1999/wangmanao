import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/admin";
import { validateFeedIngredients } from "@/lib/feed-ingredient-model";
import { saveFeedIngredients } from "@/lib/feed-ingredients";

export async function PUT(request: Request) {
  if (!sameOrigin(request) || !(await isAdmin()))
    return NextResponse.json(
      { error: "กรุณาเข้าสู่ระบบอีกครั้ง" },
      { status: 401 },
    );
  if (process.env.VERCEL && !process.env.DATABASE_URL)
    return NextResponse.json(
      { error: "กรุณาตั้งค่า DATABASE_URL ก่อนบันทึก" },
      { status: 503 },
    );
  let ingredients;
  try {
    ingredients = validateFeedIngredients(await request.json());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "ข้อมูลไม่ถูกต้อง" },
      { status: 400 },
    );
  }
  try {
    await saveFeedIngredients(ingredients);
  } catch {
    return NextResponse.json(
      { error: "บันทึกไม่ได้ กรุณาตรวจสอบการเชื่อมต่อฐานข้อมูล" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, ingredients });
}
