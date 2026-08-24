import { NextResponse } from "next/server";
import { getProductColor } from "@/shared/api/mock-server";
import { getErrorMessage } from "@/shared/lib/get-error-message";

interface RouteParams {
  params: Promise<{ id: string; colorId: string }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id, colorId } = await params;

  try {
    const color = await getProductColor(id, colorId);
    return NextResponse.json(color);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 404 },
    );
  }
}
