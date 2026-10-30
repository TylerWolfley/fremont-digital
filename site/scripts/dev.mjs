import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { watch } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sitePages } from '../src/data/pages.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.png':'image/png', '.webp':'image/webp', '.ico':'image/x-icon', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.ttf':'font/ttf' };
function build() {
  for (const script of ['build.mjs', 'build-review.mjs']) {
    const result = spawnSync(process.execPath, [resolve(root, 'scripts', script)], { stdio: 'inherit' });
    if (result.status !== 0) throw new Error(`Build failed: ${script}`);
  }
}
build();
const server = http.createServer(async (request, response) => {
  try {
    if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    const pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
    if (sitePages.some(page => page.path === pathname + '/')) { response.writeHead(301, { Location: pathname + '/' + new URL(request.url, `http://127.0.0.1:${port}`).search }); response.end(); return; }
    let file;
    if (pathname === '/review/header') file = resolve(root, '../reviews/02-header/offline-review.html');
    else if (pathname === '/review/layout') file = resolve(root, '../reviews/03-layout/review.html');
    else {
      file = resolve(dist, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
      if (!file.startsWith(dist+sep)) { response.writeHead(403); response.end(); return; }
    }
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type':types[extname(file)]||'application/octet-stream', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404, { 'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'no-store' });
    response.end(request.method === 'HEAD' ? undefined : await readFile(resolve(dist, '404.html')));
  }
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/review/layout`));
let pending;
watch(resolve(root,'src'),{recursive:true},()=>{
  clearTimeout(pending);
  pending=setTimeout(()=>{try{build()}catch(error){console.error(error.message)}},120);
});
