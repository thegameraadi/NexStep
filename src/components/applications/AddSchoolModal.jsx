import { useState } from 'react';
import { X, Plus, Search } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';
import { useMyList } from '../../context/MyListContext';
import { PROGRAMS } from '../../data/programs';

export default function AddSchoolModal({ onClose }) {
  const [tab, setTab] = useState('manual');
  const [form, setForm] = useState({ schoolName: '', programName: '', deadline: '' });
  const [search, setSearch] = useState('');
  const { addSchool, schools } = useApplications();
  const { list } = useMyList();

  const existingIds = new Set(schools.map(s => s.programId).filter(Boolean));

  const shortlistedPrograms = PROGRAMS.filter(p => list.some(l => l.id === p.id));
  const filtered = shortlistedPrograms.filter(p =>
    !search || p.school.toLowerCase().includes(search.toLowerCase()) || p.program.toLowerCase().includes(search.toLowerCase())
  );

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!form.schoolName.trim()) return;
    addSchool(form);
    onClose();
  };

  const handleAddFromList = (program) => {
    addSchool({
      schoolName: program.school,
      programName: program.program,
      programId: program.id,
      deadline: program.deadline || '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100">
          <h2 className="font-bold text-navy-900 text-lg">Track a School</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-navy-100">
          {['manual', 'shortlist'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === t ? 'text-navy-900 border-b-2 border-navy-900' : 'text-navy-400 hover:text-navy-600'
              }`}
            >
              {t === 'manual' ? 'Add Manually' : `From My List (${shortlistedPrograms.length})`}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === 'manual' ? (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">School Name *</label>
                <input
                  type="text"
                  value={form.schoolName}
                  onChange={e => setForm(f => ({ ...f, schoolName: e.target.value }))}
                  placeholder="e.g. MIT, Stanford University"
                  className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm text-navy-900 outline-none focus:border-navy-500 transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">Program Name</label>
                <input
                  type="text"
                  value={form.programName}
                  onChange={e => setForm(f => ({ ...f, programName: e.target.value }))}
                  placeholder="e.g. MS Computer Science"
                  className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm text-navy-900 outline-none focus:border-navy-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1.5">Application Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                  className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm text-navy-900 outline-none focus:border-navy-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={!form.schoolName.trim()}
                className="w-full py-3 bg-navy-900 text-white font-semibold text-sm rounded-xl hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Add to Tracker
              </button>
            </form>
          ) : (
            <div>
              {shortlistedPrograms.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-3">🔖</div>
                  <p className="text-navy-700 font-medium text-sm mb-1">Your shortlist is empty</p>
                  <p className="text-navy-400 text-xs">Save programs in the Program Explorer first, then import them here.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 bg-navy-50 rounded-xl px-3 py-2 mb-4">
                    <Search size={15} className="text-navy-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search your shortlist..."
                      className="bg-transparent text-sm text-navy-700 placeholder:text-navy-400 outline-none flex-1"
                    />
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {filtered.map(program => {
                      const alreadyAdded = existingIds.has(program.id);
                      return (
                        <div key={program.id} className="flex items-center gap-3 p-3 rounded-xl border border-navy-100 hover:border-navy-200 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-navy-900 truncate">{program.school}</p>
                            <p className="text-xs text-navy-500 truncate">{program.program}</p>
                            {program.deadline && (
                              <p className="text-xs text-navy-400 mt-0.5">Deadline: {program.deadline}</p>
                            )}
                          </div>
                          {alreadyAdded ? (
                            <span className="text-xs text-emerald-600 font-medium flex-shrink-0">Added ✓</span>
                          ) : (
                            <button
                              onClick={() => handleAddFromList(program)}
                              className="flex items-center gap-1 text-xs font-semibold text-navy-900 bg-navy-100 hover:bg-navy-200 px-3 py-1.5 rounded-lg flex-shrink-0 transition-colors"
                            >
                              <Plus size={12} />
                              Track
                            </button>
                          )}
                        </div>
                      );
                    })}
                    {filtered.length === 0 && (
                      <p className="text-center text-sm text-navy-400 py-4">No matching programs</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
