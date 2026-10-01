import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import "./enhancements.css";
import "./policies.css";
import "./about.css";
export const metadata: Metadata = {
  title: {
    default: "วังมะนาวเกษตรภัณฑ์ | คุณภาพเพื่อการเติบโต",
    template: "%s | วังมะนาวเกษตรภัณฑ์",
  },
  description:
    "ผู้ผลิตและจำหน่ายวัตถุดิบอาหารสัตว์ อาหารสัตว์ และสินค้าเกษตร จังหวัดราชบุรี ตั้งแต่ พ.ศ. 2541",
  icons: { icon: "/images/logo.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <a href="#main" className="skip-link">
          ข้ามไปเนื้อหาหลัก
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
