import { NextResponse } from "next/server";
import { getProducts } from "@/shared/api/mock-server";

export async function GET(): Promise<NextResponse<string[]>> {
  const products = await getProducts();
  const brands = Array.from(new Set(products.map((product) => product.brand)));
  return NextResponse.json(brands);
}
