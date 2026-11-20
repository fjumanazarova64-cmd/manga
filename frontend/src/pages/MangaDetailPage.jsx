import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMangaById, generateChapters, mockMangas } from '../data/mangaData';
import { useWallet } from '../contexts/WalletContext';
import MangaCard from '../components/MangaCard';
import {
  FiBookOpen,
  FiHeart,
  FiStar,
  FiEye,
  FiShare2,
  FiClock,
  FiSearch,
  FiArrowUp,
  FiArrowDown,
  FiSend,
  FiLock,
  FiUnlock,
  FiDollarSign,
} from 'react-icons/fi';
import '../styles/MangaDetailPage.css';

export default function MangaDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { unlockChapter, isChapterUnlocked, setPaymentModalOpen, vipTier } = useWallet();
  const manga = getMangaById(id) || mockMangas[0];

  const [isFavorite, setIsFavorite] = useState(false);
  const [chapterSearch, setChapterSearch] = useState('');
  const [isAscending, setIsAscending] = useState(false);
  const [unlockStatus, setUnlockStatus] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Azizbek', text: 'MangaLab\'dan Nano Mashina juda ajoyib tarjima qilinibdi!', date: '2 soat oldin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Azizbek' },
    { id: 2, user: 'MangaFan99', text: 'VIP a\'zolik oldim, endi barcha boblar reklamasiz ochilyapti.', date: '5 soat oldin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MangaFan99' },
  ]);
  const [newComment, setNewComment] = useState('');

  const chapters = generateChapters(manga.chapters);

  const filteredChapters = chapters
    .filter((ch) =>
      ch.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
      ch.number.toString().includes(chapterSearch)
    )
    .sort((a, b) => (isAscending ? a.number - b.number : b.number - a.number));

  const handleUnlock = (chNum) => {
    const res = unlockChapter(manga.id, chNum, 3);
    setUnlockStatus(res.message);
    setTimeout(() => setUnlockStatus(''), 3000);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now(),
        user: 'Siz (Foydalanuvchi)',
        text: newComment,
        date: 'Hozirgina',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      ...comments,
    ]);
    setNewComment('');
  };

  const related = mockMangas.filter((m) => m.id !== manga.id).slice(0, 4);

  return (
    <div className="manga-detail-page">
      {/* Dynamic Backdrop */}
      <div
        className="manga-banner"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,15,0.4) 0%, var(--bg) 100%), url(${manga.cover})`,
        }}
      />

      <div className="container manga-detail-container">
        {/* Main Details Block */}
        <div className="manga-head-card">
          <div className="poster-col">
            <img src={manga.cover} alt={manga.title} className="manga-poster" />
            <button
              className={`fav-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <FiHeart /> {isFavorite ? 'Sevimlilarda' : 'Sevimlilarga qo\'shish'}
            </button>
            <button
              className="donate-creator-btn"
              onClick={() => setPaymentModalOpen(true)}
            >
              ❤️ Tarjimonni qo'llash (Donat)
            </button>
          </div>

          <div className="info-col">
            <div className="badge-row">
              <span className={`badge ${manga.status === 'completed' ? 'badge-done' : 'badge-ongoing'}`}>
                {manga.status === 'completed' ? 'Tugallangan' : 'Davom etmoqda'}
              </span>
              <span className="badge badge-hot">🔥 MangaLab Hit</span>
              {manga.type && <span className="badge badge-top">{manga.type}</span>}
            </div>

            <h1 className="manga-title">{manga.title}</h1>
            <h3 className="manga-title-alt">{manga.titleEn}</h3>

            <div className="stats-strip">
              <div className="stat-box">
                <FiStar style={{ color: '#ffd60a' }} />
                <div>
                  <strong>{manga.rating}</strong>
                  <span>Reyting</span>
                </div>
              </div>
              <div className="stat-box">
                <FiBookOpen style={{ color: 'var(--primary)' }} />
                <div>
                  <strong>{manga.chapters}</strong>
                  <span>Boblar</span>
                </div>
              </div>
              <div className="stat-box">
                <FiEye style={{ color: 'var(--secondary)' }} />
                <div>
                  <strong>{(manga.views / 1000).toFixed(0)}K</strong>
                  <span>Ko'rishlar</span>
                </div>
              </div>
            </div>

            <div className="meta-info-grid">
              <div className="meta-row">
                <span className="meta-label">Muallif:</span>
                <span className="meta-val">{manga.author}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Janrlar:</span>
                <div className="genre-badges">
                  {manga.genres.map((g) => (
                    <span key={g} className="genre-tag">{g}</span>
                  ))}
                </div>
              </div>
            </div>

            <p className="manga-synopsis">{manga.synopsis}</p>

            <div className="read-action-bar">
              <Link to={`/read/${manga.id}/1`} className="btn-read-first">
                <FiBookOpen /> 1-Bobdan o'qish
              </Link>
              <Link to={`/read/${manga.id}/${manga.chapters}`} className="btn-read-last">
                Oxirgi bob ({manga.chapters})
              </Link>
            </div>
          </div>
        </div>

        {unlockStatus && (
          <div className="unlock-alert-banner animate-fadeIn">
            ⚡ {unlockStatus}
          </div>
        )}

        {/* Chapters & Discussion Section */}
        <div className="content-columns">
          {/* Chapters Column */}
          <div className="chapters-box">
            <div className="chapters-header">
              <h2>Boblar Ro'yxati ({manga.chapters})</h2>
              <div className="chapters-controls">
                <div className="chapter-search">
                  <FiSearch />
                  <input
                    type="text"
                    placeholder="Bob..."
                    value={chapterSearch}
                    onChange={(e) => setChapterSearch(e.target.value)}
                  />
                </div>
                <button
                  className="sort-order-btn"
                  onClick={() => setIsAscending(!isAscending)}
                  title="Tartibni o'zgartirish"
                >
                  {isAscending ? <FiArrowUp /> : <FiArrowDown />}
                </button>
              </div>
            </div>

            <div className="chapters-list">
              {filteredChapters.map((ch) => {
                const unlocked = !ch.isLocked || isChapterUnlocked(manga.id, ch.number);
                return (
                  <div key={ch.id} className="chapter-row-container">
                    <Link
                      to={unlocked ? `/read/${manga.id}/${ch.number}` : '#'}
                      onClick={(e) => {
                        if (!unlocked) {
                          e.preventDefault();
                          handleUnlock(ch.number);
                        }
                      }}
                      className={`chapter-item ${ch.isLocked && !unlocked ? 'locked' : ''}`}
                    >
                      <div className="chapter-main">
                        <span className="chapter-title">
                          {ch.title}
                          {ch.isLocked && !unlocked && (
                            <span className="lock-tag">🔒 3 Tanga (Pullik)</span>
                          )}
                        </span>
                        <span className="chapter-date">{ch.date}</span>
                      </div>
                      <div className="chapter-actions-right">
                        <span className="chapter-views">👁️ {(ch.views / 1000).toFixed(1)}k</span>
                        {ch.isLocked && !unlocked && (
                          <button
                            type="button"
                            className="quick-unlock-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleUnlock(ch.number);
                            }}
                          >
                            Ochish
                          </button>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comments Column */}
          <div className="comments-box">
            <h2>Izohlar ({comments.length})</h2>

            <form onSubmit={handlePostComment} className="comment-form">
              <textarea
                placeholder="Fikringizni qoldiring..."
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit" className="comment-submit">
                <FiSend /> Jo'natish
              </button>
            </form>

            <div className="comment-list">
              {comments.map((c) => (
                <div key={c.id} className="comment-item">
                  <img src={c.avatar} alt={c.user} className="comment-avatar" />
                  <div className="comment-body">
                    <div className="comment-head">
                      <strong>{c.user}</strong>
                      <span className="comment-date">{c.date}</span>
                    </div>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Mangas */}
        <div className="related-section">
          <h2>Tavsiya etilgan MangaLab Asarlari</h2>
          <div className="browse-grid">
            {related.map((m) => (
              <MangaCard key={m.id} manga={m} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
