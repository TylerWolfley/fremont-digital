import { copyFile, cp, mkdir, writeFile, readdir, access, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage } from '../src/pages/home.mjs';
import { servicePage } from '../src/pages/service.mjs';
import { contactPage } from '../src/pages/contact.mjs';
import { sitePages } from '../src/data/pages.mjs';
import { serviceGroups } from '../src/data/services.mjs';
import { publicationConfig } from '../src/config/publication.mjs';
import { contactConfig } from '../src/config/contact.mjs';
import { notFoundPage } from '../src/pages/not-found.mjs';
import { escape } from '../src/components/html.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const release = process.argv.includes('--release');
// Validate before writing any output, so a missing address cannot change a review.
const publication = publicationConfig({ release, siteUrl: process.env.SITE_URL });
const contact = contactConfig({ endpoint: release ? process.env.CONTACT_ENDPOINT : '' });
// Review builds never send. Releases use the saved public endpoint (or an override).
// An unconfigured release retains preview behavior and direct contact links.
const out = resolve(root, release ? 'release' : 'dist');
if (release) await cp(resolve(root, 'dist/assets'), resolve(out, 'assets'), { recursive: true });
await copyFile(resolve(out, 'assets/favicons/fd-v2.ico'), resolve(out, 'favicon.ico'));
const ids = new Set();
for (const group of serviceGroups) {
  for (const item of [group, ...group.services]) {
    if (!/^[a-z][a-z0-9-]*$/.test(item.id) || ids.has(item.id)) throw new Error(`Invalid or duplicate service ID: ${item.id}`);
    ids.add(item.id);
  }
}

for (const folder of ['styles', 'scripts']) {
  await mkdir(resolve(out, folder), { recursive: true });
  for (const name of await readdir(resolve(root, 'src', folder))) {
    await copyFile(resolve(root, 'src', folder, name), resolve(out, folder, name));
  }
}
const pages = new Map(sitePages.map(page => [page.path, page.id === 'home' ? homePage({ ...publication, ...contact }) : page.id === 'contact' ? contactPage({ ...publication, ...contact }) : servicePage(page.id, { ...publication, ...contact })]));
for (const [path, html] of pages) {
  const destination = resolve(out, '.' + path, 'index.html');
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}
for (const [path, html] of pages) {
  const sectionIds = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(sectionIds).size !== sectionIds.length) throw new Error(`Duplicate HTML IDs: ${path}`);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    if (!sectionIds.includes(match[1])) throw new Error(`Missing section target: ${path}#${match[1]}`);
  }
  // Check navigation and assets against the complete generated site.
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
    const target = new URL(match[1].replaceAll('&amp;', '&'), 'https://example.invalid');
    if (pages.has(target.pathname)) {
      if (target.hash && !pages.get(target.pathname).includes(`id="${target.hash.slice(1)}"`)) throw new Error(`Missing destination: ${match[1]}`);
    } else await access(resolve(out, '.' + target.pathname));
  }
}
for (const name of await readdir(resolve(out, 'styles'))) {
  const css = await readFile(resolve(out, 'styles', name), 'utf8');
  for (const match of css.matchAll(/url\(['"]?(\/[^'"\)]+)['"]?\)/g)) await access(resolve(out, '.' + match[1]));
}
await writeFile(resolve(out, '404.html'), notFoundPage());
await writeFile(resolve(out, 'robots.txt'), release
  ? `User-agent: *\nAllow: /\nSitemap: ${publication.siteUrl}sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n');
if (release) {
  await writeFile(resolve(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitePages.map(page => `<url><loc>${escape(new URL(page.path, publication.siteUrl).href)}</loc></url>`).join('')}</urlset>\n`);
}
console.log(`Built ${release ? 'release' : 'review'} site: ${pages.size} pages, ${serviceGroups.length} service groups, ${ids.size-serviceGroups.length} current services.`);
