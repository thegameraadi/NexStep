import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { INSURANCE_TERMS, INSURANCE_COMPARISON, INSURANCE_COVERED } from '../../data/predeparture';

export default function Insurance() {
  const [activeSection, setActiveSection] = useState('glossary');

  const sections = [
    { id: 'glossary', label: 'Key Terms' },
    { id: 'compare', label: 'School vs Marketplace' },
    { id: 'covered', label: "What's Covered" },
  ];

  return (
    <div className="space-y-6">
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

      {activeSection === 'glossary' && (
        <div className="space-y-3">
          <p className="text-sm text-navy-500">US health insurance has its own vocabulary. Understanding these terms will help you make sense of your plan documents.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {INSURANCE_TERMS.map((t, i) => (
              <div key={i} className="bg-white border border-navy-100 rounded-2xl p-4">
                <p className="font-bold text-navy-900 text-sm mb-2">{t.term}</p>
                <p className="text-sm text-navy-600 leading-relaxed">{t.definition}</p>
              </div>
            ))}
          </div>
          <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-navy-800 mb-1">The key number to know</p>
            <p className="text-sm text-navy-600">
              Your <strong>out-of-pocket maximum</strong> is your worst-case scenario. Once you hit it, insurance pays 100%. For most student plans this is $3,000–$8,000/year. A single hospitalization without insurance can exceed $30,000. Insurance is non-negotiable.
            </p>
          </div>
        </div>
      )}

      {activeSection === 'compare' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[INSURANCE_COMPARISON.schoolPlan, INSURANCE_COMPARISON.marketplace].map((plan, i) => (
              <div key={i} className={`bg-white border rounded-2xl p-5 flex flex-col gap-4 ${i === 0 ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-navy-100'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{plan.icon}</span>
                  <div>
                    <h3 className="font-bold text-navy-900">{plan.label}</h3>
                    <p className="text-xs font-medium text-navy-500">{plan.typicalCost}</p>
                  </div>
                  {i === 0 && <span className="ml-auto text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">Recommended</span>}
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Pros</p>
                  <ul className="space-y-1.5">
                    {plan.pros.map((p, j) => (
                      <li key={j} className="text-sm text-navy-700 flex items-start gap-2">
                        <CheckCircle size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Cons</p>
                  <ul className="space-y-1.5">
                    {plan.cons.map((c, j) => (
                      <li key={j} className="text-sm text-navy-700 flex items-start gap-2">
                        <XCircle size={12} className="text-red-400 mt-0.5 flex-shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`mt-auto pt-3 border-t border-navy-100 rounded-xl p-3 ${i === 0 ? 'bg-emerald-50' : 'bg-navy-50'}`}>
                  <p className={`text-xs leading-relaxed ${i === 0 ? 'text-emerald-800' : 'text-navy-700'}`}>
                    <span className="font-semibold">Verdict: </span>{plan.verdict}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'covered' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-emerald-200 rounded-2xl p-5">
              <h3 className="font-bold text-navy-900 mb-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" /> Typically covered
              </h3>
              <ul className="space-y-2">
                {INSURANCE_COVERED.typicallyCovered.map((item, i) => (
                  <li key={i} className="text-sm text-navy-700 flex items-start gap-2">
                    <CheckCircle size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-red-100 rounded-2xl p-5">
              <h3 className="font-bold text-navy-900 mb-3 flex items-center gap-2">
                <XCircle size={16} className="text-red-400" /> Often NOT covered
              </h3>
              <ul className="space-y-2">
                {INSURANCE_COVERED.oftenNotCovered.map((item, i) => (
                  <li key={i} className="text-sm text-navy-700 flex items-start gap-2">
                    <XCircle size={12} className="text-red-400 mt-0.5 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="font-bold text-amber-900 mb-3">📋 International student notes</h3>
            <ul className="space-y-2">
              {INSURANCE_COVERED.internationalStudentNotes.map((note, i) => (
                <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5 flex-shrink-0">→</span>{note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
