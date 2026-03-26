import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Refund Request', to: '/refund' },
  { label: 'Admin', to: '/admin' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Cubic Ship logo"
            className="h-10 w-auto"
          />
          <span className="font-serif text-xl text-navy tracking-tight">
            Cubic Ship
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-sm font-medium text-text-secondary hover:text-navy transition-colors duration-200"
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
      </nav>

      {/* Mobile menu */}
      <div
        className={clsx(
          'md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-border',
          mobileOpen ? 'max-h-60' : 'max-h-0'
        )}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-text-secondary hover:text-navy transition-colors"
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
