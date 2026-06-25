import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Users, Building2, TrendingUp } from 'lucide-react';

const STATS = [
  {
    icon: MessageSquare,
    value: 12847,
    suffix: '',
    label: 'experiences shared',
    color: 'text-blue-500',
  },
  {
    icon: Users,
    value: 10200,
    suffix: '+',
    label: 'students helped',
    color: 'text-emerald-500',
  },
  {
    icon: Building2,
    value: 340,
    suffix: '',
    label: 'schools covered',
    color: 'text-purple-500',
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'found it useful',
    color: 'text-[#F5A623]',
  },
];

function useCountUp(target, duration = 1600, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

function StatItem({ icon: Icon, value, suffix, label, color, started }) {
  const count = useCountUp(value, 1600, started);

  const formatted =
    value >= 10000
      ? count.toLocaleString()
      : count.toString();

  return (
    <div className="flex flex-col items-center gap-1.5 px-6 py-5 flex-1 min-w-0">
      <div className={`${color} mb-1`}>
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-navy-900 tabular-nums">
        {formatted}
        <span className="text-[#F5A623]">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm text-navy-500 font-medium text-center leading-tight">
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white border-y border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 pt-4 pb-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-navy-400 uppercase tracking-wide">Live platform stats</span>
        </div>

        <div className="flex flex-wrap divide-x divide-navy-100">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
