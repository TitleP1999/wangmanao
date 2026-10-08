import { PageHero } from "@/components/ui/PageHero";
import { partners } from "@/content/company";
import { PartnerIdentity } from "@/components/ui/PartnerIdentity";
export const metadata = { title: "พันธมิตรของเรา" };
export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="OUR PARTNERS"
        title="ร่วมส่งต่อคุณภาพไปด้วยกัน"
        description="แบรนด์สินค้า พันธมิตรธุรกิจ และเครือข่ายสหกรณ์ที่ร่วมเติบโตไปกับวังมะนาวเกษตรภัณฑ์"
      />
      <section className="container section">
        <p className="body-copy">
          เราคัดสรรสินค้าจากแบรนด์ที่หลากหลาย
          เพื่อให้ลูกค้าเลือกผลิตภัณฑ์ที่เหมาะกับความต้องการ ทั้งอาหารสัตว์
          วัตถุดิบผสมอาหารสัตว์ พร้อมเครือข่ายพันธมิตรและสหกรณ์ในหลากหลายพื้นที่
        </p>
        <div className="partner-grid">
          {partners.map((p) => (
            <article key={p.name}>
              <PartnerIdentity partner={p} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
