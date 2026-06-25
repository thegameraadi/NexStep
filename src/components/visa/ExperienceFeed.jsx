import { useState } from 'react';
import { ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';
import { EXPERIENCE_STORIES, CONSULATES } from '../../data/visa';

const OUTCOME_STYLE = {
  Approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', emoji: '✅' },
  Rejected: { bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-400', emoji: '❌' },
  'Rejected (221g)': { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-400', emoji: '⏳' },
};

function StoryCard({ story }) {
  const [expanded, setExpanded] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const consulate = CONSULATES.find(c => c.id === story.consulate);
  const style = OUTCOME_STYLE[story.outcome] || OUTCOME_STYLE.Approved;

  return (
    <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden hover:border-navy-200 transition-colors">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                {style.emoji} {story.outcome}
              </span>
              <span className="text-xs text-navy-500">{consulate?.city} Consulate</span>
              <span className="text-xs text-navy-400">{story.date}</span>
            </div>
            <p className="font-semibold text-navy-900 text-sm">{story.university}</p>
            <p className="text-xs text-navy-500 mt-0.5">{story.program}</p>
          </div>
          <button
            onClick={() => setUpvoted(v => !v)}
            className={`flex flex-col items-center gap-0.5 p-2 rounded-xl border flex-shrink-0 transition-colors ${upvoted ? 'bg-navy-900 text-white border-navy-900' : 'border-navy-200 text-navy-500 hover:border-navy-400'}`}
          >
            <ArrowUp size={13} />
            <span className="text-xs font-bold">{story.upvotes + (upvoted ? 1 : 0)}</span>
          </button>
        </div>

        {/* Interview details */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-navy-500">
          <span>⏱ Interview: {story.waitTime}</span>
          <span>👤 Officer: {story.officer}</span>
        </div>

        {/* Questions asked */}
        <div className="mt-3">
          <p className="text-xs font-semibold text-navy-600 mb-1.5">Questions asked:</p>
          <div className="flex flex-wrap gap-1.5">
            {story.questionsAsked.map((q, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-navy-50 rounded-lg text-navy-600 border border-navy-100">{q}</span>
            ))}
          </div>
        </div>

        {/* Notes */}
        <p className={`text-xs text-navy-600 mt-3 leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}>
          {story.notes}
        </p>

        {expanded && story.tips && (
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-700 mb-1">💡 Tip from this applicant</p>
            <p className="text-xs text-amber-700 leading-relaxed">{story.tips}</p>
          </div>
        )}

        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-2 flex items-center gap-1 text-xs text-[#F5A623] hover:underline font-medium"
        >
          {expanded ? 'Show less' : 'Read full experience'}
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>
    </div>
  );
}

export default function ExperienceFeed() {
  const [filter, setFilter] = useState('all');
  const [consFilter, setConsFilter] = useState('all');

  const filtered = EXPERIENCE_STORIES.filter(s => {
    if (filter !== 'all' && !s.outcome.toLowerCase().startsWith(filter)) return false;
    if (consFilter !== 'all' && s.consulate !== consFilter) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">👥</span>
        <div>
          <p className="text-sm font-semibold text-blue-900">Community visa experiences</p>
          <p className="text-xs text-blue-700 mt-0.5">Real accounts from students who recently completed their F-1 interview. Questions asked, how long it took, what worked, and what didn't.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All outcomes' },
            { id: 'approved', label: '✅ Approved' },
            { id: 'rejected', label: '❌ Rejected' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold border transition-colors ${filter === f.id ? 'bg-navy-900 text-white border-navy-900' : 'border-navy-200 text-navy-600 hover:border-navy-400'}`}>
              {f.label}
            </button>
          ))}
        </div>
        <select value={consFilter} onChange={e => setConsFilter(e.target.value)}
          className="border border-navy-200 rounded-xl px-3 py-2 text-xs bg-white outline-none focus:border-navy-400 sm:ml-auto">
          <option value="all">All consulates</option>
          {CONSULATES.map(c => <option key={c.id} value={c.id}>{c.city}</option>)}
        </select>
      </div>

      <p className="text-xs text-navy-400">{filtered.length} experience{filtered.length !== 1 ? 's' : ''} shown</p>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-navy-200">
            <p className="text-3xl mb-2">🔍</p>
            <p className="font-semibold text-navy-700 text-sm">No stories match your filters</p>
          </div>
        ) : (
          filtered.map(s => <StoryCard key={s.id} story={s} />)
        )}
      </div>
    </div>
  );
}
