"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollTools } from "./ScrollTools";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) {
    return (
      <div className="admin-frame">
        <header className="admin-brand-header">
          <div className="admin-brand">
            <img
              src="/images/logo.png"
              alt="ตราบริษัทวังมะนาวเกษตรภัณฑ์"
              width={55}
              height={55}
            />
            <span>
              <strong>วังมะนาวเกษตรภัณฑ์</strong>
              <small>WANGMANAO KASETPAN</small>
            </span>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="admin-copyright">
          © {new Date().getFullYear()} Wangmanao Kasetpan Co., Ltd.
        </footer>
      </div>
    );
  }

  return (
    <>
      <Header />
      <ScrollTools />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
