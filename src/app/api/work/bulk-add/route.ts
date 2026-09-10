import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { assertAdmin } from "@/lib/adminGuard";
import type { WorkDoc } from "@/lib/work";

/*
Seed / re-seed docs
fetch("http://localhost:8080/api/work/bulk-add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(projects)
})
  .then(response => response.json())
  .then(data => console.log("Projects upserted:", data))
  .catch(error => console.error("Error:", error));
*/

export async function POST(request: Request) {
  const denied = assertAdmin(request);
  if (denied) return denied;

  try {
    const client = await clientPromise;
    const db = client.db("work");

    const data = await request.json();

    // Check if data is an array
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { message: "Data should be an array" },
        { status: 400 },
      );
    }

    if (data.some((doc) => !doc?._id || typeof doc._id !== "string")) {
      return NextResponse.json(
        { message: "Every document must have a string _id" },
        { status: 400 },
      );
    }

    // Idempotent upsert keyed on _id: re-seeding does not require wiping the
    // collection first, and duplicate keys no longer throw. sortOrder is
    // derived from array position so the seed file is the source of truth.
    const result = await db.collection<WorkDoc>("companiesAndProjects").bulkWrite(
      (data as WorkDoc[]).map(({ _id, ...rest }, index) => ({
        replaceOne: {
          filter: { _id },
          replacement: { ...rest, sortOrder: index },
          upsert: true,
        },
      })),
    );

    return NextResponse.json(
      {
        message: "Documents upserted",
        upsertedCount: result.upsertedCount,
        modifiedCount: result.modifiedCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error inserting documents:", error);
    return NextResponse.json(
      { message: "Error inserting documents" },
      { status: 500 },
    );
  }
}
