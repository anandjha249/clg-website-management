import { type ReactNode } from 'react';
import { Wrench } from 'lucide-react';

export function AdminPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-4">
      <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">{title}</h2><p className="text-sm text-slate-500 dark:text-slate-400">{description}</p></div>
      <div className="card flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-100 text-navy-600 dark:bg-navy-900/30 dark:text-navy-300"><Wrench className="h-8 w-8" /></div>
        <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">Content Editor</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">This section provides a rich content editor for managing the {title.toLowerCase()} page. Configure page sections, banners, and content blocks here.</p>
      </div>
    </div>
  );
}
