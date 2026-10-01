import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { policies } from "@/content/policies";

export const metadata = { title: "นโยบายบริษัท" };
export default function Policies() {
  return (
    <>
      <PageHero
        eyebrow="CORPORATE POLICIES"
        title="นโยบายบริษัท"
        description="แนวทางการดำเนินงานของวังมะนาวเกษตรภัณฑ์และบริษัทในเครือ"
      />
      <section className="container section">
        <div className="policy-intro">
          <span className="eyebrow">OUR COMMITMENTS</span>
          <h2>หลักปฏิบัติที่เรายึดมั่น</h2>
          <p>
            อ่านนโยบายด้านแรงงาน สังคม สิ่งแวดล้อม
            และจรรยาบรรณในการดำเนินธุรกิจของบริษัท
          </p>
        </div>
        <div className="policy-grid">
          {policies.map((policy, index) => (
            <Reveal key={policy.slug}>
              <Link href={policy.href} className="policy-card">
                <div className="policy-card-top">
                  <FileText size={24} />
                  <span>0{index + 1}</span>
                </div>
                <small>{policy.category}</small>
                <h3>{policy.title}</h3>
                <span className="policy-card-bottom">
                  อ่านนโยบาย <ArrowUpRight size={19} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
