import { RESOURCES } from '../../data/visa';

const BADGE_COLORS = {
  blue:   'bg-blue-100 text-blue-700',
  amber:  'bg-amber-100 text-amber-700',
  emerald:'bg-emerald-100 text-emerald-700',
  purple: 'bg-purple-100 text-purple-700',
};

const CATEGORIES = ['Official', 'Guide', 'Tool', 'Template'];

function ResourceCard({ resource }) {
  const badgeCls = BADGE_COLORS[resource.badgeColor] || 'bg-navy-100 text-navy-600';
  return (
    <div className="bg-white rounded-xl border border-navy-100 p-4 hover:border-navy-200 hover:shadow-card transition-all">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{resource.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-navy-900 text-sm leading-snug">{resource.title}</h3>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${badgeCls}`}>
              {resource.badge}
            </span>
          </div>
          <p className="text-xs text-navy-500 mt-1.5 leading-relaxed">{resource.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Resources() {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">📚</span>
        <div>
          <p className="text-sm font-semibold text-emerald-900">Official links & community guides</p>
          <p className="text-xs text-emerald-700 mt-0.5">Curated resources for F-1 visa applicants — official government sources, community walkthroughs, and document templates.</p>
        </div>
      </div>

      {CATEGORIES.map(cat => {
        const items = RESOURCES.filter(r => r.category === cat);
        if (!items.length) return null;
        return (
          <div key={cat}>
            <h3 className="font-bold text-navy-700 text-sm mb-3 flex items-center gap-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                cat === 'Official' ? 'bg-blue-100 text-blue-700' :
                cat === 'Guide' ? 'bg-emerald-100 text-emerald-700' :
                cat === 'Tool' ? 'bg-amber-100 text-amber-700' :
                'bg-purple-100 text-purple-700'
              }`}>{cat}</span>
              {cat === 'Official' && 'Government & embassy resources'}
              {cat === 'Guide' && 'Guides & walkthroughs'}
              {cat === 'Tool' && 'Tools & calculators'}
              {cat === 'Template' && 'Templates & checklists'}
            </h3>
            <div className="space-y-2">
              {items.map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
          </div>
        );
      })}

      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="flex-shrink-0 text-red-500">⚠️</span>
        <p className="text-xs text-red-700 leading-relaxed">
          Visa regulations change frequently. The links and guides above are for general reference. Always confirm requirements with your Designated School Official (DSO) and the official USCIS / US Embassy website before submitting any documents or forms.
        </p>
      </div>
    </div>
  );
}
