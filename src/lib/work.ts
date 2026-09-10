import clientPromise from "@/lib/mongodb";
import { DisplayItemInterface } from "@/components/DisplayItem";

/**
 * Shape of a `companiesAndProjects` document as stored in Mongo.
 *
 * `_id` is an application-owned string (defined in the seed file), not an
 * `ObjectId`, so every route must type the collection with this to get the
 * filters right. See `src/app/api/projects/projects.ts` for the seed data.
 */
export type WorkDoc = {
  _id: string;
  sortOrder?: number;
} & Record<string, unknown>;

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

  return db
    .collection<DisplayItemInterface>("companiesAndProjects")
    .findOne({ _id: id });
}
