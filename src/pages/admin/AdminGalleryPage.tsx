import { useState } from 'react';
import { galleryItems, galleryCategories } from '@/data/gallery';
import { Plus, Trash2, Image as ImageIcon, Video, Upload, X } from 'lucide-react';
import { Badge, ConfirmDialog, EmptyState } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export function AdminGalleryPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState(galleryItems);
  const [category, setCategory] = useState('All');
  const [type, setType] = useState<'all' | 'photo' | 'video'>('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    const matchCat = category === 'All' || item.category === category;
    const matchType = type === 'all' || item.type === type;
    return matchCat && matchType;
  });

  const handleDelete = () => { if (deleteTarget) { setItems(items.filter((i) => i.id !== deleteTarget)); showToast('Media deleted successfully', 'success'); setDeleteTarget(null); } };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Gallery Management</h2><p className="text-sm text-slate-500 dark:text-slate-400">{items.length} media items</p></div>
        <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => setUploadOpen(true)}>Upload Media</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
          {(['all', 'photo', 'video'] as const).map((t) => (
            <button key={t} onClick={() => setType(t)} className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-semibold capitalize transition ${type === t ? 'bg-navy-700 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}`}>{t === 'photo' ? <ImageIcon className="h-4 w-4" /> : t === 'video' ? <Video className="h-4 w-4" /> : null}{t}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', ...galleryCategories].map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${category === cat ? 'bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'}`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
              <div className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/60" />
              <div className="absolute top-2 right-2 flex gap-1">
                {item.type === 'video' && <Badge variant="navy"><Video className="h-3 w-3" /> Video</Badge>}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-xs font-medium text-white truncate">{item.title}</p>
                <div className="mt-1 flex items-center justify-between">
                  <Badge variant="default">{item.category}</Badge>
                  <button onClick={() => setDeleteTarget(item.id)} className="rounded-lg bg-red-600 p-1.5 text-white hover:bg-red-700"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : <div className="card p-8"><EmptyState icon={<ImageIcon className="h-8 w-8" />} title="No media found" description="Upload photos or videos to get started." /></div>}

      {/* Upload Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setUploadOpen(false)} />
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scale-in dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold text-slate-800 dark:text-white">Upload Media</h3><button onClick={() => setUploadOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="h-5 w-5" /></button></div>
            <div className="space-y-4">
              <div><label className="label-base">Title</label><input className="input-base" placeholder="Media title" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label-base">Type</label><select className="input-base"><option>photo</option><option>video</option></select></div>
                <div><label className="label-base">Category</label><select className="input-base">{galleryCategories.map((c) => <option key={c}>{c}</option>)}</select></div>
              </div>
              <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-600">
                <Upload className="mx-auto h-10 w-10 text-slate-400" />
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Drag & drop files here, or click to browse</p>
                <p className="mt-1 text-xs text-slate-400">JPG, PNG, MP4 — max 10MB</p>
                <Button variant="outline" size="sm" className="mt-3">Choose Files</Button>
              </div>
              <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => { showToast('Media uploaded successfully!', 'success'); setUploadOpen(false); }}>Upload</Button></div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Media" message="Are you sure you want to delete this media file? This action cannot be undone." confirmText="Delete" />
    </div>
  );
}
