import { useState } from 'react';
import { X, Trash2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApplications } from '../../context/ApplicationContext';
import { PIPELINE_STATUSES, DECISION_RESULTS } from '../../data/applications';
import { PROGRAMS } from '../../data/programs';

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.ceil((d - now) / 86400000);
}

function DeadlineBadge({ deadline }) {
  const days = daysUntil(deadline);
  if (days === null) return null;
  if (days < 0) return <span className="text-xs font-medium text-red-500">Overdue by {Math.abs(days)}d</span>;
  if (days === 0) return <span className="text-xs font-bold text-red-500">Due today!</span>;
  const cls = days <= 14 ? 'text-red-500' : days <= 30 ? 'text-amber-500' : 'text-navy-500';
  return <span className={`text-xs font-medium ${cls}`}>{days}d until deadline</span>;
}

export default function SchoolDetailPanel({ school, onClose }) {
  const { updateSchool, removeSchool, toggleRequirement } = useApplications();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showReqs, setShowReqs] = useState(true);

  const linkedProgram = school.programId ? PROGRAMS.find(p => p.id === school.programId) : null;
  const completedReqs = school.requirements.filter(r => r.completed).length;
  const totalReqs = school.requirements.length;

  const handleDelete = () => {
    removeSchool(school.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-navy-950/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-navy-100">
          <div className="flex-1 min-w-0 pr-3">
            <input
              type="text"
              value={school.schoolName}
              onChange={e => updateSchool(school.id, { schoolName: e.target.value })}
              className="w-full font-bold text-navy-900 text-lg bg-transparent outline-none hover:bg-navy-50 focus:bg-navy-50 rounded px-1 -ml-1 transition-colors"
            />
            <input
              type="text"
              value={school.programName}
              onChange={e => updateSchool(school.id, { programName: e.target.value })}
              placeholder="Add program name..."
              className="w-full text-sm text-navy-500 bg-transparent outline-none hover:bg-navy-50 focus:bg-navy-50 rounded px-1 -ml-1 mt-0.5 transition-colors"
            />
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50 flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Deadline */}
          <div className="px-5 py-4 border-b border-navy-100">
            <label className="block text-xs font-semibold text-navy-500 mb-2">Application Deadline</label>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={school.deadline}
                onChange={e => updateSchool(school.id, { deadline: e.target.value })}
                className="flex-1 border border-navy-200 rounded-xl px-3 py-2 text-sm text-navy-900 outline-none focus:border-navy-500 transition-colors"
              />
              <DeadlineBadge deadline={school.deadline} />
            </div>
          </div>

          {/* Status pipeline */}
          <div className="px-5 py-4 border-b border-navy-100">
            <label className="block text-xs font-semibold text-navy-500 mb-3">Status</label>
            <div className="flex gap-1.5 flex-wrap">
              {PIPELINE_STATUSES.map(s => (
                <button
                  key={s.id}
                  onClick={() => updateSchool(school.id, { status: s.id, decisionResult: s.id !== 'Decision' ? null : school.decisionResult })}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    school.status === s.id
                      ? 'bg-navy-900 text-white'
                      : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
                  }`}
                >
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>
            {school.status === 'Decision' && (
              <div className="mt-3">
                <label className="block text-xs font-semibold text-navy-500 mb-2">Decision Result</label>
                <div className="flex gap-2 flex-wrap">
                  {DECISION_RESULTS.map(r => (
                    <button
                      key={r.id}
                      onClick={() => updateSchool(school.id, { decisionResult: r.id })}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        school.decisionResult === r.id
                          ? `${r.bg} ${r.text} ${r.border}`
                          : 'bg-white text-navy-500 border-navy-200 hover:border-navy-300'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Requirements checklist */}
          <div className="px-5 py-4 border-b border-navy-100">
            <button
              onClick={() => setShowReqs(v => !v)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-navy-500">Requirements</span>
                <span className="text-xs text-navy-400">{completedReqs}/{totalReqs}</span>
              </div>
              {showReqs ? <ChevronUp size={14} className="text-navy-400" /> : <ChevronDown size={14} className="text-navy-400" />}
            </button>
            {/* Progress bar */}
            <div className="mt-2 h-1.5 bg-navy-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${totalReqs > 0 ? (completedReqs / totalReqs) * 100 : 0}%` }}
              />
            </div>
            {showReqs && (
              <div className="mt-3 space-y-2">
                {school.requirements.map(req => (
                  <label key={req.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-colors ${
                        req.completed ? 'bg-emerald-500 border-emerald-500' : 'border-navy-300 group-hover:border-navy-500'
                      }`}
                      onClick={() => toggleRequirement(school.id, req.id)}
                    >
                      {req.completed && (
                        <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-xs transition-colors ${req.completed ? 'text-navy-400 line-through' : 'text-navy-700'}`}
                      onClick={() => toggleRequirement(school.id, req.id)}
                    >
                      {req.text}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="px-5 py-4 border-b border-navy-100">
            <label className="block text-xs font-semibold text-navy-500 mb-2">Notes</label>
            <textarea
              value={school.notes}
              onChange={e => updateSchool(school.id, { notes: e.target.value })}
              placeholder="Contacts, tips, specific requirements, scholarship info..."
              rows={4}
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm text-navy-700 placeholder:text-navy-400 outline-none focus:border-navy-400 resize-none transition-colors"
            />
          </div>

          {/* Linked program */}
          {linkedProgram && (
            <div className="px-5 py-4 border-b border-navy-100">
              <p className="text-xs font-semibold text-navy-500 mb-2">Linked Program</p>
              <Link
                to={`/programs/${linkedProgram.id}`}
                className="flex items-center gap-2 text-sm text-[#F5A623] font-medium hover:underline"
                onClick={onClose}
              >
                View program details
                <ExternalLink size={13} />
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-navy-100">
          {confirmDelete ? (
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 text-white font-semibold text-sm rounded-xl hover:bg-red-600 transition-colors"
              >
                Yes, remove school
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2.5 bg-navy-100 text-navy-700 font-semibold text-sm rounded-xl hover:bg-navy-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <Trash2 size={14} />
              Remove from tracker
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
