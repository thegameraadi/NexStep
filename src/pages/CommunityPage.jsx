import { useState, useRef, useEffect } from 'react';
import { Search, Plus, X, Lock, Globe, Pin, CornerDownRight, ChevronDown, ChevronRight, Users, Hash, ArrowLeft, Trash2, LogOut } from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import {
  STAGE_ROOMS,
  SCHOOL_ROOMS,
  FIELD_ROOMS,
  COUNTRY_ROOMS,
  MOCK_MESSAGES,
} from '../data/community';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getAllRooms(userRooms) {
  return [
    ...STAGE_ROOMS.map(r => ({ ...r, category: 'stage' })),
    ...SCHOOL_ROOMS.map(r => ({ ...r, category: 'school' })),
    ...FIELD_ROOMS.map(r => ({ ...r, category: 'field' })),
    ...COUNTRY_ROOMS.map(r => ({ ...r, category: 'country' })),
    ...userRooms.map(r => ({ ...r, category: 'user' })),
  ];
}

function findRoom(id, userRooms) {
  return getAllRooms(userRooms).find(r => r.id === id);
}

function getRoomMessages(roomId, userMessages) {
  const seed = MOCK_MESSAGES[roomId] || [];
  const added = userMessages[roomId] || [];
  return [...seed, ...added];
}

// ─── Create Room Modal ────────────────────────────────────────────────────────

