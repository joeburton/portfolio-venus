import { NextResponse } from "next/server";
import { getWorkProjects } from "@/lib/work";

export async function GET() {
  try {
    const works = await getWorkProjects();
    return NextResponse.json(works);
  } catch (error) {
    console.error("Error fetching works:", error);
    return NextResponse.json(
      { message: "Error fetching works" },
      { status: 500 },
    );
  }
}
