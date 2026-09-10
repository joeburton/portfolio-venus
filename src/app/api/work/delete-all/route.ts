import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { assertAdmin } from "@/lib/adminGuard";
import type { WorkDoc } from "@/lib/work";

export async function DELETE(request: Request) {
  const denied = assertAdmin(request);
  if (denied) return denied;

  try {
    const client = await clientPromise;
    const db = client.db("work");

    // Delete all documents from the "companiesAndProjects" collection
    const result = await db
      .collection<WorkDoc>("companiesAndProjects")
      .deleteMany({});

    return NextResponse.json(
      { message: "All documents deleted", deletedCount: result.deletedCount },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting documents:", error);
    return NextResponse.json(
      { message: "Error deleting documents" },
      { status: 500 },
    );
  }
}
