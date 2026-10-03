export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  addedAt: number;
}

export const STATUS_META: Record<
  ReadingStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  'want-to-read': {
    label: 'Want to Read',
    badgeClass: 'bg-amber-100 text-amber-700 ring-amber-200',
    dotClass: 'bg-amber-500',
  },
  reading: {
    label: 'Reading',
    badgeClass: 'bg-sky-100 text-sky-700 ring-sky-200',
    dotClass: 'bg-sky-500',
  },
  finished: {
    label: 'Finished',
    badgeClass: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    dotClass: 'bg-emerald-500',
  },
};

export const STATUS_ORDER: ReadingStatus[] = [
  'want-to-read',
  'reading',
  'finished',
];
