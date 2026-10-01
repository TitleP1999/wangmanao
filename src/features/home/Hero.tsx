"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
const slides = [
  {
    eyebrow: "GROWING TOGETHER, SINCE 1998",
    title: (
      <>
        คุณภาพที่คุณวางใจ
        <br />
        เพื่อการเติบโต<span>ที่ยั่งยืน</span>
      </>
    ),
    description:
      "วัตถุดิบอาหารสัตว์และสินค้าเกษตรที่คัดสรรด้วยความใส่ใจ\nเคียงข้างเกษตรกรและธุรกิจไทยในทุกก้าวของการเติบโต",
    image: "/images/hero.jpg",
  },
  {
    eyebrow: "QUALITY IN EVERY DETAIL",
    title: (
      <>
        คัดสรรด้วยความใส่ใจ
        <br />
        ส่งต่อ<span>คุณภาพในทุกขั้นตอน</span>
      </>
    ),
    description:
      "พัฒนาการคัดแยกและบรรจุด้วยเครื่องจักรที่ทันสมัย\nเพื่อสินค้าตราไก่งามและเกล็ดทองที่ได้มาตรฐาน",
    image: "/images/company.webp",
  },
];
export function Hero() {
  const [index, setIndex] = useState(0);
  const s = slides[index];
  return (
    <section className="hero" aria-label="แนะนำบริษัท">
      <img
        key={s.image}
        className="hero-image"
        src={s.image}
        alt={
          index === 0
            ? "ทิวทัศน์พื้นที่เกษตร ภาพประกอบ"
            : "ภาพจากบริษัทวังมะนาวเกษตรภัณฑ์"
        }
      />
      <div className="hero-shade" />
      <div className="container hero-content" key={index}>
        <span className="eyebrow">
          <i />
          {s.eyebrow}
        </span>
        <h1>{s.title}</h1>
        <p>{s.description}</p>
        <div className="hero-actions">
          <Link href="/products/" className="button white">
            สำรวจสินค้าและบริการ <ArrowUpRight size={19} />
          </Link>
          <Link href="/about/" className="text-link">
            รู้จักวังมะนาว <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
      <div className="container hero-bottom">
        <a href="#intro" className="scroll-hint">
          <span>
            <ArrowDown size={18} />
          </span>
          เลื่อนเพื่อรู้จักเรา
        </a>
        <div className="slider-controls">
          <span className="slide-number">0{index + 1}</span>
          <span className="slide-track">
            <i style={{ width: ((index + 1) / slides.length) * 100 + "%" }} />
          </span>
          <span>0{slides.length}</span>
          <button
            aria-label="ภาพก่อนหน้า"
            onClick={() =>
              setIndex((index + slides.length - 1) % slides.length)
            }
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="ภาพถัดไป"
            onClick={() => setIndex((index + 1) % slides.length)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
