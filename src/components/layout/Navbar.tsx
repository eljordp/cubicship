import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Refund Request', to: '/refund', highlight: true },
  { label: 'Support', to: '/' },
  { label: 'Admin', to: '/admin' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Cubic Ship partner bar */}
      <div className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-8">
          <span className="text-xs font-bold text-cs-orange tracking-wide uppercase">
            DHL Premier Partner
          </span>
          <span className="hidden sm:block text-xs font-medium text-white/50">
            Ship to 220+ Countries
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Cubic Ship logo"
              className="h-10 w-auto"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold text-navy tracking-tight">
                Cubic Ship
              </span>
              <span className="text-[10px] font-semibold text-cs-green uppercase tracking-widest">
                DHL Partner
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={clsx(
                    'text-sm font-semibold transition-colors duration-150',
                    link.highlight
                      ? 'text-cs-orange hover:text-cs-orange/80'
                      : 'text-navy/70 hover:text-navy'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-navy"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={clsx(
          'md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-border',
          mobileOpen ? 'max-h-80' : 'max-h-0'
        )}
      >
        <ul className="flex flex-col px-6 py-4 gap-3">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'block text-base font-semibold transition-colors py-1',
                  link.highlight
                    ? 'text-cs-orange'
                    : 'text-navy/70 hover:text-navy'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
