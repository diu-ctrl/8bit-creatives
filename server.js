/**
 * 8Bit Creatives — Local Development & Creator Onboarding Server
 * Native Node.js server with static file serving and /api/add-creator endpoint.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. API Endpoint: Add Creator
  if (req.method === 'POST' && req.url === '/api/add-creator') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { creator, imageBase64, filename } = payload;

        if (!creator || !creator.name) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Creator name is required' }));
          return;
        }

        // A. Save Image File to assets/creators/cinematic/
        const targetFilename = filename || `${creator.id || 'creator'}.png`;
        const cinematicDir = path.join(ROOT, 'assets', 'creators', 'cinematic');
        if (!fs.existsSync(cinematicDir)) {
          fs.mkdirSync(cinematicDir, { recursive: true });
        }

        if (imageBase64 && imageBase64.startsWith('data:image')) {
          const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          const destPath = path.join(cinematicDir, targetFilename);
          fs.writeFileSync(destPath, buffer);
          console.log(`[Roster API] Saved image: ${destPath}`);
        }

        // B. Update creators-data.json
        const jsonPath = path.join(ROOT, 'creators-data.json');
        let list = [];
        if (fs.existsSync(jsonPath)) {
          try {
            list = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
          } catch (e) {
            list = [];
          }
        }

        // Append or replace, and keep sorted by reach descending
        list = list.filter(c => (c.id || '').toLowerCase() !== (creator.id || '').toLowerCase());
        list.push(creator);

        function parseNum(str) {
          if (!str) return 0;
          const s = str.toString().toUpperCase().replace(/[^0-9.KM]/g, '');
          if (s.includes('M')) return Math.round(parseFloat(s) * 1000000);
          if (s.includes('K')) return Math.round(parseFloat(s) * 1000);
          return Math.round(parseFloat(s)) || 0;
        }
        function getReachValue(c) {
          if (!c) return 0;
          const r = c.reach;
          if (r) {
            const s = r.toString().toUpperCase().replace(/[^0-9.KM]/g, '');
            let val = 0;
            if (s.includes('M')) val = parseFloat(s) * 1000000;
            else if (s.includes('K')) val = parseFloat(s) * 1000;
            else val = parseFloat(s) || 0;
            if (val > 0) return val;
          }
          return 0;
        }
        function getMaxPlatform(c) {
          const yt = parseNum(c.youtube && c.youtube.count);
          const ig = parseNum(c.instagram && c.instagram.count);
          const kick = parseNum(c.kick && c.kick.count);
          return Math.max(yt, ig, kick);
        }
        list.sort((a, b) => {
          const rA = getReachValue(a);
          const rB = getReachValue(b);
          if (rB !== rA) return rB - rA;
          const pB = getMaxPlatform(b);
          const pA = getMaxPlatform(a);
          if (pB !== pA) return pB - pA;
          return a.name.localeCompare(b.name);
        });

        fs.writeFileSync(jsonPath, JSON.stringify(list, null, 2), 'utf-8');
        console.log(`[Roster API] Updated creators-data.json (total: ${list.length})`);

        // C. Update scripts/creators-data.js
        const jsPath = path.join(ROOT, 'scripts', 'creators-data.js');
        const jsContent = `/**
 * 8Bit Creatives — Central Creator Database
 * Single Source of Truth for creators.html and index.html Coverflow
 */
(function() {
  window.INITIAL_CREATORS = ${JSON.stringify(list, null, 2)};

  /**
   * Helper function to get all creators:
   * Merges INITIAL_CREATORS with any newly added creators from localStorage.
   */
  window.get8BitCreators = function() {
    const list = [...window.INITIAL_CREATORS];
    try {
      const customStr = localStorage.getItem('8bit_creators_custom');
      if (customStr) {
        const custom = JSON.parse(customStr);
        if (Array.isArray(custom)) {
          const existing = new Set(list.map(c => (c.id || c.name || '').toLowerCase()));
          custom.forEach(c => {
            const key = (c.id || c.name || '').toLowerCase();
            if (!existing.has(key)) {
              list.push(c);
              existing.add(key);
            }
          });
        }
      }
    } catch (e) {
      console.warn('Could not parse 8bit_creators_custom from localStorage', e);
    }
    return list;
  };
})();
`;
        fs.writeFileSync(jsPath, jsContent, 'utf-8');
        console.log(`[Roster API] Updated scripts/creators-data.js`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: `Creator ${creator.name} published and synced to website!`,
          creator: creator,
          totalCreators: list.length
        }));
      } catch (err) {
        console.error('[Roster API Error]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 2. Static File Serving
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(ROOT, reqPath.replace(/^\//, ''));
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${reqPath}`);
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` 8Bit Creatives Server Running!          `);
  console.log(` Website:  http://localhost:${PORT}/      `);
  console.log(` Onboard:  http://localhost:${PORT}/add-creator.html `);
  console.log(`=========================================`);
});
