import { useState } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { STAGES } from '../../data/roadmap';
import { useUser } from '../../context/UserContext';

export default function StageUpdater() {
  const { profile, setStage } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-navy-300 hover:text-white transition-colors bg-navy-800 hover:bg-navy-700 px-3 py-2 rounded-lg"
      >
        <RefreshCw size={12} />
        Update my stage
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-30 bg-white rounded-2xl shadow-card-hover border border-navy-100 py-2 w-64">
          <p className="text-[10px] font-bold text-navy-400 uppercase tracking-widest px-4 py-2">
            Move to stage
          </p>
          {STAGES.map((stage) => (
            <button
              key={stage.id}
              onClick={() => { setStage(stage.id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-navy-50 transition-colors ${
                profile.currentStage === stage.id ? 'bg-amber-50' : ''
              }`}
            >
              <span className="text-base">{stage.emoji}</span>
              <span className={`font-medium flex-1 text-left ${profile.currentStage === stage.id ? 'text-amber-700' : 'text-navy-700'}`}>
                {stage.name}
              </span>
              {profile.currentStage === stage.id && (
                <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">current</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
