import { useParams, Link } from 'react-router-dom';
import { Users, BookOpen, Mail, Phone, Calendar, CheckCircle2, ArrowRight, GraduationCap } from 'lucide-react';
import { getDepartmentById } from '@/data/departments';
import { getFacultyByDepartment } from '@/data/faculty';
import { Breadcrumbs } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';

export function DepartmentDetailPage() {
  const { id } = useParams();
  const dept = getDepartmentById(id || '');

  if (!dept) {
    return <div className="container-page py-20 text-center"><h1 className="text-2xl font-bold text-slate-800 dark:text-white">Department not found</h1><Button to="/departments" variant="primary" className="mt-4">Back to Departments</Button></div>;
  }

  const facultyList = getFacultyByDepartment(dept.id);

  return (
    <div>
      <section className="relative overflow-hidden h-72">
        <img src={dept.image} alt={dept.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 to-navy-900/70" />
        <div className="container-page relative flex h-full flex-col justify-end pb-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Departments', to: '/departments' }, { label: dept.shortName }]} />
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{dept.name}</h1>
          <p className="mt-2 text-slate-300">Established {dept.established} • {dept.facultyCount} Faculty • {dept.students} Students</p>
        </div>
      </section>

      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">About the Department</h2><p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{dept.longDescription}</p></div>
            <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Courses Offered</h2><div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{dept.courses.map((course) => <div key={course} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-700/50"><GraduationCap className="h-5 w-5 text-navy-600 dark:text-navy-400" /><span className="text-sm font-medium text-slate-700 dark:text-slate-200">{course}</span></div>)}</div></div>
            <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Faculty Members</h2><div className="mt-4 space-y-3">{facultyList.map((f) => <Link key={f.id} to={`/faculty/${f.id}`} className="flex items-center gap-4 rounded-xl border border-slate-200 p-3 transition hover:border-navy-300 hover:shadow-soft dark:border-slate-700 dark:hover:border-navy-700"><img src={f.photo} alt={f.name} className="h-12 w-12 rounded-full object-cover" /><div className="flex-1"><p className="font-semibold text-slate-800 dark:text-white">{f.name}</p><p className="text-sm text-slate-500 dark:text-slate-400">{f.designation}</p></div><ArrowRight className="h-4 w-4 text-slate-300" /></Link>)}</div></div>
            <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Department Facilities</h2><div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{dept.facilities.map((facility) => <div key={facility} className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /><span className="text-sm text-slate-700 dark:text-slate-300">{facility}</span></div>)}</div></div>
          </div>
          <div className="space-y-6">
            <div className="card p-6 text-center"><img src={facultyList[0]?.photo} alt={dept.hod} className="mx-auto h-28 w-28 rounded-full object-cover" /><h3 className="mt-4 font-semibold text-slate-800 dark:text-white">{dept.hod}</h3><p className="text-sm text-slate-500 dark:text-slate-400">Head of Department</p><p className="mt-2 text-xs text-slate-400">{facultyList[0]?.qualification}</p><div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-700"><p className="text-sm italic text-slate-500 dark:text-slate-400">"{facultyList[0]?.specialization}"</p></div></div>
            <div className="card p-6"><h3 className="font-semibold text-slate-800 dark:text-white">Department at a Glance</h3><div className="mt-4 space-y-3">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Users className="h-4 w-4" /> Faculty</span><span className="font-semibold text-slate-800 dark:text-white">{dept.facultyCount}</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><GraduationCap className="h-4 w-4" /> Students</span><span className="font-semibold text-slate-800 dark:text-white">{dept.students}</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><BookOpen className="h-4 w-4" /> Courses</span><span className="font-semibold text-slate-800 dark:text-white">{dept.courses.length}</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Calendar className="h-4 w-4" /> Established</span><span className="font-semibold text-slate-800 dark:text-white">{dept.established}</span></div>
            </div></div>
            <div className="card p-6"><h3 className="font-semibold text-slate-800 dark:text-white">Contact</h3><div className="mt-4 space-y-3"><a href={`mailto:${dept.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-navy-600 dark:text-slate-300"><Mail className="h-4 w-4 text-navy-500" /> {dept.email}</a><a href={`tel:${dept.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-navy-600 dark:text-slate-300"><Phone className="h-4 w-4 text-navy-500" /> {dept.phone}</a></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
