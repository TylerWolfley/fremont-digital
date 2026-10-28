// Regression checks for publication settings and the site's core contact/navigation paths.
// Browser visual and interaction testing is a separate launch requirement.
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
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
assert.equal(inquiryCounts.size, services.length);
for (const service of services) assert.equal(inquiryCounts.get(`Fremont Digital inquiry: ${service.name}`), 3);
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

// Exercise the enhancement paths without presenting these as browser QA.
const script = await readFile(resolve(root, 'src/scripts/home.js'), 'utf8');
async function interactionCheck(clipboardMode) {
  let focused, scrolled, copied;
  const categories = serviceGroups.map(group => ({ id: group.id, open: false, querySelector: () => ({ focus: () => { focused = group.id; } }), scrollIntoView: () => { scrolled = group.id; } }));
  const links = [...serviceGroups.map(group => '#' + group.id), '#contact'].map(href => ({ getAttribute: () => href, addEventListener(type, fn) { this[type] = fn; } }));
  const button = { hidden: true, dataset: { copyEmail: business.email }, addEventListener(type, fn) { this[type] = fn; } };
  const status = { textContent: '' };
  const events = {};
  const window = { location: { hash: '#business-tech' }, addEventListener: (type, fn) => { events[type] = fn; } };
  const navigator = clipboardMode === 'unavailable' ? {} : { clipboard: { writeText: async value => { if (clipboardMode === 'denied') throw new Error('Denied'); copied = value; } } };
  vm.runInNewContext(script, { window, navigator, requestAnimationFrame: fn => fn(), document: { querySelectorAll: selector => selector === '.service-category' ? categories : links, querySelector: selector => selector === '[data-copy-email]' ? button : status } });
  assert.equal(scrolled, 'business-tech');
  links[3].click();
  assert.equal(focused, 'photo-media');
  assert.deepEqual(categories.filter(item => item.open).map(item => item.id), ['photo-media']);
  window.location.hash = '#repairs-tech'; events.hashchange();
  assert.equal(scrolled, 'repairs-tech');
  links[4].click();
  assert.equal(categories.find(item => item.open).id, 'repairs-tech');
  if (clipboardMode === 'unavailable') assert.equal(button.hidden, true);
  else {
    assert.equal(button.hidden, false);
    await button.click();
    if (clipboardMode === 'denied') assert.match(status.textContent, /manually/);
    else { assert.equal(copied, business.email); assert.equal(status.textContent, 'Email address copied.'); }
  }
}
for (const mode of ['success', 'denied', 'unavailable']) await interactionCheck(mode);
console.log('Passed: location, section links, inquiry destinations, assets, publication settings, structured data, category navigation, and clipboard success/failure handling. Browser QA remains separate.');
