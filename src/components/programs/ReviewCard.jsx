import { ThumbsUp, BadgeCheck } from 'lucide-react';
import StarRating from './StarRating';

const CATEGORIES = [
  { key: 'academics', label: 'Academics' },
  { key: 'careerSupport', label: 'Career Support' },
  { key: 'costOfLiving', label: 'Cost of Living' },
  { key: 'diversity', label: 'Diversity' },
  { key: 'overall', label: 'Overall' },
];

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-5">
      {/* Author */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: review.avatar }}
          >
            {review.author[0]}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-navy-900">{review.author}</span>
              {review.verified && (
                <BadgeCheck size={14} className="text-emerald-500" />
              )}
            </div>
            <span className="text-xs text-navy-400">{review.batch} · {review.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <StarRating value={review.overall} size={12} showValue />
        </div>
      </div>

      {/* Category ratings */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 bg-navy-50 rounded-xl p-3">
        {CATEGORIES.filter((c) => c.key !== 'overall').map(({ key, label }) => (
          <div key={key} className="text-center">
            <div className="text-lg font-bold text-navy-900">{review[key]}<span className="text-xs text-navy-400">/5</span></div>
            <div className="text-[10px] text-navy-500 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Title + body */}
      <h4 className="font-bold text-navy-900 text-sm mb-2">{review.title}</h4>
      <p className="text-sm text-navy-600 leading-relaxed">{review.body}</p>

      {/* Helpful */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-navy-50">
        <button className="inline-flex items-center gap-1.5 text-xs text-navy-400 hover:text-navy-700 transition-colors">
          <ThumbsUp size={12} />
          Helpful ({review.helpful})
        </button>
      </div>
    </div>
  );
}
