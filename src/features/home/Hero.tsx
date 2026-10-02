"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
const slides = [
  {
    eyebrow: "ผู้ผลิตและจำหน่าย · วังมะนาวเกษตรภัณฑ์",
    title: (
      <>
        <span className="hero-line">วัตถุดิบผสม</span>
        <span className="hero-line hero-highlight">อาหารสัตว์</span>
        <span className="hero-line hero-support">
          เพื่อฟาร์มและธุรกิจของคุณ
        </span>
      </>
    ),
    description:
      "ข้าวโพดเม็ด ข้าวโพดป่น รำละเอียด กากถั่วเหลือง และวัตถุดิบอื่น ๆ\nพร้อมอาหารสัตว์สำเร็จรูปและสินค้าเกษตร ตั้งแต่ พ.ศ. 2541",
    image: "/images/feed-ingredients-hero.webp",
  },
  {
    eyebrow: "อาหารสัตว์และสินค้าเกษตร · ครบทุกความต้องการ",
    title: (
      <>
        <span className="hero-line">วัตถุดิบคุณภาพ</span>
        <span className="hero-line hero-highlight">และอาหารสัตว์</span>
        <span className="hero-line hero-support">คัดสรรให้ธุรกิจคุณเติบโต</span>
      </>
    ),
    description:
      "วัตถุดิบตราไก่งามและเกล็ดทอง พร้อมอาหารสำหรับไก่ สุกร โค ปลา\nรวมถึงอาหารสุนัขและแมว จากแบรนด์ที่เราเป็นตัวแทนจำหน่าย",
    image: "/images/feed-ingredients-hero.webp",
  },
];
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || hovered || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden)
        setIndex((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [index, paused, hovered, reducedMotion]);
  const s = slides[index];
  return (
    <section
      ref={heroRef}
      className="hero"
      aria-label="แนะนำบริษัท"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        heroRef.current?.style.setProperty("--pointer-x", "0px");
        heroRef.current?.style.setProperty("--pointer-y", "0px");
      }}
      onMouseMove={(event) => {
        if (reducedMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--pointer-x",
          `${(event.clientX - bounds.left - bounds.width / 2) / 65}px`,
        );
        event.currentTarget.style.setProperty(
          "--pointer-y",
          `${(event.clientY - bounds.top - bounds.height / 2) / 65}px`,
        );
      }}
    >
      {slides.map((slide, position) => (
        <img
          key={slide.eyebrow}
          className={`hero-image ${position === index ? "is-active" : ""}`}
          src={slide.image}
          alt=""
          aria-hidden="true"
          fetchPriority={position === 0 ? "high" : "auto"}
        />
      ))}
      <div className="hero-shade" />
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-landmark">
        <span>FEED INGREDIENTS</span>
        <strong>ข้าวโพด · รำ · กากถั่วเหลือง</strong>
        <i /> <small>วัตถุดิบผสมอาหารสัตว์ · อาหารสัตว์สำเร็จรูป</small>
      </div>
      <div className="container hero-content" key={index}>
        <span className="eyebrow">
          <span className="live-dot" />
          {s.eyebrow}
        </span>
        <h1>{s.title}</h1>
        <p>{s.description}</p>
        <div className="hero-actions">
          <Link href="/products/" className="button hero-primary">
            ดูวัตถุดิบและอาหารสัตว์ <ArrowUpRight size={19} />
          </Link>
          <Link href="/about/" className="text-link">
            รู้จักวังมะนาว <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="hero-tags">
          <span>วัตถุดิบคุณภาพ</span>
          <span>อาหารสัตว์</span>
          <span>สินค้าเกษตร</span>
        </div>
      </div>
      <div className="hero-showcase" aria-hidden="true">
        <div className="showcase-label">
          <Sparkles size={14} /> ROOTED IN QUALITY
        </div>
        <div className="showcase-disc">
          <img src="/images/corn.png" alt="" />
        </div>
        <div className="showcase-seal">
          <img src="/images/logo.png" alt="" />
        </div>
        <div className="showcase-card">
          <span className="showcase-card-number">01 / 05</span>
          <div>
            <small>OUR SIGNATURE</small>
            <strong>
              จากธรรมชาติ
              <br />
              สู่คุณภาพที่วางใจ
            </strong>
            <span>วัตถุดิบอาหารสัตว์ · ตราไก่งาม</span>
          </div>
          <ArrowUpRight size={24} />
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
          <button
            aria-label={paused ? "เล่นภาพอัตโนมัติต่อ" : "หยุดภาพอัตโนมัติ"}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}
