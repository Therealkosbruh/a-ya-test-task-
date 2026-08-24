"use client";

import { useState, type ReactElement } from "react";
import type { Product, Size } from "@/shared/api/types";
import { getCheapestProductColor } from "@/entities/product/lib/get-cheapest-color";
import { getProductMinPrice } from "@/entities/product/lib/get-min-price";
import { buildProductJsonLd } from "@/entities/product/lib/build-product-json-ld";
import { toSafeJson } from "@/shared/lib/to-safe-json";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";
import { ProductGallery } from "./ui/ProductGallery";
import { ProductDescription } from "./ui/ProductDescription";
import { ProductOptions } from "./ui/ProductOptions";
import styles from "./ProductDetail.module.scss";

interface Props {
  product: Product;
  allSizes: Size[];
}

export function ProductDetail({ product, allSizes }: Props): ReactElement {
  const [selectedColorId, setSelectedColorId] = useState(
    () => getCheapestProductColor(product).id,
  );
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [sizeResetForColorId, setSizeResetForColorId] =
    useState(selectedColorId);

  const selectedColor =
    product.colors.find((color) => color.id === selectedColorId) ??
    product.colors[0];

  if (selectedColorId !== sizeResetForColorId) {
    setSizeResetForColorId(selectedColorId);
    if (
      selectedSizeId !== null &&
      !selectedColor.sizes.includes(selectedSizeId)
    ) {
      setSelectedSizeId(null);
    }
  }

  const minPrice = getProductMinPrice(product);
  const jsonLd = buildProductJsonLd(product);

  return (
    <div className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toSafeJson(jsonLd) }}
      />
      <Breadcrumbs
        items={[{ label: "Каталог", href: "/" }, { label: product.name }]}
      />

      <article className={styles.article}>
        <ProductGallery
          key={selectedColor.images.join(",")}
          images={selectedColor.images}
          alt={product.name}
        />
        <div className={styles.info}>
          <ProductDescription
            brand={product.brand}
            name={product.name}
            price={minPrice}
            description={selectedColor.description}
          />
          <ProductOptions
            colors={product.colors}
            sizes={allSizes}
            selectedColorId={selectedColorId}
            selectedSizeId={selectedSizeId}
            onColorSelect={setSelectedColorId}
            onSizeSelect={setSelectedSizeId}
          />
        </div>
      </article>
    </div>
  );
}
