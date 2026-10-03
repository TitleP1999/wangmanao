"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollTools } from "./ScrollTools";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {!isAdmin && <Header />}
      {!isAdmin && <ScrollTools />}
      <main id="main">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
