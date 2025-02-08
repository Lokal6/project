import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

type ModalView = 'closed' | 'login' | 'signup';

export const AuthModal = () => {
  const [view, setView] = useState<ModalView>('closed');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

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
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider).catch((error) => {
        console.error('Popup error:', error);
        if (error.code === 'auth/popup-closed-by-user') {
          throw new Error('Prihlásenie bolo zrušené');
        }
        throw error;
      });

      console.log('Login successful:', result.user.email);
      setView('closed');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Nastala chyba pri prihlásení');
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
      <button className="auth-login-button" onClick={() => setView('login')}>
        Prihlásiť sa
      </button>

      {view !== 'closed' && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose}>×</button>

            <div className="modal-header">
              <h1>{isRegistering ? 'Registrácia' : 'Prihlásenie'}</h1>
              <p className="modal-tos">
                Pokračovaním súhlasíte s našimi <a href="/terms">Podmienkami používania</a> a potvrdzujete, že rozumiete našim <a href="/privacy">Zásadám ochrany súkromia</a>
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