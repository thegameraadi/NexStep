import { Globe, CheckSquare, AlertCircle, Calendar, MessageCircle } from 'lucide-react';

const VISA_STEPS = [
  {
    step: '01',
    title: 'Receive I-20 from your school',
    detail: "Your Designated School Official (DSO) issues this after you've accepted your offer and submitted enrollment documents.",
    status: 'done',
  },
  {
    step: '02',
    title: 'Pay the SEVIS fee (I-901)',
    detail: "Pay $350 at www.fmjfee.com. Keep the payment receipt — you'll need it at the consulate.",
    status: 'done',
  },
  {
    step: '03',
    title: 'Complete the DS-160 form',
    detail: 'Fill out the non-immigrant visa application at ceac.state.gov. Be thorough and accurate.',
    status: 'current',
  },
  {
    step: '04',
    title: 'Schedule your visa interview',
    detail: "Book at the nearest US consulate/embassy. Check wait times — popular slots go fast.",
    status: 'pending',
  },
  {
    step: '05',
    title: 'Attend the visa interview',
    detail: 'Bring all documents. Be honest, concise, and confident. Most interviews take 2–5 minutes.',
    status: 'pending',
  },
  {
    step: '06',
    title: 'Receive your visa & travel',
    detail: 'F-1 visa allows entry up to 30 days before your program start date listed on your I-20.',
    status: 'pending',
  },
];

const INTERVIEW_TIPS = [
  'Speak clearly about your program and career goals',
  "Know your school's name, location, and program duration",
  'Have your financial documents ready (bank statements, sponsorship letters)',
  "Don't memorize scripts — be natural and honest",
  'Dress professionally but comfortably',
];

export default function VisaSection() {
  return (
    <section id="visa" className="module-section bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Globe size={18} className="text-orange-600" />
            </div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Visa</span>
          </div>
          <h2 className="section-heading">Navigate the F-1 visa process</h2>
          <p className="section-subheading text-navy-500">
            Step-by-step documentation, interview prep, and real experiences from students who just went through it.
          </p>
        </div>

        {/* Visa type tabs */}
        <div className="flex gap-2 mb-8">
          {['F-1 Student Visa', 'J-1 Exchange Visitor', 'OPT / STEM OPT'].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                i === 0
                  ? 'bg-navy-900 text-white'
                  : 'bg-white border border-navy-200 text-navy-600 hover:bg-navy-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-3">
            {VISA_STEPS.map(({ step, title, detail, status }) => (
              <div
                key={step}
                className={`flex gap-4 p-4 rounded-xl border transition-all ${
                  status === 'current'
                    ? 'border-orange-300 bg-orange-50'
                    : status === 'done'
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-navy-100 bg-white'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${
                    status === 'done'
                      ? 'bg-emerald-500 text-white'
                      : status === 'current'
                      ? 'bg-orange-500 text-white'
                      : 'bg-navy-100 text-navy-500'
                  }`}
                >
                  {status === 'done' ? '✓' : step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-navy-900 text-sm">{title}</h3>
                    {status === 'current' && (
                      <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">Current step</span>
                    )}
                  </div>
                  <p className="text-xs text-navy-500 leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Interview tips */}
            <div className="bg-white rounded-2xl border border-navy-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={17} className="text-navy-600" />
                <h3 className="font-bold text-navy-900 text-sm">Interview Tips</h3>
              </div>
              <ul className="space-y-2.5">
                {INTERVIEW_TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-navy-600 leading-relaxed">
                    <CheckSquare size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Wait times */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-amber-600" />
                <h3 className="font-bold text-amber-900 text-sm">Current Wait Times</h3>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { city: 'Mumbai', wait: '2–3 weeks' },
                  { city: 'New Delhi', wait: '3–5 weeks' },
                  { city: 'Chennai', wait: '1–2 weeks' },
                  { city: 'Hyderabad', wait: '2–4 weeks' },
                ].map(({ city, wait }) => (
                  <div key={city} className="flex justify-between">
                    <span className="text-navy-600">{city}</span>
                    <span className="font-semibold text-navy-800">{wait}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-amber-700">Wait times updated weekly from community reports.</p>
            </div>

            {/* Alert */}
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 leading-relaxed">
                <strong>Important:</strong> Visa regulations change frequently. Always verify with your DSO and the official USCIS website before making decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
