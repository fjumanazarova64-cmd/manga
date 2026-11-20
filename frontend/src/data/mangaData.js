import mangalabRaw from './mangalabData.json';

// Normalize IDs and enrich genres
export const genres = [
  'Aksyon', 'Fantezi', 'Sarguzasht', 'Isekai', 'Komediya',
  'Drama', 'Supernatural', 'Romantika', 'Dahshat', 'Tarixiy',
  'Maktab', 'Shounen', 'Seinen', 'Manhwa', 'Manhua'
];

const genreAssign = {
  'nano-mashina': ['Aksyon', 'Fantezi', 'Tarixiy', 'Manhwa'],
  'hamma-narsani-koruvchi-kitobxon': ['Aksyon', 'Fantezi', 'Isekai', 'Supernatural'],
  'dunyodagi-eng-zor-muhandis': ['Komediya', 'Fantezi', 'Isekai', 'Sarguzasht'],
  'lookism': ['Aksyon', 'Drama', 'Maktab', 'Shounen'],
  'foydasiz-zodagonning-yuksalishi': ['Fantezi', 'Isekai', 'Sarguzasht'],
  'meni-olib-ket-cheksiz-gacha': ['Aksyon', 'Fantezi', 'Sarguzasht'],
  'global-muzlash-qiyomatga-bunker-tayyorladim': ['Dahshat', 'Fantezi', 'Aksyon'],
};

export const mockMangas = mangalabRaw.map((m, idx) => {
  const cleanId = String(m.id).replace(/^\/+/, '').replace(/\/+$/, '') || `manga-${idx + 1}`;
  const customGenres = genreAssign[cleanId] || m.genres || ['Aksyon', 'Fantezi', 'Sarguzasht'];
  
  return {
    ...m,
    id: cleanId,
    genres: customGenres,
    priceCoins: idx % 3 === 0 ? 5 : 0, // early access coins needed for chapter
    isVip: idx % 4 === 0,
    rating: typeof m.rating === 'number' ? m.rating : parseFloat(m.rating) || 9.0,
    chapters: m.chapters || 45,
  };
});

export const getMangaById = (id) => {
  const clean = String(id).replace(/^\/+/, '').replace(/\/+$/, '');
  return mockMangas.find((m) => m.id === clean || String(m.id) === clean);
};

export const getTrending = () => mockMangas.filter((m) => m.isTrending).slice(0, 8);
export const getHot = () => mockMangas.filter((m) => m.isHot).slice(0, 8);
export const getVipMangas = () => mockMangas.filter((m) => m.isVip).slice(0, 8);

export const generateChapters = (count) =>
  Array.from({ length: Math.min(count, 40) }, (_, i) => {
    const num = count - i;
    const isLocked = i < 3; // Latest 3 chapters are locked (require Coins or VIP)
    return {
      id: num,
      number: num,
      title: `${num}-bob`,
      date: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toLocaleDateString('uz'),
      views: Math.floor(Math.random() * 40000) + 3000,
      isLocked,
      coinPrice: isLocked ? 3 : 0,
    };
  });
