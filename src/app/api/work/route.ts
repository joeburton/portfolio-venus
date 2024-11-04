// src/app/api/work/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('work');
    const works = await db
      .collection('companiesAndProjects')
      .find({})
      .toArray();
    return NextResponse.json(works);
  } catch (error) {
    console.error('Error fetching works:', error);
    return NextResponse.json(
      { message: 'Error fetching works' },
      { status: 500 },
    );
  }
}

/*
Insert docs

fetch("http://localhost:8080/api/work", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(projects)
})
  .then(response => response.json())
  .then(data => console.log("Projects inserted:", data))
  .catch(error => console.error("Error:", error));
*/

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('work');

    const data = await request.json();

    // Check if data is an array
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { message: 'Data should be an array' },
        { status: 400 },
      );
    }

    // Insert the array of documents into the "companiesAndProjects" collection
    const result = await db.collection('companiesAndProjects').insertMany(data);

    // MongoDB will automatically assign a unique _id to each document
    return NextResponse.json(
      { message: 'Documents inserted', insertedIds: result.insertedIds },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error inserting documents:', error);
    return NextResponse.json(
      { message: 'Error inserting documents' },
      { status: 500 },
    );
  }
}

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

// export async function POST(request: Request) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('work');

//     const data = await request.json();
//     const result = await db.collection('companiesAndProjects').insertOne(data);

//     return NextResponse.json(result, { status: 201 });
//   } catch (error) {
//     console.error('Error adding new work:', error);
//     return NextResponse.json(
//       { message: 'Error adding new work' },
//       { status: 500 },
//     );
//   }
// }
