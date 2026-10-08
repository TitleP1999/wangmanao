import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/admin";
import { storeImage } from "@/lib/image-uploads";
import { imageMime, MAX_IMAGE_BYTES } from "@/lib/image-upload-model";
export async function POST(request: Request) {
  if (!sameOrigin(request) || !(await isAdmin()))
    return NextResponse.json(
      { error: "กรุณาเข้าสู่ระบบอีกครั้ง" },
      { status: 401 },
    );
  if (process.env.VERCEL && !process.env.DATABASE_URL)
    return NextResponse.json(
      { error: "กรุณาตั้งค่า DATABASE_URL ก่อนอัปโหลดรูป" },
      { status: 503 },
    );
  if (Number(request.headers.get("content-length")) > MAX_IMAGE_BYTES + 16384)
    return NextResponse.json(
      { error: "ไฟล์รูปภาพมีขนาดใหญ่เกินไป" },
      { status: 413 },
    );
  let bytes;
  try {
    const data = await request.formData();
    const file = data.get("image");
    if (!(file instanceof File) || file.size > MAX_IMAGE_BYTES)
      throw new Error("กรุณาเลือกรูปภาพขนาดไม่เกิน 1 MB หลังปรับขนาด");
    bytes = new Uint8Array(await file.arrayBuffer());
    imageMime(bytes);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "ไฟล์ไม่ถูกต้อง" },
      { status: 400 },
    );
  }
  try {
    return NextResponse.json({ url: await storeImage(bytes) });
  } catch {
    return NextResponse.json(
      { error: "อัปโหลดไม่สำเร็จ กรุณาตรวจสอบฐานข้อมูลแล้วลองอีกครั้ง" },
      { status: 500 },
    );
  }
}
