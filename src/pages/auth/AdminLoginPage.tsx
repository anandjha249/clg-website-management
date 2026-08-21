import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, User } from 'lucide-react';
import { college } from '@/data/college';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { showToast('Please enter email and password', 'warning'); return; }
    showToast('Admin login successful! Redirecting...', 'success');
    setTimeout(() => navigate('/admin'), 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20"><Shield className="h-8 w-8" /></div>
            <div><h1 className="font-display text-xl font-bold text-white">{college.shortName} Admin</h1><p className="text-xs text-navy-200">{college.tagline}</p></div>
          </Link>
        </div>

        <div className="card p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><Shield className="h-7 w-7" /></div>
            <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Admin Portal</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Sign in to access the admin dashboard</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label-base">Admin Email</label>
              <div className="relative"><Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input className="input-base pl-12" placeholder="admin@svit.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            </div>
            <div>
              <label className="label-base">Password</label>
              <div className="relative"><Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input type={showPassword ? 'text' : 'password'} className="input-base pl-12 pr-12" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
            </div>
            <Button type="submit" variant="primary" fullWidth size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>Sign In to Dashboard</Button>
          </form>

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50">
            <User className="h-4 w-4 text-slate-400" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Demo: Use any email and password to access the dashboard.</p>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400"><Link to="/login" className="font-medium text-navy-600 hover:underline dark:text-navy-400">← Back to Student Login</Link></p>
        </div>
      </div>
    </div>
  );
}
