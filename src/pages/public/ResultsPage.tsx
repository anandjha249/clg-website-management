import { useState } from 'react';
import { Search, Trophy, Award, Download } from 'lucide-react';
import { results, type Result } from '@/data/students';
import { Breadcrumbs, Badge, EmptyState } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export function ResultsPage() {
  const [rollNumber, setRollNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [searched, setSearched] = useState(false);
  const { showToast } = useToast();

  const checkResult = () => {
    if (!rollNumber.trim()) { showToast('Please enter your Roll Number', 'warning'); return; }
    const found = results[rollNumber.trim().toUpperCase()];
    setResult(found || null);
    setSearched(true);
    if (found) showToast('Result found!', 'success');
    else showToast('Result not found', 'error');
  };

  const gradeColor = (grade: string) => grade === 'O' ? 'success' : grade === 'A+' ? 'navy' : 'info';

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Student Corner', to: '/student-corner' }, { label: 'Results' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Examination Results</h1>
          <p className="mt-3 text-slate-300">Check your semester examination results online.</p>
        </div>
      </section>

      <div className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          <div className="card p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="label-base">Roll Number</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input className="input-base pl-12" placeholder="e.g. SVIT21CSE001" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkResult()} />
                </div>
              </div>
              <div>
                <label className="label-base">Semester</label>
                <select className="input-base" value={semester} onChange={(e) => setSemester(e.target.value)}>
                  <option value="">All</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4"><Button variant="primary" onClick={checkResult} icon={<Trophy className="h-4 w-4" />}>Check Result</Button></div>
            <p className="mt-3 text-xs text-slate-400">Try: SVIT21CSE001 or SVIT21CSE002</p>
          </div>

          {searched && result && (
            <div className="mt-6 card overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-700/50">
                <div><h2 className="font-display text-lg font-bold text-slate-800 dark:text-white">{result.name}</h2><p className="text-sm text-slate-500 dark:text-slate-400">{result.rollNumber} • {result.course} • Semester {result.semester}</p></div>
                <div className="text-right"><Badge variant={result.result === 'Pass' ? 'success' : 'error'}>{result.result}</Badge><p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">SGPA: {result.sgpa} • CGPA: {result.cgpa}</p></div>
              </div>
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full">
                  <thead><tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">Subject</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-slate-500">Code</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-slate-500">Credits</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-slate-500">Internal</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-slate-500">External</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-slate-500">Total</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-slate-500">Grade</th>
                  </tr></thead>
                  <tbody>
                    {result.subjects.map((sub) => (
                      <tr key={sub.code} className="border-b border-slate-100 last:border-0 dark:border-slate-700">
                        <td className="px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">{sub.subject}</td>
                        <td className="px-6 py-3 text-center text-sm text-slate-500 dark:text-slate-400">{sub.code}</td>
                        <td className="px-6 py-3 text-center text-sm text-slate-500 dark:text-slate-400">{sub.credits}</td>
                        <td className="px-6 py-3 text-center text-sm text-slate-500 dark:text-slate-400">{sub.internalMarks}</td>
                        <td className="px-6 py-3 text-center text-sm text-slate-500 dark:text-slate-400">{sub.externalMarks}</td>
                        <td className="px-6 py-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">{sub.total}</td>
                        <td className="px-6 py-3 text-center"><Badge variant={gradeColor(sub.grade)}>{sub.grade}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2"><Award className="h-5 w-5 text-gold-500" /><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Overall: {result.result} with CGPA {result.cgpa}</span></div>
                <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} onClick={() => showToast('Downloading result...', 'info')}>Download</Button>
              </div>
            </div>
          )}

          {searched && !result && (
            <div className="mt-6"><EmptyState icon={<Search className="h-8 w-8" />} title="Result not found" description={`No result found for roll number "${rollNumber}". Please check and try again.`} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
