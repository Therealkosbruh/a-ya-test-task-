import { NextResponse, type NextRequest } from "next/server";
import { getProducts } from "@/shared/api/mock-server";
import { getProductMinPrice } from "@/entities/product/lib/get-min-price";
import { isProductInStock } from "@/entities/product/lib/is-in-stock";
import type { Product } from "@/shared/api/types";

interface ProductsResponse {
  items: Product[];
  nextCursor: string | null;
}

const DEFAULT_LIMIT = 8;

function parseLimit(rawLimit: string | null): number {
  const parsed = rawLimit ? Number(rawLimit) : DEFAULT_LIMIT;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_LIMIT;
}

function parseCsvParam(rawValue: string | null): string[] {
  return rawValue ? rawValue.split(",").filter(Boolean) : [];
}

function parseCsvNumberParam(rawValue: string | null): number[] {
  return parseCsvParam(rawValue)
    .map(Number)
    .filter((value) => Number.isFinite(value));
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ProductsResponse>> {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const inStock = searchParams.get("inStock") === "true";
  const categoryIds = parseCsvNumberParam(searchParams.get("categoryIds"));
  const brands = parseCsvParam(searchParams.get("brands"));
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const colorNames = parseCsvParam(searchParams.get("colorNames"));
  const sizeIds = parseCsvNumberParam(searchParams.get("sizeIds"));
  const sort = searchParams.get("sort") === "desc" ? "desc" : "asc";
  const after = searchParams.get("after");
  const limit = parseLimit(searchParams.get("limit"));

  const products = await getProducts();

  const filteredBySearch = search
    ? products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      )
    : products;

  const filteredByStock = inStock
    ? filteredBySearch.filter(isProductInStock)
    : filteredBySearch;

  const filteredByCategory = categoryIds.length
    ? filteredByStock.filter((product) =>
        categoryIds.includes(product.categoryId),
      )
    : filteredByStock;

  const filteredByBrand = brands.length
    ? filteredByCategory.filter((product) => brands.includes(product.brand))
    : filteredByCategory;

  const filteredByPriceMin = priceMin
    ? filteredByBrand.filter(
        (product) => getProductMinPrice(product) >= Number(priceMin),
      )
    : filteredByBrand;

  const filteredByPriceMax = priceMax
    ? filteredByPriceMin.filter(
        (product) => getProductMinPrice(product) <= Number(priceMax),
      )
    : filteredByPriceMin;

  const filteredByColor = colorNames.length
    ? filteredByPriceMax.filter((product) =>
        product.colors.some((color) => colorNames.includes(color.name)),
      )
    : filteredByPriceMax;

  const filteredBySize = sizeIds.length
    ? filteredByColor.filter((product) =>
        product.colors.some((color) =>
          color.sizes.some((size) => sizeIds.includes(size)),
        ),
      )
    : filteredByColor;

  const sorted = [...filteredBySize].sort((a, b) => {
    const diff = getProductMinPrice(a) - getProductMinPrice(b);
    return sort === "asc" ? diff : -diff;
  });

  const afterIndex = after
    ? sorted.findIndex((product) => String(product.id) === after)
    : -1;
  const startIndex = afterIndex === -1 ? 0 : afterIndex + 1;

  const items = sorted.slice(startIndex, startIndex + limit);
  const lastItem = items.at(-1);
  const hasMore = startIndex + items.length < sorted.length;
  const nextCursor = lastItem && hasMore ? String(lastItem.id) : null;

  return NextResponse.json({ items, nextCursor });
}
