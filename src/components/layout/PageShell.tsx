import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
