import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, LayoutGrid, Columns, Trash2, Plus, ChevronRight } from 'lucide-react';
import { PROGRAMS, APPLICATION_STATUSES } from '../data/programs';
import { useMyList } from '../context/MyListContext';
import ProgramCard from '../components/programs/ProgramCard';
import StatusSelector from '../components/programs/StatusSelector';
import ComparisonTable from '../components/programs/ComparisonTable';

const STATUS_ORDER = ['researching', 'applying', 'applied', 'interview', 'admitted', 'rejected', 'waitlisted', 'attending'];

function EmptyList() {
  return (
    <div className="text-center py-24">
      <div className="w-16 h-16 rounded-2xl bg-navy-100 flex items-center justify-center mx-auto mb-4">
        <Bookmark size={28} className="text-navy-400" />
      </div>
      <h2 className="font-bold text-navy-900 text-xl mb-2">Your list is empty</h2>
      <p className="text-navy-500 text-sm mb-6 max-w-xs mx-auto">
        Save programs from the explorer to track them here and compare side-by-side.
      </p>
      <Link
        to="/programs"
        className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-navy-800 transition-colors"
      >
        Explore Programs
        <ChevronRight size={15} />
      </Link>
    </div>
  );
}

export default function MyListPage() {
  const navigate = useNavigate();
  const { list, removeFromList } = useMyList();
  const [view, setView] = useState('grid'); // 'grid' | 'compare'
  const [compareIds, setCompareIds] = useState([]);

  const programs = list
    .map((item) => ({
      ...item,
      program: PROGRAMS.find((p) => p.id === item.programId),
    }))
    .filter((item) => item.program)
    .sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));

  const toggleCompare = (id) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const grouped = STATUS_ORDER.reduce((acc, status) => {
    const items = programs.filter((i) => i.status === status);
    if (items.length) acc[status] = items;
    return acc;
  }, {});

  const statusDef = (v) => APPLICATION_STATUSES.find((s) => s.value === v);

  if (!list.length) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/programs')}
            className="inline-flex items-center gap-1.5 text-navy-500 hover:text-navy-900 transition-colors text-sm mb-8"
          >
            <ArrowLeft size={15} />
            Back to Explorer
          </button>
          <EmptyList />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-16">
      {/* Header */}
      <div className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button
            onClick={() => navigate('/programs')}
            className="inline-flex items-center gap-1.5 text-navy-300 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft size={15} />
            Back to Explorer
          </button>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My List</h1>
              <p className="text-navy-300 text-sm">
                {list.length} saved program{list.length !== 1 ? 's' : ''} · Track your applications and compare side-by-side
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-navy-800 rounded-xl p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    view === 'grid' ? 'bg-white text-navy-900' : 'text-navy-300 hover:text-white'
                  }`}
                >
                  <LayoutGrid size={14} />
                  Cards
                </button>
                <button
                  onClick={() => setView('compare')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    view === 'compare' ? 'bg-white text-navy-900' : 'text-navy-300 hover:text-white'
                  }`}
                >
                  <Columns size={14} />
                  Compare
                </button>
              </div>
            </div>
          </div>

          {/* Status summary bar */}
          <div className="flex flex-wrap gap-2 mt-5">
            {Object.entries(grouped).map(([status, items]) => {
              const def = statusDef(status);
              return (
                <span key={status} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${def?.color ?? ''}`}>
                  {def?.label ?? status} <span className="opacity-70">({items.length})</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'grid' ? (
          /* Grid view — grouped by status */
          <div className="space-y-10">
            {Object.entries(grouped).map(([status, items]) => {
              const def = statusDef(status);
              return (
                <section key={status}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${def?.color ?? ''}`}>
                      {def?.label ?? status}
                    </span>
                    <span className="text-sm text-navy-400">{items.length} program{items.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {items.map(({ program, programId }) => (
                      <ProgramCard key={programId} program={program} />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Add more */}
            <div className="border-2 border-dashed border-navy-200 rounded-2xl p-8 text-center">
              <Plus size={24} className="text-navy-300 mx-auto mb-3" />
              <p className="text-sm text-navy-500 mb-3">Add more programs to your list</p>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-navy-800 transition-colors"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        ) : (
          /* Compare view */
          <div>
            {/* Select up to 4 */}
            <div className="bg-white rounded-2xl border border-navy-100 p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-navy-900">Select up to 4 programs to compare</h2>
                {compareIds.length > 0 && (
                  <button
                    onClick={() => setCompareIds([])}
                    className="text-xs text-navy-400 hover:text-navy-700 font-semibold"
                  >
                    Clear selection
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {programs.map(({ program, programId }) => (
                  <button
                    key={programId}
                    onClick={() => toggleCompare(programId)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                      compareIds.includes(programId)
                        ? 'border-navy-900 bg-navy-900 text-white'
                        : 'border-navy-200 text-navy-600 hover:border-navy-400'
                    } ${compareIds.length >= 4 && !compareIds.includes(programId) ? 'opacity-40 cursor-not-allowed' : ''}`}
                    disabled={compareIds.length >= 4 && !compareIds.includes(programId)}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: compareIds.includes(programId) ? '#F5A623' : 'transparent' }}
                    >
                      {compareIds.includes(programId) && (
                        <svg viewBox="0 0 10 8" width="8" height="8" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    {program.shortSchool} — {program.degreeType}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-navy-400 mt-3">
                {compareIds.length}/4 selected
              </p>
            </div>

            {/* Comparison table */}
            {compareIds.length >= 2 ? (
              <div className="bg-white rounded-2xl border border-navy-100 p-5 overflow-hidden">
                <ComparisonTable compareIds={compareIds} />
              </div>
            ) : (
              <div className="text-center py-16 text-navy-400">
                <Columns size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select at least 2 programs above to compare them side-by-side</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
