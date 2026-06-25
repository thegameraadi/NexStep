import { Plane, Package, CreditCard, Shield, Home, CheckCircle2 } from 'lucide-react';

const PACKING_CATEGORIES = [
  {
    category: 'Documents (carry-on only)',
    icon: '📄',
    items: ['Passport + F-1 Visa', 'I-20 (original)', 'I-901 SEVIS receipt', 'Admit letter', 'Transcripts (unofficial)', 'Bank statements', 'Photos (2×2 inches)'],
    priority: 'critical',
  },
  {
    category: 'Electronics',
    icon: '💻',
    items: ['Laptop + charger', 'Universal power adapter', 'Portable charger', 'Headphones', 'HDMI cable'],
    priority: 'high',
  },
  {
    category: 'Clothing',
    icon: '👕',
    items: ['Formal/interview outfit', 'Winter gear (if applicable)', '2 weeks of basics', 'Comfortable walking shoes'],
    priority: 'medium',
  },
  {
    category: 'Health & Medications',
    icon: '💊',
    items: ['6-month prescription supply', 'Prescription copies (English)', 'Basic OTC medications', 'Insurance info'],
    priority: 'critical',
  },
];

const BANKING_STEPS = [
  { title: 'Open a US bank account on arrival', desc: 'Chase, Bank of America, or a credit union. Bring I-20, passport, and university ID.' },
  { title: 'Apply for a student credit card', desc: 'Discover It Student or Deserve EDU card — no SSN required for international students.' },
  { title: 'Set up money transfers', desc: 'Wise or Remitly for sending money from home at low fees.' },
];

const priorityColors = {
  critical: 'border-red-200 bg-red-50',
  high: 'border-amber-200 bg-amber-50',
  medium: 'border-navy-100 bg-white',
};

const priorityBadge = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-navy-100 text-navy-600',
};

export default function PreDepartureSection() {
  return (
    <section id="pre-departure" className="module-section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
              <Plane size={18} className="text-rose-600" />
            </div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Pre-Departure</span>
          </div>
          <h2 className="section-heading">Ready to fly — a complete checklist</h2>
          <p className="section-subheading text-navy-500">
            What to pack, what to set up, and what to expect in your first week.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {[
            { icon: Package, label: 'Packing List' },
            { icon: CreditCard, label: 'Banking Setup' },
            { icon: Shield, label: 'Health Insurance' },
            { icon: Home, label: 'Housing' },
          ].map(({ icon: Icon, label }, i) => (
            <button
              key={label}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                i === 0
                  ? 'bg-navy-900 text-white'
                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Packing categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PACKING_CATEGORIES.map(({ category, icon, items, priority }) => (
            <div key={category} className={`rounded-xl border ${priorityColors[priority]} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  <h3 className="font-bold text-navy-900 text-sm leading-tight">{category}</h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityBadge[priority]}`}>
                  {priority}
                </span>
              </div>
              <ul className="space-y-1.5">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-navy-600">
                    <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Banking setup */}
        <div className="bg-[#F9FAFB] rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard size={20} className="text-navy-700" />
            <h3 className="font-bold text-navy-900 text-lg">Banking & Money in the US</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BANKING_STEPS.map(({ title, desc }, i) => (
              <div key={i} className="bg-white rounded-xl border border-navy-100 p-4">
                <div className="w-7 h-7 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-bold mb-3">
                  {i + 1}
                </div>
                <h4 className="font-bold text-navy-900 text-sm mb-1.5">{title}</h4>
                <p className="text-xs text-navy-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
