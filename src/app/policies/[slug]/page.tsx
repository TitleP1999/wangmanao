import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { policies } from "@/content/policies";

export const dynamicParams = false;
export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title:
      policies.find((policy) => policy.slug === slug)?.title ?? "นโยบายบริษัท",
  };
}
export default async function PolicyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = policies.find((policy) => policy.slug === slug);
  if (!policy) notFound();
  return (
    <>
      <PageHero
        eyebrow={policy.category}
        title={policy.title}
        description="นโยบายบริษัท วังมะนาวเกษตรภัณฑ์ จำกัด และบริษัทในเครือ"
      />
      <div className="container section policy-layout">
        <aside className="policy-sidebar">
          <Link href="/policies/" className="policy-back">
            <ArrowLeft size={16} />
            นโยบายบริษัททั้งหมด
          </Link>
          <nav aria-label="หัวข้อนโยบาย">
            {policies.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                aria-current={item.slug === slug ? "page" : undefined}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="policy-document">
          <span className="eyebrow">POLICY DOCUMENT</span>
          <h2>{policy.documentTitle}</h2>
          <div className="policy-body">
            {policy.paragraphs.map((paragraph, index) => {
              const heading =
                paragraph.length < 160 &&
                (/^\d+\.\s/.test(paragraph) ||
                  ["ขอบเขต", "แนวทางการปฏิบัติ"].includes(paragraph));
              return heading ? (
                <h3 key={index}>{paragraph}</h3>
              ) : (
                <p key={index}>{paragraph}</p>
              );
            })}
          </div>
          <a
            href={policy.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="policy-source"
          >
            ดูนโยบายบนเว็บไซต์ต้นฉบับ <ArrowUpRight size={15} />
          </a>
        </article>
      </div>
    </>
  );
}
