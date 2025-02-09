import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({ children, title, showBackButton = true }) => (
  <div className="page-container">
    <main className="page-content">
      {showBackButton && (
        <nav className="page-nav">
          <Link to="/" className="back-link">← Späť na hlavnú stránku</Link>
        </nav>
      )}
      
      <h1 className="page-title">{title}</h1>
      {children}
    </main>
  </div>
);