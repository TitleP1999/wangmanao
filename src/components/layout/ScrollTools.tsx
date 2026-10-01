"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
export function ScrollTools() {
  const bar = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty(
        "--scroll-progress",
        String(height > 0 ? window.scrollY / height : 0),
      );
      setVisible(window.scrollY > 500);
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return (
    <>
      <div ref={bar} className="reading-progress" aria-hidden="true" />
      <button
        className={`back-to-top ${visible ? "visible" : ""}`}
        aria-label="กลับด้านบน"
        tabIndex={visible ? 0 : -1}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
        }}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
