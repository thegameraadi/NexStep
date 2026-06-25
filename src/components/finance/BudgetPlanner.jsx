import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { CITY_COSTS, COMMUNITY_BUDGETS } from '../../data/finance';

const BUDGET_ITEMS = [
  { id: 'rent', label: 'Rent', category: 'housing', icon: '🏠' },
  { id: 'food', label: 'Groceries & cooking', category: 'food', icon: '🛒' },
  { id: 'eatOut', label: 'Eating out', category: 'food', icon: '🍜' },
  { id: 'transport', label: 'Transport', category: 'transport', icon: '🚇' },
  { id: 'utilities', label: 'Utilities (electricity, gas, internet)', category: 'utilities', icon: '💡' },
  { id: 'phone', label: 'Phone plan', category: 'utilities', icon: '📱' },
  { id: 'health', label: 'Health insurance (out-of-pocket)', category: 'health', icon: '🏥' },
  { id: 'entertainment', label: 'Entertainment & subscriptions', category: 'misc', icon: '🎬' },
  { id: 'clothing', label: 'Clothing & personal care', category: 'misc', icon: '👔' },
  { id: 'misc', label: 'Miscellaneous', category: 'misc', icon: '📦' },
];

const HOUSING_LABELS = { shared: 'Shared', studio: 'Studio', oneBed: '1-Bedroom' };

function fmt(n) {
  return '$' + Math.round(n).toLocaleString();
}

function BudgetRow({ item, value, onChange }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="text-lg flex-shrink-0">{item.icon}</span>
      <span className="flex-1 text-sm text-navy-700">{item.label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-navy-400">$</span>
        <input
          type="number"
          value={value}
          onChange={e => onChange(Math.max(0, Number(e.target.value)))}
          className="w-24 border border-navy-200 rounded-lg px-2 py-1.5 text-sm text-right text-navy-900 outline-none focus:border-navy-400 transition-colors"
        />
        <span className="text-xs text-navy-400">/mo</span>
      </div>
    </div>
  );
}

