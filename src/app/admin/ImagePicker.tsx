"use client";
import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

async function prepareImage(file: File): Promise<Blob> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    throw new Error("เลือกรูป JPG, PNG หรือ WebP ครับ");
  if (file.size > 10 * 1024 * 1024)
    throw new Error("เลือกรูปขนาดไม่เกิน 10 MB");
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("ไม่สามารถเตรียมรูปภาพได้");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.85),
    );
    if (!blob || blob.size > 1024 * 1024)
      throw new Error("รูปยังมีขนาดใหญ่เกินไป กรุณาเลือกรูปที่เล็กลง");
    return blob;
  } finally {
    bitmap.close();
  }
}

export function ImagePicker({
  value,
  onChange,
  onBusyChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  onBusyChange: (busy: boolean) => void;
  disabled: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <div className="admin-image-picker">
      <span className="image-picker-label">รูปภาพสินค้า</span>
      <div className="image-picker-main">
        <img src={preview || value} alt="ตัวอย่างรูปสินค้า" />
        <div>
          <button
            type="button"
            className="image-browse-button"
            disabled={disabled}
            onClick={() => input.current?.click()}
          >
            <ImagePlus size={18} />
            {disabled && preview ? "กำลังอัปโหลด…" : "เลือกรูปจากเครื่อง"}
          </button>
          <small>
            JPG, PNG หรือ WebP สูงสุด 10 MB ระบบจะปรับขนาดรูปให้เหมาะกับเว็บ
          </small>
        </div>
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={disabled}
        hidden
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          setStatus("");
          setError(false);
          onBusyChange(true);
          let url: string | undefined;
          try {
            const blob = await prepareImage(file);
            url = URL.createObjectURL(blob);
            setPreview(url);
            const body = new FormData();
            body.append("image", blob, "product.webp");
            const response = await fetch("/api/admin/images/", {
              method: "POST",
              body,
            });
            const result = await response.json();
            if (!response.ok)
              throw new Error(result.error || "อัปโหลดไม่สำเร็จ");
            onChange(result.url);
            setStatus("รูปพร้อมแล้ว กดบันทึกเพื่อเปลี่ยนรูปบนเว็บไซต์");
          } catch (caught) {
            setError(true);
            setStatus(
              caught instanceof Error ? caught.message : "ไม่สามารถอัปโหลดได้",
            );
          } finally {
            setPreview(null);
            if (url) URL.revokeObjectURL(url);
            onBusyChange(false);
          }
        }}
      />
      {status && (
        <p
          role={error ? "alert" : "status"}
          className={error ? "ingredient-error" : ""}
        >
          {status}
        </p>
      )}
      <details>
        <summary>หรือใช้ลิงก์รูปภาพ</summary>
        <label>
          URL หรือ path รูปภาพ
          <input
            required
            value={value}
            maxLength={500}
            onChange={(event) => {
              onChange(event.target.value);
              setStatus("");
            }}
            disabled={disabled}
          />
        </label>
      </details>
    </div>
  );
}
