import { NextResponse } from "next/server";
import { getCategories } from "@/shared/api/mock-server";

export async function GET(): Promise<NextResponse> {
  const categories = await getCategories();
  return NextResponse.json(categories);
}
