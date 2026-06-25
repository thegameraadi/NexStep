import { CheckSquare, Square } from 'lucide-react';
import { DOCUMENT_SECTIONS } from '../../data/visa';
import { useVisa } from '../../context/VisaContext';

function DocItem({ item }) {
  const { state, dispatch } = useVisa();
  const checked = state.checkedDocs.includes(item.id);

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_DOC', id: item.id })}
      className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
        checked ? 'border-emerald-200 bg-emerald-50' : 'border-navy-100 bg-white hover:border-navy-200'
      }`}
    >
      {checked
        ? <CheckSquare size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
        : <Square size={16} className="text-navy-300 flex-shrink-0 mt-0.5" />
      }
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <span className={`text-sm leading-snug flex-1 ${checked ? 'line-through text-navy-400' : 'text-navy-800 font-medium'}`}>
            {item.text}
          </span>
          {item.required && (
            <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5">Required</span>
          )}
        </div>
        {item.note && (
          <p className={`text-xs mt-1 leading-relaxed ${checked ? 'text-navy-400' : 'text-navy-500'}`}>{item.note}</p>
        )}
      </div>
    </button>
  );
}

export default function DocumentChecklist() {
  const { state, dispatch } = useVisa();

  const allItems = DOCUMENT_SECTIONS.flatMap(s => s.items);
  const requiredItems = allItems.filter(i => i.required);
  const checkedCount = allItems.filter(i => state.checkedDocs.includes(i.id)).length;
  const requiredChecked = requiredItems.filter(i => state.checkedDocs.includes(i.id)).length;
  const totalRequired = requiredItems.length;
  const pct = allItems.length > 0 ? Math.round((checkedCount / allItems.length) * 100) : 0;
  const ready = requiredChecked === totalRequired;

  const checkAll = () => {
    const allIds = allItems.map(i => i.id);
    allIds.forEach(id => {
      if (!state.checkedDocs.includes(id)) dispatch({ type: 'TOGGLE_DOC', id });
    });
  };

  const clearAll = () => {
    allItems.forEach(i => {
      if (state.checkedDocs.includes(i.id)) dispatch({ type: 'TOGGLE_DOC', id: i.id });
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress header */}
      <div className="bg-white rounded-2xl border border-navy-100 p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-navy-900">Document Readiness</h3>
            <p className="text-xs text-navy-500 mt-0.5">{checkedCount} / {allItems.length} documents checked · {requiredChecked}/{totalRequired} required</p>
          </div>
          {ready ? (
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">✓ All required docs ready</span>
          ) : (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">{totalRequired - requiredChecked} required missing</span>
          )}
        </div>

        <div className="h-3 bg-navy-100 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all ${ready ? 'bg-emerald-500' : 'bg-[#F5A623]'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-navy-400">{pct}% packed</p>
          <div className="flex gap-2">
            <button onClick={checkAll} className="text-xs text-navy-500 hover:text-navy-700 underline">Check all</button>
            <span className="text-navy-300">·</span>
            <button onClick={clearAll} className="text-xs text-navy-500 hover:text-navy-700 underline">Clear all</button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-navy-500">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" /> Required — must bring</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-navy-300" /> Recommended — bring if possible</span>
      </div>

      {/* Sections */}
      {DOCUMENT_SECTIONS.map(section => {
        const sChecked = section.items.filter(i => state.checkedDocs.includes(i.id)).length;
        const sTotal = section.items.length;
        const sComplete = sChecked === sTotal;

        return (
          <div key={section.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-navy-800 text-sm flex items-center gap-2">
                <span>{section.icon}</span> {section.label}
              </h3>
              <span className={`text-xs font-semibold ${sComplete ? 'text-emerald-600' : 'text-navy-400'}`}>
                {sChecked}/{sTotal}
              </span>
            </div>
            {section.items.map(item => <DocItem key={item.id} item={item} />)}
          </div>
        );
      })}

      {/* Final tip */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">💼</span>
        <div>
          <p className="text-sm font-semibold text-amber-900">Pack smart for interview day</p>
          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
            Organize documents in a clear folder with dividers: (1) Identity, (2) Application, (3) School docs, (4) Academic, (5) Financial. Keep the I-20 and DS-160 confirmation on top. Have originals + photocopies for each document.
          </p>
        </div>
      </div>
    </div>
  );
}
