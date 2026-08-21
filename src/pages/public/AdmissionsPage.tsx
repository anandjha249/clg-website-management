import { Calendar, CheckCircle2, FileText, IndianRupee, ClipboardList, ArrowRight, HelpCircle } from 'lucide-react';
import { importantDates, requiredDocuments, admissionFaqs } from '@/data/students';
import { courses } from '@/data/courses';
import { Breadcrumbs, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export function AdmissionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Admissions' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Admissions Portal</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Your gateway to joining SVIT. Applications for the 2026-27 academic session are now open.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          {/* Status banner */}
          <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-green-50 to-navy-50 p-6 dark:from-green-900/20 dark:to-navy-900/20 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"><CheckCircle2 className="h-7 w-7" /></div>
              <div><h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">Admissions Open for 2026-27</h2><p className="text-sm text-slate-500 dark:text-slate-400">Early bird applications close on January 15, 2026</p></div>
            </div>
            <Button to="/admissions/apply" variant="primary" size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>Apply Online</Button>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Important dates */}
              <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Important Dates</h2><div className="mt-4 space-y-3">{importantDates.map((item, i) => <div key={i} className="flex items-center gap-4"><div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.status === 'done' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-navy-100 text-navy-600 dark:bg-navy-900/30 dark:text-navy-400'}`}>{item.status === 'done' ? <CheckCircle2 className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}</div><div className="flex-1"><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.event}</p><p className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>{item.status === 'done' && <Badge variant="success">Done</Badge>}</div>)}</div></div>

              {/* Required documents */}
              <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Required Documents</h2><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">{requiredDocuments.map((doc) => <div key={doc} className="flex items-center gap-2"><FileText className="h-4 w-4 text-navy-500" /><span className="text-sm text-slate-700 dark:text-slate-200">{doc}</span></div>)}</div></div>

              {/* FAQs */}
              <div className="card p-6"><h2 className="font-display text-xl font-bold text-slate-800 dark:text-white">Frequently Asked Questions</h2><div className="mt-4 space-y-2">{admissionFaqs.map((faq, i) => <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-4 text-left"><span className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200"><HelpCircle className="h-5 w-5 text-navy-500" /> {faq.question}</span><span className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▾</span></button>{openFaq === i && <div className="px-4 pb-4 text-sm text-slate-500 dark:text-slate-400">{faq.answer}</div>}</div>)}</div></div>
            </div>

            <div className="space-y-6">
              {/* Fee info */}
              <div className="card p-6"><h3 className="font-semibold text-slate-800 dark:text-white">Fee Information</h3><div className="mt-4 space-y-3">{courses.slice(0, 4).map((course) => <div key={course.id} className="flex items-center justify-between"><span className="text-sm text-slate-500 dark:text-slate-400">{course.degree}</span><span className="flex items-center gap-1 text-sm font-semibold text-slate-800 dark:text-white"><IndianRupee className="h-4 w-4" />{course.feePerYear.toLocaleString('en-IN')}/yr</span></div>)}</div></div>

              {/* Admission procedure */}
              <div className="card p-6"><h3 className="font-semibold text-slate-800 dark:text-white">Admission Procedure</h3><ol className="mt-4 space-y-3">{['Fill online application form', 'Pay application fee online', 'Upload required documents', 'Document verification', 'Counselling & seat allotment', 'Fee payment & admission confirmation'].map((step, i) => <li key={i} className="flex items-start gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-white">{i + 1}</span><span className="text-sm text-slate-700 dark:text-slate-200">{step}</span></li>)}</ol></div>

              {/* Status check */}
              <div className="card p-6"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300"><ClipboardList className="h-5 w-5" /></div><h3 className="font-semibold text-slate-800 dark:text-white">Check Application Status</h3></div><p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Already applied? Track your application status.</p><Button to="/admissions/status" variant="outline" fullWidth className="mt-4">Check Status</Button></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
