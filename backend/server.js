import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DUMP_FILE = path.join(__dirname, 'mangalab_dump.json');

app.use(cors());
app.use(express.json());

let mangaDatabase = [];

function loadDatabase() {
  try {
    if (fs.existsSync(DUMP_FILE)) {
      const data = fs.readFileSync(DUMP_FILE, 'utf-8');
      mangaDatabase = JSON.parse(data);
      console.log(`[MangaLab DB] ${mangaDatabase.length} ta real manhwa/manga yuklandi!`);
    } else {
      console.log('[MangaLab DB] Dump fayli topilmadi');
    }
  } catch (err) {
    console.error('[MangaLab DB] Xatolik:', err);
  }
}

// Health check for Render
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), count: mangaDatabase.length });
});

// REST Endpoints
app.get('/api/manga', (req, res) => {
  const { genre, status, search, sort } = req.query;
  let list = [...mangaDatabase];

  if (search) {
    const q = search.toLowerCase();
    list = list.filter((m) => m.title.toLowerCase().includes(q));
  }

  if (genre && genre !== 'all') {
    list = list.filter((m) => m.genres && m.genres.includes(genre));
  }

  if (status && status !== 'all') {
    list = list.filter((m) => m.status === status);
  }

  if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  else if (sort === 'views') list.sort((a, b) => b.views - a.views);

  res.json({ success: true, count: list.length, data: list });
});

app.get('/api/manga/:id', (req, res) => {
  const cleanId = req.params.id.replace(/^\/+/, '').replace(/\/+$/, '');
  const manga = mangaDatabase.find(
    (m) => String(m.id).replace(/^\/+/, '').replace(/\/+$/, '') === cleanId
  );
  if (!manga) return res.status(404).json({ success: false, message: 'Manga topilmadi' });
  res.json({ success: true, data: manga });
});

// Monetization endpoint: simulate payments (Click, Payme, Uzum)
app.post('/api/payments/checkout', (req, res) => {
  const { amount, method, type, userId } = req.body;
  console.log(`[Payment Checkout] Method: ${method}, Amount: ${amount}, Type: ${type}`);
  res.json({
    success: true,
    transactionId: `TX_${Date.now()}`,
    status: 'COMPLETED',
    message: `${amount} so'mlik to'lov ${method} orqali qabul qilindi`,
  });
});

// Serve frontend build in production on Render
const frontendDist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDist)) {
  console.log(`[Production] Serving frontend static files from: ${frontendDist}`);
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

loadDatabase();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⛩️ MangaUz Server running on port ${PORT}`);
});
