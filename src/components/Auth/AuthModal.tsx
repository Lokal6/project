import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth';
import './Auth.css';
import { useAuth } from '../../contexts/AuthContext';

export const AuthModal = () => {
  const { user } = useAuth();
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      {user ? (
        <>
          <span className="user-email">{user.email}</span>
          <button onClick={handleSignOut} className="auth-button logout">
            Odhlásiť
          </button>
        </>
      ) : (
        <button onClick={handleGoogleSignIn} className="auth-button google">
          Prihlásiť cez Google
        </button>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}; 