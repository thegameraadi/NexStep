import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'nexstep_decisions_v1';

const initialState = {
  userResults: [],
  comparisonAdmits: [],
  upvotedPosts: [],
  upvotedReplies: [],
  userThreads: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload };

    case 'SUBMIT_RESULT':
      return { ...state, userResults: [action.result, ...state.userResults] };

    case 'ADD_COMPARISON': {
      if (state.comparisonAdmits.length >= 4) return state;
      if (state.comparisonAdmits.find(a => a.id === action.admit.id)) return state;
      return { ...state, comparisonAdmits: [...state.comparisonAdmits, action.admit] };
    }

    case 'REMOVE_COMPARISON':
      return { ...state, comparisonAdmits: state.comparisonAdmits.filter(a => a.id !== action.id) };

    case 'CLEAR_COMPARISON':
      return { ...state, comparisonAdmits: [] };

    case 'TOGGLE_POST_UPVOTE': {
      const has = state.upvotedPosts.includes(action.id);
      return { ...state, upvotedPosts: has ? state.upvotedPosts.filter(x => x !== action.id) : [...state.upvotedPosts, action.id] };
    }

    case 'TOGGLE_REPLY_UPVOTE': {
      const has = state.upvotedReplies.includes(action.id);
      return { ...state, upvotedReplies: has ? state.upvotedReplies.filter(x => x !== action.id) : [...state.upvotedReplies, action.id] };
    }

    case 'POST_THREAD':
      return { ...state, userThreads: [action.thread, ...state.userThreads] };

    default:
      return state;
  }
}

const DecisionsContext = createContext(null);

export function DecisionsProvider({ children }) {
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
    <DecisionsContext.Provider value={{ state, dispatch }}>
      {children}
    </DecisionsContext.Provider>
  );
}

export function useDecisions() {
  return useContext(DecisionsContext);
}
