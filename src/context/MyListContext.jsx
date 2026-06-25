import { createContext, useContext, useReducer, useEffect } from 'react';

const MyListContext = createContext(null);

const STORAGE_KEY = 'nexstep_mylist';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      if (state.some((i) => i.programId === action.programId)) return state;
      return [...state, { programId: action.programId, status: 'researching', addedAt: Date.now() }];
    }
    case 'REMOVE':
      return state.filter((i) => i.programId !== action.programId);
    case 'SET_STATUS':
      return state.map((i) =>
        i.programId === action.programId ? { ...i, status: action.status } : i
      );
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

export function MyListProvider({ children }) {
  const [list, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) dispatch({ type: 'HYDRATE', payload: JSON.parse(stored) });
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (_) {}
  }, [list]);

  const addToList = (programId) => dispatch({ type: 'ADD', programId });
  const removeFromList = (programId) => dispatch({ type: 'REMOVE', programId });
  const setStatus = (programId, status) => dispatch({ type: 'SET_STATUS', programId, status });
  const isInList = (programId) => list.some((i) => i.programId === programId);
  const getStatus = (programId) => list.find((i) => i.programId === programId)?.status ?? null;

  return (
    <MyListContext.Provider value={{ list, addToList, removeFromList, setStatus, isInList, getStatus }}>
      {children}
    </MyListContext.Provider>
  );
}

export function useMyList() {
  const ctx = useContext(MyListContext);
  if (!ctx) throw new Error('useMyList must be used within MyListProvider');
  return ctx;
}
