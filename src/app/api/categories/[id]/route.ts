import { NextResponse } from "next/server";
import { getCategory } from "@/shared/api/mock-server";
import { getErrorMessage } from "@/shared/lib/get-error-message";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const category = await getCategory(id);
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 404 },
    );
  }
}
