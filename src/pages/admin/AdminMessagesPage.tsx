import { useState } from 'react';
import { contactMessages, type ContactMessage } from '@/data/students';
import { Mail, Trash2, Reply, CheckCheck, Search } from 'lucide-react';
import { Badge, ConfirmDialog, EmptyState } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';

const statusVariant = (s: string) => s === 'Unread' ? 'error' : s === 'Replied' ? 'success' : 'default';

export function AdminMessagesPage() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState(contactMessages);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const filtered = messages.filter((m) => m.subject.toLowerCase().includes(search.toLowerCase()) || m.name.toLowerCase().includes(search.toLowerCase()));

  const markAsRead = (msg: ContactMessage) => { setMessages(messages.map((m) => m.id === msg.id ? { ...m, status: 'Read' } : m)); setSelected({ ...msg, status: 'Read' }); };
  const sendReply = () => { if (selected) { setMessages(messages.map((m) => m.id === selected.id ? { ...m, status: 'Replied' } : m)); showToast('Reply sent successfully!', 'success'); setReplyOpen(false); setReplyText(''); } };
  const handleDelete = () => { if (deleteTarget) { setMessages(messages.filter((m) => m.id !== deleteTarget.id)); if (selected?.id === deleteTarget.id) setSelected(null); showToast('Message deleted', 'success'); setDeleteTarget(null); } };

  return (
    <div className="space-y-4">
      <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Messages</h2><p className="text-sm text-slate-500 dark:text-slate-400">{messages.filter((m) => m.status === 'Unread').length} unread • {messages.length} total</p></div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Message list */}
        <div className="lg:col-span-1">
          <div className="mb-3 relative"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input className="input-base pl-12" placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="space-y-2">
            {filtered.map((msg) => (
              <button key={msg.id} onClick={() => { setSelected(msg); if (msg.status === 'Unread') markAsRead(msg); }} className={`w-full rounded-xl border p-4 text-left transition ${selected?.id === msg.id ? 'border-navy-400 bg-navy-50 dark:bg-navy-900/30' : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800'}`}>
                <div className="flex items-center justify-between"><p className={`text-sm ${msg.status === 'Unread' ? 'font-bold text-slate-800 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-300'}`}>{msg.name}</p>{msg.status === 'Unread' && <span className="h-2 w-2 rounded-full bg-navy-500" />}</div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 truncate">{msg.subject}</p>
                <p className="mt-1 text-xs text-slate-400 truncate">{msg.message}</p>
                <div className="mt-2 flex items-center justify-between"><span className="text-xs text-slate-400">{new Date(msg.date).toLocaleDateString('en-IN')}</span><Badge variant={statusVariant(msg.status)}>{msg.status}</Badge></div>
              </button>
            ))}
            {filtered.length === 0 && <EmptyState icon={<Mail className="h-8 w-8" />} title="No messages" />}
          </div>
        </div>

        {/* Message detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="card p-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-700">
                <div><h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">{selected.subject}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">From: {selected.name} • {selected.email} • {selected.phone}</p><p className="text-xs text-slate-400">{new Date(selected.date).toLocaleDateString('en-IN')}</p></div>
                <Badge variant={statusVariant(selected.status)}>{selected.status}</Badge>
              </div>
              <div className="py-6"><p className="leading-relaxed text-slate-600 dark:text-slate-300">{selected.message}</p></div>
              <div className="flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-700">
                <Button variant="primary" size="sm" icon={<Reply className="h-4 w-4" />} onClick={() => setReplyOpen(true)}>Reply</Button>
                <Button variant="outline" size="sm" icon={<CheckCheck className="h-4 w-4" />} onClick={() => markAsRead(selected)}>Mark as Read</Button>
                <Button variant="ghost" size="sm" icon={<Trash2 className="h-4 w-4" />} onClick={() => setDeleteTarget(selected)} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Delete</Button>
              </div>
            </div>
          ) : (
            <div className="card flex h-full items-center justify-center p-12"><EmptyState icon={<Mail className="h-12 w-12" />} title="Select a message" description="Choose a message from the list to view its details." /></div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      <Modal open={replyOpen} onClose={() => setReplyOpen(false)} title="Reply to Message" size="lg" footer={<><Button variant="outline" onClick={() => setReplyOpen(false)}>Cancel</Button><Button variant="primary" onClick={sendReply} icon={<Reply className="h-4 w-4" />}>Send Reply</Button></>}>
        {selected && <div className="space-y-4"><div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50"><p className="text-xs text-slate-400">To: {selected.name} &lt;{selected.email}&gt;</p><p className="text-xs text-slate-400">Subject: Re: {selected.subject}</p></div><div><label className="label-base">Message</label><textarea className="input-base" rows={6} value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type your reply..." /></div></div>}
      </Modal>

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Message" message="Are you sure you want to delete this message? This action cannot be undone." confirmText="Delete" />
    </div>
  );
}
