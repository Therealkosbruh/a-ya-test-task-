"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts, type ProductsPage } from "./fetch-products";

interface UseProductsParams {
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

export function useProducts({
  search,
  inStock,
  categoryIds,
  brands,
  priceMin,
  priceMax,
  colorNames,
  sizeIds,
  sort,
}: UseProductsParams) {
  return useSuspenseInfiniteQuery({
    queryKey: [
      "products",
      {
        search,
        inStock,
        categoryIds,
        brands,
        priceMin,
        priceMax,
        colorNames,
        sizeIds,
        sort,
      },
    ],
    queryFn: ({ pageParam }) =>
      fetchProducts({
        search,
        inStock,
        categoryIds,
        brands,
        priceMin,
        priceMax,
        colorNames,
        sizeIds,
        sort,
        cursor: pageParam,
        limit: 8,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage: ProductsPage) => lastPage.nextCursor,
  });
}
