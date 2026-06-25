import { ArrowRight, Compass, Star } from 'lucide-react';

export default function Hero() {
  const handleScroll = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-navy-900 pt-16">
      {/* Background texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-navy-800/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-navy-700/40 blur-3xl" />
        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Amber glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        {/* Trust badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Community-built · No ads · No upsells · 100% free
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight text-balance leading-[1.08]">
            From your first thought
            <br />
            <span className="text-[#F5A623]">to your first class.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-navy-200 max-w-2xl mx-auto leading-relaxed text-balance">
            Everything you need to get to the US — built by students who&apos;ve been there.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleScroll('#roadmap')}
              className="w-full sm:w-auto btn-primary !px-8 !py-4 !text-base gap-2 shadow-lg shadow-amber-400/20"
            >
              Start My Journey
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => handleScroll('#programs')}
              className="w-full sm:w-auto btn-secondary !px-8 !py-4 !text-base"
            >
              <Compass size={18} />
              Explore the Platform
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-navy-300">
            <div className="flex -space-x-2">
              {['#4A90D9', '#7B68EE', '#F5A623', '#10B981', '#E75480'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-navy-900 flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>
              <span>Trusted by 10,000+ students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="relative h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 64L1440 64L1440 24C1200 56 960 64 720 48C480 32 240 8 0 24L0 64Z"
            fill="#F9FAFB"
          />
        </svg>
      </div>
    </section>
  );
}
