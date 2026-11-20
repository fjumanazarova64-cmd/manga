import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { mockMangas } from '../data/mangaData';
import MangaCard from '../components/MangaCard';
import { FiUser, FiHeart, FiClock, FiSettings, FiLogOut, FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/ProfilePage.css';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { theme, themeName } = useTheme();

  const currentUser = user || {
    username: 'Mehmon Foydalanuvchi',
    email: 'guest@mangauz.uz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
    joinDate: '2026-11-20',
  };

  const favoriteMangas = mockMangas.slice(0, 4);
  const historyMangas = mockMangas.slice(4, 7);

  return (
    <div className="profile-page container">
      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-avatar-wrap">
          <img src={currentUser.avatar} alt={currentUser.username} className="profile-avatar" />
          <span className="profile-badge-icon">⛩</span>
        </div>

        <div className="profile-main-info">
          <h2>{currentUser.username}</h2>
          <p className="profile-email">{currentUser.email}</p>
          <div className="profile-tags">
            <span className="badge badge-hot">VIP O'quvchi</span>
            <span className="badge badge-top">Mavzu: {themeName.toUpperCase()}</span>
          </div>
        </div>

        <div className="profile-actions">
          {user ? (
            <button className="logout-btn" onClick={logout}>
              <FiLogOut /> Chiqish
            </button>
          ) : (
            <Link to="/login" className="login-btn-link">
              Kirish / Ro'yxatdan o'tish
            </Link>
          )}
        </div>
      </div>

      {/* Reader Statistics */}
      <div className="stats-cards-grid">
        <div className="stats-card">
          <div className="stats-card-icon">📖</div>
          <div>
            <h3>142</h3>
            <p>O'qilgan Boblar</p>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-card-icon">❤️</div>
          <div>
            <h3>{favoriteMangas.length}</h3>
            <p>Sevimlilar</p>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-card-icon">⏱️</div>
          <div>
            <h3>34 soat</h3>
            <p>O'qish Vaqti</p>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-card-icon">🏆</div>
          <div>
            <h3>Level 5</h3>
            <p>Daraja (Otaku)</p>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="profile-section">
        <div className="profile-section-title">
          <FiHeart style={{ color: 'var(--primary)' }} />
          <h3>Sevimlilarim ({favoriteMangas.length})</h3>
        </div>
        <div className="profile-manga-grid">
          {favoriteMangas.map((m) => (
            <MangaCard key={m.id} manga={m} size="sm" />
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="profile-section">
        <div className="profile-section-title">
          <FiClock style={{ color: 'var(--secondary)' }} />
          <h3>Oxirgi o'qilganlar</h3>
        </div>
        <div className="profile-manga-grid">
          {historyMangas.map((m) => (
            <MangaCard key={m.id} manga={m} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
