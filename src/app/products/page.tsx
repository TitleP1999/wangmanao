import { PageHero } from "@/components/ui/PageHero";
import { ProductCatalog } from "@/features/products/ProductCatalog";
import { getProducts } from "@/lib/products";
export const dynamic = "force-dynamic";
export const metadata = { title: "สินค้าและบริการ" };
export default async function Products() {
  const categories = await getProducts();
  return (
    <>
      <PageHero
        eyebrow="PRODUCTS & SERVICES"
        title="คุณภาพที่คัดสรร เพื่อทุกความต้องการ"
        description="สำรวจวัตถุดิบอาหารสัตว์ อาหารสัตว์สำเร็จรูป และสินค้าเกษตรของวังมะนาว"
      />
      <ProductCatalog categories={categories} />
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
