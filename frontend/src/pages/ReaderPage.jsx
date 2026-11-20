import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMangaById, mockMangas } from '../data/mangaData';
import { useWallet } from '../contexts/WalletContext';
import {
  FiArrowLeft,
  FiArrowRight,
  FiMaximize,
  FiMinimize,
  FiSun,
  FiLock,
  FiZap,
} from 'react-icons/fi';
import '../styles/ReaderPage.css';

// Sample manga high-res pages for reading preview
const samplePages = [
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1563089145-599997674d42?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
];

export default function ReaderPage() {
  const { id, chapter } = useParams();
  const navigate = useNavigate();
  const { isChapterUnlocked, unlockChapter, setPaymentModalOpen, vipTier } = useWallet();
  const manga = getMangaById(id) || mockMangas[0];
  const currentChapter = parseInt(chapter) || 1;

  const [readingMode, setReadingMode] = useState('webtoon'); // 'webtoon' or 'paged'
  const [currentPage, setCurrentPage] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Check if locked: latest chapters require unlock or VIP
  const isLockedChapter = currentChapter > manga.chapters - 3 && manga.chapters > 5;
  const isUnlocked = !isLockedChapter || isChapterUnlocked(manga.id, currentChapter);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, readingMode, isUnlocked]);

  const nextPage = () => {
    if (currentPage < samplePages.length - 1) {
      setCurrentPage((p) => p + 1);
    } else if (currentChapter < manga.chapters) {
      navigate(`/read/${manga.id}/${currentChapter + 1}`);
      setCurrentPage(0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
    } else if (currentChapter > 1) {
      navigate(`/read/${manga.id}/${currentChapter - 1}`);
      setCurrentPage(samplePages.length - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className={`reader-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Top Floating Control Bar */}
      <header className={`reader-header ${showControls ? 'visible' : 'hidden'}`}>
        <div className="reader-header-left">
          <Link to={`/manga/${manga.id}`} className="reader-back-btn">
            <FiArrowLeft /> <span>{manga.title}</span>
          </Link>
          <span className="chapter-pill">Bob {currentChapter}</span>
        </div>

        <div className="reader-header-center">
          <select
            className="chapter-select"
            value={currentChapter}
            onChange={(e) => {
              navigate(`/read/${manga.id}/${e.target.value}`);
              setCurrentPage(0);
            }}
          >
            {Array.from({ length: manga.chapters }, (_, i) => i + 1).map((c) => (
              <option key={c} value={c}>
                Bob {c}
              </option>
            ))}
          </select>
        </div>

        <div className="reader-header-right">
          <button
            className={`mode-btn ${readingMode === 'webtoon' ? 'active' : ''}`}
            onClick={() => setReadingMode(readingMode === 'webtoon' ? 'paged' : 'webtoon')}
            title="O'qish rejimini almashtirish"
          >
            {readingMode === 'webtoon' ? '📜 Lenta' : '📖 Sahifa'}
          </button>

          <div className="brightness-control">
            <FiSun />
            <input
              type="range"
              min="30"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              title="Yorug'lik"
            />
          </div>

          <button className="icon-reader-btn" onClick={toggleFullscreen} title="To'liq ekran">
            {isFullscreen ? <FiMinimize /> : <FiMaximize />}
          </button>
        </div>
      </header>

      {/* Reader Body or Locked Paywall */}
      <main
        className={`reader-body mode-${readingMode}`}
        style={{
          filter: `brightness(${brightness}%)`,
        }}
        onClick={() => setShowControls(!showControls)}
      >
        {!isUnlocked ? (
          <div className="reader-locked-box animate-fadeIn">
            <div className="lock-big-icon">🔒</div>
            <h2>Ushbu Bob Eksklyuziv (Pullik)</h2>
            <p>
              Ushbu yangi bob MangaLab tarjimonlari tomonidan erta kirish sifatida taqdim etilgan.
            </p>
            <div className="locked-action-buttons">
              <button
                className="btn-unlock-coins"
                onClick={() => unlockChapter(manga.id, currentChapter, 3)}
              >
                <FiZap /> 3 Tanga evaziga ochish
              </button>
              <button
                className="btn-unlock-vip"
                onClick={() => setPaymentModalOpen(true)}
              >
                👑 VIP bo'lish (Barcha boblar cheksiz)
              </button>
            </div>
          </div>
        ) : readingMode === 'webtoon' ? (
          /* Webtoon long strip mode */
          <div className="webtoon-strip" style={{ maxWidth: `${zoom * 9}px` }}>
            {samplePages.map((src, index) => (
              <div key={index} className="manga-page-wrap">
                <img src={src} alt={`Page ${index + 1}`} className="manga-page-img" />
                <span className="page-number-float">{index + 1} / {samplePages.length}</span>
              </div>
            ))}
          </div>
        ) : (
          /* Single-page book mode */
          <div className="paged-view" style={{ transform: `scale(${zoom / 100})` }}>
            <img
              src={samplePages[currentPage]}
              alt={`Page ${currentPage + 1}`}
              className="paged-img"
            />
          </div>
        )}
      </main>

      {/* Bottom Floating Navigation */}
      {isUnlocked && (
        <footer className={`reader-footer ${showControls ? 'visible' : 'hidden'}`}>
          <button
            className="nav-btn"
            onClick={prevPage}
            disabled={currentChapter === 1 && currentPage === 0}
          >
            <FiArrowLeft /> Oldingi
          </button>

          <span className="progress-info">
            {readingMode === 'paged'
              ? `${currentPage + 1} / ${samplePages.length} Sahifa`
              : `Bob ${currentChapter} / ${manga.chapters}`}
          </span>

          <button
            className="nav-btn"
            onClick={nextPage}
            disabled={currentChapter === manga.chapters && currentPage === samplePages.length - 1}
          >
            Keyingi <FiArrowRight />
          </button>
        </footer>
      )}
    </div>
  );
}
