import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Package,
  Search,
  RefreshCw,
  Truck,
  Clock,
  Phone,
  Mail,
  Shield,
  Globe,
  Headphones,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Top Banner                                                         */
/* ------------------------------------------------------------------ */
function TopBanner() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-cs-orange px-3 py-1 rounded mb-4">
              <Shield size={14} className="text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wide">
                DHL Premier Partner
              </span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              International Shipping.<br />
              Refund Processing.<br />
              Done Right.
            </h1>
          </div>
          <p className="text-white/50 text-sm sm:text-base max-w-sm leading-relaxed">
            Cubic Ship is an authorized DHL Premier Partner handling shipments
            to 220+ countries with full tracking and dedicated refund support.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick Actions — Ship, Track, Refund                                */
/* ------------------------------------------------------------------ */
const actions = [
  {
    icon: Package,
    title: 'Ship a Package',
    description: 'Get rates and schedule a pickup through DHL\'s network.',
    color: 'bg-cs-blue',
    textColor: 'text-white',
    to: '/',
  },
  {
    icon: Search,
    title: 'Track a Shipment',
    description: 'Real-time tracking for any DHL shipment worldwide.',
    color: 'bg-navy',
    textColor: 'text-white',
    to: '/',
  },
  {
    icon: RefreshCw,
    title: 'Request a Refund',
    description: 'Submit and track refund claims for returned or failed deliveries.',
    color: 'bg-cs-orange',
    textColor: 'text-white',
    to: '/refund',
  },
];

function QuickActions() {
  return (
    <section className="bg-surface-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.to}
                className={`${action.color} ${action.textColor} p-6 sm:p-8 rounded-lg hover:opacity-90 transition-opacity group`}
              >
                <Icon size={28} className="mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  {action.title}
                </h2>
                <p className="text-sm leading-relaxed opacity-70">
                  {action.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold">
                  Get started
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Refund Process — Vertical timeline                                 */
/* ------------------------------------------------------------------ */
const refundSteps = [
  {
    number: '01',
    title: 'Shipment is Returned',
    description: 'A package is returned to sender due to delivery failure, refused delivery, or incorrect address.',
  },
  {
    number: '02',
    title: 'Agent Contacts Customer Relations',
    description: 'Our shipping agent reaches out to DHL Customer Relations to investigate the cause and document the issue.',
  },
  {
    number: '03',
    title: 'We Contact You',
    description: 'We reach out to apologize for the inconvenience and attempt to arrange a resend of the shipment.',
  },
  {
    number: '04',
    title: 'Refund Request Submitted',
    description: 'If a resend is not possible, you submit a refund request through our portal with your shipment details.',
  },
  {
    number: '05',
    title: 'Admin Review',
    description: 'Our admin team reviews your claim within 48-72 business hours. You can track the status in real time.',
  },
  {
    number: '06',
    title: 'Refund Issued',
    description: 'Once approved, the refund is processed and issued back to your original payment method.',
  },
];

function RefundProcess() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
            How We Process Refunds
          </h2>
          <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-xl">
            A transparent, step-by-step process so you always know where your claim stands.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-0">
            {refundSteps.map((step, i) => (
              <div key={step.number} className="relative flex gap-6 sm:gap-8 group">
                {/* Step number */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-cs-orange flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{step.number}</span>
                </div>

                {/* Content */}
                <div className={`pb-8 ${i === refundSteps.length - 1 ? 'pb-0' : ''}`}>
                  <h3 className="text-base sm:text-lg font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mt-1 max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/refund"
            className="inline-flex items-center gap-2 bg-cs-orange hover:bg-cs-orange/90 text-white font-bold px-6 py-3 rounded transition-colors text-sm"
          >
            Submit a Refund Request
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Area — Bold stats band                                     */
/* ------------------------------------------------------------------ */
const capabilities = [
  { icon: Globe, value: '220+', label: 'Countries & Territories' },
  { icon: Truck, value: 'Real-Time', label: 'Shipment Tracking' },
  { icon: Headphones, value: 'Dedicated', label: 'Support Team' },
  { icon: Clock, value: '48-72 hrs', label: 'Refund Processing' },
];

function ServiceArea() {
  return (
    <section className="bg-cs-green">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.label} className="text-center">
                <Icon size={24} className="text-white mx-auto mb-3" />
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {cap.value}
                </p>
                <p className="text-sm font-semibold text-white/70 mt-1">
                  {cap.label}
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
/*  Contact / Support Band                                             */
/* ------------------------------------------------------------------ */
function ContactBand() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Need Help? Contact Our Support Team.
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Available Monday through Friday, 8:00 AM - 6:00 PM. Saturday 9:00 AM - 1:00 PM.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-2 text-white font-semibold text-sm hover:text-cs-orange transition-colors"
            >
              <Phone size={16} className="text-cs-orange" />
              1-800-123-4567
            </a>
            <a
              href="mailto:info@cubicship.com"
              className="flex items-center gap-2 text-white font-semibold text-sm hover:text-cs-orange transition-colors"
            >
              <Mail size={16} className="text-cs-orange" />
              info@cubicship.com
            </a>
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
      <TopBanner />
      <QuickActions />
      <RefundProcess />
      <ServiceArea />
      <ContactBand />
    </>
  );
}
