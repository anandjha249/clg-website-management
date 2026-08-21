import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, GraduationCap, ArrowRight } from 'lucide-react';
import { faculty } from '@/data/faculty';
import { departments } from '@/data/departments';
import { Breadcrumbs, Badge } from '@/components/ui/index';

export function FacultyPage() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const filtered = faculty.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.specialization.toLowerCase().includes(search.toLowerCase());
    const matchFilter = deptFilter === 'all' || f.departmentId === deptFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Faculty' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Faculty Directory</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Meet our distinguished faculty members — experts in their fields and mentors to our students.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search by name or specialization..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-12" />
            </div>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="input-base sm:w-56">
              <option value="all">All Departments</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.shortName}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f) => (
              <Link key={f.id} to={`/faculty/${f.id}`} className="group card card-hover overflow-hidden">
                <div className="flex flex-col items-center p-6">
                  <img src={f.photo} alt={f.name} className="h-28 w-28 rounded-full object-cover ring-4 ring-navy-50 dark:ring-slate-700" />
                  <h3 className="mt-4 font-semibold text-slate-800 dark:text-white group-hover:text-navy-600 dark:group-hover:text-navy-300">{f.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{f.designation}</p>
                  <div className="mt-2"><Badge variant="navy">{f.departmentName}</Badge></div>
                </div>
                <div className="border-t border-slate-100 px-6 py-3 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><GraduationCap className="h-4 w-4" /> {f.experience} years experience</div>
                  <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 truncate"><Mail className="h-4 w-4" /> {f.email}</div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && <div className="py-16 text-center"><p className="text-slate-500">No faculty members found matching your search.</p></div>}
        </div>
      </section>
    </div>
  );
}
