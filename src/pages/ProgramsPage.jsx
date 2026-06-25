import { useState } from 'react';
import { Search, X, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgramCard from '../components/programs/ProgramCard';
import ProgramFilters from '../components/programs/ProgramFilters';
import SortBar from '../components/programs/SortBar';
import ActiveFilters from '../components/programs/ActiveFilters';
import { usePrograms } from '../hooks/usePrograms';
import { useMyList } from '../context/MyListContext';

export default function ProgramsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { filters, updateFilter, toggleArrayFilter, resetFilters, activeFilterCount, results } = usePrograms();
  const { list } = useMyList();

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Page header */}
      <div className="bg-navy-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Program Explorer</h1>
              <p className="text-navy-300 text-base max-w-xl">
                Search and compare 500+ US graduate programs — with real admission data from the community.
              </p>
            </div>
            {list.length > 0 && (
              <Link
                to="/my-list"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F5A623] text-navy-900 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-amber-500 transition-colors"
              >
                <Bookmark size={16} className="fill-navy-900" />
                My List ({list.length})
              </Link>
            )}
          </div>

          {/* Search bar */}
          <div className="mt-6 flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
              <Search size={18} className="text-navy-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by program name, school, or field..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="flex-1 bg-transparent text-sm text-navy-700 placeholder:text-navy-400 outline-none"
              />
              {filters.search && (
                <button onClick={() => updateFilter('search', '')} className="text-navy-400 hover:text-navy-600">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden sticky top-20">
              <ProgramFilters
                filters={filters}
                toggleArrayFilter={toggleArrayFilter}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </aside>

          {/* Results area */}
          <div className="flex-1 min-w-0">
            {/* Sort + active filters */}
            <div className="space-y-3 mb-6">
              <SortBar
                sort={filters.sort}
                onSortChange={(v) => updateFilter('sort', v)}
                resultCount={results.length}
                onFilterOpen={() => setMobileFiltersOpen(true)}
              />
              <ActiveFilters
                filters={filters}
                toggleArrayFilter={toggleArrayFilter}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
              />
            </div>

            {/* Results grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">No programs match your filters</h3>
                <p className="text-navy-500 text-sm mb-4">Try adjusting your filters or search term.</p>
                <button
                  onClick={resetFilters}
                  className="btn-primary !py-2.5 !px-5 !text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl flex flex-col">
            <ProgramFilters
              filters={filters}
              toggleArrayFilter={toggleArrayFilter}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
              activeFilterCount={activeFilterCount}
              onClose={() => setMobileFiltersOpen(false)}
            />
            <div className="p-4 border-t border-navy-100 flex-shrink-0">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-navy-900 text-white rounded-xl font-semibold text-sm hover:bg-navy-800 transition-colors"
              >
                Show {results.length} programs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
