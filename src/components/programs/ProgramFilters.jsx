import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { FIELDS, STATES, DEGREE_TYPES, RANKING_TIERS, INTAKES } from '../../data/programs';

const GRE_OPTIONS = ['Required', 'Optional', 'Not Required'];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-navy-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-xs font-bold text-navy-700 uppercase tracking-widest hover:text-navy-900 transition-colors"
      >
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

function CheckboxGroup({ options, selected, onToggle, showCount = 6 }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? options : options.slice(0, showCount);

  return (
    <div className="space-y-2">
      {visible.map((opt) => (
        <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
          <div
            className={`w-4 h-4 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
              selected.includes(opt)
                ? 'bg-navy-900 border-navy-900'
                : 'border-navy-300 group-hover:border-navy-500'
            }`}
          >
            {selected.includes(opt) && (
              <svg viewBox="0 0 10 8" width="8" height="8" fill="none">
                <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <input
            type="checkbox"
            className="sr-only"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
          />
          <span className="text-sm text-navy-600 group-hover:text-navy-900 transition-colors">{opt}</span>
        </label>
      ))}
      {options.length > showCount && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-semibold text-[#F5A623] hover:underline mt-1"
        >
          {showAll ? 'Show less' : `+${options.length - showCount} more`}
        </button>
      )}
    </div>
  );
}

export default function ProgramFilters({ filters, toggleArrayFilter, updateFilter, resetFilters, activeFilterCount, onClose }) {
  const tuitionSteps = [10000, 20000, 30000, 40000, 50000, 60000, 80000];

  return (
    <div className="h-full flex flex-col">
      {/* Filter header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-navy-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-navy-900 text-sm">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-navy-900 text-white text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#F5A623] hover:underline"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-navy-50 text-navy-500">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable filter body */}
      <div className="flex-1 overflow-y-auto px-5 py-2">
        {/* Degree type */}
        <FilterSection title="Degree Type">
          <CheckboxGroup
            options={DEGREE_TYPES}
            selected={filters.degreeTypes}
            onToggle={(v) => toggleArrayFilter('degreeTypes', v)}
          />
        </FilterSection>

        {/* Field of study */}
        <FilterSection title="Field of Study" defaultOpen={false}>
          <CheckboxGroup
            options={FIELDS}
            selected={filters.fields}
            onToggle={(v) => toggleArrayFilter('fields', v)}
            showCount={5}
          />
        </FilterSection>

        {/* State */}
        <FilterSection title="State" defaultOpen={false}>
          <div className="grid grid-cols-3 gap-1.5">
            {STATES.map((state) => (
              <button
                key={state}
                onClick={() => toggleArrayFilter('states', state)}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filters.states.includes(state)
                    ? 'bg-navy-900 text-white'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* GRE */}
        <FilterSection title="GRE Requirement">
          <CheckboxGroup
            options={GRE_OPTIONS}
            selected={filters.greRequired}
            onToggle={(v) => toggleArrayFilter('greRequired', v)}
          />
        </FilterSection>

        {/* Ranking tier */}
        <FilterSection title="Ranking Tier" defaultOpen={false}>
          <CheckboxGroup
            options={RANKING_TIERS}
            selected={filters.rankingTiers}
            onToggle={(v) => toggleArrayFilter('rankingTiers', v)}
          />
        </FilterSection>

        {/* Intake */}
        <FilterSection title="Intake" defaultOpen={false}>
          <CheckboxGroup
            options={INTAKES}
            selected={filters.intakes}
            onToggle={(v) => toggleArrayFilter('intakes', v)}
          />
        </FilterSection>

        {/* Tuition range */}
        <FilterSection title="Max Tuition / Year" defaultOpen={false}>
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-navy-500">
              <span>$0</span>
              <span className="font-bold text-navy-800">
                {filters.tuitionMax >= 80000 ? 'Any' : `$${filters.tuitionMax.toLocaleString()}`}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={80000}
              step={5000}
              value={filters.tuitionMax}
              onChange={(e) => updateFilter('tuitionMax', Number(e.target.value))}
              className="w-full accent-navy-900"
            />
            <div className="flex flex-wrap gap-1.5">
              {tuitionSteps.map((step) => (
                <button
                  key={step}
                  onClick={() => updateFilter('tuitionMax', step)}
                  className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                    filters.tuitionMax === step
                      ? 'bg-navy-900 text-white'
                      : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                  }`}
                >
                  {step >= 80000 ? 'Any' : `<$${(step / 1000).toFixed(0)}k`}
                </button>
              ))}
            </div>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
