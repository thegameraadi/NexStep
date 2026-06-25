import { DollarSign, Award, Calculator, TrendingDown, ExternalLink } from 'lucide-react';

const SCHOLARSHIPS = [
  {
    name: 'Fulbright Foreign Student Program',
    amount: 'Full funding',
    type: 'Government',
    deadline: 'May 15',
    tag: 'Highly competitive',
    tagColor: 'bg-purple-100 text-purple-700',
  },
  {
    name: 'Inlaks Shivdasani Foundation',
    amount: 'Up to $100,000',
    type: 'Foundation',
    deadline: 'Apr 1',
    tag: 'India only',
    tagColor: 'bg-orange-100 text-orange-700',
  },
  {
    name: 'AAUW International Fellowship',
    amount: '$18,000–$30,000',
    type: 'Fellowship',
    deadline: 'Nov 15',
    tag: 'Women only',
    tagColor: 'bg-rose-100 text-rose-700',
  },
  {
    name: 'University Merit Aid',
    amount: 'Varies by school',
    type: 'Institutional',
    deadline: 'Rolling',
    tag: 'No separate app',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
];

const CITY_COSTS = [
  { city: 'Austin, TX', monthly: '$1,800', rent: '$900', food: '$400', other: '$500' },
  { city: 'Pittsburgh, PA', monthly: '$1,600', rent: '$750', food: '$380', other: '$470' },
  { city: 'Boston, MA', monthly: '$2,800', rent: '$1,400', food: '$500', other: '$900' },
  { city: 'Champaign, IL', monthly: '$1,350', rent: '$650', food: '$320', other: '$380' },
];

export default function FinanceSection() {
  return (
    <section id="finance" className="module-section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <DollarSign size={18} className="text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Finance</span>
          </div>
          <h2 className="section-heading">Make your education affordable</h2>
          <p className="section-subheading text-navy-500">
            Scholarships, loans, and real cost-of-living data — no fluff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scholarships */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Award size={18} className="text-[#F5A623]" />
              <h3 className="font-bold text-navy-900">Scholarships & Fellowships</h3>
            </div>
            <div className="space-y-3">
              {SCHOLARSHIPS.map(({ name, amount, type, deadline, tag, tagColor }) => (
                <div key={name} className="placeholder-card group hover:shadow-card transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-[#F5A623]/10 flex items-center justify-center flex-shrink-0">
                    <Award size={18} className="text-[#F5A623]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-navy-900 text-sm leading-snug">{name}</h4>
                      <ExternalLink size={13} className="text-navy-300 flex-shrink-0 mt-0.5 group-hover:text-navy-500 transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-xs font-bold text-emerald-600">{amount}</span>
                      <span className="text-[10px] text-navy-400">·</span>
                      <span className="text-xs text-navy-400">{type}</span>
                      <span className="text-[10px] text-navy-400">·</span>
                      <span className="text-xs text-navy-400">Deadline: {deadline}</span>
                    </div>
                    <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagColor}`}>
                      {tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm font-semibold text-[#F5A623] hover:underline">
              View all 80+ scholarships →
            </button>
          </div>

          {/* Cost of living */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Calculator size={18} className="text-navy-600" />
              <h3 className="font-bold text-navy-900">Cost of Living by City</h3>
            </div>
            <div className="bg-[#F9FAFB] rounded-2xl overflow-hidden border border-navy-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-50">
                    <th className="text-left px-4 py-3 text-xs font-bold text-navy-500 uppercase tracking-wide">City</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-navy-500 uppercase tracking-wide">Monthly</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-navy-500 uppercase tracking-wide hidden sm:table-cell">Rent</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-navy-500 uppercase tracking-wide hidden sm:table-cell">Food</th>
                  </tr>
                </thead>
                <tbody>
                  {CITY_COSTS.map(({ city, monthly, rent, food }, i) => (
                    <tr key={city} className={i % 2 === 0 ? 'bg-white' : 'bg-navy-50/50'}>
                      <td className="px-4 py-3 font-medium text-navy-800">{city}</td>
                      <td className="px-4 py-3 text-right font-bold text-navy-900">{monthly}</td>
                      <td className="px-4 py-3 text-right text-navy-500 hidden sm:table-cell">{rent}</td>
                      <td className="px-4 py-3 text-right text-navy-500 hidden sm:table-cell">{food}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Loan guide teaser */}
            <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={16} className="text-emerald-600" />
                <span className="font-bold text-emerald-800 text-sm">Education Loan Guide</span>
              </div>
              <p className="text-xs text-emerald-700 mb-3 leading-relaxed">
                Compare HDFC Credila, Axis Bank, SBI, and Prodigy Finance. Includes collateral vs. non-collateral, interest rates, and repayment calculators.
              </p>
              <button className="text-xs font-bold text-emerald-700 hover:underline">
                Read the loan guide →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
