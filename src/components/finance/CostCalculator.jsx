import { useMemo, useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { CITY_COSTS } from '../../data/finance';
import { PROGRAMS } from '../../data/programs';

const HOUSING_LABELS = { shared: 'Shared apartment (per room)', studio: 'Studio apartment', oneBed: '1-bedroom apartment' };
const ANNUAL_FIXED = { healthInsurance: 2200, books: 1200, visaFees: 600 };
const TRAVEL_PER_TRIP = 1200;
const TRIPS_PER_YEAR = 2;

function fmt(n) {
  return '$' + Math.round(n).toLocaleString();
}

function LineItem({ label, value, sub, highlight }) {
  return (
    <div className={`flex items-center justify-between py-2.5 ${highlight ? 'bg-amber-50 -mx-4 px-4 rounded-lg' : ''}`}>
      <div>
        <p className={`text-sm ${highlight ? 'font-bold text-navy-900' : 'text-navy-700'}`}>{label}</p>
        {sub && <p className="text-xs text-navy-400 mt-0.5">{sub}</p>}
      </div>
      <span className={`font-semibold ${highlight ? 'text-lg text-navy-900' : 'text-sm text-navy-700'}`}>{value}</span>
    </div>
  );
}

export default function CostCalculator() {
  const { calculator, updateCalculator } = useFinance();
  const { programId, manualSchool, manualTuition, cityId, housingType, durationYears, withAssistantship, stipendAmount } = calculator;
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [programSearch, setProgramSearch] = useState('');

  const selectedProgram = programId ? PROGRAMS.find(p => p.id === programId) : null;
  const selectedCity = CITY_COSTS.find(c => c.id === cityId);

  const annualTuition = useMemo(() => {
    if (selectedProgram) return selectedProgram.tuition;
    const v = parseFloat(manualTuition);
    return isNaN(v) ? 0 : v;
  }, [selectedProgram, manualTuition]);

  const filteredPrograms = useMemo(() => {
    if (!programSearch) return PROGRAMS.slice(0, 20);
    const q = programSearch.toLowerCase();
    return PROGRAMS.filter(p =>
      p.school.toLowerCase().includes(q) || p.program.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [programSearch]);

  const costs = useMemo(() => {
    if (!selectedCity) return null;
    const rent = selectedCity.rent[housingType] || selectedCity.rent.shared;
    const annualRent = rent * 12;
    const annualFood = selectedCity.food * 12;
    const annualTransport = selectedCity.transport * 12;
    const annualUtilities = selectedCity.utilities * 12;
    const annualMisc = selectedCity.misc * 12;
    const annualTravel = TRAVEL_PER_TRIP * TRIPS_PER_YEAR;

    const totalPerYear = annualTuition + annualRent + annualFood + annualTransport + annualUtilities + annualMisc + ANNUAL_FIXED.healthInsurance + ANNUAL_FIXED.books + annualTravel;
    const grossTotal = totalPerYear * durationYears + ANNUAL_FIXED.visaFees;
    const stipendTotal = withAssistantship ? stipendAmount * durationYears : 0;
    const netTotal = grossTotal - stipendTotal;

    return {
      annualTuition,
      annualRent, annualFood, annualTransport, annualUtilities, annualMisc, annualTravel,
      healthInsurance: ANNUAL_FIXED.healthInsurance,
      books: ANNUAL_FIXED.books,
      visaFees: ANNUAL_FIXED.visaFees,
      totalPerYear,
      grossTotal,
      stipendTotal,
      netTotal,
    };
  }, [selectedCity, housingType, annualTuition, durationYears, withAssistantship, stipendAmount]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* Inputs */}
      <div className="xl:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl border border-navy-100 p-5 space-y-4">
          <h3 className="font-bold text-navy-900">Program Details</h3>

          {/* Program selector */}
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Select from Program Explorer (optional)</label>
            <div className="relative">
              <button
                onClick={() => setShowProgramDropdown(v => !v)}
                className="w-full flex items-center justify-between border border-navy-200 rounded-xl px-3 py-2.5 text-sm text-left hover:border-navy-400 transition-colors"
              >
                <span className={selectedProgram ? 'text-navy-900' : 'text-navy-400'}>
                  {selectedProgram ? `${selectedProgram.school} — ${selectedProgram.program}` : 'Choose a program...'}
                </span>
                <ChevronDown size={15} className="text-navy-400 flex-shrink-0" />
              </button>
              {showProgramDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-navy-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  <div className="p-2 border-b border-navy-100">
                    <input
                      type="text"
                      value={programSearch}
                      onChange={e => setProgramSearch(e.target.value)}
                      placeholder="Search programs..."
                      className="w-full text-sm px-2 py-1.5 outline-none text-navy-700"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-52 overflow-y-auto">
                    <button
                      onClick={() => { updateCalculator({ programId: '', manualSchool: '', manualTuition: '', cityId: '' }); setShowProgramDropdown(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs text-navy-500 hover:bg-navy-50"
                    >
                      — Enter manually instead
                    </button>
                    {filteredPrograms.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          const cityMatch = CITY_COSTS.find(c => c.city.toLowerCase().includes(p.city?.toLowerCase() || ''));
                          updateCalculator({ programId: p.id, cityId: cityMatch?.id || cityId, durationYears: Math.round((p.durationMonths || 24) / 12) });
                          setShowProgramDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-navy-50 transition-colors"
                      >
                        <p className="text-xs font-semibold text-navy-900">{p.school}</p>
                        <p className="text-xs text-navy-500">{p.program} · {fmt(p.tuition)}/yr</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {!selectedProgram && (
            <>
              <div>
                <label className="block text-xs font-semibold text-navy-600 mb-1.5">Annual Tuition (USD)</label>
                <input
                  type="number"
                  value={manualTuition}
                  onChange={e => updateCalculator({ manualTuition: e.target.value })}
                  placeholder="e.g. 55000"
                  className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400 transition-colors"
                />
              </div>
            </>
          )}

          {selectedProgram && (
            <div className="bg-navy-50 rounded-xl p-3 text-xs space-y-1">
              <p className="font-semibold text-navy-700">{selectedProgram.school}</p>
              <p className="text-navy-500">{selectedProgram.program}</p>
              <p className="text-navy-600">Tuition: <span className="font-bold">{fmt(selectedProgram.tuition)}/year</span></p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Duration (years)</label>
              <select
                value={durationYears}
                onChange={e => updateCalculator({ durationYears: Number(e.target.value) })}
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-navy-400"
              >
                {[1, 1.5, 2, 3, 4, 5, 6].map(y => (
                  <option key={y} value={y}>{y} year{y !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Living costs */}
        <div className="bg-white rounded-2xl border border-navy-100 p-5 space-y-4">
          <h3 className="font-bold text-navy-900">Living Costs</h3>

          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">City</label>
            <select
              value={cityId}
              onChange={e => updateCalculator({ cityId: e.target.value })}
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
              <div className="space-y-2">
                {Object.entries(HOUSING_LABELS).map(([key, label]) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        housingType === key ? 'border-navy-900' : 'border-navy-300 group-hover:border-navy-500'
                      }`}>
                        {housingType === key && <div className="w-2 h-2 rounded-full bg-navy-900" />}
                      </div>
                      <span className="text-sm text-navy-700">{label}</span>
                    </div>
                    <span className="text-sm font-medium text-navy-600">
                      {fmt(selectedCity.rent[key])}/mo
                    </span>
                    <input type="radio" name="housing" value={key} checked={housingType === key} onChange={() => updateCalculator({ housingType: key })} className="sr-only" />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Assistantship */}
        <div className="bg-white rounded-2xl border border-navy-100 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-navy-900">Assistantship / Fellowship</h3>
            <button
              onClick={() => updateCalculator({ withAssistantship: !withAssistantship })}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${withAssistantship ? 'bg-emerald-500' : 'bg-navy-200'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${withAssistantship ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          {withAssistantship && (
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Annual stipend (USD)</label>
              <input
                type="number"
                value={stipendAmount}
                onChange={e => updateCalculator({ stipendAmount: Number(e.target.value) })}
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400 transition-colors"
              />
              <p className="text-xs text-navy-400 mt-1 flex items-start gap-1">
                <Info size={11} className="flex-shrink-0 mt-0.5" />
                Tuition waiver (if any) is shown separately. Enter stipend only.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Output */}
      <div className="xl:col-span-3">
        <div className="sticky top-20">
          {!costs || !cityId || annualTuition === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-navy-200 p-12 text-center">
              <div className="text-4xl mb-3">🧮</div>
              <p className="font-semibold text-navy-700 mb-1">Select a program and city to see your estimate</p>
              <p className="text-xs text-navy-400">All figures are estimates based on community-sourced averages. Actual costs vary.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
              <div className="bg-navy-900 px-5 py-4">
                <p className="text-navy-300 text-xs mb-1">{selectedProgram?.school || 'Custom Program'} · {selectedCity?.display}</p>
                <p className="text-2xl font-bold text-white">{fmt(withAssistantship ? costs.netTotal : costs.grossTotal)}</p>
                <p className="text-navy-400 text-xs mt-0.5">
                  {withAssistantship ? 'Net cost after assistantship' : 'Total cost'} · {durationYears} year{durationYears !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="p-5 divide-y divide-navy-50">
                <div className="pb-3 mb-1">
                  <p className="text-xs font-bold text-navy-500 uppercase tracking-wide mb-2">Annual Costs</p>
                  <LineItem label="Tuition" value={`${fmt(costs.annualTuition)}/yr`} />
                  <LineItem label="Rent" value={`${fmt(costs.annualRent)}/yr`} sub={`${fmt(costs.annualRent / 12)}/mo · ${HOUSING_LABELS[housingType]}`} />
                  <LineItem label="Food & groceries" value={`${fmt(costs.annualFood)}/yr`} sub={`${fmt(selectedCity.food)}/mo avg`} />
                  <LineItem label="Transport" value={`${fmt(costs.annualTransport)}/yr`} sub={selectedCity.transportNote} />
                  <LineItem label="Utilities" value={`${fmt(costs.annualUtilities)}/yr`} />
                  <LineItem label="Health insurance" value={`${fmt(costs.healthInsurance)}/yr`} sub="Typical student plan estimate" />
                  <LineItem label="Books & supplies" value={`${fmt(costs.books)}/yr`} />
                  <LineItem label="Travel (home)" value={`${fmt(costs.annualTravel)}/yr`} sub="2 round trips / year" />
                  <LineItem label="Miscellaneous" value={`${fmt(costs.annualMisc)}/yr`} />
                  <div className="mt-2 pt-2 border-t border-navy-100">
                    <LineItem label="Annual total" value={fmt(costs.totalPerYear)} highlight />
                  </div>
                </div>

                <div className="py-3">
                  <p className="text-xs font-bold text-navy-500 uppercase tracking-wide mb-2">Program Total ({durationYears}y)</p>
                  <LineItem label={`Annual costs × ${durationYears} years`} value={fmt(costs.totalPerYear * durationYears)} />
                  <LineItem label="Visa & document fees (one-time)" value={fmt(costs.visaFees)} />
                  <div className="mt-2 pt-2 border-t border-navy-100">
                    <LineItem label="Gross total" value={fmt(costs.grossTotal)} highlight />
                  </div>
                </div>

                {withAssistantship && (
                  <div className="py-3">
                    <p className="text-xs font-bold text-navy-500 uppercase tracking-wide mb-2">With Assistantship</p>
                    <LineItem label={`Stipend × ${durationYears} years`} value={`- ${fmt(costs.stipendTotal)}`} sub={`${fmt(stipendAmount)}/year`} />
                    <div className="mt-2 pt-2 border-t border-emerald-100">
                      <LineItem label="Net out-of-pocket" value={costs.netTotal > 0 ? fmt(costs.netTotal) : '🎉 Fully covered'} highlight />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-5 pb-4">
                <p className="text-xs text-navy-400">
                  Estimates based on community-sourced averages for {selectedCity?.display}. Actual costs depend on your lifestyle, specific apartment, meal choices, and program fees. Tuition waiver (if part of your assistantship) reduces gross total by full tuition amount.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
