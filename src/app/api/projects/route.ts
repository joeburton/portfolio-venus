import { NextResponse } from 'next/server';

import { projects } from './projects';

export async function GET() {
  return NextResponse.json(projects, { status: 200 });
}
