import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
      <PublicHeader />
      <main className="flex-1"><Outlet /></main>
      <PublicFooter />
    </div>
  );
}
