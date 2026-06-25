import { createContext, useContext, useReducer, useEffect } from 'react';
import { REQUIREMENT_TEMPLATES } from '../data/applications';

const STORAGE_KEY = 'nexstep_applications_v2';

const DEFAULT_STATE = { schools: [], recommenders: [] };

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;

    case 'ADD_SCHOOL': {
      const school = {
        id: genId(),
        schoolName: action.data.schoolName,
        programName: action.data.programName || '',
        programId: action.data.programId || null,
        deadline: action.data.deadline || '',
        status: 'Researching',
        decisionResult: null,
        notes: '',
        requirements: REQUIREMENT_TEMPLATES.map(r => ({ ...r, completed: false })),
        addedAt: Date.now(),
      };
      return { ...state, schools: [...state.schools, school] };
    }

    case 'REMOVE_SCHOOL':
      return { ...state, schools: state.schools.filter(s => s.id !== action.id) };

    case 'UPDATE_SCHOOL':
      return {
        ...state,
        schools: state.schools.map(s => s.id === action.id ? { ...s, ...action.updates } : s),
      };

    case 'TOGGLE_REQUIREMENT':
      return {
        ...state,
        schools: state.schools.map(s => {
          if (s.id !== action.schoolId) return s;
          return {
            ...s,
            requirements: s.requirements.map(r =>
              r.id === action.reqId ? { ...r, completed: !r.completed } : r
            ),
          };
        }),
      };

    case 'ADD_RECOMMENDER': {
      const rec = { id: genId(), name: action.data.name, relationship: action.data.relationship, email: action.data.email || '', schoolStatuses: {} };
      return { ...state, recommenders: [...state.recommenders, rec] };
    }

    case 'UPDATE_RECOMMENDER':
      return {
        ...state,
        recommenders: state.recommenders.map(r => r.id === action.id ? { ...r, ...action.updates } : r),
      };

    case 'REMOVE_RECOMMENDER':
      return { ...state, recommenders: state.recommenders.filter(r => r.id !== action.id) };

    case 'SET_LOR_STATUS':
      return {
        ...state,
        recommenders: state.recommenders.map(r => {
          if (r.id !== action.recId) return r;
          return { ...r, schoolStatuses: { ...r.schoolStatuses, [action.schoolId]: action.status } };
        }),
      };

    default:
      return state;
  }
}

const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
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
    <ApplicationContext.Provider value={{
      schools: state.schools,
      recommenders: state.recommenders,
      addSchool: (data) => dispatch({ type: 'ADD_SCHOOL', data }),
      removeSchool: (id) => dispatch({ type: 'REMOVE_SCHOOL', id }),
      updateSchool: (id, updates) => dispatch({ type: 'UPDATE_SCHOOL', id, updates }),
      toggleRequirement: (schoolId, reqId) => dispatch({ type: 'TOGGLE_REQUIREMENT', schoolId, reqId }),
      addRecommender: (data) => dispatch({ type: 'ADD_RECOMMENDER', data }),
      updateRecommender: (id, updates) => dispatch({ type: 'UPDATE_RECOMMENDER', id, updates }),
      removeRecommender: (id) => dispatch({ type: 'REMOVE_RECOMMENDER', id }),
      setLorStatus: (recId, schoolId, status) => dispatch({ type: 'SET_LOR_STATUS', recId, schoolId, status }),
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error('useApplications must be used inside ApplicationProvider');
  return ctx;
}
