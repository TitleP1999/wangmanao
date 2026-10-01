import { PageHero } from "@/components/ui/PageHero";
import { partners } from "@/content/company";
export const metadata = { title: "พันธมิตรของเรา" };
export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="OUR PARTNERS"
        title="ร่วมส่งต่อคุณภาพไปด้วยกัน"
        description="แบรนด์สินค้าและพันธมิตรที่ปรากฏบนเว็บไซต์ของวังมะนาวเกษตรภัณฑ์"
      />
      <section className="container section">
        <p className="body-copy">
          เราคัดสรรสินค้าจากแบรนด์ที่หลากหลาย
          เพื่อให้ลูกค้าเลือกผลิตภัณฑ์ที่เหมาะกับความต้องการ ทั้งอาหารสัตว์
          วัตถุดิบ และสินค้าเกษตร
        </p>
        <div className="partner-grid">
          {partners.map((p) => (
            <article key={p.name}>
              <img src={p.image} alt={p.name} />
              <h2>{p.name}</h2>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
