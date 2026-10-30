// Real DOM regressions with mocked transport. No browser or external submissions.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { contactPage } from '../src/pages/contact.mjs';
import { servicePage } from '../src/pages/service.mjs';
import { sitePages } from '../src/data/pages.mjs';
import { serviceGuides } from '../src/data/service-guides.mjs';
const require = createRequire(import.meta.url);
const moduleIndex = process.argv.indexOf('--jsdom-module');
const { JSDOM } = require(moduleIndex >= 0 ? process.argv[moduleIndex + 1] : 'jsdom');
const scripts = await Promise.all(['header.js', 'inquiry-tools.js', 'home.js'].map(name => readFile(new URL(`../src/scripts/${name}`, import.meta.url), 'utf8')));
const expectedLabels = Object.values(serviceGuides).map(guide => guide.label);
function mount(endpoint = '', path = '/contact/') {
  const dom = new JSDOM(contactPage({ contactEndpoint: endpoint }), { url: new URL(path, 'https://example.invalid/').href, runScripts: 'outside-only' });
  const w = dom.window;
  const d = w.document;
  w.matchMedia = () => ({ matches: false, addEventListener() {} });
  const scrollTargets = [];
  w.HTMLElement.prototype.scrollIntoView = function() { scrollTargets.push(this); };
  w.AbortSignal = AbortSignal;
  w.fetch = async () => { throw new Error('Unexpected external request'); };
  scripts.forEach(script => w.eval(script));
  // jsdom cannot navigate documents; actual page navigation is checked in browser QA.
  d.addEventListener('click', event => { if (event.target.closest('a')?.getAttribute('href')?.startsWith('/')) event.preventDefault(); });
  const form = d.querySelector('form');
  const field = name => form.elements.namedItem(name);
  const fire = (el, type) => el.dispatchEvent(new w.Event(type, { bubbles: true, cancelable: true }));
  const settle = () => new Promise(resolve => setTimeout(resolve, 0));
  return { dom, w, d, form, field, fire, settle, scrollTargets, labels: () => [...field('category').options].map(option => option.textContent), status: d.querySelector('[data-form-status]') };
}
const ui = mount();
assert.deepEqual(ui.labels(), expectedLabels);
assert(!ui.form.hidden);
assert.equal(ui.d.querySelectorAll('[role="tab"]').length, 0);
ui.field('category').value = 'repairs-tech'; ui.fire(ui.field('category'), 'change');
ui.field('message').value = 'My phone screen is broken.';
ui.field('category').value = 'web-digital'; ui.fire(ui.field('category'), 'change');
assert.equal(ui.field('message').value, '');
ui.field('message').value = 'I need a website for my business.';
ui.field('category').value = 'repairs-tech'; ui.fire(ui.field('category'), 'change');
assert.equal(ui.field('message').value, 'My phone screen is broken.');
for (const id of Object.keys(serviceGuides)) {
  ui.field('category').value = id; ui.fire(ui.field('category'), 'change');
  assert.deepEqual(ui.labels(), expectedLabels);
  assert.equal(ui.d.querySelector('label[for="inquiry-context"]').textContent, `${serviceGuides[id].contextLabel} (optional)`);
  assert.equal(ui.d.querySelector('label[for="inquiry-timing"]').textContent, `${serviceGuides[id].timingLabel} (optional)`);
}
ui.field('contact').value = '3075550123';
ui.field('method').value = 'email'; ui.fire(ui.field('method'), 'change');
ui.field('contact').value = 'example@example.invalid';
ui.field('method').value = 'phone'; ui.fire(ui.field('method'), 'change');
assert.equal(ui.field('contact').value, '3075550123');
ui.field('method').value = 'email'; ui.fire(ui.field('method'), 'change');
assert.equal(ui.field('contact').value, 'example@example.invalid');
ui.fire(ui.form, 'submit');
assert.equal(ui.d.activeElement.id, 'inquiry-name');
assert.equal(ui.field('name').getAttribute('aria-describedby'), 'error-name');
ui.field('message').value = ''; ui.fire(ui.form, 'submit');
assert.equal(ui.field('message').getAttribute('aria-describedby'), 'message-hint error-message');
ui.field('name').value = 'DOM test'; ui.field('message').value = 'This is a local test only.';
ui.fire(ui.form, 'submit');
assert.match(ui.status.textContent, /Nothing has been sent/);
assert(!ui.d.querySelector('[data-request-review]').hidden);
assert.equal(ui.field('message').getAttribute('aria-describedby'), 'message-hint');
assert(!ui.field('name').hasAttribute('aria-describedby'));
const menu = ui.d.querySelector('[data-mobile-menu]');
menu.open = true;
const menuSummary = menu.querySelector('summary'); menuSummary.focus();
menuSummary.dispatchEvent(new ui.w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert.equal(menu.open, false); assert.equal(ui.d.activeElement, menuSummary);
menuSummary.blur(); menu.open = true;
menuSummary.dispatchEvent(new ui.w.FocusEvent('focusout', { bubbles: true, relatedTarget: null }));
await ui.settle(); assert(menu.open, 'An intermediate pointer-focus state must leave links clickable.');
const menuLink = menu.querySelector('a[href="/automation/"]');
menuSummary.dispatchEvent(new ui.w.FocusEvent('focusout', { bubbles: true, relatedTarget: menuLink }));
await ui.settle(); assert(menu.open);
menuLink.click(); assert(!menu.open);
menu.open = true;
menuSummary.dispatchEvent(new ui.w.FocusEvent('focusout', { bubbles: true, relatedTarget: ui.field('name') }));
assert(!menu.open);
// Follow the URLs rendered by service pages into the actual contact document.
for (const page of sitePages.filter(page => page.category)) {
  const content = new JSDOM(servicePage(page.id));
  for (const link of content.window.document.querySelectorAll('a[href^="/contact/?"]')) {
    const destination = mount('', link.getAttribute('href'));
    assert.equal(destination.field('category').value, page.category);
    assert.equal(destination.d.activeElement, destination.field('name'));
    assert.equal(destination.scrollTargets.at(-1), destination.form);
    const params = new URL(link.getAttribute('href'), 'https://example.invalid').searchParams;
    if (params.get('service')) assert.equal(destination.field('service').value, params.get('service'));
    if (params.get('screen')) assert.equal(destination.field('screen_option').value, params.get('screen'));
    destination.dom.window.close();
  }
  content.window.close();
}
const invalid = mount('', '/contact/?category=web-digital&service=screen-repair&screen=genuine');
assert.equal(invalid.field('service').value, '');
assert(invalid.d.querySelector('[data-repair-fields]').hidden);
invalid.dom.window.close();
const repair = mount('https://formspree.io/f/testonly', '/contact/?category=repairs-tech&service=screen-repair&screen=genuine');
assert(!repair.d.querySelector('[data-repair-fields]').hidden);
assert(repair.field('device_model').required);
for (const [name, value] of Object.entries({ name: 'Quote test', contact: '3075550123', message: 'Cracked display, touch still works.' })) repair.field(name).value = value;
repair.fire(repair.form, 'submit'); await repair.settle();
assert.equal(repair.d.activeElement.id, 'inquiry-device-model');
assert.equal(repair.field('device_model').getAttribute('aria-describedby'), 'device-model-hint error-device_model');
repair.field('device_model').value = 'iPhone 13';
let quotePayload;
repair.w.fetch = async (_, options) => { quotePayload = JSON.parse(options.body); return Response.json({ ok: true }); };
repair.fire(repair.form, 'submit'); await repair.settle();
assert.equal(quotePayload.device_model, 'iPhone 13');
assert.equal(quotePayload.screen_option, 'genuine');
assert.equal(quotePayload.service, 'screen-repair');
assert(repair.d.querySelector('[data-repair-fields]').hidden);
assert(!repair.field('device_model').required);
repair.dom.window.close();

const live = mount('https://formspree.io/f/testonly');
const values = { name: 'DOM test', category: 'general', method: 'email', contact: 'example@example.invalid', message: 'This is a local test, never sent.' };
function populate() { Object.entries(values).forEach(([name, value]) => { live.field(name).value = value; }); }
populate();
let attempts = [];
live.w.fetch = async (url, options) => { attempts.push({ url, options }); return Response.json({ errors: [{ field: 'email', message: 'Invalid email' }] }, { status: 422 }); };
live.fire(live.form, 'submit'); await live.settle();
assert.equal(live.field('message').value, values.message);
assert.equal(live.d.activeElement.id, 'inquiry-contact', 'Server validation must focus the enabled input.');
assert(!live.field('contact').disabled);
const body = JSON.parse(attempts[0].options.body);
assert.equal(body.email, values.contact); assert.equal(body.reply_by, 'email'); assert.equal(body._gotcha, '');
assert.equal(attempts[0].options.headers.Accept, 'application/json');
assert(!('Idempotency-Key' in attempts[0].options.headers), 'Do not send custom provider headers to Formspree.');
for (const response of [() => Response.json({}, { status: 200 }), () => Response.json({}, { status: 429 }), () => Promise.reject(new TypeError('Network error'))]) {
  live.w.fetch = async () => response();
  live.fire(live.form, 'submit'); await live.settle();
  assert.equal(live.field('message').value, values.message);
  assert.equal(live.status.dataset.state, 'error');
  assert(!live.d.querySelector('[data-submit]').disabled);
}
let finish;
let count = 0;
live.w.fetch = () => { count++; return new Promise(resolve => { finish = resolve; }); };
live.fire(live.form, 'submit'); live.fire(live.form, 'submit');
assert.equal(count, 1); assert(live.field('message').disabled);
finish(Response.json({ ok: true })); await live.settle();
assert.equal(live.field('message').value, ''); assert.equal(live.status.dataset.state, 'success');
assert.deepEqual(live.labels(), expectedLabels);
assert(!live.d.querySelector('[data-submit]').disabled);
populate(); live.field('method').value = 'phone'; live.field('contact').value = '3075550123';
live.w.fetch = async (_, options) => { const payload = JSON.parse(options.body); assert.equal(payload.phone, '3075550123'); assert(!('email' in payload)); return Response.json({ ok: true }); };
live.fire(live.form, 'submit'); await live.settle();
assert.equal(live.status.dataset.state, 'success');
// Every control has an associated label, and references resolve in the actual DOM.
for (const el of ui.d.querySelectorAll('input:not([type="hidden"]), select, textarea')) assert(el.labels.length > 0, `Unlabelled input: ${el.id}`);
for (const el of ui.d.querySelectorAll('[aria-controls], [aria-labelledby], [aria-describedby]')) {
  for (const name of ['aria-controls','aria-labelledby','aria-describedby']) for (const id of (el.getAttribute(name) || '').split(' ').filter(Boolean)) assert(ui.d.getElementById(id), `Missing ARIA target ${id}`);
}
ui.dom.window.close(); live.dom.window.close();
console.log('Passed real-DOM regressions: routed inquiries, repair quotes, drafts, menu focus, labels, validation, delivery failure, duplicate-submit guard, and success reset. No external requests.');
