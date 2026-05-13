import clientPromise from "@/lib/mongodb";
import { DisplayItemInterface } from "@/components/DisplayItem";

export async function getWorkProjects(): Promise<DisplayItemInterface[]> {
  const client = await clientPromise;
  const db = client.db("work");
  return db
    .collection<DisplayItemInterface>("companiesAndProjects")
    .find({})
    .sort({ sortOrder: 1 })
    .toArray();
}

export async function getWorkProjectById(
  id: string,
): Promise<DisplayItemInterface | null> {
  if (!id) return null;

  const client = await clientPromise;
  const db = client.db("work");

  return (
    db
      .collection<DisplayItemInterface>("companiesAndProjects")
      .findOne({ _id: id }) ?? null
  );
}
