import { NextRequest, NextResponse } from 'next/server';

import { projects } from '../projects';

// Define the type for the request params
interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = params;

  // @todo move mocked data to MongoDB
  const project = await getProjectById(id);

  if (!project) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

async function getProjectById(id: string) {
  // Simulate database call/ filter
  return projects.find((project) => project._id === id) || null;
}
