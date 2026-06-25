import { useState, useEffect } from 'react';
import { X, CheckCircle2, Circle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

const STORAGE_KEY = 'nexstep_checklist_ticks';

function loadTicks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'); } catch { return {}; }
}
function saveTicks(t) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(t)); } catch {}
}

function ChecklistItem({ stageId, item }) {
  const key = `${stageId}-${item.id}`;
  const [ticks, setTicks] = useState(loadTicks);
  const [expanded, setExpanded] = useState(false);
  const done = !!ticks[key];

  const toggle = () => {
    const next = { ...ticks, [key]: !done ? true : undefined };
    if (!next[key]) delete next[key];
    setTicks(next);
    saveTicks(next);
  };

  return (
    <div className={`rounded-xl border transition-colors ${done ? 'border-emerald-200 bg-emerald-50/50' : 'border-navy-100 bg-white'}`}>
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={toggle}
          className={`mt-0.5 flex-shrink-0 transition-colors ${done ? 'text-emerald-500' : 'text-navy-300 hover:text-navy-600'}`}
        >
          {done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium leading-snug ${done ? 'line-through text-navy-400' : 'text-navy-800'}`}>
            {item.text}
          </p>
          {item.detail && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 mt-1.5 text-xs text-navy-400 hover:text-navy-700 transition-colors"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? 'Hide detail' : 'See detail'}
            </button>
          )}
          {expanded && item.detail && (
            <p className="mt-2 text-xs text-navy-500 leading-relaxed bg-navy-50 rounded-lg p-3">
              {item.detail}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChecklistModal({ stage, onClose }) {
  const [ticks] = useState(loadTicks);
  const doneCount = stage.checklist.filter((item) => !!ticks[`${stage.id}-${item.id}`]).length;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-up">
        {/* Handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1.5 bg-navy-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pt-4 pb-4 border-b border-navy-100 flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{stage.emoji}</span>
                <span className="text-xs font-bold text-navy-500 uppercase tracking-widest">Stage {stage.id}</span>
              </div>
              <h2 className="font-bold text-navy-900 text-lg">{stage.name}</h2>
              <p className="text-xs text-navy-500 mt-0.5">{doneCount} of {stage.checklist.length} tasks done</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-navy-50 text-navy-500 flex-shrink-0">
              <X size={18} />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-3 h-1.5 bg-navy-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(doneCount / stage.checklist.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {stage.checklist.map((item) => (
            <ChecklistItem key={item.id} stageId={stage.id} item={item} />
          ))}

          {/* Tips */}
          {stage.tips.length > 0 && (
            <div className="mt-5 pt-5 border-t border-navy-100 space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-[#F5A623]" />
                <span className="text-xs font-bold text-navy-700 uppercase tracking-wide">Tips from the community</span>
              </div>
              {stage.tips.map((tip, i) => (
                <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-navy-700 leading-relaxed">"{tip}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
