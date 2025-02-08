import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './Auth/AuthModal';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';
import { About } from '../pages/About';

export const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <nav className="nav">
          <Link to="/" className="logo-link">
            <div className="logo">
              <span className="logo-icon">🚀</span>
              <span className="logo-text">Cursor AI</span>
            </div>
          </Link>
          <div className="nav-links">
            {user && <Link to="/dashboard">Dashboard</Link>}
            <Link to="/about">About</Link>
          </div>
          <AuthModal />
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={!user ? <Home /> : <Dashboard />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="app-footer">
        {/* ... footer content ... */}
      </footer>
    </div>
  );
}; 