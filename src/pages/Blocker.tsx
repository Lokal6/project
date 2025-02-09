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
          <h1>Lokal6</h1>
        </div>
        
        <div className="blocker-auth">
          <AuthModal />
        </div>
      </div>
    </div>
  );
}; 