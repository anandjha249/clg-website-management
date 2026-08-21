import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, Users } from 'lucide-react';
import { courses } from '@/data/courses';
import { Breadcrumbs, Badge } from '@/components/ui/index';

export function CoursesPage() {
  const [tab, setTab] = useState<'Undergraduate' | 'Postgraduate'>('Undergraduate');
  const [search, setSearch] = useState('');

  const filtered = courses.filter((c) => c.level === tab && (c.name.toLowerCase().includes(search.toLowerCase()) || c.departmentName.toLowerCase().includes(search.toLowerCase())));

  const statusVariant = (status: string) => status === 'Open' ? 'success' : status === 'Filling Fast' ? 'warning' : 'error';

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Courses' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Course Catalogue</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Explore our {courses.length} programs across undergraduate, postgraduate, and research levels.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
              {(['Undergraduate', 'Postgraduate'] as const).map((level) => (
                <button key={level} onClick={() => setTab(level)} className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${tab === level ? 'bg-navy-700 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}`}>{level}</button>
              ))}
            </div>
            <div className="relative sm:w-72">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-12" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="group card card-hover overflow-hidden flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img src={course.image} alt={course.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <span className="absolute top-3 right-3 badge bg-white/95 text-navy-700">{course.degree}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-navy-600 dark:group-hover:text-navy-300 line-clamp-2">{course.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{course.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.seats}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
                    <Badge variant={statusVariant(course.status)}>{course.status}</Badge>
                    <span className="flex items-center gap-1 text-sm font-semibold text-navy-600 dark:text-navy-400">View Details <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && <div className="py-16 text-center"><p className="text-slate-500">No courses found matching your search.</p></div>}
        </div>
      </section>
    </div>
  );
}
