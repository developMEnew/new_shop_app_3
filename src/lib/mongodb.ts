import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'shop_inventory';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Check if the database exists, if not initialize it
    const collections = await db.listCollections().toArray();
    if (collections.length === 0) {
      await initializeDatabase(db);
    }

    return { db, client };
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Unable to connect to database');
  }
}

async function initializeDatabase(db: any) {
  try {
    // Create items collection with validation
    await db.createCollection('items', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'costPrice', 'sellingPrice', 'description', 'images'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            costPrice: {
              bsonType: 'number',
              description: 'must be a number and is required'
            },
            sellingPrice: {
              bsonType: 'number',
              description: 'must be a number and is required'
            },
            description: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            images: {
              bsonType: 'array',
              description: 'must be an array and is required',
              items: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    });

    // Create indexes
    await db.collection('items').createIndex({ name: 1 });
    await db.collection('items').createIndex({ costPrice: 1, sellingPrice: 1 });

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw new Error('Unable to initialize database');
  }
}