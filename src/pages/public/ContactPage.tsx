import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { college } from '@/data/college';
import { departmentContacts as deptContacts } from '@/data/students';
import { Breadcrumbs } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const { showToast } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { showToast('Please fill all required fields', 'warning'); return; }
    showToast('Message sent successfully! We will get back to you soon.', 'success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Get in touch with us — we are here to help with admissions, enquiries, and more.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Get in Touch</h2>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><MapPin className="h-5 w-5" /></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Address</p><p className="text-sm text-slate-500 dark:text-slate-400">{college.address}</p></div></div>
                  <div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300"><Phone className="h-5 w-5" /></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Phone</p><p className="text-sm text-slate-500 dark:text-slate-400">{college.phone}</p><p className="text-sm text-slate-500 dark:text-slate-400">{college.altPhone}</p></div></div>
                  <div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><Mail className="h-5 w-5" /></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</p><p className="text-sm text-slate-500 dark:text-slate-400">{college.email}</p><p className="text-sm text-slate-500 dark:text-slate-400">{college.admissionsEmail}</p></div></div>
                  <div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300"><Clock className="h-5 w-5" /></div><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">Office Hours</p><p className="text-sm text-slate-500 dark:text-slate-400">Monday - Saturday: 9:00 AM - 5:00 PM</p><p className="text-sm text-slate-500 dark:text-slate-400">Sunday: Closed</p></div></div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="card overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-navy-100 to-navy-200 dark:from-navy-900/30 dark:to-navy-800/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-12 w-12 text-navy-500" />
                      <p className="mt-2 text-sm font-medium text-navy-700 dark:text-navy-300">SVIT Campus, Tirupati</p>
                      <p className="text-xs text-slate-500">Andhra Pradesh — 517502</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(30, 43, 125, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 43, 125, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Send a Message</h2>
              <form onSubmit={submit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><label className="label-base">Name *</label><input className="input-base" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></div>
                  <div><label className="label-base">Email *</label><input type="email" className="input-base" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></div>
                  <div><label className="label-base">Phone</label><input className="input-base" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91" /></div>
                  <div><label className="label-base">Subject</label><input className="input-base" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" /></div>
                </div>
                <div><label className="label-base">Message *</label><textarea className="input-base" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message..." /></div>
                <Button type="submit" variant="primary" fullWidth size="lg" icon={<Send className="h-4 w-4" />}>Send Message</Button>
              </form>
            </div>
          </div>

          {/* Department contacts */}
          <div className="mt-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-slate-800 dark:text-white">Department Contacts</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {deptContacts.map((dept) => (
                <div key={dept.department} className="card p-5">
                  <h3 className="font-semibold text-slate-800 dark:text-white">{dept.department}</h3>
                  <div className="mt-3 space-y-2">
                    <a href={`mailto:${dept.email}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-navy-600 dark:text-slate-400"><Mail className="h-4 w-4" /> {dept.email}</a>
                    <a href={`tel:${dept.phone}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-navy-600 dark:text-slate-400"><Phone className="h-4 w-4" /> {dept.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
