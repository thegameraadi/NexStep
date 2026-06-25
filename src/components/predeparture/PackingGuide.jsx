import { usePreDeparture } from '../../context/PreDepartureContext';
import { PACKING_CATEGORIES, PACKING_LISTS } from '../../data/predeparture';

const COUNTRY_OPTIONS = [
  { id: 'india', label: 'India 🇮🇳' },
  { id: 'china', label: 'China 🇨🇳' },
  { id: 'nigeria', label: 'Nigeria/Africa 🌍' },
];

const CATEGORY_STYLES = {
  emerald: { header: 'bg-emerald-50 border-emerald-200', label: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  blue: { header: 'bg-blue-50 border-blue-200', label: 'text-blue-800', badge: 'bg-blue-100 text-blue-700 border-blue-200' },
  amber: { header: 'bg-amber-50 border-amber-200', label: 'text-amber-800', badge: 'bg-amber-100 text-amber-700 border-amber-200' },
  red: { header: 'bg-red-50 border-red-200', label: 'text-red-800', badge: 'bg-red-100 text-red-700 border-red-200' },
};

const CAT_KEY_MAP = {
  definitely_bring: 'definitelyBring',
  ship_ahead: 'shipAhead',
  buy_in_us: 'buyInUS',
  dont_bother: 'dontBother',
};

export default function PackingGuide() {
  const { state, dispatch } = usePreDeparture();
  const country = state.packingCountry;
  const list = PACKING_LISTS[country] || PACKING_LISTS.india;

  return (
    <div className="space-y-6">
      {/* Country selector */}
      <div className="bg-white border border-navy-100 rounded-2xl p-4">
        <p className="text-sm font-semibold text-navy-700 mb-3">Packing list for students from:</p>
        <div className="flex gap-2 flex-wrap">
          {COUNTRY_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => dispatch({ type: 'SET_PACKING_COUNTRY', country: opt.id })}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                country === opt.id
                  ? 'bg-navy-900 text-white'
                  : 'bg-navy-50 border border-navy-200 text-navy-700 hover:border-navy-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category sections */}
      {PACKING_CATEGORIES.map(cat => {
        const items = list[CAT_KEY_MAP[cat.id]] || [];
        if (!items.length) return null;
        const styles = CATEGORY_STYLES[cat.color];
        return (
          <div key={cat.id} className="space-y-2">
            <div className={`border rounded-2xl p-3 flex items-start gap-3 ${styles.header}`}>
              <span className="text-2xl flex-shrink-0">{cat.icon}</span>
              <div>
                <p className={`font-bold text-sm ${styles.label}`}>{cat.label}</p>
                <p className={`text-xs mt-0.5 ${styles.label} opacity-75`}>{cat.description}</p>
              </div>
              <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${styles.badge}`}>
                {items.length} items
              </span>
            </div>
            <div className="space-y-2 pl-1">
              {items.map((item, i) => (
                <div key={i} className="bg-white border border-navy-100 rounded-xl p-3">
                  <p className="text-sm font-medium text-navy-900">{item.item}</p>
                  {item.note && (
                    <p className="text-xs text-navy-500 mt-1 leading-relaxed">{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Community wisdom */}
      {list.communityWisdom && list.communityWisdom.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-bold text-amber-900 mb-3">💬 Community wisdom</h3>
          <div className="space-y-2">
            {list.communityWisdom.map((wisdom, i) => (
              <p key={i} className="text-sm text-amber-800 italic leading-relaxed">{wisdom}</p>
            ))}
          </div>
        </div>
      )}

      {/* Luggage tip */}
      <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4">
        <p className="text-sm font-semibold text-navy-800 mb-1">✈️ Baggage allowance reminder</p>
        <p className="text-sm text-navy-600">
          Most international flights to the US allow 2 checked bags (23kg / 50 lbs each) in economy on major carriers. Overweight fees are $100–$200+ per bag. Pack the "Definitely Bring" items first in the first bag, documents in your carry-on, and use the second bag for shipping or soft goods.
        </p>
      </div>
    </div>
  );
}
