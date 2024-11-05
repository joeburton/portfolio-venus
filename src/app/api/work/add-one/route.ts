import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

/*
Insert docs
fetch("http://localhost:8080/api/work", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(project)
})
  .then(response => response.json())
  .then(data => console.log("Project inserted:", data))
  .catch(error => console.error("Error:", error));
*/

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('work');

    const data = await request.json();
    const result = await db.collection('companiesAndProjects').insertOne(data);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error adding new work:', error);
    return NextResponse.json(
      { message: 'Error adding new work' },
      { status: 500 },
    );
  }
}
