import { Map, CheckCircle, Clock, ArrowRight, Milestone } from 'lucide-react';

const MILESTONES = [
  {
    phase: '12–18 months out',
    title: 'Research & Shortlist',
    steps: ['Research programs and universities', 'Prepare for GRE/GMAT/IELTS/TOEFL', 'Identify potential recommenders'],
    status: 'planning',
  },
  {
    phase: '9–12 months out',
    title: 'Test & Profile Building',
    steps: ['Take standardized tests', 'Secure LORs from professors/managers', 'Draft your Statement of Purpose'],
    status: 'planning',
  },
  {
    phase: '6–9 months out',
    title: 'Apply',
    steps: ['Finalize school list (8–12 schools)', 'Submit applications before deadlines', 'Apply for fee waivers where available'],
    status: 'active',
  },
  {
    phase: '3–6 months out',
    title: 'Decisions & Visa',
    steps: ['Evaluate admits and financial aid', 'Accept offer and pay deposit', 'Apply for F-1 student visa'],
    status: 'upcoming',
  },
  {
    phase: '0–3 months out',
    title: 'Pre-Departure',
    steps: ['Arrange housing and flights', 'Sort banking and insurance', 'Attend pre-departure orientation'],
    status: 'upcoming',
  },
];

const statusStyles = {
  planning: 'bg-navy-50 border-navy-200',
  active: 'bg-amber-50 border-amber-300',
  upcoming: 'bg-gray-50 border-gray-200',
};

const dotStyles = {
  planning: 'bg-navy-400',
  active: 'bg-[#F5A623]',
  upcoming: 'bg-gray-300',
};

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="module-section bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Map size={18} className="text-blue-600" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Roadmap</span>
            </div>
            <h2 className="section-heading">Your step-by-step journey</h2>
            <p className="section-subheading text-navy-500">
              A personalized timeline from day one to your first day on campus.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5A623] hover:underline flex-shrink-0">
            Build my roadmap <ArrowRight size={15} />
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-[140px] top-6 bottom-6 w-0.5 bg-navy-100" />

          <div className="space-y-4">
            {MILESTONES.map(({ phase, title, steps, status }, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Phase label */}
                <div className="md:w-[132px] flex-shrink-0 md:text-right">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400 md:pt-5">
                    <Clock size={12} />
                    {phase}
                  </span>
                </div>

                {/* Dot (desktop) */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0 w-4">
                  <div className={`w-4 h-4 rounded-full border-2 border-white shadow mt-4 ${dotStyles[status]}`} />
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-xl border ${statusStyles[status]} p-5`}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-navy-900 text-base">{title}</h3>
                    {status === 'active' && (
                      <span className="flex-shrink-0 text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wide">
                        Your stage
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-navy-600">
                        <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-navy-900 text-white rounded-2xl px-8 py-5">
            <Milestone size={22} className="text-[#F5A623] flex-shrink-0" />
            <span className="text-sm font-medium">
              Create an account to save your progress and get personalized deadline reminders.
            </span>
            <button className="flex-shrink-0 bg-[#F5A623] text-navy-900 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-amber-500 transition-colors">
              Get started free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
