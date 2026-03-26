import { Link } from 'react-router-dom';
import { Mail, Phone, Clock } from 'lucide-react';

const quickLinks = [
  { label: 'Ship a Package', to: '/' },
  { label: 'Track a Shipment', to: '/' },
  { label: 'Request a Refund', to: '/refund' },
  { label: 'Admin Portal', to: '/admin' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Cubic Ship"
                className="h-8 w-auto brightness-110"
              />
              <span className="text-lg font-extrabold text-white tracking-tight">
                Cubic Ship
              </span>
            </div>
            <div className="inline-block bg-cs-orange/15 border border-dhl-yellow/30 rounded px-3 py-1">
              <span className="text-xs font-bold text-cs-orange uppercase tracking-wide">
                Authorized DHL Premier Partner
              </span>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              International shipping, real-time tracking, and refund processing
              powered by DHL's global logistics network.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@cubicship.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-cs-orange" />
                info@cubicship.com
              </a>
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-cs-orange" />
                1-800-123-4567
              </a>
              <div className="flex items-start gap-2 text-white/60">
                <Clock size={14} className="text-cs-orange mt-0.5" />
                <div>
                  <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p>Sat: 9:00 AM - 1:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Cubic Ship. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            DHL and the DHL logo are trademarks of Deutsche Post AG.
          </p>
        </div>
      </div>
    </footer>
  );
}
