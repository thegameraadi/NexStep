import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SORT_OPTIONS } from '../../data/programs';

export default function SortBar({ sort, onSortChange, resultCount, onFilterOpen }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Mobile filter trigger */}
        <button
          onClick={onFilterOpen}
          className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-navy-200 text-sm font-medium text-navy-600 hover:bg-navy-50 transition-colors"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
        <span className="text-sm text-navy-500">
          <span className="font-bold text-navy-900">{resultCount}</span> programs found
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ArrowUpDown size={14} className="text-navy-400 hidden sm:block" />
        <label className="sr-only" htmlFor="sort-select">Sort by</label>
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-sm font-medium text-navy-700 bg-white border border-navy-200 rounded-xl px-3 py-2 hover:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200 transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
