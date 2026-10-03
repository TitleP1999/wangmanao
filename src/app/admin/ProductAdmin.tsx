"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockKeyhole, Package, Save, LogOut, ExternalLink } from "lucide-react";
import type { ProductCategory } from "@/lib/products";

export function ProductAdmin({
  authenticated,
  initialProducts,
}: {
  authenticated: boolean;
  initialProducts: ProductCategory[];
}) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [selected, setSelected] = useState(0);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [itemsDraft, setItemsDraft] = useState<string | null>(null);
  const product = products[selected];
  async function request(url: string, method: string, body?: unknown) {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "ไม่สามารถดำเนินการได้");
      return true;
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
      );
      return false;
    } finally {
      setBusy(false);
    }
  }
  function update(key: "name" | "en" | "description" | "image", value: string) {
    setProducts((previous) =>
      previous.map((row, index) =>
        index === selected ? { ...row, [key]: value } : row,
      ),
    );
    setDirty(true);
    setMessage("");
  }
  function currentProducts() {
    return products.map((row, index) =>
      index === selected && itemsDraft !== null
        ? {
            ...row,
            items: itemsDraft
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          }
        : row,
    );
  }
  if (!authenticated)
    return (
      <section className="admin-page">
        <form
          className="admin-login"
          onSubmit={async (event) => {
            event.preventDefault();
            if (await request("/api/admin/login/", "POST", { password })) {
              setPassword("");
              router.refresh();
            }
          }}
        >
          <LockKeyhole size={32} />
          <span className="eyebrow">WANGMANAO ADMIN</span>
          <h1>เข้าสู่ระบบหลังบ้าน</h1>
          <p>จัดการรายละเอียดสินค้าและข้อมูลที่แสดงบนเว็บไซต์</p>
          <label>
            รหัสผ่านผู้ดูแล
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button className="admin-primary" disabled={busy}>
            {busy ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
          </button>
          <p role="status">{message}</p>
          <Link href="/">กลับหน้าเว็บไซต์</Link>
        </form>
      </section>
    );
  if (!product)
    return <section className="admin-page">ไม่มีข้อมูลสินค้า</section>;
  return (
    <section className="admin-page">
      <div className="admin-shell">
        <header className="admin-heading">
          <div>
            <span className="eyebrow">CONTENT MANAGEMENT</span>
            <h1>จัดการสินค้า</h1>
            <p>แก้ไขข้อมูลในหน้าแรกและหน้าสินค้าและบริการ</p>
          </div>
          <div className="admin-actions">
            <Link href="/" target="_blank">
              ดูเว็บไซต์ <ExternalLink size={16} />
            </Link>
            <button
              disabled={busy}
              onClick={async () => {
                if (
                  dirty &&
                  !window.confirm(
                    "มีข้อมูลที่ยังไม่บันทึก ต้องการออกจากระบบหรือไม่?",
                  )
                )
                  return;
                if (await request("/api/admin/logout/", "POST"))
                  window.location.assign("/admin/");
              }}
            >
              <LogOut size={16} /> ออกจากระบบ
            </button>
          </div>
        </header>
        <div className="admin-workspace">
          <aside className="admin-sidebar">
            <h2>
              <Package size={18} /> หมวดหมู่สินค้า
            </h2>
            <p>{products.length} หมวดหมู่</p>
            {products.map((row, index) => (
              <button
                key={row.id}
                aria-pressed={selected === index}
                onClick={() => {
                  setProducts(currentProducts());
                  setItemsDraft(null);
                  setSelected(index);
                }}
              >
                <span>0{index + 1}</span>
                {row.name}
              </button>
            ))}
            <small>ข้อมูลที่บันทึกจะเผยแพร่บนเว็บไซต์ทันที</small>
          </aside>
          <form
            className="admin-editor"
            onSubmit={async (event) => {
              event.preventDefault();
              const next = currentProducts();
              if (await request("/api/admin/products/", "PUT", next)) {
                setProducts(next);
                setItemsDraft(null);
                setDirty(false);
                setMessage("บันทึกสำเร็จ ข้อมูลบนเว็บไซต์อัปเดตแล้ว");
              }
            }}
          >
            <div className="admin-editor-heading">
              <div>
                <span className="eyebrow">PRODUCT DETAILS · {product.id}</span>
                <h2>{product.name}</h2>
              </div>
              <span className="admin-badge">
                {dirty ? "ยังไม่บันทึก" : "ข้อมูลปัจจุบัน"}
              </span>
            </div>
            <div className="admin-fields">
              <label>
                ชื่อหมวดหมู่ภาษาไทย
                <input
                  required
                  maxLength={500}
                  value={product.name}
                  onChange={(event) => update("name", event.target.value)}
                />
              </label>
              <label>
                ชื่อภาษาอังกฤษ
                <input
                  required
                  maxLength={500}
                  value={product.en}
                  onChange={(event) => update("en", event.target.value)}
                />
              </label>
            </div>
            <label>
              คำอธิบายสินค้า
              <textarea
                required
                rows={4}
                maxLength={2000}
                value={product.description}
                onChange={(event) => update("description", event.target.value)}
              />
            </label>
            <label>
              รูปภาพ
              <input
                required
                maxLength={500}
                value={product.image}
                onChange={(event) => update("image", event.target.value)}
              />
              <small>
                ใช้ path เช่น /images/corn.png หรือ URL รูปภาพ https://…
              </small>
            </label>
            <label>
              รายการสินค้า
              <textarea
                required
                rows={7}
                value={itemsDraft ?? product.items.join("\n")}
                onChange={(event) => {
                  setItemsDraft(event.target.value);
                  setDirty(true);
                  setMessage("");
                }}
              />
              <small>หนึ่งรายการต่อบรรทัด สูงสุด 50 รายการ</small>
            </label>
            <div className="admin-preview">
              <img
                src={product.image}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
                onLoad={(event) => {
                  event.currentTarget.style.visibility = "visible";
                }}
              />
              <div>
                <span className="eyebrow">ตัวอย่างข้อมูล</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
            <footer className="admin-save">
              <p role="status" aria-live="polite">
                {message ||
                  (dirty ? "มีการแก้ไขที่ยังไม่ได้บันทึก" : "พร้อมแก้ไขข้อมูล")}
              </p>
              <button className="admin-primary" disabled={busy || !dirty}>
                <Save size={18} />
                {busy ? "กำลังบันทึก…" : "บันทึกและเผยแพร่"}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </section>
  );
}
