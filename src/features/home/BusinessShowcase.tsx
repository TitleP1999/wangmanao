"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Wheat } from "lucide-react";
import type { ProductCategory } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";

export function BusinessShowcase({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const [active, setActive] = useState(0);
  const product = categories[active];
  return (
    <section
      className="business-showcase section"
      data-category="raw"
      data-ingredient-tone={active % 5}
      aria-label="สำรวจวัตถุดิบผสมอาหารสัตว์"
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
            วัตถุดิบผสมอาหารสัตว์ที่คัดสรรเพื่อฟาร์มและโรงงาน
            <br />
            เลือกสินค้า เพื่อดูรายละเอียดวัตถุดิบของเรา
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
              aria-label="วัตถุดิบอาหารสัตว์"
            >
              {categories.map((category, i) => {
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
                    <Wheat size={23} />
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
                  <small> / {String(categories.length).padStart(2, "0")}</small>
                </span>
                <span className="eyebrow">{product.en}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link
                  href={`/products/#ingredient-${product.id}`}
                  className="button hero-primary"
                >
                  ดูสเปควัตถุดิบนี้ <ArrowUpRight size={19} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
