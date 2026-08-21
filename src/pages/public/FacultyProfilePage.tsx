import { useParams, Link } from 'react-router-dom';
import { Mail, Phone, BookOpen, Award, Briefcase, GraduationCap, ArrowLeft, FileText } from 'lucide-react';
import { getFacultyById } from '@/data/faculty';
import { Breadcrumbs, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';

export function FacultyProfilePage() {
  const { id } = useParams();
  const member = getFacultyById(id || '');

  if (!member) {
    return <div className="container-page py-20 text-center"><h1 className="text-2xl font-bold text-slate-800 dark:text-white">Faculty member not found</h1><Button to="/faculty" variant="primary" className="mt-4">Back to Faculty</Button></div>;
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Faculty', to: '/faculty' }, { label: member.name }]} />
        </div>
      </section>

      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="card p-6 text-center">
              <img src={member.photo} alt={member.name} className="mx-auto h-40 w-40 rounded-full object-cover ring-4 ring-navy-50 dark:ring-slate-700" />
              <h2 className="mt-4 font-display text-xl font-bold text-slate-800 dark:text-white">{member.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{member.designation}</p>
              <div className="mt-3 flex justify-center"><Badge variant="navy">{member.departmentName}</Badge></div>
              <div className="mt-4 flex justify-center">
                {member.status === 'Active' ? <Badge variant="success">Active</Badge> : member.status === 'On Leave' ? <Badge variant="warning">On Leave</Badge> : <Badge variant="default">Sabbatical</Badge>}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white">Contact Information</h3>
              <div className="mt-4 space-y-3">
                <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-navy-600 dark:text-slate-300"><Mail className="h-4 w-4 text-navy-500" /> {member.email}</a>
                <a href={`tel:${member.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-navy-600 dark:text-slate-300"><Phone className="h-4 w-4 text-navy-500" /> {member.phone}</a>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white">Quick Info</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><GraduationCap className="h-4 w-4" /> Experience</span><span className="text-sm font-semibold text-slate-800 dark:text-white">{member.experience} years</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><FileText className="h-4 w-4" /> Publications</span><span className="text-sm font-semibold text-slate-800 dark:text-white">{member.publications}+</span></div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">About</h2>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{member.biography}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="card p-6"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><Award className="h-5 w-5" /></div><h3 className="font-semibold text-slate-800 dark:text-white">Qualification</h3></div><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{member.qualification}</p></div>
              <div className="card p-6"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300"><Briefcase className="h-5 w-5" /></div><h3 className="font-semibold text-slate-800 dark:text-white">Specialization</h3></div><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{member.specialization}</p></div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white">Department</h3>
              <Link to={`/departments/${member.departmentId}`} className="mt-3 flex items-center gap-2 text-sm font-medium text-navy-600 hover:underline dark:text-navy-400"><BookOpen className="h-4 w-4" /> {member.departmentName} <ArrowLeft className="h-3 w-3 rotate-180" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
