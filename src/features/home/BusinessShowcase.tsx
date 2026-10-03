"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Wheat,
  Beef,
  Fish,
  PawPrint,
  Sprout,
} from "lucide-react";
import type { ProductCategory } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
const icons = [Wheat, Beef, Fish, PawPrint, Sprout];

export function BusinessShowcase({ categories }: { categories: ProductCategory[] }) {
  const [active, setActive] = useState(0);
  const product = categories[active];
  return (
    <section
      className="business-showcase section"
      data-category={product.id}
      aria-label="สำรวจกลุ่มสินค้าของเรา"
    >
      <div className="container">
        <Reveal className="business-heading">
          <div>
            <span className="eyebrow">FROM THE LAND. FOR EVERY LIFE.</span>
            <h2>
              คุณภาพจากต้นทาง
              <br />
              <span>เพื่อทุกการเติบโต</span>
            </h2>
          </div>
          <p>
            จากวัตถุดิบทางการเกษตร สู่สินค้าเพื่อฟาร์มและสัตว์เลี้ยง
            <br />
            เลือกกลุ่มสินค้า เพื่อรู้จักสิ่งที่เราคัดสรรให้คุณ
          </p>
        </Reveal>
        <Reveal className="business-stage">
          <div className="business-visual" aria-hidden="true">
            <div className="product-art-title">
              SELECTED
              <br />
              <span>WITH CARE.</span>
            </div>
            {categories.map((category, i) => (
              <img
                key={category.id}
                src={category.image}
                alt=""
                loading="lazy"
                className={active === i ? "active" : ""}
              />
            ))}
            <span className="business-image-label">
              WANGMANAO · SELECTED WITH CARE
            </span>
          </div>
          <div className="business-panel">
            <div
              className="business-tabs"
              role="tablist"
              aria-label="กลุ่มสินค้า"
            >
              {categories.map((category, i) => {
                const Icon = icons[i];
                return (
                  <button
                    key={category.id}
                    id={`business-tab-${category.id}`}
                    role="tab"
                    aria-selected={active === i}
                    aria-controls="business-detail"
                    tabIndex={active === i ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(event) => {
                      let next = i;
                      if (event.key === "ArrowRight")
                        next = (i + 1) % categories.length;
                      else if (event.key === "ArrowLeft")
                        next = (i + categories.length - 1) % categories.length;
                      else if (event.key === "Home") next = 0;
                      else if (event.key === "End")
                        next = categories.length - 1;
                      else return;
                      event.preventDefault();
                      setActive(next);
                      document
                        .getElementById(`business-tab-${categories[next].id}`)
                        ?.focus();
                    }}
                  >
                    <Icon size={23} />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
            <div
              id="business-detail"
              role="tabpanel"
              aria-labelledby={`business-tab-${product.id}`}
              className="business-detail"
              tabIndex={0}
            >
              <div key={product.id} className="business-copy">
                <span className="showcase-index">
                  0{active + 1}
                  <small> / 05</small>
                </span>
                <span className="eyebrow">{product.en}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link
                  href={`/products/#${product.id}`}
                  className="button hero-primary"
                >
                  สำรวจกลุ่มสินค้านี้ <ArrowUpRight size={19} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
