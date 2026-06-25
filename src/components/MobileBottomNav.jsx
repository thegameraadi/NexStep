import { Home, Map, Users, User } from 'lucide-react';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', href: '#' },
  { icon: Map, label: 'Roadmap', href: '#roadmap' },
  { icon: Users, label: 'Community', href: '#community' },
  { icon: User, label: 'Profile', href: '#profile' },
];

export default function MobileBottomNav() {
  const handleClick = (e, href) => {
    if (href === '#') return;
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-navy-100 safe-area-pb">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleClick(e, href)}
            className="flex-1 flex flex-col items-center justify-center gap-1 text-navy-400 hover:text-navy-900 transition-colors active:scale-95"
          >
            <Icon size={20} strokeWidth={1.75} />
            <span className="text-[10px] font-medium">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
