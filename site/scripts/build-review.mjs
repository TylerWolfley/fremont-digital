// Package both review stages with their assets. This does not change the site.
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage } from '../src/pages/home.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const mime = { '.webp':'image/webp', '.png':'image/png', '.ico':'image/x-icon', '.ttf':'font/ttf' };
const dataURL = async path => `data:${mime[extname(path)]};base64,${(await readFile(resolve(dist,'.'+path))).toString('base64')}`;
async function inlinePage(page) {
  // srcdoc otherwise resolves fragment links against the outer review file.
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe
  page = page.replace('<head>', '<head>\n  <base href="about:srcdoc">');
  page = page.replace(/\s*<link rel="preload"[^>]+>/g,'');
  for (const match of [...page.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)]) {
    let css = await readFile(resolve(dist,'.'+match[1]),'utf8');
    for (const asset of [...css.matchAll(/url\('([^']+)'\)/g)]) css = css.replace(asset[0], `url('${await dataURL(asset[1])}')`);
    page = page.replace(match[0], `<style>${css}</style>`);
  }
  for (const match of [...page.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)]) page = page.replaceAll(match[1], await dataURL(match[1]));
  const scripts = [];
  for (const match of [...page.matchAll(/<script src="([^"]+)" defer><\/script>/g)]) {
    scripts.push(await readFile(resolve(dist, '.' + match[1]), 'utf8'));
    page = page.replace(match[0], '');
  }
  page = page.replace('</body>', `${scripts.map(script => `<script>${script}</script>`).join('\n')}</body>`);
  page = page.replace('class="brand" href="/"','class="brand" href="#top"');
  return page;
}

const reviews = [
  { folder: '02-header', template: 'header.html', page: homePage({ headerOnly: true }) },
  { folder: '03-layout', template: 'layout.html', page: await readFile(resolve(dist, 'index.html'), 'utf8') },
];
for (const review of reviews) {
  const page = await inlinePage(review.page);
  const escaped = page.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  let shell = await readFile(resolve(root, 'src/reviews', review.template), 'utf8');
  const placeholder = 'data-preview-content';
  if (shell.split(placeholder).length !== 2) throw new Error(`Expected one preview placeholder in ${review.template}`);
  shell = shell.replace(placeholder, () => `srcdoc="${escaped}"`);
  shell = shell.replace('/assets/manrope-regular.ttf',await dataURL('/assets/manrope-regular.ttf'));
  shell = shell.replace('/assets/favicons/favicon.ico',await dataURL('/assets/favicons/favicon.ico'));
  // Both existing entry points must also work when opened directly with file://.
  // Keep templates in src so a preview can never load the filesystem root.
  for (const filename of ['review.html', 'offline-review.html']) {
    const destination = resolve(root, `../reviews/${review.folder}/${filename}`);
    await writeFile(destination, shell.replace(/[\t ]+$/gm, ''));
    console.log(`Created self-contained review: reviews/${review.folder}/${filename}`);
  }
}
