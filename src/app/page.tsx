import type { Metadata } from "next";
import { ProductCatalog } from "@/widgets/product-catalog/ProductCatalog";

export const metadata: Metadata = {
  title: "Каталог товаров",
  description:
    "Каталог одежды с поиском по названию, фильтром по наличию и сортировкой по цене.",
};

export default function Home() {
  return <ProductCatalog />;
}
