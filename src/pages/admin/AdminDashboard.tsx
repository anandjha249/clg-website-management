import { Users, BookOpen, ClipboardList, Bell, Calendar, GraduationCap, TrendingUp, ArrowUpRight, ArrowDownRight, Mail } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { admissions, contactMessages } from '@/data/students';
import { notices } from '@/data/notices';
import { getUpcomingEvents } from '@/data/events';
import { departments } from '@/data/departments';
import { Badge } from '@/components/ui/index';
import { Link } from 'react-router-dom';

const enrollmentData = [
  { year: '2020', students: 3200 }, { year: '2021', students: 3800 }, { year: '2022', students: 4200 },
  { year: '2023', students: 4600 }, { year: '2024', students: 4900 }, { year: '2025', students: 5100 },
];

const admissionsByCourse = [
  { name: 'B.Tech CSE', students: 180, fill: '#2f3fc7' },
  { name: 'B.Tech ECE', students: 120, fill: '#f59e0b' },
  { name: 'B.Tech Mech', students: 120, fill: '#3d54e5' },
  { name: 'B.Tech Civil', students: 90, fill: '#2835a2' },
  { name: 'B.Tech EEE', students: 90, fill: '#d97706' },
  { name: 'MBA', students: 60, fill: '#b45309' },
];

const studentsByDept = departments.map((d) => ({ name: d.shortName, students: d.students }));

const visitorData = [
  { month: 'Jan', visitors: 3200 }, { month: 'Feb', visitors: 4100 }, { month: 'Mar', visitors: 3800 },
  { month: 'Apr', visitors: 5200 }, { month: 'May', visitors: 6100 }, { month: 'Jun', visitors: 4800 },
  { month: 'Jul', visitors: 7200 }, { month: 'Aug', visitors: 8900 }, { month: 'Sep', visitors: 7600 },
  { month: 'Oct', visitors: 8200 }, { month: 'Nov', visitors: 9100 },
];

const stats = [
  { label: 'Total Students', value: '5,100', change: '+12%', trend: 'up', icon: GraduationCap, color: 'navy' },
  { label: 'Total Faculty', value: '112', change: '+3%', trend: 'up', icon: Users, color: 'gold' },
  { label: 'Total Courses', value: '30', change: '+2', trend: 'up', icon: BookOpen, color: 'navy' },
  { label: 'Pending Admissions', value: '24', change: '+8', trend: 'up', icon: ClipboardList, color: 'gold' },
  { label: 'Published Notices', value: '12', change: '+4', trend: 'up', icon: Bell, color: 'navy' },
  { label: 'Upcoming Events', value: '6', change: '+2', trend: 'up', icon: Calendar, color: 'gold' },
];

const recentAdmissions = admissions.slice(0, 4);
const recentNotices = notices.slice(0, 4);
const upcomingEvents = getUpcomingEvents().slice(0, 3);
const recentMessages = contactMessages.slice(0, 3);

const statusVariant = (status: string) => status === 'Approved' ? 'success' : status === 'Rejected' ? 'error' : status === 'Under Review' ? 'info' : 'warning';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-4">
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color === 'navy' ? 'bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300' : 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300'}`}><stat.icon className="h-5 w-5" /></div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{stat.change}</span>
            </div>
            <p className="mt-3 font-display text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div><h3 className="font-semibold text-slate-800 dark:text-white">Student Enrollment Over Time</h3><p className="text-xs text-slate-400">Total enrolled students per year</p></div>
            <TrendingUp className="h-5 w-5 text-navy-500" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Line type="monotone" dataKey="students" stroke="#2f3fc7" strokeWidth={3} dot={{ fill: '#2f3fc7', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div><h3 className="font-semibold text-slate-800 dark:text-white">Admissions by Course</h3><p className="text-xs text-slate-400">Student intake per program</p></div>
            <BookOpen className="h-5 w-5 text-gold-500" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={admissionsByCourse}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Bar dataKey="students" radius={[8, 8, 0, 0]}>
                {admissionsByCourse.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-4"><h3 className="font-semibold text-slate-800 dark:text-white">Students by Department</h3><p className="text-xs text-slate-400">Distribution across departments</p></div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={studentsByDept} dataKey="students" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(entry: { name: string; students: number }) => `${entry.name}: ${entry.students}`}>
                {studentsByDept.map((_, i) => <Cell key={i} fill={['#2f3fc7', '#f59e0b', '#3d54e5', '#d97706', '#2835a2', '#b45309', '#5b78f1'][i % 7]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <div className="mb-4"><h3 className="font-semibold text-slate-800 dark:text-white">Website Visitors</h3><p className="text-xs text-slate-400">Monthly unique visitors (2025)</p></div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Bar dataKey="visitors" fill="#2f3fc7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent admissions */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-slate-800 dark:text-white">Recent Admissions</h3><Link to="/admin/admissions" className="text-xs font-medium text-navy-600 hover:underline dark:text-navy-400">View all</Link></div>
          <div className="space-y-3">
            {recentAdmissions.map((adm) => (
              <div key={adm.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-100 text-sm font-bold text-navy-700 dark:bg-navy-900/30 dark:text-navy-300">{adm.studentName.charAt(0)}</div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{adm.studentName}</p><p className="text-xs text-slate-400">{adm.courseName}</p></div>
                <Badge variant={statusVariant(adm.status)}>{adm.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent notices */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-slate-800 dark:text-white">Recent Notices</h3><Link to="/admin/notices" className="text-xs font-medium text-navy-600 hover:underline dark:text-navy-400">View all</Link></div>
          <div className="space-y-3">
            {recentNotices.map((notice) => (
              <div key={notice.id} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-lg bg-navy-50 text-navy-600 dark:bg-navy-900/30 dark:text-navy-300"><span className="text-[9px] font-bold">{new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}</span><span className="text-xs font-bold leading-none">{new Date(notice.date).getDate()}</span></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{notice.title}</p><p className="text-xs text-slate-400">{notice.category}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-slate-800 dark:text-white">Recent Messages</h3><Link to="/admin/messages" className="text-xs font-medium text-navy-600 hover:underline dark:text-navy-400">View all</Link></div>
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-sm font-bold text-gold-700 dark:bg-gold-900/30 dark:text-gold-300"><Mail className="h-4 w-4" /></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{msg.subject}</p><p className="text-xs text-slate-400">{msg.name} • {msg.status}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming events */}
      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-slate-800 dark:text-white">Upcoming Events</h3><Link to="/admin/events" className="text-xs font-medium text-navy-600 hover:underline dark:text-navy-400">View all</Link></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <img src={event.image} alt={event.title} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{event.title}</p><p className="text-xs text-slate-400">{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p><p className="text-xs text-slate-400 truncate">{event.location}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
