import { useState } from 'react';
import { MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CONSULATES } from '../../data/visa';
import { useVisa } from '../../context/VisaContext';

function TrendIcon({ trend }) {
  if (trend === 'increasing') return <TrendingUp size={13} className="text-red-500" />;
  if (trend === 'decreasing') return <TrendingDown size={13} className="text-emerald-500" />;
  return <Minus size={13} className="text-navy-400" />;
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <div key={i} className={`w-2 h-2 rounded-full ${i <= Math.round(rating) ? 'bg-[#F5A623]' : 'bg-navy-200'}`} />
      ))}
      <span className="text-xs text-navy-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function ConsulateCard({ consulate, selected, onSelect }) {
  const isSelected = selected === consulate.id;

  return (
    <button
      onClick={() => onSelect(isSelected ? '' : consulate.id)}
      className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${isSelected ? 'border-navy-900 bg-navy-50' : 'border-navy-100 bg-white hover:border-navy-200'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-navy-900 text-sm">{consulate.city}</p>
          <p className="text-xs text-navy-500 mt-0.5 line-clamp-1">{consulate.fullName}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1 justify-end">
            <TrendIcon trend={consulate.trend} />
            <span className={`text-xs font-semibold ${consulate.trend === 'increasing' ? 'text-red-600' : consulate.trend === 'decreasing' ? 'text-emerald-600' : 'text-navy-600'}`}>
              {consulate.currentWait}
            </span>
          </div>
          <p className="text-xs text-navy-400 mt-0.5">wait time</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <Stars rating={consulate.rating} />
        <div className="flex items-center gap-1 text-xs">
          <span className="text-emerald-600 font-semibold">{consulate.recentStats.approvals}%</span>
          <span className="text-navy-400">approval</span>
        </div>
      </div>
    </button>
  );
}

function ConsulateDetail({ consulate }) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-5 space-y-5">
      <div>
        <h3 className="font-bold text-navy-900">{consulate.fullName}</h3>
        <div className="flex items-start gap-1.5 mt-1.5">
          <MapPin size={13} className="text-navy-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-navy-500">{consulate.address}</p>
        </div>
        <p className="text-xs text-navy-500 mt-1">Jurisdiction: {consulate.jurisdiction}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-emerald-600">{consulate.recentStats.approvals}%</p>
          <p className="text-xs text-navy-600 mt-0.5">Approvals</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-red-500">{consulate.recentStats.rejections}%</p>
          <p className="text-xs text-navy-600 mt-0.5">Rejections</p>
        </div>
        <div className="bg-navy-50 border border-navy-100 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-navy-700">{consulate.recentStats.sampleSize}</p>
          <p className="text-xs text-navy-600 mt-0.5">Reports</p>
        </div>
      </div>
      <p className="text-xs text-navy-400 -mt-3">Data from {consulate.recentStats.period} · Community-reported</p>

      {/* Community notes */}
      <div>
        <p className="text-xs font-bold text-navy-700 mb-2">💬 Community intel</p>
        <div className="space-y-2">
          {consulate.communityNotes.map((note, i) => (
            <div key={i} className="flex items-start gap-2 bg-navy-50 rounded-xl p-3">
              <span className="text-navy-400 flex-shrink-0 mt-0.5 text-xs">•</span>
              <p className="text-xs text-navy-600 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Common rejection reasons */}
      <div>
        <p className="text-xs font-bold text-red-600 mb-2">⚠️ Common rejection reasons here</p>
        <div className="space-y-1.5">
          {consulate.commonRejectionReasons.map((r, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-red-400 flex-shrink-0">✗</span>
              <p className="text-xs text-navy-600">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ConsulateIntel() {
  const { state, dispatch } = useVisa();
  const selected = state.selectedConsulate;
  const setSelected = (id) => dispatch({ type: 'SET_CONSULATE', id });
  const selectedData = CONSULATES.find(c => c.id === selected);

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">🏛️</span>
        <div>
          <p className="text-sm font-semibold text-amber-900">Consulate-specific intel</p>
          <p className="text-xs text-amber-700 mt-0.5">Approval rates, wait times, and community-reported tips for each US consulate in India. Select your consulate to see details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {CONSULATES.map(c => (
          <ConsulateCard key={c.id} consulate={c} selected={selected} onSelect={setSelected} />
        ))}
      </div>

      {selectedData && <ConsulateDetail consulate={selectedData} />}

      {!selected && (
        <div className="text-center py-8 bg-white rounded-2xl border-2 border-dashed border-navy-200">
          <p className="text-3xl mb-2">🗺️</p>
          <p className="font-semibold text-navy-700 text-sm">Select a consulate above to see detailed intel</p>
          <p className="text-xs text-navy-400 mt-1">Approval rates, tips, and common rejection reasons</p>
        </div>
      )}
    </div>
  );
}
