import { readImage } from "@/lib/image-uploads";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const image = await readImage((await params).id);
    if (!image) return new Response(null, { status: 404 });
    return new Response(new Uint8Array(Buffer.from(image.base64, "base64")), {
      headers: {
        "Content-Type": image.mime,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response(null, { status: 503 });
  }
}
