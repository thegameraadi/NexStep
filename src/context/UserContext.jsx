import { createContext, useContext, useReducer, useEffect } from 'react';
import { STAGE_FROM_SITUATION } from '../data/roadmap';

const UserContext = createContext(null);
const STORAGE_KEY = 'nexstep_user_profile';

export const DEFAULT_PROFILE = {
  completedOnboarding: false,
  pursuing: null,        // 'Masters' | 'MBA' | 'PhD' | 'Undecided'
  field: null,
  targetIntake: null,
  situation: null,
  country: null,
  currentStage: 1,       // 1–10
};

function stageFromSituation(situation) {
  return STAGE_FROM_SITUATION[situation] ?? 1;
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.key]: action.value };
    case 'COMPLETE_ONBOARDING': {
      const currentStage = stageFromSituation(action.payload.situation);
      return {
        ...state,
        ...action.payload,
        currentStage,
        completedOnboarding: true,
      };
    }
    case 'SET_STAGE':
      return { ...state, currentStage: action.stage };
    case 'RESET':
      return { ...DEFAULT_PROFILE };
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [profile, dispatch] = useReducer(reducer, DEFAULT_PROFILE);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) dispatch({ type: 'HYDRATE', payload: JSON.parse(stored) });
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (_) {}
  }, [profile]);

  const completeOnboarding = (answers) =>
    dispatch({ type: 'COMPLETE_ONBOARDING', payload: answers });

  const setStage = (stage) => dispatch({ type: 'SET_STAGE', stage });

  const resetProfile = () => dispatch({ type: 'RESET' });

  return (
    <UserContext.Provider value={{ profile, completeOnboarding, setStage, resetProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
