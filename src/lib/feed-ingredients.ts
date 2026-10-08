import "server-only";
import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import defaults from "@/content/feed-ingredients.json";
import {
  validateFeedIngredients,
  type FeedIngredient,
} from "./feed-ingredient-model";
import { getDatabaseContent, saveDatabaseContent } from "./product-database";

const file = path.join(
  process.env.CONTENT_DATA_DIR || path.join(process.cwd(), "data"),
  "feed-ingredients.json",
);

export async function getFeedIngredients(): Promise<FeedIngredient[]> {
  if (process.env.DATABASE_URL) {
    const saved = await getDatabaseContent("feed-ingredients");
    return saved === null ? defaults : validateFeedIngredients(saved);
  }
  if (process.env.VERCEL) return defaults;
  try {
    return validateFeedIngredients(JSON.parse(await readFile(file, "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return defaults;
    throw error;
  }
}

export async function saveFeedIngredients(value: unknown) {
  const validated = validateFeedIngredients(value);
  if (process.env.DATABASE_URL)
    return saveDatabaseContent("feed-ingredients", validated);
  if (process.env.VERCEL) throw new Error("DATABASE_URL is required");
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporary, JSON.stringify(validated, null, 2), "utf8");
  await rename(temporary, file);
}
