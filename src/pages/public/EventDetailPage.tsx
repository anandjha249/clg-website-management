import { useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { getEventById } from '@/data/events';
import { Breadcrumbs, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';

export function EventDetailPage() {
  const { id } = useParams();
  const event = getEventById(id || '');

  if (!event) {
    return <div className="container-page py-20 text-center"><h1 className="text-2xl font-bold text-slate-800 dark:text-white">Event not found</h1><Button to="/events" variant="primary" className="mt-4">Back to Events</Button></div>;
  }

  return (
    <div>
      <section className="relative overflow-hidden h-72">
        <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 to-navy-900/70" />
        <div className="container-page relative flex h-full flex-col justify-end pb-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: event.title }]} />
          <div className="mt-3"><Badge variant="navy">{event.category}</Badge></div>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">{event.title}</h1>
        </div>
      </section>

      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">About This Event</h2>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{event.longDescription}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white">Event Details</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><Calendar className="h-5 w-5" /></div><div><p className="text-xs text-slate-400">Date</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div></div>
                <div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300"><Clock className="h-5 w-5" /></div><div><p className="text-xs text-slate-400">Time</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{event.time}</p></div></div>
                <div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><MapPin className="h-5 w-5" /></div><div><p className="text-xs text-slate-400">Location</p><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{event.location}</p></div></div>
              </div>
            </div>
            {event.status === 'upcoming' && <Button to="/contact" fullWidth size="lg">Register Interest</Button>}
          </div>
        </div>
        <div className="mt-6 text-center"><Button to="/events" variant="ghost" icon={<ArrowLeft className="h-4 w-4" />}>Back to Events</Button></div>
      </div>
    </div>
  );
}
