import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { company } from "@/content/company";
export const metadata = { title: "ติดต่อเรา" };
export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT US"
        title="ทุกการเติบโต เริ่มต้นจากการพูดคุย"
        description="ติดต่อสอบถามสินค้าและบริการ หรือแวะมาพบเราที่วังมะนาว จังหวัดราชบุรี"
      />
      <section className="container section contact-grid">
        <div>
          <span className="eyebrow">HEAD OFFICE</span>
          <h2>{company.name}</h2>
          <div className="contact-detail">
            <MapPin />
            <div>
              <h3>สำนักงานใหญ่</h3>
              <p>{company.address}</p>
            </div>
          </div>
          <div className="contact-detail">
            <Phone />
            <div>
              <h3>โทรศัพท์</h3>
              <a href="tel:032240239">032-240239</a>
              <a href="tel:0818018538">คุณเสนีย์ แก้วพิจิตร · 081-8018538</a>
              <a href="tel:0819433885">คุณสันทนา แก้วพิจิตร · 081-9433885</a>
            </div>
          </div>
          <div className="contact-detail">
            <Mail />
            <div>
              <h3>อีเมล</h3>
              <a href={"mailto:" + company.email}>{company.email}</a>
            </div>
          </div>
          <div className="contact-detail">
            <Clock />
            <div>
              <h3>เวลาทำการ</h3>
              <p>{company.hours}</p>
            </div>
          </div>
          <div className="contact-social">
            <a
              href={company.line}
              className="button navy-button"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> LINE Official{" "}
              <ArrowUpRight size={17} />
            </a>
            <a
              href={company.facebook}
              className="button outline"
              target="_blank"
              rel="noreferrer"
            >
              Facebook <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="map-panel">
          <iframe
            title="แผนที่บริษัทวังมะนาวเกษตรภัณฑ์"
            src={
              "https://maps.google.com/maps?q=" +
              encodeURIComponent("บริษัท วังมะนาวเกษตรภัณฑ์ จำกัด ราชบุรี") +
              "&output=embed"
            }
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a href={company.map} target="_blank" rel="noreferrer">
            เปิดใน Google Maps <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section className="container branches section">
        <h2>หน้าร้านบริษัท เกษตรพาณิชย์ จำกัด</h2>
        <div className="branch-grid">
          <article>
            <span className="eyebrow">POS–1 · ปากท่อ</span>
            <h3>สาขาปากท่อ</h3>
            <p>26/2 หมู่ 5 ตำบลวังมะนาว อำเภอปากท่อ จังหวัดราชบุรี 70140</p>
            <p>ทุกวัน 08:00 – 18:00 น.</p>
            <a href="tel:032720511">032-720511</a>
          </article>
          <article>
            <span className="eyebrow">POS–2 · ราชบุรี</span>
            <h3>สาขาตลาดศรีเมือง</h3>
            <p>533/46 ตลาดศรีเมือง อำเภอเมือง จังหวัดราชบุรี 70000</p>
            <p>ทุกวัน 08:00 – 17:30 น.</p>
            <a href="tel:032315115">032-315115</a>
          </article>
        </div>
      </section>
    </>
  );
}
