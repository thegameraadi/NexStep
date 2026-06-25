import { GraduationCap, Search, SlidersHorizontal, Star, MapPin, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const SAMPLE_PROGRAMS = [
  {
    school: 'Carnegie Mellon University',
    program: 'MS Computer Science',
    location: 'Pittsburgh, PA',
    tuition: '$58,200/yr',
    deadline: 'Dec 15',
    rating: 4.8,
    admits: '1,200+ admits shared',
    tags: ['STEM OPT', 'No GRE', 'Spring intake'],
  },
  {
    school: 'University of Texas at Austin',
    program: 'MS Data Science',
    location: 'Austin, TX',
    tuition: '$22,500/yr',
    deadline: 'Jan 1',
    rating: 4.6,
    admits: '800+ admits shared',
    tags: ['STEM OPT', 'Funded options'],
  },
  {
    school: 'University of Illinois Urbana-Champaign',
    program: 'MS Electrical Engineering',
    location: 'Champaign, IL',
    tuition: '$36,000/yr',
    deadline: 'Dec 1',
    rating: 4.7,
    admits: '1,500+ admits shared',
    tags: ['STEM OPT', 'Research track', 'TA/RA available'],
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="module-section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <GraduationCap size={18} className="text-purple-600" />
              </div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Programs</span>
            </div>
            <h2 className="section-heading">Find your perfect program</h2>
            <p className="section-subheading text-navy-500">
              Search 500+ MS, MBA, and PhD programs with real admit data from the community.
            </p>
          </div>
        </div>

        {/* Search bar (placeholder) */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 flex items-center gap-3 bg-[#F9FAFB] border border-navy-200 rounded-xl px-4 py-3 focus-within:border-navy-400 focus-within:ring-2 focus-within:ring-navy-100 transition-all">
            <Search size={18} className="text-navy-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search programs, schools, or fields..."
              className="flex-1 bg-transparent text-sm text-navy-700 placeholder:text-navy-400 outline-none"
              readOnly
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-[#F9FAFB] border border-navy-200 rounded-xl text-sm font-medium text-navy-600 hover:bg-navy-50 transition-colors">
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All Programs', 'MS / Masters', 'MBA', 'PhD', 'STEM OPT Eligible', 'No GRE', 'Funded'].map((f, i) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                i === 0
                  ? 'bg-navy-900 text-white'
                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {SAMPLE_PROGRAMS.map(({ school, program, location, tuition, deadline, rating, admits, tags }) => (
            <div key={school} className="section-card group cursor-pointer">
              {/* School name */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-navy-400">{school}</span>
                <div className="flex items-center gap-1 text-xs font-bold text-[#F5A623]">
                  <Star size={11} className="fill-[#F5A623]" />
                  {rating}
                </div>
              </div>

              <h3 className="font-bold text-navy-900 text-base mb-3">{program}</h3>

              {/* Meta */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-navy-500">
                  <MapPin size={12} className="flex-shrink-0" />
                  {location}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-navy-500">
                  <DollarSign size={12} className="flex-shrink-0" />
                  {tuition} · App deadline: {deadline}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <Users size={12} className="flex-shrink-0" />
                  {admits}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-navy-50 text-navy-600">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full py-2 rounded-lg border border-navy-200 text-xs font-semibold text-navy-700 hover:bg-navy-50 group-hover:border-navy-300 transition-colors">
                View Program Details
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors"
          >
            <Search size={16} />
            Open Program Explorer
          </Link>
        </div>
      </div>
    </section>
  );
}
