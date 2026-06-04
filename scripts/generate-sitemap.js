import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const DIST_DIR = path.resolve(__dirname, '../dist');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const DIST_SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const BASE_URL = 'https://hungrymandesigns.com';

function generateSitemap() {
  try {
    const files = fs.readdirSync(PUBLIC_DIR);
    
    // Filter for HTML pages, excluding index.html and Google Site Verification
    const pages = files
      .filter(file => file.endsWith('.html') && file !== 'index.html' && !file.startsWith('google'))
      .map(file => file.replace('.html', ''));
    
    // All clean URLs to include
    const urls = ['', ...pages];
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}/${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');
    console.log(`✓ Sitemap successfully generated at: ${SITEMAP_PATH}`);
    
    if (fs.existsSync(DIST_DIR)) {
      fs.writeFileSync(DIST_SITEMAP_PATH, sitemapContent, 'utf8');
      console.log(`✓ Sitemap successfully copied to: ${DIST_SITEMAP_PATH}`);
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
