import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company, navigation } from "@/content/company";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand">
            <img
              src="/images/logo.png"
              alt="วังมะนาวเกษตรภัณฑ์"
              width="55"
              height="55"
            />
            <span>
              <strong>วังมะนาวเกษตรภัณฑ์</strong>
              <small>WANGMANAO KASETPAN</small>
            </span>
          </Link>
          <p>
            มุ่งมั่นในคุณภาพ ใส่ใจทุกความต้องการ
            <br />
            เคียงข้างการเกษตรไทย ตั้งแต่ พ.ศ. 2541
          </p>
        </div>
        <div>
          <h3>รู้จักวังมะนาว</h3>
          {navigation.slice(1).map((n) => (
            <Link href={n.href} key={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>สำนักงานใหญ่</h3>
          <p>{company.address}</p>
          <a href={"tel:" + company.phone}>{company.phone}</a>
          <a href={"mailto:" + company.email}>{company.email}</a>
        </div>
        <div>
          <h3>เชื่อมต่อกับเรา</h3>
          <a href={company.line} target="_blank" rel="noreferrer">
            LINE Official <ArrowUpRight size={14} />
          </a>
          <a href={company.facebook} target="_blank" rel="noreferrer">
            Facebook <ArrowUpRight size={14} />
          </a>
          <p>เปิดให้บริการ{company.hours}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Wangmanao Kasetpan Co., Ltd.</span>
        <span>เติบโตด้วยคุณภาพ • ก้าวไปด้วยกัน</span>
      </div>
    </footer>
  );
}
