import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './Auth/AuthModal';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';

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

      <main className="app-main">
        <Routes>
          <Route path="/" element={!user ? <Home /> : <Dashboard />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Home />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Právne informácie</h4>
            <Link to="/privacy">Ochrana súkromia</Link>
            <Link to="/terms">Podmienky používania</Link>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            {user && <Link to="/dashboard">Dashboard</Link>}
            <Link to="/about">About</Link>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <a href="https://github.com/Lokal6/project" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Built with modern web technologies</p>
        </div>
      </footer>
    </div>
  );
}; 