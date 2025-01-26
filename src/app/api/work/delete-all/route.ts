import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function DELETE() {
  try {
    const client = await clientPromise;
    const db = client.db("work");

    // Delete all documents from the "companiesAndProjects" collection
    const result = await db.collection("companiesAndProjects").deleteMany({});

    return NextResponse.json(
      { message: "All documents deleted", deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting documents:", error);
    return NextResponse.json(
      { message: "Error deleting documents" },
      { status: 500 }
    );
  }
}
