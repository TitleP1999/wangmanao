import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ingredients from "@/content/feed-ingredients.json";

export function FeedIngredientCatalog() {
  return (
    <div className="ingredient-catalog">
      <header className="ingredient-intro">
        <div>
          <span className="eyebrow">FEED INGREDIENTS</span>
          <h2>วัตถุดิบผสมอาหารสัตว์</h2>
          <p>เลือกดูสินค้าและรายละเอียดคุณค่าทางโภชนาการ เพื่อประกอบการเลือกวัตถุดิบที่เหมาะกับความต้องการของคุณ</p>
        </div>
        <span className="ingredient-count">{ingredients.length} รายการสินค้า</span>
      </header>
      <nav className="ingredient-index" aria-label="เลือกวัตถุดิบ">
        {ingredients.map((product) => <a key={product.id} href={`#ingredient-${product.id}`}>{product.name}</a>)}
      </nav>
      <div className="ingredient-list">
        {ingredients.map((product) => (
          <article className="ingredient-product" key={product.id} id={`ingredient-${product.id}`}>
            <div className="ingredient-photo">
              <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
            </div>
            <div className="ingredient-details">
              <span className="eyebrow">วัตถุดิบอาหารสัตว์</span>
              <h3>{product.name}</h3>
              <p className="ingredient-reference">อ้างอิงจาก: {product.reference}</p>
              <Link href={`/contact/?category=raw&product=${encodeURIComponent(product.name)}`} className="ingredient-contact">สอบถามสินค้านี้ <ArrowUpRight size={18} /></Link>
            </div>
            <div className="ingredient-table-wrap">
                <table className="ingredient-table">
                  <caption><strong>ข้อมูลคุณค่าทางโภชนาการ</strong><span>Nutrient Profile</span></caption>
                  <thead><tr><th scope="col">รายการ</th><th scope="col">เกณฑ์กำหนด</th><th scope="col">สัดส่วน (%)</th></tr></thead>
                  <tbody>{product.specifications.map((spec) => (
                    <tr key={spec.label}><th scope="row">{spec.label}</th><td>{spec.condition === "-" ? "–" : spec.condition}</td><td>{spec.value}</td></tr>
                  ))}</tbody>
                </table>
              </div>
          </article>
        ))}
      </div>
      <p className="ingredient-legend">“–” หมายถึงไม่มีการระบุค่าในข้อมูลสเปค</p>
    </div>
  );
}
