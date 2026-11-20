import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHeart, FiSend, FiGlobe, FiGithub } from 'react-icons/fi';
import '../styles/Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="main-footer">
      <div className="container footer-content">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">⛩</span>
            <span className="gradient-text" style={{ fontSize: '24px', fontWeight: '900' }}>
              MANGA
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '18px' }}>UZ</span>
          </Link>
          <p className="footer-desc">
            O'zbekistonning eng zamonaviy va qulay manga platformasi. Barcha yangiliklar,
            tarjimalar va sevib o'qiladigan boblar bir joyda.
          </p>
          <div className="footer-socials">
            <a href="https://t.me/mangabox_uz" target="_blank" rel="noreferrer" title="Telegram">
              <FiSend />
            </a>
            <a href="#" title="Web">
              <FiGlobe />
            </a>
            <a href="#" title="GitHub">
              <FiGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigatsiya</h4>
          <ul className="footer-links">
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/browse">{t('nav.browse')}</Link></li>
            <li><Link to="/browse?filter=trending">{t('home.trending')}</Link></li>
            <li><Link to="/profile">{t('nav.profile')}</Link></li>
          </ul>
        </div>

        {/* Genres Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Mashhur Janrlar</h4>
          <ul className="footer-links">
            <li><Link to="/browse?genre=Aksyon">Aksyon</Link></li>
            <li><Link to="/browse?genre=Sarguzasht">Sarguzasht</Link></li>
            <li><Link to="/browse?genre=Fantezi">Fantezi</Link></li>
            <li><Link to="/browse?genre=Dahshat">Dahshat</Link></li>
          </ul>
        </div>

        {/* Info Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Qo'llab-quvvatlash</h4>
          <ul className="footer-links">
            <li><a href="#">Sayt qoidalari</a></li>
            <li><a href="#">Mualliflik huquqi (DMCA)</a></li>
            <li><a href="#">Aloqa va Hamkorlik</a></li>
            <li><a href="https://www.mangabox.uz/uz" target="_blank" rel="noreferrer">Manba: MangaBox.uz</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} MangaUz. Barcha huquqlar himoyalangan.</p>
          <p className="made-with">
            Yurakdan ishlandi <FiHeart style={{ color: 'var(--primary)', fill: 'var(--primary)' }} /> manga ixlosmandlari uchun.
          </p>
        </div>
      </div>
    </footer>
  );
}
