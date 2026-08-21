import { useState } from 'react';
import { faculty, type Faculty } from '@/data/faculty';
import { departments } from '@/data/departments';
import { AdminTable, type Column } from '@/components/ui/AdminTable';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

const statusVariant = (s: string) => s === 'Active' ? 'success' : s === 'On Leave' ? 'warning' : 'default';

export function AdminFacultyPage() {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Faculty | null>(null);
  const [viewing, setViewing] = useState<Faculty | null>(null);
  const [list, setList] = useState(faculty);

  const columns: Column<Faculty>[] = [
    { key: 'name', label: 'Faculty', render: (f) => <div className="flex items-center gap-3"><img src={f.photo} alt={f.name} className="h-9 w-9 rounded-full object-cover" /><div><p className="font-medium text-slate-800 dark:text-white">{f.name}</p><p className="text-xs text-slate-400">{f.designation}</p></div></div> },
    { key: 'departmentName', label: 'Department', render: (f) => <Badge variant="navy">{f.departmentName}</Badge> },
    { key: 'email', label: 'Email' },
    { key: 'experience', label: 'Experience', render: (f) => `${f.experience} yrs` },
    { key: 'status', label: 'Status', render: (f) => <Badge variant={statusVariant(f.status)}>{f.status}</Badge> },
  ];

  const handleSave = () => { showToast('Faculty saved successfully!', 'success'); setModalOpen(false); setEditing(null); };
  const handleDelete = (item: Faculty) => setList(list.filter((f) => f.id !== item.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Faculty Management</h2><p className="text-sm text-slate-500 dark:text-slate-400">{list.length} faculty members</p></div>
      </div>
      <AdminTable title="faculty" data={list} columns={columns} searchKeys={['name', 'email', 'departmentName']} filterLabel="Department" filterKey="departmentId" filterOptions={departments.map((d) => ({ label: d.shortName, value: d.id }))} onAdd={() => { setEditing(null); setModalOpen(true); }} onEdit={(f) => { setEditing(f); setModalOpen(true); }} onView={(f) => setViewing(f)} onDelete={handleDelete} addLabel="Add Faculty" />

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Faculty' : 'Add Faculty'} size="lg" footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={handleSave}>Save</Button></>}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><label className="label-base">Full Name *</label><input className="input-base" defaultValue={editing?.name} placeholder="Dr. John Doe" /></div>
          <div><label className="label-base">Designation *</label><input className="input-base" defaultValue={editing?.designation} placeholder="Professor" /></div>
          <div><label className="label-base">Department *</label><select className="input-base" defaultValue={editing?.departmentId}><option value="">Select</option>{departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
          <div><label className="label-base">Qualification</label><input className="input-base" defaultValue={editing?.qualification} placeholder="Ph.D., M.Tech" /></div>
          <div><label className="label-base">Experience (years)</label><input type="number" className="input-base" defaultValue={editing?.experience} placeholder="10" /></div>
          <div><label className="label-base">Email *</label><input className="input-base" defaultValue={editing?.email} placeholder="name@svit.ac.in" /></div>
          <div><label className="label-base">Phone</label><input className="input-base" defaultValue={editing?.phone} placeholder="+91" /></div>
          <div><label className="label-base">Status</label><select className="input-base" defaultValue={editing?.status}><option>Active</option><option>On Leave</option><option>Sabbatical</option></select></div>
          <div className="sm:col-span-2"><label className="label-base">Specialization</label><input className="input-base" defaultValue={editing?.specialization} placeholder="AI, Machine Learning" /></div>
          <div className="sm:col-span-2"><label className="label-base">Biography</label><textarea className="input-base" rows={3} defaultValue={editing?.biography} /></div>
          <div className="sm:col-span-2"><label className="label-base">Photo</label><div className="flex items-center gap-3"><div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-400"><img src={editing?.photo} alt="" className="h-full w-full rounded-xl object-cover" /></div><Button variant="outline" size="sm">Upload Photo</Button></div></div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Faculty Details" size="md">
        {viewing && (
          <div className="text-center">
            <img src={viewing.photo} alt={viewing.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
            <h3 className="mt-4 font-display text-lg font-bold text-slate-800 dark:text-white">{viewing.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{viewing.designation}</p>
            <div className="mt-2"><Badge variant="navy">{viewing.departmentName}</Badge></div>
            <div className="mt-4 space-y-2 text-left text-sm">
              <p><span className="text-slate-400">Qualification:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.qualification}</span></p>
              <p><span className="text-slate-400">Experience:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.experience} years</span></p>
              <p><span className="text-slate-400">Email:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.email}</span></p>
              <p><span className="text-slate-400">Phone:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.phone}</span></p>
              <p><span className="text-slate-400">Specialization:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.specialization}</span></p>
              <p><span className="text-slate-400">Publications:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.publications}+</span></p>
              <p><span className="text-slate-400">Status:</span> <Badge variant={statusVariant(viewing.status)}>{viewing.status}</Badge></p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
