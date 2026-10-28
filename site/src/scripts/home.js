// Search and filtering enhance a complete, readable catalog of mailto links.
(() => {
  const { selectServices, inquiryURL } = globalThis.FremontServiceTools;
  const searchForm = document.querySelector('[data-search-form]');
  const search = document.querySelector('#service-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-service-card]')].map(element => ({ element, id: element.dataset.serviceId, category: element.dataset.category, search: element.dataset.search }));
  const heading = document.querySelector('#services-heading');
  const status = document.querySelector('[data-results-status]');
  const clear = document.querySelector('[data-clear-search]');
  const more = document.querySelector('[data-more-wrap]');
  const empty = document.querySelector('[data-empty-results]');
  let category = 'all';
  let expanded = false;
  function render() {
    const query = search.value.trim();
    const result = selectServices(cards, { query, category, expanded });
    const shown = new Set(result.visible);
    cards.forEach(card => { card.element.hidden = !shown.has(card); });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    const label = filters.find(button => button.dataset.filter === category)?.querySelector('span').textContent;
    heading.textContent = query ? 'Search results' : category === 'all' ? 'Find the right service' : label;
    const count = result.matched.length;
    status.textContent = query ? `${count} ${count === 1 ? 'service matches' : 'services match'} “${query}”.` : `Showing ${result.visible.length} of ${count} services${category === 'all' ? ' for your work and everyday life' : ''}.`;
    clear.hidden = !query && category === 'all';
    empty.hidden = count !== 0;
    more.hidden = !result.hasMore;
  }
  function focusResults() {
    heading.focus({ preventScroll: true });
    document.querySelector('#services').scrollIntoView({ block: 'start' });
  }
  function chooseCategory(value, focus = true) {
    if (!filters.some(button => button.dataset.filter === value)) return;
    category = value;
    expanded = false;
    search.value = '';
    render();
    if (focus) focusResults();
  }
  searchForm.hidden = false;
  document.querySelector('[data-filters]').hidden = false;
  searchForm.addEventListener('submit', event => { event.preventDefault(); category = 'all'; expanded = false; render(); focusResults(); });
  search.addEventListener('input', () => { category = 'all'; expanded = false; render(); });
  filters.forEach(button => button.addEventListener('click', () => chooseCategory(button.dataset.filter, false)));
  document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); chooseCategory(link.dataset.categoryLink); }));
  clear.addEventListener('click', () => chooseCategory('all'));
  document.querySelector('[data-reset-search]').addEventListener('click', () => chooseCategory('all'));
  document.querySelector('[data-show-all]').addEventListener('click', () => {
    const firstNew = cards.find(card => card.element.hidden);
    expanded = true;
    render();
    if (firstNew) {
      firstNew.element.querySelector('[data-inquiry-open]').focus({ preventScroll: true });
      firstNew.element.scrollIntoView({ block: 'nearest' });
    }
  });
  function syncHash() {
    const value = window.location.hash.slice(1);
    if (filters.some(button => button.dataset.filter === value)) chooseCategory(value);
  }
  window.addEventListener('hashchange', syncHash);
  render();
  syncHash();

  // Native dialog with real email links; no submission or storage on this site.
  const dialog = document.querySelector('[data-inquiry-dialog]');
  const details = document.querySelector('#inquiry-details');
  const emailLink = document.querySelector('[data-inquiry-continue]');
  const drafts = new Map();
  const hints = {
    'web-digital': 'Useful details: your business, a website link if you have one, and what you want to change or build.',
    'business-tech': 'Useful details: the tools you use now, what is getting in the way, and what you want to set up.',
    'repairs-tech': 'Useful details: the device make and model, what is happening, and any damage or error messages.',
    'photo-media': 'Useful details: what you want photographed or filmed, how you will use it, and any timing you have in mind.',
  };
  let activeService;
  function updateEmail() {
    if (!activeService) return;
    drafts.set(activeService.serviceId, details.value);
    emailLink.href = inquiryURL(dialog.dataset.inquiryEmail, activeService.name, details.value);
  }
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-inquiry-open]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      activeService = link.closest('[data-service-card]').dataset;
      document.querySelector('[data-inquiry-title]').textContent = activeService.name;
      document.querySelector('[data-inquiry-category]').textContent = activeService.groupName;
      document.querySelector('[data-inquiry-description]').textContent = activeService.description;
      document.querySelector('[data-inquiry-hint]').textContent = hints[activeService.category];
      details.value = drafts.get(activeService.serviceId) || '';
      updateEmail();
      dialog.showModal();
      details.focus();
    }));
    document.querySelector('[data-dialog-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    details.addEventListener('input', updateEmail);
    document.querySelector('[data-inquiry-form]').addEventListener('submit', event => event.preventDefault());
  }

  const copyEmail = document.querySelector('[data-copy-email]');
  const copyStatus = document.querySelector('[data-copy-status]');
  if (copyEmail && copyStatus && navigator.clipboard?.writeText) {
    copyEmail.hidden = false;
    copyEmail.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyEmail.dataset.copyEmail);
        copyStatus.textContent = 'Email address copied.';
      } catch {
        copyStatus.textContent = 'Select the email address above to copy it manually.';
      }
    });
  }
})();
