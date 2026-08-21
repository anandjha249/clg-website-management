import { useState } from 'react';
import { students, type Student } from '@/data/students';
import { departments } from '@/data/departments';
import { AdminTable, type Column } from '@/components/ui/AdminTable';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

const statusVariant = (s: string) => s === 'Active' ? 'success' : s === 'Graduated' ? 'info' : s === 'On Leave' ? 'warning' : 'error';

export function AdminStudentsPage() {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [viewing, setViewing] = useState<Student | null>(null);
  const [list, setList] = useState(students);

  const columns: Column<Student>[] = [
    { key: 'rollNumber', label: 'Student ID', render: (s) => <span className="font-mono text-xs font-semibold text-navy-600 dark:text-navy-400">{s.rollNumber}</span> },
    { key: 'name', label: 'Name', render: (s) => <div className="flex items-center gap-3"><img src={s.photo} alt={s.name} className="h-8 w-8 rounded-full object-cover" /><span className="font-medium text-slate-800 dark:text-white">{s.name}</span></div> },
    { key: 'departmentName', label: 'Dept', render: (s) => <Badge variant="navy">{s.departmentName}</Badge> },
    { key: 'courseName', label: 'Course' },
    { key: 'semester', label: 'Sem', render: (s) => `Sem ${s.semester}` },
    { key: 'status', label: 'Status', render: (s) => <Badge variant={statusVariant(s.status)}>{s.status}</Badge> },
  ];

  const handleSave = () => { showToast('Student saved successfully!', 'success'); setModalOpen(false); setEditing(null); };
  const handleDelete = (item: Student) => setList(list.filter((s) => s.id !== item.id));

  return (
    <div className="space-y-4">
      <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Student Management</h2><p className="text-sm text-slate-500 dark:text-slate-400">{list.length} students</p></div>
      <AdminTable title="student" data={list} columns={columns} searchKeys={['rollNumber', 'name', 'email', 'departmentName']} filterLabel="Department" filterKey="departmentId" filterOptions={departments.map((d) => ({ label: d.shortName, value: d.id }))} onAdd={() => { setEditing(null); setModalOpen(true); }} onEdit={(s) => { setEditing(s); setModalOpen(true); }} onView={(s) => setViewing(s)} onDelete={handleDelete} addLabel="Add Student" />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Student' : 'Add Student'} size="lg" footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={handleSave}>Save</Button></>}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><label className="label-base">Roll Number *</label><input className="input-base" defaultValue={editing?.rollNumber} placeholder="SVIT25CSE001" /></div>
          <div><label className="label-base">Full Name *</label><input className="input-base" defaultValue={editing?.name} placeholder="Student name" /></div>
          <div><label className="label-base">Email *</label><input className="input-base" defaultValue={editing?.email} placeholder="name@svit.ac.in" /></div>
          <div><label className="label-base">Phone</label><input className="input-base" defaultValue={editing?.phone} placeholder="+91" /></div>
          <div><label className="label-base">Department *</label><select className="input-base" defaultValue={editing?.departmentId}><option value="">Select</option>{departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
          <div><label className="label-base">Course *</label><input className="input-base" defaultValue={editing?.courseName} placeholder="B.Tech CSE" /></div>
          <div><label className="label-base">Semester</label><select className="input-base" defaultValue={editing?.semester}>{[1, 2, 3, 4, 5, 6, 7, 8].map((s) => <option key={s} value={s}>Semester {s}</option>)}</select></div>
          <div><label className="label-base">Status</label><select className="input-base" defaultValue={editing?.status}><option>Active</option><option>Graduated</option><option>On Leave</option><option>Suspended</option></select></div>
        </div>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Student Details" size="md">
        {viewing && (
          <div className="text-center">
            <img src={viewing.photo} alt={viewing.name} className="mx-auto h-20 w-20 rounded-full object-cover" />
            <h3 className="mt-3 font-display text-lg font-bold text-slate-800 dark:text-white">{viewing.name}</h3>
            <p className="font-mono text-xs text-slate-400">{viewing.rollNumber}</p>
            <div className="mt-2"><Badge variant={statusVariant(viewing.status)}>{viewing.status}</Badge></div>
            <div className="mt-4 space-y-2 text-left text-sm">
              <p><span className="text-slate-400">Email:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.email}</span></p>
              <p><span className="text-slate-400">Phone:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.phone}</span></p>
              <p><span className="text-slate-400">Department:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.departmentName}</span></p>
              <p><span className="text-slate-400">Course:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.courseName}</span></p>
              <p><span className="text-slate-400">Semester:</span> <span className="font-medium text-slate-700 dark:text-slate-200">Semester {viewing.semester}</span></p>
              <p><span className="text-slate-400">CGPA:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{viewing.cgpa}</span></p>
              <p><span className="text-slate-400">Admission Date:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{new Date(viewing.admissionDate).toLocaleDateString('en-IN')}</span></p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
