import { createContext, useContext, useReducer, useEffect } from 'react';
import { USER_CREATED_ROOMS } from '../data/community';

const STORAGE_KEY = 'nexstep_community_v1';

const initialState = {
  activeRoomId: null,
  joinedRooms: ['stage-3', 'india', 'cs-ml', 'cmu'],
  messages: {},
  pinnedMessages: {},
  userRooms: USER_CREATED_ROOMS,
  upvotedMessages: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_ROOM':
      return { ...state, activeRoomId: action.roomId };
    case 'TOGGLE_JOIN': {
      const joined = state.joinedRooms.includes(action.roomId);
      return {
        ...state,
        joinedRooms: joined
          ? state.joinedRooms.filter(id => id !== action.roomId)
          : [...state.joinedRooms, action.roomId],
      };
    }
    case 'SEND_MESSAGE': {
      const roomMsgs = state.messages[action.roomId] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.roomId]: [...roomMsgs, action.message],
        },
      };
    }
    case 'SEND_REPLY': {
      const roomMsgs = (state.messages[action.roomId] || []).map(msg =>
        msg.id === action.messageId
          ? { ...msg, replies: [...(msg.replies || []), action.reply] }
          : msg
      );
      return { ...state, messages: { ...state.messages, [action.roomId]: roomMsgs } };
    }
    case 'PIN_MESSAGE': {
      const pinned = state.pinnedMessages[action.roomId] || [];
      const isPin = !pinned.includes(action.messageId);
      return {
        ...state,
        pinnedMessages: {
          ...state.pinnedMessages,
          [action.roomId]: isPin
            ? [...pinned, action.messageId]
            : pinned.filter(id => id !== action.messageId),
        },
      };
    }
    case 'UPVOTE_MESSAGE': {
      const has = state.upvotedMessages.includes(action.messageId);
      return {
        ...state,
        upvotedMessages: has
          ? state.upvotedMessages.filter(id => id !== action.messageId)
          : [...state.upvotedMessages, action.messageId],
      };
    }
    case 'CREATE_ROOM':
      return { ...state, userRooms: [...state.userRooms, action.room] };
    case 'DELETE_ROOM':
      return { ...state, userRooms: state.userRooms.filter(r => r.id !== action.roomId) };
    case 'HYDRATE':
      return { ...initialState, ...action.payload, userRooms: action.payload.userRooms || USER_CREATED_ROOMS };
    default:
      return state;
  }
}

const CommunityContext = createContext(null);

export function CommunityProvider({ children }) {
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
    <CommunityContext.Provider value={{ state, dispatch }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  return useContext(CommunityContext);
}
