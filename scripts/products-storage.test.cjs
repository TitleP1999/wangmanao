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
  let stored = null;
  const queries = [];
  const neon =
    () =>
    async (strings, ...values) => {
      const query = strings.join("?");
      queries.push({ query, values });
      if (query.includes("SELECT value"))
        return stored === null ? [] : [{ value: stored }];
      if (query.includes("INSERT INTO")) stored = JSON.parse(values[0]);
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
  assert.equal(write.values[0], JSON.stringify(edited));
  assert.equal(
    JSON.stringify(await instance().getDatabaseProducts()),
    JSON.stringify(edited),
  );
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
