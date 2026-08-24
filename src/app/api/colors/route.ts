import { NextResponse } from "next/server";
import { getProducts } from "@/shared/api/mock-server";

export async function GET(): Promise<NextResponse<string[]>> {
  const products = await getProducts();
  const colorNames = new Set<string>();

  products.forEach((product) => {
    product.colors.forEach((color) => colorNames.add(color.name));
  });

  return NextResponse.json(Array.from(colorNames));
}
