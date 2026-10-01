import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container section">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>ไม่พบหน้าที่คุณกำลังมองหา</h1>
      <p className="body-copy">
        กลับไปสำรวจสินค้าและเรื่องราวของวังมะนาวได้ที่หน้าแรก
      </p>
      <Link href="/" className="button outline">
        กลับหน้าแรก
      </Link>
    </section>
  );
}
