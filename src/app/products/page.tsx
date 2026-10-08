import { PageHero } from "@/components/ui/PageHero";
import { ProductCatalog } from "@/features/products/ProductCatalog";
import { getProducts } from "@/lib/products";
import { getFeedIngredients } from "@/lib/feed-ingredients";
export const dynamic = "force-dynamic";
export const metadata = { title: "สินค้าและบริการ" };
export default async function Products() {
  const [categories, ingredients] = await Promise.all([
    getProducts(),
    getFeedIngredients(),
  ]);
  return (
    <>
      <PageHero
        eyebrow="PRODUCTS & SERVICES"
        title="วัตถุดิบผสมอาหารสัตว์"
        description="เลือกวัตถุดิบที่เหมาะกับการผลิต พร้อมข้อมูลคุณค่าทางโภชนาการและสเปคสินค้า"
      />
      <ProductCatalog categories={categories} ingredients={ingredients} />
      <section className="container service-note">
        <h2>การผลิตและบริการจัดหาวัตถุดิบ</h2>
        <p>
          คัดแยกและบรรจุสินค้าตราไก่งามและเกล็ดทองด้วยเครื่องจักรที่ทันสมัย
          พร้อมบริการจัดหาวัตถุดิบอาหารสัตว์และผลิตภัณฑ์สำเร็จรูป
          สอบถามรายละเอียดสินค้า ขนาดบรรจุ และราคาปัจจุบันกับทีมงานได้โดยตรง
        </p>
      </section>
    </>
  );
}
