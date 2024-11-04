// src/lib/mongodb.ts
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Function to connect to MongoDB
async function connectToDatabase(uri: string): Promise<MongoClient> {
  client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

// Determine the connection method based on the environment
if (process.env.NODE_ENV === 'development') {
  // In development mode, we use a global variable to store the MongoDB client
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = connectToDatabase(uri);
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, we create a new client connection
  clientPromise = connectToDatabase(uri).catch((error) => {
    console.error('Failed to connect to MongoDB in production:', error);
    throw error; // Rethrow error after logging
  });
}

export default clientPromise;
