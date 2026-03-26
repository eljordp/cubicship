import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Cubic Ship"
                className="h-8 w-auto brightness-110"
              />
              <span className="font-serif text-lg text-white tracking-tight">
                Cubic Ship
              </span>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              DHL Premier Partner — reliable international shipping, tracking,
              and refund processing you can count on.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Contact
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:info@cubicship.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail size={14} />
                info@cubicship.com
              </a>
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={14} />
                1-800-123-4567
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 text-xs text-white/30">
          &copy; {new Date().getFullYear()} Cubic Ship. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
