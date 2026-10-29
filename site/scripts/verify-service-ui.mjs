// Source and simulated interaction tests; these do not verify browser rendering.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { serviceGuides } from '../src/data/service-guides.mjs';
const helpers = await readFile(new URL('../src/scripts/inquiry-tools.js', import.meta.url), 'utf8');
const controller = await readFile(new URL('../src/scripts/home.js', import.meta.url), 'utf8');
function mount(endpoint = '') {
  let focus;
  const nodes = new Map();
  const errors = [];
  function node(id, dataset = {}) {
    const n = { id, dataset, value: '', textContent: '', hidden: false, disabled: false, attributes: {}, events: {}, children: [],
      setAttribute(k,v) { this.attributes[k] = v; }, removeAttribute(k) { delete this.attributes[k]; },
      addEventListener(k, fn) { (this.events[k] ||= []).push(fn); },
      async fire(k, extra = {}) { const event = { target: this, prevented: false, preventDefault() { this.prevented = true; }, ...extra }; for (const fn of this.events[k] || []) await fn(event); return event; },
      focus() { focus = this.id; }, scrollIntoView() {},
      append(...items) { this.children.push(...items); }, replaceChildren() { this.children = []; },
      insertAdjacentElement(_, el) { errors.push(el); }, remove() { const i = errors.indexOf(this); if(i >= 0) errors.splice(i,1); },
    };
    nodes.set(id, n); return n;
  }
  const ids = Object.keys(serviceGuides).filter(id => id !== 'general');
  const tabs = ids.map(id => node(`tab-${id}`, { categoryTab: id }));
  const panels = ids.map(id => node(id));
  ids.forEach(id => node(`${id}-heading`));
  const links = ids.map(id => node(`link-${id}`, { categoryLink: id }));
  const requests = ids.map(id => node(`request-${id}`, { requestCategory: id, ...(id === 'repairs-tech' ? { requestService: 'phone-repair', requestName: 'Phone & device repairs' } : {}) }));
  const selectors = ['[data-category-tabs]', '[data-inquiry-form]', '[data-form-status]', '[data-submit]', '[data-request-review]', '[data-chosen-service]', '[data-context-label]', '[data-message-hint]', '[data-timing-label]', '[data-contact-label]', '[data-review-details]', '#contact'];
  const lookup = Object.fromEntries(selectors.map(id => [id, node(id)]));
  const form = lookup['[data-inquiry-form]']; form.dataset.endpoint = endpoint;
  const fields = ['name','category','service','method','contact','context','location','message','timing','company_url'].map(name => { const field = node(name); field.name = name; return field; });
  fields.push(lookup['[data-submit]']); fields.namedItem = name => fields.find(f => f.name === name);
  form.elements = fields;
  const category = fields.namedItem('category');
  category.options = Object.entries(serviceGuides).map(([id, guide]) => ({ value: id, textContent: guide.label, dataset: { ...guide } }));
  Object.defineProperty(category, 'selectedOptions', { get: () => category.options.filter(option => option.value === category.value) });
  form.reset = () => { fields.forEach(f => { f.value = ''; }); category.value = 'general'; fields.namedItem('method').value = 'phone'; };
  form.reset();
  form.querySelectorAll = selector => selector === '[data-field-error]' ? [...errors] : [];
  form.querySelector = selector => selector === '[aria-invalid="true"]' ? fields.find(f => f.attributes['aria-invalid'] === 'true') : lookup[selector];
  const listeners = {};
  const window = { location: { hash: '' }, addEventListener: (type, handler) => { listeners[type] = handler; } };
  let transport = async () => { throw new Error('Unexpected network request in preview'); };
  const sandbox = vm.createContext({ window, crypto, AbortSignal, TypeError, FormData: class { constructor() { this.entries = fields.filter(f => f.name && !f.disabled).map(f => [f.name, f.value]); } [Symbol.iterator]() { return this.entries[Symbol.iterator](); } }, fetch: (...args) => transport(...args), document: {
    querySelector: selector => lookup[selector],
    querySelectorAll: selector => ({ '[data-category-tab]': tabs, '[data-service-panel]': panels, '[data-category-link]': links, '[data-request-category]': requests })[selector],
    getElementById: id => nodes.get(id), createElement: tag => node(tag),
  } });
  vm.runInContext(helpers, sandbox); vm.runInContext(controller, sandbox);
  return { tabs, panels, links, requests, form, fields, lookup, window, listeners, sandbox, get focus() { return focus; }, transport(fn) { transport = fn; } };
}
const ui = mount();
assert.equal(ui.panels.filter(p => !p.hidden).length, 1);
assert.equal(ui.tabs[0].attributes['aria-selected'], 'true');
await ui.tabs[0].fire('keydown', { key: 'ArrowLeft' });
assert.equal(ui.panels[3].hidden, false); assert.equal(ui.focus, ui.tabs[3].id);
await ui.tabs[3].fire('keydown', { key: 'Home' });
assert.equal(ui.panels[0].hidden, false);
assert.equal((await ui.tabs[2].fire('keydown', { key: ' ' })).prevented, true);
assert.equal(ui.panels[2].hidden, false);
assert.equal((await ui.tabs[1].fire('click')).prevented, true);
assert.equal(ui.panels[1].hidden, false);
ui.window.location.hash = '#repairs-tech'; ui.listeners.hashchange();
assert.equal(ui.panels[2].hidden, false);
ui.window.location.hash = '#contact'; ui.listeners.hashchange();
assert.equal(ui.panels[2].hidden, false);
await ui.links[3].fire('click'); assert.equal(ui.focus, 'photo-media-heading');
await ui.requests[2].fire('click');
assert.equal(ui.fields.namedItem('category').value, 'repairs-tech');
assert.equal(ui.fields.namedItem('service').value, 'phone-repair');
assert.match(ui.lookup['[data-context-label]'].textContent, /Device make and model/);
ui.fields.namedItem('message').value = 'My phone screen is broken.';
await ui.requests[0].fire('click'); assert.equal(ui.fields.namedItem('message').value, '');
ui.fields.namedItem('message').value = 'I need a new website for my shop.';
await ui.requests[2].fire('click'); assert.equal(ui.fields.namedItem('message').value, 'My phone screen is broken.');
await ui.form.fire('submit'); assert.equal(ui.focus, 'name');
ui.fields.namedItem('name').value = 'Test Person';
ui.fields.namedItem('contact').value = '123';
await ui.form.fire('submit'); assert.equal(ui.focus, 'contact');
ui.fields.namedItem('contact').value = '(307) 555-0123';
await ui.form.fire('submit');
assert.equal(ui.lookup['[data-request-review]'].hidden, false);
assert.match(ui.lookup['[data-form-status]'].textContent, /Nothing has been sent/);
assert(ui.lookup['[data-review-details]'].children.some(n => n.textContent === 'My phone screen is broken.'));
ui.fields.namedItem('method').value = 'email'; await ui.fields.namedItem('method').fire('change');
assert.equal(ui.fields.namedItem('contact').type, 'email'); assert.equal(ui.fields.namedItem('contact').value, '');
const { validateInquiry } = ui.sandbox.FremontInquiryTools;
const example = { name: 'A', category: 'general', method: 'phone', contact: '3075550123', message: 'I need tech help.' };
assert.equal(validateInquiry(example, Object.keys(serviceGuides)).valid, true);
for (const invalid of [{ ...example, message: 'x'.repeat(4001) }, { ...example, category: 'invalid' }, { ...example, method: 'email', contact: 'not-an-email' }, { ...example, name: ' ' }]) assert.equal(validateInquiry(invalid, Object.keys(serviceGuides)).valid, false);
const live = mount('https://example.invalid/api/inquiry');
for (const [name,value] of Object.entries(example)) live.fields.namedItem(name).value = value;
let attempts = [];
live.transport(async (_, options) => { attempts.push(options); return Response.json({ error: 'Delivery unavailable' }, { status: 502 }); });
await live.form.fire('submit');
assert.equal(live.fields.namedItem('message').value, example.message);
assert.match(live.lookup['[data-form-status]'].textContent, /could not be confirmed/);
assert.equal(live.lookup['[data-submit]'].disabled, false);
await live.form.fire('submit');
assert.equal(attempts[0].headers['Idempotency-Key'], attempts[1].headers['Idempotency-Key']);
live.fields.namedItem('message').value += ' One more detail.';
await live.form.fire('submit');
assert.notEqual(attempts[1].headers['Idempotency-Key'], attempts[2].headers['Idempotency-Key']);
let finish;
live.transport(() => new Promise(resolve => { finish = resolve; }));
const pending = live.form.fire('submit');
assert.equal(live.lookup['[data-submit]'].disabled, true);
assert.equal(live.fields.namedItem('message').disabled, true);
await live.form.fire('submit');
finish(Response.json({ accepted: true })); await pending;
assert.equal(live.fields.namedItem('message').value, '');
assert.equal(live.fields.namedItem('message').disabled, false);
assert.match(live.lookup['[data-form-status]'].textContent, /has been sent/);
console.log('Passed: category tabs and keyboard navigation, deep links, service context, per-category drafts, form validation, honest preview, delivery errors, duplicate-submit guard, and retry keys. Browser QA remains separate.');
