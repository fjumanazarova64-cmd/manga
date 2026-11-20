import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MangaCard from '../components/MangaCard';
import { mockMangas, genres } from '../data/mangaData';
import { FiSearch, FiFilter, FiSliders } from 'react-icons/fi';
import '../styles/BrowsePage.css';

export default function BrowsePage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
  const genreParam = searchParams.get('genre') || 'all';
  const filterParam = searchParams.get('filter') || 'all';

  const [search, setSearch] = useState(queryParam);
  const [selectedGenre, setSelectedGenre] = useState(genreParam);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredList = useMemo(() => {
    return mockMangas
      .filter((m) => {
        const matchesSearch =
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.titleEn.toLowerCase().includes(search.toLowerCase()) ||
          m.titleRu.toLowerCase().includes(search.toLowerCase());

        const matchesGenre =
          selectedGenre === 'all' || m.genres.includes(selectedGenre);

        const matchesStatus =
          statusFilter === 'all' || m.status === statusFilter;

        return matchesSearch && matchesGenre && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'views') return b.views - a.views;
        if (sortBy === 'chapters') return b.chapters - a.chapters;
        return b.views - a.views;
      });
  }, [search, selectedGenre, statusFilter, sortBy]);

  return (
    <div className="browse-page container">
      <div className="browse-header">
        <h1 className="browse-title">Manga Katalogi</h1>
        <p className="browse-subtitle">
          Barcha sevimli komikslar, manhwalar va mangalar to'plami
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="filter-panel">
        <div className="filter-search-row">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Nom, muallif yoki kalit so'z bilan qidiring..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-selects">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Barcha holatlar</option>
              <option value="ongoing">Davom etmoqda</option>
              <option value="completed">Tugallangan</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="popular">Eng mashhur</option>
              <option value="rating">Reyting bo'yicha</option>
              <option value="chapters">Boblar soni bo'yicha</option>
            </select>
          </div>
        </div>

        {/* Genre Tags Scroll */}
        <div className="genre-scroll-bar">
          <button
            className={`genre-btn ${selectedGenre === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedGenre('all')}
          >
            Barchasi
          </button>
          {genres.map((g) => (
            <button
              key={g}
              className={`genre-btn ${selectedGenre === g ? 'active' : ''}`}
              onClick={() => setSelectedGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Grid */}
      <div className="results-info">
        <span>Topildi: <strong>{filteredList.length} ta manga</strong></span>
      </div>

      {filteredList.length > 0 ? (
        <div className="browse-grid">
          {filteredList.map((m) => (
            <MangaCard key={m.id} manga={m} size="md" />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>Manga topilmadi</h3>
          <p>Boshqa qidiruv so'zi yoki janrni sinab ko'ring</p>
        </div>
      )}
    </div>
  );
}
