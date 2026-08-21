import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { events } from '@/data/events';
import { Breadcrumbs } from '@/components/ui/index';

export function EventsPage() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const filtered = events.filter((e) => e.status === tab);

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Events</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Discover upcoming and past events at SVIT — from technical fests to conferences and cultural celebrations.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mb-8 inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
            {(['upcoming', 'past'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-6 py-2 text-sm font-semibold capitalize transition ${tab === t ? 'bg-navy-700 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}`}>{t} Events</button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`} className="group card card-hover overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  <div className="absolute top-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-center shadow-md">
                    <p className="text-xs font-medium text-slate-500">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                    <p className="text-lg font-bold text-navy-700 leading-none">{new Date(event.date).getDate()}</p>
                  </div>
                  <span className="absolute top-3 right-3 badge bg-navy-700/90 text-white">{event.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-navy-600 dark:group-hover:text-navy-300">{event.title}</h3>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Calendar className="h-4 w-4" /> {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Clock className="h-4 w-4" /> {event.time}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><MapPin className="h-4 w-4" /> {event.location}</div>
                  </div>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{event.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
