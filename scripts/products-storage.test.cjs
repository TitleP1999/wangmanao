const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function load(file, dependencies, env = {}) {
  const module = { exports: {} };
  const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(
    compiled,
    {
      module,
      Buffer,
      exports: module.exports,
      process: { env, cwd: () => "/workspace" },
      require: (name) => {
        if (name === "server-only") return {};
        if (name in dependencies) return dependencies[name];
        return require(name);
      },
    },
    { filename: file },
  );
  return module.exports;
}

const { categories } = load("src/content/company.ts", {});
test("Legacy categories are filtered without losing the edited raw material category", () => {
  const store = products({}, {});
  const legacy = [
    { ...structuredClone(categories[0]), name: "วัตถุดิบที่แก้ไขแล้ว" },
    { id: "livestock" },
    { id: "aquatic" },
    { id: "pet" },
    { id: "rice" },
  ];
  const result = store.validateProducts(legacy);
  assert.equal(result.length, 1);
  assert.equal(result[0].name, "วัตถุดิบที่แก้ไขแล้ว");
  assert.throws(
    () => store.validateProducts([legacy[0], legacy[0]]),
    /ไม่ครบถ้วน/,
  );
});
function products(env, database) {
  return load(
    "src/lib/products.ts",
    {
      "@/content/company": { categories },
      "./product-database": database,
      "node:fs/promises": {
        readFile: async () => {
          throw new Error("unexpected disk read");
        },
        mkdir: async () => {
          throw new Error("unexpected disk write");
        },
      },
    },
    env,
  );
}

test("Vercel without a database shows defaults but refuses writes without touching disk", async () => {
  const store = products({ VERCEL: "1" }, {});
  assert.deepEqual(await store.getProducts(), categories);
  await assert.rejects(store.saveProducts(categories), /DATABASE_URL/);
});

test("Configured database takes precedence over disk and validates saved content", async () => {
  let saved;
  const store = products(
    { DATABASE_URL: "configured" },
    {
      getDatabaseProducts: async () => saved ?? null,
      saveDatabaseProducts: async (value) => {
        saved = value;
      },
    },
  );
  assert.deepEqual(await store.getProducts(), categories);
  const edited = structuredClone(categories);
  edited[0].description = "แก้ไขจากหลังบ้าน";
  await store.saveProducts(edited);
  assert.equal(
    (await store.getProducts())[0].description,
    edited[0].description,
  );
  saved = [];
  await assert.rejects(store.getProducts(), /ข้อมูลหมวดหมู่/);
});

test("Database failures do not silently revert public content to defaults", async () => {
  const store = products(
    { DATABASE_URL: "configured" },
    {
      getDatabaseProducts: async () => {
        throw new Error("database unavailable");
      },
    },
  );
  await assert.rejects(store.getProducts(), /database unavailable/);
});

test("Database initializes safely, parameterizes JSON, and retains edits across instances", async () => {
  const stored = new Map();
  const queries = [];
  const neon =
    () =>
    async (strings, ...values) => {
      const query = strings.join("?");
      queries.push({ query, values });
      if (query.includes("SELECT value"))
        return stored.has(values[0]) ? [{ value: stored.get(values[0]) }] : [];
      if (query.includes("INSERT INTO"))
        stored.set(values[0], JSON.parse(values[1]));
      return [];
    };
  const instance = () =>
    load(
      "src/lib/product-database.ts",
      {
        "@neondatabase/serverless": { neon },
      },
      { DATABASE_URL: "configured" },
    );
  const first = instance();
  assert.equal(await first.getDatabaseProducts(), null);
  const edited = [{ name: "สินค้า ' ; DROP TABLE", description: "ทดสอบ" }];
  await first.saveDatabaseProducts(edited);
  assert.equal(
    queries.filter((q) => q.query.includes("CREATE TABLE")).length,
    1,
  );
  const write = queries.find((q) => q.query.includes("INSERT INTO"));
  assert.ok(write.query.includes("ON CONFLICT"));
  assert.ok(!write.query.includes(edited[0].name));
  assert.equal(write.values[0], "products");
  assert.equal(write.values[1], JSON.stringify(edited));
  await first.saveDatabaseContent("feed-ingredients", [{ name: "วัตถุดิบ" }]);
  assert.equal(
    JSON.stringify(await first.getDatabaseProducts()),
    JSON.stringify(edited),
  );
  assert.equal(
    JSON.stringify(await first.getDatabaseContent("feed-ingredients")),
    JSON.stringify([{ name: "วัตถุดิบ" }]),
  );
  assert.equal(
    JSON.stringify(await instance().getDatabaseProducts()),
    JSON.stringify(edited),
  );
});

