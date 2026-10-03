import { useMemo, useState } from 'react';
import { BookMarked, Library, BookOpen, CheckCircle2 } from 'lucide-react';
import AddBookForm from '@/components/AddBookForm';
import BookCard from '@/components/BookCard';
import FilterTabs, { type FilterValue } from '@/components/FilterTabs';
import { useLocalStorage } from '@/useLocalStorage';
import { type Book, type ReadingStatus, STATUS_ORDER } from '@/types';

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('reading-list:books', []);
  const [filter, setFilter] = useState<FilterValue>('all');

  const addBook = (title: string) => {
    setBooks((prev) => [
      { id: crypto.randomUUID(), title, status: 'want-to-read', addedAt: Date.now() },
      ...prev,
    ]);
  };

  const changeStatus = (id: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const removeBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const counts = useMemo(() => {
    const base = { all: books.length } as Record<FilterValue, number>;
    for (const s of STATUS_ORDER) base[s] = 0;
    for (const b of books) base[b.status]++;
    return base;
  }, [books]);

  const visibleBooks = useMemo(
    () => (filter === 'all' ? books : books.filter((b) => b.status === filter)),
    [books, filter]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <BookMarked className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Reading List
              </h1>
              <p className="text-sm text-slate-500">
                Track books you want to read, are reading, or have finished.
              </p>
            </div>
          </div>
        </header>

        {/* Add form */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <AddBookForm onAdd={addBook} existingBooks={books} />
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <BookMarked className="h-5 w-5" />
            </span>
            <p className="text-2xl font-bold text-slate-900">{counts.all}</p>
            <p className="text-xs font-medium text-slate-500">Total Books</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
              <BookOpen className="h-5 w-5" />
            </span>
            <p className="text-2xl font-bold text-slate-900">{counts['reading']}</p>
            <p className="text-xs font-medium text-slate-500">Reading</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <p className="text-2xl font-bold text-slate-900">{counts['finished']}</p>
            <p className="text-xs font-medium text-slate-500">Finished</p>
          </div>
        </div>

        {/* Filters + list */}
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Library className="h-7 w-7" />
            </span>
            <p className="text-lg font-medium text-slate-700">
              Your reading list is empty.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Add your first book.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <FilterTabs active={filter} counts={counts} onChange={setFilter} />
            </div>

            {visibleBooks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <p className="text-sm text-slate-500">
                  No books in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {visibleBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onStatusChange={changeStatus}
                    onRemove={removeBook}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <footer className="mt-10 text-center text-xs text-slate-400">
          Saved in your browser only.
        </footer>
      </div>
    </div>
  );
}

export default App;
