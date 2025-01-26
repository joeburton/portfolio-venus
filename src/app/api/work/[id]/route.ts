import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("work");

    // Convert the id to an ObjectId
    const record = await db
      .collection("companiesAndProjects")
      .findOne({ _id: new ObjectId(id) });

    // Check if the record exists
    if (!record) {
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 }
      );
    }

    // Return the record as JSON
    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching record:", error);
    return NextResponse.json(
      { message: "Error fetching record" },
      { status: 500 }
    );
  }
}
