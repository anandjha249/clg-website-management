import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Trophy, Download, Bell, FileText, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/index';
import { academicCalendar } from '@/data/students';

const cards = [
  { title: 'Study Materials', description: 'Access lecture notes and reference resources', icon: BookOpen, link: '/student-corner/study-materials', color: 'navy' },
  { title: 'Timetable', description: 'View class and examination schedules', icon: Calendar, link: '/student-corner/timetable', color: 'gold' },
  { title: 'Results', description: 'Check your semester examination results', icon: Trophy, link: '/student-corner/results', color: 'navy' },
  { title: 'Downloads', description: 'Download forms, certificates, and documents', icon: Download, link: '/student-corner/downloads', color: 'gold' },
  { title: 'Notices', description: 'Latest announcements and circulars', icon: Bell, link: '/notices', color: 'navy' },
  { title: 'Academic Calendar', description: 'Important dates and academic schedule', icon: FileText, link: '/student-corner', color: 'gold' },
];

export function StudentCornerPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Student Corner' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Student Corner</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Everything you need as an SVIT student — all in one place.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Link key={card.title} to={card.link} className="group card card-hover flex items-center gap-4 p-5">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${card.color === 'navy' ? 'bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300' : 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300'}`}><card.icon className="h-7 w-7" /></div>
                <div className="flex-1"><h3 className="font-semibold text-slate-800 dark:text-white">{card.title}</h3><p className="text-sm text-slate-500 dark:text-slate-400">{card.description}</p></div>
                <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-slate-800 dark:text-white">Academic Calendar 2025-26</h2>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full">
                  <thead><tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/50">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Date</th>
                  </tr></thead>
                  <tbody>
                    {academicCalendar.map((item, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0 dark:border-slate-700">
                        <td className="px-6 py-3 text-sm text-slate-700 dark:text-slate-200">{item.event}</td>
                        <td className="px-6 py-3 text-sm font-medium text-navy-600 dark:text-navy-400">{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
