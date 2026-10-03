import { useState } from 'react';
import { Trash2, BookOpen, Check } from 'lucide-react';
import {
  type Book,
  type ReadingStatus,
  STATUS_META,
  STATUS_ORDER,
} from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export default function BookCard({
  book,
  onStatusChange,
  onRemove,
}: BookCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const meta = STATUS_META[book.status];

  const handleSelect = (status: ReadingStatus) => {
    onStatusChange(book.id, status);
    setMenuOpen(false);
  };

  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <BookOpen className="h-5 w-5" />
          </span>
          <h3 className="break-words text-base font-semibold leading-snug text-slate-900">
            {book.title}
          </h3>
        </div>
        <button
          onClick={() => onRemove(book.id)}
          aria-label={`Remove "${book.title}"`}
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset transition ${meta.badgeClass}`}
        >
          <span className={`h-2 w-2 rounded-full ${meta.dotClass}`} />
          {meta.label}
          <svg
            className={`h-3 w-3 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute left-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
              {STATUS_ORDER.map((status) => {
                const m = STATUS_META[status];
                const active = status === book.status;
                return (
                  <button
                    key={status}
                    onClick={() => handleSelect(status)}
                    className="flex w-full items-center justify-between px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${m.dotClass}`} />
                      {m.label}
                    </span>
                    {active && <Check className="h-4 w-4 text-slate-900" />}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
