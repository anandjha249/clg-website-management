import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_lib/mongo.js';

const COLLECTION = 'admissions';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = await getDb();
  if (!db) {
    // Fallback: instruct client to use localStorage
    return res.status(503).json({ error: 'MongoDB not configured', fallback: 'localStorage' });
  }

  try {
    const col = db.collection(COLLECTION);

    if (req.method === 'GET') {
      const data = await col.find({}).sort({ applicationDate: -1 }).toArray();
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const body = req.body;
      if (!body?.studentName) return res.status(400).json({ error: 'Missing required fields' });
      const doc = { ...body, createdAt: new Date().toISOString() };
      const result = await col.insertOne(doc);
      return res.status(201).json({ _id: result.insertedId, ...doc });
    }

    if (req.method === 'PUT') {
      const { id, ...patch } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing id' });
      const { ObjectId } = await import('mongodb');
      await col.updateOne({ _id: new ObjectId(id as string) }, { $set: patch });
      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const id = (req.query.id as string) || req.body?.id;
      if (!id) return res.status(400).json({ error: 'Missing id' });
      const { ObjectId } = await import('mongodb');
      await col.deleteOne({ _id: new ObjectId(id as string) });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    console.error('[admissions api]', e);
    return res.status(500).json({ error: msg });
  }
}
