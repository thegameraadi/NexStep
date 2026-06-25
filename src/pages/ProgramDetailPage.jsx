import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Bookmark, BookmarkCheck, ExternalLink, MapPin, Clock,
  DollarSign, Users, Star, CheckCircle2, MessageSquare, Mail, ChevronRight,
} from 'lucide-react';
import { PROGRAMS } from '../data/programs';
import { useMyList } from '../context/MyListContext';
import StarRating from '../components/programs/StarRating';
import ReviewCard from '../components/programs/ReviewCard';
import AdmissionStats from '../components/programs/AdmissionStats';
import StatusSelector from '../components/programs/StatusSelector';

const GRE_STYLES = {
  'Required': 'bg-red-50 text-red-700 border-red-200',
  'Optional': 'bg-amber-50 text-amber-700 border-amber-200',
  'Not Required': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const REVIEW_AVG_KEYS = [
  { key: 'academics', label: 'Academics' },
  { key: 'careerSupport', label: 'Career Support' },
  { key: 'costOfLiving', label: 'Cost of Living' },
  { key: 'diversity', label: 'Diversity & Inclusion' },
];

function avgScore(reviews, key) {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r[key], 0) / reviews.length;
}

export default function ProgramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = PROGRAMS.find((p) => p.id === id);
  const { isInList, addToList, removeFromList } = useMyList();

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">😕</p>
          <h2 className="font-bold text-navy-900 text-xl mb-2">Program not found</h2>
          <Link to="/programs" className="text-[#F5A623] font-semibold hover:underline">← Back to Explorer</Link>
        </div>
      </div>
    );
  }

  const saved = isInList(program.id);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-16">
      {/* Hero */}
      <div className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Back nav */}
          <button
            onClick={() => navigate('/programs')}
            className="inline-flex items-center gap-1.5 text-navy-300 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft size={15} />
            Back to Explorer
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Title block */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#F5A623] text-lg font-bold">{program.shortSchool[0]}</span>
                </div>
                <div>
                  <p className="text-navy-300 text-sm font-medium">{program.school}</p>
                  <span className="inline-block text-xs font-bold bg-navy-700 text-navy-200 px-2 py-0.5 rounded-full mt-1">
                    {program.rankingTier}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                {program.program}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-navy-300">
                <span className="flex items-center gap-1.5"><MapPin size={14} />{program.city}, {program.state}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{program.duration}</span>
                <span className="flex items-center gap-1.5"><DollarSign size={14} />${program.tuition.toLocaleString()}/yr</span>
                <span className="flex items-center gap-1.5"><Users size={14} />{program.acceptanceRate}% admit rate</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${GRE_STYLES[program.greRequired] ?? ''}`}>
                  GRE {program.greRequired}
                </span>
                <span className="text-xs font-semibold bg-navy-700 text-navy-200 px-3 py-1 rounded-full">
                  Deadline: {program.deadline}
                </span>
                {program.intake.map((i) => (
                  <span key={i} className="text-xs font-semibold bg-navy-700 text-navy-200 px-3 py-1 rounded-full">
                    {i} intake
                  </span>
                ))}
              </div>
            </div>

            {/* Action card */}
            <div className="bg-navy-800 rounded-2xl p-5 lg:w-72 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <StarRating value={program.rating} size={14} showValue />
                    <span className="text-navy-300 text-xs">({program.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => saved ? removeFromList(program.id) : addToList(program.id)}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                    saved
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      : 'bg-[#F5A623] text-navy-900 hover:bg-amber-500'
                  }`}
                >
                  {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  {saved ? 'Saved to My List' : 'Add to My List'}
                </button>

                {saved && (
                  <div className="flex items-center justify-between bg-navy-700 rounded-xl px-4 py-2.5">
                    <span className="text-xs text-navy-300">Status:</span>
                    <StatusSelector programId={program.id} />
                  </div>
                )}

                <a
                  href={program.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                >
                  Official Website
                  <ExternalLink size={14} />
                </a>

                {saved && (
                  <Link
                    to="/my-list"
                    className="w-full flex items-center justify-center gap-1.5 text-xs text-navy-300 hover:text-white transition-colors py-2"
                  >
                    View My List <ChevronRight size={12} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column — main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section>
              <h2 className="text-xl font-bold text-navy-900 mb-3">About this program</h2>
              <p className="text-navy-600 leading-relaxed">{program.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {program.tags.map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-navy-100 text-navy-700">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Rating breakdown */}
            {program.reviews.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-navy-900 mb-4">Community Ratings</h2>
                <div className="bg-white rounded-2xl border border-navy-100 p-5">
                  <div className="flex items-center gap-4 mb-5 pb-5 border-b border-navy-100">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-navy-900">{program.rating}</div>
                      <StarRating value={program.rating} size={16} />
                      <div className="text-xs text-navy-400 mt-1">{program.reviewCount} reviews</div>
                    </div>
                    <div className="flex-1 space-y-2.5">
                      {REVIEW_AVG_KEYS.map(({ key, label }) => {
                        const avg = avgScore(program.reviews, key);
                        return (
                          <div key={key} className="flex items-center gap-3">
                            <span className="text-xs text-navy-500 w-28 flex-shrink-0">{label}</span>
                            <div className="flex-1 h-2 bg-navy-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#F5A623] rounded-full transition-all"
                                style={{ width: `${(avg / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-navy-700 w-6 text-right">{avg > 0 ? avg.toFixed(1) : '—'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {program.reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Write a review CTA */}
            <div className="bg-navy-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
              <MessageSquare size={24} className="text-[#F5A623] flex-shrink-0" />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-white mb-1">Studied here? Share your experience.</h3>
                <p className="text-navy-300 text-sm">Your review helps the next student make a better decision.</p>
              </div>
              <button className="flex-shrink-0 bg-[#F5A623] text-navy-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-amber-500 transition-colors whitespace-nowrap">
                Write a Review
              </button>
            </div>
          </div>

          {/* Right column — stats + contacts */}
          <div className="space-y-6">
            {/* Admission stats */}
            <AdmissionStats stats={program.admissionStats} acceptanceRate={program.acceptanceRate} />

            {/* Submit your profile */}
            <div className="bg-white rounded-2xl border border-navy-100 p-5">
              <h3 className="font-bold text-navy-900 mb-2 text-sm">Applied here?</h3>
              <p className="text-xs text-navy-500 mb-3 leading-relaxed">
                Share your profile to help future applicants understand their chances.
              </p>
              <button className="w-full py-2.5 rounded-xl border border-navy-200 text-xs font-semibold text-navy-700 hover:bg-navy-50 transition-colors">
                Submit Admission Profile
              </button>
            </div>

            {/* Current students / alumni */}
            {program.contacts.length > 0 && (
              <div className="bg-white rounded-2xl border border-navy-100 p-5">
                <h3 className="font-bold text-navy-900 mb-4 text-sm flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Students & Alumni
                </h3>
                <div className="space-y-3">
                  {program.contacts.map((contact) => (
                    <div key={contact.name} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: contact.avatar }}
                      >
                        {contact.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-navy-900 truncate">{contact.name}</p>
                        <p className="text-xs text-navy-400 truncate">{contact.role}</p>
                        <p className="text-[10px] text-navy-400">From {contact.undergrad}</p>
                      </div>
                      {contact.available && (
                        <button className="flex-shrink-0 p-2 rounded-lg bg-navy-50 text-navy-600 hover:bg-navy-100 transition-colors">
                          <Mail size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full py-2 rounded-xl border border-dashed border-navy-200 text-xs font-semibold text-navy-500 hover:bg-navy-50 transition-colors">
                  + Opt in as a contact
                </button>
              </div>
            )}

            {/* Quick facts */}
            <div className="bg-white rounded-2xl border border-navy-100 p-5">
              <h3 className="font-bold text-navy-900 mb-4 text-sm">Quick Facts</h3>
              <dl className="space-y-2.5">
                {[
                  { label: 'Program Type', value: program.degreeType },
                  { label: 'Duration', value: program.duration },
                  { label: 'State', value: program.state },
                  { label: 'Intakes', value: program.intake.join(', ') },
                  { label: 'Ranking Tier', value: program.rankingTier },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <dt className="text-xs text-navy-500">{label}</dt>
                    <dd className="text-xs font-semibold text-navy-800">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
