"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductCategory } from "@/lib/products";
export function ProductCatalog({ categories }: { categories: ProductCategory[] }) {
  const [active, setActive] = useState("all");
  const shown =
    active === "all" ? categories : categories.filter((c) => c.id === active);
  return (
    <section className="container section">
      <div className="filters" aria-label="หมวดหมู่สินค้า">
        <button
          aria-pressed={active === "all"}
          onClick={() => setActive("all")}
        >
          สินค้าทั้งหมด
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="catalog-grid" aria-live="polite">
        {shown.map((c) => (
          <article className="catalog-card" id={c.id} key={c.id}>
            <div className="catalog-image">
              <img src={c.image} alt={c.name} loading="lazy" />
            </div>
            <div className="catalog-content">
              <span className="eyebrow">{c.en}</span>
              <h2>{c.name}</h2>
              <p>{c.description}</p>
              <ul>
                {c.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Link
                href={"/contact/?category=" + c.id}
                className="text-link navy"
              >
                สอบถามสินค้า <ArrowUpRight size={18} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
