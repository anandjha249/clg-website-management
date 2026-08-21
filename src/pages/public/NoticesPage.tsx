import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Download, FileText, Calendar } from 'lucide-react';
import { notices, noticeCategories } from '@/data/notices';
import { Breadcrumbs, Badge, Pagination, EmptyState } from '@/components/ui/index';

export function NoticesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = notices.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || n.category === category;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Notices' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Notices & Announcements</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Stay updated with the latest circulars, announcements, and important information.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search notices..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="input-base pl-12" />
            </div>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="input-base sm:w-48">
              <option value="All">All Categories</option>
              {noticeCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            {paginated.map((notice) => (
              <Link key={notice.id} to={`/notices/${notice.id}`} className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-navy-300 hover:shadow-soft dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300">
                  <span className="text-xs font-bold">{new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-lg font-bold leading-none">{new Date(notice.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="navy">{notice.category}</Badge>
                    {notice.priority === 'High' && <Badge variant="error">High Priority</Badge>}
                    {notice.hasAttachment && <span className="flex items-center gap-1 text-xs text-slate-400"><FileText className="h-3.5 w-3.5" /> Attachment</span>}
                  </div>
                  <h3 className="mt-1.5 font-semibold text-slate-800 dark:text-white group-hover:text-navy-600 dark:group-hover:text-navy-300">{notice.title}</h3>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          {paginated.length === 0 && <EmptyState icon={<Search className="h-8 w-8" />} title="No notices found" description="Try adjusting your search or filter." />}

          {totalPages > 1 && <div className="mt-8"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div>}
        </div>
      </section>
    </div>
  );
}
