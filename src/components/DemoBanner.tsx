import { getStorageMode } from '@/lib/storage';
import { Database, HardDrive, Info, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [mode, setMode] = useState<'mongodb' | 'localStorage'>('localStorage');

  useEffect(() => {
    setMode(getStorageMode());
    const stored = localStorage.getItem('svit-demo-banner-dismissed');
    if (stored) setDismissed(true);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem('svit-demo-banner-dismissed', '1');
  };

  if (dismissed) return null;

  const isMongo = mode === 'mongodb';

  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${isMongo ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'}`}>
      <div className="container-page flex items-center justify-between gap-3 !py-0">
        <div className="flex items-center gap-2">
          {isMongo ? <Database className="h-4 w-4" /> : <HardDrive className="h-4 w-4" />}
          <span className="font-medium">
            {isMongo ? 'Demo Mode: Connected to MongoDB' : 'Demo Mode: Using browser storage (localStorage)'}
          </span>
          <span className="hidden sm:inline opacity-90">• Add MONGODB_URI in .env to enable MongoDB persistence</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden md:flex items-center gap-1 text-xs opacity-80"><Info className="h-3.5 w-3.5" /> Data resets on clear</span>
          <button onClick={dismiss} className="rounded p-1 hover:bg-white/20"><X className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
