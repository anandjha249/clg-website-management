import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { college } from '@/data/college';

const quickLinks = [
  { label: 'About Us', to: '/about' }, { label: 'Departments', to: '/departments' },
  { label: 'Courses', to: '/courses' }, { label: 'Admissions', to: '/admissions' },
  { label: 'Faculty', to: '/faculty' }, { label: 'Gallery', to: '/gallery' },
];
const importantLinks = [
  { label: 'Notices', to: '/notices' }, { label: 'Events', to: '/events' },
  { label: 'Student Corner', to: '/student-corner' }, { label: 'Results', to: '/student-corner/results' },
  { label: 'Study Materials', to: '/student-corner/study-materials' }, { label: 'Contact Us', to: '/contact' },
];

export function PublicFooter() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="border-b border-navy-800">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div>
            <h3 className="font-display text-xl font-bold text-white">Start Your Journey With Us</h3>
            <p className="mt-1 text-sm text-slate-400">Join 5,000+ students building their future at SVIT</p>
          </div>
          <Link to="/admissions" className="rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-gold-600">Apply for Admission</Link>
        </div>
      </div>
      <div className="container-page grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 text-white"><GraduationCap className="h-5 w-5" /></div>
            <div><h4 className="font-display text-sm font-bold text-white">{college.shortName}</h4><p className="text-xs text-slate-400">Estd. {college.established}</p></div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">A premier institution committed to academic excellence, research, and innovation since {college.established}. NAAC A+ accredited and NBA-certified programs.</p>
          <div className="mt-4 flex gap-2">
            {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-slate-300 transition hover:bg-navy-700 hover:text-white"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="space-y-2.5">{quickLinks.map((link) => <li key={link.to}><Link to={link.to} className="text-sm text-slate-400 transition hover:text-white">{link.label}</Link></li>)}</ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Important Links</h4>
          <ul className="space-y-2.5">{importantLinks.map((link) => <li key={link.to}><Link to={link.to} className="text-sm text-slate-400 transition hover:text-white">{link.label}</Link></li>)}</ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-slate-400"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" /><span>{college.address}</span></li>
            <li className="flex items-center gap-3 text-sm text-slate-400"><Phone className="h-4 w-4 shrink-0 text-navy-400" /><span>{college.phone}</span></li>
            <li className="flex items-center gap-3 text-sm text-slate-400"><Mail className="h-4 w-4 shrink-0 text-navy-400" /><span>{college.email}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} {college.name}. All rights reserved.</p>
          <div className="flex gap-4"><a href="#" className="hover:text-slate-300">Privacy Policy</a><a href="#" className="hover:text-slate-300">Terms of Use</a><a href="#" className="hover:text-slate-300">Sitemap</a></div>
        </div>
      </div>
    </footer>
  );
}
