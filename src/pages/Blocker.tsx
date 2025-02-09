import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/Auth/AuthModal';

export const Blocker = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="blocker-page">
      <div className="blocker-content">
        <div className="logo-large">
          <span className="logo-icon">🚀</span>
          <h1>Cursor AI</h1>
        </div>
        
        <img 
          src="/blocker-image.svg" 
          alt="Login Required" 
          className="blocker-image"
        />
        
        <p className="blocker-message">
          Prosím prihláste sa do Cursor AI
        </p>
        
        <div className="blocker-auth">
          <AuthModal />
        </div>
      </div>
    </div>
  );
}; 