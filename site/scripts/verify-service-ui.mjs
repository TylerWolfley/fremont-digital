// Source-level interaction tests. These are not browser rendering or accessibility QA.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { serviceGroups } from '../src/data/services.mjs';
import { searchAliases, startingServices } from '../src/data/catalog.mjs';
import { business, inquiryLink } from '../src/data/business.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const helpers = await readFile(resolve(root, 'src/scripts/service-tools.js'), 'utf8');
const script = await readFile(resolve(root, 'src/scripts/home.js'), 'utf8');
const services = serviceGroups.flatMap(group => group.services.map(service => ({ ...service, group })));
services.sort((a, b) => (startingServices.includes(a.id) ? startingServices.indexOf(a.id) : 99) - (startingServices.includes(b.id) ? startingServices.indexOf(b.id) : 99));
const context = vm.createContext({});
vm.runInContext(helpers, context);
const { selectServices, normalize, inquiryURL } = context.FremontServiceTools;
const models = services.map(service => ({ id: service.id, category: service.group.id, search: [service.name, service.description, searchAliases[service.id]].join(' ') }));
assert.equal(selectServices(models).visible.length, 8);
assert.equal(selectServices(models, { expanded: true }).visible.length, 18);
for (const [query, expected] of [['phone screen', 'phone-repair'], ['fix laptop', 'computer-help'], ['virus removal', 'virus-cleanup'], ['Wi-Fi', 'office-networking'], ['  WEBSITE BUILDS ', 'website-builds']]) {
  const result = selectServices(models, { query });
  assert(result.visible.some(service => service.id === expected), `Missing result for ${query}`);
}
assert.equal(selectServices(models, { query: 'quantum toaster' }).visible.length, 0);
assert.equal(selectServices(models, { category: 'photo-media' }).visible.length, 3);
assert.equal(selectServices(models, { category: 'photo-media', query: 'phone' }).visible.length, 0);
assert.equal(normalize(' Wi-Fi / SETUP '), 'wi fi setup');
const message = 'A broken screen & charging port.\nKeep ?subject=other as message text.';
const url = new URL(inquiryURL(business.email, 'Phone & device repairs', message));
assert.equal(url.protocol, 'mailto:');
assert.equal(url.pathname, business.email);
assert.equal(url.searchParams.get('subject'), 'Fremont Digital inquiry: Phone & device repairs');
assert(url.searchParams.get('body').includes(message));
assert.equal(url.searchParams.getAll('subject').length, 1);

