import { createContext, useContext, useReducer, useEffect } from 'react';
import { SOP_SECTIONS } from '../data/applications';

const STORAGE_KEY = 'nexstep_sop_v2';

function buildDefault() {
  return Object.fromEntries(SOP_SECTIONS.map(s => [s.id, '']));
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': return action.payload;
    case 'UPDATE': return { ...state, [action.sectionId]: action.content };
    case 'RESET': return buildDefault();
    default: return state;
  }
}

const SOPContext = createContext(null);

export function SOPProvider({ children }) {
  const [content, dispatch] = useReducer(reducer, null, buildDefault);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  return (
    <SOPContext.Provider value={{
      content,
      updateSection: (sectionId, text) => dispatch({ type: 'UPDATE', sectionId, content: text }),
      resetSOP: () => dispatch({ type: 'RESET' }),
    }}>
      {children}
    </SOPContext.Provider>
  );
}

export function useSOP() {
  const ctx = useContext(SOPContext);
  if (!ctx) throw new Error('useSOP must be used inside SOPProvider');
  return ctx;
}
