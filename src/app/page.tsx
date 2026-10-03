import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  PackageCheck,
  Handshake,
  Leaf,
} from "lucide-react";
import { Hero } from "@/features/home/Hero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";
import { getProducts } from "@/lib/products";
import { PartnerCarousel } from "@/features/home/PartnerCarousel";
import { BusinessShowcase } from "@/features/home/BusinessShowcase";
import { CountUp } from "@/components/ui/CountUp";
export const dynamic = "force-dynamic";
export default async function Home() {
  const categories = await getProducts();
  return (
    <>
      <Hero />
      <section className="intro-bar" id="intro">
        <div className="container intro-grid">
          <div>
            <span className="eyebrow">ROOTED IN QUALITY</span>
            <p>
              จากรากฐานที่มั่นคง
              <br />
              <strong>สู่ความไว้วางใจในทุกวัน</strong>
            </p>
          </div>
          <div className="intro-stat">
            <strong>
              <CountUp value={2541} />
              <span>พ.ศ.</span>
            </strong>
            <span>ปีที่เริ่มต้นธุรกิจ</span>
          </div>
          <div className="intro-stat">
            <strong>
              <CountUp value={5} />
              <span>กลุ่ม</span>
            </strong>
            <span>สินค้าเพื่อทุกความต้องการ</span>
          </div>
          <div className="intro-stat">
            <strong>
              ใส่ใจ<span>ทุกขั้นตอน</span>
            </strong>
            <span>คัดสรร ผลิต และบริการ</span>
          </div>
        </div>
      </section>
      <section className="container section about-preview">
        <Reveal className="about-photo">
          <img
            src="/images/company.webp"
            alt="ภาพกิจการจากเว็บบริษัทวังมะนาว"
            loading="lazy"
          />
          <span className="photo-caption">WANGMANAO KASETPAN · RATCHABURI</span>
          <div className="photo-badge">
            <Leaf />
            <span>
              เติบโตไปด้วยกัน
              <br />
              <strong>ตั้งแต่ พ.ศ. 2541</strong>
            </span>
          </div>
        </Reveal>
        <Reveal>
          <SectionHeading
            eyebrow="ABOUT WANGMANAO"
            title="มากกว่าสินค้าคุณภาพ คือความใส่ใจที่ส่งต่อ"
          />
          <p className="body-copy">
            จากธุรกิจครอบครัวในจังหวัดราชบุรี
            สู่ผู้ผลิตและจำหน่ายวัตถุดิบอาหารสัตว์
            เรามุ่งมั่นพัฒนาการคัดแยกและบรรจุด้วยเครื่องจักรที่ทันสมัย
            พร้อมคัดสรรสินค้าจากแบรนด์ชั้นนำ เพื่อตอบโจทย์ลูกค้าในทุกวัน
          </p>
          <div className="value-list">
            <span>
              <ShieldCheck />
              คัดสรรคุณภาพ
            </span>
            <span>
              <PackageCheck />
              พัฒนาการผลิต
            </span>
            <span>
              <Handshake />
              ใส่ใจบริการ
            </span>
          </div>
          <Link href="/about/" className="button outline">
            เรื่องราวของเรา <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
      <BusinessShowcase categories={categories} />
      <section className="products-section section">
        <div className="container">
          <Reveal className="section-top">
            <SectionHeading
              eyebrow="OUR PRODUCTS & SERVICES"
              title="ครบทุกความต้องการ ด้านอาหารสัตว์"
              description="วัตถุดิบและสินค้าที่คัดสรร เพื่อเกษตรกร ธุรกิจ และสัตว์เลี้ยงของคุณ"
            />
            <Link href="/products/" className="text-link navy">
              ดูสินค้าทั้งหมด <ArrowUpRight size={20} />
            </Link>
          </Reveal>
          <div className="product-grid">
            {categories.slice(0, 4).map((c, i) => (
              <Reveal key={c.id}>
                <Link
                  href={"/products/#" + c.id}
                  className="product-card"
                  data-category={c.id}
                >
                  <div className="product-card-image">
                    <img src={c.image} alt={c.name} loading="lazy" />
                    <span>0{i + 1}</span>
                  </div>
                  <div className="product-card-body">
                    <small>{c.en}</small>
                    <h3>{c.name}</h3>
                    <p>{c.description}</p>
                    <span className="card-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link href="/products/#rice" className="more-category">
            รวมถึงข้าวสารและสินค้าเกษตรอื่น ๆ <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="container section partners-preview">
        <Reveal>
          <SectionHeading
            eyebrow="OUR TRUSTED PARTNERS"
            title="แบรนด์ที่เราคัดสรร เพื่อคุณ"
            description="ร่วมส่งต่อสินค้าคุณภาพจากแบรนด์ที่บริษัทเป็นตัวแทนจำหน่าย"
          />
        </Reveal>
        <PartnerCarousel />
        <Link className="text-link navy" href="/partners/">
          รู้จักพันธมิตรของเรา <ArrowUpRight size={18} />
        </Link>
      </section>
      <section className="contact-banner">
        <div className="container">
          <div>
            <span className="eyebrow">LET’S GROW TOGETHER</span>
            <h2>
              ให้เราเป็นส่วนหนึ่ง
              <br />
              ของการเติบโตของคุณ
            </h2>
            <p>สอบถามสินค้าและบริการ ทีมงานของเรายินดีให้คำแนะนำ</p>
          </div>
          <div className="contact-banner-actions">
            <Link href="/contact/" className="button white">
              ติดต่อเรา <ArrowUpRight size={20} />
            </Link>
            <a
              href={company.line}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              พูดคุยผ่าน LINE <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
