import { isAdmin } from "@/lib/admin";
import { getProducts } from "@/lib/products";
import { ProductAdmin } from "./ProductAdmin";
import "./admin.css";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "จัดการสินค้า",
  robots: { index: false, follow: false },
};
export default async function AdminPage() {
  const authenticated = await isAdmin();
  return (
    <ProductAdmin
      key={authenticated ? "editor" : "login"}
      authenticated={authenticated}
      initialProducts={authenticated ? await getProducts() : []}
    />
  );
}
