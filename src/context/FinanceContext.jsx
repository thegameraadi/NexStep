import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'nexstep_finance_v1';

const DEFAULT_STATE = {
  savedScholarships: [],
  appliedScholarships: [],
  calculator: {
    programId: '',
    manualSchool: '',
    manualTuition: '',
    cityId: '',
    housingType: 'shared',
    durationYears: 2,
    withAssistantship: false,
    stipendAmount: 20000,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': return action.payload;
    case 'TOGGLE_SAVED_SCHOLARSHIP': {
      const has = state.savedScholarships.includes(action.id);
      return { ...state, savedScholarships: has ? state.savedScholarships.filter(x => x !== action.id) : [...state.savedScholarships, action.id] };
    }
    case 'TOGGLE_APPLIED_SCHOLARSHIP': {
      const has = state.appliedScholarships.includes(action.id);
      return { ...state, appliedScholarships: has ? state.appliedScholarships.filter(x => x !== action.id) : [...state.appliedScholarships, action.id] };
    }
    case 'UPDATE_CALCULATOR':
      return { ...state, calculator: { ...state.calculator, ...action.updates } };
    default:
      return state;
  }
}

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <FinanceContext.Provider value={{
      savedScholarships: state.savedScholarships,
      appliedScholarships: state.appliedScholarships,
      calculator: state.calculator,
      toggleSavedScholarship: (id) => dispatch({ type: 'TOGGLE_SAVED_SCHOLARSHIP', id }),
      toggleAppliedScholarship: (id) => dispatch({ type: 'TOGGLE_APPLIED_SCHOLARSHIP', id }),
      updateCalculator: (updates) => dispatch({ type: 'UPDATE_CALCULATOR', updates }),
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used inside FinanceProvider');
  return ctx;
}
