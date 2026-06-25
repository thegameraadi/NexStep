import { Star } from 'lucide-react';

export default function StarRating({ value, max = 5, size = 12, showValue = false }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.round(value)
                ? 'fill-[#F5A623] text-[#F5A623]'
                : 'fill-navy-100 text-navy-100'
            }
          />
        ))}
      </span>
      {showValue && (
        <span className="text-xs font-bold text-navy-700 ml-0.5">{value.toFixed(1)}</span>
      )}
    </span>
  );
}
