import { Star } from 'lucide-react';
import { SIM_OPTIONS, PHONE_TIPS } from '../../data/predeparture';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={11}
          className={n <= Math.round(rating) ? 'text-[#F5A623] fill-[#F5A623]' : 'text-navy-200'}
        />
      ))}
      <span className="text-xs text-navy-500 ml-0.5">{rating}</span>
    </div>
  );
}

function ProviderCard({ provider }) {
  const isBefore = provider.buyBefore;
  return (
    <div className={`bg-white border rounded-2xl p-5 flex flex-col gap-4 ${isBefore ? 'border-[#F5A623] ring-1 ring-amber-200' : 'border-navy-100'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{provider.icon}</span>
          <div>
            <p className="font-bold text-navy-900 text-sm">{provider.name}</p>
            <p className="text-xs text-navy-400">{provider.network}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRating rating={provider.rating} />
          {isBefore && (
            <span className="text-[10px] font-bold bg-[#F5A623] text-navy-900 px-2 py-0.5 rounded-full">
              Buy before landing ✈️
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-navy-50 rounded-lg p-2">
          <p className="text-navy-400 mb-0.5">Plans</p>
          <p className="font-medium text-navy-800">{provider.plans}</p>
        </div>
        <div className="bg-navy-50 rounded-lg p-2">
          <p className="text-navy-400 mb-0.5">Contract</p>
          <p className="font-medium text-navy-800">{provider.contract}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div>
          <p className="font-semibold text-emerald-600 uppercase tracking-wide mb-1.5">Pros</p>
          <ul className="space-y-1.5">
            {provider.pros.map((p, i) => (
              <li key={i} className="text-navy-700 flex items-start gap-1.5">
                <span className="text-emerald-500 flex-shrink-0">✓</span>{p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-red-500 uppercase tracking-wide mb-1.5">Cons</p>
          <ul className="space-y-1.5">
            {provider.cons.map((c, i) => (
              <li key={i} className="text-navy-700 flex items-start gap-1.5">
                <span className="text-red-400 flex-shrink-0">✕</span>{c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`rounded-xl p-3 text-xs ${isBefore ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-navy-50 text-navy-700'}`}>
        <span className="font-semibold">Verdict: </span>{provider.verdict}
      </div>
    </div>
  );
}

export default function SimCard() {
  const beforeLanding = SIM_OPTIONS.filter(p => p.buyBefore);
  const afterLanding = SIM_OPTIONS.filter(p => !p.buyBefore);

  return (
    <div className="space-y-6">
      {/* Before landing */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">✈️</span>
          <h3 className="font-bold text-navy-900">Get this before you board</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {beforeLanding.map(p => <ProviderCard key={p.id} provider={p} />)}
        </div>
      </div>

      {/* After landing */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🇺🇸</span>
          <h3 className="font-bold text-navy-900">Get a permanent plan after arriving</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {afterLanding.map(p => <ProviderCard key={p.id} provider={p} />)}
        </div>
      </div>

      {/* Phone tips */}
      <div>
        <h3 className="font-bold text-navy-900 mb-3">Phone tips before you leave</h3>
        <div className="space-y-2">
          {PHONE_TIPS.map((tip, i) => (
            <div key={i} className="bg-white border border-navy-100 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{tip.icon}</span>
              <p className="text-sm text-navy-700 leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
