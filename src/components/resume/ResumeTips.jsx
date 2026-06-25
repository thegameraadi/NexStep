import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { RESUME_TIPS, COMMON_MISTAKES, SAMPLE_STRUCTURES } from '../../data/applications';

function TipsSection({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-navy-100 overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-navy-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{section.icon}</span>
          <span className="font-semibold text-navy-900">{section.section}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-navy-400" /> : <ChevronDown size={16} className="text-navy-400" />}
      </button>
      {open && (
        <ul className="px-5 pb-4 space-y-2.5 border-t border-navy-100 pt-4">
          {section.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-navy-600">
              <ChevronRight size={14} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MistakesSection() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-navy-100">
        <h3 className="font-bold text-navy-900">⚠️ Common Mistakes</h3>
        <p className="text-xs text-navy-500 mt-0.5">Community-sourced from rejected and admitted applicants</p>
      </div>
      <div className="divide-y divide-navy-50">
        {COMMON_MISTAKES.map(item => (
          <div key={item.id}>
            <button
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-navy-50 transition-colors text-left gap-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
                <span className="text-sm text-navy-700">{item.mistake}</span>
              </div>
              {expanded === item.id
                ? <ChevronUp size={14} className="text-navy-400 flex-shrink-0" />
                : <ChevronDown size={14} className="text-navy-400 flex-shrink-0" />
              }
            </button>
            {expanded === item.id && (
              <div className="px-5 pb-3.5 flex items-start gap-2.5">
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                <span className="text-sm text-navy-600">{item.fix}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StructuresSection() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-navy-900 mb-1">📋 Sample Structures</h3>
        <p className="text-xs text-navy-500">Section order recommendations by application type</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SAMPLE_STRUCTURES.map(s => (
          <div
            key={s.id}
            onClick={() => setSelected(selected === s.id ? null : s.id)}
            className={`bg-white rounded-2xl border cursor-pointer transition-all p-4 ${
              selected === s.id ? 'border-navy-400 shadow-card' : 'border-navy-100 hover:border-navy-200'
            }`}
          >
            <p className="font-bold text-navy-900 text-sm mb-1">{s.title}</p>
            <p className="text-xs text-navy-500 leading-relaxed mb-3">{s.description}</p>
            <ol className="space-y-1.5">
              {s.sections.map((sec, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-navy-100 text-navy-600 text-xs flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs text-navy-700">{sec}</span>
                </li>
              ))}
            </ol>
            {selected === s.id && (
              <div className="mt-3 pt-3 border-t border-navy-100">
                <p className="text-xs text-navy-600 leading-relaxed">
                  <span className="font-semibold text-[#F5A623]">Note: </span>
                  {s.note}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResumeTips() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-navy-100 p-5">
        <h3 className="font-bold text-navy-900 mb-1">Resume for US Graduate Applications</h3>
        <p className="text-sm text-navy-500 leading-relaxed">
          US graduate programs expect a concise, achievement-focused resume — not a CV with every detail of your life. These tips are sourced from successful applicants and admissions professionals.
        </p>
      </div>

      {/* Tips by section */}
      <div>
        <h3 className="font-bold text-navy-900 mb-3">Section-by-Section Tips</h3>
        <div className="space-y-2">
          {RESUME_TIPS.map(section => (
            <TipsSection key={section.section} section={section} />
          ))}
        </div>
      </div>

      <MistakesSection />
      <StructuresSection />
    </div>
  );
}
