import { useNavigate } from 'react-router-dom';

export const Coffee = () => {
  const navigate = useNavigate();
  
  return (
    <div className="blocker-page">
      <header className="coffee-header">
        <span className="back-text" onClick={() => navigate('/')}>
          <span className="logo-icon">🚀</span>
          Lokal6
        </span>
        <h1 className="coffee-title">
          <span className="coffee-icon">☕</span>
          coffereader
        </h1>
      </header>

      <main className="home-content">
        {/* Tu bude obsah coffee stránky */}
      </main>
    </div>
  );
}; 