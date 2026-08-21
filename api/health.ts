import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, isMongoConfigured } from './_lib/mongo.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const mongoConfigured = isMongoConfigured();
  let mongoConnected = false;

  if (mongoConfigured) {
    const db = await getDb();
    mongoConnected = Boolean(db);
    if (db) {
      try {
        await db.command({ ping: 1 });
        mongoConnected = true;
      } catch {
        mongoConnected = false;
      }
    }
  }

  return res.status(200).json({
    status: 'ok',
    storage: mongoConnected ? 'mongodb' : 'localStorage',
    mongoConfigured,
    mongoConnected,
    timestamp: new Date().toISOString(),
  });
}
