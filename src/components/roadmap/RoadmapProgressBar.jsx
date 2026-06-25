import { useUser } from '../../context/UserContext';

export default function RoadmapProgressBar() {
  const { profile } = useUser();
  const pct = Math.round(((profile.currentStage - 1) / 9) * 100);

  return (
    <div className="bg-navy-800 rounded-2xl p-5">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-1">Your progress</p>
          <p className="text-white text-sm font-medium">
            Stage {profile.currentStage} of 10 —{' '}
            <span className="text-[#F5A623] font-bold">{pct}% through your US journey</span>
          </p>
        </div>
        <span className="text-3xl font-bold text-white tabular-nums">{pct}%</span>
      </div>

      {/* Track */}
      <div className="h-2.5 bg-navy-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#F5A623] to-amber-400 rounded-full transition-all duration-700"
          style={{ width: `${Math.max(pct, 3)}%` }}
        />
      </div>

      {/* Stage ticks */}
      <div className="flex justify-between mt-1.5 px-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-0.5 h-1.5 rounded-full transition-colors ${
              i < profile.currentStage - 1
                ? 'bg-[#F5A623]'
                : i === profile.currentStage - 1
                ? 'bg-[#F5A623]'
                : 'bg-navy-600'
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-navy-500">Start</span>
        <span className="text-[10px] text-navy-500">First class</span>
      </div>
    </div>
  );
}
