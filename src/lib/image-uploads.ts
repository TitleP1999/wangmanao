import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getDatabaseContent, saveDatabaseContent } from "./product-database";
import { imageMime } from "./image-upload-model";
type StoredImage = { mime: string; base64: string };
const directory = path.join(
  process.env.CONTENT_DATA_DIR || path.join(process.cwd(), "data"),
  "uploads",
);
export async function storeImage(bytes: Uint8Array) {
  const image: StoredImage = {
    mime: imageMime(bytes),
    base64: Buffer.from(bytes).toString("base64"),
  };
  const id = randomUUID();
  if (process.env.DATABASE_URL) await saveDatabaseContent(`image:${id}`, image);
  else {
    if (process.env.VERCEL) throw new Error("DATABASE_URL is required");
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, `${id}.json`), JSON.stringify(image), {
      flag: "wx",
    });
  }
  return `/api/images/${id}/`;
}
export async function readImage(id: string): Promise<StoredImage | null> {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      id,
    )
  )
    return null;
  if (process.env.DATABASE_URL)
    return (await getDatabaseContent(`image:${id}`)) as StoredImage | null;
  if (process.env.VERCEL) return null;
  try {
    return JSON.parse(
      await readFile(path.join(directory, `${id}.json`), "utf8"),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
