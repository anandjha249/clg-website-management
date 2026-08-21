/**
 * Unified storage layer: MongoDB (via Vercel API) with localStorage fallback.
 * - If MONGODB_URI is set on server and API is reachable, data is persisted in MongoDB.
 * - Otherwise, uses localStorage with initial demo data seeding.
 * - Frontend checks VITE_MONGODB_URI or VITE_API_URL env to decide, but also gracefully falls back if API 404.
 */

const PREFIX = 'svit_';

export function isMongoEnabled(): boolean {
  // Client-side env check. VITE_ prefix is exposed by Vite.
  // If either is set, we assume server is configured for MongoDB.
  const env = import.meta.env as Record<string, string | undefined>;
  return Boolean(env.VITE_MONGODB_URI || env.VITE_API_URL || env.VITE_USE_MONGODB === 'true');
}

export function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw) return JSON.parse(raw) as T;
    // seed with fallback
    localStorage.setItem(PREFIX + key, JSON.stringify(fallback));
    return fallback;
  } catch {
    return fallback;
  }
}

export function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage set failed', e);
  }
}

export function appendLocal<T extends { id: string }>(key: string, item: T, fallback: T[]): T[] {
  const current = getLocal<T[]>(key, fallback);
  const updated = [...current, item];
  setLocal(key, updated);
  return updated;
}

export function updateLocal<T extends { id: string }>(key: string, id: string, patch: Partial<T>, fallback: T[]): T[] {
  const current = getLocal<T[]>(key, fallback);
  const updated = current.map((x) => (x.id === id ? { ...x, ...patch } : x));
  setLocal(key, updated);
  return updated;
}

export function removeLocal<T extends { id: string }>(key: string, id: string, fallback: T[]): T[] {
  const current = getLocal<T[]>(key, fallback);
  const updated = current.filter((x) => x.id !== id);
  setLocal(key, updated);
  return updated;
}

// Async API helpers with fallback
export async function fetchApi<T>(endpoint: string, fallback: T): Promise<T> {
  if (!isMongoEnabled()) return getLocal(endpoint, fallback);
  try {
    const res = await fetch(`/api/${endpoint}`, { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    // cache to localStorage for offline
    setLocal(endpoint + '_cache', data);
    return data as T;
  } catch (e) {
    console.warn(`API fallback to localStorage for ${endpoint}`, e);
    return getLocal(endpoint, fallback);
  }
}

export async function postApi<T>(endpoint: string, body: unknown, fallback: T): Promise<T> {
  if (!isMongoEnabled()) {
    // localStorage mode: caller should handle append themselves
    return fallback;
  }
  try {
    const res = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`POST API fallback`, e);
    return fallback;
  }
}

export function clearDemoData() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  } catch {}
}

export function getStorageMode(): 'mongodb' | 'localStorage' {
  return isMongoEnabled() ? 'mongodb' : 'localStorage';
}
