import type { Product } from "@/shared/api/types";
import { getProductMinPrice } from "./get-min-price";
import { isProductInStock } from "./is-in-stock";

export interface ProductJsonLd {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  image: string[];
  brand: {
    "@type": "Brand";
    name: string;
  };
  offers: {
    "@type": "Offer";
    price: number;
    priceCurrency: "RUB";
    availability:
      "https://schema.org/InStock" | "https://schema.org/OutOfStock";
  };
}

export function buildProductJsonLd(product: Product): ProductJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.colors.flatMap((color) => color.images),
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: getProductMinPrice(product),
      priceCurrency: "RUB",
      availability: isProductInStock(product)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}
