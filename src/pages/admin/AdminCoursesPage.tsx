import { useState } from 'react';
import { courses, type Course } from '@/data/courses';
import { departments } from '@/data/departments';
import { AdminTable, type Column } from '@/components/ui/AdminTable';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

const statusVariant = (s: string) => s === 'Open' ? 'success' : s === 'Filling Fast' ? 'warning' : 'error';

export function AdminCoursesPage() {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [viewing, setViewing] = useState<Course | null>(null);
  const [list, setList] = useState(courses);

  const columns: Column<Course>[] = [
    { key: 'name', label: 'Course', render: (c) => <div><p className="font-medium text-slate-800 dark:text-white">{c.name}</p><p className="text-xs text-slate-400">{c.departmentName}</p></div> },
    { key: 'degree', label: 'Degree', render: (c) => <Badge variant="navy">{c.degree}</Badge> },
    { key: 'duration', label: 'Duration' },
    { key: 'seats', label: 'Seats', render: (c) => <span className="font-semibold">{c.seats}</span> },
    { key: 'feePerYear', label: 'Fee/Year', render: (c) => `₹${c.feePerYear.toLocaleString('en-IN')}` },
    { key: 'status', label: 'Status', render: (c) => <Badge variant={statusVariant(c.status)}>{c.status}</Badge> },
  ];

  const handleSave = () => { showToast('Course saved successfully!', 'success'); setModalOpen(false); setEditing(null); };
  const handleDelete = (item: Course) => setList(list.filter((c) => c.id !== item.id));

  return (
    <div className="space-y-4">
      <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Course Management</h2><p className="text-sm text-slate-500 dark:text-slate-400">{list.length} courses</p></div>
      <AdminTable title="course" data={list} columns={columns} searchKeys={['name', 'degree', 'departmentName']} filterLabel="Degree" filterKey="degree" filterOptions={[{ label: 'B.Tech', value: 'B.Tech' }, { label: 'M.Tech', value: 'M.Tech' }, { label: 'MBA', value: 'MBA' }]} onAdd={() => { setEditing(null); setModalOpen(true); }} onEdit={(c) => { setEditing(c); setModalOpen(true); }} onView={(c) => setViewing(c)} onDelete={handleDelete} addLabel="Add Course" />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Course' : 'Add Course'} size="lg" footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={handleSave}>Save</Button></>}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="label-base">Course Name *</label><input className="input-base" defaultValue={editing?.name} placeholder="B.Tech — Computer Science" /></div>
          <div><label className="label-base">Degree *</label><select className="input-base" defaultValue={editing?.degree}><option>B.Tech</option><option>M.Tech</option><option>MBA</option><option>M.Sc.</option><option>Ph.D.</option></select></div>
          <div><label className="label-base">Department *</label><select className="input-base" defaultValue={editing?.departmentId}><option value="">Select</option>{departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
          <div><label className="label-base">Duration</label><input className="input-base" defaultValue={editing?.duration} placeholder="4 Years" /></div>
          <div><label className="label-base">Seats</label><input type="number" className="input-base" defaultValue={editing?.seats} placeholder="120" /></div>
          <div><label className="label-base">Fee/Year (₹)</label><input type="number" className="input-base" defaultValue={editing?.feePerYear} placeholder="145000" /></div>
          <div><label className="label-base">Status</label><select className="input-base" defaultValue={editing?.status}><option>Open</option><option>Filling Fast</option><option>Closed</option></select></div>
          <div className="sm:col-span-2"><label className="label-base">Eligibility</label><textarea className="input-base" rows={2} defaultValue={editing?.eligibility} /></div>
          <div className="sm:col-span-2"><label className="label-base">Description</label><textarea className="input-base" rows={2} defaultValue={editing?.description} /></div>
        </div>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Course Details" size="md">
        {viewing && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3"><img src={viewing.image} alt="" className="h-16 w-16 rounded-lg object-cover" /><div><h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">{viewing.name}</h3><Badge variant="navy">{viewing.degree}</Badge></div></div>
            <p><span className="text-slate-400">Department:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.departmentName}</span></p>
            <p><span className="text-slate-400">Duration:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.duration}</span></p>
            <p><span className="text-slate-400">Seats:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.seats}</span></p>
            <p><span className="text-slate-400">Fee:</span> <span className="font-medium text-slate-700 dark:text-slate-200">₹{viewing.feePerYear.toLocaleString('en-IN')}/yr</span></p>
            <p><span className="text-slate-400">Status:</span> <Badge variant={statusVariant(viewing.status)}>{viewing.status}</Badge></p>
            <p><span className="text-slate-400">Eligibility:</span> {viewing.eligibility}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
