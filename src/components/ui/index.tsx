import { type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';
import { Button } from './Button';

type ConfirmProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
};

export function ConfirmDialog({ open, onClose, onConfirm, title = 'Confirm Action', message, confirmText = 'Confirm', cancelText = 'Cancel', danger = true }: ConfirmProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="text-center">
        <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${danger ? 'bg-red-100 dark:bg-red-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
          <AlertTriangle className={`h-7 w-7 ${danger ? 'text-red-600' : 'text-amber-600'}`} />
        </div>
        <h3 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{message}</p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={onClose}>{cancelText}</Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={() => { onConfirm(); onClose(); }}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
}

export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-700">{icon}</div>
      <h3 className="mb-1 text-lg font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
      {description && <p className="mb-4 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      {action}
    </div>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'navy' | 'gold' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    navy: 'bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300',
    gold: 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300',
  };
  return <span className={`badge ${variants[variant]}`}>{children}</span>;
}

export function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1);
  return (
    <div className="flex items-center justify-center gap-1.5">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Prev</button>
      {visible.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && p - visible[i - 1] > 1 && <span className="text-slate-400">…</span>}
          <button onClick={() => onPageChange(p)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${p === currentPage ? 'bg-navy-700 text-white' : 'border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700'}`}>{p}</button>
        </span>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Next</button>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-slate-300 dark:text-slate-600">/</span>}
          {item.to ? <Link to={item.to} className="hover:text-navy-600 dark:hover:text-navy-400">{item.label}</Link> : <span className="font-medium text-slate-700 dark:text-slate-200">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
