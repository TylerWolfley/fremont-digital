// Package the real header for offline review. This does not change the site.
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const mime = { '.webp':'image/webp', '.png':'image/png', '.ico':'image/x-icon', '.ttf':'font/ttf' };
const dataURL = async path => `data:${mime[extname(path)]};base64,${(await readFile(resolve(dist,'.'+path))).toString('base64')}`;
let page = await readFile(resolve(dist,'index.html'),'utf8');
page = page.replace(/\s*<link rel="preload"[^>]+>/g,'');
for (const match of [...page.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)]) {
  let css = await readFile(resolve(dist,'.'+match[1]),'utf8');
  for (const asset of [...css.matchAll(/url\('([^']+)'\)/g)]) css = css.replace(asset[0], `url('${await dataURL(asset[1])}')`);
  page = page.replace(match[0], `<style>${css}</style>`);
}
for (const match of [...page.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)]) page = page.replaceAll(match[1], await dataURL(match[1]));
page = page.replace('<script src="/scripts/header.js" defer></script>','');
page = page.replace('</body>',`<script>${await readFile(resolve(dist,'scripts/header.js'),'utf8')}</script></body>`);
page = page.replace('class="brand" href="/"','class="brand" href="#"');
const escaped = page.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
let shell = await readFile(resolve(root,'../reviews/02-header/review.html'),'utf8');
shell = shell.replace('src="/" title="Fremont Digital header preview"',`srcdoc="${escaped}" title="Fremont Digital header preview"`);
shell = shell.replace('/assets/manrope-regular.ttf',await dataURL('/assets/manrope-regular.ttf'));
shell = shell.replace('/assets/favicons/favicon.ico',await dataURL('/assets/favicons/favicon.ico'));
const destination = resolve(root,'../reviews/02-header/offline-review.html');
await writeFile(destination,shell.replace(/[\t ]+$/gm,''));
console.log('Created self-contained header review: reviews/02-header/offline-review.html');
