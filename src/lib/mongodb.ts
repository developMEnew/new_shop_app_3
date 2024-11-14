import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI || '';
const dbName = import.meta.env.VITE_MONGODB_DB || '';

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(uri);
clientPromise = client.connect();

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return { db, client };
}