import { useState } from 'react';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import {
  HOUSING_COMPARE,
  HOUSING_SEARCH_STEPS,
  HOUSING_COMMUNITY_TIPS,
  HOUSING_SCAMS,
  HOUSING_FACEBOOK_GROUPS,
} from '../../data/predeparture';

const SEVERITY_STYLES = {
  high: { badge: 'bg-red-100 text-red-700 border-red-200', border: 'border-l-red-500' },
  medium: { badge: 'bg-amber-100 text-amber-700 border-amber-200', border: 'border-l-amber-400' },
};

function ScamCard({ scam }) {
  const [open, setOpen] = useState(false);
  const s = SEVERITY_STYLES[scam.severity];
  return (
    <div className={`bg-white border border-navy-100 border-l-4 ${s.border} rounded-2xl overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-navy-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{scam.icon}</span>
          <div>
            <p className="font-semibold text-navy-900 text-sm">{scam.title}</p>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${s.badge}`}>
              {scam.severity === 'high' ? 'HIGH RISK' : 'MEDIUM RISK'}
            </span>
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-navy-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-navy-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-navy-100 pt-3">
          <div>
            <p className="text-xs font-semibold text-navy-600 uppercase tracking-wide mb-1">How it works</p>
            <p className="text-sm text-navy-700 leading-relaxed">{scam.how}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">Red flags</p>
            <ul className="space-y-1">
              {scam.redFlags.map((f, i) => (
                <li key={i} className="text-sm text-navy-700 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 flex-shrink-0">⚠</span>{f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-emerald-700 mb-0.5">How to protect yourself</p>
            <p className="text-sm text-emerald-800 leading-relaxed">{scam.protection}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function CompareCard({ data }) {
  return (
    <div className="bg-white border border-navy-100 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{data.icon}</span>
        <div>
          <h3 className="font-bold text-navy-900">{data.label}</h3>
          <p className="text-xs text-navy-500 font-medium">{data.costRange}</p>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Pros</p>
        <ul className="space-y-1.5">
          {data.pros.map((p, i) => (
            <li key={i} className="text-sm text-navy-700 flex items-start gap-2">
              <CheckCircle size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />{p}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Cons</p>
        <ul className="space-y-1.5">
          {data.cons.map((c, i) => (
            <li key={i} className="text-sm text-navy-700 flex items-start gap-2">
              <span className="text-red-400 mt-0.5 flex-shrink-0 text-xs">✕</span>{c}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-3 border-t border-navy-100">
        <p className="text-xs font-semibold text-navy-500 mb-1">Best for</p>
        <p className="text-sm text-navy-700 leading-relaxed">{data.bestFor}</p>
      </div>
    </div>
  );
}

export default function HousingGuide() {
  const [activeSection, setActiveSection] = useState('compare');

  const sections = [
    { id: 'compare', label: 'On vs Off Campus' },
    { id: 'steps', label: 'Remote Search Guide' },
    { id: 'tips', label: 'School Tips' },
    { id: 'scams', label: 'Scam Alerts' },
    { id: 'groups', label: 'FB Groups' },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-nav */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeSection === s.id
                ? 'bg-navy-900 text-white'
                : 'bg-white border border-navy-200 text-navy-600 hover:border-navy-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'compare' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <CompareCard data={HOUSING_COMPARE.onCampus} />
            <CompareCard data={HOUSING_COMPARE.offCampus} />
          </div>
          <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-navy-800 mb-1">💡 Our recommendation for Year 1</p>
            <p className="text-sm text-navy-600 leading-relaxed">
              On-campus housing wins for first-year international students — the reduced cognitive load during your first semester is worth the price premium. Apply immediately after admission; most schools' housing waitlists fill within weeks. Transition to off-campus in Year 2 once you've built your network.
            </p>
          </div>
        </div>
      )}

      {activeSection === 'steps' && (
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">Finding housing remotely from India/China before arriving is high-risk. Follow these steps to minimize the chance of getting scammed or ending up in a bad situation.</p>
          </div>
          <div className="space-y-3">
            {HOUSING_SEARCH_STEPS.map(step => (
              <div key={step.step} className="bg-white border border-navy-100 rounded-2xl p-4 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {step.step}
                </span>
                <div>
                  <p className="font-semibold text-navy-900 text-sm mb-1">{step.title}</p>
                  <p className="text-sm text-navy-600 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'tips' && (
        <div className="space-y-3">
          <p className="text-sm text-navy-500">Housing advice from current students at each school — sourced from the NexStep community.</p>
          {HOUSING_COMMUNITY_TIPS.map((tip, i) => (
            <div key={i} className="bg-white border border-navy-100 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-navy-900 text-sm">{tip.school}</p>
                <span className="text-xs text-navy-400">{tip.author}</span>
              </div>
              <p className="text-xs text-navy-500 mb-2">{tip.city}</p>
              <p className="text-sm text-navy-700 leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'scams' && (
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">International students lose thousands of dollars to housing scams every year. These are the six most common — know them before you search.</p>
          </div>
          {HOUSING_SCAMS.map(scam => <ScamCard key={scam.id} scam={scam} />)}
        </div>
      )}

      {activeSection === 'groups' && (
        <div className="space-y-3">
          <p className="text-sm text-navy-500">Official and unofficial Facebook groups where students find roommates and housing for each school.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {HOUSING_FACEBOOK_GROUPS.map((school, i) => (
              <div key={i} className="bg-white border border-navy-100 rounded-2xl p-4">
                <p className="font-semibold text-navy-900 text-sm mb-2">{school.school}</p>
                <ul className="space-y-1.5">
                  {school.groups.map((g, j) => (
                    <li key={j} className="text-xs text-navy-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] flex-shrink-0" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-navy-800 mb-1">How to find your school's groups</p>
            <p className="text-sm text-navy-600">Search "[ School Name ] Class of 2025 housing" or "[ School Name ] international students" on Facebook. Also search Reddit — r/[SchoolName] subreddits often have roommate megathreads at the start of each academic year.</p>
          </div>
        </div>
      )}
    </div>
  );
}
