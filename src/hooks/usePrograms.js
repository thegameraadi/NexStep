import { useMemo, useState, useCallback } from 'react';
import { PROGRAMS } from '../data/programs';

export const DEFAULT_FILTERS = {
  search: '',
  degreeTypes: [],
  fields: [],
  states: [],
  rankingTiers: [],
  intakes: [],
  greRequired: [],
  tuitionMax: 80000,
  sort: 'ranking',
};

export function usePrograms() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleArrayFilter = useCallback((key, value) => {
    setFilters((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }, []);

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.degreeTypes.length) count++;
    if (filters.fields.length) count++;
    if (filters.states.length) count++;
    if (filters.rankingTiers.length) count++;
    if (filters.intakes.length) count++;
    if (filters.greRequired.length) count++;
    if (filters.tuitionMax < 80000) count++;
    return count;
  }, [filters]);

  const results = useMemo(() => {
    let list = [...PROGRAMS];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.program.toLowerCase().includes(q) ||
          p.school.toLowerCase().includes(q) ||
          p.field.toLowerCase().includes(q) ||
          p.shortSchool.toLowerCase().includes(q)
      );
    }

    // Degree type
    if (filters.degreeTypes.length) {
      list = list.filter((p) => filters.degreeTypes.includes(p.degreeType));
    }

    // Field
    if (filters.fields.length) {
      list = list.filter((p) => filters.fields.includes(p.field));
    }

    // State
    if (filters.states.length) {
      list = list.filter((p) => filters.states.includes(p.state));
    }

    // Ranking tier
    if (filters.rankingTiers.length) {
      list = list.filter((p) => filters.rankingTiers.includes(p.rankingTier));
    }

    // Intake
    if (filters.intakes.length) {
      list = list.filter((p) => p.intake.some((i) => filters.intakes.includes(i)));
    }

    // GRE
    if (filters.greRequired.length) {
      list = list.filter((p) => filters.greRequired.includes(p.greRequired));
    }

    // Tuition
    if (filters.tuitionMax < 80000) {
      list = list.filter((p) => p.tuition <= filters.tuitionMax);
    }

    // Sort
    switch (filters.sort) {
      case 'ranking':
        list.sort((a, b) => a.ranking - b.ranking);
        break;
      case 'tuition_asc':
        list.sort((a, b) => a.tuition - b.tuition);
        break;
      case 'tuition_desc':
        list.sort((a, b) => b.tuition - a.tuition);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return list;
  }, [filters]);

  return { filters, updateFilter, toggleArrayFilter, resetFilters, activeFilterCount, results };
}
