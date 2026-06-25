import { useState } from 'react';
import { Plus, Trash2, X, ChevronDown, Mail } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';
import { LOR_STATUSES, LOR_TIPS } from '../../data/applications';

function AddRecommenderModal({ onClose }) {
  const { addRecommender } = useApplications();
  const [form, setForm] = useState({ name: '', relationship: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addRecommender(form);
    onClose();
  };

  const RELATIONSHIPS = ['PhD Supervisor', 'Research Advisor', 'Direct Manager', 'Professor', 'Employer', 'Colleague', 'Other'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100">
          <h2 className="font-bold text-navy-900">Add Recommender</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1.5">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Dr. Jane Smith"
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-500 transition-colors"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1.5">Relationship *</label>
            <select
              value={form.relationship}
              onChange={e => setForm(f => ({ ...f, relationship: e.target.value }))}
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-500 transition-colors bg-white"
            >
              <option value="">Select relationship...</option>
              {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1.5">Email (optional)</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="jane.smith@university.edu"
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!form.name.trim() || !form.relationship}
            className="w-full py-3 bg-navy-900 text-white font-semibold text-sm rounded-xl hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Add Recommender
          </button>
        </form>
      </div>
    </div>
  );
}

const STATUS_COLORS = {
  'Not Requested': 'bg-navy-100 text-navy-500',
  'Requested':    'bg-amber-100 text-amber-700',
  'Confirmed':    'bg-blue-100 text-blue-700',
  'Submitted':    'bg-emerald-100 text-emerald-700',
};

function LORCell({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const current = status || 'Not Requested';

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${STATUS_COLORS[current]}`}
      >
        {current}
        <ChevronDown size={10} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-10 bg-white rounded-xl border border-navy-200 shadow-lg overflow-hidden min-w-[140px]">
          {LOR_STATUSES.map(s => (
            <button
              key={s.id}
              onClick={() => { onChange(s.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:bg-navy-50 ${
                current === s.id ? 'text-navy-900 font-bold' : 'text-navy-700'
              }`}
            >
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${s.dot}`} />
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LORTracker() {
  const { recommenders, schools, addRecommender, removeRecommender, setLorStatus } = useApplications();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const schoolsWithDeadline = schools.slice().sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  return (
    <div className="space-y-6">
      {/* Tips banner */}
      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <button
          onClick={() => setShowTips(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-navy-50 transition-colors"
        >
          <span className="font-semibold text-navy-900 text-sm">💡 Tips for approaching recommenders</span>
          <span className="text-xs text-[#F5A623] font-medium">{showTips ? 'Hide' : 'Show'}</span>
        </button>
        {showTips && (
          <ul className="px-5 pb-4 space-y-2.5 border-t border-navy-100 pt-4">
            {LOR_TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-navy-600">
                <span className="text-[#F5A623] font-bold flex-shrink-0">→</span>
                {tip}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recommenders header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-navy-900">
          Recommenders
          <span className="ml-2 text-sm font-normal text-navy-400">({recommenders.length})</span>
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-navy-900 text-white font-semibold px-4 py-2 rounded-xl text-xs hover:bg-navy-800 transition-colors"
        >
          <Plus size={13} />
          Add Recommender
        </button>
      </div>

      {recommenders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-navy-100">
          <div className="text-3xl mb-3">📬</div>
          <p className="font-semibold text-navy-700 text-sm mb-1">No recommenders added yet</p>
          <p className="text-navy-400 text-xs mb-4">Track who is writing for you and their submission status per school.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-4 py-2 rounded-xl text-sm hover:bg-navy-800 transition-colors"
          >
            <Plus size={14} />
            Add First Recommender
          </button>
        </div>
      ) : (
        <>
          {/* Matrix */}
          <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-navy-600 w-52">Recommender</th>
                    {schoolsWithDeadline.map(school => (
                      <th key={school.id} className="px-4 py-3 text-left min-w-[130px]">
                        <p className="text-xs font-semibold text-navy-900 truncate">{school.schoolName}</p>
                        {school.deadline && (
                          <p className="text-xs text-navy-400">{new Date(school.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        )}
                      </th>
                    ))}
                    {schools.length === 0 && (
                      <th className="px-4 py-3 text-xs text-navy-400">No schools tracked yet</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {recommenders.map((rec, i) => (
                    <tr key={rec.id} className={`border-b border-navy-50 ${i % 2 === 0 ? '' : 'bg-navy-50/30'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-navy-900">{rec.name}</p>
                            <p className="text-xs text-navy-500">{rec.relationship}</p>
                            {rec.email && (
                              <a href={`mailto:${rec.email}`} className="text-xs text-[#F5A623] hover:underline flex items-center gap-1 mt-0.5">
                                <Mail size={10} />
                                {rec.email}
                              </a>
                            )}
                          </div>
                          <button
                            onClick={() => removeRecommender(rec.id)}
                            className="p-1 text-navy-300 hover:text-red-400 transition-colors flex-shrink-0"
                            title="Remove recommender"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                      {schoolsWithDeadline.map(school => (
                        <td key={school.id} className="px-4 py-3">
                          <LORCell
                            status={rec.schoolStatuses[school.id]}
                            onChange={(status) => setLorStatus(rec.id, school.id, status)}
                          />
                        </td>
                      ))}
                      {schools.length === 0 && (
                        <td className="px-4 py-3 text-xs text-navy-400">—</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs text-navy-500 font-medium">Status key:</span>
            {LOR_STATUSES.map(s => (
              <div key={s.id} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                <span className="text-xs text-navy-600">{s.label}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {showAddModal && <AddRecommenderModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
