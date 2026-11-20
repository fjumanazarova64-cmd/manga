import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import MangaDetailPage from './pages/MangaDetailPage';
import ReaderPage from './pages/ReaderPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import PricingPage from './pages/PricingPage';
import PaymentModal from './components/PaymentModal';
import { WalletProvider } from './contexts/WalletContext';

function AppContent() {
  const location = useLocation();
  const isReaderPage = location.pathname.startsWith('/read/');

  return (
    <div className="app-container">
      {!isReaderPage && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/manga/:id" element={<MangaDetailPage />} />
          <Route path="/read/:id/:chapter" element={<ReaderPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<ProfilePage />} />
          <Route path="/history" element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {!isReaderPage && <Footer />}
      <PaymentModal />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </Router>
  );
}
