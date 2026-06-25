import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, RotateCcw, Eye } from 'lucide-react';
import { useSOP } from '../../context/SOPContext';
import { SOP_SECTIONS, COMMUNITY_SOPS } from '../../data/applications';

function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function WordMeter({ count, target }) {
  const pct = Math.min((count / target) * 100, 100);
  const over = count > target;
  const color = over ? 'bg-red-400' : count >= target * 0.8 ? 'bg-emerald-500' : 'bg-amber-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-navy-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-medium flex-shrink-0 ${over ? 'text-red-500' : 'text-navy-400'}`}>
        {count} / {target}
      </span>
    </div>
  );
}

function SOPSection({ section, value, onChange }) {
  const [showTips, setShowTips] = useState(false);
  const count = wordCount(value);

  return (
    <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-navy-100 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-navy-900">{section.title}</h3>
          <p className="text-xs text-navy-500 mt-0.5 leading-relaxed">{section.prompt}</p>
        </div>
        <span className="text-xs text-navy-400 bg-navy-50 px-2 py-1 rounded-full flex-shrink-0">
          ~{section.wordTarget} words
        </span>
      </div>

      <div className="p-5 space-y-3">
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={section.placeholder}
          rows={6}
          className="w-full border border-navy-200 rounded-xl px-4 py-3 text-sm text-navy-800 placeholder:text-navy-400 outline-none focus:border-navy-400 resize-none transition-colors leading-relaxed"
        />
        <WordMeter count={count} target={section.wordTarget} />

        <button
          onClick={() => setShowTips(v => !v)}
          className="flex items-center gap-1.5 text-xs font-medium text-[#F5A623] hover:text-amber-600 transition-colors"
        >
          {showTips ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {showTips ? 'Hide tips' : 'Tips from successful applicants'}
        </button>

        {showTips && (
          <ul className="space-y-1.5 pl-2">
            {section.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-navy-600">
                <span className="text-[#F5A623] mt-0.5 flex-shrink-0">→</span>
                {tip}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CommunitySOPsPanel() {
  const [selected, setSelected] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const viewing = selected ? COMMUNITY_SOPS.find(s => s.id === selected) : null;

  return (
    <div>
      {!viewing ? (
        <div className="space-y-3">
          {COMMUNITY_SOPS.map(sop => (
            <div key={sop.id} className="bg-white rounded-xl border border-navy-100 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-bold text-navy-900">{sop.field}</span>
                    <span className="text-xs text-navy-400">·</span>
                    <span className="text-xs text-navy-600">{sop.degree} · {sop.schoolType}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      sop.result === 'Admitted' ? 'bg-emerald-100 text-emerald-700' : 'bg-navy-100 text-navy-600'
                    }`}>
                      {sop.result}
                    </span>
                  </div>
                  <p className="text-xs text-navy-500 leading-relaxed line-clamp-2">{sop.excerpt}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-navy-400">👍 {sop.karma} helpful</span>
                    <span className="text-xs text-navy-400">💬 {sop.feedbackCount} comments</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelected(sop.id); setActiveSection('whyField'); }}
                  className="flex-shrink-0 text-xs font-semibold text-[#F5A623] hover:underline"
                >
                  Read →
                </button>
              </div>
              <div className="flex gap-1.5 flex-wrap mt-2.5">
                {sop.tags.map(tag => (
                  <span key={tag} className="text-xs text-navy-500 bg-navy-50 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelected(null)}
            className="text-xs font-medium text-navy-500 hover:text-navy-700 mb-4 flex items-center gap-1"
          >
            ← Back to list
          </button>
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="font-bold text-navy-900">{viewing.field}</span>
            <span className="text-navy-400">·</span>
            <span className="text-navy-600">{viewing.degree} · {viewing.schoolType}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{viewing.result}</span>
          </div>

          <div className="p-3 mb-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-800 font-medium">Reference Only — Do Not Copy</p>
            <p className="text-xs text-amber-700 mt-0.5">These are anonymized examples shared by community members to help you understand the format and style. Your SOP must be entirely your own work.</p>
          </div>

          {/* Section tabs */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {SOP_SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  activeSection === s.id ? 'bg-navy-900 text-white' : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {activeSection && viewing.sections[activeSection] && (
            <div className="bg-white border border-navy-100 rounded-xl p-4">
              <p className="text-sm text-navy-700 leading-relaxed whitespace-pre-wrap">{viewing.sections[activeSection]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SOPBuilder() {
  const { content, updateSection, resetSOP } = useSOP();
  const [showCommunity, setShowCommunity] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const totalWords = SOP_SECTIONS.reduce((sum, s) => sum + wordCount(content[s.id] || ''), 0);
  const targetWords = SOP_SECTIONS.reduce((sum, s) => sum + s.wordTarget, 0);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* SOP Editor */}
      <div className="xl:col-span-2 space-y-4">
        {/* Summary bar */}
        <div className="bg-white rounded-2xl border border-navy-100 px-5 py-3 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-navy-500 mb-1">Total word count</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-navy-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F5A623] rounded-full transition-all"
                  style={{ width: `${Math.min((totalWords / targetWords) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-navy-700">{totalWords} / {targetWords}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {confirmReset ? (
              <>
                <button onClick={resetSOP} className="text-xs font-semibold text-red-500 hover:text-red-700">Confirm reset</button>
                <button onClick={() => setConfirmReset(false)} className="text-xs text-navy-400 hover:text-navy-600">Cancel</button>
              </>
            ) : (
              <button onClick={() => setConfirmReset(true)} className="flex items-center gap-1 text-xs text-navy-400 hover:text-navy-600">
                <RotateCcw size={12} />
                Reset
              </button>
            )}
          </div>
        </div>

        {SOP_SECTIONS.map(section => (
          <SOPSection
            key={section.id}
            section={section}
            value={content[section.id] || ''}
            onChange={text => updateSection(section.id, text)}
          />
        ))}
      </div>

      {/* Community SOPs sidebar */}
      <div className="xl:col-span-1">
        <div className="sticky top-20">
          <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
            <button
              onClick={() => setShowCommunity(v => !v)}
              className="w-full flex items-center justify-between px-5 py-4 border-b border-navy-100 hover:bg-navy-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-navy-600" />
                <span className="font-semibold text-navy-900 text-sm">Community SOPs</span>
                <span className="text-xs bg-navy-100 text-navy-600 px-1.5 py-0.5 rounded-full">{COMMUNITY_SOPS.length}</span>
              </div>
              {showCommunity ? <ChevronUp size={15} className="text-navy-400" /> : <ChevronDown size={15} className="text-navy-400" />}
            </button>
            {showCommunity ? (
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                <CommunitySOPsPanel />
              </div>
            ) : (
              <div className="p-5">
                <p className="text-xs text-navy-500 leading-relaxed">
                  Read anonymized SOPs from admitted students across fields. Labeled <span className="font-semibold text-amber-700">Reference Only</span> — use for inspiration, not copying.
                </p>
                <button
                  onClick={() => setShowCommunity(true)}
                  className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#F5A623] hover:underline"
                >
                  <Eye size={13} />
                  Browse {COMMUNITY_SOPS.length} examples
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
