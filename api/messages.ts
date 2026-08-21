import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_lib/mongo.js';

const COLLECTION = 'messages';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = await getDb();
  if (!db) return res.status(503).json({ error: 'MongoDB not configured', fallback: 'localStorage' });

  try {
    const col = db.collection(COLLECTION);
    if (req.method === 'GET') {
      const data = await col.find({}).sort({ date: -1 }).toArray();
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const doc = { ...req.body, date: new Date().toISOString().slice(0, 10), status: 'Unread', createdAt: new Date().toISOString() };
      const result = await col.insertOne(doc);
      return res.status(201).json({ _id: result.insertedId, ...doc });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return res.status(500).json({ error: msg });
  }
}
