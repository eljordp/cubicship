import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import PageShell from './components/layout/PageShell';
import HomePage from './pages/HomePage';
import RefundPage from './pages/RefundPage';
import NotFound from './pages/NotFound';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public site */}
          <Route
            path="/"
            element={
              <PageShell>
                <HomePage />
              </PageShell>
            }
          />

          <Route
            path="/refund"
            element={
              <PageShell>
                <RefundPage />
              </PageShell>
            }
          />

          {/* Admin routes (no PageShell — standalone layout) */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          {/* Catch-all */}
          <Route
            path="*"
            element={
              <PageShell>
                <NotFound />
              </PageShell>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
