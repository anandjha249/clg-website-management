import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_lib/mongo.js';

/**
 * POST /api/seed — seeds MongoDB with demo data if collections are empty.
 * Requires MONGODB_URI env. Safe to call multiple times (upserts only if empty).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const db = await getDb();
  if (!db) return res.status(503).json({ error: 'MongoDB not configured' });

  const demo = {
    notices: [
      { id: 'n1', title: 'Odd Semester End Examinations — December 2025 Time Table Released', category: 'Examination', date: '2025-11-20', description: 'The end-semester examination timetable for the odd semester (Dec 2025) has been published.', hasAttachment: true, attachmentName: 'odd_sem_timetable_dec2025.pdf', priority: 'High' },
      { id: 'n2', title: 'Admissions Open for 2026-27 Academic Session', category: 'Admission', date: '2025-11-18', description: 'Online applications for B.Tech, M.Tech, and MBA programs are now open.', hasAttachment: true, attachmentName: 'admissions_brochure_2026.pdf', priority: 'High' },
    ],
    events: [
      { id: 'e1', title: 'Innovision 2026 — Annual Technical Fest', date: '2026-02-10', time: '09:00 AM', location: 'SVIT Main Campus', category: 'Technical', description: 'Three-day technical fest with 40+ events.', longDescription: 'Innovision 2026 flagship fest.', image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800', status: 'upcoming' },
    ],
    admissions: [
      { id: 'a1', applicationId: 'APP2026-001', studentName: 'Ravi Teja', email: 'ravi.teja@gmail.com', phone: '+91 98000 11111', courseId: 'btech-cse', courseName: 'B.Tech CSE', applicationDate: '2025-11-01', status: 'Pending', percentage10: 92, percentage12: 88, entranceRank: 1245, documents: ['10th Certificate', '12th Certificate'] },
    ],
    messages: [
      { id: 'msg1', name: 'Ramesh Babu', email: 'ramesh.babu@gmail.com', phone: '+91 98765 11111', subject: 'Admission enquiry for B.Tech CSE 2026', message: 'My son has completed 12th with 89% in MPC...', date: '2025-11-18', status: 'Unread' },
    ],
  };

  const results: Record<string, number> = {};
  for (const [key, docs] of Object.entries(demo)) {
    const col = db.collection(key);
    const count = await col.countDocuments();
    if (count === 0) {
      const r = await col.insertMany(docs as never[]);
      results[key] = r.insertedCount;
    } else {
      results[key] = 0;
    }
  }

  return res.status(200).json({ success: true, seeded: results, message: 'Demo data seeded where collections were empty' });
}
