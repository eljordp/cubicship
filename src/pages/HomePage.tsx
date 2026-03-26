import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Package,
  Shield,
  Clock,
  Headphones,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(74,144,217,0.12),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-32 md:py-44">
        <p className="text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-6">
          DHL Premier Partner
        </p>

        <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] max-w-3xl">
          Your Trusted Shipping&nbsp;Partner
        </h1>

        <p className="mt-8 text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
          Fast, reliable international shipping with the global reach of DHL.
          We handle logistics so you can focus on what matters.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            to="/refund"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-sm"
          >
            Request a Refund
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Services — editorial stacked blocks, NOT cards                     */
/* ------------------------------------------------------------------ */
const services = [
  {
    icon: Globe,
    title: 'International Shipping',
    description:
      'Reach 220+ countries and territories through DHL\'s world-class logistics network. Competitive rates, dependable timelines, door-to-door service.',
  },
  {
    icon: Package,
    title: 'Package Tracking',
    description:
      'Real-time visibility from pickup to delivery. Know exactly where your shipment is at every stage with detailed status updates and notifications.',
  },
  {
    icon: Shield,
    title: 'Refund Processing',
    description:
      'Service issues happen. Our dedicated team processes refund claims quickly and transparently so you\'re never left waiting.',
  },
];

function Services() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
          What We Do
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy max-w-2xl leading-tight">
          Shipping made simple, from start to finish
        </h2>

        <div className="mt-20 space-y-20 md:space-y-0 md:grid md:grid-cols-1 md:gap-0">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 1;

            return (
              <div
                key={service.title}
                className={`flex flex-col md:flex-row items-start gap-8 md:gap-16 py-14 ${
                  i !== services.length - 1 ? 'border-b border-border' : ''
                } ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Icon area */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center">
                  <Icon size={26} className="text-primary" />
                </div>

                {/* Text */}
                <div className="max-w-lg">
                  <h3 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust — horizontal stats strip on dark band                        */
/* ------------------------------------------------------------------ */
const stats = [
  {
    icon: Shield,
    label: 'DHL Premier Partner',
    detail: 'Authorized and certified',
  },
  {
    icon: Clock,
    label: 'Fast Processing',
    detail: 'Claims reviewed in 24-48 hrs',
  },
  {
    icon: Headphones,
    label: '24/7 Support',
    detail: 'Real people, real answers',
  },
];

function Trust() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center md:text-left">
                <Icon
                  size={28}
                  className="text-primary mx-auto md:mx-0 mb-5"
                />
                <p className="font-serif text-white text-xl md:text-2xl mb-2">
                  {stat.label}
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */
function Contact() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy leading-tight mb-8">
            Questions? We're here to&nbsp;help.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-10">
            Whether you need a shipping quote, have a question about a delivery,
            or want to file a refund request, our team is ready to assist.
          </p>

          <div className="space-y-4 text-base text-text-secondary">
            <p>
              <span className="font-medium text-navy">Email:</span>{' '}
              <a
                href="mailto:info@cubicship.com"
                className="text-primary hover:underline"
              >
                info@cubicship.com
              </a>
            </p>
            <p>
              <span className="font-medium text-navy">Phone:</span>{' '}
              <a
                href="tel:+18001234567"
                className="hover:text-primary transition-colors"
              >
                1-800-123-4567
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Trust />
      <Contact />
    </>
  );
}
