import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getSizes } from "@/shared/api/mock-server";
import { getCheapestProductColor } from "@/entities/product/lib/get-cheapest-color";
import { getProductMinPrice } from "@/entities/product/lib/get-min-price";
import { formatPrice } from "@/shared/lib/format-price";
import { ProductDetail } from "@/widgets/product-detail/ProductDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);

  if (!product) {
    return { title: "Товар не найден" };
  }

  const color = getCheapestProductColor(product);

  return {
    title: `${product.name} - ${product.brand}`,
    description: `${color.description} Цена от ${formatPrice(getProductMinPrice(product))}.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);

  if (!product) {
    notFound();
  }

  const allSizes = await getSizes();

  return <ProductDetail product={product} allSizes={allSizes} />;
}
