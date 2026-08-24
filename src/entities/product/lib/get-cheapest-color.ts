import type { Product, ProductColor } from "@/shared/api/types";

export function getCheapestProductColor(product: Product): ProductColor {
  return product.colors.reduce((cheapest, color) =>
    Number(color.price) < Number(cheapest.price) ? color : cheapest,
  );
}
