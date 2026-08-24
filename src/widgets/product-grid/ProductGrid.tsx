"use client";

import { useCallback, useRef, type ReactElement } from "react";
import ProductCard from "@/entities/product/ui/ProductCard";
import { useProducts } from "@/entities/product/api/use-products";
import { useIntersectionObserver } from "@/shared/lib/use-intersection-observer";
import { InfoBlock } from "@/shared/ui/info-block/InfoBlock";
import styles from "./ProductGrid.module.scss";

interface Props {
  search: string;
  inStock: boolean;
  categoryIds: number[];
  brands: string[];
  priceMin: number | null;
  priceMax: number | null;
  colorNames: string[];
  sizeIds: number[];
  sort: "asc" | "desc";
}

export function ProductGrid({
  search,
  inStock,
  categoryIds,
  brands,
  priceMin,
  priceMax,
  colorNames,
  sizeIds,
  sort,
}: Props): ReactElement {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({
    search,
    inStock,
    categoryIds,
    brands,
    priceMin,
    priceMax,
    colorNames,
    sizeIds,
    sort,
  });

  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useIntersectionObserver(sentinelRef, handleIntersect);

  const products = data.pages.flatMap((page) => page.items);

  if (products.length === 0) {
    return <InfoBlock status="empty" />;
  }

  return (
    <>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4}
          />
        ))}
      </div>
      {isFetchingNextPage && (
        <p className={styles.loadingMore}>Загружаем ещё…</p>
      )}
      <div ref={sentinelRef} className={styles.sentinel} />
    </>
  );
}
