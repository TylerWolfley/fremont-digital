import { copyFile, cp, mkdir, writeFile, readdir, access, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage } from '../src/pages/home.mjs';
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
const html = homePage({ ...publication, ...contact });
const sectionIds = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(sectionIds).size !== sectionIds.length) throw new Error('Duplicate HTML IDs.');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  if (!sectionIds.includes(match[1])) throw new Error(`Missing section target: ${match[1]}`);
}
// Catch broken local asset references before any preview is served.
for (const match of html.matchAll(/(?:href|src)="(\/[^"#]+)"/g)) {
  await access(resolve(out, '.' + match[1]));
}
for (const name of await readdir(resolve(out, 'styles'))) {
  const css = await readFile(resolve(out, 'styles', name), 'utf8');
  for (const match of css.matchAll(/url\(['"]?(\/[^'"\)]+)['"]?\)/g)) await access(resolve(out, '.' + match[1]));
}
await writeFile(resolve(out, 'index.html'), html);
await writeFile(resolve(out, '404.html'), notFoundPage());
await writeFile(resolve(out, 'robots.txt'), release
  ? `User-agent: *\nAllow: /\nSitemap: ${publication.siteUrl}sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n');
if (release) {
  await writeFile(resolve(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(publication.siteUrl)}</loc></url></urlset>\n`);
}
console.log(`Built ${release ? 'release' : 'review'} site: ${serviceGroups.length} service groups, ${ids.size-serviceGroups.length} current services.`);
