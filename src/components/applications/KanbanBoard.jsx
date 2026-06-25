import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';
import { PIPELINE_STATUSES, DECISION_RESULTS } from '../../data/applications';
import SchoolDetailPanel from './SchoolDetailPanel';
import AddSchoolModal from './AddSchoolModal';

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.ceil((d - now) / 86400000);
}

function DeadlineChip({ deadline }) {
  const days = daysUntil(deadline);
  if (days === null) return <span className="text-xs text-navy-400">No deadline</span>;
  if (days < 0) return <span className="text-xs font-medium text-red-500">Overdue</span>;
  if (days === 0) return <span className="text-xs font-bold text-red-500">Today!</span>;
  const cls = days <= 14 ? 'text-red-500 font-semibold' : days <= 30 ? 'text-amber-600 font-medium' : 'text-navy-400';
  return <span className={`text-xs ${cls}`}>{days}d left</span>;
}

const STATUS_STYLES = {
  Researching: { bar: 'bg-navy-700', light: 'bg-navy-50', text: 'text-navy-700', border: 'border-navy-100' },
  Preparing:   { bar: 'bg-amber-400', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  Submitted:   { bar: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  Interview:   { bar: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
  Decision:    { bar: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
};

function KanbanCard({ school, onClick }) {
  const completedReqs = school.requirements.filter(r => r.completed).length;
  const totalReqs = school.requirements.length;
  const pct = totalReqs > 0 ? Math.round((completedReqs / totalReqs) * 100) : 0;
  const decisionResult = school.decisionResult ? DECISION_RESULTS.find(r => r.id === school.decisionResult) : null;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-navy-100 p-3.5 cursor-pointer hover:shadow-card hover:border-navy-200 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="font-semibold text-navy-900 text-sm leading-tight group-hover:text-navy-700 transition-colors line-clamp-2">
          {school.schoolName}
        </p>
      </div>
      {school.programName && (
        <p className="text-xs text-navy-500 mb-2 line-clamp-1">{school.programName}</p>
      )}

      {decisionResult && (
        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${decisionResult.bg} ${decisionResult.text}`}>
          {decisionResult.label}
        </span>
      )}

      {/* Requirements progress */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-1 bg-navy-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-navy-400 flex-shrink-0">{completedReqs}/{totalReqs}</span>
      </div>

      <DeadlineChip deadline={school.deadline} />
    </div>
  );
}

function KanbanColumn({ status, schools, onCardClick, onAddClick }) {
  const style = STATUS_STYLES[status.id];
  return (
    <div className="flex-shrink-0 w-56 flex flex-col">
      {/* Column header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${style.bar}`} />
          <span className="text-xs font-semibold text-navy-700">{status.emoji} {status.label}</span>
          <span className="text-xs text-navy-400 bg-navy-100 px-1.5 py-0.5 rounded-full">{schools.length}</span>
        </div>
        <button
          onClick={onAddClick}
          className="p-1 rounded-lg text-navy-400 hover:bg-navy-100 hover:text-navy-700 transition-colors"
          title="Add school"
        >
          <Plus size={13} />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 flex-1">
        {schools.map(school => (
          <KanbanCard key={school.id} school={school} onClick={() => onCardClick(school)} />
        ))}
        {schools.length === 0 && (
          <div className={`rounded-xl border-2 border-dashed ${style.border} p-4 text-center`}>
            <p className="text-xs text-navy-400">No schools here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const { schools } = useApplications();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const grouped = PIPELINE_STATUSES.reduce((acc, s) => {
    acc[s.id] = schools.filter(sc => sc.status === s.id);
    return acc;
  }, {});

  return (
    <>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {PIPELINE_STATUSES.map(status => (
            <KanbanColumn
              key={status.id}
              status={status}
              schools={grouped[status.id]}
              onCardClick={setSelectedSchool}
              onAddClick={() => setShowAddModal(true)}
            />
          ))}
        </div>
      </div>

      {/* Mobile list fallback (show on small screens below kanban) */}
      {schools.length === 0 && (
        <div className="mt-8 text-center py-16 border-2 border-dashed border-navy-200 rounded-2xl">
          <div className="text-4xl mb-3">🏫</div>
          <h3 className="font-bold text-navy-900 text-base mb-2">No schools tracked yet</h3>
          <p className="text-navy-500 text-sm mb-5">Add schools manually or import from your Program Explorer shortlist.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-navy-800 transition-colors"
          >
            <Plus size={15} />
            Track Your First School
          </button>
        </div>
      )}

      {selectedSchool && (
        <SchoolDetailPanel
          school={selectedSchool}
          onClose={() => setSelectedSchool(null)}
        />
      )}

      {showAddModal && (
        <AddSchoolModal onClose={() => setShowAddModal(false)} />
      )}
    </>
  );
}