function CreateRoomModal({ onClose }) {
  const { dispatch } = useCommunity();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const submit = () => {
    if (!name.trim()) return;
    dispatch({
      type: 'CREATE_ROOM',
      room: {
        id: `ucr-${Date.now()}`,
        name: name.trim(),
        description: desc.trim(),
        isPrivate,
        admin: 'you',
        memberCount: 1,
        createdAt: new Date().toISOString().slice(0, 10),
        category: 'community',
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-navy-900 text-lg">Create a Room</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-semibold text-navy-700 block mb-1">Room name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. MSCS 2026 Roommates"
              maxLength={60}
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-navy-400"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-navy-700 block mb-1">Description <span className="font-normal text-navy-400">(optional)</span></label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="What's this room for?"
              rows={2}
              maxLength={120}
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-navy-400 resize-none"
            />
          </div>
          <div className="flex items-center justify-between bg-navy-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              {isPrivate ? <Lock size={15} className="text-navy-600" /> : <Globe size={15} className="text-navy-400" />}
              <div>
                <p className="text-sm font-semibold text-navy-800">{isPrivate ? 'Private room' : 'Public room'}</p>
                <p className="text-xs text-navy-500">{isPrivate ? 'Invite-only' : 'Anyone can join'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsPrivate(!isPrivate)}
              className={`w-10 h-6 rounded-full transition-colors ${isPrivate ? 'bg-navy-700' : 'bg-navy-200'}`}
            >
              <span className={`block w-4 h-4 bg-white rounded-full mx-auto transition-transform ${isPrivate ? 'translate-x-2' : '-translate-x-2'}`} />
            </button>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-navy-200 text-navy-700 text-sm font-semibold hover:bg-navy-50 transition-colors">Cancel</button>
          <button
            onClick={submit}
            disabled={!name.trim()}
            className="flex-1 py-2.5 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Message Thread ───────────────────────────────────────────────────────────

function MessageBubble({ msg, roomId, isPinned, onPin, onReply, isAdmin }) {
  const { state, dispatch } = useCommunity();
  const upvoted = state.upvotedMessages.includes(msg.id);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const submitReply = () => {
    if (!replyText.trim()) return;
    dispatch({
      type: 'SEND_REPLY',
      roomId,
      messageId: msg.id,
      reply: { id: generateId(), author: 'you', avatar: 'Y', time: 'just now', text: replyText.trim() },
    });
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div className={`rounded-2xl border ${isPinned ? 'border-amber-200 bg-amber-50' : 'border-navy-100 bg-white'} overflow-hidden`}>
      <div className="p-3.5">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-navy-200 flex items-center justify-center text-xs font-bold text-navy-700 flex-shrink-0">
            {msg.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-navy-900">{msg.author}</span>
              <span className="text-xs text-navy-400">{msg.time}</span>
              {isPinned && <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5"><Pin size={9} />Pinned</span>}
            </div>
            <p className="text-sm text-navy-800 leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => dispatch({ type: 'UPVOTE_MESSAGE', messageId: msg.id })}
                className={`text-xs flex items-center gap-1 px-2 py-0.5 rounded-lg transition-colors ${upvoted ? 'bg-[#F5A623]/20 text-amber-700 font-semibold' : 'text-navy-400 hover:text-navy-600 hover:bg-navy-50'}`}
              >
                ↑ {upvoted ? 'Upvoted' : 'Upvote'}
              </button>
              <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="text-xs text-navy-400 hover:text-navy-600 flex items-center gap-1"
              >
                <CornerDownRight size={11} /> Reply {msg.replies?.length > 0 && `(${msg.replies.length})`}
              </button>
              {isAdmin && (
                <button
                  onClick={() => onPin(msg.id)}
                  className={`text-xs flex items-center gap-1 ${isPinned ? 'text-amber-600' : 'text-navy-400 hover:text-navy-600'}`}
                >
                  <Pin size={11} /> {isPinned ? 'Unpin' : 'Pin'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      {msg.replies && msg.replies.length > 0 && (
        <div className="border-t border-navy-100 pl-8 pr-3.5 pb-3 space-y-2.5 pt-2.5">
          {msg.replies.map(reply => (
            <div key={reply.id} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-navy-100 flex items-center justify-center text-[10px] font-bold text-navy-600 flex-shrink-0">
                {reply.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-navy-800">{reply.author}</span>
                  <span className="text-xs text-navy-400">{reply.time}</span>
                </div>
                <p className="text-xs text-navy-700 leading-relaxed">{reply.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply box */}
      {showReplyBox && (
        <div className="border-t border-navy-100 p-3 flex gap-2">
          <div className="w-6 h-6 rounded-full bg-[#F5A623] flex items-center justify-center text-[10px] font-bold text-navy-900 flex-shrink-0">Y</div>
          <input
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitReply(); } }}
            placeholder="Write a reply..."
            className="flex-1 text-xs border border-navy-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-navy-400"
          />
          <button
            onClick={submitReply}
            disabled={!replyText.trim()}
            className="text-xs bg-navy-900 text-white px-3 py-1.5 rounded-lg hover:bg-navy-800 disabled:opacity-40"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Chat Panel ───────────────────────────────────────────────────────────────

function ChatPanel({ room, onBack }) {
  const { state, dispatch } = useCommunity();
  const [input, setInput] = useState('');
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const endRef = useRef(null);

  const allMessages = getRoomMessages(room.id, state.messages);
  const pinnedIds = new Set(state.pinnedMessages[room.id] || allMessages.filter(m => m.pinned).map(m => m.id));
  const displayed = showPinnedOnly ? allMessages.filter(m => pinnedIds.has(m.id)) : allMessages;
  const isJoined = state.joinedRooms.includes(room.id);
  const isAdmin = room.admin === 'you' || state.userRooms.some(r => r.id === room.id && r.admin === 'you');

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayed.length]);

  const sendMessage = () => {
    if (!input.trim()) return;
    dispatch({
      type: 'SEND_MESSAGE',
      roomId: room.id,
      message: {
        id: generateId(),
        author: 'you',
        avatar: 'Y',
        time: 'just now',
        pinned: false,
        text: input.trim(),
        replies: [],
      },
    });
    setInput('');
  };

  const pinMessage = (msgId) => {
    dispatch({ type: 'PIN_MESSAGE', roomId: room.id, messageId: msgId });
  };

  const deleteRoom = () => {
    dispatch({ type: 'DELETE_ROOM', roomId: room.id });
    dispatch({ type: 'SET_ACTIVE_ROOM', roomId: null });
    onBack();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Room header */}
      <div className="flex-shrink-0 border-b border-navy-100 bg-white px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="lg:hidden p-1.5 rounded-lg text-navy-400 hover:bg-navy-50"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-navy-900 text-sm truncate">{room.name}</p>
            {room.isPrivate && <Lock size={12} className="text-navy-400 flex-shrink-0" />}
          </div>
          <p className="text-xs text-navy-400 truncate">{room.description || ''} · {(room.memberCount || 0).toLocaleString()} members</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPinnedOnly(!showPinnedOnly)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors ${showPinnedOnly ? 'bg-amber-100 text-amber-700' : 'text-navy-400 hover:bg-navy-50'}`}
          >
            <Pin size={12} /> Pins
          </button>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_JOIN', roomId: room.id })}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
              isJoined
                ? 'bg-navy-100 text-navy-600 hover:bg-navy-200'
                : 'bg-navy-900 text-white hover:bg-navy-800'
            }`}
          >
            {isJoined ? <><LogOut size={11} /> Leave</> : <><Plus size={11} /> Join</>}
          </button>
          {isAdmin && (
            <button onClick={deleteRoom} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete room">
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {displayed.length === 0 && (
          <div className="text-center py-12 text-navy-400">
            <Hash size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">{showPinnedOnly ? 'No pinned messages yet' : 'No messages yet — be the first to post!'}</p>
          </div>
        )}
        {displayed.map(msg => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            roomId={room.id}
            isPinned={pinnedIds.has(msg.id)}
            onPin={pinMessage}
            isAdmin={isAdmin}
          />
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      {isJoined ? (
        <div className="flex-shrink-0 border-t border-navy-100 bg-white p-3 flex gap-2 items-end">
          <div className="w-7 h-7 rounded-full bg-[#F5A623] flex items-center justify-center text-xs font-bold text-navy-900 flex-shrink-0 mt-1">Y</div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder={`Message #${room.name}`}
            rows={1}
            className="flex-1 border border-navy-200 rounded-xl px-3 py-2 text-sm text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-navy-400 resize-none leading-relaxed"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-navy-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            Send
          </button>
        </div>
      ) : (
        <div className="flex-shrink-0 border-t border-navy-100 bg-navy-50 p-4 text-center">
          <p className="text-sm text-navy-500 mb-2">Join this room to participate in the conversation</p>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_JOIN', roomId: room.id })}
            className="bg-navy-900 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors"
          >
            Join Room
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Room List Item ───────────────────────────────────────────────────────────

function RoomItem({ room, isActive, isJoined, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors group flex items-center gap-2.5 ${
        isActive ? 'bg-navy-900 text-white' : 'hover:bg-navy-50 text-navy-700'
      }`}
    >
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
        isActive ? 'bg-white/20 text-white' : 'bg-navy-100 text-navy-600'
      }`}>
        {room.icon || (room.name ? room.name[0] : '#')}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-navy-800'}`}>{room.name}</p>
        {room.memberCount && (
          <p className={`text-xs truncate ${isActive ? 'text-white/60' : 'text-navy-400'}`}>
            {room.memberCount.toLocaleString()} members
          </p>
        )}
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {isJoined && !isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
        {room.isPrivate && <Lock size={10} className={isActive ? 'text-white/60' : 'text-navy-400'} />}
      </div>
    </button>
  );
}

// ─── Collapsible section ──────────────────────────────────────────────────────

function SidebarSection({ title, count, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-navy-500 uppercase tracking-wide hover:text-navy-700 transition-colors"
      >
        <span>{title} <span className="font-normal normal-case text-navy-400">({count})</span></span>
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      </button>
      {open && <div className="space-y-0.5">{children}</div>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const { state, dispatch } = useCommunity();
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const allRooms = getAllRooms(state.userRooms);
  const activeRoom = state.activeRoomId ? findRoom(state.activeRoomId, state.userRooms) : null;

  const filter = (rooms) =>
    search
      ? rooms.filter(r =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          (r.description || '').toLowerCase().includes(search.toLowerCase())
        )
      : rooms;

  const selectRoom = (roomId) => {
    dispatch({ type: 'SET_ACTIVE_ROOM', roomId });
    setShowChat(true);
  };

  const goBack = () => setShowChat(false);

  const filteredUserRooms = filter(state.userRooms);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-navy-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Community</h1>
              <p className="text-navy-300 text-sm mt-1 max-w-xl">
                Connect with students at every stage — by program stage, school, field, or country.
              </p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 bg-[#F5A623] text-navy-900 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-500 transition-colors flex-shrink-0"
            >
              <Plus size={16} /> Create Room
            </button>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 h-[calc(100vh-240px)] min-h-[500px]">

          {/* Sidebar */}
          <aside className={`flex-shrink-0 w-72 flex flex-col bg-white border border-navy-100 rounded-2xl overflow-hidden ${showChat ? 'hidden lg:flex' : 'flex'}`}>
            {/* Search */}
            <div className="p-3 border-b border-navy-100 flex-shrink-0">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search rooms..."
                  className="w-full pl-8 pr-3 py-2 text-xs border border-navy-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy-400 bg-navy-50"
                />
              </div>
            </div>

            {/* Room list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {/* Joined rooms quick access */}
              {state.joinedRooms.length > 0 && !search && (
                <SidebarSection title="Your Rooms" count={state.joinedRooms.length} defaultOpen>
                  {allRooms
                    .filter(r => state.joinedRooms.includes(r.id))
                    .map(room => (
                      <RoomItem
                        key={room.id}
                        room={room}
                        isActive={state.activeRoomId === room.id}
                        isJoined
                        onClick={() => selectRoom(room.id)}
                      />
                    ))}
                </SidebarSection>
              )}

              <SidebarSection title="By Stage" count={filter(STAGE_ROOMS).length} defaultOpen={!!search}>
                {filter(STAGE_ROOMS).map(room => (
                  <RoomItem key={room.id} room={room} isActive={state.activeRoomId === room.id} isJoined={state.joinedRooms.includes(room.id)} onClick={() => selectRoom(room.id)} />
                ))}
              </SidebarSection>

              <SidebarSection title="By School" count={filter(SCHOOL_ROOMS).length}>
                {filter(SCHOOL_ROOMS).map(room => (
                  <RoomItem key={room.id} room={room} isActive={state.activeRoomId === room.id} isJoined={state.joinedRooms.includes(room.id)} onClick={() => selectRoom(room.id)} />
                ))}
              </SidebarSection>

              <SidebarSection title="By Field" count={filter(FIELD_ROOMS).length}>
                {filter(FIELD_ROOMS).map(room => (
                  <RoomItem key={room.id} room={room} isActive={state.activeRoomId === room.id} isJoined={state.joinedRooms.includes(room.id)} onClick={() => selectRoom(room.id)} />
                ))}
              </SidebarSection>

              <SidebarSection title="By Country" count={filter(COUNTRY_ROOMS).length}>
                {filter(COUNTRY_ROOMS).map(room => (
                  <RoomItem key={room.id} room={room} isActive={state.activeRoomId === room.id} isJoined={state.joinedRooms.includes(room.id)} onClick={() => selectRoom(room.id)} />
                ))}
              </SidebarSection>

              {(filteredUserRooms.length > 0 || !search) && (
                <SidebarSection title="Community Rooms" count={filteredUserRooms.length} defaultOpen>
                  {filteredUserRooms.map(room => (
                    <RoomItem key={room.id} room={room} isActive={state.activeRoomId === room.id} isJoined={state.joinedRooms.includes(room.id)} onClick={() => selectRoom(room.id)} />
                  ))}
                  <button
                    onClick={() => setShowCreate(true)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-navy-500 hover:bg-navy-50 text-sm transition-colors"
                  >
                    <Plus size={14} /> Create a room
                  </button>
                </SidebarSection>
              )}
            </div>
          </aside>

          {/* Chat area */}
          <main className={`flex-1 bg-white border border-navy-100 rounded-2xl overflow-hidden ${!showChat && !activeRoom ? 'hidden lg:flex' : 'flex'} flex-col`}>
            {activeRoom ? (
              <ChatPanel room={activeRoom} onBack={goBack} />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-navy-400">
                <Users size={48} className="mb-4 opacity-20" />
                <p className="font-semibold text-navy-600 text-lg mb-1">Select a room to join the conversation</p>
                <p className="text-sm">Browse rooms by stage, school, field, or country on the left.</p>
                <button
                  onClick={() => setShowCreate(true)}
                  className="mt-6 flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors"
                >
                  <Plus size={15} /> Create a room
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {showCreate && <CreateRoomModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
