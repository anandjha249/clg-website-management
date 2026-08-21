import { useState } from 'react';
import { Building2, Globe, Palette, User, Lock, Save, Upload, Database, HardDrive, RefreshCw, Trash2 } from 'lucide-react';
import { college } from '@/data/college';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { getStorageMode, clearDemoData } from '@/lib/storage';
import { seedDemoData } from '@/lib/seed';

type Tab = 'college' | 'website' | 'theme' | 'profile' | 'password' | 'storage';

export function AdminSettingsPage() {
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>('college');

  const tabs: { key: Tab; label: string; icon: typeof Building2 }[] = [
    { key: 'college', label: 'College Info', icon: Building2 },
    { key: 'website', label: 'Website Settings', icon: Globe },
    { key: 'theme', label: 'Theme', icon: Palette },
    { key: 'profile', label: 'Admin Profile', icon: User },
    { key: 'password', label: 'Password', icon: Lock },
    { key: 'storage', label: 'Demo & Storage', icon: Database },
  ];

  const save = () => showToast('Settings saved successfully!', 'success');

  return (
    <div className="space-y-4">
      <div><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Settings</h2><p className="text-sm text-slate-500 dark:text-slate-400">Manage your college and system settings</p></div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="flex gap-2 overflow-x-auto scrollbar-thin lg:flex-col">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition whitespace-nowrap ${tab === t.key ? 'bg-navy-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}><t.icon className="h-4 w-4" /> {t.label}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {tab === 'college' && (
              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">College Information</h3>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-white"><Building2 className="h-10 w-10" /></div>
                  <div><Button variant="outline" size="sm" icon={<Upload className="h-4 w-4" />}>Upload Logo</Button><p className="mt-1 text-xs text-slate-400">PNG or SVG, max 1MB</p></div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><label className="label-base">College Name</label><input className="input-base" defaultValue={college.name} /></div>
                  <div><label className="label-base">Short Name</label><input className="input-base" defaultValue={college.shortName} /></div>
                  <div><label className="label-base">Tagline</label><input className="input-base" defaultValue={college.tagline} /></div>
                  <div><label className="label-base">Established Year</label><input className="input-base" defaultValue={college.established} /></div>
                  <div><label className="label-base">Phone</label><input className="input-base" defaultValue={college.phone} /></div>
                  <div><label className="label-base">Email</label><input className="input-base" defaultValue={college.email} /></div>
                  <div><label className="label-base">Admissions Email</label><input className="input-base" defaultValue={college.admissionsEmail} /></div>
                  <div className="sm:col-span-2"><label className="label-base">Address</label><textarea className="input-base" rows={2} defaultValue={college.address} /></div>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Social Media Links</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div><label className="label-base">Facebook</label><input className="input-base" defaultValue={college.social.facebook} /></div>
                    <div><label className="label-base">Twitter</label><input className="input-base" defaultValue={college.social.twitter} /></div>
                    <div><label className="label-base">Instagram</label><input className="input-base" defaultValue={college.social.instagram} /></div>
                    <div><label className="label-base">YouTube</label><input className="input-base" defaultValue={college.social.youtube} /></div>
                  </div>
                </div>
                <div className="flex justify-end"><Button variant="primary" icon={<Save className="h-4 w-4" />} onClick={save}>Save Changes</Button></div>
              </div>
            )}

            {tab === 'website' && (
              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">Website Settings</h3>
                <div><label className="label-base">Site Title</label><input className="input-base" defaultValue={college.name} /></div>
                <div><label className="label-base">Meta Description</label><textarea className="input-base" rows={2} defaultValue="A premier institution committed to academic excellence, research, and innovation." /></div>
                <div><label className="label-base">Footer Text</label><input className="input-base" defaultValue={`© ${new Date().getFullYear()} ${college.name}`} /></div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3"><input type="checkbox" defaultChecked className="rounded border-slate-300" /><span className="text-sm text-slate-700 dark:text-slate-200">Enable site search</span></label>
                  <label className="flex items-center gap-3"><input type="checkbox" defaultChecked className="rounded border-slate-300" /><span className="text-sm text-slate-700 dark:text-slate-200">Show admission banner</span></label>
                  <label className="flex items-center gap-3"><input type="checkbox" className="rounded border-slate-300" /><span className="text-sm text-slate-700 dark:text-slate-200">Maintenance mode</span></label>
                </div>
                <div className="flex justify-end"><Button variant="primary" icon={<Save className="h-4 w-4" />} onClick={save}>Save Changes</Button></div>
              </div>
            )}

            {tab === 'theme' && (
              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">Theme Settings</h3>
                <div><label className="label-base">Primary Color</label><div className="flex gap-3">{['#2f3fc7', '#1e40af', '#059669', '#dc2626', '#d97706'].map((color) => <button key={color} className="h-10 w-10 rounded-lg ring-2 ring-offset-2 ring-transparent hover:ring-slate-300" style={{ backgroundColor: color }} />)}</div></div>
                <div><label className="label-base">Accent Color</label><div className="flex gap-3">{['#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'].map((color) => <button key={color} className="h-10 w-10 rounded-lg ring-2 ring-offset-2 ring-transparent hover:ring-slate-300" style={{ backgroundColor: color }} />)}</div></div>
                <div><label className="label-base">Default Theme</label><select className="input-base"><option>Light</option><option>Dark</option><option>System</option></select></div>
                <div className="flex justify-end"><Button variant="primary" icon={<Save className="h-4 w-4" />} onClick={save}>Save Changes</Button></div>
              </div>
            )}

            {tab === 'profile' && (
              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">Admin Profile</h3>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-700 text-2xl font-bold text-white">A</div>
                  <div><Button variant="outline" size="sm" icon={<Upload className="h-4 w-4" />}>Change Photo</Button></div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><label className="label-base">Full Name</label><input className="input-base" defaultValue="Admin User" /></div>
                  <div><label className="label-base">Email</label><input className="input-base" defaultValue="admin@svit.ac.in" /></div>
                  <div><label className="label-base">Role</label><input className="input-base" defaultValue="Super Admin" disabled /></div>
                  <div><label className="label-base">Phone</label><input className="input-base" defaultValue="+91 877 224 5800" /></div>
                </div>
                <div className="flex justify-end"><Button variant="primary" icon={<Save className="h-4 w-4" />} onClick={save}>Save Changes</Button></div>
              </div>
            )}

            {tab === 'password' && (
              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">Change Password</h3>
                <div><label className="label-base">Current Password</label><input type="password" className="input-base" placeholder="••••••••" /></div>
                <div><label className="label-base">New Password</label><input type="password" className="input-base" placeholder="••••••••" /></div>
                <div><label className="label-base">Confirm New Password</label><input type="password" className="input-base" placeholder="••••••••" /></div>
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50"><p className="text-xs text-slate-500 dark:text-slate-400">Password must be at least 8 characters, include uppercase, lowercase, and a number.</p></div>
                <div className="flex justify-end"><Button variant="primary" icon={<Save className="h-4 w-4" />} onClick={save}>Update Password</Button></div>
              </div>
            )}

            {tab === 'storage' && (
              <div className="space-y-6">
                <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">Demo & Storage Settings</h3>
                <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${getStorageMode() === 'mongodb' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                      {getStorageMode() === 'mongodb' ? <Database className="h-5 w-5" /> : <HardDrive className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">Current Mode: {getStorageMode() === 'mongodb' ? 'MongoDB (Persistent)' : 'localStorage (Browser Demo)'}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{getStorageMode() === 'mongodb' ? 'Data is persisted in MongoDB Atlas via Vercel Functions.' : 'Data is stored in browser localStorage. Add MONGODB_URI in .env to enable MongoDB.'}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
                    <p className="text-xs font-mono text-slate-600 dark:text-slate-300">MONGODB_URI: {import.meta.env.VITE_MONGODB_URI ? '●●●●●●● (configured)' : 'not set — using localStorage fallback'}</p>
                    <p className="text-xs font-mono text-slate-600 dark:text-slate-300">VITE_USE_MONGODB: {String(import.meta.env.VITE_USE_MONGODB || 'false')}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Demo Data Controls</h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Manage demo data for presentations. All data is pre-loaded with realistic college datasets.</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Button variant="outline" icon={<RefreshCw className="h-4 w-4" />} onClick={() => { seedDemoData(); showToast('Demo data re-seeded to localStorage', 'success'); }}>Re-seed Demo Data</Button>
                    <Button variant="outline" icon={<Trash2 className="h-4 w-4" />} onClick={() => { if (confirm('Clear all localStorage demo data?')) { clearDemoData(); showToast('Local data cleared — reloading...', 'info'); } }}>Clear Local Data</Button>
                  </div>
                </div>

                <div className="rounded-xl bg-navy-50 p-4 dark:bg-navy-900/20">
                  <h4 className="text-sm font-semibold text-navy-700 dark:text-navy-300">How MongoDB fallback works</h4>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-slate-600 dark:text-slate-400">
                    <li>By default, the app uses <strong>localStorage</strong> with pre-seeded demo data — perfect for demos & Vercel preview without setup.</li>
                    <li>To enable MongoDB: set <code className="rounded bg-white px-1">MONGODB_URI</code> in Vercel env vars and <code className="rounded bg-white px-1">VITE_USE_MONGODB=true</code>.</li>
                    <li>When configured, Vercel serverless functions (<code>/api/*</code>) will store admissions, messages, notices in MongoDB. Client auto-detects and syncs.</li>
                    <li>If MongoDB is unreachable, the app gracefully falls back to localStorage — no errors for visitors.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
