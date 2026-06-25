import { useState, useMemo } from 'react';
import { Plus, X, Sliders } from 'lucide-react';
import { MOCK_RESULTS } from '../../data/decisions';
import { useDecisions } from '../../context/DecisionsContext';

const ADMITTED = MOCK_RESULTS.filter(r => r.outcome === 'Admitted');
const SCHOOLS = [...new Map(ADMITTED.map(r => [`${r.school}||${r.program}`, r])).values()];

const METRICS = [
  { key: 'funding', label: 'Funding / Cost', icon: '💰' },
  { key: 'ranking', label: 'Program ranking', icon: '🏆' },
  { key: 'location', label: 'Location fit', icon: '📍' },
  { key: 'career', label: 'Career outcomes', icon: '🚀' },
  { key: 'research', label: 'Research quality', icon: '🔬' },
  { key: 'network', label: 'Alumni network', icon: '🤝' },
];

const WEIGHTS_DEFAULT = { funding: 25, ranking: 25, location: 20, career: 30 };

const COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'];
const LIGHT_COLORS = ['bg-blue-50 border-blue-200', 'bg-emerald-50 border-emerald-200', 'bg-amber-50 border-amber-200', 'bg-purple-50 border-purple-200'];
const TEXT_COLORS = ['text-blue-700', 'text-emerald-700', 'text-amber-700', 'text-purple-700'];

function ScoreSlider({ label, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-navy-600 w-28 flex-shrink-0">{label}</span>
      <input type="range" min="1" max="10" value={value} onChange={e => onChange(parseInt(e.target.value))}
        className="flex-1 accent-[#F5A623]" />
      <span className="text-xs font-bold text-navy-800 w-4 text-center">{value}</span>
    </div>
  );
}

