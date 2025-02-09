import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './Auth/AuthModal';
import { Home } from '../pages/Home';
import { Blocker } from '../pages/Blocker';

export const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!user) {
    return <Blocker />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <nav className="nav">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">Lokal6</span>
          </div>
          <AuthModal />
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
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