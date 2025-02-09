import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { userService } from '../../services/userService';
import './Auth.css';
import { EmailSignIn } from './EmailSignIn';

export const SignIn = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        await userService.saveUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: new Date()
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Prihlásený používateľ:', result.user);
    } catch (error) {
      console.error('Chyba pri prihlásení:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Používateľ odhlásený');
    } catch (error) {
      console.error('Chyba pri odhlásení:', error);
    }
  };

  return user ? (
    <div className="auth-container">
      <div className="user-profile">
        {user.photoURL && (
          <img 
            src={user.photoURL} 
            alt="Profilová fotka" 
            className="user-avatar"
          />
        )}
        <span className="user-email">{user.email}</span>
      </div>
      <button onClick={handleSignOut} className="auth-button logout">
        Odhlásiť
      </button>
    </div>
  ) : (
    <div className="auth-container">
      <button onClick={handleGoogleSignIn} className="auth-button">
        Prihlásiť cez Google
      </button>
      <EmailSignIn />
    </div>
  );
}; 