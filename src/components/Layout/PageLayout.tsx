import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import { AuthModal } from '../Auth/AuthModal';
>>>>>>> 2e6d0fab3a962fb226b6e64f00433ea29d71a3e7

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({ children, title, showBackButton = true }) => (
  <div className="page-container">
<<<<<<< HEAD
=======
    <header className="page-header">
      <nav className="nav">
        <Link to="/" className="logo-link">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">Cursor AI</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/privacy">Ochrana súkromia</Link>
          <Link to="/terms">Podmienky používania</Link>
        </div>
        <AuthModal />
      </nav>
    </header>

>>>>>>> 2e6d0fab3a962fb226b6e64f00433ea29d71a3e7
    <main className="page-content">
      {showBackButton && (
        <nav className="page-nav">
          <Link to="/" className="back-link">← Späť na hlavnú stránku</Link>
        </nav>
      )}
      
      <h1 className="page-title">{title}</h1>
      {children}
    </main>
<<<<<<< HEAD
  </div>
);
=======

    <footer className="page-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Právne informácie</h4>
          <Link to="/privacy">Ochrana súkromia</Link>
          <Link to="/terms">Podmienky používania</Link>
        </div>
        <div className="footer-section">
          <h4>Odkazy</h4>
          <Link to="/about">O nás</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="footer-section">
          <h4>Kontakt</h4>
          <p>Email: tomulec.peter@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Cursor AI. Všetky práva vyhradené.</p>
      </div>
    </footer>
  </div>
); 
>>>>>>> 2e6d0fab3a962fb226b6e64f00433ea29d71a3e7
