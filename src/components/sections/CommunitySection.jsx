import { Users, MessageSquare, ThumbsUp, Clock, Pin, ArrowRight, UserPlus } from 'lucide-react';

const POSTS = [
  {
    author: 'Priya M.',
    avatar: '#4A90D9',
    time: '2h ago',
    title: 'Got my F-1 visa approved at Mumbai consulate today! AMA',
    preview: 'Applied for Fall 2025 MS CS at Georgia Tech. Waited 3 weeks for appointment, interview was 3 minutes long...',
    likes: 142,
    comments: 38,
    tags: ['Visa', 'F-1', 'Mumbai'],
    pinned: false,
  },
  {
    author: 'Rahul K.',
    avatar: '#10B981',
    time: '5h ago',
    title: 'Complete guide to GRE waivers — 40+ schools that no longer require it',
    preview: 'After researching 200+ programs, I compiled a list of schools that have permanently dropped GRE requirement...',
    likes: 287,
    comments: 64,
    tags: ['GRE', 'Applications', 'Resource'],
    pinned: true,
  },
  {
    author: 'Aiko T.',
    avatar: '#7B68EE',
    time: '1d ago',
    title: 'My honest review of 6 months at UT Austin — what I wish I knew',
    preview: "The classes are great but the apartment search was brutal. Here's everything I'd tell my past self...",
    likes: 195,
    comments: 52,
    tags: ['UT Austin', 'Life in US', 'Housing'],
    pinned: false,
  },
  {
    author: 'Yemi A.',
    avatar: '#F5A623',
    time: '2d ago',
    title: 'I got a Fulbright — here is my complete application breakdown',
    preview: 'SOP, LORs, research proposal, and interview prep. I started 18 months before the deadline...',
    likes: 512,
    comments: 97,
    tags: ['Fulbright', 'Scholarship', 'Guide'],
    pinned: true,
  },
];

const STATS_MINI = [
  { label: 'Active members', value: '10,200+' },
  { label: 'Posts this week', value: '340' },
  { label: 'Questions answered', value: '12,800+' },
];

export default function CommunitySection() {
  return (
    <section id="community" className="module-section bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users size={18} className="text-blue-600" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Community</span>
            </div>
            <h2 className="section-heading">Learn from those who made it</h2>
            <p className="section-subheading text-navy-500">
              Real experiences, honest answers, and a community that has your back.
            </p>
          </div>

          <button className="flex-shrink-0 inline-flex items-center gap-2 bg-navy-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-navy-800 transition-colors">
            <UserPlus size={16} />
            Join the Community
          </button>
        </div>

        {/* Mini stats */}
        <div className="flex gap-4 mb-8">
          {STATS_MINI.map(({ label, value }) => (
            <div key={label} className="flex-1 bg-white rounded-xl border border-navy-100 px-4 py-3 text-center">
              <div className="text-lg font-bold text-navy-900">{value}</div>
              <div className="text-xs text-navy-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-3 mb-8">
          {POSTS.map(({ author, avatar, time, title, preview, likes, comments, tags, pinned }) => (
            <div key={title} className="bg-white rounded-xl border border-navy-100 p-5 hover:shadow-card transition-all cursor-pointer group">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: avatar }}
                >
                  {author[0]}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Meta */}
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-semibold text-navy-700">{author}</span>
                    <span className="text-navy-300 text-xs">·</span>
                    <div className="flex items-center gap-1 text-xs text-navy-400">
                      <Clock size={11} />
                      {time}
                    </div>
                    {pinned && (
                      <>
                        <span className="text-navy-300 text-xs">·</span>
                        <div className="flex items-center gap-1 text-xs text-[#F5A623] font-semibold">
                          <Pin size={11} />
                          Pinned
                        </div>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-navy-900 text-sm mb-1.5 group-hover:text-navy-700 transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-navy-500 mb-3 leading-relaxed line-clamp-2">{preview}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-navy-50 text-navy-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1 text-xs text-navy-400">
                        <ThumbsUp size={12} />
                        {likes}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-navy-400">
                        <MessageSquare size={12} />
                        {comments}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-navy-100 p-6">
          <div>
            <h3 className="font-bold text-navy-900 mb-1">Have advice to share?</h3>
            <p className="text-sm text-navy-500">Your experience can change someone else's journey.</p>
          </div>
          <button className="flex-shrink-0 btn-primary !py-2.5">
            Share Your Experience
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
