import { NextResponse } from "next/server";
import { getWorkProjectById } from "@/lib/work";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const record = await getWorkProjectById(id);

    if (!record) {
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching record:", error);
    return NextResponse.json(
      { message: "Error fetching record" },
      { status: 500 },
    );
  }
}
