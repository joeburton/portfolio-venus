import { NextResponse } from "next/server";

import { sideprojects } from "./sideprojects";

export async function GET() {
  return NextResponse.json(sideprojects, { status: 200 });
}
