import { useState } from 'react';
import { CheckCircle2, Clock, Users, ChevronRight, Zap } from 'lucide-react';
import ChecklistModal from './ChecklistModal';

// How many fake "community members" per stage (based on how far in process)
const COMMUNITY = [1420, 2810, 3240, 2190, 4180, 1680, 892, 1240, 780, 520];

export default function StageCard({ stage, status, isLast }) {
  const [modalOpen, setModalOpen] = useState(false);

  const isComplete = status === 'complete';
  const isActive = status === 'active';
  const isUpcoming = status === 'upcoming';

  return (
    <>
      <div className="flex gap-4 md:gap-6">
        {/* Timeline column */}
        <div className="flex flex-col items-center flex-shrink-0">
          {/* Node */}
          <div
            className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 flex-shrink-0 transition-all ${
              isComplete
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                : isActive
                ? 'bg-[#F5A623] text-navy-900 shadow-lg shadow-amber-300/40 ring-4 ring-amber-200'
                : 'bg-navy-100 text-navy-400'
            }`}
          >
            {isActive && (
              <span className="absolute inset-0 rounded-full bg-[#F5A623] animate-ping opacity-30" />
            )}
            {isComplete ? (
              <CheckCircle2 size={20} className="text-white" />
            ) : (
              <span>{stage.id}</span>
            )}
          </div>

          {/* Connecting line */}
          {!isLast && (
            <div className={`w-0.5 flex-1 mt-1 min-h-[40px] ${isComplete ? 'bg-emerald-300' : 'bg-navy-100'}`} />
          )}
        </div>

        {/* Card */}
        <div
          className={`flex-1 mb-6 rounded-2xl border p-5 transition-all ${
            isActive
              ? 'border-amber-300 bg-amber-50/60 shadow-card'
              : isComplete
              ? 'border-emerald-100 bg-emerald-50/30'
              : 'border-navy-100 bg-white'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{stage.emoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-base leading-tight ${isUpcoming ? 'text-navy-500' : 'text-navy-900'}`}>
                    {stage.name}
                  </h3>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-200 px-2 py-0.5 rounded-full">
                      <Zap size={9} />
                      You are here
                    </span>
                  )}
                  {isComplete && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Complete
                    </span>
                  )}
                </div>
                <span className="text-xs text-navy-400">Stage {stage.id}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm leading-relaxed mb-4 ${isUpcoming ? 'text-navy-400' : 'text-navy-600'}`}>
            {stage.shortDesc}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-navy-400">
              <Clock size={12} />
              {stage.duration}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-navy-400">
              <Users size={12} />
              {COMMUNITY[stage.id - 1].toLocaleString()} people at this stage
            </div>
          </div>

          {/* CTA */}
          {!isUpcoming && (
            <button
              onClick={() => setModalOpen(true)}
              className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-navy-900 text-white hover:bg-navy-800 shadow-sm'
                  : 'bg-white border border-navy-200 text-navy-700 hover:bg-navy-50 hover:border-navy-300'
              }`}
            >
              What to do now
              <ChevronRight size={14} />
            </button>
          )}
          {isUpcoming && (
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-navy-400 hover:text-navy-600 transition-colors"
            >
              Preview tasks
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      {modalOpen && (
        <ChecklistModal stage={stage} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
