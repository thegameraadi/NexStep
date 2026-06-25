import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, X, ArrowUp } from 'lucide-react';
import { COMMUNITY_THREADS } from '../../data/decisions';
import { useDecisions } from '../../context/DecisionsContext';

const FIELDS = ['Computer Science', 'Business', 'Electrical Engineering', 'Data Science', 'Public Policy', 'Biomedical Engineering'];
const DEGREES = ['MS', 'PhD', 'MBA', 'MPP', 'MEng'];

function ReplyCard({ reply, threadId, upvotedReplies, onToggle }) {
  const key = `${threadId}::${reply.id}`;
  const upvoted = upvotedReplies.includes(key);
  return (
    <div className={`p-3.5 rounded-xl border ${reply.isTop ? 'border-amber-200 bg-amber-50' : 'border-navy-100 bg-navy-50/50'}`}>
      {reply.isTop && (
        <span className="inline-block text-xs font-bold text-amber-700 mb-1.5">⭐ Top reply</span>
      )}
      <p className="text-xs text-navy-700 leading-relaxed">{reply.text}</p>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-xs text-navy-400 italic">{reply.author}</span>
        <button
          onClick={() => onToggle(key)}
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-colors ${upvoted ? 'bg-navy-900 text-white' : 'bg-white border border-navy-200 text-navy-600 hover:border-navy-400'}`}
        >
          <ArrowUp size={11} /> {reply.upvotes + (upvoted ? 1 : 0)}
        </button>
      </div>
    </div>
  );
}

function ThreadCard({ thread }) {
  const { state, dispatch } = useDecisions();
  const [repliesOpen, setRepliesOpen] = useState(false);
  const upvoted = state.upvotedPosts.includes(thread.id);

  const togglePost = () => dispatch({ type: 'TOGGLE_POST_UPVOTE', id: thread.id });
  const toggleReply = (key) => dispatch({ type: 'TOGGLE_REPLY_UPVOTE', id: key });

  const topReply = thread.replies.find(r => r.isTop);

  return (
    <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden hover:border-navy-200 transition-colors">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-navy-900 text-sm leading-snug">{thread.title}</h3>
            <div className="flex items-center gap-2 flex-wrap mt-1.5">
              <span className="text-xs px-2 py-0.5 rounded-full bg-navy-100 text-navy-600 font-medium">{thread.field}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-navy-100 text-navy-600 font-medium">{thread.degree}</span>
              <span className="text-xs text-navy-400">{thread.season} · {thread.postedAt}</span>
            </div>
          </div>
          <button
            onClick={togglePost}
            className={`flex-shrink-0 flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors border ${upvoted ? 'bg-navy-900 text-white border-navy-900' : 'border-navy-200 text-navy-500 hover:border-navy-400'}`}
          >
            <ArrowUp size={13} />
            <span className="text-xs font-bold">{thread.upvotes + (upvoted ? 1 : 0)}</span>
          </button>
        </div>

        {/* Profile + admits */}
        <div className="mt-3 bg-navy-50 rounded-xl p-3">
          <p className="text-xs text-navy-500 mb-1">Profile: {thread.profile}</p>
          <div className="flex flex-wrap gap-1.5">
            {thread.admits.map((a, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">🎉 {a}</span>
            ))}
          </div>
        </div>

        {/* Question */}
        <p className="text-sm text-navy-700 mt-3 leading-relaxed">{thread.question}</p>

        {/* Top reply preview */}
        {topReply && !repliesOpen && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-navy-500 mb-1.5">Top reply:</p>
            <ReplyCard reply={topReply} threadId={thread.id} upvotedReplies={state.upvotedReplies} onToggle={toggleReply} />
          </div>
        )}

        <button
          onClick={() => setRepliesOpen(v => !v)}
          className="mt-3 flex items-center gap-1 text-xs font-medium text-[#F5A623] hover:underline"
        >
          {repliesOpen ? 'Hide replies' : `View all ${thread.replies.length} replies`}
          {repliesOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {repliesOpen && (
        <div className="border-t border-navy-100 p-5 space-y-2.5 bg-navy-50/30">
          {thread.replies.map(r => (
            <ReplyCard key={r.id} reply={r} threadId={thread.id} upvotedReplies={state.upvotedReplies} onToggle={toggleReply} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostModal({ onClose, onPost }) {
  const [form, setForm] = useState({
    title: '', field: '', degree: 'MS', season: 'Fall 2025', profile: '', admits: '', question: '',
  });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const admitsArr = form.admits.split(',').map(s => s.trim()).filter(Boolean);
    onPost({
      id: `user_${Date.now()}`,
      ...form,
      admits: admitsArr,
      author: 'Anonymous',
      upvotes: 0,
      postedAt: new Date().toISOString().slice(0, 10),
      tags: [],
      replies: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy-100">
          <h3 className="font-bold text-navy-900">Post Your Decision Question</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} required
              placeholder="e.g. CMU vs Stanford — help me decide"
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Field</label>
              <select value={form.field} onChange={e => set('field', e.target.value)}
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-navy-400">
                <option value="">Other</option>
                {FIELDS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Degree</label>
              <select value={form.degree} onChange={e => set('degree', e.target.value)}
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-navy-400">
                {DEGREES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Season</label>
              <select value={form.season} onChange={e => set('season', e.target.value)}
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-navy-400">
                <option>Fall 2025</option>
                <option>Fall 2024</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Your profile (anonymous)</label>
            <input value={form.profile} onChange={e => set('profile', e.target.value)}
              placeholder="e.g. India, 3.9 GPA, 2 years industry"
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Your admits (comma-separated) *</label>
            <input value={form.admits} onChange={e => set('admits', e.target.value)} required
              placeholder="e.g. CMU MSML, Stanford MSCS, Columbia MSCS"
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Your question *</label>
            <textarea value={form.question} onChange={e => set('question', e.target.value)} required rows={4}
              placeholder="Describe your situation, goals, and what you're trying to decide..."
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400 resize-none" />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
            All posts are anonymous. Your question will be visible to the community.
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-navy-200 rounded-xl text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 bg-navy-900 rounded-xl text-sm font-semibold text-white hover:bg-navy-800 transition-colors">
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DecisionCommunity() {
  const { state, dispatch } = useDecisions();
  const [showModal, setShowModal] = useState(false);
  const [filterField, setFilterField] = useState('');

  const allThreads = [...state.userThreads, ...COMMUNITY_THREADS];
  const filtered = filterField ? allThreads.filter(t => t.field === filterField) : allThreads;

  const handlePost = (thread) => {
    dispatch({ type: 'POST_THREAD', thread });
  };

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h3 className="font-bold text-navy-900">Decision Community</h3>
          <p className="text-xs text-navy-500 mt-0.5">Real dilemmas, real advice — from students who've been there</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-[#F5A623] rounded-xl text-xs font-bold text-navy-900 hover:bg-amber-500 transition-colors">
          <Plus size={14} /> Ask the Community
        </button>
      </div>

      {/* Field filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilterField('')} className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-colors border ${!filterField ? 'bg-navy-900 text-white border-navy-900' : 'border-navy-200 text-navy-600 hover:border-navy-400'}`}>
          All fields
        </button>
        {FIELDS.map(f => (
          <button key={f} onClick={() => setFilterField(f === filterField ? '' : f)}
            className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-colors border ${filterField === f ? 'bg-navy-900 text-white border-navy-900' : 'border-navy-200 text-navy-600 hover:border-navy-400'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Threads */}
      <div className="space-y-4">
        {filtered.map(t => <ThreadCard key={t.id} thread={t} />)}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-navy-200">
            <p className="text-4xl mb-3">💬</p>
            <p className="font-semibold text-navy-700">No threads in this field yet</p>
            <p className="text-xs text-navy-400 mt-1">Be the first to ask!</p>
          </div>
        )}
      </div>

      {showModal && <PostModal onClose={() => setShowModal(false)} onPost={handlePost} />}
    </div>
  );
}
