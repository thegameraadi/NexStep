import { useState, useMemo } from 'react';
import { Filter, Plus, BarChart3, List, X } from 'lucide-react';
import { MOCK_RESULTS, OUTCOME_STYLES, SEASONS, OUTCOMES, aggregateByProgram } from '../../data/decisions';
import { useDecisions } from '../../context/DecisionsContext';

const SCHOOLS = [...new Set(MOCK_RESULTS.map(r => r.school))].sort();
const FIELDS = [...new Set(MOCK_RESULTS.map(r => r.field))].sort();

function OutcomeBadge({ outcome }) {
  const s = OUTCOME_STYLES[outcome] || {};
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text} border ${s.border}`}>
      {s.emoji} {outcome}
    </span>
  );
}

function ResultCard({ result }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-navy-100 p-4 hover:border-navy-200 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-navy-900 text-sm leading-snug">{result.school}</p>
          <p className="text-xs text-navy-500 mt-0.5 truncate">{result.program}</p>
        </div>
        <OutcomeBadge outcome={result.outcome} />
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-navy-500">
        {result.gpa && <span>GPA {result.gpa.toFixed(2)}</span>}
        {result.greQuant && <span>GRE-Q {result.greQuant}</span>}
        {result.greVerbal && <span>GRE-V {result.greVerbal}</span>}
        <span className="ml-auto text-navy-400">{result.date}</span>
      </div>

      {result.notes && (
        <>
          <p className={`text-xs text-navy-600 mt-2.5 leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}>
            {result.notes}
          </p>
          {result.notes.length > 120 && (
            <button onClick={() => setExpanded(v => !v)} className="text-xs text-[#F5A623] hover:underline mt-1">
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function StatsCard({ stat }) {
  const total = stat.total;
  const admitPct = stat.admitRate;
  return (
    <div className="bg-white rounded-xl border border-navy-100 p-4">
      <div className="mb-3">
        <p className="font-semibold text-navy-900 text-sm">{stat.school}</p>
        <p className="text-xs text-navy-500 mt-0.5">{stat.program}</p>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-2 bg-navy-100 rounded-full overflow-hidden flex">
          {stat.admitted > 0 && <div className="h-full bg-emerald-400" style={{ width: `${(stat.admitted/total)*100}%` }} />}
          {stat.waitlisted > 0 && <div className="h-full bg-amber-400" style={{ width: `${(stat.waitlisted/total)*100}%` }} />}
          {stat.interviews > 0 && <div className="h-full bg-blue-400" style={{ width: `${(stat.interviews/total)*100}%` }} />}
          {stat.rejected > 0 && <div className="h-full bg-red-300" style={{ width: `${(stat.rejected/total)*100}%` }} />}
        </div>
        <span className="text-xs font-bold text-emerald-700 flex-shrink-0">{admitPct}% admit</span>
      </div>

      <div className="grid grid-cols-4 gap-1 text-center mb-3">
        {[
          { label: '🎉', val: stat.admitted, cls: 'text-emerald-700' },
          { label: '⏳', val: stat.waitlisted, cls: 'text-amber-700' },
          { label: '🎤', val: stat.interviews, cls: 'text-blue-700' },
          { label: '💔', val: stat.rejected, cls: 'text-red-600' },
        ].map((x, i) => (
          <div key={i} className="bg-navy-50 rounded-lg py-1.5">
            <p className="text-base leading-none">{x.label}</p>
            <p className={`text-sm font-bold mt-0.5 ${x.cls}`}>{x.val}</p>
          </div>
        ))}
      </div>

      {(stat.gpaRange || stat.greQuantRange) && (
        <div className="flex gap-2 text-xs text-navy-500 border-t border-navy-100 pt-2 mt-1">
          {stat.gpaRange && <span>GPA {stat.gpaRange.min.toFixed(1)}–{stat.gpaRange.max.toFixed(1)}</span>}
          {stat.greQuantRange && <span>GRE-Q {stat.greQuantRange.min}–{stat.greQuantRange.max}</span>}
          <span className="ml-auto">{total} report{total !== 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  );
}

function SubmitModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    school: '', program: '', outcome: 'Admitted', date: '', gpa: '', greQuant: '', greVerbal: '', season: 'Fall 2025', notes: '',
  });

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.school.trim() || !form.program.trim() || !form.date) return;
    onSubmit({
      ...form,
      gpa: form.gpa ? parseFloat(form.gpa) : null,
      greQuant: form.greQuant ? parseInt(form.greQuant) : null,
      greVerbal: form.greVerbal ? parseInt(form.greVerbal) : null,
      id: `u${Date.now()}`,
      field: 'Other',
      degree: 'MS',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy-100">
          <h3 className="font-bold text-navy-900">Submit Your Result</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">School *</label>
              <input value={form.school} onChange={e => set('school', e.target.value)} required placeholder="e.g. MIT"
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Program *</label>
              <input value={form.program} onChange={e => set('program', e.target.value)} required placeholder="e.g. MS Computer Science"
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Outcome *</label>
              <select value={form.outcome} onChange={e => set('outcome', e.target.value)}
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-navy-400">
                {OUTCOMES.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Season *</label>
              <select value={form.season} onChange={e => set('season', e.target.value)}
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-navy-400">
                {SEASONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Decision date *</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} required
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">GPA (optional)</label>
              <input type="number" step="0.01" min="0" max="4" value={form.gpa} onChange={e => set('gpa', e.target.value)} placeholder="3.85"
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">GRE Quant (optional)</label>
              <input type="number" min="130" max="170" value={form.greQuant} onChange={e => set('greQuant', e.target.value)} placeholder="168"
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">GRE Verbal (optional)</label>
              <input type="number" min="130" max="170" value={form.greVerbal} onChange={e => set('greVerbal', e.target.value)} placeholder="160"
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Notes / experience (optional)</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} placeholder="What happened, anything useful for others..."
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400 resize-none" />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
            Your submission is anonymous. Stats and experiences help the whole community.
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-navy-200 rounded-xl text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 bg-navy-900 rounded-xl text-sm font-semibold text-white hover:bg-navy-800 transition-colors">
              Submit Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ResultsFeed() {
  const { state, dispatch } = useDecisions();
  const [view, setView] = useState('feed');
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({ school: '', outcome: '', season: 'Fall 2025', field: '' });

  const allResults = useMemo(() => [...state.userResults, ...MOCK_RESULTS], [state.userResults]);

  const filtered = useMemo(() => {
    return allResults.filter(r => {
      if (filters.school && r.school !== filters.school) return false;
      if (filters.outcome && r.outcome !== filters.outcome) return false;
      if (filters.season && r.season !== filters.season) return false;
      if (filters.field && r.field !== filters.field) return false;
      return true;
    });
  }, [allResults, filters]);

  const stats = useMemo(() => aggregateByProgram(filtered), [filtered]);

  const setFilter = (k, v) => setFilters(prev => ({ ...prev, [k]: prev[k] === v ? '' : v }));

  const handleSubmit = (result) => {
    dispatch({ type: 'SUBMIT_RESULT', result });
  };

  return (
    <div className="space-y-5">
      {/* Controls bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 bg-white border border-navy-200 rounded-xl p-1">
          <button onClick={() => setView('feed')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${view === 'feed' ? 'bg-navy-900 text-white' : 'text-navy-600 hover:bg-navy-50'}`}>
            <List size={13} /> Feed
          </button>
          <button onClick={() => setView('stats')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${view === 'stats' ? 'bg-navy-900 text-white' : 'text-navy-600 hover:bg-navy-50'}`}>
            <BarChart3 size={13} /> Stats
          </button>
        </div>

        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#F5A623] rounded-xl text-xs font-bold text-navy-900 hover:bg-amber-500 transition-colors">
          <Plus size={14} /> Submit Your Result
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-navy-100 p-4">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-navy-600">
          <Filter size={13} /> Filters
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <select value={filters.season} onChange={e => setFilter('season', e.target.value)}
            className="border border-navy-200 rounded-xl px-3 py-2 text-xs bg-white outline-none focus:border-navy-400">
            <option value="">All seasons</option>
            {SEASONS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filters.school} onChange={e => setFilter('school', e.target.value)}
            className="border border-navy-200 rounded-xl px-3 py-2 text-xs bg-white outline-none focus:border-navy-400">
            <option value="">All schools</option>
            {SCHOOLS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filters.outcome} onChange={e => setFilter('outcome', e.target.value)}
            className="border border-navy-200 rounded-xl px-3 py-2 text-xs bg-white outline-none focus:border-navy-400">
            <option value="">All outcomes</option>
            {OUTCOMES.map(o => <option key={o}>{o}</option>)}
          </select>
          <select value={filters.field} onChange={e => setFilter('field', e.target.value)}
            className="border border-navy-200 rounded-xl px-3 py-2 text-xs bg-white outline-none focus:border-navy-400">
            <option value="">All fields</option>
            {FIELDS.map(f => <option key={f}>{f}</option>)}
          </select>
        </div>
        <p className="text-xs text-navy-400 mt-2">{filtered.length} result{filtered.length !== 1 ? 's' : ''} shown</p>
      </div>

      {/* Results */}
      {view === 'feed' ? (
        filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-navy-200">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-navy-700">No results match your filters</p>
            <p className="text-xs text-navy-400 mt-1">Try adjusting or clearing the filters above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map(r => <ResultCard key={r.id} result={r} />)}
          </div>
        )
      ) : (
        stats.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-navy-200">
            <p className="text-4xl mb-3">📊</p>
            <p className="font-semibold text-navy-700">No data to aggregate</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {stats.map(s => <StatsCard key={`${s.school}||${s.program}`} stat={s} />)}
          </div>
        )
      )}

      {showModal && <SubmitModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />}
    </div>
  );
}
