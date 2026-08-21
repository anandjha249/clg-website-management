import { useState } from 'react';
import { notices, type Notice, noticeCategories } from '@/data/notices';
import { AdminTable, type Column } from '@/components/ui/AdminTable';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

const priorityVariant = (p: string) => p === 'High' ? 'error' : p === 'Normal' ? 'info' : 'default';

export function AdminNoticesPage() {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [list, setList] = useState(notices);

  const columns: Column<Notice>[] = [
    { key: 'title', label: 'Title', render: (n) => <div><p className="font-medium text-slate-800 dark:text-white">{n.title}</p><p className="text-xs text-slate-400">{new Date(n.date).toLocaleDateString('en-IN')}</p></div> },
    { key: 'category', label: 'Category', render: (n) => <Badge variant="navy">{n.category}</Badge> },
    { key: 'priority', label: 'Priority', render: (n) => <Badge variant={priorityVariant(n.priority)}>{n.priority}</Badge> },
    { key: 'hasAttachment', label: 'Attachment', render: (n) => n.hasAttachment ? <Badge variant="info">Yes</Badge> : <span className="text-slate-400">No</span> },
  ];

  const handleSave = () => { showToast('Notice saved successfully!', 'success'); setModalOpen(false); setEditing(null); };
  const handleDelete = (item: Notice) => setList(list.filter((n) => n.id !== item.id));

  return (
    <div className="space-y-4">
      <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Notice Management</h2><p className="text-sm text-slate-500 dark:text-slate-400">{list.length} notices</p></div>
      <AdminTable title="notice" data={list} columns={columns} searchKeys={['title']} filterLabel="Category" filterKey="category" filterOptions={noticeCategories.map((c) => ({ label: c, value: c }))} onAdd={() => { setEditing(null); setModalOpen(true); }} onEdit={(n) => { setEditing(n); setModalOpen(true); }} onDelete={handleDelete} addLabel="Add Notice" />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Notice' : 'Add Notice'} size="lg" footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={handleSave}>Save</Button></>}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="label-base">Title *</label><input className="input-base" defaultValue={editing?.title} placeholder="Notice title" /></div>
          <div><label className="label-base">Category *</label><select className="input-base" defaultValue={editing?.category}>{noticeCategories.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label className="label-base">Date *</label><input type="date" className="input-base" defaultValue={editing?.date} /></div>
          <div><label className="label-base">Priority</label><select className="input-base" defaultValue={editing?.priority}><option>High</option><option>Normal</option><option>Low</option></select></div>
          <div><label className="label-base">Status</label><select className="input-base"><option>Published</option><option>Draft</option></select></div>
          <div className="sm:col-span-2"><label className="label-base">Description</label><textarea className="input-base" rows={4} defaultValue={editing?.description} /></div>
          <div className="sm:col-span-2"><label className="label-base">PDF Attachment</label><div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 p-4 dark:border-slate-600"><Button variant="outline" size="sm">Upload PDF</Button><span className="text-sm text-slate-400">No file selected</span></div></div>
        </div>
      </Modal>
    </div>
  );
}
