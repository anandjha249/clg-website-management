import { useState } from 'react';
import { events, type Event } from '@/data/events';
import { AdminTable, type Column } from '@/components/ui/AdminTable';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export function AdminEventsPage() {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [list, setList] = useState(events);

  const columns: Column<Event>[] = [
    { key: 'title', label: 'Event', render: (e) => <div className="flex items-center gap-3"><img src={e.image} alt="" className="h-10 w-10 rounded-lg object-cover" /><div><p className="font-medium text-slate-800 dark:text-white">{e.title}</p><p className="text-xs text-slate-400">{e.category}</p></div></div> },
    { key: 'date', label: 'Date', render: (e) => new Date(e.date).toLocaleDateString('en-IN') },
    { key: 'time', label: 'Time' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status', render: (e) => <Badge variant={e.status === 'upcoming' ? 'success' : 'default'}>{e.status}</Badge> },
  ];

  const handleSave = () => { showToast('Event saved successfully!', 'success'); setModalOpen(false); setEditing(null); };
  const handleDelete = (item: Event) => setList(list.filter((e) => e.id !== item.id));

  return (
    <div className="space-y-4">
      <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Event Management</h2><p className="text-sm text-slate-500 dark:text-slate-400">{list.length} events</p></div>
      <AdminTable title="event" data={list} columns={columns} searchKeys={['title', 'location', 'category']} filterLabel="Status" filterKey="status" filterOptions={[{ label: 'Upcoming', value: 'upcoming' }, { label: 'Past', value: 'past' }]} onAdd={() => { setEditing(null); setModalOpen(true); }} onEdit={(e) => { setEditing(e); setModalOpen(true); }} onDelete={handleDelete} addLabel="Add Event" />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Event' : 'Add Event'} size="lg" footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="primary" onClick={handleSave}>Save</Button></>}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="label-base">Event Name *</label><input className="input-base" defaultValue={editing?.title} placeholder="Event title" /></div>
          <div><label className="label-base">Date *</label><input type="date" className="input-base" defaultValue={editing?.date} /></div>
          <div><label className="label-base">Time *</label><input className="input-base" defaultValue={editing?.time} placeholder="09:00 AM" /></div>
          <div><label className="label-base">Location *</label><input className="input-base" defaultValue={editing?.location} placeholder="SVIT Auditorium" /></div>
          <div><label className="label-base">Category</label><input className="input-base" defaultValue={editing?.category} placeholder="Technical, Cultural..." /></div>
          <div><label className="label-base">Status</label><select className="input-base" defaultValue={editing?.status}><option value="upcoming">Upcoming</option><option value="past">Past</option></select></div>
          <div className="sm:col-span-2"><label className="label-base">Description</label><textarea className="input-base" rows={3} defaultValue={editing?.description} /></div>
          <div className="sm:col-span-2"><label className="label-base">Event Image</label><div className="flex items-center gap-3"><div className="h-20 w-32 overflow-hidden rounded-lg bg-slate-100">{editing && <img src={editing.image} alt="" className="h-full w-full object-cover" />}</div><Button variant="outline" size="sm">Upload Image</Button></div></div>
        </div>
      </Modal>
    </div>
  );
}
