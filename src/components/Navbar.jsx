import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Programs', href: '/programs', isRoute: true },
  { label: 'Applications', href: '#applications' },
  { label: 'Finance', href: '#finance' },
  { label: 'Visa', href: '#visa' },
  { label: 'Pre-Departure', href: '#pre-departure' },
  { label: 'Community', href: '#community' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-nav'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center group-hover:bg-navy-800 transition-colors">
              <span className="text-[#F5A623] font-bold text-sm leading-none">N</span>
            </div>
            <span className="font-bold text-lg text-navy-900 tracking-tight">
              Nex<span className="text-[#F5A623]">Step</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="nav-link px-3 py-2 rounded-lg hover:bg-navy-50 text-navy-700 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="nav-link px-3 py-2 rounded-lg hover:bg-navy-50 text-navy-700 text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="text-sm font-medium text-navy-700 px-4 py-2 rounded-lg hover:bg-navy-50 transition-colors">
              Sign In
            </button>
            <button className="btn-primary !py-2 !px-5 !text-sm">
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-navy-700 hover:bg-navy-50 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-navy-100">
            <span className="font-bold text-navy-900">
              Nex<span className="text-[#F5A623]">Step</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-lg text-navy-500 hover:bg-navy-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-navy-700 font-medium hover:bg-navy-50 hover:text-navy-900 transition-colors group"
                >
                  {link.label}
                  <ChevronRight size={16} className="text-navy-300 group-hover:text-navy-500 transition-colors" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-navy-700 font-medium hover:bg-navy-50 hover:text-navy-900 transition-colors group"
                >
                  {link.label}
                  <ChevronRight size={16} className="text-navy-300 group-hover:text-navy-500 transition-colors" />
                </a>
              )
            )}
          </nav>

          {/* Drawer Auth */}
          <div className="absolute bottom-0 inset-x-0 px-4 pb-8 pt-4 border-t border-navy-100 space-y-3">
            <button className="w-full py-3 rounded-xl border-2 border-navy-200 text-navy-700 font-semibold text-sm hover:bg-navy-50 transition-colors">
              Sign In
            </button>
            <button className="w-full py-3 rounded-xl bg-[#F5A623] text-navy-900 font-semibold text-sm hover:bg-amber-500 transition-colors">
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
