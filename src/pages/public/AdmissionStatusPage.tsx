import { useState } from 'react';
import { Search, ArrowRight, Download, Calendar, FileText } from 'lucide-react';
import { getAdmissionByApplicationId } from '@/data/students';
import { Breadcrumbs, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export function AdmissionStatusPage() {
  const [appId, setAppId] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getAdmissionByApplicationId> | null>(null);
  const [searched, setSearched] = useState(false);
  const { showToast } = useToast();

  const checkStatus = () => {
    if (!appId.trim()) { showToast('Please enter an Application ID', 'warning'); return; }
    const found = getAdmissionByApplicationId(appId.trim().toUpperCase());
    setResult(found || null);
    setSearched(true);
    if (found) showToast('Application found!', 'success');
    else showToast('Application not found', 'error');
  };

  const statusVariant = (status: string) => status === 'Approved' ? 'success' : status === 'Rejected' ? 'error' : status === 'Under Review' ? 'info' : 'warning';

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16"><div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" /><div className="container-page relative"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Admissions', to: '/admissions' }, { label: 'Check Status' }]} /><h1 className="mt-4 font-display text-4xl font-bold text-white">Check Application Status</h1><p className="mt-3 text-slate-300">Enter your Application ID to track your admission status.</p></div></section>

      <div className="container-page py-12">
        <div className="mx-auto max-w-2xl">
          <div className="card p-6">
            <label className="label-base">Application ID</label>
            <div className="flex gap-3">
              <div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input className="input-base pl-12" placeholder="e.g. APP2026-001" value={appId} onChange={(e) => setApp(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkStatus()} /></div>
              <Button variant="primary" onClick={checkStatus}>Check Status</Button>
            </div>
            <p className="mt-3 text-xs text-slate-400">Try: APP2026-001, APP2026-003, APP2026-005</p>
          </div>

          {searched && result && (
            <div className="mt-6 card overflow-hidden animate-fade-in">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-700/50"><div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">Application Details</h2><Badge variant={statusVariant(result.status)}>{result.status}</Badge></div></div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-xs text-slate-400">Application ID</p><p className="mt-1 font-semibold text-slate-800 dark:text-white">{result.applicationId}</p></div>
                  <div><p className="text-xs text-slate-400">Applicant Name</p><p className="mt-1 font-semibold text-slate-800 dark:text-white">{result.studentName}</p></div>
                  <div><p className="text-xs text-slate-400">Course</p><p className="mt-1 font-semibold text-slate-800 dark:text-white">{result.courseName}</p></div>
                  <div><p className="text-xs text-slate-400">Application Date</p><p className="mt-1 font-semibold text-slate-800 dark:text-white">{new Date(result.applicationDate).toLocaleDateString('en-IN')}</p></div>
                  <div><p className="text-xs text-slate-400">Email</p><p className="mt-1 font-semibold text-slate-800 dark:text-white">{result.email}</p></div>
                  <div><p className="text-xs text-slate-400">Phone</p><p className="mt-1 font-semibold text-slate-800 dark:text-white">{result.phone}</p></div>
                </div>
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Application Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"><FileText className="h-4 w-4" /></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Application Submitted</p><p className="text-xs text-slate-400">{new Date(result.applicationDate).toLocaleDateString('en-IN')}</p></div></div>
                    {result.status !== 'Pending' && <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"><Calendar className="h-4 w-4" /></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Under Review</p><p className="text-xs text-slate-400">Application is being reviewed by the admission committee</p></div></div>}
                    {result.status === 'Approved' && <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"><FileText className="h-4 w-4" /></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Approved</p><p className="text-xs text-slate-400">Congratulations! Your application has been approved.</p></div></div>}
                    {result.status === 'Rejected' && <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"><FileText className="h-4 w-4" /></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Rejected</p><p className="text-xs text-slate-400">Application did not meet eligibility criteria.</p></div></div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {searched && !result && (
            <div className="mt-6 card p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400">No application found with ID "{appId}". Please check your Application ID and try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
