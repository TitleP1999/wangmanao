"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { navigation, company } from "@/content/company";
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container">
          <span>คุณภาพที่ใส่ใจ เพื่อการเติบโตไปด้วยกัน</span>
          <a href={"tel:" + company.phone}>
            <Phone size={12} />
            {company.phone}
          </a>
        </div>
      </div>
      <div className="container header-main">
        <Link
          href="/"
          className="brand"
          aria-label="วังมะนาวเกษตรภัณฑ์ หน้าแรก"
        >
          <img
            src="/images/logo.png"
            alt="ตราบริษัทวังมะนาวเกษตรภัณฑ์"
            width="54"
            height="54"
          />
          <span>
            <strong>วังมะนาวเกษตรภัณฑ์</strong>
            <small>WANGMANAO KASETPAN</small>
          </span>
        </Link>
        <nav
          id="main-navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="เมนูหลัก"
        >
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact/" className="header-cta">
          คุยกับเรา <ArrowUpRight size={17} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
