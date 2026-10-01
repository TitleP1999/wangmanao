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
    image: "/images/hero.jpg",
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
      <div className="container hero-content" key={index}>
        <span className="eyebrow">
          <span className="live-dot" />
          {s.eyebrow}
        </span>
        <h1>{s.title}</h1>
        <p>{s.description}</p>
        <div className="hero-actions">
          <Link href="/products/" className="button hero-primary">
            สำรวจสินค้าและบริการ <ArrowUpRight size={19} />
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
