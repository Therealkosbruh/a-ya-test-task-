import type { Product } from "@/shared/api/types";
import { getBaseUrl } from "@/shared/api/get-base-url";

export interface ProductsPage {
  items: Product[];
  nextCursor: string | null;
}

export interface FetchProductsParams {
  search?: string;
  inStock?: boolean;
  categoryIds?: number[];
  brands?: string[];
  priceMin?: number | null;
  priceMax?: number | null;
  colorNames?: string[];
  sizeIds?: number[];
  sort?: "asc" | "desc";
  cursor?: string | null;
  limit?: number;
}

type ParamApplier = (
  params: FetchProductsParams,
  searchParams: URLSearchParams,
) => void;

const PARAM_APPLIERS: Record<keyof FetchProductsParams, ParamApplier> = {
  search: (params, searchParams) => {
    if (params.search) searchParams.set("search", params.search);
  },
  inStock: (params, searchParams) => {
    if (params.inStock) searchParams.set("inStock", "true");
  },
  categoryIds: (params, searchParams) => {
    if (params.categoryIds?.length) {
      searchParams.set("categoryIds", params.categoryIds.join(","));
    }
  },
  brands: (params, searchParams) => {
    if (params.brands?.length) {
      searchParams.set("brands", params.brands.join(","));
    }
  },
  priceMin: (params, searchParams) => {
    if (params.priceMin != null) {
      searchParams.set("priceMin", String(params.priceMin));
    }
  },
  priceMax: (params, searchParams) => {
    if (params.priceMax != null) {
      searchParams.set("priceMax", String(params.priceMax));
    }
  },
  colorNames: (params, searchParams) => {
    if (params.colorNames?.length) {
      searchParams.set("colorNames", params.colorNames.join(","));
    }
  },
  sizeIds: (params, searchParams) => {
    if (params.sizeIds?.length) {
      searchParams.set("sizeIds", params.sizeIds.join(","));
    }
  },
  sort: (params, searchParams) => {
    if (params.sort && params.sort !== "asc") {
      searchParams.set("sort", params.sort);
    }
  },
  cursor: (params, searchParams) => {
    if (params.cursor) searchParams.set("after", params.cursor);
  },
  limit: (params, searchParams) => {
    if (params.limit) searchParams.set("limit", String(params.limit));
  },
};

function buildProductsSearchParams(
  params: FetchProductsParams,
): URLSearchParams {
  const searchParams = new URLSearchParams();
  const keys = Object.keys(PARAM_APPLIERS) as Array<keyof FetchProductsParams>;

  keys.forEach((key) => PARAM_APPLIERS[key](params, searchParams));

  return searchParams;
}

function isProductsPage(value: unknown): value is ProductsPage {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Record<string, unknown>;
  return (
    Array.isArray(candidate.items) &&
    (candidate.nextCursor === null || typeof candidate.nextCursor === "string")
  );
}

export async function fetchProducts(
  params: FetchProductsParams,
): Promise<ProductsPage> {
  const query = buildProductsSearchParams(params).toString();
  const response = await fetch(
    `${getBaseUrl()}/api/products${query ? `?${query}` : ""}`,
  );

  if (!response.ok) {
    throw new Error("Не удалось загрузить товары");
  }

  const data: unknown = await response.json();

  if (!isProductsPage(data)) {
    throw new Error("Некорректный ответ сервера");
  }

  return data;
}
