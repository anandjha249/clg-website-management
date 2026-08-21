import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, BookOpen, ArrowRight } from 'lucide-react';
import { departments } from '@/data/departments';
import { Breadcrumbs } from '@/components/ui/index';

export function DepartmentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = departments.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.hod.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || d.id === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Departments' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Academic Departments</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Explore our {departments.length} specialized departments, each committed to excellence in teaching and research.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search departments or HOD..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-12" />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-base sm:w-56">
              <option value="all">All Departments</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.shortName}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((dept) => (
              <div key={dept.id} className="group card card-hover overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <img src={dept.image} alt={dept.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  <span className="absolute top-3 right-3 badge bg-white/95 text-navy-700">{dept.shortName}</span>
                  <div className="absolute bottom-3 left-4"><h3 className="font-display text-lg font-bold text-white">{dept.name}</h3></div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{dept.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {dept.facultyCount} Faculty</span>
                      <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {dept.courses.length} Courses</span>
                    </div>
                  </div>
                  <div className="mt-3"><p className="text-xs text-slate-400">HOD: <span className="font-medium text-slate-600 dark:text-slate-300">{dept.hod}</span></p></div>
                  <Link to={`/departments/${dept.id}`} className="mt-4 flex items-center justify-between rounded-xl bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-100 dark:bg-navy-900/30 dark:text-navy-300 dark:hover:bg-navy-900/50">View Department <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && <div className="py-16 text-center"><p className="text-slate-500">No departments found matching your search.</p></div>}
        </div>
      </section>
    </div>
  );
}
