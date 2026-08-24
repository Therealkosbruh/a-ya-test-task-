import { NextResponse } from "next/server";
import { getProducts } from "@/shared/api/mock-server";

export async function GET(): Promise<NextResponse> {
  const products = await getProducts();
  return NextResponse.json(products);
}
