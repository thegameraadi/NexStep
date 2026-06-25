import { FileText, BookOpen, Mail, Star, Download, ThumbsUp } from 'lucide-react';

const RESOURCES = [
  {
    type: 'SOP Guide',
    icon: BookOpen,
    color: 'bg-navy-50 text-navy-600',
    title: 'Writing a Winning Statement of Purpose',
    desc: 'Structure, tone, common mistakes, and annotated examples from admitted students.',
    meta: '4,200 reads · 4.9★',
    cta: 'Read guide',
  },
  {
    type: 'LOR Templates',
    icon: Mail,
    color: 'bg-purple-50 text-purple-600',
    title: 'How to Ask for (and Get) Strong LORs',
    desc: 'Email templates, what to brief your recommender, and a timeline checklist.',
    meta: '3,100 reads · 4.8★',
    cta: 'View templates',
  },
  {
    type: 'Application Review',
    icon: Star,
    color: 'bg-amber-50 text-amber-600',
    title: 'Real Application Breakdowns from the Community',
    desc: 'Admitted students share their full profile: GRE, GPA, SOP extracts, and outcomes.',
    meta: '6,500 reads · 4.9★',
    cta: 'Explore breakdowns',
  },
  {
    type: 'Resume Tips',
    icon: Download,
    color: 'bg-emerald-50 text-emerald-600',
    title: 'Graduate School Resume vs Industry Resume',
    desc: 'Key differences, ATS optimization, and downloadable LaTeX templates.',
    meta: '2,800 reads · 4.7★',
    cta: 'Download templates',
  },
];

const CHECKLIST = [
  'Transcripts (official + self-attested)',
  'GRE / GMAT scores (institution code required)',
  'IELTS / TOEFL scores',
  'Statement of Purpose (program-specific)',
  '3× Letters of Recommendation',
  'CV / Resume',
  'Application fee or fee waiver',
];

export default function ApplicationsSection() {
  return (
    <section id="applications" className="module-section bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-navy-100 flex items-center justify-center">
              <FileText size={18} className="text-navy-700" />
            </div>
            <span className="text-xs font-bold text-navy-700 uppercase tracking-widest">Applications</span>
          </div>
          <h2 className="section-heading">Build an application that stands out</h2>
          <p className="section-subheading text-navy-500">
            Guides, templates, and real examples — reviewed and rated by the community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resource cards — takes 2/3 */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {RESOURCES.map(({ type, icon: Icon, color, title, desc, meta, cta }) => (
              <div key={type} className="section-card">
                <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center mb-4`}>
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <span className="text-[10px] font-bold text-navy-400 uppercase tracking-wide block mb-1.5">{type}</span>
                <h3 className="font-bold text-navy-900 text-sm mb-2 leading-snug">{title}</h3>
                <p className="text-xs text-navy-500 mb-3 leading-relaxed">{desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-navy-400">{meta}</span>
                  <button className="text-xs font-semibold text-[#F5A623] hover:underline">{cta}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Application checklist — takes 1/3 */}
          <div className="bg-navy-900 rounded-2xl p-6 text-white h-fit">
            <div className="flex items-center gap-2 mb-5">
              <ThumbsUp size={18} className="text-[#F5A623]" />
              <h3 className="font-bold text-base">Standard Document Checklist</h3>
            </div>
            <p className="text-xs text-navy-300 mb-5 leading-relaxed">
              Most US programs require these. Always verify on the school's official admissions page.
            </p>
            <ul className="space-y-3">
              {CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#F5A623]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#F5A623]/60" />
                  </div>
                  <span className="text-sm text-navy-200 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full py-2.5 rounded-xl border border-white/20 text-sm font-semibold text-white hover:bg-white/5 transition-colors">
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
