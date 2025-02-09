import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

export const EmailSignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
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

  return (
    <form onSubmit={handleSubmit} className="email-auth-form">
      <h3>{isRegistering ? 'Registrácia' : 'Prihlásenie'}</h3>
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="auth-input"
      />
      
      <input
        type="password"
        placeholder="Heslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="auth-input"
      />
      
      {error && <div className="auth-error">{error}</div>}
      
      <button type="submit" className="auth-button">
        {isRegistering ? 'Registrovať' : 'Prihlásiť'}
      </button>
      
      <button 
        type="button" 
        className="auth-switch"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? 'Už máte účet? Prihláste sa' : 'Vytvoriť nový účet'}
      </button>
    </form>
  );
}; 