const ingredientDefaults = JSON.parse(
  fs.readFileSync("src/content/feed-ingredients.json", "utf8"),
);
test("Image uploads validate raster content, reject oversized files and persist on database", async () => {
  const model = load("src/lib/image-upload-model.ts", {});
  const valid = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0]);
  assert.equal(model.imageMime(valid), "image/png");
  assert.throws(
    () => model.imageMime(new Uint8Array(Buffer.from("<svg></svg>"))),
    /เฉพาะรูป/,
  );
  assert.throws(
    () => model.imageMime(new Uint8Array(model.MAX_IMAGE_BYTES + 1)),
    /1 MB/,
  );
  const content = new Map();
  const images = load(
    "src/lib/image-uploads.ts",
    {
      "./image-upload-model": model,
      "./product-database": {
        saveDatabaseContent: async (key, value) => content.set(key, value),
        getDatabaseContent: async (key) => content.get(key) ?? null,
      },
    },
    { DATABASE_URL: "configured" },
  );
  const url = await images.storeImage(valid);
  assert.match(url, /^\/api\/images\/[0-9a-f-]+\/$/);
  const stored = await images.readImage(url.split("/")[3]);
  assert.equal(stored.mime, "image/png");
  assert.equal(stored.base64, Buffer.from(valid).toString("base64"));
  assert.equal(await images.readImage("../../secrets"), null);
  const edited = structuredClone(ingredientDefaults);
  edited[0].image = url;
  assert.equal(ingredientModel.validateFeedIngredients(edited)[0].image, url);
  const vercel = load(
    "src/lib/image-uploads.ts",
    {
      "./image-upload-model": model,
      "./product-database": {},
    },
    { VERCEL: "1" },
  );
  await assert.rejects(vercel.storeImage(valid), /DATABASE_URL/);
});
const ingredientModel = load("src/lib/feed-ingredient-model.ts", {
  "@/content/feed-ingredients.json": ingredientDefaults,
});
test("Descriptions backfill old records, retain edits and allow intentionally blank text", () => {
  const legacy = structuredClone(ingredientDefaults);
  delete legacy[0].headline;
  delete legacy[0].description;
  legacy[0].specifications[0].value = "28%";
  const restored = ingredientModel.validateFeedIngredients(legacy);
  assert.equal(restored[0].description, ingredientDefaults[0].description);
  assert.equal(restored[0].specifications[0].value, "28.00%");
  legacy[0].headline = "จุดเด่นที่แก้เอง";
  legacy[0].description = "";
  assert.equal(
    ingredientModel.validateFeedIngredients(legacy)[0].headline,
    legacy[0].headline,
  );
  assert.equal(
    ingredientModel.validateFeedIngredients(legacy)[0].description,
    "",
  );
  legacy[0].description = "x".repeat(1201);
  assert.throws(() => ingredientModel.validateFeedIngredients(legacy), /1,200/);
});

test("Ingredient percentages keep minimum/maximum semantics, zero and missing values distinct", () => {
  const edited = structuredClone(ingredientDefaults);
  edited[0].specifications[0].value = "0%";
  const validated = ingredientModel.validateFeedIngredients(edited);
  assert.equal(validated[0].specifications[0].value, "0.00%");
  assert.equal(validated[0].specifications[0].condition, "ไม่น้อยกว่า");
  assert.equal(validated[0].specifications[1].value, "–");
  for (const invalid of ["101%", "-1%", "NaN%", "", "12.345%"]) {
    edited[0].specifications[0].value = invalid;
    assert.throws(
      () => ingredientModel.validateFeedIngredients(edited),
      /เปอร์เซ็นต์/,
    );
  }
  edited[0].specifications[0].value = "24%";
  edited[0].specifications[0].condition = "-";
  assert.throws(
    () => ingredientModel.validateFeedIngredients(edited),
    /เปอร์เซ็นต์/,
  );
});

test("Ingredient edits persist independently and database failures stay visible", async () => {
  let saved = null;
  const store = load(
    "src/lib/feed-ingredients.ts",
    {
      "@/content/feed-ingredients.json": ingredientDefaults,
      "./feed-ingredient-model": ingredientModel,
      "./product-database": {
        getDatabaseContent: async (key) => {
          assert.equal(key, "feed-ingredients");
          return saved;
        },
        saveDatabaseContent: async (key, value) => {
          assert.equal(key, "feed-ingredients");
          saved = value;
        },
      },
    },
    { DATABASE_URL: "configured" },
  );
  assert.equal((await store.getFeedIngredients()).length, 10);
  const edited = structuredClone(ingredientDefaults);
  edited[0].name = "วัตถุดิบที่แก้จากแอดมิน";
  edited[0].specifications[0].value = "26.5%";
  await store.saveFeedIngredients(edited);
  const restored = await store.getFeedIngredients();
  assert.equal(restored[0].name, edited[0].name);
  assert.equal(restored[0].specifications[0].value, "26.50%");
  const unavailable = load(
    "src/lib/feed-ingredients.ts",
    {
      "@/content/feed-ingredients.json": ingredientDefaults,
      "./feed-ingredient-model": ingredientModel,
      "./product-database": {
        getDatabaseContent: async () => {
          throw new Error("database unavailable");
        },
      },
    },
    { DATABASE_URL: "configured" },
  );
  await assert.rejects(
    unavailable.getFeedIngredients(),
    /database unavailable/,
  );
  const vercel = load(
    "src/lib/feed-ingredients.ts",
    {
      "@/content/feed-ingredients.json": ingredientDefaults,
      "./feed-ingredient-model": ingredientModel,
      "./product-database": {},
    },
    { VERCEL: "1" },
  );
  await assert.rejects(vercel.saveFeedIngredients(edited), /DATABASE_URL/);
});

test("A failed table initialization is retried on the next request", async () => {
  let attempts = 0;
  const database = load(
    "src/lib/product-database.ts",
    {
      "@neondatabase/serverless": {
        neon: () => async (strings) => {
          if (strings.join("").includes("CREATE TABLE") && ++attempts === 1)
            throw new Error("temporary failure");
          return [];
        },
      },
    },
    { DATABASE_URL: "configured" },
  );
  await assert.rejects(database.getDatabaseProducts(), /temporary failure/);
  assert.equal(await database.getDatabaseProducts(), null);
  assert.equal(attempts, 2);
});
