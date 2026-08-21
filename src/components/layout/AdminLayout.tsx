import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, Sun, Moon, Bell, ChevronDown, Search, Home, Info, Building2, Users, BookOpen, Bell as BellIcon, Calendar, Image, ClipboardList, FileText, Trophy, FolderOpen, Settings, MessageSquare, LogOut, User, Shield } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { college } from '@/data/college';

const navGroups = [
  { label: '', items: [{ label: 'Dashboard', to: '/admin', icon: Home }] },
  { label: 'CONTENT', items: [
    { label: 'Home Page', to: '/admin/home', icon: Home },
    { label: 'About Us', to: '/admin/about', icon: Info },
    { label: 'Departments', to: '/admin/departments', icon: Building2 },
    { label: 'Faculty', to: '/admin/faculty', icon: Users },
    { label: 'Courses', to: '/admin/courses', icon: BookOpen },
    { label: 'Notices', to: '/admin/notices', icon: BellIcon },
    { label: 'Events', to: '/admin/events', icon: Calendar },
    { label: 'Gallery', to: '/admin/gallery', icon: Image },
  ]},
  { label: 'STUDENTS', items: [
    { label: 'Students', to: '/admin/students', icon: GraduationCap },
    { label: 'Admissions', to: '/admin/admissions', icon: ClipboardList },
    { label: 'Results', to: '/admin/results', icon: Trophy },
    { label: 'Study Materials', to: '/admin/study-materials', icon: FolderOpen },
  ]},
  { label: 'SYSTEM', items: [
    { label: 'Users', to: '/admin/users', icon: Shield },
    { label: 'Messages', to: '/admin/messages', icon: MessageSquare },
    { label: 'Settings', to: '/admin/settings', icon: Settings },
  ]},
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const currentPath = location.pathname;
  const pageTitle = navGroups.flatMap((g) => g.items).find((item) => item.to === currentPath)?.label || 'Dashboard';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 ${collapsed ? 'w-20' : 'w-64'} ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-700">
          <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-white"><GraduationCap className="h-5 w-5" /></div>
            {!collapsed && <div className="overflow-hidden"><h1 className="font-display text-sm font-bold text-navy-900 dark:text-white truncate">{college.shortName}</h1><p className="text-[10px] text-slate-500">Admin Panel</p></div>}
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-700"><X className="h-5 w-5" /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          {navGroups.map((group, gi) => (
            <div key={gi} className="mb-4">
              {group.label && !collapsed && <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{group.label}</p>}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink key={item.to} to={item.to} end={item.to === '/admin'} className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-navy-700 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'} ${collapsed ? 'justify-center' : ''}`
                  } title={collapsed ? item.label : undefined}>
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-slate-200 p-3 dark:border-slate-700">
          <button onClick={() => setCollapsed(!collapsed)} className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
            {collapsed ? <Menu className="h-4 w-4" /> : <><X className="h-4 w-4" /> Collapse</>}
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className={`flex flex-1 flex-col overflow-hidden ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-700"><Menu className="h-5 w-5" /></button>
            <h1 className="font-display text-lg font-bold text-slate-800 dark:text-white">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="w-48 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-navy-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700" placeholder="Search..." /></div></div>
            <button onClick={toggleTheme} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">{theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</button>
            <button className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"><Bell className="h-5 w-5" /><span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" /></button>

            {/* Profile */}
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-700 text-sm font-bold text-white">A</div>
                <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:block">Admin</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-card animate-scale-in dark:border-slate-700 dark:bg-slate-800">
                  <div className="border-b border-slate-100 px-4 py-2 dark:border-slate-700"><p className="text-sm font-semibold text-slate-800 dark:text-white">Admin User</p><p className="text-xs text-slate-400">admin@svit.ac.in</p></div>
                  <Link to="/admin/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"><User className="h-4 w-4" /> Profile</Link>
                  <Link to="/admin/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"><Settings className="h-4 w-4" /> Settings</Link>
                  <Link to="/" className="flex items-center gap-2 border-t border-slate-100 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-900/20"><LogOut className="h-4 w-4" /> Logout</Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
