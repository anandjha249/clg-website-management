import { useParams, Link } from 'react-router-dom';
import { Clock, Users, GraduationCap, CheckCircle2, ArrowRight, BookOpen, IndianRupee } from 'lucide-react';
import { getCourseById } from '@/data/courses';
import { Breadcrumbs, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';

export function CourseDetailPage() {
  const { id } = useParams();
  const course = getCourseById(id || '');

  if (!course) {
    return <div className="container-page py-20 text-center"><h1 className="text-2xl font-bold text-slate-800 dark:text-white">Course not found</h1><Button to="/courses" variant="primary" className="mt-4">Back to Courses</Button></div>;
  }

  return (
    <div>
      <section className="relative overflow-hidden h-72">
        <img src={course.image} alt={course.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 to-navy-900/70" />
        <div className="container-page relative flex h-full flex-col justify-end pb-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Courses', to: '/courses' }, { label: course.degree }]} />
          <div className="mt-3 flex items-center gap-3">
            <span className="badge bg-gold-500 text-white">{course.degree}</span>
            <span className="badge bg-white/20 text-white">{course.level}</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{course.name}</h1>
          <p className="mt-2 text-slate-300">{course.departmentName}</p>
        </div>
      </section>

      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Course Overview</h2><p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{course.overview}</p></div>
            <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Curriculum</h2><div className="mt-4 space-y-4">{course.curriculum.map((year) => <div key={year.year}><h3 className="mb-2 text-sm font-semibold text-navy-600 dark:text-navy-400">{year.year}</h3><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{year.subjects.map((subject) => <div key={subject} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-700/50"><CheckCircle2 className="h-4 w-4 text-green-500" /><span className="text-sm text-slate-700 dark:text-slate-200">{subject}</span></div>)}</div></div>)}</div></div>
            <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Career Opportunities</h2><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">{course.careers.map((career) => <div key={career} className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><GraduationCap className="h-4 w-4" /></div><span className="text-sm text-slate-700 dark:text-slate-200">{career}</span></div>)}</div></div>
          </div>
          <div className="space-y-6">
            <div className="card p-6"><h3 className="font-semibold text-slate-800 dark:text-white">Course Details</h3><div className="mt-4 space-y-3">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Clock className="h-4 w-4" /> Duration</span><span className="text-sm font-semibold text-slate-800 dark:text-white">{course.duration}</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Users className="h-4 w-4" /> Seats</span><span className="text-sm font-semibold text-slate-800 dark:text-white">{course.seats}</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><IndianRupee className="h-4 w-4" /> Fee/Year</span><span className="text-sm font-semibold text-slate-800 dark:text-white">₹{course.feePerYear.toLocaleString('en-IN')}</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><BookOpen className="h-4 w-4" /> Level</span><span className="text-sm font-semibold text-slate-800 dark:text-white">{course.level}</span></div>
            </div></div>
            <div className="card p-6"><h3 className="font-semibold text-slate-800 dark:text-white">Eligibility</h3><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{course.eligibility}</p></div>
            <div className="card p-6"><div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500 dark:text-slate-400">Admission Status</span><Badge variant={course.status === 'Open' ? 'success' : course.status === 'Filling Fast' ? 'warning' : 'error'}>{course.status}</Badge></div></div>
            <Button to="/admissions" fullWidth size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>Apply Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
