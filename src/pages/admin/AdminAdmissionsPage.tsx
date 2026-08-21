import { useState } from 'react';
import { admissions, type Admission } from '@/data/students';
import { AdminTable, type Column } from '@/components/ui/AdminTable';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { FileText, Download } from 'lucide-react';

const statusVariant = (s: string) => s === 'Approved' ? 'success' : s === 'Rejected' ? 'error' : s === 'Under Review' ? 'info' : 'warning';

export function AdminAdmissionsPage() {
  const { showToast } = useToast();
  const [viewing, setViewing] = useState<Admission | null>(null);
  const [list, setList] = useState(admissions);

  const columns: Column<Admission>[] = [
    { key: 'applicationId', label: 'Application ID', render: (a) => <span className="font-mono text-xs font-semibold text-navy-600 dark:text-navy-400">{a.applicationId}</span> },
    { key: 'studentName', label: 'Student', render: (a) => <div><p className="font-medium text-slate-800 dark:text-white">{a.studentName}</p><p className="text-xs text-slate-400">{a.email}</p></div> },
    { key: 'courseName', label: 'Course' },
    { key: 'applicationDate', label: 'Date', render: (a) => new Date(a.applicationDate).toLocaleDateString('en-IN') },
    { key: 'status', label: 'Status', render: (a) => <Badge variant={statusVariant(a.status)}>{a.status}</Badge> },
  ];

  const handleDelete = (item: Admission) => setList(list.filter((a) => a.id !== item.id));
  const updateStatus = (status: Admission['status']) => { if (viewing) { setList(list.map((a) => a.id === viewing.id ? { ...a, status } : a)); setViewing({ ...viewing, status }); showToast(`Application ${status}`, 'success'); } };

  return (
    <div className="space-y-4">
      <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Admissions Management</h2><p className="text-sm text-slate-500 dark:text-slate-400">{list.length} applications</p></div>
      <AdminTable title="application" data={list} columns={columns} searchKeys={['applicationId', 'studentName', 'courseName']} filterLabel="Status" filterKey="status" filterOptions={[{ label: 'Pending', value: 'Pending' }, { label: 'Under Review', value: 'Under Review' }, { label: 'Approved', value: 'Approved' }, { label: 'Rejected', value: 'Rejected' }]} onView={(a) => setViewing(a)} onDelete={handleDelete} />

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Application Details" size="lg" footer={viewing && <div className="flex w-full items-center justify-between"><Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>Download</Button><div className="flex gap-2"><Button variant="danger" size="sm" onClick={() => updateStatus('Rejected')}>Reject</Button><Button variant="primary" size="sm" onClick={() => updateStatus('Approved')}>Approve</Button></div></div>}>
        {viewing && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
              <div><p className="font-mono text-sm font-bold text-navy-700 dark:text-navy-300">{viewing.applicationId}</p><p className="text-xs text-slate-400">Submitted: {new Date(viewing.applicationDate).toLocaleDateString('en-IN')}</p></div>
              <Badge variant={statusVariant(viewing.status)}>{viewing.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-slate-400">Applicant Name</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{viewing.studentName}</p></div>
              <div><p className="text-xs text-slate-400">Course</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{viewing.courseName}</p></div>
              <div><p className="text-xs text-slate-400">Email</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{viewing.email}</p></div>
              <div><p className="text-xs text-slate-400">Phone</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{viewing.phone}</p></div>
              <div><p className="text-xs text-slate-400">10th Percentage</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{viewing.percentage10}%</p></div>
              <div><p className="text-xs text-slate-400">12th Percentage</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{viewing.percentage12}%</p></div>
              <div><p className="text-xs text-slate-400">Entrance Rank</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{viewing.entranceRank}</p></div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Uploaded Documents</p>
              <div className="space-y-2">
                {viewing.documents.map((doc) => (
                  <div key={doc} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                    <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-navy-500" /><span className="text-sm text-slate-700 dark:text-slate-200">{doc}</span></div>
                    <Button variant="ghost" size="sm" icon={<Download className="h-3.5 w-3.5" />} onClick={() => showToast('Downloading...', 'info')}>Download</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
