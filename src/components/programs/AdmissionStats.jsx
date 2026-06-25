import { BarChart2, Users, TrendingUp, Info } from 'lucide-react';

function RangeBar({ label, min, max, absMin, absMax, unit = '' }) {
  const pct = (v) => ((v - absMin) / (absMax - absMin)) * 100;
  const left = pct(min);
  const width = pct(max) - left;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-navy-700">{label}</span>
        <span className="text-xs font-bold text-navy-900">
          {unit}{min}–{unit}{max}
        </span>
      </div>
      <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-navy-700 rounded-full"
          style={{ marginLeft: `${left}%`, width: `${width}%` }}
        />
      </div>
      <div className="flex justify-between mt-0.5">
        <span className="text-[10px] text-navy-400">{unit}{absMin}</span>
        <span className="text-[10px] text-navy-400">{unit}{absMax}</span>
      </div>
    </div>
  );
}

export default function AdmissionStats({ stats, acceptanceRate }) {
  if (!stats) return null;

  return (
    <div className="bg-[#F9FAFB] rounded-2xl p-5 border border-navy-100">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BarChart2 size={18} className="text-navy-600" />
          <h3 className="font-bold text-navy-900">Community Admission Data</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-navy-400">
          <Users size={12} />
          {stats.submittedBy} submissions
        </div>
      </div>

      {/* Acceptance rate */}
      <div className="flex items-center gap-4 mb-5 bg-white rounded-xl p-4 border border-navy-100">
        <div className="text-center">
          <div className="text-3xl font-bold text-navy-900">{acceptanceRate}%</div>
          <div className="text-xs text-navy-500 mt-0.5">Acceptance Rate</div>
        </div>
        <div className="flex-1 text-xs text-navy-500 leading-relaxed">
          Community-sourced from {stats.submittedBy} applicants who shared their results. Actual rates vary by program cycle.
        </div>
      </div>

      {/* GRE scores */}
      {stats.greVerbal && (
        <>
          <RangeBar label="GRE Verbal" min={stats.greVerbal[0]} max={stats.greVerbal[1]} absMin={130} absMax={170} />
          <RangeBar label="GRE Quant" min={stats.greQuant[0]} max={stats.greQuant[1]} absMin={130} absMax={170} />
          <RangeBar label="GRE AWA" min={stats.greAWA[0]} max={stats.greAWA[1]} absMin={0} absMax={6} />
        </>
      )}

      {/* GMAT */}
      {stats.gmatRange && (
        <RangeBar label="GMAT" min={stats.gmatRange[0]} max={stats.gmatRange[1]} absMin={400} absMax={800} />
      )}

      {/* GPA */}
      {stats.gpaRange && (
        <RangeBar label="GPA (4.0 scale)" min={stats.gpaRange[0]} max={stats.gpaRange[1]} absMin={2.5} absMax={4.0} />
      )}

      {/* Work experience */}
      {stats.workExpYears > 0 && (
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-navy-100">
          <TrendingUp size={14} className="text-navy-500 flex-shrink-0" />
          <span className="text-xs text-navy-600">
            Typical work experience: <strong className="text-navy-900">{stats.workExpYears}+ years</strong>
          </span>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 mt-4 pt-4 border-t border-navy-100">
        <Info size={12} className="text-navy-400 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-navy-400 leading-relaxed">
          Data sourced from community reports. Ranges represent middle 80% of admitted students who shared their profiles. Not official university data.
        </p>
      </div>
    </div>
  );
}
