import { useState } from 'react';
import { X, Play, Video, Image as ImageIcon } from 'lucide-react';
import { galleryItems, galleryCategories } from '@/data/gallery';
import { Breadcrumbs } from '@/components/ui/index';

export function GalleryPage() {
  const [tab, setTab] = useState<'photo' | 'video' | 'event'>('photo');
  const [category, setCategory] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = galleryItems.filter((item) => {
    if (tab === 'event') return true;
    if (tab === 'photo') return item.type === 'photo';
    return item.type === 'video';
  }).filter((item) => category === 'All' || item.category === category);

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Campus Gallery</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Explore moments captured across our campus — events, sports, cultural programs, and more.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
              {([['photo', 'Photos', ImageIcon], ['video', 'Videos', Video], ['event', 'Events', ImageIcon]] as const).map(([key, label, Icon]) => (
                <button key={key} onClick={() => { setTab(key); setCategory('All'); }} className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition ${tab === key ? 'bg-navy-700 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}`}><Icon className="h-4 w-4" /> {label}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', ...galleryCategories].map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${category === cat ? 'bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'}`}>{cat}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((item) => (
              <button key={item.id} onClick={() => setLightbox(item.image)} className="group relative overflow-hidden rounded-xl">
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  {item.type === 'video' && <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-navy-700"><Play className="h-6 w-6" /></div>}
                  <p className="mt-2 px-2 text-center text-xs font-medium text-white">{item.title}</p>
                </div>
                <span className="absolute top-2 right-2 badge bg-white/90 text-navy-700">{item.category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 p-4 animate-fade-in-fast" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"><X className="h-6 w-6" /></button>
          <img src={lightbox} alt="Gallery" className="max-h-[90vh] max-w-full rounded-xl object-contain" />
        </div>
      )}
    </div>
  );
}
