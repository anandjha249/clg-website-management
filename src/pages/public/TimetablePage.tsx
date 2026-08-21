import { Breadcrumbs } from '@/components/ui/index';
import { timetable } from '@/data/students';

export function TimetablePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Student Corner', to: '/student-corner' }, { label: 'Timetable' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Class Timetable</h1>
          <p className="mt-3 text-slate-300">{timetable.semester} — B.Tech CSE Section A</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/50">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Time</th>
                    {timetable.days.map((day) => <th key={day} className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">{day}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {timetable.periods.map((period, i) => (
                    <tr key={i} className={`border-b border-slate-100 last:border-0 dark:border-slate-700 ${period.label === 'Lunch' ? 'bg-amber-50 dark:bg-amber-900/10' : ''}`}>
                      <td className="px-4 py-3 text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">{period.time}</td>
                      {timetable.days.map((day) => {
                        const subject = timetable.schedule[day]?.[i] || '';
                        const isLab = subject.includes('Lab');
                        const isActivity = subject === 'Library' || subject === 'Seminar' || subject === 'Sports' || subject === 'Project' || subject === 'Lunch';
                        return (
                          <td key={day} className="px-4 py-3 text-center">
                            <span className={`inline-block rounded-lg px-2 py-1.5 text-xs font-medium ${period.label === 'Lunch' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : isLab ? 'bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300' : isActivity ? 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400' : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'}`}>{subject || '—'}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
