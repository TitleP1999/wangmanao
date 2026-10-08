"use client";
import { useEffect, useState } from "react";
import { Save, Search } from "lucide-react";
import { ImagePicker } from "./ImagePicker";
import {
  validateFeedIngredients,
  type FeedIngredient,
} from "@/lib/feed-ingredient-model";

export function IngredientAdmin({
  initialIngredients,
  onDirtyChange,
}: {
  initialIngredients: FeedIngredient[];
  onDirtyChange: (dirty: boolean) => void;
}) {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [saved, setSaved] = useState(initialIngredients);
  const [selected, setSelected] = useState(initialIngredients[0]?.id);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const dirty = JSON.stringify(ingredients) !== JSON.stringify(saved);
  const product = ingredients.find((item) => item.id === selected);
  useEffect(() => {
    onDirtyChange(dirty);
  }, [dirty, onDirtyChange]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function update(change: Partial<FeedIngredient>) {
    setIngredients((previous) =>
      previous.map((item) =>
        item.id === selected ? { ...item, ...change } : item,
      ),
    );
    setMessage("");
  }
  if (!product) return null;
  return (
    <div className="admin-workspace ingredient-admin">
      <aside className="admin-sidebar">
        <h2>วัตถุดิบอาหารสัตว์</h2>
        <p>เลือกสินค้าที่ต้องการแก้ไข</p>
        <label className="ingredient-search">
          <Search size={16} />
          <input
            aria-label="ค้นหาวัตถุดิบ"
            placeholder="ค้นหาชื่อสินค้า…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <div className="ingredient-admin-list">
          {ingredients
            .filter((item) => item.name.includes(search.trim()))
            .map((item) => (
              <button
                disabled={busy}
                key={item.id}
                aria-pressed={item.id === selected}
                onClick={() => setSelected(item.id)}
              >
                <img src={item.image} alt="" />
                <span>{item.name}</span>
                {JSON.stringify(item) !==
                  JSON.stringify(saved.find((row) => row.id === item.id)) && (
                  <i aria-label="มีการแก้ไขที่ยังไม่บันทึก" />
                )}
              </button>
            ))}
          {!ingredients.some((item) => item.name.includes(search.trim())) && (
            <p>ไม่พบสินค้าที่ค้นหา</p>
          )}
        </div>
        <small>
          สลับสินค้าได้โดยข้อมูลที่แก้ยังอยู่ กดบันทึกเพื่อเผยแพร่ทั้งหมด
        </small>
      </aside>
      <form
        className="admin-editor"
        onSubmit={async (event) => {
          event.preventDefault();
          setMessage("");
          setError(false);
          try {
            const validated = validateFeedIngredients(ingredients);
            setBusy(true);
            const response = await fetch("/api/admin/feed-ingredients/", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(validated),
            });
            const result = await response.json();
            if (!response.ok)
              throw new Error(result.error || "บันทึกไม่สำเร็จ");
            setIngredients(result.ingredients);
            setSaved(result.ingredients);
            setMessage(
              "บันทึกสำเร็จ ข้อมูลวัตถุดิบและตารางสเปคบนเว็บไซต์อัปเดตแล้ว",
            );
          } catch (caught) {
            setError(true);
            setMessage(
              caught instanceof Error
                ? caught.message
                : "เชื่อมต่อไม่ได้ กรุณาลองอีกครั้ง",
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="admin-editor-heading">
          <div>
            <span className="eyebrow">FEED INGREDIENTS</span>
            <h2>{product.name}</h2>
          </div>
          <span className="admin-badge">
            {dirty ? "มีข้อมูลที่ยังไม่บันทึก" : "บันทึกแล้ว"}
          </span>
        </div>
        <fieldset disabled={busy} className="ingredient-edit-fields">
          <div className="ingredient-form-intro">
            <img
              src={product.image}
              alt={product.name}
              key={product.image}
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden";
              }}
            />
            <div>
              <h3>ข้อมูลสินค้า</h3>
              <p>ชื่อและรูปนี้จะแสดงในการ์ดบนหน้าสินค้า</p>
            </div>
          </div>
          <label>
            ชื่อวัตถุดิบ
            <input
              required
              maxLength={500}
              value={product.name}
              onChange={(event) => update({ name: event.target.value })}
            />
          </label>
          <ImagePicker
            key={product.id}
            value={product.image}
            onChange={(image) => update({ image })}
            onBusyChange={setBusy}
            disabled={busy}
          />
          <label>
            แหล่งอ้างอิงสเปค
            <input
              required
              maxLength={500}
              value={product.reference}
              onChange={(event) => update({ reference: event.target.value })}
            />
          </label>
          <div className="ingredient-spec-heading">
            <h3>คุณค่าทางโภชนาการ</h3>
            <p>กรอกเปอร์เซ็นต์โดยไม่ต้องใส่เครื่องหมาย % เช่น 24 หรือ 12.50</p>
          </div>
          <div className="ingredient-spec-editor">
            {product.specifications.map((spec, index) => (
              <div className="ingredient-spec-row" key={spec.label}>
                <strong>{spec.label}</strong>
                <label>
                  <span>เกณฑ์กำหนด</span>
                  <select
                    aria-label={`เกณฑ์ ${spec.label}`}
                    value={spec.condition}
                    onChange={(event) =>
                      update({
                        specifications: product.specifications.map((item, i) =>
                          i === index
                            ? {
                                ...item,
                                condition: event.target.value,
                                value:
                                  event.target.value === "-"
                                    ? "–"
                                    : item.value === "–"
                                      ? ""
                                      : item.value,
                              }
                            : item,
                        ),
                      })
                    }
                  >
                    <option value="ไม่น้อยกว่า">ไม่น้อยกว่า</option>
                    <option value="ไม่มากกว่า">ไม่มากกว่า</option>
                    <option value="-">ไม่ระบุค่า</option>
                  </select>
                </label>
                <label>
                  <span>สัดส่วน (%)</span>
                  <div className="ingredient-percent">
                    <input
                      aria-label={`เปอร์เซ็นต์ ${spec.label}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={100}
                      step="0.01"
                      required={spec.condition !== "-"}
                      disabled={spec.condition === "-"}
                      placeholder="–"
                      value={
                        spec.value === "–" ? "" : spec.value.replace(/%$/, "")
                      }
                      onChange={(event) =>
                        update({
                          specifications: product.specifications.map(
                            (item, i) =>
                              i === index
                                ? {
                                    ...item,
                                    value: event.target.value
                                      ? `${event.target.value}%`
                                      : "",
                                  }
                                : item,
                          ),
                        })
                      }
                    />
                    <span>%</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <details className="ingredient-admin-preview">
            <summary>ดูตัวอย่างตารางบนเว็บไซต์</summary>
            <table>
              <thead>
                <tr>
                  <th>รายการ</th>
                  <th>เกณฑ์</th>
                  <th>สัดส่วน</th>
                </tr>
              </thead>
              <tbody>
                {product.specifications.map((spec) => (
                  <tr key={spec.label}>
                    <th scope="row">{spec.label}</th>
                    <td>{spec.condition === "-" ? "–" : spec.condition}</td>
                    <td>{spec.value || "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </fieldset>
        <footer className="admin-save ingredient-save">
          <p
            role={error ? "alert" : "status"}
            className={error ? "ingredient-error" : ""}
          >
            {message ||
              (dirty ? "มีการแก้ไขที่ยังไม่บันทึก" : "ข้อมูลพร้อมแก้ไข")}
          </p>
          <button className="admin-primary" disabled={busy || !dirty}>
            <Save size={18} />
            {busy ? "กำลังบันทึก…" : "บันทึกวัตถุดิบทั้งหมด"}
          </button>
        </footer>
      </form>
    </div>
  );
}
