import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { assertAdmin } from "@/lib/adminGuard";
import type { WorkDoc } from "@/lib/work";

/*
Insert one doc
fetch("http://localhost:8080/api/work/add-one", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(project) // optional string `_id`; otherwise derived from `company`
})
  .then(response => response.json())
  .then(data => console.log("Project inserted:", data))
  .catch(error => console.error("Error:", error));
*/

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function POST(request: Request) {
  const denied = assertAdmin(request);
  if (denied) return denied;

  try {
    const client = await clientPromise;
    const db = client.db("work");
    const collection = db.collection<WorkDoc>("companiesAndProjects");

    const { _id, sortOrder: _ignored, ...data } = await request.json();

    // Use the caller-supplied string id, or derive one from the company name.
    let id: string = typeof _id === "string" && _id ? _id : slugify(data.company ?? "");
    if (!id) {
      return NextResponse.json(
        { message: "Provide a string _id, or a company name to derive one from" },
        { status: 400 },
      );
    }

    const exists = (candidate: string) =>
      collection.findOne({ _id: candidate }, { projection: { _id: 1 } });

    if (typeof _id === "string" && _id) {
      if (await exists(id)) {
        return NextResponse.json(
          { message: `A document with _id "${id}" already exists` },
          { status: 409 },
        );
      }
    } else {
      // Derived id: append a numeric suffix until it is unique.
      const base = id;
      let n = 2;
      while (await exists(id)) id = `${base}-${n++}`;
    }

    const last = await collection.findOne(
      {},
      { sort: { sortOrder: -1 }, projection: { sortOrder: 1 } },
    );
    const sortOrder = last?.sortOrder != null ? last.sortOrder + 1 : 0;

    await collection.insertOne({ ...data, _id: id, sortOrder });

    return NextResponse.json({ _id: id, sortOrder }, { status: 201 });
  } catch (error) {
    console.error("Error adding new work:", error);
    return NextResponse.json(
      { message: "Error adding new work" },
      { status: 500 },
    );
  }
}
