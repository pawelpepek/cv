// Minimal static server for the prerendered build (no extra dependencies).
// Mimics Firebase Hosting: serves files from dist/cv/browser, prefers the
// prerendered <route>/index.html, and falls back to the SPA rewrite.
// Used as a Playwright webServer (see playwright.config.ts); builds first
// when dist is missing so `npm run e2e` works on a fresh checkout.

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/cv/browser', import.meta.url));
const port = 4201;

if (!existsSync(join(root, 'index.html'))) {
  console.log('dist/cv/browser missing — running `npm run build` first…');
  execSync('npm run build', { stdio: 'inherit' });
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);

  const candidates = [
    join(root, normalize(urlPath)),
    join(root, normalize(urlPath), 'index.html'),
    join(root, 'index.html'), // SPA rewrite fallback, as in firebase.json
  ];

  const file = candidates.find(c => c.startsWith(root) && extname(c) !== '' && existsSync(c));

  if (!file) {
    res.writeHead(404).end('Not found');
    return;
  }

  res.writeHead(200, { 'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`Serving prerendered build at http://localhost:${port}`));
