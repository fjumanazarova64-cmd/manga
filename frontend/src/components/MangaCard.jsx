import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiStar, FiEye, FiBookOpen, FiHeart } from 'react-icons/fi';
import '../styles/MangaCard.css';

export default function MangaCard({ manga, size = 'md' }) {
  const { t } = useTranslation();
  const [imgErr, setImgErr] = useState(false);
  const [liked, setLiked] = useState(false);

  const fallback = `https://placehold.co/300x420/13131a/e63946?text=${encodeURIComponent(manga.title)}`;

  return (
    <Link to={`/manga/${manga.id}`} className={`manga-card card-hover size-${size}`}>
      <div className="manga-card-img-wrap">
        <img
          src={imgErr ? fallback : manga.cover}
          alt={manga.title}
          className="manga-card-img"
          onError={() => setImgErr(true)}
          loading="lazy"
        />

        {/* Badges */}
        <div className="manga-card-badges">
          {manga.isHot && <span className="badge badge-hot">🔥 Hot</span>}
          {manga.isNew && <span className="badge badge-new">✨ New</span>}
        </div>

        {/* Like button */}
        <button
          className={`manga-like-btn ${liked ? 'liked' : ''}`}
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
        >
          <FiHeart />
        </button>

        {/* Status */}
        <div className={`manga-status badge ${manga.status === 'completed' ? 'badge-done' : 'badge-ongoing'}`}>
          {manga.status === 'completed' ? t('manga.completed') : t('manga.ongoing')}
        </div>

        {/* Hover overlay */}
        <div className="manga-card-overlay">
          <div className="manga-overlay-content">
            <div className="manga-overlay-genres">
              {manga.genres.slice(0, 3).map(g => (
                <span key={g} className="genre-chip">{g}</span>
              ))}
            </div>
            <div className="btn-read">
              <FiBookOpen /> {t('manga.read')}
            </div>
          </div>
        </div>
      </div>

      <div className="manga-card-info">
        <h3 className="manga-card-title">{manga.title}</h3>
        <div className="manga-card-meta">
          <span className="meta-item">
            <FiStar className="star-icon" />
            {manga.rating}
          </span>
          <span className="meta-item">
            <FiBookOpen />
            {manga.chapters}
          </span>
          <span className="meta-item">
            <FiEye />
            {manga.views >= 1000000
              ? `${(manga.views / 1000000).toFixed(1)}M`
              : manga.views >= 1000
              ? `${(manga.views / 1000).toFixed(0)}K`
              : manga.views}
          </span>
        </div>
      </div>
    </Link>
  );
}
