import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'svit_college';

  if (!uri) {
    console.warn('[mongo] MONGODB_URI not set — using fallback (no DB)');
    return null;
  }

  if (cachedClient && cachedDb) return cachedDb;

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    console.log(`[mongo] Connected to ${dbName}`);
    return db;
  } catch (e) {
    console.error('[mongo] Connection failed', e);
    return null;
  }
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}
