import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { APPLICATION_STATUSES } from '../../data/programs';
import { useMyList } from '../../context/MyListContext';

export default function StatusSelector({ programId, compact = false }) {
  const { getStatus, setStatus } = useMyList();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = getStatus(programId);
  const currentDef = APPLICATION_STATUSES.find((s) => s.value === current) ?? APPLICATION_STATUSES[0];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors hover:opacity-80 ${currentDef.color} ${
          compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1.5'
        }`}
      >
        {currentDef.label}
        <ChevronDown size={compact ? 10 : 12} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-white rounded-xl shadow-card-hover border border-navy-100 py-1 min-w-[160px]">
          {APPLICATION_STATUSES.map(({ value, label, color }) => (
            <button
              key={value}
              onClick={(e) => { e.stopPropagation(); setStatus(programId, value); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-navy-50 transition-colors ${
                value === current ? 'bg-navy-50' : ''
              }`}
            >
              <span className={`px-2 py-0.5 rounded-full ${color}`}>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
