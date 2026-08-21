import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, UserCog, Shield } from 'lucide-react';
import { college } from '@/data/college';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export function LoginPage() {
  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { showToast('Please enter email and password', 'warning'); return; }
    showToast('Login successful! Redirecting...', 'success');
    setTimeout(() => navigate(role === 'admin' ? '/admin' : '/student-corner'), 800);
  };

  const roles = [
    { key: 'student' as const, label: 'Student', icon: GraduationCap },
    { key: 'faculty' as const, label: 'Faculty', icon: UserCog },
    { key: 'admin' as const, label: 'Admin', icon: Shield },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="relative hidden w-1/2 lg:block">
        <img src="https://images.pexels.com/photos/35314982/pexels-photo-35314982.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Campus" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 to-navy-900/80" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white"><GraduationCap className="h-6 w-6" /></div>
            <div><h1 className="font-display text-lg font-bold text-white">{college.shortName}</h1><p className="text-xs text-navy-200">{college.tagline}</p></div>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-white">Welcome Back to Your<br /><span className="text-gold-400">Academic Portal</span></h2>
            <p className="mt-4 max-w-md text-slate-300">Access your courses, results, study materials, and more — all in one place. Sign in to continue your academic journey with SVIT.</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[['25+', 'Years'], ['30+', 'Courses'], ['5000+', 'Students']].map(([val, label]) => (
                <div key={label}><p className="font-display text-2xl font-bold text-white">{val}</p><p className="text-xs text-slate-400">{label}</p></div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} {college.name}</p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex w-full items-center justify-center bg-slate-50 p-6 dark:bg-slate-900 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-white"><GraduationCap className="h-6 w-6" /></div>
              <div><h1 className="font-display text-lg font-bold text-navy-900 dark:text-white">{college.shortName}</h1><p className="text-xs text-slate-500">{college.tagline}</p></div>
            </Link>
          </div>

          <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Sign In</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Select your role and enter your credentials</p>

          {/* Role tabs */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <button key={r.key} onClick={() => setRole(r.key)} className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition ${role === r.key ? 'border-navy-500 bg-navy-50 dark:bg-navy-900/30' : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'}`}>
                <r.icon className={`h-5 w-5 ${role === r.key ? 'text-navy-600 dark:text-navy-300' : 'text-slate-400'}`} />
                <span className={`text-xs font-semibold ${role === r.key ? 'text-navy-700 dark:text-navy-300' : 'text-slate-500'}`}>{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label-base">Email or Username</label>
              <div className="relative"><Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input className="input-base pl-12" placeholder="email@svit.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            </div>
            <div>
              <label className="label-base">Password</label>
              <div className="relative"><Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input type={showPassword ? 'text' : 'password'} className="input-base pl-12 pr-12" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-slate-300" /> Remember me</label>
              <a href="#" className="text-sm font-medium text-navy-600 hover:underline dark:text-navy-400">Forgot password?</a>
            </div>
            <Button type="submit" variant="primary" fullWidth size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>Sign In as {roles.find((r) => r.key === role)?.label}</Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">Don't have an account? <Link to="/admissions" className="font-semibold text-navy-600 hover:underline dark:text-navy-400">Apply for Admission</Link></p>
        </div>
      </div>
    </div>
  );
}
