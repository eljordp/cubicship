import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
          404
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-navy mb-6">
          Page not found
        </h1>
        <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-sm"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
