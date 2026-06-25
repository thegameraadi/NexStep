import { useState } from 'react';
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { QUESTION_CATEGORIES } from '../../data/visa';
import { useVisa } from '../../context/VisaContext';

const DIFFICULTY_STYLE = {
  easy:   { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Easy' },
  medium: { bg: 'bg-amber-100',   text: 'text-amber-700',   label: 'Medium' },
  hard:   { bg: 'bg-red-100',     text: 'text-red-600',     label: 'Hard' },
};

const COLOR_MAP = {
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200',   tab: 'bg-blue-600 text-white' },
  emerald:{ bg: 'bg-emerald-50', text: 'text-emerald-700',border: 'border-emerald-200',tab: 'bg-emerald-600 text-white' },
  amber:  { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  tab: 'bg-amber-500 text-white' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', tab: 'bg-purple-600 text-white' },
  red:    { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    tab: 'bg-red-500 text-white' },
};

function QuestionCard({ question, catColor }) {
  const { state, dispatch } = useVisa();
  const [open, setOpen] = useState(false);
  const bookmarked = state.bookmarkedQuestions.includes(question.id);
  const diff = DIFFICULTY_STYLE[question.difficulty] || DIFFICULTY_STYLE.easy;
  const colors = COLOR_MAP[catColor] || COLOR_MAP.blue;

  return (
    <div className={`rounded-xl border bg-white overflow-hidden transition-all ${open ? 'border-navy-300' : 'border-navy-100'}`}>
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => setOpen(v => !v)} className="flex-1 text-left flex items-start gap-3">
          <span className="text-sm font-semibold text-navy-900 leading-snug flex-1">{question.q}</span>
          {open ? <ChevronUp size={15} className="text-navy-400 flex-shrink-0 mt-0.5" /> : <ChevronDown size={15} className="text-navy-400 flex-shrink-0 mt-0.5" />}
        </button>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${diff.bg} ${diff.text}`}>{diff.label}</span>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_BOOKMARK', id: question.id })}
          className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${bookmarked ? 'text-[#F5A623]' : 'text-navy-300 hover:text-navy-600'}`}
        >
          {bookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
        </button>
      </div>

      {open && (
        <div className={`px-4 pb-4 border-t border-navy-50`}>
          <div className={`mt-3 rounded-xl p-3 border ${colors.bg} ${colors.border}`}>
            <p className={`text-xs font-bold mb-1 ${colors.text}`}>💡 How to answer</p>
            <p className={`text-xs leading-relaxed ${colors.text}`}>{question.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuestionBank() {
  const { state } = useVisa();
  const [activeCategory, setActiveCategory] = useState('program');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  const activeCat = QUESTION_CATEGORIES.find(c => c.id === activeCategory);
  const allQuestions = QUESTION_CATEGORIES.flatMap(c => c.questions.map(q => ({ ...q, catId: c.id, catLabel: c.label, catColor: c.color })));

  const displayQuestions = showOnlyBookmarked
    ? allQuestions.filter(q => state.bookmarkedQuestions.includes(q.id))
    : (activeCat?.questions.map(q => ({ ...q, catId: activeCat.id, catLabel: activeCat.label, catColor: activeCat.color })) || []);

  const bookmarkCount = state.bookmarkedQuestions.length;
  const totalQuestions = allQuestions.length;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-navy-100 p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-bold text-navy-900">Interview Question Bank</h3>
            <p className="text-xs text-navy-500 mt-0.5">{totalQuestions} questions across {QUESTION_CATEGORIES.length} categories — click any question for a model answer</p>
          </div>
          <button
            onClick={() => setShowOnlyBookmarked(v => !v)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${showOnlyBookmarked ? 'bg-amber-100 text-amber-700 border-amber-200' : 'border-navy-200 text-navy-600 hover:border-navy-400'}`}
          >
            <BookmarkCheck size={13} /> Bookmarked ({bookmarkCount})
          </button>
        </div>
      </div>

      {!showOnlyBookmarked && (
        <div className="flex flex-wrap gap-2">
          {QUESTION_CATEGORIES.map(cat => {
            const colors = COLOR_MAP[cat.color] || COLOR_MAP.blue;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${
                  activeCategory === cat.id
                    ? `${colors.tab} border-transparent`
                    : 'border-navy-200 text-navy-600 hover:border-navy-400 bg-white'
                }`}
              >
                {cat.icon} {cat.label}
                <span className="opacity-70">({cat.questions.length})</span>
              </button>
            );
          })}
        </div>
      )}

      {showOnlyBookmarked && displayQuestions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-navy-200">
          <p className="text-3xl mb-2">🔖</p>
          <p className="font-semibold text-navy-700 text-sm">No bookmarked questions yet</p>
          <p className="text-xs text-navy-400 mt-1">Click the bookmark icon on any question to save it here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {displayQuestions.map(q => (
            <QuestionCard key={q.id} question={q} catColor={q.catColor} />
          ))}
        </div>
      )}
    </div>
  );
}
