import "server-only";
import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { categories } from "@/content/company";
import { getDatabaseProducts, saveDatabaseProducts } from "./product-database";

export type ProductCategory = (typeof categories)[number];
const file = path.join(
  process.env.CONTENT_DATA_DIR || path.join(process.cwd(), "data"),
  "products.json",
);

export function validateProducts(value: unknown): ProductCategory[] {
  if (!Array.isArray(value) || !value.length)
    throw new Error("ข้อมูลหมวดหมู่ไม่ครบถ้วน");
  // Older saved content can contain retired categories. Only retain raw materials.
  return categories.map((original) => {
    const matches = value.filter((row) => row?.id === original.id);
    if (matches.length !== 1) throw new Error("ข้อมูลหมวดหมู่ไม่ครบถ้วน");
    const row = matches[0];
    if (!row || row.id !== original.id)
      throw new Error("รหัสหมวดหมู่ไม่ถูกต้อง");
    const fields = ["name", "en", "description", "image"] as const;
    const result = { ...original };
    for (const key of fields) {
      if (
        typeof row[key] !== "string" ||
        !row[key].trim() ||
        row[key].length > (key === "description" ? 2000 : 500)
      )
        throw new Error("กรุณากรอกข้อมูลให้ครบและไม่เกินความยาวที่กำหนด");
      result[key] = row[key].trim();
    }
    if (
      !/^\/images\/[a-zA-Z0-9_./-]+$/.test(result.image) &&
      !/^\/api\/images\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/$/.test(
        result.image,
      ) &&
      !/^https:\/\//.test(result.image)
    )
      throw new Error("รูปภาพต้องเป็น /images/... หรือ HTTPS URL");
    if (result.image.startsWith("https:")) {
      try {
        const url = new URL(result.image);
        if (url.username || url.password) throw new Error();
      } catch {
        throw new Error("URL รูปภาพไม่ถูกต้อง");
      }
    }
    if (
      !Array.isArray(row.items) ||
      row.items.length < 1 ||
      row.items.length > 50 ||
      row.items.some(
        (item: unknown) =>
          typeof item !== "string" || !item.trim() || item.length > 300,
      )
    )
      throw new Error("กรุณาระบุรายการสินค้า 1–50 รายการ");
    result.items = row.items.map((item: string) => item.trim());
    return result;
  });
}

export async function getProducts(): Promise<ProductCategory[]> {
  if (process.env.DATABASE_URL) {
    const saved = await getDatabaseProducts();
    return saved === null ? categories : validateProducts(saved);
  }
  // Vercel has no persistent writable project directory. Initial content can
  // still render before the database is connected, but writes must fail.
  if (process.env.VERCEL) return categories;
  try {
    return validateProducts(JSON.parse(await readFile(file, "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return categories;
    throw error;
  }
}

export async function saveProducts(products: ProductCategory[]) {
  const validated = validateProducts(products);
  if (process.env.DATABASE_URL) {
    await saveDatabaseProducts(validated);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("DATABASE_URL is required to save products on Vercel");
  }
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporary, JSON.stringify(validated, null, 2), "utf8");
  await rename(temporary, file);
}
