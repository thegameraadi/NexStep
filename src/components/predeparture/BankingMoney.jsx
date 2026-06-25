import { useState } from 'react';
import { Star } from 'lucide-react';
import { BANKS, TRANSFER_SERVICES, CREDIT_TIPS, BANKING_EXPERIENCES } from '../../data/predeparture';

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

function BankCard({ bank }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 text-left hover:bg-navy-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{bank.icon}</span>
            <div>
              <p className="font-bold text-navy-900 text-sm">{bank.name}</p>
              <p className="text-xs text-navy-400">{bank.type}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StarRating rating={bank.rating} />
            {bank.internationalFriendly && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
                Intl Friendly
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-navy-500 mt-2 italic">{bank.bestFor}</p>
      </button>
      {open && (
        <div className="border-t border-navy-100 px-4 pb-4 pt-3 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1.5">Pros</p>
              <ul className="space-y-1.5">
                {bank.pros.map((p, i) => (
                  <li key={i} className="text-xs text-navy-700 flex items-start gap-1.5">
                    <span className="text-emerald-500 flex-shrink-0">✓</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1.5">Cons</p>
              <ul className="space-y-1.5">
                {bank.cons.map((c, i) => (
                  <li key={i} className="text-xs text-navy-700 flex items-start gap-1.5">
                    <span className="text-red-400 flex-shrink-0">✕</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-navy-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-navy-600 mb-0.5">Documents needed to open</p>
            <p className="text-xs text-navy-700">{bank.openingDocs}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-amber-700 mb-0.5">Community note</p>
            <p className="text-xs text-amber-800 leading-relaxed">{bank.communityNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TransferCard({ svc }) {
  return (
    <div className={`bg-white border rounded-2xl p-4 ${svc.id === 'wise' ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-navy-100'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{svc.icon}</span>
          <div>
            <p className="font-bold text-navy-900 text-sm">{svc.name}</p>
            <p className="text-xs text-navy-400">{svc.speed}</p>
          </div>
        </div>
        <StarRating rating={svc.rating} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <div className="bg-navy-50 rounded-lg p-2">
          <p className="text-navy-400 mb-0.5">Fee</p>
          <p className="font-semibold text-navy-800">{svc.feeNote}</p>
        </div>
        <div className="bg-navy-50 rounded-lg p-2">
          <p className="text-navy-400 mb-0.5">Max/transfer</p>
          <p className="font-semibold text-navy-800">{svc.maxPerTransfer}</p>
        </div>
      </div>
      <div className={`rounded-xl p-3 text-xs ${svc.id === 'wise' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-navy-50 text-navy-700'}`}>
        <span className="font-semibold">Verdict: </span>{svc.verdict}
      </div>
    </div>
  );
}

export default function BankingMoney() {
  const [activeSection, setActiveSection] = useState('banks');

  const sections = [
    { id: 'banks', label: 'Bank Comparison' },
    { id: 'transfers', label: 'Money Transfers' },
    { id: 'credit', label: 'Building Credit' },
    { id: 'stories', label: 'Community Stories' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeSection === s.id
                ? 'bg-navy-900 text-white'
                : 'bg-white border border-navy-200 text-navy-600 hover:border-navy-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'banks' && (
        <div className="space-y-3">
          <p className="text-sm text-navy-500">Tap any bank to see details, pros/cons, and the documents you'll need to open an account.</p>
          {BANKS.map(b => <BankCard key={b.id} bank={b} />)}
          <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-navy-800 mb-1">💡 First week priority</p>
            <p className="text-sm text-navy-600 leading-relaxed">Open your US bank account within the first 3 days of arrival — before you do almost anything else. Many orientation programs will have bank representatives on campus in the first week. You need a US account to receive any stipend, scholarship disbursement, or scholarship.</p>
          </div>
        </div>
      )}

      {activeSection === 'transfers' && (
        <div className="space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-emerald-800 mb-1">Set up Wise before leaving</p>
            <p className="text-sm text-emerald-700">The difference between bank wire and Wise on a $2,000/month transfer over 2 years is over $1,000 in fees. Set up your Wise account while still at home — it's easier to verify identity with Indian documents before traveling.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {TRANSFER_SERVICES.map(svc => <TransferCard key={svc.id} svc={svc} />)}
          </div>
        </div>
      )}

      {activeSection === 'credit' && (
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-amber-900 mb-1">Start building credit immediately</p>
            <p className="text-sm text-amber-800">Your credit score starts at zero in the US. By the end of Year 1, you can have a 700+ score if you start right. This matters for: Year 2 apartment leases, car loans, and any US credit product. Don't wait.</p>
          </div>
          <div className="space-y-3">
            {CREDIT_TIPS.map((tip, i) => (
              <div key={i} className="bg-white border border-navy-100 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <p className="font-semibold text-navy-900 text-sm mb-1">{tip.title}</p>
                  <p className="text-sm text-navy-600 leading-relaxed">{tip.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'stories' && (
        <div className="space-y-3">
          <p className="text-sm text-navy-500">Real experiences from international students on banking in the US.</p>
          {BANKING_EXPERIENCES.map((exp, i) => (
            <div key={i} className="bg-white border border-navy-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-sm font-bold text-navy-700">
                  {exp.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{exp.author}</p>
                  <p className="text-xs text-navy-400">{exp.bank}</p>
                </div>
              </div>
              <p className="text-sm text-navy-700 leading-relaxed">{exp.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
