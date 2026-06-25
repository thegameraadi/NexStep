import { useNavigate } from 'react-router-dom';
import { X, Star, DollarSign, Users, Clock, ExternalLink } from 'lucide-react';
import { PROGRAMS } from '../../data/programs';
import { useMyList } from '../../context/MyListContext';
import StatusSelector from './StatusSelector';

const ROWS = [
  { label: 'Degree', key: (p) => p.degreeType },
  { label: 'Duration', key: (p) => p.duration },
  { label: 'Tuition/yr', key: (p) => `$${p.tuition.toLocaleString()}` },
  { label: 'GRE', key: (p) => p.greRequired },
  { label: 'Deadline', key: (p) => p.deadline },
  { label: 'Accept Rate', key: (p) => `${p.acceptanceRate}%` },
  { label: 'Rating', key: (p) => `${p.rating} ★` },
  { label: 'Reviews', key: (p) => p.reviewCount },
  { label: 'Location', key: (p) => `${p.city}, ${p.state}` },
  { label: 'Ranking Tier', key: (p) => p.rankingTier },
];

export default function ComparisonTable({ compareIds }) {
  const navigate = useNavigate();
  const { removeFromList } = useMyList();
  const programs = compareIds.map((id) => PROGRAMS.find((p) => p.id === id)).filter(Boolean);

  if (!programs.length) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="w-32 text-left py-3 pr-4">
              <span className="text-xs font-bold text-navy-400 uppercase tracking-widest">Compare</span>
            </th>
            {programs.map((p) => (
              <th key={p.id} className="text-left pb-3 px-3 min-w-[200px]">
                <div className="bg-white rounded-xl border border-navy-100 p-3">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold text-navy-400">{p.shortSchool}</span>
                    <button
                      onClick={() => removeFromList(p.id)}
                      className="text-navy-300 hover:text-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => navigate(`/programs/${p.id}`)}
                    className="text-left font-bold text-navy-900 text-xs leading-snug hover:text-navy-600 transition-colors"
                  >
                    {p.program}
                  </button>
                  <div className="mt-2">
                    <StatusSelector programId={p.id} compact />
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(({ label, key }, i) => (
            <tr key={label} className={i % 2 === 0 ? 'bg-white' : 'bg-navy-50/40'}>
              <td className="py-2.5 pr-4 text-xs font-semibold text-navy-500 rounded-l-lg pl-3">{label}</td>
              {programs.map((p) => (
                <td key={p.id} className="py-2.5 px-3 text-xs text-navy-800 font-medium">
                  {key(p)}
                </td>
              ))}
            </tr>
          ))}
          {/* Tags row */}
          <tr className="bg-white">
            <td className="py-2.5 pr-4 text-xs font-semibold text-navy-500 pl-3 rounded-l-lg">Tags</td>
            {programs.map((p) => (
              <td key={p.id} className="py-2.5 px-3">
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-navy-100 text-navy-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
