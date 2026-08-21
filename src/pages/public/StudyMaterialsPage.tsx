import { useState } from 'react';
import { Search, Download, FileText, Filter } from 'lucide-react';
import { studyMaterials } from '@/data/students';
import { departments } from '@/data/departments';
import { Breadcrumbs, Badge, EmptyState } from '@/components/ui/index';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

const fileTypeColors: Record<string, string> = { PDF: 'error', DOCX: 'info', PPTX: 'warning', ZIP: 'default' };

export function StudyMaterialsPage() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [semFilter, setSemFilter] = useState('all');
  const { showToast } = useToast();

  const filtered = studyMaterials.filter((m) => {
    const matchSearch = m.subject.toLowerCase().includes(search.toLowerCase()) || m.faculty.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'all' || m.departmentId === deptFilter;
    const matchSem = semFilter === 'all' || m.semester === Number(semFilter);
    return matchSearch && matchDept && matchSem;
  });

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Student Corner', to: '/student-corner' }, { label: 'Study Materials' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">Study Materials</h1>
          <p className="mt-3 text-slate-300">Access lecture notes, reference materials, and lab manuals.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search materials..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-12" />
            </div>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="input-base">
              <option value="all">All Departments</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.shortName}</option>)}
            </select>
            <select value={semFilter} onChange={(e) => setSemFilter(e.target.value)} className="input-base">
              <option value="all">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((material) => (
              <div key={material.id} className="card card-hover p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><FileText className="h-6 w-6" /></div>
                  <Badge variant={fileTypeColors[material.fileType] as 'error'}>{material.fileType}</Badge>
                </div>
                <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">{material.subject}</h3>
                <div className="mt-2 space-y-1 text-sm text-slate-500 dark:text-slate-400">
                  <p>Faculty: <span className="font-medium text-slate-600 dark:text-slate-300">{material.faculty}</span></p>
                  <p>Semester: {material.semester} • Size: {material.fileSize}</p>
                  <p>Downloads: {material.downloads}</p>
                </div>
                <Button variant="outline" size="sm" fullWidth className="mt-4" icon={<Download className="h-4 w-4" />} onClick={() => showToast(`Downloading ${material.subject}...`, 'info')}>Download</Button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && <EmptyState icon={<Filter className="h-8 w-8" />} title="No materials found" description="Try adjusting your filters." />}
        </div>
      </section>
    </div>
  );
}
