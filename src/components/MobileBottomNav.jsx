import { Home, GraduationCap, Users, Bookmark } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useMyList } from '../context/MyListContext';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', to: '/', exact: true },
  { icon: GraduationCap, label: 'Programs', to: '/programs' },
  { icon: Bookmark, label: 'My List', to: '/my-list' },
  { icon: Users, label: 'Community', to: '/community' },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { list } = useMyList();

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to.replace('/#', ''));
  };

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-navy-100">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(({ icon: Icon, label, to }) => {
          const active = isActive({ to, exact: to === '/' });
          const isList = label === 'My List';
          return (
            <Link
              key={label}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors active:scale-95 relative ${
                active ? 'text-navy-900' : 'text-navy-400 hover:text-navy-700'
              }`}
            >
              {active && (
                <span className="absolute top-0 inset-x-4 h-0.5 rounded-full bg-[#F5A623]" />
              )}
              <div className="relative">
                <Icon size={20} strokeWidth={active ? 2 : 1.75} />
                {isList && list.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#F5A623] text-navy-900 text-[9px] font-bold flex items-center justify-center">
                    {list.length}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'font-bold' : ''}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
