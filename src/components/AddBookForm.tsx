import { useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { type Book } from '@/types';

const MAX_TITLE_LENGTH = 60;

interface AddBookFormProps {
  onAdd: (title: string) => void;
  existingBooks: Book[];
}

export default function AddBookForm({ onAdd, existingBooks }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Please enter a title first.');
      return;
    }

    if (trimmed.length > MAX_TITLE_LENGTH) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }

    const normalized = trimmed.toLowerCase().replace(/\s+/g, ' ');
    const isDuplicate = existingBooks.some(
      (b) => b.title.toLowerCase().replace(/\s+/g, ' ') === normalized
    );
    if (isDuplicate) {
      setError('This book is already in your reading list.');
      return;
    }

    onAdd(trimmed);
    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            maxLength={MAX_TITLE_LENGTH}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter a book title…"
            aria-label="Book title"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
          {error && (
            <p className="mt-1.5 text-sm text-rose-600">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] sm:px-6"
        >
          <Plus className="h-5 w-5" />
          Add Book
        </button>
      </div>
    </form>
  );
}
