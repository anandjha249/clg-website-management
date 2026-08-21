import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, GraduationCap, Phone, Mail } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { college } from '@/data/college';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Departments', to: '/departments' },
  { label: 'Courses', to: '/courses' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Notices', to: '/notices' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Student Corner', to: '/student-corner' },
  { label: 'Contact', to: '/contact' },
];

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="hidden bg-navy-900 text-navy-100 lg:block">
        <div className="container-page flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-4">
            <a href={`tel:${college.phone}`} className="flex items-center gap-1.5 hover:text-white"><Phone className="h-3.5 w-3.5" /> {college.phone}</a>
            <a href={`mailto:${college.email}`} className="flex items-center gap-1.5 hover:text-white"><Mail className="h-3.5 w-3.5" /> {college.email}</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-navy-300">Admissions 2026-27 Now Open!</span>
            <Link to="/admissions" className="font-semibold text-gold-400 hover:text-gold-300">Apply Now</Link>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-soft backdrop-blur-md dark:bg-slate-900/95' : 'bg-white dark:bg-slate-900'}`}>
        <div className="container-page">
          <div className="flex items-center justify-between gap-4 py-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-display text-base font-bold leading-tight text-navy-900 dark:text-white sm:text-lg">{college.shortName}</h1>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs">{college.tagline}</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-0.5 xl:flex">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-navy-50 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300' : 'text-slate-600 hover:bg-slate-50 hover:text-navy-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-navy-300'}`
                }>{link.label}</NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"><Search className="h-5 w-5" /></button>
              <button onClick={toggleTheme} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">{theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</button>
              <div className="hidden items-center gap-2 sm:flex">
                <Link to="/login" className="rounded-xl border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 transition hover:bg-navy-50 dark:border-navy-700 dark:text-navy-300 dark:hover:bg-navy-900/30">Student Login</Link>
                <Link to="/admin/login" className="rounded-xl bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800">Admin Login</Link>
              </div>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 xl:hidden dark:text-slate-300 dark:hover:bg-slate-800">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
            </div>
          </div>

          {searchOpen && (
            <div className="border-t border-slate-200 py-3 dark:border-slate-700">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input autoFocus type="text" placeholder="Search courses, departments, notices..." className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 dark:border-slate-600 dark:bg-slate-800" />
              </div>
            </div>
          )}
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white xl:hidden dark:border-slate-700 dark:bg-slate-900">
            <nav className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) =>
                  `rounded-lg px-4 py-2.5 text-sm font-medium ${isActive ? 'bg-navy-50 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`
                }>{link.label}</NavLink>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Link to="/login" className="rounded-xl border border-navy-200 px-4 py-2.5 text-center text-sm font-semibold text-navy-700 dark:border-navy-700 dark:text-navy-300">Student Login</Link>
                <Link to="/admin/login" className="rounded-xl bg-navy-700 px-4 py-2.5 text-center text-sm font-semibold text-white">Admin Login</Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
