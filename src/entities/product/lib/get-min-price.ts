import type { Product } from "@/shared/api/types";

export function getProductMinPrice(product: Product): number {
  return Math.min(...product.colors.map((color) => Number(color.price)));
}
