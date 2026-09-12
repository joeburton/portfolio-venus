import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getWorkProjectById, type WorkDoc } from "@/lib/work";
import { assertAdmin } from "@/lib/adminGuard";

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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const denied = assertAdmin(request);
  if (denied) return denied;

  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Missing ID" }, { status: 400 });
  }

  try {
    const { _id: _ignored, sortOrder, ...data } = await request.json();

    if (Object.keys(data).length === 0 && sortOrder === undefined) {
      return NextResponse.json(
        { message: "No fields provided to update" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("work");

    const update: Partial<WorkDoc> = { ...data };
    if (sortOrder !== undefined) update.sortOrder = sortOrder;

    const result = await db
      .collection<WorkDoc>("companiesAndProjects")
      .findOneAndUpdate({ _id: id }, { $set: update }, { returnDocument: "after" });

    if (!result) {
      return NextResponse.json(
        { message: "No document found with the given ID" },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      { message: "Error updating document" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const denied = assertAdmin(request);
  if (denied) return denied;

  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Missing ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("work");

    const result = await db
      .collection<WorkDoc>("companiesAndProjects")
      .deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "No document found with the given ID" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Document deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { message: "Error deleting document" },
      { status: 500 },
    );
  }
}
