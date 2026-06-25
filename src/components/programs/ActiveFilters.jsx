import { X } from 'lucide-react';

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-100 text-navy-700 text-xs font-semibold">
      {label}
      <button onClick={onRemove} className="hover:text-navy-900 ml-0.5">
        <X size={10} strokeWidth={2.5} />
      </button>
    </span>
  );
}

export default function ActiveFilters({ filters, toggleArrayFilter, updateFilter, resetFilters }) {
  const chips = [];

  filters.degreeTypes.forEach((v) =>
    chips.push({ label: v, remove: () => toggleArrayFilter('degreeTypes', v) })
  );
  filters.fields.forEach((v) =>
    chips.push({ label: v, remove: () => toggleArrayFilter('fields', v) })
  );
  filters.states.forEach((v) =>
    chips.push({ label: v, remove: () => toggleArrayFilter('states', v) })
  );
  filters.rankingTiers.forEach((v) =>
    chips.push({ label: v, remove: () => toggleArrayFilter('rankingTiers', v) })
  );
  filters.intakes.forEach((v) =>
    chips.push({ label: `Intake: ${v}`, remove: () => toggleArrayFilter('intakes', v) })
  );
  filters.greRequired.forEach((v) =>
    chips.push({ label: `GRE: ${v}`, remove: () => toggleArrayFilter('greRequired', v) })
  );
  if (filters.tuitionMax < 80000) {
    chips.push({
      label: `Tuition ≤ $${(filters.tuitionMax / 1000).toFixed(0)}k`,
      remove: () => updateFilter('tuitionMax', 80000),
    });
  }

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip, i) => (
        <Chip key={i} label={chip.label} onRemove={chip.remove} />
      ))}
      <button
        onClick={resetFilters}
        className="text-xs font-semibold text-[#F5A623] hover:underline ml-1"
      >
        Clear all
      </button>
    </div>
  );
}
