import { useState, useMemo } from 'react';
import { Search, X, Bookmark, ExternalLink, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { SCHOLARSHIPS } from '../../data/finance';

const ALL_FIELDS = ['All fields', ...new Set(SCHOLARSHIPS.flatMap(s => s.fields))].filter(f => f !== 'All fields').sort();
const ALL_COUNTRIES = ['All', 'All countries', 'India', 'Global'];
const ALL_DEGREES = ['All', 'MS', 'PhD', 'MBA', 'MA', 'MPA', 'Professional'];
const TYPES = ['All', 'Full', 'Partial', 'Loan-scholarship'];

const TYPE_COLORS = {
  'Full': 'bg-emerald-100 text-emerald-700',
  'Partial': 'bg-amber-100 text-amber-700',
  'Loan-scholarship': 'bg-blue-100 text-blue-700',
};

function ScholarshipCard({ scholarship, saved, applied, onToggleSave, onToggleApply }) {
  const [expanded, setExpanded] = useState(false);
  const daysUntilDeadline = useMemo(() => {
    if (!scholarship.deadline) return null;
    const d = new Date(scholarship.deadline);
    const now = new Date();
    return Math.ceil((d - now) / 86400000);
  }, [scholarship.deadline]);

  return (
    <div className={`bg-white rounded-2xl border transition-all overflow-hidden ${expanded ? 'border-navy-300 shadow-card' : 'border-navy-100 hover:border-navy-200'}`}>
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="font-bold text-navy-900 leading-tight">{scholarship.name}</h3>
              <button
                onClick={() => onToggleSave(scholarship.id)}
                className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${saved ? 'text-[#F5A623]' : 'text-navy-300 hover:text-navy-500'}`}
              >
                <Bookmark size={15} className={saved ? 'fill-[#F5A623]' : ''} />
              </button>
            </div>
            <p className="text-xs text-navy-500 mb-2">{scholarship.provider}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[scholarship.type] || 'bg-navy-100 text-navy-600'}`}>
                {scholarship.type}
              </span>
              <span className="text-xs font-bold text-navy-900 bg-navy-100 px-2.5 py-1 rounded-full">
                {scholarship.amount}
              </span>
              {daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  daysUntilDeadline <= 30 ? 'bg-red-100 text-red-600' : 'bg-sky-100 text-sky-700'
                }`}>
                  {daysUntilDeadline <= 30 ? `⏰ ${daysUntilDeadline}d left` : `📅 ${scholarship.deadlineDisplay}`}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {scholarship.countries.slice(0, 3).map(c => (
                <span key={c} className="text-xs text-navy-500 bg-navy-50 px-2 py-0.5 rounded-full">{c}</span>
              ))}
              {scholarship.degrees.slice(0, 3).map(d => (
                <span key={d} className="text-xs text-navy-500 bg-navy-50 px-2 py-0.5 rounded-full">{d}</span>
              ))}
            </div>

            <p className="text-sm text-navy-600 leading-relaxed line-clamp-2">{scholarship.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleApply(scholarship.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                applied
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'border-navy-200 text-navy-600 hover:border-navy-400'
              }`}
            >
              {applied ? '✓ Applied' : 'Mark as Applied'}
            </button>
          </div>
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center gap-1 text-xs font-medium text-[#F5A623] hover:underline"
          >
            {expanded ? 'Less' : 'Details'}
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-navy-100 p-5 space-y-4 bg-navy-50/40">
          {/* Eligibility */}
          <div>
            <p className="text-xs font-bold text-navy-600 mb-2">Eligibility</p>
            <ul className="space-y-1.5">
              {scholarship.eligibility.map((e, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                  <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Community notes */}
          {scholarship.communityNotes && scholarship.communityNotes.length > 0 && (
            <div>
              <p className="text-xs font-bold text-navy-600 mb-2">Community Notes</p>
              <ul className="space-y-2">
                {scholarship.communityNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-600">
                    <span className="text-[#F5A623] flex-shrink-0 mt-0.5">→</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fields */}
          <div className="flex flex-wrap gap-1.5">
            {scholarship.fields.map(f => (
              <span key={f} className="text-xs text-navy-500 bg-white border border-navy-100 px-2 py-0.5 rounded-full">{f}</span>
            ))}
          </div>

          <a
            href={scholarship.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 bg-white border border-navy-200 px-4 py-2 rounded-xl hover:border-navy-400 transition-colors"
          >
            <ExternalLink size={13} />
            Official Website
          </a>
        </div>
      )}
    </div>
  );
}

export default function ScholarshipDB() {
  const { savedScholarships, appliedScholarships, toggleSavedScholarship, toggleAppliedScholarship } = useFinance();
  const [search, setSearch] = useState('');
  const [filterField, setFilterField] = useState('All fields');
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterDegree, setFilterDegree] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return SCHOLARSHIPS.filter(s => {
      if (showSavedOnly && !savedScholarships.includes(s.id)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.provider.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q)) return false;
      }
      if (filterField !== 'All fields' && !s.fields.includes('All fields') && !s.fields.includes(filterField)) return false;
      if (filterCountry !== 'All' && filterCountry !== 'Global') {
        if (!s.countries.includes('All countries') && !s.countries.some(c => c.toLowerCase().includes(filterCountry.toLowerCase()))) return false;
      }
      if (filterDegree !== 'All' && !s.degrees.includes(filterDegree)) return false;
      if (filterType !== 'All' && s.type !== filterType) return false;
      return true;
    });
  }, [search, filterField, filterCountry, filterDegree, filterType, showSavedOnly, savedScholarships]);

  const activeFilterCount = [
    filterField !== 'All fields', filterCountry !== 'All', filterDegree !== 'All', filterType !== 'All', showSavedOnly
  ].filter(Boolean).length;

  return (
    <div className="space-y-5">
      {/* Search bar */}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2.5 bg-white border border-navy-200 rounded-xl px-4 py-3">
          <Search size={16} className="text-navy-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search scholarships by name, provider, or field..."
            className="flex-1 bg-transparent text-sm text-navy-700 placeholder:text-navy-400 outline-none"
          />
          {search && <button onClick={() => setSearch('')} className="text-navy-400 hover:text-navy-600"><X size={15} /></button>}
        </div>
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-colors ${
            activeFilterCount > 0 ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-navy-700 border-navy-200 hover:border-navy-400'
          }`}
        >
          <Filter size={15} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white border border-navy-200 rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Type</label>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full border border-navy-200 rounded-xl px-3 py-2 text-sm bg-white outline-none">
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Country</label>
            <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)} className="w-full border border-navy-200 rounded-xl px-3 py-2 text-sm bg-white outline-none">
              {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Degree</label>
            <select value={filterDegree} onChange={e => setFilterDegree(e.target.value)} className="w-full border border-navy-200 rounded-xl px-3 py-2 text-sm bg-white outline-none">
              {ALL_DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => setShowSavedOnly(v => !v)}
                className={`w-10 h-5 rounded-full transition-colors ${showSavedOnly ? 'bg-[#F5A623]' : 'bg-navy-200'} relative cursor-pointer`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${showSavedOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-navy-700">Saved only</span>
            </label>
          </div>
        </div>
      )}

      {/* Count + clear */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-navy-500">
          <span className="font-semibold text-navy-900">{filtered.length}</span> scholarships found
          {savedScholarships.length > 0 && <span className="ml-2 text-navy-400">· {savedScholarships.length} saved</span>}
          {appliedScholarships.length > 0 && <span className="ml-1 text-emerald-600">· {appliedScholarships.length} applied</span>}
        </p>
        {activeFilterCount > 0 && (
          <button
            onClick={() => { setFilterField('All fields'); setFilterCountry('All'); setFilterDegree('All'); setFilterType('All'); setShowSavedOnly(false); }}
            className="text-xs text-navy-500 hover:text-navy-700 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filtered.map(s => (
          <ScholarshipCard
            key={s.id}
            scholarship={s}
            saved={savedScholarships.includes(s.id)}
            applied={appliedScholarships.includes(s.id)}
            onToggleSave={toggleSavedScholarship}
            onToggleApply={toggleAppliedScholarship}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-navy-100">
            <div className="text-3xl mb-3">🔍</div>
            <p className="font-semibold text-navy-700">No scholarships match your filters</p>
            <p className="text-sm text-navy-400 mt-1">Try broadening your search or clearing filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
