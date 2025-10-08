// src/lib/mongodb.ts
import { MongoClient, ServerApiVersion } from "mongodb";

const environment = process.env.NODE_ENV || "development";

const uri =
  environment === "development"
    ? process.env.MONGODB_URI_LOCAL
    : process.env.MONGODB_URI;

// Ensure MongoDB URI is provided
if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// Define a module-level variable for the MongoDB client promise
let clientPromise: Promise<MongoClient>;

// Use a module-scoped variable that is persistent in development
let cachedClientPromise: Promise<MongoClient> | null = null;

function initializeMongoClient(): Promise<MongoClient> {
  // Create a new MongoClient with options
  const client = new MongoClient(uri!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.connect();
}

// Handle the connection setup based on environment
if (process.env.NODE_ENV === "development") {
  // Use cached promise in development to avoid multiple connections
  if (!cachedClientPromise) {
    cachedClientPromise = initializeMongoClient();
  }
  clientPromise = cachedClientPromise;
} else {
  // Always initialize a new connection in production
  clientPromise = initializeMongoClient();
}

export default clientPromise;
