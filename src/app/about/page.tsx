import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { history } from "@/content/company";
export const metadata = { title: "เกี่ยวกับเรา" };
export default function About() {
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title="รากฐานที่มั่นคง เติบโตไปด้วยกัน"
        description="ทำความรู้จักวังมะนาวเกษตรภัณฑ์ และความใส่ใจที่อยู่เบื้องหลังทุกผลิตภัณฑ์"
      />
      <section className="container section about-preview">
        <img
          className="about-full-image"
          src="/images/company.webp"
          alt="ภาพกิจการวังมะนาวเกษตรภัณฑ์"
        />
        <div>
          <SectionHeading
            eyebrow="WHO WE ARE"
            title="จากธุรกิจครอบครัว สู่คู่คิดด้านการเกษตร"
          />
          <p className="body-copy">
            วังมะนาวเกษตรภัณฑ์เริ่มต้นจากร้านจำหน่ายอาหารสัตว์
            อุปกรณ์เลี้ยงสัตว์ วัตถุดิบผสมอาหารสัตว์และพืชไร่ ในตำบลวังมะนาว
            จังหวัดราชบุรี โดยนายเสนีย์และนางสันทนา แก้วพิจิตร
            เราเติบโตเคียงข้างฟาร์มเลี้ยงสัตว์และธุรกิจในพื้นที่
            พร้อมพัฒนาสินค้าและบริการอย่างต่อเนื่อง
          </p>
          <p className="body-copy">
            ปัจจุบันบริษัทผลิตข้าวโพดเม็ด ข้าวโพดป่น
            และจำหน่ายวัตถุดิบผสมอาหารสัตว์
            ตลอดจนเป็นตัวแทนจำหน่ายอาหารสัตว์สำเร็จรูปและข้าวสาร
          </p>
        </div>
      </section>
      <section className="section history-section">
        <div className="container">
          <SectionHeading
            eyebrow="OUR JOURNEY"
            title="ทุกก้าวของเรา มีคุณอยู่ด้วย"
          />
          <div className="timeline">
            {history.map((h) => (
              <Reveal key={h.year} className="timeline-item">
                <strong>{h.year}</strong>
                <div>
                  <h3>{h.title}</h3>
                  <p>{h.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container section vision-grid">
        <div>
          <span className="eyebrow">OUR VISION</span>
          <h2>
            พัฒนา ยกระดับ
            <br />
            เพิ่มมูลค่าให้การเกษตรไทย
          </h2>
          <p>เพิ่มมูลค่าให้กับห่วงโซ่อุปทานการเกษตรในประเทศไทย</p>
        </div>
        <div>
          <span className="eyebrow">OUR QUALITY COMMITMENT</span>
          <h2>
            มุ่งมั่นในคุณภาพ
            <br />
            ใส่ใจทุกขั้นตอน
          </h2>
          <p>
            พัฒนาระบบการผลิตโดยมุ่งเน้นความสะอาด ความปลอดภัย
            และการดำเนินงานตามกฎหมาย เพื่อประโยชน์สูงสุดของลูกค้า
          </p>
        </div>
      </section>
    </>
  );
}
