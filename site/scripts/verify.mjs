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
import { contactConfig } from '../src/config/contact.mjs';

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
const services = serviceGroups.flatMap(group => group.services);
assert.equal((html.match(/class="service-detail"/g) || []).length, services.length);
assert(!html.includes('service-board') && !html.includes('landscape__'), 'Rejected layout elements must not return.');
assert(!html.includes('data-search-form') && !html.includes('catalog-sidebar'));
assert.match(html, /data-inquiry-form data-endpoint=""/);
assert.equal((html.match(/data-category-tab=/g) || []).length, 4);
for (const group of serviceGroups) assert(html.includes(`id="${group.id}"`));
for (const service of services) assert(html.includes(`data-request-service="${service.id}"`));
assert.equal(business.phoneE164, '+13073494694');
assert.equal(business.phone, '(307) 349-4694');
assert((html.match(/href="tel:\+13073494694"/g) || []).length >= 4);
assert(html.includes('All of Fremont County, Wyoming.') && html.includes('Remote help') && html.includes('arranged device drop-off'));
assert(html.includes('Preview:') && !html.includes('type="submit" data-submit>Send request'));
for (const endpoint of ['http://example.invalid/api/inquiry', 'https://example.invalid/?x=1', 'https://a:b@example.invalid/api/inquiry', 'https://example.invalid/elsewhere']) assert.throws(() => contactConfig({ endpoint }));
const contact = contactConfig({ endpoint: 'https://example.invalid/api/inquiry' });
const connected = homePage(contact);
assert(connected.includes('data-endpoint="https://example.invalid/api/inquiry"') && connected.includes('data-submit>Send request'));
assert(!connected.includes('Preview:'));
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
assert(!('address' in organization));
assert.equal(organization.telephone, business.phoneE164);
assert.match(homePage({ ...config, headerOnly: true }), /name="robots" content="noindex, nofollow"/);

console.log('Passed: countywide Wyoming copy, phone links, category details, form configuration, anchors, assets, and publication metadata.');
