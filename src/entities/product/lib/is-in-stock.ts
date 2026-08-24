import type { Product } from "@/shared/api/types";

export function isProductInStock(product: Product): boolean {
  return product.colors.some((color) => color.sizes.length > 0);
}
