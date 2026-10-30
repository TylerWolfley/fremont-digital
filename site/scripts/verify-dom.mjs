// Real DOM regressions with mocked transport. No browser or external submissions.
// Run with jsdom installed, or --jsdom-module /absolute/path/to/jsdom.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { homePage } from '../src/pages/home.mjs';
import { serviceGuides } from '../src/data/service-guides.mjs';
const require = createRequire(import.meta.url);
const moduleIndex = process.argv.indexOf('--jsdom-module');
const { JSDOM } = require(moduleIndex >= 0 ? process.argv[moduleIndex + 1] : 'jsdom');
const scripts = await Promise.all(['header.js', 'inquiry-tools.js', 'home.js'].map(name => readFile(new URL(`../src/scripts/${name}`, import.meta.url), 'utf8')));
const expectedLabels = Object.values(serviceGuides).map(guide => guide.label);
function mount(endpoint = '') {
  const dom = new JSDOM(homePage({ contactEndpoint: endpoint }), { url: 'https://example.invalid/', runScripts: 'outside-only' });
  const w = dom.window;
  const d = w.document;
  w.matchMedia = () => ({ matches: false, addEventListener() {} });
  w.HTMLElement.prototype.scrollIntoView = function() {};
  w.AbortSignal = AbortSignal;
  w.fetch = async () => { throw new Error('Unexpected external request'); };
  scripts.forEach(script => w.eval(script));
  const form = d.querySelector('form');
  const field = name => form.elements.namedItem(name);
  const fire = (el, type) => el.dispatchEvent(new w.Event(type, { bubbles: true, cancelable: true }));
  const settle = () => new Promise(resolve => setTimeout(resolve, 0));
  return { dom, w, d, form, field, fire, settle, labels: () => [...field('category').options].map(option => option.textContent), status: d.querySelector('[data-form-status]') };
}
const ui = mount();
assert.deepEqual(ui.labels(), expectedLabels, 'Initialization must not overwrite option labels.');
assert(!ui.form.hidden);
assert.equal(ui.d.querySelectorAll('[role="tabpanel"]:not([hidden])').length, 1);
const tabs = [...ui.d.querySelectorAll('[role="tab"]')];
tabs[2].click();
assert.equal(ui.w.location.hash, '#repairs-tech');
assert.equal(tabs[2].getAttribute('aria-selected'), 'true');
tabs[2].dispatchEvent(new ui.w.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
assert.equal(ui.d.activeElement, tabs[3]);
ui.d.querySelector('[data-category-link="business-tech"]').click();
assert.equal(ui.d.activeElement.id, 'business-tech-heading');
const repair = ui.d.querySelector('[data-request-service="phone-repair"]');
const website = ui.d.querySelector('[data-request-service="website-builds"]');
repair.click();
assert.equal(ui.field('service').value, 'phone-repair');
ui.field('message').value = 'My phone screen is broken.';
website.click();
assert.equal(ui.field('message').value, '');
ui.field('message').value = 'I need a website for my business.';
repair.click();
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
ui.field('name').value = 'DOM test'; ui.field('message').value = 'This is a local test only.';
ui.fire(ui.form, 'submit');
assert.match(ui.status.textContent, /Nothing has been sent/);
assert(!ui.d.querySelector('[data-request-review]').hidden);
// Native menu remains usable; enhancement closes it and restores focus on Escape.
const menu = ui.d.querySelector('[data-mobile-menu]');
menu.open = true;
const menuSummary = menu.querySelector('summary'); menuSummary.focus();
menuSummary.dispatchEvent(new ui.w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert.equal(menu.open, false); assert.equal(ui.d.activeElement, menuSummary);

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
console.log('Passed real-DOM regressions: preserved options, all category prompts, tabs/deep links/keyboard, draft retention, menu focus, labels, validation, Formspree payloads, failed/invalid/limited/network responses, duplicate-submit guard, and success reset. No external requests or browser rendering.');
