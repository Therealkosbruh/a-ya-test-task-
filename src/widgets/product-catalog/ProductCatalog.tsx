"use client";

import { Suspense, useDeferredValue, useState, type ReactElement } from "react";
import { CatalogToolbar } from "@/widgets/catalog-toolbar/CatalogToolbar";
import { ProductGrid } from "@/widgets/product-grid/ProductGrid";
import { ProductFilters } from "@/features/product-filters/ui/ProductFilters";
import { useFiltersStore } from "@/features/product-filters/model/use-filters-store";
import { InfoBlock } from "@/shared/ui/info-block/InfoBlock";
import { joinClassNames } from "@/shared/lib/join-class-names";
import styles from "./ProductCatalog.module.scss";

type SortDirection = "asc" | "desc";

export function ProductCatalog(): ReactElement {
  const [searchInput, setSearchInput] = useState("");
  const deferredSearch = useDeferredValue(searchInput);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const categoryIds = useFiltersStore((state) => state.categoryIds);
  const brands = useFiltersStore((state) => state.brands);
  const priceMin = useFiltersStore((state) => state.priceMin);
  const priceMax = useFiltersStore((state) => state.priceMax);
  const colorNames = useFiltersStore((state) => state.colorNames);
  const sizeIds = useFiltersStore((state) => state.sizeIds);

  const deferredCategoryIds = useDeferredValue(categoryIds);
  const deferredBrands = useDeferredValue(brands);
  const deferredPriceMin = useDeferredValue(priceMin);
  const deferredPriceMax = useDeferredValue(priceMax);
  const deferredColorNames = useDeferredValue(colorNames);
  const deferredSizeIds = useDeferredValue(sizeIds);

  const isSearchPending =
    searchInput !== deferredSearch ||
    categoryIds !== deferredCategoryIds ||
    brands !== deferredBrands ||
    priceMin !== deferredPriceMin ||
    priceMax !== deferredPriceMax ||
    colorNames !== deferredColorNames ||
    sizeIds !== deferredSizeIds;

  return (
    <>
      <CatalogToolbar
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        inStockOnly={inStockOnly}
        onInStockChange={setInStockOnly}
        sortDirection={sortDirection}
        onSortChange={setSortDirection}
        filters={<ProductFilters />}
      />
      <div
        className={joinClassNames(
          styles.gridWrapper,
          isSearchPending && styles.isPending,
        )}
      >
        <Suspense fallback={<InfoBlock status="loading" />}>
          <ProductGrid
            search={deferredSearch}
            inStock={inStockOnly}
            categoryIds={deferredCategoryIds}
            brands={deferredBrands}
            priceMin={deferredPriceMin}
            priceMax={deferredPriceMax}
            colorNames={deferredColorNames}
            sizeIds={deferredSizeIds}
            sort={sortDirection}
          />
        </Suspense>
      </div>
    </>
  );
}
