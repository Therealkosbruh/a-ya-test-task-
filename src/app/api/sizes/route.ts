import { NextResponse } from "next/server";
import { getSizes } from "@/shared/api/mock-server";

export async function GET(): Promise<NextResponse> {
  const sizes = await getSizes();
  return NextResponse.json(sizes);
}
