import { useState, useCallback } from 'react';
import { ChevronRight, RotateCcw, CheckCircle } from 'lucide-react';
import { getAllQuestions, QUESTION_CATEGORIES } from '../../data/visa';
import { useVisa } from '../../context/VisaContext';

const DIFFICULTY_COLOR = {
  easy:   'text-emerald-600',
  medium: 'text-amber-600',
  hard:   'text-red-500',
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ConfidenceButtons({ onSelect }) {
  return (
    <div className="flex gap-2">
      {[
        { label: 'Got it ✓', value: 'good', cls: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200' },
        { label: 'Needs work', value: 'medium', cls: 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200' },
        { label: 'Struggled', value: 'bad', cls: 'bg-red-100 text-red-600 hover:bg-red-200 border-red-200' },
      ].map(b => (
        <button key={b.value} onClick={() => onSelect(b.value)} className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors ${b.cls}`}>
          {b.label}
        </button>
      ))}
    </div>
  );
}

function SetupScreen({ onStart }) {
  const [categories, setCategories] = useState(QUESTION_CATEGORIES.map(c => c.id));
  const [difficulty, setDifficulty] = useState('all');
  const [count, setCount] = useState(10);

  const toggle = (id) => setCategories(prev =>
    prev.includes(id) ? (prev.length > 1 ? prev.filter(x => x !== id) : prev) : [...prev, id]
  );

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl border border-navy-100 p-6 space-y-6">
      <div>
        <h3 className="font-bold text-navy-900 text-lg">🎯 Practice Mode</h3>
        <p className="text-xs text-navy-500 mt-1">Simulate your visa interview. Questions are shown one at a time — reveal the model answer after you've tried answering.</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-navy-600 mb-2">Categories</p>
        <div className="flex flex-wrap gap-2">
          {QUESTION_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => toggle(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold border transition-colors ${
                categories.includes(cat.id)
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'border-navy-200 text-navy-600 hover:border-navy-400'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-navy-600 mb-2">Difficulty</p>
        <div className="flex gap-2">
          {[
            { v: 'all', l: 'All' },
            { v: 'easy', l: 'Easy' },
            { v: 'medium', l: 'Medium' },
            { v: 'hard', l: 'Hard' },
          ].map(d => (
            <button key={d.v} onClick={() => setDifficulty(d.v)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors ${difficulty === d.v ? 'bg-navy-900 text-white border-navy-900' : 'border-navy-200 text-navy-600 hover:border-navy-400'}`}>
              {d.l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-navy-600 mb-2">Number of questions: <span className="text-navy-900">{count}</span></p>
        <input type="range" min="5" max="25" step="5" value={count} onChange={e => setCount(parseInt(e.target.value))}
          className="w-full accent-navy-900" />
        <div className="flex justify-between text-xs text-navy-400 mt-1">
          <span>5</span><span>10</span><span>15</span><span>20</span><span>25</span>
        </div>
      </div>

      <button
        onClick={() => onStart({ categories, difficulty, count })}
        className="w-full py-3 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-colors"
      >
        Start Practice Session
      </button>
    </div>
  );
}

function PracticeSession({ config, onFinish }) {
  const { dispatch } = useVisa();
  const [questions] = useState(() => {
    let all = getAllQuestions();
    if (config.categories.length < QUESTION_CATEGORIES.length) {
      all = all.filter(q => config.categories.includes(q.categoryId));
    }
    if (config.difficulty !== 'all') {
      all = all.filter(q => q.difficulty === config.difficulty);
    }
    return shuffle(all).slice(0, config.count);
  });

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [ratings, setRatings] = useState([]);

  const current = questions[idx];
  const progress = idx / questions.length;
  const done = idx >= questions.length;

  const handleConfidence = useCallback((rating) => {
    const newRatings = [...ratings, { qId: current.id, rating }];
    setRatings(newRatings);
    if (idx + 1 >= questions.length) {
      dispatch({ type: 'SAVE_PRACTICE', session: {
        date: new Date().toISOString().slice(0, 10),
        total: questions.length,
        good: newRatings.filter(r => r.rating === 'good').length,
        categories: config.categories,
      }});
      setIdx(idx + 1);
    } else {
      setIdx(idx + 1);
      setRevealed(false);
    }
  }, [idx, ratings, current, questions.length, config.categories, dispatch]);

  if (done) {
    const goodCount = ratings.filter(r => r.rating === 'good').length;
    const medCount = ratings.filter(r => r.rating === 'medium').length;
    const badCount = ratings.filter(r => r.rating === 'bad').length;
    const pct = Math.round((goodCount / questions.length) * 100);

    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl border border-navy-100 p-6 text-center space-y-5">
        <CheckCircle size={48} className="text-emerald-500 mx-auto" />
        <div>
          <h3 className="font-bold text-navy-900 text-xl">Session Complete</h3>
          <p className="text-xs text-navy-500 mt-1">{questions.length} questions · {pct}% confidence</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-50 rounded-xl p-3">
            <p className="text-2xl font-black text-emerald-600">{goodCount}</p>
            <p className="text-xs text-navy-600">Got it</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3">
            <p className="text-2xl font-black text-amber-600">{medCount}</p>
            <p className="text-xs text-navy-600">Needs work</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3">
            <p className="text-2xl font-black text-red-500">{badCount}</p>
            <p className="text-xs text-navy-600">Struggled</p>
          </div>
        </div>
        {pct < 70 && (
          <p className="text-sm text-navy-600 bg-amber-50 rounded-xl p-3 border border-amber-200">
            Keep practicing — focus on the questions you struggled with. Aim for 80%+ before your interview.
          </p>
        )}
        {pct >= 70 && pct < 90 && (
          <p className="text-sm text-navy-600 bg-blue-50 rounded-xl p-3 border border-blue-200">
            Good progress! Review your "Needs work" questions one more time and you'll be ready.
          </p>
        )}
        {pct >= 90 && (
          <p className="text-sm text-navy-600 bg-emerald-50 rounded-xl p-3 border border-emerald-200">
            Excellent preparation! You're very well ready for your interview.
          </p>
        )}
        <div className="flex gap-3">
          <button onClick={() => onFinish('restart')} className="flex-1 flex items-center justify-center gap-1.5 py-3 border border-navy-200 rounded-xl text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors">
            <RotateCcw size={15} /> Practice Again
          </button>
          <button onClick={() => onFinish('done')} className="flex-1 py-3 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-navy-100 rounded-full overflow-hidden">
          <div className="h-full bg-navy-900 rounded-full transition-all" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="text-xs font-semibold text-navy-600 flex-shrink-0">{idx + 1} / {questions.length}</span>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-navy-500">{current.categoryIcon} {current.category}</span>
          </div>
          <span className={`text-xs font-semibold capitalize ${DIFFICULTY_COLOR[current.difficulty]}`}>
            {current.difficulty}
          </span>
        </div>

        <div className="p-6">
          <p className="text-xl font-bold text-navy-900 leading-snug mb-6">{current.q}</p>

          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="w-full py-3 border-2 border-dashed border-navy-200 rounded-xl text-sm font-semibold text-navy-500 hover:border-navy-400 hover:text-navy-700 transition-colors flex items-center justify-center gap-2"
            >
              Reveal model answer <ChevronRight size={15} />
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-700 mb-1.5">💡 Model answer guidance</p>
                <p className="text-sm text-blue-800 leading-relaxed">{current.tip}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-navy-600 mb-2">How did you do?</p>
                <ConfidenceButtons onSelect={handleConfidence} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PracticeMode() {
  const [mode, setMode] = useState('setup');
  const [config, setConfig] = useState(null);

  const handleStart = (cfg) => {
    setConfig(cfg);
    setMode('session');
  };

  const handleFinish = (action) => {
    setMode('setup');
    setConfig(null);
  };

  return (
    <div className="py-2">
      {mode === 'setup' && <SetupScreen onStart={handleStart} />}
      {mode === 'session' && config && <PracticeSession config={config} onFinish={handleFinish} />}
    </div>
  );
}
