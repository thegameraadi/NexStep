import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'nexstep_visa_v1';

const initialState = {
  checkedDocs: [],
  bookmarkedQuestions: [],
  selectedConsulate: '',
  practiceHistory: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload };

    case 'TOGGLE_DOC': {
      const has = state.checkedDocs.includes(action.id);
      return { ...state, checkedDocs: has ? state.checkedDocs.filter(x => x !== action.id) : [...state.checkedDocs, action.id] };
    }

    case 'TOGGLE_BOOKMARK': {
      const has = state.bookmarkedQuestions.includes(action.id);
      return { ...state, bookmarkedQuestions: has ? state.bookmarkedQuestions.filter(x => x !== action.id) : [...state.bookmarkedQuestions, action.id] };
    }

    case 'SET_CONSULATE':
      return { ...state, selectedConsulate: action.id };

    case 'SAVE_PRACTICE':
      return { ...state, practiceHistory: [action.session, ...state.practiceHistory.slice(0, 9)] };

    default:
      return state;
  }
}

const VisaContext = createContext(null);

export function VisaProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  return (
    <VisaContext.Provider value={{ state, dispatch }}>
      {children}
    </VisaContext.Provider>
  );
}

export function useVisa() {
  return useContext(VisaContext);
}
