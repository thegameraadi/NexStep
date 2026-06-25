import { useState } from 'react';
import { CheckSquare, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { ARRIVAL_CHECKLIST } from '../../data/predeparture';
import { usePreDeparture } from '../../context/PreDepartureContext';

const PRIORITY_STYLES = {
  critical: { badge: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
  high: { badge: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-400' },
  medium: { badge: 'bg-navy-100 text-navy-600 border-navy-200', dot: 'bg-navy-400' },
  normal: { badge: 'bg-navy-100 text-navy-500 border-navy-200', dot: 'bg-navy-300' },
};

const TIME_GROUPS = ['Day 1–2', 'Days 2–3', 'Days 3–5', 'Week 1–2', 'Month 1'];

function ChecklistItem({ item }) {
  const { state, dispatch } = usePreDeparture();
  const checked = state.checkedArrivalItems.includes(item.id);
  const [expanded, setExpanded] = useState(false);
  const ps = PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.medium;

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${checked ? 'border-emerald-200 bg-emerald-50' : 'border-navy-100 bg-white'}`}>
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_ARRIVAL_ITEM', id: item.id })}
          className="mt-0.5 flex-shrink-0"
          aria-label={checked ? 'Uncheck' : 'Check'}
        >
          {checked
            ? <CheckSquare size={18} className="text-emerald-500" />
            : <Square size={18} className="text-navy-300" />
          }
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 justify-between">
            <p className={`text-sm font-semibold leading-snug ${checked ? 'line-through text-navy-400' : 'text-navy-900'}`}>
              {item.icon} {item.title}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-shrink-0 p-1 text-navy-400 hover:text-navy-600"
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {item.priority !== 'normal' && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${ps.badge}`}>
                {item.priority.toUpperCase()}
              </span>
            )}
            <span className="text-xs text-navy-400 capitalize">{item.category}</span>
          </div>
          {!expanded && (
            <p className={`text-xs mt-1 leading-relaxed line-clamp-1 ${checked ? 'text-navy-400' : 'text-navy-500'}`}>
              {item.what}
            </p>
          )}
        </div>
      </div>
      {expanded && (
        <div className="border-t border-navy-100 px-4 pb-4 pt-3 space-y-3">
          <div>
            <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1">What it is</p>
            <p className="text-sm text-navy-700 leading-relaxed">{item.what}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1">Why it matters</p>
            <p className="text-sm text-navy-700 leading-relaxed">{item.why}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1">How to do it</p>
            <p className="text-sm text-navy-700 leading-relaxed">{item.how}</p>
          </div>
          {item.tip && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs font-semibold text-amber-700 mb-0.5">💡 Tip</p>
              <p className="text-xs text-amber-800 leading-relaxed">{item.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ArrivalChecklist() {
  const { state, dispatch } = usePreDeparture();
  const allItems = ARRIVAL_CHECKLIST;
  const checkedCount = allItems.filter(i => state.checkedArrivalItems.includes(i.id)).length;
  const pct = allItems.length > 0 ? Math.round((checkedCount / allItems.length) * 100) : 0;
  const criticalItems = allItems.filter(i => i.priority === 'critical');
  const criticalChecked = criticalItems.filter(i => state.checkedArrivalItems.includes(i.id)).length;
  const allCriticalDone = criticalChecked === criticalItems.length;

  const clearAll = () => {
    allItems.forEach(i => {
      if (state.checkedArrivalItems.includes(i.id)) dispatch({ type: 'TOGGLE_ARRIVAL_ITEM', id: i.id });
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-white border border-navy-100 rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-navy-900">First Month Checklist</h3>
            <p className="text-xs text-navy-500 mt-0.5">
              {checkedCount} / {allItems.length} complete · {criticalChecked}/{criticalItems.length} critical done
            </p>
          </div>
          {allCriticalDone ? (
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              ✓ All critical done
            </span>
          ) : (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-red-100 text-red-700 border border-red-200">
              {criticalItems.length - criticalChecked} critical remaining
            </span>
          )}
        </div>
        <div className="h-3 bg-navy-100 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all ${allCriticalDone ? 'bg-emerald-500' : 'bg-[#F5A623]'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-navy-400">{pct}% complete</p>
          <button onClick={clearAll} className="text-xs text-navy-400 hover:text-navy-600 underline">Reset all</button>
        </div>
      </div>

      {/* Priority legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-navy-500">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical — legal / financial / health consequences</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> High priority</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-navy-400" /> Medium — do when you can</span>
      </div>

      {/* Grouped by time */}
      {TIME_GROUPS.map(group => {
        const items = allItems.filter(i => i.timeGroup === group);
        if (!items.length) return null;
        const groupChecked = items.filter(i => state.checkedArrivalItems.includes(i.id)).length;
        const groupComplete = groupChecked === items.length;
        return (
          <div key={group} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className={`font-bold text-sm flex items-center gap-2 ${groupComplete ? 'text-emerald-600' : 'text-navy-800'}`}>
                {groupComplete ? '✓' : '⏱'} {group}
              </h3>
              <span className={`text-xs font-semibold ${groupComplete ? 'text-emerald-600' : 'text-navy-400'}`}>
                {groupChecked}/{items.length}
              </span>
            </div>
            {items.map(item => <ChecklistItem key={item.id} item={item} />)}
          </div>
        );
      })}
    </div>
  );
}
