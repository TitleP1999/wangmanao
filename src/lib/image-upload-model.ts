export const MAX_IMAGE_BYTES = 1024 * 1024;
export function imageMime(bytes: Uint8Array): string {
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES)
    throw new Error("รูปภาพต้องมีขนาดไม่เกิน 1 MB หลังปรับขนาด");
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff)
    return "image/jpeg";
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((value, i) => bytes[i] === value))
    return "image/png";
  if (
    String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
  )
    return "image/webp";
  throw new Error("รองรับเฉพาะรูป JPG, PNG และ WebP");
}