function AddSchoolModal({ onClose, onAdd, existing }) {
  const [selected, setSelected] = useState(null);
  const available = SCHOOLS.filter(s => !existing.find(e => e.id === `${s.school}||${s.program}`));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy-100">
          <h3 className="font-bold text-navy-900">Add an Admit to Compare</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50"><X size={18} /></button>
        </div>
        <div className="p-4 space-y-2">
          {available.length === 0 ? (
            <p className="text-sm text-navy-500 text-center py-6">No more admits to add (max 4)</p>
          ) : (
            available.map(r => (
              <button
                key={`${r.school}||${r.program}`}
                onClick={() => setSelected(`${r.school}||${r.program}`)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${selected === `${r.school}||${r.program}` ? 'border-navy-900 bg-navy-50' : 'border-navy-100 hover:border-navy-200'}`}
              >
                <p className="font-semibold text-navy-900 text-sm">{r.school}</p>
                <p className="text-xs text-navy-500 mt-0.5">{r.program}</p>
              </button>
            ))
          )}
        </div>
        <div className="px-4 pb-4 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-navy-200 rounded-xl text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors">
            Cancel
          </button>
          <button
            disabled={!selected}
            onClick={() => { if (selected) { onAdd(selected); onClose(); } }}
            className="flex-1 py-2.5 bg-navy-900 rounded-xl text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-40 transition-colors"
          >
            Add to Comparison
          </button>
        </div>
      </div>
    </div>
  );
}

function RatingMatrix({ admits, scores, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-navy-100">
        <h3 className="font-bold text-navy-900 text-sm flex items-center gap-2"><Sliders size={14} /> Your Ratings</h3>
        <p className="text-xs text-navy-500 mt-0.5">Rate each school 1–10 on every dimension</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-navy-100">
              <th className="text-left px-5 py-3 text-navy-500 font-semibold w-36">Dimension</th>
              {admits.map((a, i) => (
                <th key={a.id} className="px-4 py-3 text-center min-w-[120px]">
                  <div className={`inline-block px-2 py-1 rounded-lg text-xs font-bold ${TEXT_COLORS[i]}`}>
                    {a.school.split(' ')[0]}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {METRICS.map(m => (
              <tr key={m.key}>
                <td className="px-5 py-3 text-navy-700 font-medium">{m.icon} {m.label}</td>
                {admits.map((a) => (
                  <td key={a.id} className="px-4 py-2 text-center">
                    <input
                      type="number" min="1" max="10"
                      value={scores[a.id]?.[m.key] ?? 5}
                      onChange={e => onChange(a.id, m.key, Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-14 border border-navy-200 rounded-lg px-2 py-1 text-center text-sm font-semibold text-navy-900 outline-none focus:border-navy-400 transition-colors"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function OfferComparison() {
  const { state, dispatch } = useDecisions();
  const [showAddModal, setShowAddModal] = useState(false);
  const [weights, setWeights] = useState(WEIGHTS_DEFAULT);
  const [scores, setScores] = useState({});

  const admits = state.comparisonAdmits;

  const setWeight = (key, val) => setWeights(prev => ({ ...prev, [key]: val }));
  const setScore = (admitId, metric, val) => setScores(prev => ({
    ...prev,
    [admitId]: { ...prev[admitId], [metric]: val }
  }));

  const weightedScores = useMemo(() => {
    const weightKeys = Object.keys(WEIGHTS_DEFAULT);
    const totalWeight = weightKeys.reduce((s, k) => s + (weights[k] || 0), 0);
    return admits.map(a => {
      const s = scores[a.id] || {};
      const raw = weightKeys.reduce((sum, k) => sum + (s[k] ?? 5) * (weights[k] || 0), 0);
      return { id: a.id, score: totalWeight > 0 ? Math.round((raw / totalWeight) * 10) / 10 : 0 };
    }).sort((a, b) => b.score - a.score);
  }, [admits, scores, weights]);

  const handleAdd = (key) => {
    const [school, program] = key.split('||');
    const sample = ADMITTED.find(r => r.school === school && r.program === program);
    dispatch({ type: 'ADD_COMPARISON', admit: { id: key, school, program, sample } });
  };

  const handleRemove = (id) => dispatch({ type: 'REMOVE_COMPARISON', id });

  const topId = weightedScores[0]?.id;

  return (
    <div className="space-y-6">
      {/* Add school row */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-navy-900">Compare Your Admits</h3>
          <p className="text-xs text-navy-500 mt-0.5">Add up to 4 admitted programs and score them side by side</p>
        </div>
        {admits.length < 4 && (
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">
            <Plus size={14} /> Add Admit
          </button>
        )}
      </div>

      {admits.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-navy-200">
          <p className="text-5xl mb-3">⚖️</p>
          <p className="font-semibold text-navy-700">No admits added yet</p>
          <p className="text-xs text-navy-400 mt-1 mb-5">Add your admitted programs to compare them side by side</p>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 px-5 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors mx-auto">
            <Plus size={14} /> Add Your First Admit
          </button>
        </div>
      ) : (
        <>
          {/* Added schools */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {admits.map((a, i) => (
              <div key={a.id} className={`relative rounded-2xl border-2 p-4 ${LIGHT_COLORS[i]}`}>
                <button onClick={() => handleRemove(a.id)} className="absolute top-2 right-2 p-1 rounded-lg text-navy-400 hover:text-navy-700 hover:bg-white/50">
                  <X size={13} />
                </button>
                {a.id === topId && (
                  <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-[#F5A623] text-navy-900 mb-2">⭐ Top pick</span>
                )}
                <div className={`w-3 h-3 rounded-full ${COLORS[i]} mb-2`} />
                <p className={`font-bold text-sm ${TEXT_COLORS[i]}`}>{a.school}</p>
                <p className="text-xs text-navy-500 mt-0.5 leading-snug">{a.program}</p>
                {weightedScores.find(w => w.id === a.id) && (
                  <p className={`text-2xl font-black mt-2 ${TEXT_COLORS[i]}`}>
                    {weightedScores.find(w => w.id === a.id)?.score}
                    <span className="text-xs font-normal text-navy-400">/10</span>
                  </p>
                )}
              </div>
            ))}
            {admits.length < 4 && (
              <button onClick={() => setShowAddModal(true)} className="rounded-2xl border-2 border-dashed border-navy-200 p-4 flex flex-col items-center justify-center gap-2 hover:border-navy-400 transition-colors text-navy-400 hover:text-navy-600">
                <Plus size={20} />
                <span className="text-xs font-semibold">Add admit</span>
              </button>
            )}
          </div>

          {/* Weight sliders */}
          <div className="bg-white rounded-2xl border border-navy-100 p-5">
            <h3 className="font-bold text-navy-900 text-sm mb-1">What matters most to you?</h3>
            <p className="text-xs text-navy-500 mb-4">Adjust the weights below — higher weight = more influence on the final score</p>
            <div className="space-y-3">
              {Object.entries(WEIGHTS_DEFAULT).map(([key]) => {
                const metric = METRICS.find(m => m.key === key);
                return (
                  <ScoreSlider key={key} label={`${metric?.icon} ${metric?.label}`} value={weights[key] || 5} onChange={v => setWeight(key, v)} />
                );
              })}
            </div>
          </div>

          {/* Ratings matrix */}
          <RatingMatrix admits={admits} scores={scores} onChange={setScore} />

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl border border-navy-100 p-5">
            <h3 className="font-bold text-navy-900 text-sm mb-3">Weighted Score Ranking</h3>
            <div className="space-y-2">
              {weightedScores.map((ws, rank) => {
                const admit = admits.find(a => a.id === ws.id);
                const colorIdx = admits.findIndex(a => a.id === ws.id);
                return (
                  <div key={ws.id} className={`flex items-center gap-3 p-3 rounded-xl ${ws.id === topId ? 'bg-amber-50 border border-amber-200' : 'bg-navy-50'}`}>
                    <span className="text-lg font-black text-navy-400 w-5 text-center">{rank + 1}</span>
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${COLORS[colorIdx]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-900 text-sm truncate">{admit?.school}</p>
                      <p className="text-xs text-navy-500 truncate">{admit?.program}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-black ${ws.id === topId ? 'text-amber-600' : 'text-navy-700'}`}>{ws.score}</p>
                      <p className="text-xs text-navy-400">/10</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {showAddModal && <AddSchoolModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} existing={admits} />}
    </div>
  );
}
