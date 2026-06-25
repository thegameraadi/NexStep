import {
  Map,
  GraduationCap,
  FileText,
  DollarSign,
  Globe,
  Plane,
  ArrowRight,
} from 'lucide-react';

const TILES = [
  {
    icon: Map,
    title: 'Roadmap',
    description: 'A step-by-step timeline from shortlisting schools to landing in the US.',
    color: 'bg-blue-50 text-blue-600',
    href: '#roadmap',
    badge: 'Start here',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: GraduationCap,
    title: 'Programs',
    description: 'Search and compare 500+ MS, MBA, and PhD programs across top US universities.',
    color: 'bg-purple-50 text-purple-600',
    href: '#programs',
    badge: '500+ programs',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    icon: FileText,
    title: 'Applications',
    description: 'SOP guides, LOR templates, resume tips, and real successful application breakdowns.',
    color: 'bg-navy-50 text-navy-600',
    href: '#applications',
    badge: 'Community reviewed',
    badgeColor: 'bg-navy-100 text-navy-700',
  },
  {
    icon: DollarSign,
    title: 'Finance',
    description: 'Scholarship finder, loan guides, and cost-of-living calculators for every city.',
    color: 'bg-emerald-50 text-emerald-600',
    href: '#finance',
    badge: 'Save thousands',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Globe,
    title: 'Visa',
    description: 'F-1 and J-1 documentation checklists, interview prep, and tracking your status.',
    color: 'bg-orange-50 text-orange-600',
    href: '#visa',
    badge: 'DSO approved',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: Plane,
    title: 'Pre-Departure',
    description: 'What to pack, what to ship, banking setup, health insurance — all covered.',
    color: 'bg-rose-50 text-rose-600',
    href: '#pre-departure',
    badge: 'Packing lists',
    badgeColor: 'bg-rose-100 text-rose-700',
  },
];

export default function SectionTiles() {
  const handleClick = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">
            Everything in one place
          </h2>
          <p className="text-navy-500 text-base md:text-lg max-w-xl mx-auto">
            Six modules covering every stage of your US study journey — from your first search to your first semester.
          </p>
        </div>

        {/* Tiles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TILES.map(({ icon: Icon, title, description, color, href, badge, badgeColor }) => (
            <button
              key={title}
              onClick={() => handleClick(href)}
              className="section-card text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>
                  {badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-navy-900 mb-2">{title}</h3>
              <p className="text-sm text-navy-500 leading-relaxed mb-4">{description}</p>

              <div className="flex items-center gap-1 text-sm font-semibold text-[#F5A623] group-hover:gap-2 transition-all">
                Explore
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
