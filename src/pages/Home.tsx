import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

export const Home = () => {
  const navigate = useNavigate();
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    
    // Pridáme malý threshold aby sa päta neschovávala pri malých pohyboch
    if (Math.abs(currentScrollY - lastScrollY) > 5) {
      setIsFooterVisible(!scrollingDown);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Touch handling pre mobilné zariadenia
  const [touchStart, setTouchStart] = useState(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 5) { // threshold pre malé pohyby
      setIsFooterVisible(diff > 0); // skryť pri swipe hore
    }

    setTouchStart(touchEnd);
  }, [touchStart]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleScroll, handleTouchMove]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Úspešne odhlásený');
    } catch (error) {
      console.error('Chyba pri odhlásení:', error);
    }
  };
  return (
    <div className="blocker-page">
      <header className="home-header">
        <div className="logo-container">
          <span className="logo-icon">🚀</span>
          <h1>Lokal6</h1>
        </div>
        <button className="auth-button logout" onClick={handleLogout}>
          Odhlásiť sa
        </button>
      </header>

      <main className="home-content">
        <button 
          className="coffee-button"
          onClick={() => navigate('/coffee')}
        >
          <span className="coffee-icon">☕</span>
          coffereader
        </button>
      </main>

      <footer className={`home-footer ${!isFooterVisible ? 'hidden' : ''}`}>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Connect</h4>
            <a href="https://github.com/Lokal6/project" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
      
