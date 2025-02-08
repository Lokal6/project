import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import './App.css'
import { AuthModal } from './components/Auth/AuthModal'
import { auth } from './firebase'
import { User } from 'firebase/auth'
import { getRedirectResult } from 'firebase/auth'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { About } from './pages/About'

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth listener...');
    
    // Handler pre redirect prihlásenie
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log('Redirect login successful:', result.user.email);
        }
      })
      .catch((error) => {
        console.error('Redirect error:', error);
      });

    // Existujúci auth listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', {
        isUser: !!user,
        email: user?.email,
        uid: user?.uid
      });
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth error:', error);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <nav className="nav">
            <div className="logo">🚀 Cursor AI</div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              {user && <Link to="/dashboard">Dashboard</Link>}
              <Link to="/about">About</Link>
            </div>
            <AuthModal />
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={!user ? <Home /> : <Dashboard />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Links</h4>
              <Link to="/">Home</Link>
              <Link to="/features">Features</Link>
              <Link to="/about">About</Link>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <a href="https://github.com/Lokal6/project" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Built with modern web technologies</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
