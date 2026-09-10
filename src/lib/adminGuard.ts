import { NextResponse } from "next/server";

/**
 * Guards destructive / admin API routes (bulk-add, delete-all, delete by id).
 *
 * Access is allowed when either:
 *  - the app is running in development (local Postman, seeding), or
 *  - the request carries an `x-admin-secret` header matching ADMIN_API_SECRET.
 *
 * Returns a 401 `NextResponse` when the caller is not allowed, otherwise `null`.
 */
export function assertAdmin(request: Request): NextResponse | null {
  if (process.env.NODE_ENV === "development") return null;

  const secret = process.env.ADMIN_API_SECRET;
  if (secret && request.headers.get("x-admin-secret") === secret) return null;

  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
