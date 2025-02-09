import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppContent } from './components/AppContent';
import './styles/layout.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
