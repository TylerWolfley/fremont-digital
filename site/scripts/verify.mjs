// Regression checks for publication settings and the site's core contact/navigation paths.
// Browser visual and interaction testing is a separate launch requirement.
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage } from '../src/pages/home.mjs';
import { business } from '../src/data/business.mjs';
import { serviceGroups } from '../src/data/services.mjs';
import { publicationConfig } from '../src/config/publication.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
assert.equal(html, homePage(), 'Rebuild before running checks.');
assert.equal(business.location, 'Fremont County, Wyoming');
assert(!html.includes('Colorado'));
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.match(html, /name="robots" content="noindex, nofollow"/);
assert(!html.includes('rel="canonical"'), 'Review pages must not invent a public address.');
for (const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) await access(resolve(root, 'dist', '.' + match[1]));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'HTML IDs must be unique.');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]), `Missing target: ${match[1]}`);
const inquiryCounts = new Map();
for (const match of html.matchAll(/<a[^>]+href="([^"]+)"[^>]+aria-label="Email about [^"]+"/g)) {
  const url = new URL(match[1].replaceAll('&amp;', '&'));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, business.email);
  const subject = url.searchParams.get('subject');
  inquiryCounts.set(subject, (inquiryCounts.get(subject) || 0) + 1);
}
const services = serviceGroups.flatMap(group => group.services);
assert.equal((html.match(/class="service-card"/g) || []).length, services.length);
assert(!html.includes('service-board') && !html.includes('landscape__'), 'Rejected layout elements must not return.');
assert.match(html, /data-search-form role="search"/);
assert.match(html, /<dialog[^>]+aria-labelledby="inquiry-title"/);
assert.equal(inquiryCounts.size, services.length);
for (const service of services) assert.equal(inquiryCounts.get(`Fremont Digital inquiry: ${service.name}`), 1);
assert(!html.includes('Phone resale') && !html.includes('Security &amp; Installation'));
assert.match(await readFile(resolve(root, 'dist/robots.txt'), 'utf8'), /Disallow: \/\n/);
assert.match(await readFile(resolve(root, 'dist/404.html'), 'utf8'), /Page not found/);

// Use a reserved test origin only in memory; never write it into a deployment.
assert.throws(() => publicationConfig({ release: true }), /SITE_URL/);
for (const siteUrl of ['http://example.invalid', 'https://example.invalid/subpath', 'https://example.invalid/?x=1', 'https://name:password@example.invalid']) {
  assert.throws(() => publicationConfig({ release: true, siteUrl }));
}
const config = publicationConfig({ release: true, siteUrl: 'https://example.invalid' });
const release = homePage(config);
assert.match(release, /name="robots" content="index, follow"/);
assert.match(release, /rel="canonical" href="https:\/\/example.invalid\/"/);
assert.match(release, /property="og:image" content="https:\/\/example.invalid\/assets\/favicons\/favicon-512.png"/);
const organization = JSON.parse(release.match(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/)[1]);
assert.equal(organization.areaServed.name, business.location);
assert.equal(organization.email, business.email);
assert(!('address' in organization) && !('telephone' in organization));
assert.match(homePage({ ...config, headerOnly: true }), /name="robots" content="noindex, nofollow"/);

console.log('Passed: Wyoming location, all service inquiries, assets, publication settings, structured data, catalog markup, and inquiry accessibility.');
