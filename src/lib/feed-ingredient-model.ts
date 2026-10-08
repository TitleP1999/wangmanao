import defaults from "@/content/feed-ingredients.json";

export type FeedIngredient = (typeof defaults)[number];

export function validateFeedIngredients(value: unknown): FeedIngredient[] {
  if (!Array.isArray(value) || value.length !== defaults.length)
    throw new Error("รายการวัตถุดิบไม่ครบถ้วน");
  return defaults.map((original, index) => {
    const row = value[index];
    if (!row || row.id !== original.id)
      throw new Error("รหัสวัตถุดิบไม่ถูกต้อง");
    const headline =
      row.headline === undefined ? original.headline : row.headline;
    const description =
      row.description === undefined ? original.description : row.description;
    if (
      typeof headline !== "string" ||
      headline.length > 160 ||
      typeof description !== "string" ||
      description.length > 1200
    )
      throw new Error(
        "จุดเด่นต้องไม่เกิน 160 ตัวอักษร และรายละเอียดต้องไม่เกิน 1,200 ตัวอักษร",
      );
    for (const key of ["name", "image", "reference"] as const) {
      if (
        typeof row[key] !== "string" ||
        !row[key].trim() ||
        row[key].length > 500
      )
        throw new Error(`กรุณากรอกข้อมูล ${original.name} ให้ครบถ้วน`);
    }
    const image = row.image.trim();
    if (
      !/^\/images\/[a-zA-Z0-9_./-]+$/.test(image) &&
      !/^\/api\/images\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/$/.test(
        image,
      )
    ) {
      try {
        const url = new URL(image);
        if (url.protocol !== "https:" || url.username || url.password)
          throw new Error();
      } catch {
        throw new Error("รูปภาพต้องเป็น /images/... หรือ HTTPS URL");
      }
    }
    if (
      !Array.isArray(row.specifications) ||
      row.specifications.length !== original.specifications.length
    )
      throw new Error(`ข้อมูลสเปค ${original.name} ไม่ครบถ้วน`);
    const specifications = original.specifications.map((spec, i) => {
      const edited = row.specifications[i];
      if (
        !edited ||
        edited.label !== spec.label ||
        !["ไม่น้อยกว่า", "ไม่มากกว่า", "-"].includes(edited.condition)
      )
        throw new Error(`เกณฑ์กำหนด ${original.name} ไม่ถูกต้อง`);
      if (edited.value === "–" && edited.condition === "-")
        return { ...spec, condition: "-", value: "–" };
      if (
        typeof edited.value !== "string" ||
        !/^\d{1,3}(\.\d{1,2})?%$/.test(edited.value) ||
        Number(edited.value.slice(0, -1)) > 100 ||
        edited.condition === "-"
      )
        throw new Error(
          `${original.name}: ${spec.label} ต้องมีเกณฑ์และเปอร์เซ็นต์ 0–100 (ทศนิยมไม่เกิน 2 ตำแหน่ง)`,
        );
      return {
        label: spec.label,
        condition: edited.condition,
        value: `${Number(edited.value.slice(0, -1)).toFixed(2)}%`,
      };
    });
    return {
      id: original.id,
      name: row.name.trim(),
      image,
      reference: row.reference.trim(),
      headline: headline.trim(),
      description: description.trim(),
      specifications,
    };
  });
}
