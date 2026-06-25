import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'nexstep_predeparture_v1';

const initialState = {
  checkedArrivalItems: [],
  packingCountry: 'india',
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_ARRIVAL_ITEM': {
      const has = state.checkedArrivalItems.includes(action.id);
      return {
        ...state,
        checkedArrivalItems: has
          ? state.checkedArrivalItems.filter(id => id !== action.id)
          : [...state.checkedArrivalItems, action.id],
      };
    }
    case 'SET_PACKING_COUNTRY':
      return { ...state, packingCountry: action.country };
    case 'HYDRATE':
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
}

const PreDepartureContext = createContext(null);

export function PreDepartureProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <PreDepartureContext.Provider value={{ state, dispatch }}>
      {children}
    </PreDepartureContext.Provider>
  );
}

export function usePreDeparture() {
  return useContext(PreDepartureContext);
}
