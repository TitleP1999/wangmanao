import type { FeedIngredient } from "@/lib/feed-ingredient-model";
import type { ProductCategory } from "@/lib/products";
import { FeedIngredientCatalog } from "./FeedIngredientCatalog";
import "./products.css";
export function ProductCatalog({
  ingredients,
}: {
  categories: ProductCategory[];
  ingredients: FeedIngredient[];
}) {
  return (
    <section className="container section products-section">
      <FeedIngredientCatalog ingredients={ingredients} />
    </section>
  );
}
