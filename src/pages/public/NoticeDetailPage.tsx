import { useParams, Link } from 'react-router-dom';
import { Calendar, Download, FileText, ArrowLeft, Tag } from 'lucide-react';
import { getNoticeById } from '@/data/notices';
import { Breadcrumbs, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export function NoticeDetailPage() {
  const { id } = useParams();
  const notice = getNoticeById(id || '');
  const { showToast } = useToast();

  if (!notice) {
    return <div className="container-page py-20 text-center"><h1 className="text-2xl font-bold text-slate-800 dark:text-white">Notice not found</h1><Button to="/notices" variant="primary" className="mt-4">Back to Notices</Button></div>;
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Notices', to: '/notices' }, { label: 'Notice' }]} />
        </div>
      </section>

      <div className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          <div className="card p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="navy"><Tag className="h-3 w-3" /> {notice.category}</Badge>
              {notice.priority === 'High' && <Badge variant="error">High Priority</Badge>}
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold text-slate-800 dark:text-white">{notice.title}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              {new Date(notice.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-700">
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">{notice.description}</p>
            </div>
            {notice.hasAttachment && (
              <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"><FileText className="h-5 w-5" /></div>
                  <div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{notice.attachmentName}</p><p className="text-xs text-slate-400">PDF Document</p></div>
                </div>
                <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} onClick={() => showToast('Downloading attachment...', 'info')}>Download</Button>
              </div>
            )}
          </div>
          <div className="mt-6 text-center"><Button to="/notices" variant="ghost" icon={<ArrowLeft className="h-4 w-4" />}>Back to Notices</Button></div>
        </div>
      </div>
    </div>
  );
}
