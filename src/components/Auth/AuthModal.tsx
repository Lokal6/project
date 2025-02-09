import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import './Auth.css';
import { useAuth } from '../../contexts/AuthContext';

export const AuthModal = () => {
  const { user } = useAuth();
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log('Google sign-in successful');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Sign-out successful');
    } catch (error: any) {
      console.error('Sign-out error:', error);
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
        <button 
          onClick={handleGoogleSignIn} 
          className="auth-button google"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <img 
            src="/google.png" 
            alt="Google" 
            style={{ width: '18px', height: '18px' }}
          />
          Prihlásiť cez Google
        </button>
      )}
      {error && (
        <div className="error-message" style={{ color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  );
}; 