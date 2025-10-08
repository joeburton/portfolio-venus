import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("work");
    const works = await db
      .collection("companiesAndProjects")
      .find({})
      .toArray();
    return NextResponse.json(works);
  } catch (error) {
    console.error("Error fetching works:", error);
    return NextResponse.json(
      { message: "Error fetching works" },
      { status: 500 }
    );
  }
}