function CommunityBudgetCard({ budget }) {
  const total = Object.values(budget.items).reduce((a, b) => a + b, 0);
  return (
    <div className="bg-white rounded-xl border border-navy-100 p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-semibold text-navy-900 text-sm">{budget.author}</p>
          <p className="text-xs text-navy-400">{budget.year}</p>
        </div>
        <span className="text-sm font-bold text-navy-900">{fmt(total)}/mo</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
        {Object.entries(budget.items).map(([key, val]) => {
          const item = BUDGET_ITEMS.find(i => i.id === key) || { label: key, icon: '•' };
          return (
            <div key={key} className="flex items-center justify-between text-xs">
              <span className="text-navy-500">{item.icon} {item.label || key}</span>
              <span className="font-medium text-navy-700">{val === 0 ? '—' : fmt(val)}</span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-navy-500 leading-relaxed italic">{budget.note}</p>
    </div>
  );
}

export default function BudgetPlanner() {
  const [cityId, setCityId] = useState('');
  const [housingType, setHousingType] = useState('shared');
  const [customValues, setCustomValues] = useState({});
  const [showCommunity, setShowCommunity] = useState(false);

  const selectedCity = CITY_COSTS.find(c => c.id === cityId);

  const defaultValues = useMemo(() => {
    if (!selectedCity) return {};
    return {
      rent: selectedCity.rent[housingType] || selectedCity.rent.shared,
      food: Math.round(selectedCity.food * 0.7),
      eatOut: Math.round(selectedCity.food * 0.3),
      transport: selectedCity.transport,
      utilities: selectedCity.utilities,
      phone: 30,
      health: Math.round(2200 / 12),
      entertainment: 80,
      clothing: 60,
      misc: selectedCity.misc,
    };
  }, [selectedCity, housingType]);

  const values = useMemo(() => {
    return { ...defaultValues, ...customValues };
  }, [defaultValues, customValues]);

  const total = useMemo(() => Object.values(values).reduce((a, b) => a + (b || 0), 0), [values]);

  const updateItem = (id, val) => {
    setCustomValues(prev => ({ ...prev, [id]: val }));
  };

  const reset = () => setCustomValues({});

  const communityBudgets = COMMUNITY_BUDGETS.filter(b => b.city === cityId);

  const annualTotal = total * 12;

  return (
    <div className="space-y-6">
      {/* City + housing selector */}
      <div className="bg-white rounded-2xl border border-navy-100 p-5">
        <h3 className="font-bold text-navy-900 mb-4">Configure Your Budget</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">City</label>
            <select
              value={cityId}
              onChange={e => { setCityId(e.target.value); setCustomValues({}); }}
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-navy-400"
            >
              <option value="">Select a city...</option>
              {CITY_COSTS.sort((a, b) => a.display.localeCompare(b.display)).map(c => (
                <option key={c.id} value={c.id}>{c.display}</option>
              ))}
            </select>
          </div>
          {selectedCity && (
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Housing type</label>
              <div className="flex gap-2">
                {Object.entries(HOUSING_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => { setHousingType(key); setCustomValues(prev => { const n = { ...prev }; delete n.rent; return n; }); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                      housingType === key ? 'bg-navy-900 text-white border-navy-900' : 'border-navy-200 text-navy-600 hover:border-navy-400'
                    }`}
                  >
                    {label}
                    <span className="block font-normal mt-0.5">{fmt(selectedCity.rent[key])}/mo</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {!selectedCity ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-navy-200">
          <div className="text-4xl mb-3">📊</div>
          <p className="font-semibold text-navy-700">Select a city to build your budget template</p>
          <p className="text-xs text-navy-400 mt-1">Pre-filled with community-sourced averages. Fully adjustable.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Budget editor */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-navy-100">
                <h3 className="font-bold text-navy-900">Monthly Budget — {selectedCity.display}</h3>
                {Object.keys(customValues).length > 0 && (
                  <button onClick={reset} className="text-xs text-navy-400 hover:text-navy-600 underline">Reset to defaults</button>
                )}
              </div>
              <div className="px-5 divide-y divide-navy-50">
                {BUDGET_ITEMS.map(item => (
                  <BudgetRow
                    key={item.id}
                    item={item}
                    value={values[item.id] || 0}
                    onChange={val => updateItem(item.id, val)}
                  />
                ))}
              </div>
              <div className="px-5 py-4 border-t border-navy-200 bg-navy-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-navy-900 text-lg">{fmt(total)} / month</p>
                    <p className="text-xs text-navy-500 mt-0.5">{fmt(annualTotal)} / year</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-navy-500">2-year program</p>
                    <p className="font-bold text-navy-700">{fmt(annualTotal * 2)} total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown + community */}
          <div className="xl:col-span-1 space-y-4">
            {/* Breakdown chart (simple bar chart) */}
            <div className="bg-white rounded-2xl border border-navy-100 p-5">
              <h3 className="font-bold text-navy-900 mb-4 text-sm">Cost Breakdown</h3>
              {BUDGET_ITEMS.map(item => {
                const val = values[item.id] || 0;
                const pct = total > 0 ? (val / total) * 100 : 0;
                return (
                  <div key={item.id} className="mb-2.5">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-navy-600">{item.icon} {item.label}</span>
                      <span className="font-medium text-navy-700">{fmt(val)}</span>
                    </div>
                    <div className="h-1.5 bg-navy-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F5A623] rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Community budgets */}
            <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
              <button
                onClick={() => setShowCommunity(v => !v)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-navy-50 transition-colors"
              >
                <span className="font-bold text-navy-900 text-sm">
                  Real budgets from {selectedCity.display}
                  <span className="ml-2 text-xs font-normal text-navy-400">({communityBudgets.length})</span>
                </span>
                <ChevronDown size={15} className={`text-navy-400 transition-transform ${showCommunity ? 'rotate-180' : ''}`} />
              </button>
              {showCommunity && (
                communityBudgets.length > 0 ? (
                  <div className="p-4 pt-0 space-y-3">
                    {communityBudgets.map(b => <CommunityBudgetCard key={b.id} budget={b} />)}
                  </div>
                ) : (
                  <div className="px-5 pb-4 text-xs text-navy-400">
                    No community budgets submitted for {selectedCity.display} yet.
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
