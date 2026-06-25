import { useState, useMemo } from 'react';
import { Search, ExternalLink, ChevronDown, ChevronUp, BookOpen, Clock, Link2, HelpCircle } from 'lucide-react';
import { GLOSSARY, TIMELINES, OFFICIAL_LINKS, FAQ_ITEMS, FAQ_CATEGORIES } from '../data/knowledge';

const TABS = [
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
  { id: 'timelines', label: 'Timelines', icon: Clock },
  { id: 'links', label: 'Official Links', icon: Link2 },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

// ─── Glossary ─────────────────────────────────────────────────────────────────

const GLOSS_CATEGORIES = ['All', ...Array.from(new Set(GLOSSARY.map(g => g.category)))];

function GlossaryTab() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return GLOSSARY.filter(g => {
      const matchesCat = cat === 'All' || g.category === cat;
      const q = search.toLowerCase();
      const matchesSearch = !q || g.term.toLowerCase().includes(q) || g.full.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, cat]);

  return (
    <div className="space-y-4">
      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search terms, acronyms…"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-400 bg-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {GLOSS_CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${cat === c ? 'bg-navy-900 text-white' : 'bg-white border border-navy-200 text-navy-600 hover:border-navy-400'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-navy-400">{filtered.length} terms</p>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-navy-400">
          <BookOpen size={36} className="mx-auto mb-3 opacity-25" />
          <p className="font-medium">No terms found for "{search}"</p>
          <p className="text-sm mt-1">Try a different search or browse all terms</p>
        </div>
      )}

      <div className="space-y-2">
        {filtered.map(g => (
          <div key={g.id} className="bg-white border border-navy-100 rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === g.id ? null : g.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-navy-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-bold text-navy-900 text-base flex-shrink-0">{g.term}</span>
                <span className="text-xs text-navy-400 truncate hidden sm:block">{g.full}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                  g.category === 'Tests' ? 'bg-purple-100 text-purple-700' :
                  g.category === 'Visa & Immigration' ? 'bg-blue-100 text-blue-700' :
                  g.category === 'Finances & Tax' ? 'bg-emerald-100 text-emerald-700' :
                  g.category === 'Academic' ? 'bg-amber-100 text-amber-700' :
                  g.category === 'Credentials' ? 'bg-rose-100 text-rose-700' :
                  'bg-navy-100 text-navy-600'
                }`}>
                  {g.category}
                </span>
              </div>
              {expanded === g.id
                ? <ChevronUp size={16} className="text-navy-400 flex-shrink-0" />
                : <ChevronDown size={16} className="text-navy-400 flex-shrink-0" />}
            </button>
            {expanded === g.id && (
              <div className="border-t border-navy-100 px-4 pb-4 pt-3">
                <p className="text-xs text-navy-400 mb-2 font-medium">{g.full}</p>
                <p className="text-sm text-navy-700 leading-relaxed">{g.definition}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Timelines ────────────────────────────────────────────────────────────────

const PHASE_COLORS = {
  'Research': 'bg-purple-100 text-purple-700',
  'Preparation': 'bg-blue-100 text-blue-700',
  'Applications': 'bg-amber-100 text-amber-700',
  'Decisions': 'bg-emerald-100 text-emerald-700',
  'Post-Admit': 'bg-orange-100 text-orange-700',
  'Arrival': 'bg-teal-100 text-teal-700',
};

function TimelinesTab() {
  const [selected, setSelected] = useState('fall-ms');
  const timeline = TIMELINES.find(t => t.id === selected);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TIMELINES.map(t => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`p-3 rounded-xl text-left transition-colors ${selected === t.id ? 'bg-navy-900 text-white' : 'bg-white border border-navy-200 text-navy-700 hover:border-navy-400'}`}
          >
            <p className={`text-xs font-semibold mb-0.5 ${selected === t.id ? 'text-amber-300' : 'text-navy-400'}`}>{t.intake}</p>
            <p className={`text-sm font-bold leading-snug ${selected === t.id ? 'text-white' : 'text-navy-900'}`}>{t.degreeType}</p>
          </button>
        ))}
      </div>

      {timeline && (
        <div className="space-y-3">
          <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4">
            <h3 className="font-bold text-navy-900 mb-1">{timeline.title}</h3>
            <p className="text-sm text-navy-600">{timeline.description}</p>
          </div>

          <div className="relative space-y-2">
            {timeline.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  {i < timeline.steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-navy-200 mt-1 mb-1 min-h-[16px]" />
                  )}
                </div>
                <div className="bg-white border border-navy-100 rounded-2xl p-3.5 mb-1 flex-1">
                  <div className="flex items-start gap-2 mb-1.5">
                    <p className="text-xs font-semibold text-navy-500 flex-shrink-0 leading-5">{step.month}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${PHASE_COLORS[step.phase] || 'bg-navy-100 text-navy-600'}`}>
                      {step.phase}
                    </span>
                  </div>
                  <p className="font-semibold text-navy-900 text-sm mb-1">{step.title}</p>
                  <p className="text-sm text-navy-600 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Official Links ───────────────────────────────────────────────────────────

function LinksTab() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">⚠️</span>
        <p className="text-sm text-amber-800">
          Always verify that you are on the official <strong>.gov</strong> domain before entering personal information. Scam sites mimic official government pages. Bookmark directly from this list.
        </p>
      </div>
      {OFFICIAL_LINKS.map((cat, i) => (
        <div key={i} className="space-y-2">
          <h3 className="font-bold text-navy-900 text-sm">{cat.category}</h3>
          <div className="space-y-2">
            {cat.links.map((link, j) => (
              <a
                key={j}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-navy-100 rounded-2xl p-4 hover:border-navy-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-900 text-sm group-hover:text-[#F5A623] transition-colors">{link.name}</p>
                    <p className="text-xs text-navy-400 mt-0.5">{link.url}</p>
                    <p className="text-sm text-navy-600 mt-1.5 leading-relaxed">{link.description}</p>
                  </div>
                  <ExternalLink size={14} className="text-navy-300 group-hover:text-[#F5A623] flex-shrink-0 mt-0.5 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQTab() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const cats = ['All', ...FAQ_CATEGORIES];

  const filtered = useMemo(() => {
    return FAQ_ITEMS.filter(f => {
      const matchesCat = cat === 'All' || f.category === cat;
      const q = search.toLowerCase();
      const matchesSearch = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, cat]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions…"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-navy-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-400 bg-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${cat === c ? 'bg-navy-900 text-white' : 'bg-white border border-navy-200 text-navy-600 hover:border-navy-400'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-navy-400">{filtered.length} questions</p>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-navy-400">
          <HelpCircle size={36} className="mx-auto mb-3 opacity-25" />
          <p className="font-medium">No questions found for "{search}"</p>
          <p className="text-sm mt-1">Try a different search or ask in the Community</p>
        </div>
      )}

      <div className="space-y-2">
        {filtered.map(f => (
          <div key={f.id} className="bg-white border border-navy-100 rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === f.id ? null : f.id)}
              className="w-full flex items-start justify-between gap-3 p-4 text-left hover:bg-navy-50 transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="text-[#F5A623] font-bold text-base leading-5 flex-shrink-0">Q</span>
                <p className="text-sm font-semibold text-navy-900 leading-snug">{f.q}</p>
              </div>
              {expanded === f.id
                ? <ChevronUp size={16} className="text-navy-400 flex-shrink-0 mt-0.5" />
                : <ChevronDown size={16} className="text-navy-400 flex-shrink-0 mt-0.5" />}
            </button>
            {expanded === f.id && (
              <div className="border-t border-navy-100 px-4 pb-4 pt-3 flex gap-3">
                <span className="text-emerald-500 font-bold text-base leading-5 flex-shrink-0">A</span>
                <p className="text-sm text-navy-700 leading-relaxed">{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState('glossary');

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-navy-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Knowledge Base</h1>
          <p className="text-navy-300 text-base max-w-2xl">
            Every term explained, official timelines, government links, and answers to the 50 most asked questions — all in one place.
          </p>
          <div className="mt-8 flex gap-1 overflow-x-auto pb-px">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-xl transition-colors flex-shrink-0 ${
                    activeTab === tab.id ? 'bg-[#F9FAFB] text-navy-900' : 'text-navy-400 hover:text-navy-200 hover:bg-navy-800'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'glossary' && <GlossaryTab />}
        {activeTab === 'timelines' && <TimelinesTab />}
        {activeTab === 'links' && <LinksTab />}
        {activeTab === 'faq' && <FAQTab />}
      </div>
    </div>
  );
}
