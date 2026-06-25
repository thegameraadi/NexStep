import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';
import { INDIAN_LOANS, US_LOANS } from '../../data/finance';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= Math.round(rating) ? 'bg-[#F5A623]' : 'bg-navy-200'}`} />
      ))}
      <span className="text-xs text-navy-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function LoanCard({ loan, isUS }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bg-white rounded-2xl border transition-all overflow-hidden ${open ? 'border-navy-300 shadow-card' : 'border-navy-100'}`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-navy-900">{loan.name}</h3>
            <p className="text-xs text-navy-500 mt-0.5">{isUS ? loan.type : loan.bank}</p>
          </div>
          <Stars rating={loan.rating} />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-navy-50 rounded-xl p-3">
            <p className="text-xs text-navy-500 mb-0.5">Max amount</p>
            <p className="text-sm font-bold text-navy-900">{loan.maxAmount}</p>
          </div>
          <div className="bg-navy-50 rounded-xl p-3">
            <p className="text-xs text-navy-500 mb-0.5">Interest rate</p>
            <p className="text-sm font-bold text-navy-900 leading-tight">{loan.interestRate}</p>
          </div>
        </div>

        {!isUS && (
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-navy-50 rounded-xl p-3">
              <p className="text-xs text-navy-500 mb-0.5">Collateral</p>
              <p className="text-sm font-semibold text-navy-900">{loan.collateralRequired}</p>
            </div>
            <div className="bg-navy-50 rounded-xl p-3">
              <p className="text-xs text-navy-500 mb-0.5">Processing fee</p>
              <p className="text-sm font-semibold text-navy-900">{loan.processingFee}</p>
            </div>
          </div>
        )}

        {isUS && (
          <div className="flex gap-2 mt-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${loan.cosignerRequired ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {loan.cosignerRequired ? 'Cosigner required' : 'No cosigner needed'}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${loan.collateralRequired ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {loan.collateralRequired ? 'Collateral needed' : 'No collateral'}
            </span>
          </div>
        )}

        <button
          onClick={() => setOpen(v => !v)}
          className="mt-4 flex items-center gap-1 text-xs font-medium text-[#F5A623] hover:underline"
        >
          {open ? 'Show less' : 'Pros, cons & community notes'}
          {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 p-5 space-y-4 bg-navy-50/30">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1.5">
                <ThumbsUp size={12} /> Pros
              </p>
              <ul className="space-y-1.5">
                {loan.pros.map((p, i) => (
                  <li key={i} className="text-xs text-navy-600 flex items-start gap-1.5">
                    <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-red-600 mb-2 flex items-center gap-1.5">
                <ThumbsDown size={12} /> Cons
              </p>
              <ul className="space-y-1.5">
                {loan.cons.map((c, i) => (
                  <li key={i} className="text-xs text-navy-600 flex items-start gap-1.5">
                    <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
            <p className="text-xs font-bold text-amber-700 mb-1">💬 Community experience</p>
            <p className="text-xs text-amber-700 leading-relaxed">{loan.communityNote}</p>
          </div>

          {!isUS && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded-lg p-2.5 border border-navy-100">
                <p className="text-navy-500 mb-0.5">Moratorium</p>
                <p className="font-semibold text-navy-800">{loan.moratorium}</p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-navy-100">
                <p className="text-navy-500 mb-0.5">Repayment period</p>
                <p className="font-semibold text-navy-800">{loan.repaymentYears} years</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SECTION_TIPS = [
  { text: 'Apply for an Indian bank loan alongside US-based options to compare rates.', icon: '⚖️' },
  { text: 'The moratorium period means you don\'t need to repay while studying — but interest often accrues. Ask your bank to clarify.', icon: '📅' },
  { text: 'Section 80E of the Indian Income Tax Act allows you to deduct education loan interest — remember this when you file returns after returning home.', icon: '🧾' },
  { text: 'Prodigy Finance and MPOWER serve different schools. Always check their eligible institution list before applying.', icon: '🏫' },
  { text: 'Stack your funding: scholarship + assistantship + loan = lowest out-of-pocket cost. Never take a larger loan than you need.', icon: '📊' },
];

export default function LoanGuidance() {
  const [tab, setTab] = useState('india');

  return (
    <div className="space-y-6">
      {/* Tips banner */}
      <div className="bg-white rounded-2xl border border-navy-100 p-5">
        <h3 className="font-bold text-navy-900 mb-3">Before you borrow</h3>
        <div className="space-y-2">
          {SECTION_TIPS.map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0">{tip.icon}</span>
              <p className="text-sm text-navy-600 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex gap-2">
        {[
          { id: 'india', label: '🇮🇳 Indian Banks' },
          { id: 'us', label: '🇺🇸 US-Based Lenders' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === t.id ? 'bg-navy-900 text-white' : 'bg-white border border-navy-200 text-navy-700 hover:border-navy-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'india' && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5">
            <p className="text-xs text-blue-800 font-semibold">India-specific note</p>
            <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
              Indian bank loans are denominated in INR — meaning you borrow in rupees and repay in rupees. This protects you from currency risk if you return to India, but if you plan to stay in the US and earn USD, you will benefit from the currency appreciation. Always factor in the USD/INR rate when comparing with US-based lenders.
            </p>
          </div>
          <div className="space-y-3">
            {INDIAN_LOANS.map(loan => <LoanCard key={loan.id} loan={loan} isUS={false} />)}
          </div>
        </div>
      )}

      {tab === 'us' && (
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
            <p className="text-xs text-amber-800 font-semibold">US lender note</p>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
              US-based loans are in USD — convenient for paying US tuition directly, but interest rates are often higher than Indian bank loans. For students planning to stay and work in the US post-graduation, the absence of currency conversion risk can make these more attractive despite higher rates. Compare total repayment cost, not just headline rate.
            </p>
          </div>
          <div className="space-y-3">
            {US_LOANS.map(loan => <LoanCard key={loan.id} loan={loan} isUS={true} />)}
          </div>
        </div>
      )}
    </div>
  );
}
