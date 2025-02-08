import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <nav className="nav">
          <div className="logo">🚀 Cursor AI</div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </div>
        </nav>
        <div className="hero">
          <h1>Cursor AI Project</h1>
          <p>Modern React + Firebase Application</p>
          <button className="cta-button">Get Started</button>
        </div>
      </header>
      
      <main className="app-main">
        <section id="features" className="features">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">✨</span>
              <h3>React 19</h3>
              <p>Latest React features</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>Vite</h3>
              <p>Lightning fast builds</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔥</span>
              <h3>Firebase</h3>
              <p>Powerful backend</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📝</span>
              <h3>TypeScript</h3>
              <p>Type-safe code</p>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <h2>About Project</h2>
          <div className="about-content">
            <p>Built with modern web technologies for optimal performance and developer experience.</p>
            <div className="tech-stack">
              <span className="tech-badge">React</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">Vite</span>
              <span className="tech-badge">Firebase</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Links</h4>
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
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
  )
}

export default App
