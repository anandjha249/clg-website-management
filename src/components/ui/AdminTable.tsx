import { type ReactNode, useState } from 'react';
import { Search, Plus, Eye, Pencil, Trash2, Filter } from 'lucide-react';
import { Button } from './Button';
import { Badge, Pagination, EmptyState, ConfirmDialog } from './index';
import { useToast } from '@/context/ToastContext';

export type Column<T> = {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
};

type Props<T extends { id: string }> = {
  title: string;
  data: T[];
  columns: Column<T>[];
  searchKeys: (keyof T)[];
  filterLabel?: string;
  filterOptions?: { label: string; value: string }[];
  filterKey?: keyof T;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  addLabel?: string;
  pageSize?: number;
};

export function AdminTable<T extends { id: string }>({ title, data, columns, searchKeys, filterLabel, filterOptions, filterKey, onAdd, onEdit, onDelete, onView, addLabel = 'Add New', pageSize = 8 }: Props<T>) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const { showToast } = useToast();

  const filtered = data.filter((item) => {
    const matchSearch = searchKeys.some((key) => String(item[key] || '').toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'all' || (filterKey && String(item[filterKey]) === filter);
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder={`Search ${title}...`} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="input-base pl-12" />
          </div>
          {filterOptions && filterOptions.length > 0 && (
            <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }} className="input-base sm:w-48">
              <option value="all">{filterLabel || 'All'}</option>
              {filterOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          )}
        </div>
        {onAdd && <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={onAdd}>{addLabel}</Button>}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/50">
                {columns.map((col) => <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{col.label}</th>)}
                {(onView || onEdit || onDelete) && <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/30">
                  {columns.map((col) => <td key={col.key} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{col.render ? col.render(item) : String(item[col.key as keyof T] || '')}</td>)}
                  {(onView || onEdit || onDelete) && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onView && <button onClick={() => onView(item)} className="rounded-lg p-1.5 text-slate-400 hover:bg-navy-50 hover:text-navy-600 dark:hover:bg-navy-900/30" title="View"><Eye className="h-4 w-4" /></button>}
                        {onEdit && <button onClick={() => onEdit(item)} className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30" title="Edit"><Pencil className="h-4 w-4" /></button>}
                        {onDelete && <button onClick={() => setDeleteTarget(item)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30" title="Delete"><Trash2 className="h-4 w-4" /></button>}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paginated.length === 0 && <EmptyState icon={<Filter className="h-8 w-8" />} title="No records found" description="Try adjusting your search or filters." />}
        {totalPages > 1 && <div className="border-t border-slate-100 p-4 dark:border-slate-700"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div>}
      </div>

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => { if (deleteTarget && onDelete) { onDelete(deleteTarget); showToast(`${title} deleted successfully`, 'success'); } }} title={`Delete ${title.slice(0, -1)}`} message={`Are you sure you want to delete this record? This action cannot be undone.`} confirmText="Delete" />
    </div>
  );
}
