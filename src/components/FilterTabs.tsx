import {
  type ReadingStatus,
  STATUS_META,
  STATUS_ORDER,
} from '@/types';

type FilterValue = ReadingStatus | 'all';

interface FilterTabsProps {
  active: FilterValue;
  counts: Record<FilterValue, number>;
  onChange: (value: FilterValue) => void;
}

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  ...STATUS_ORDER.map((s) => ({ value: s as FilterValue, label: STATUS_META[s].label })),
];

export default function FilterTabs({ active, counts, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export type { FilterValue };
