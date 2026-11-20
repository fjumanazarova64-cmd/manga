import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useWallet } from '../contexts/WalletContext';
import MangaCard from '../components/MangaCard';
import { mockMangas, genres, getTrending, getHot, getVipMangas } from '../data/mangaData';
import {
  FiTrendingUp,
  FiZap,
  FiStar,
  FiClock,
  FiBookOpen,
  FiArrowRight,
  FiShield,
  FiActivity,
  FiUsers,
} from 'react-icons/fi';
import '../styles/HomePage.css';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const { setPaymentModalOpen } = useWallet();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [heroIndex, setHeroIndex] = useState(0);

  // Use top scraped MangaLab titles for hero
  const heroMangas = mockMangas.slice(0, 5);
  const trending = getTrending();
  const hotMangas = getHot();
  const vipList = getVipMangas();

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroMangas.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroMangas.length]);

  const activeHero = heroMangas[heroIndex] || mockMangas[0];

  const getTitle = (m) => {
    if (i18n.language === 'ru' && m.titleRu) return m.titleRu;
    if (i18n.language === 'en' && m.titleEn) return m.titleEn;
    return m.title;
  };

  const filteredMangas = selectedGenre === 'All'
    ? mockMangas
    : mockMangas.filter((m) => m.genres && m.genres.includes(selectedGenre));

  return (
    <div className="home-page">
      {/* Dynamic Animated Hero Section (Entrance) */}
      <section className="hero-section">
        <div
          className="hero-backdrop"
          style={{
            backgroundImage: `linear-gradient(to right, var(--bg) 15%, rgba(10,10,15,0.7) 65%, transparent 100%), linear-gradient(to top, var(--bg) 0%, transparent 80%), url(${activeHero.cover})`,
          }}
        />

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-live-badge animate-fadeIn">
              <span className="live-pulse-dot"></span>
              <span>1 482 o'quvchi hozir onlayn</span>
              <span className="hero-rating"><FiStar /> {activeHero.rating}</span>
            </div>

            <h1 className="hero-title animate-fadeInUp">
              {getTitle(activeHero)}
            </h1>

            <div className="hero-genres animate-fadeInUp">
              {activeHero.genres && activeHero.genres.map((g) => (
                <span key={g} className="genre-tag">{g}</span>
              ))}
              <span className="hero-author">⛩️ {activeHero.type || 'Manhwa'}</span>
              <span className="hero-chapters-count">📖 {activeHero.chapters} bob</span>
            </div>

            <p className="hero-desc animate-fadeInUp">
              {activeHero.synopsis}
            </p>

            <div className="hero-actions animate-fadeInUp">
              <Link to={`/manga/${activeHero.id}`} className="hero-read-btn">
                <FiBookOpen /> {t('home.startReading')}
              </Link>
              <Link to={`/browse`} className="hero-explore-btn">
                {t('home.viewAll')} <FiArrowRight />
              </Link>
              <button
                className="hero-vip-btn"
                onClick={() => setPaymentModalOpen(true)}
              >
                👑 VIP A'zolik
              </button>
            </div>

            {/* Hero Indicator Switcher */}
            <div className="hero-indicators">
              {heroMangas.map((m, idx) => (
                <button
                  key={m.id}
                  className={`hero-dot ${idx === heroIndex ? 'active' : ''}`}
                  onClick={() => setHeroIndex(idx)}
                >
                  <span></span>
                </button>
              ))}
            </div>
          </div>

          {/* 3D Floating Manga Poster Preview Stack */}
          <div className="hero-poster-stack animate-float">
            <div className="poster-card-3d">
              <img src={activeHero.cover} alt={activeHero.title} className="poster-card-img" />
              <div className="poster-card-glow" style={{ background: theme.glow }}></div>
              <div className="poster-card-info">
                <strong>{activeHero.title}</strong>
                <span>⭐ {activeHero.rating} / 10 · MangaLab</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial SaaS / Ticker Bar */}
      <div className="stats-ticker-bar">
        <div className="container ticker-container">
          <div className="ticker-item">
            <span className="ticker-icon">⚡</span>
            <div>
              <strong>MangaLab Yangiliklari</strong>
              <small>64+ ta sara manhwa va mangalar bazasi</small>
            </div>
          </div>
          <div className="ticker-item">
            <span className="ticker-icon">👑</span>
            <div>
              <strong>VIP & Erta Kirish</strong>
              <small>Yangi boblar 24 soat oldin reklamasiz</small>
            </div>
          </div>
          <div className="ticker-item">
            <span className="ticker-icon">💳</span>
            <div>
              <strong>Oson To'lov Tizimi</strong>
              <small>Payme, Click, Uzum va Humo kartalari</small>
            </div>
          </div>
        </div>
      </div>

      <div className="container home-main-grid">
        {/* Main Content Column */}
        <div className="home-content-left">
          {/* Trending MangaLab Section */}
          <section className="section-block">
            <div className="section-header">
              <div className="section-title-wrap">
                <FiTrendingUp className="section-icon" />
                <h2 className="section-title">Trenddagi MangaLab Asarlari</h2>
              </div>
              <Link to="/browse?filter=trending" className="section-link">
                {t('home.viewAll')} <FiArrowRight />
              </Link>
            </div>

            <div className="manga-slider-grid">
              {trending.map((m) => (
                <MangaCard key={m.id} manga={m} size="md" />
              ))}
            </div>
          </section>

          {/* Commercial Banner: Join VIP */}
          <div className="vip-showcase-banner">
            <div className="vip-banner-text">
              <span className="vip-chip">👑 SOTUVGA TAYYOR PLATFORMA</span>
              <h3>MangaUz VIP A'zoligi bilan Cheksiz Mutolaa</h3>
              <p>Reklamasiz, barcha pullik boblar ochiq va tarjimonlarni qo'llab-quvvatlash imkoniyati!</p>
            </div>
            <button
              className="vip-banner-cta"
              onClick={() => setPaymentModalOpen(true)}
            >
              VIP bo'lish (29 000 so'm)
            </button>
          </div>

          {/* Catalog & Genre Filter Pills */}
          <section className="section-block">
            <div className="section-header">
              <div className="section-title-wrap">
                <FiZap className="section-icon" />
                <h2 className="section-title">Janrlar bo'yicha Katalog</h2>
              </div>
            </div>

            <div className="genre-pill-list">
              <button
                className={`genre-pill ${selectedGenre === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedGenre('All')}
              >
                Barchasi ({mockMangas.length})
              </button>
              {genres.map((g) => (
                <button
                  key={g}
                  className={`genre-pill ${selectedGenre === g ? 'active' : ''}`}
                  onClick={() => setSelectedGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="manga-masonry-grid">
              {filteredMangas.slice(0, 16).map((m) => (
                <MangaCard key={m.id} manga={m} size="md" />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column: Top Ranking & Monetization Stats */}
        <aside className="home-sidebar">
          {/* Top Rated Box */}
          <div className="sidebar-card">
            <div className="sidebar-card-header">
              <FiStar style={{ color: 'var(--accent)' }} />
              <h3>Eng Yuqori Reyting</h3>
            </div>
            <div className="top-manga-list">
              {mockMangas
                .slice()
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6)
                .map((m, idx) => (
                  <Link to={`/manga/${m.id}`} key={m.id} className="top-manga-item">
                    <span className={`rank-badge rank-${idx + 1}`}>{idx + 1}</span>
                    <img src={m.cover} alt={m.title} className="top-manga-thumb" />
                    <div className="top-manga-info">
                      <h4>{getTitle(m)}</h4>
                      <div className="top-manga-sub">
                        <span>⭐ {m.rating}</span>
                        <span>📖 {m.chapters} bob</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Platform Commercial Overview Box */}
          <div className="commercial-info-box">
            <h4>📊 Platforma Ko'rsatkichlari</h4>
            <div className="commercial-metric">
              <span>Jami asarlar:</span>
              <strong>{mockMangas.length}+ ta</strong>
            </div>
            <div className="commercial-metric">
              <span>Faol a'zolar:</span>
              <strong>12 400+</strong>
            </div>
            <div className="commercial-metric">
              <span>Monetizatsiya:</span>
              <strong style={{ color: '#00e676' }}>Aktiv (Payme/Click)</strong>
            </div>
          </div>

          {/* Telegram Community */}
          <div className="community-box">
            <div className="community-glow"></div>
            <h3>MangaLab Hamjamiyati</h3>
            <p>O'zbek tilidagi eng sara manhwa va mangalar yangiliklaridan xabardor bo'ling!</p>
            <a
              href="https://mangalab.uz"
              target="_blank"
              rel="noreferrer"
              className="community-join-btn"
            >
              MangaLab Rasmiy Sayti 🚀
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
