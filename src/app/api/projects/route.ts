import { NextResponse } from "next/server";

import { work } from "@/data/work";

export async function GET() {
  return NextResponse.json(work, { status: 200 });
}
