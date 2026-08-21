import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Upload, FileText, ArrowRight, Download, Printer } from 'lucide-react';
import { courses } from '@/data/courses';
import { Breadcrumbs, Badge } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { getLocal, setLocal, isMongoEnabled } from '@/lib/storage';

const steps = ['Personal', 'Contact', 'Academic', 'Course', 'Documents', 'Review'];

export function AdmissionFormPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', gender: '', fatherName: '', motherName: '',
    email: '', phone: '', address: '', city: '', state: '', pincode: '',
    qualification: '', percentage10: '', percentage12: '', yearOfPassing: '', entranceExam: '', entranceRank: '',
    course: '',
    documents: [] as string[],
  });
  const { showToast } = useToast();

  const update = (key: string, value: string) => setFormData((prev) => ({ ...prev, [key]: value }));

  const next = () => { if (step < steps.length - 1) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const submit = async () => {
    const appId = `APP2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    const courseName = courses.find((c) => c.id === formData.course)?.name || formData.course;
    const newAdmission = {
      id: `a${Date.now()}`,
      applicationId: appId,
      studentName: `${formData.firstName} ${formData.lastName}`.trim() || 'New Applicant',
      email: formData.email,
      phone: formData.phone,
      courseId: formData.course,
      courseName,
      applicationDate: new Date().toISOString().slice(0, 10),
      status: 'Pending' as const,
      percentage10: Number(formData.percentage10) || 0,
      percentage12: Number(formData.percentage12) || 0,
      entranceRank: Number(formData.entranceRank) || 0,
      documents: ['10th Certificate', '12th Certificate', 'Transfer Certificate', 'Aadhaar Card'],
    };

    // Persist to localStorage fallback
    try {
      const existing = getLocal('admissions', [] as typeof newAdmission[]);
      setLocal('admissions', [...existing, newAdmission]);
      // Also try MongoDB if enabled
      if (isMongoEnabled()) {
        await fetch('/api/admissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAdmission) }).catch(() => {});
      }
    } catch (e) { console.warn('persist admission failed', e); }

    // store last app id for display
    sessionStorage.setItem('last_app_id', appId);
    setSubmitted(true);
    showToast(`Application ${appId} submitted successfully!`, 'success');
  };

  if (submitted) {
    const appId = sessionStorage.getItem('last_app_id') || `APP2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    return (
      <div>
        <section className="relative overflow-hidden bg-navy-900 py-16"><div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" /><div className="container-page relative"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Admissions', to: '/admissions' }, { label: 'Application Submitted' }]} /></div></section>
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl">
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20"><Check className="h-8 w-8 text-white" /></div>
                <h2 className="font-display text-2xl font-bold text-white">Application Submitted!</h2>
                <p className="mt-2 text-green-100">Your application has been received and is under review.</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"><p className="text-xs text-slate-400">Application ID</p><p className="mt-1 font-display text-lg font-bold text-navy-700 dark:text-navy-300">{appId}</p></div>
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"><p className="text-xs text-slate-400">Submitted Date</p><p className="mt-1 font-display text-lg font-bold text-slate-800 dark:text-white">{new Date().toLocaleDateString('en-IN')}</p></div>
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"><p className="text-xs text-slate-400">Applicant Name</p><p className="mt-1 font-semibold text-slate-800 dark:text-white">{formData.firstName} {formData.lastName}</p></div>
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"><p className="text-xs text-slate-400">Status</p><div className="mt-1"><Badge variant="warning">Pending Review</Badge></div></div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button variant="primary" fullWidth icon={<Download className="h-5 w-5" />}>Download Application</Button>
                  <Button variant="outline" fullWidth icon={<Printer className="h-5 w-5" />}>Print Application</Button>
                </div>
                <div className="mt-4 text-center"><p className="text-sm text-slate-500 dark:text-slate-400">Save your Application ID to check status later.</p><Button to="/admissions/status" variant="ghost" size="sm" className="mt-2" iconRight={<ArrowRight className="h-4 w-4" />}>Check Status</Button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16"><div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" /><div className="container-page relative"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Admissions', to: '/admissions' }, { label: 'Online Application' }]} /><h1 className="mt-4 font-display text-4xl font-bold text-white">Online Admission Form</h1><p className="mt-3 text-slate-300">Complete all steps to submit your application.</p></div></section>

      <div className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          {/* Stepper */}
          <div className="mb-8 flex items-center justify-between">
            {steps.map((label, i) => (
              <div key={label} className="flex flex-1 items-center">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-navy-700 text-white' : 'bg-slate-200 text-slate-400 dark:bg-slate-700'}`}>
                  {i < step ? <Check className="h-5 w-5" /> : i + 1}
                </div>
                <span className={`ml-2 hidden text-xs font-medium sm:block ${i <= step ? 'text-navy-700 dark:text-navy-300' : 'text-slate-400'}`}>{label}</span>
                {i < steps.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${i < step ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`} />}
              </div>
            ))}
          </div>

          <div className="card p-6">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">Personal Information</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><label className="label-base">First Name *</label><input className="input-base" value={formData.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="Enter first name" /></div>
                  <div><label className="label-base">Last Name *</label><input className="input-base" value={formData.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Enter last name" /></div>
                  <div><label className="label-base">Date of Birth *</label><input type="date" className="input-base" value={formData.dob} onChange={(e) => update('dob', e.target.value)} /></div>
                  <div><label className="label-base">Gender *</label><select className="input-base" value={formData.gender} onChange={(e) => update('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                  <div><label className="label-base">Father's Name *</label><input className="input-base" value={formData.fatherName} onChange={(e) => update('fatherName', e.target.value)} placeholder="Father's name" /></div>
                  <div><label className="label-base">Mother's Name *</label><input className="input-base" value={formData.motherName} onChange={(e) => update('motherName', e.target.value)} placeholder="Mother's name" /></div>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">Contact Information</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><label className="label-base">Email *</label><input type="email" className="input-base" value={formData.email} onChange={(e) => update('email', e.target.value)} placeholder="email@example.com" /></div>
                  <div><label className="label-base">Phone *</label><input className="input-base" value={formData.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91" /></div>
                  <div className="sm:col-span-2"><label className="label-base">Address *</label><textarea className="input-base" rows={2} value={formData.address} onChange={(e) => update('address', e.target.value)} placeholder="Full address" /></div>
                  <div><label className="label-base">City *</label><input className="input-base" value={formData.city} onChange={(e) => update('city', e.target.value)} placeholder="City" /></div>
                  <div><label className="label-base">State *</label><input className="input-base" value={formData.state} onChange={(e) => update('state', e.target.value)} placeholder="State" /></div>
                  <div><label className="label-base">Pincode *</label><input className="input-base" value={formData.pincode} onChange={(e) => update('pincode', e.target.value)} placeholder="Pincode" /></div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">Academic Information</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><label className="label-base">Qualification *</label><select className="input-base" value={formData.qualification} onChange={(e) => update('qualification', e.target.value)}><option value="">Select</option><option>10+2 (Intermediate)</option><option>Bachelor's Degree</option><option>Master's Degree</option></select></div>
                  <div><label className="label-base">Year of Passing *</label><input className="input-base" value={formData.yearOfPassing} onChange={(e) => update('yearOfPassing', e.target.value)} placeholder="2025" /></div>
                  <div><label className="label-base">10th Percentage *</label><input className="input-base" value={formData.percentage10} onChange={(e) => update('percentage10', e.target.value)} placeholder="92" /></div>
                  <div><label className="label-base">12th Percentage *</label><input className="input-base" value={formData.percentage12} onChange={(e) => update('percentage12', e.target.value)} placeholder="88" /></div>
                  <div><label className="label-base">Entrance Exam *</label><select className="input-base" value={formData.entranceExam} onChange={(e) => update('entranceExam', e.target.value)}><option value="">Select</option><option>AP EAPCET</option><option>JEE Main</option><option>GATE</option><option>ICET</option><option>CAT/MAT</option></select></div>
                  <div><label className="label-base">Entrance Rank *</label><input className="input-base" value={formData.entranceRank} onChange={(e) => update('entranceRank', e.target.value)} placeholder="1245" /></div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">Course Selection</h2>
                <div><label className="label-base">Select Course *</label><select className="input-base" value={formData.course} onChange={(e) => update('course', e.target.value)}><option value="">Select a course</option>{courses.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.seats} seats)</option>)}</select></div>
                {formData.course && <div className="rounded-xl bg-navy-50 p-4 dark:bg-navy-900/30"><p className="text-sm text-slate-600 dark:text-slate-300">Selected: <span className="font-semibold text-navy-700 dark:text-navy-300">{courses.find((c) => c.id === formData.course)?.name}</span></p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Duration: {courses.find((c) => c.id === formData.course)?.duration} • Fee: ₹{courses.find((c) => c.id === formData.course)?.feePerYear.toLocaleString('en-IN')}/yr</p></div>}
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">Document Upload</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Upload the following documents (PDF, JPG, PNG — max 5MB each)</p>
                {['10th Certificate', '12th Certificate', 'Transfer Certificate', 'Aadhaar Card', 'Passport Photo'].map((doc) => (
                  <div key={doc} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                    <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-navy-500" /><span className="text-sm font-medium text-slate-700 dark:text-slate-200">{doc}</span></div>
                    <label className="cursor-pointer rounded-lg bg-navy-50 px-4 py-2 text-sm font-semibold text-navy-700 transition hover:bg-navy-100 dark:bg-navy-900/30 dark:text-navy-300 dark:hover:bg-navy-900/50"><Upload className="mr-1.5 inline h-4 w-4" /> Upload</label>
                  </div>
                ))}
              </div>
            )}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">Review & Submit</h2>
                <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-700/50">
                  <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div><dt className="text-xs text-slate-400">Name</dt><dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{formData.firstName} {formData.lastName}</dd></div>
                    <div><dt className="text-xs text-slate-400">Email</dt><dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{formData.email}</dd></div>
                    <div><dt className="text-xs text-slate-400">Phone</dt><dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{formData.phone}</dd></div>
                    <div><dt className="text-xs text-slate-400">Date of Birth</dt><dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{formData.dob}</dd></div>
                    <div><dt className="text-xs text-slate-400">Address</dt><dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{formData.address}, {formData.city}, {formData.state}</dd></div>
                    <div><dt className="text-xs text-slate-400">Qualification</dt><dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{formData.qualification}</dd></div>
                    <div><dt className="text-xs text-slate-400">12th %</dt><dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{formData.percentage12}%</dd></div>
                    <div><dt className="text-xs text-slate-400">Entrance Rank</dt><dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{formData.entranceExam} — {formData.entranceRank}</dd></div>
                    <div><dt className="text-xs text-slate-400">Course</dt><dd className="text-sm font-medium text-slate-700 dark:text-slate-200">{courses.find((c) => c.id === formData.course)?.name || 'Not selected'}</dd></div>
                  </dl>
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><input type="checkbox" className="rounded border-slate-300" /> I declare that all information provided is true and correct.</label>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button variant="outline" onClick={prev} disabled={step === 0} icon={<ChevronLeft className="h-4 w-4" />}>Previous</Button>
              {step < steps.length - 1 ? <Button variant="primary" onClick={next} iconRight={<ChevronRight className="h-4 w-4" />}>Next</Button> : <Button variant="primary" onClick={submit} icon={<Check className="h-4 w-4" />}>Submit Application</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