async function checkUI(clipboardMode = 'success', supportsDialog = true) {
  let focused, scrolled, copied;
  function element(name, dataset = {}) {
    return {
      name, dataset, textContent: '', value: '', hidden: false, attributes: {}, events: {},
      addEventListener(type, handler) { (this.events[type] ||= []).push(handler); },
      setAttribute(key, value) { this.attributes[key] = value; },
      focus() { focused = name; }, scrollIntoView() { scrolled = name; },
      async fire(type, fields = {}) {
        const event = { target: this, prevented: false, preventDefault() { this.prevented = true; }, ...fields };
        for (const handler of this.events[type] || []) await handler(event);
        return event;
      },
    };
  }
  const selectors = ['[data-search-form]', '#service-search', '[data-filters]', '#services-heading', '[data-results-status]', '[data-clear-search]', '[data-more-wrap]', '[data-empty-results]', '#services', '[data-reset-search]', '[data-show-all]', '[data-inquiry-dialog]', '#inquiry-details', '[data-inquiry-continue]', '[data-inquiry-title]', '[data-inquiry-category]', '[data-inquiry-description]', '[data-inquiry-hint]', '[data-dialog-close]', '[data-inquiry-form]', '[data-copy-email]', '[data-copy-status]'];
  const nodes = Object.fromEntries(selectors.map(selector => [selector, element(selector)]));
  nodes['[data-search-form]'].hidden = nodes['[data-filters]'].hidden = nodes['[data-copy-email]'].hidden = true;
  nodes['[data-copy-email]'].dataset.copyEmail = business.email;
  const filters = [{ id: 'all', label: 'All services' }, ...serviceGroups.map(group => ({ id: group.id, label: group.navLabel }))].map(item => {
    const button = element(`filter:${item.id}`, { filter: item.id });
    button.querySelector = () => ({ textContent: item.label });
    return button;
  });
  const cards = services.map(service => {
    const card = element(service.id, { serviceId: service.id, category: service.group.id, name: service.name, groupName: service.group.navLabel, description: service.description, search: [service.name, service.description, searchAliases[service.id]].join(' ') });
    card.link = element(`link:${service.id}`);
    card.link.href = inquiryLink(`Fremont Digital inquiry: ${service.name}`);
    card.link.closest = () => card;
    card.querySelector = () => card.link;
    return card;
  });
  const categoryLinks = serviceGroups.map(group => element(`category:${group.id}`, { categoryLink: group.id }));
  const dialog = nodes['[data-inquiry-dialog]'];
  dialog.dataset.inquiryEmail = business.email;
  dialog.open = false;
  if (supportsDialog) dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; };
  dialog.getBoundingClientRect = () => ({ left: 10, right: 500, top: 10, bottom: 500 });
  const events = {};
  const window = { location: { hash: '' }, addEventListener(type, callback) { events[type] = callback; } };
  const navigator = clipboardMode === 'unavailable' ? {} : { clipboard: { writeText: async value => { if (clipboardMode === 'denied') throw new Error('Denied'); copied = value; } } };
  const sandbox = vm.createContext({ window, navigator, document: { querySelector: selector => nodes[selector], querySelectorAll: selector => ({ '[data-filter]': filters, '[data-service-card]': cards, '[data-category-link]': categoryLinks, '[data-inquiry-open]': cards.map(card => card.link) })[selector] } });
  vm.runInContext(helpers, sandbox);
  vm.runInContext(script, sandbox);
  const visible = () => cards.filter(card => !card.hidden);
  assert.equal(nodes['[data-search-form]'].hidden, false);
  assert.equal(nodes['[data-filters]'].hidden, false);
  assert.equal(visible().length, 8);
  assert.equal(nodes['[data-more-wrap]'].hidden, false);
  nodes['#service-search'].value = 'phone screen';
  await nodes['#service-search'].fire('input');
  assert.deepEqual(visible().map(card => card.dataset.serviceId), ['phone-repair']);
  assert.match(nodes['[data-results-status]'].textContent, /^1 service matches/);
  assert.equal((await nodes['[data-search-form]'].fire('submit')).prevented, true);
  assert.equal(focused, '#services-heading');
  assert.equal(scrolled, '#services');
  nodes['#service-search'].value = 'no-such-service';
  await nodes['#service-search'].fire('input');
  assert.equal(visible().length, 0);
  assert.equal(nodes['[data-empty-results]'].hidden, false);
  await nodes['[data-reset-search]'].fire('click');
  assert.equal(visible().length, 8);
  await nodes['[data-show-all]'].fire('click');
  assert.equal(visible().length, 18);
  assert.equal(focused, `link:${cards[8].dataset.serviceId}`);
  assert.equal(nodes['[data-more-wrap]'].hidden, true);
  assert.equal((await categoryLinks[3].fire('click')).prevented, true);
  assert.equal(visible().length, 3);
  assert.equal(nodes['#services-heading'].textContent, 'Photo & Media');
  assert.equal(filters[4].attributes['aria-pressed'], 'true');
  await filters[2].fire('click');
  assert.equal(visible().length, 6);
  await nodes['[data-clear-search]'].fire('click');
  assert.equal(visible().length, 8);
  window.location.hash = '#repairs-tech'; events.hashchange();
  assert.equal(visible().length, 4);
  window.location.hash = '#not-a-category'; events.hashchange();
  assert.equal(visible().length, 4);
  const repair = cards.find(card => card.dataset.serviceId === 'phone-repair');
  const click = await repair.link.fire('click');
  assert.equal(click.prevented, supportsDialog);
  if (supportsDialog) {
    assert.equal(dialog.open, true);
    assert.equal(nodes['[data-inquiry-title]'].textContent, repair.dataset.name);
    assert.equal(focused, '#inquiry-details');
    nodes['#inquiry-details'].value = message;
    await nodes['#inquiry-details'].fire('input');
    assert(new URL(nodes['[data-inquiry-continue]'].href).searchParams.get('body').includes(message));
    await nodes['[data-dialog-close]'].fire('click');
    assert.equal(dialog.open, false);
    await repair.link.fire('click');
    assert.equal(nodes['#inquiry-details'].value, message);
    await dialog.fire('click', { clientX: 0, clientY: 0 });
    assert.equal(dialog.open, false);
  }
  const copy = nodes['[data-copy-email]'];
  if (clipboardMode === 'unavailable') assert.equal(copy.hidden, true);
  else {
    assert.equal(copy.hidden, false);
    await copy.fire('click');
    if (clipboardMode === 'denied') assert.match(nodes['[data-copy-status]'].textContent, /manually/);
    else { assert.equal(copied, business.email); assert.equal(nodes['[data-copy-status]'].textContent, 'Email address copied.'); }
  }
}
for (const mode of ['success', 'denied', 'unavailable']) await checkUI(mode);
await checkUI('unavailable', false);
console.log('Passed: search, aliases, category filters, no results, reset, view all, focus targets, deep links, inquiry drafts, email encoding, dialog fallback, and clipboard states. Browser QA remains separate.');
