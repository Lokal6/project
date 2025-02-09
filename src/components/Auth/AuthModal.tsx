import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { 
  signInWithRedirect,
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import './Auth.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

type ModalView = 'closed' | 'login' | 'signup';

export const AuthModal = () => {
  const { user } = useAuth();
  const [view, setView] = useState<ModalView>('closed');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Synchronizujeme isAuthenticated s user stavom
  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const handleClose = () => {
    setView('closed');
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('Form submitted:', { isRegistering, email, password });

    try {
      if (isRegistering) {
        console.log('Attempting registration...');
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registration successful');
      } else {
        console.log('Attempting login...');
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful');
      }
      handleClose();
    } catch (error: any) {
      console.error('Auth error:', error.code, error.message);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email je už používaný');
      } else if (error.code === 'auth/weak-password') {
        setError('Heslo musí mať aspoň 6 znakov');
      } else if (error.code === 'auth/invalid-email') {
        setError('Neplatný email');
      } else {
        setError('Nesprávny email alebo heslo');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      // Pridáme custom parametre
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      console.log('Starting Google sign in...');
      await signInWithRedirect(auth, provider);
      
      // Nemusíme čakať na výsledok, auth listener sa o to postará
      console.log('Google sign in redirect initiated');
    } catch (error: any) {
      console.error('Google login error:', error);
      setError('Nastala chyba pri prihlásení cez Google');
    }
  };

  // Pridáme sledovanie auth stavu
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state in modal:', user?.email);
      if (user) {
        handleClose();
      }
    });
    return () => unsubscribe();
  }, []);

  // Pridáme handleSignOut
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      {!isAuthenticated ? (
        <button className="auth-login-button" onClick={() => setView('login')}>
          Prihlásiť sa
        </button>
      ) : (
        <button className="auth-login-button" onClick={handleSignOut}>
          Odhlásiť sa ({user?.email})
        </button>
      )}

      {view !== 'closed' && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose}>×</button>

            <div className="modal-header">
              <h1>{isRegistering ? 'Registrácia' : 'Prihlásenie'}</h1>
              <p className="modal-tos">
                Pokračovaním súhlasíte s našimi{' '}
                <Link to="/terms" onClick={(e) => e.stopPropagation()}>
                  Podmienkami používania
                </Link>{' '}
                a potvrdzujete, že rozumiete našim{' '}
                <Link to="/privacy" onClick={(e) => e.stopPropagation()}>
                  Zásadám ochrany súkromia
                </Link>
              </p>
            </div>

            <div className="modal-body">
              <button className="social-button google" onClick={handleGoogleLogin}>
                <img 
                  src="/google.png"
                  alt="Google"
                  className="google-icon"
                />
                Pokračovať s Google
              </button>

              <div className="modal-divider">
                <span>ALEBO</span>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Heslo"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <div className="error-message">{error}</div>}
                
                <button type="submit" className="login-button">
                  {isRegistering ? 'Registrovať' : 'Prihlásiť'}
                </button>
              </form>

              <div className="modal-footer">
                {!isRegistering ? (
                  <>
                    Ešte nemáte účet? 
                    <button className="switch-button" onClick={toggleMode}>
                      Registrovať sa
                    </button>
                  </>
                ) : (
                  <>
                    Už máte účet v Cursor AI? 
                    <button className="switch-button" onClick={toggleMode}>
                      Prihlásiť sa
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 