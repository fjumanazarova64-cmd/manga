import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scrapePage(page = 1) {
  const url = page === 1 ? 'https://mangalab.uz/browse/' : `https://mangalab.uz/browse/?page=${page}`;
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'uz,ru;q=0.9,en;q=0.8',
      },
    });

    if (!res.ok) {
      console.log(`Failed page ${page}: status ${res.status}`);
      return [];
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const results = [];

    // Find all manga cards
    $('[data-browse-card-title]').each((i, el) => {
      const titleElem = $(el);
      const title = titleElem.text().trim();
      const parentLink = titleElem.closest('a');
      const href = parentLink.attr('href') || '';

      const container = parentLink.length ? parentLink : titleElem.closest('article, div, li');
      const imgElem = container.find('img').first();
      let cover = imgElem.attr('src') || imgElem.attr('data-src') || imgElem.attr('srcset') || '';

      if (cover.includes(' ')) {
        cover = cover.split(' ')[0];
      }
      if (cover && !cover.startsWith('http')) {
        cover = `https://mangalab.uz${cover.startsWith('/') ? '' : '/'}${cover}`;
      }

      // Badges, rating, chapters
      let rating = '9.0';
      let chapters = 50;
      let status = 'ongoing';
      let type = 'Manhwa';

      container.find('span, div').each((_, span) => {
        const text = $(span).text().trim();
        if (text.includes('★') || text.match(/^\d\.\d+$/)) {
          rating = text.replace(/[^0-9.]/g, '') || rating;
        }
        if (text.toLowerCase().includes('bob')) {
          const num = parseInt(text.replace(/[^0-9]/g, ''));
          if (num) chapters = num;
        }
        if (text.toLowerCase().includes('tugallangan')) {
          status = 'completed';
        }
        if (['Manga', 'Manhwa', 'Manhua', 'Komiks'].includes(text)) {
          type = text;
        }
      });

      const id = href.replace(/^\/manga\//, '').replace(/\/$/, '') || `mangalab-${page}-${i + 1}`;

      if (title) {
        results.push({
          id,
          title,
          titleEn: title,
          titleRu: title,
          url: href ? (href.startsWith('http') ? href : `https://mangalab.uz${href}`) : '',
          cover: cover || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
          rating: parseFloat(rating) || 8.9,
          views: Math.floor(Math.random() * 300000) + 15000,
          chapters: chapters || Math.floor(Math.random() * 80) + 20,
          status,
          type,
          genres: ['Aksyon', 'Fantezi', 'Sarguzasht', 'Isekai'],
          author: 'MangaLab Studio',
          synopsis: `${title} - MangaLab platformasidan olingan o'zbek tilidagi ajoyib ${type}. Eng so'nggi boblar va yuqori sifatli tarjima.`,
          isHot: i < 3,
          isTrending: i < 6,
          isNew: i % 2 === 0,
          source: 'mangalab.uz',
        });
      }
    });

    console.log(`Page ${page} parsed: ${results.length} items`);
    return results;
  } catch (err) {
    console.error(`Page ${page} error:`, err.message);
    return [];
  }
}

async function run() {
  const allMangas = [];
  const visitedIds = new Set();

  // Scrape first 4 pages of browse
  for (let p = 1; p <= 4; p++) {
    const pageItems = await scrapePage(p);
    for (const item of pageItems) {
      if (!visitedIds.has(item.id)) {
        visitedIds.add(item.id);
        allMangas.push(item);
      }
    }
    if (pageItems.length === 0) break;
  }

  console.log(`Total unique scraped from MangaLab: ${allMangas.length}`);

  if (allMangas.length > 0) {
    const outPath = path.join(__dirname, 'mangalab_dump.json');
    fs.writeFileSync(outPath, JSON.stringify(allMangas, null, 2), 'utf-8');
    console.log(`Saved to ${outPath}`);

    // Also update frontend mangaData.js and backend/manga_db.json
    const frontendDataPath = path.join(__dirname, '../frontend/src/data/mangalabData.json');
    fs.writeFileSync(frontendDataPath, JSON.stringify(allMangas, null, 2), 'utf-8');
    console.log(`Updated frontend data: ${frontendDataPath}`);
  }
}

run();
