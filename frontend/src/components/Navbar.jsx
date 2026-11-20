import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useWallet } from '../contexts/WalletContext';
import ThemeSwitcher from './ThemeSwitcher';
import LangSwitcher from './LangSwitcher';
import { FiSearch, FiMenu, FiX, FiHeart, FiBookOpen, FiUser, FiLogOut, FiStar, FiPlus, FiZap } from 'react-icons/fi';
import { mockMangas } from '../data/mangaData';
import '../styles/Navbar.css';

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { coins, vipTier, setPaymentModalOpen } = useWallet();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userMenu, setUserMenu] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = mockMangas.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">⛩</span>
            <span className="logo-text">
              <span className="gradient-text">MANGA</span>
              <span className="logo-uz">UZ</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="navbar-links">
            <Link to="/" className="nav-link">{t('nav.home')}</Link>
            <Link to="/browse" className="nav-link">{t('nav.browse')}</Link>
            <Link to="/browse?filter=trending" className="nav-link">
              🔥 {t('home.trending')}
            </Link>
            <Link to="/pricing" className="nav-link vip-nav-link">
              👑 VIP Obuna
            </Link>
          </div>

          {/* Right side */}
          <div className="navbar-right">
            {/* Coins Balance Chip (Click to Top Up) */}
            <button
              className="wallet-coin-chip"
              onClick={() => setPaymentModalOpen(true)}
              title="Tangalar hisobi (To'ldirish uchun bosing)"
            >
              <span className="coin-icon">🟡</span>
              <span className="coin-count">{coins}</span>
              <span className="coin-add-btn"><FiPlus /></span>
            </button>

            {/* VIP Status Pill */}
            {vipTier !== 'free' ? (
              <span className="vip-status-pill">{vipTier.toUpperCase()} VIP</span>
            ) : (
              <button
                className="vip-cta-btn"
                onClick={() => setPaymentModalOpen(true)}
              >
                👑 VIP
              </button>
            )}

            {/* Search */}
            <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} title="Qidiruv">
              <FiSearch />
            </button>

            <LangSwitcher />
            <ThemeSwitcher />

            {user ? (
              <div className="user-menu-wrapper">
                <button className="user-avatar-btn" onClick={() => setUserMenu(!userMenu)}>
                  <img src={user.avatar} alt={user.username} className="user-avatar" />
                  <span className="user-name">{user.username}</span>
                </button>
                {userMenu && (
                  <div className="user-dropdown animate-fadeIn">
                    <Link to="/profile" className="dropdown-item" onClick={() => setUserMenu(false)}>
                      <FiUser /> {t('nav.profile')}
                    </Link>
                    <Link to="/pricing" className="dropdown-item" onClick={() => setUserMenu(false)}>
                      <FiZap /> Tangalar & VIP
                    </Link>
                    <Link to="/favorites" className="dropdown-item" onClick={() => setUserMenu(false)}>
                      <FiHeart /> Sevimlilar
                    </Link>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item danger" onClick={() => { logout(); setUserMenu(false); }}>
                      <FiLogOut /> {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-btns">
                <Link to="/login" className="btn-ghost">{t('nav.login')}</Link>
                <Link to="/register" className="btn-primary-sm">{t('nav.register')}</Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button className="mobile-menu-btn icon-btn" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div className="search-bar animate-fadeInUp" ref={searchRef}>
            <div className="container">
              <form onSubmit={handleSearch} className="search-form">
                <FiSearch className="search-icon" />
                <input
                  autoFocus
                  type="text"
                  placeholder={t('nav.search')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button type="button" className="search-clear" onClick={() => setSearchQuery('')}>
                    <FiX />
                  </button>
                )}
              </form>
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map(manga => (
                    <Link
                      key={manga.id}
                      to={`/manga/${manga.id}`}
                      className="search-result-item"
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    >
                      <img src={manga.cover} alt={manga.title} className="search-result-cover" />
                      <div>
                        <div className="search-result-title">{manga.title}</div>
                        <div className="search-result-meta">
                          <FiStar /> {manga.rating} · {manga.chapters} bob
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu animate-fadeIn">
          <Link to="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('nav.home')}</Link>
          <Link to="/browse" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('nav.browse')}</Link>
          <Link to="/pricing" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>👑 VIP & Tangalar</Link>
          <button
            className="mobile-nav-link"
            style={{ textAlign: 'left', background: 'rgba(255, 214, 10, 0.1)', color: '#ffd60a' }}
            onClick={() => { setPaymentModalOpen(true); setMenuOpen(false); }}
          >
            🟡 Tangalar Balansi: {coins} (To'ldirish)
          </button>
          {!user && (
            <div className="mobile-auth">
              <Link to="/login" className="btn-ghost" onClick={() => setMenuOpen(false)}>{t('nav.login')}</Link>
              <Link to="/register" className="btn-primary-sm" onClick={() => setMenuOpen(false)}>{t('nav.register')}</Link>
            </div>
          )}
        </div>
      )}

      {/* Overlay */}
      {(menuOpen || userMenu) && (
        <div className="overlay" onClick={() => { setMenuOpen(false); setUserMenu(false); }} />
      )}
    </>
  );
}
