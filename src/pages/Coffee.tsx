import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const Coffee = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Úspešne odhlásený');
      navigate('/');
    } catch (error) {
      console.error('Chyba pri odhlásení:', error);
    }
  };

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
        <button className="auth-button logout coffee-logout" onClick={handleLogout}>
          Odhlásiť sa
        </button>
      </header>

      <main className="home-content">
        {/* Tu bude obsah coffee stránky */}
      </main>
    </div>
  );
}; 