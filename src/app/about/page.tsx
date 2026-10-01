import Link from "next/link";
import {
  ArrowUpRight,
  Wheat,
  PawPrint,
  Bird,
  Package,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/about";
export const metadata = { title: "เกี่ยวกับเรา" };
const businessIcons = [Wheat, PawPrint, Bird, Package];
export default function About() {
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title="รากฐานที่มั่นคง เติบโตไปด้วยกัน"
        description="ทำความรู้จักวังมะนาวเกษตรภัณฑ์ ผู้บริหาร และแนวทางการดำเนินธุรกิจของเรา"
      />
      <section
        className="container section executive-section"
        aria-labelledby="executive-title"
      >
        <Reveal className="executive-portrait">
          <div className="executive-photo">
            <img
              src={about.executive.portrait}
              alt="คุณเสนีย์ แก้วพิจิตร กรรมการผู้จัดการ"
              width={163}
              height={204}
            />
          </div>
          <span className="executive-photo-caption">
            WANGMANAO KASETPAN · LEADERSHIP
          </span>
        </Reveal>
        <Reveal className="executive-info">
          <span className="eyebrow">OUR LEADERSHIP</span>
          <h2 id="executive-title">ผู้บริหาร</h2>
          <div className="executive-rule" />
          <h3>{about.executive.name}</h3>
          <p className="executive-position">{about.executive.position}</p>
          <p className="executive-english">
            {about.executive.englishPosition}
            <br />
            {about.executive.company}
          </p>
          <Link href="/contact/" className="text-link navy">
            ติดต่อบริษัท <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
      <section
        className="section history-section"
        aria-labelledby="history-title"
      >
        <div className="container about-history">
          <Reveal>
            <span className="eyebrow">OUR JOURNEY</span>
            <h2 id="history-title">ประวัติความเป็นมา</h2>
            <div className="about-history-facts">
              <div>
                <strong>2541</strong>
                <span>ปีที่เริ่มต้นธุรกิจ</span>
              </div>
              <div>
                <strong>
                  1.5 <small>ไร่</small>
                </strong>
                <span>พื้นที่เริ่มต้นกิจการ</span>
              </div>
              <div>
                <strong>
                  3 <small>คน</small>
                </strong>
                <span>ทีมงานในวันแรก</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-history-copy">
            {about.history.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="history-sales">
              <span>ยอดขายเดือนแรก</span>
              <strong>
                240,000 <small>บาท</small>
              </strong>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="container section" aria-labelledby="business-title">
        <div className="section-heading">
          <span className="eyebrow">OUR BUSINESS</span>
          <h2 id="business-title">ประเภทของธุรกิจ</h2>
        </div>
        <div className="about-business-grid">
          {about.businesses.map((business, index) => {
            const Icon = businessIcons[index];
            return (
              <Reveal key={business}>
                <article>
                  <span className="business-number">0{index + 1}</span>
                  <Icon size={28} />
                  <h3>{business}</h3>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="about-products-section">
        <div className="container section about-products-layout">
          <Reveal>
            <SectionHeading
              eyebrow="OUR PRODUCT RANGE"
              title="ประเภทของสินค้า"
            />
            <p className="body-copy">{about.products}</p>
            <Link href="/products/" className="button outline">
              สำรวจสินค้าและบริการ <ArrowUpRight size={18} />
            </Link>
          </Reveal>
          <Reveal className="about-product-tags">
            {about.productTypes.map((product) => (
              <span key={product}>{product}</span>
            ))}
          </Reveal>
        </div>
      </section>
      <section
        className="container section about-commitments"
        aria-label="แนวทางและขอบเขตการดำเนินงาน"
      >
        <Reveal className="quality-panel">
          <ShieldCheck size={30} />
          <span className="eyebrow">QUALITY POLICY</span>
          <h2>นโยบายคุณภาพ</h2>
          <blockquote>“{about.quality}”</blockquote>
        </Reveal>
        <Reveal className="scope-panel">
          <span className="eyebrow">BUSINESS SCOPE</span>
          <h2>ขอบเขตธุรกิจ</h2>
          <p>{about.scope}</p>
        </Reveal>
      </section>
      <section className="about-vision">
        <div className="container">
          <Reveal>
            <Leaf size={34} />
            <span className="eyebrow">OUR VISION</span>
            <h2>วิสัยทัศน์</h2>
            <blockquote>“{about.vision}”</blockquote>
          </Reveal>
        </div>
      </section>
    </>
  );
}
