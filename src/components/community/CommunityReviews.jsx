import { useState } from 'react';
import { ThumbsUp, MessageSquare, X, Filter } from 'lucide-react';
import { COMMUNITY_SOPS, SOP_SECTIONS } from '../../data/applications';

const FIELDS = ['All', ...new Set(COMMUNITY_SOPS.map(s => s.field))];
const DEGREES = ['All', ...new Set(COMMUNITY_SOPS.map(s => s.degree))];

function SOPCard({ sop, onView, onKarma, karmaGiven }) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-5 hover:shadow-card transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-navy-900">{sop.field}</span>
            <span className="text-navy-400">·</span>
            <span className="text-navy-600 text-sm">{sop.degree} · {sop.schoolType}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              sop.result === 'Admitted' ? 'bg-emerald-100 text-emerald-700' : 'bg-navy-100 text-navy-600'
            }`}>
              {sop.result} {sop.admitYear}
            </span>
            <span className="text-xs text-navy-400">Anonymous</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-navy-600 leading-relaxed mb-4 line-clamp-3">{sop.excerpt}</p>

      <div className="flex gap-1.5 flex-wrap mb-4">
        {sop.tags.map(tag => (
          <span key={tag} className="text-xs text-navy-500 bg-navy-50 px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onKarma(sop.id)}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
              karmaGiven ? 'text-emerald-600' : 'text-navy-400 hover:text-navy-600'
            }`}
          >
            <ThumbsUp size={13} className={karmaGiven ? 'fill-emerald-600' : ''} />
            {sop.karma + (karmaGiven ? 1 : 0)} helpful
          </button>
          <div className="flex items-center gap-1.5 text-xs text-navy-400">
            <MessageSquare size={13} />
            {sop.feedbackCount} comments
          </div>
        </div>
        <button
          onClick={() => onView(sop)}
          className="text-xs font-semibold text-[#F5A623] hover:underline"
        >
          Read full SOP →
        </button>
      </div>
    </div>
  );
}

function SOPReaderModal({ sop, onClose }) {
  const [activeSection, setActiveSection] = useState(SOP_SECTIONS[0].id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-start justify-between px-6 py-4 border-b border-navy-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-navy-900">{sop.field}</span>
              <span className="text-navy-400">·</span>
              <span className="text-navy-600">{sop.degree} · {sop.schoolType}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                sop.result === 'Admitted' ? 'bg-emerald-100 text-emerald-700' : 'bg-navy-100 text-navy-600'
              }`}>
                {sop.result}
              </span>
            </div>
            <p className="text-xs text-navy-500 mt-0.5">Anonymous · {sop.admitYear}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50">
            <X size={18} />
          </button>
        </div>

        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5">
          <p className="text-xs text-amber-800 font-semibold">Reference Only — Do Not Copy</p>
          <p className="text-xs text-amber-700">Use this for format and style inspiration only. Your SOP must be entirely your own work.</p>
        </div>

        {/* Section tabs */}
        <div className="flex gap-1.5 p-4 border-b border-navy-100 overflow-x-auto flex-shrink-0">
          {SOP_SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                activeSection === s.id ? 'bg-navy-900 text-white' : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {sop.sections[activeSection] ? (
            <p className="text-sm text-navy-700 leading-relaxed whitespace-pre-wrap">
              {sop.sections[activeSection]}
            </p>
          ) : (
            <p className="text-sm text-navy-400 italic">No content for this section.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PostSOPModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-navy-400 hover:bg-navy-50">
          <X size={18} />
        </button>
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="font-bold text-navy-900 text-lg mb-2">Account required</h2>
        <p className="text-sm text-navy-500 leading-relaxed mb-5">
          Posting your SOP for peer review requires a NexStep account — so reviewers can reach you and you can track feedback.
          <br /><br />
          We're building authentication now. Sign up for early access and we'll notify you when this launches.
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-500 mb-3"
        />
        <button
          onClick={onClose}
          className="w-full py-3 bg-navy-900 text-white font-semibold text-sm rounded-xl hover:bg-navy-800 transition-colors"
        >
          Notify me when it launches
        </button>
      </div>
    </div>
  );
}

export default function CommunityReviews() {
  const [field, setField] = useState('All');
  const [degree, setDegree] = useState('All');
  const [viewing, setViewing] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [karmaGiven, setKarmaGiven] = useState({});

  const filtered = COMMUNITY_SOPS.filter(s =>
    (field === 'All' || s.field === field) &&
    (degree === 'All' || s.degree === degree)
  );

  const toggleKarma = (id) => {
    setKarmaGiven(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* CTA banner */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-white mb-1">Share your SOP for peer feedback</h3>
          <p className="text-navy-300 text-sm">Post anonymously. Get feedback from students who've been through the process. Give back, earn karma.</p>
        </div>
        <button
          onClick={() => setShowPostModal(true)}
          className="flex-shrink-0 bg-[#F5A623] text-navy-900 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-500 transition-colors"
        >
          Post My SOP
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-navy-500">
          <Filter size={13} />
          Filter:
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {FIELDS.map(f => (
            <button
              key={f}
              onClick={() => setField(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                field === f ? 'bg-navy-900 text-white' : 'bg-white border border-navy-200 text-navy-600 hover:border-navy-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-navy-200" />
        <div className="flex gap-1.5 flex-wrap">
          {DEGREES.map(d => (
            <button
              key={d}
              onClick={() => setDegree(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                degree === d ? 'bg-navy-900 text-white' : 'bg-white border border-navy-200 text-navy-600 hover:border-navy-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(sop => (
          <SOPCard
            key={sop.id}
            sop={sop}
            onView={setViewing}
            onKarma={toggleKarma}
            karmaGiven={!!karmaGiven[sop.id]}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-navy-400 text-sm">
            No SOPs match your filters.
          </div>
        )}
      </div>

      {viewing && <SOPReaderModal sop={viewing} onClose={() => setViewing(null)} />}
      {showPostModal && <PostSOPModal onClose={() => setShowPostModal(false)} />}
    </div>
  );
}
