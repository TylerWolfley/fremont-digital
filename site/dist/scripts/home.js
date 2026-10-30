// Progressive category browsing and an inquiry form with explicit delivery states.
(() => {
  const tabs = [...document.querySelectorAll('[data-category-tab]')];
  const panels = [...document.querySelectorAll('[data-service-panel]')];
  const tablist = document.querySelector('[data-category-tabs]');
  tablist.setAttribute('role', 'tablist');
  tabs.forEach(tab => { tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', tab.dataset.categoryTab); });
  panels.forEach(panel => { panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', `tab-${panel.id}`); panel.tabIndex = 0; });
  function activate(id) {
    if (!panels.some(panel => panel.id === id)) return;
    panels.forEach(panel => { panel.hidden = panel.id !== id; });
    tabs.forEach(tab => { const selected = tab.dataset.categoryTab === id; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => {
      event.preventDefault(); activate(tab.dataset.categoryTab);
      window.history.replaceState(null, '', `#${tab.dataset.categoryTab}`);
    });
    tab.addEventListener('keydown', event => {
      if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); activate(tab.dataset.categoryTab); return; }
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); activate(tabs[next].dataset.categoryTab); tabs[next].focus();
    });
  });
  document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => {
    activate(link.dataset.categoryLink);
    document.getElementById(`${link.dataset.categoryLink}-heading`)?.focus({ preventScroll: true });
  }));
  function syncHash() { activate(window.location.hash.slice(1)); }
  activate(panels[0].id); syncHash();
  window.addEventListener('hashchange', syncHash);

  const { validateInquiry, sendInquiry } = globalThis.FremontInquiryTools;
  const form = document.querySelector('[data-inquiry-form]');
  const fields = form.elements;
  const category = fields.namedItem('category');
  const contact = fields.namedItem('contact');
  const status = form.querySelector('[data-form-status]');
  const button = form.querySelector('[data-submit]');
  const review = form.querySelector('[data-request-review]');
  const chosen = form.querySelector('[data-chosen-service]');
  const drafts = new Map();
  const contactDrafts = new Map();
  let currentCategory = category.value;
  let currentMethod = fields.namedItem('method').value;
  let pending = false;
  let submissionKey;
  let lastPayload;
  function updatePrompts() {
    const selected = category.selectedOptions[0].dataset;
    form.querySelector('label[data-context-label]').textContent = `${selected.contextLabel} (optional)`;
    fields.namedItem('context').placeholder = selected.contextPlaceholder;
    form.querySelector('[data-message-hint]').textContent = selected.messagePrompt;
    form.querySelector('label[data-timing-label]').textContent = `${selected.timingLabel} (optional)`;
  }
  function chooseCategory(id, service = '', name = '') {
    if (![...category.options].some(option => option.value === id)) return;
    drafts.set(currentCategory, { context: fields.namedItem('context').value, message: fields.namedItem('message').value, timing: fields.namedItem('timing').value });
    category.value = id;
    if (currentCategory !== id) {
      const draft = drafts.get(id) || {};
      for (const key of ['context', 'message', 'timing']) fields.namedItem(key).value = draft[key] || '';
    }
    currentCategory = id;
    fields.namedItem('service').value = service;
    chosen.textContent = name ? `About: ${name}` : '';
    chosen.hidden = !name;
    updatePrompts(); clearErrors(); review.hidden = true;
  }
  category.addEventListener('change', () => chooseCategory(category.value));
  document.querySelectorAll('[data-request-category]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    if (pending) return;
    chooseCategory(link.dataset.requestCategory, link.dataset.requestService, link.dataset.requestName);
    document.querySelector('#contact').scrollIntoView({ block: 'start' });
    fields.namedItem('name').focus({ preventScroll: true });
  }));
  function updateMethod(preserve = true) {
    if (preserve) contactDrafts.set(currentMethod, contact.value);
    const email = fields.namedItem('method').value === 'email';
    form.querySelector('[data-contact-label]').textContent = email ? 'Email address *' : 'Phone number *';
    contact.type = email ? 'email' : 'tel';
    contact.autocomplete = email ? 'email' : 'tel';
    contact.placeholder = email ? 'you@example.com' : '(307) 555-0123';
    currentMethod = fields.namedItem('method').value;
    contact.value = contactDrafts.get(currentMethod) || '';
  }
  fields.namedItem('method').addEventListener('change', () => { updateMethod(); clearErrors(); });
  function clearErrors() {
    form.querySelectorAll('[data-field-error]').forEach(node => node.remove());
    [...fields].forEach(field => { field.removeAttribute('aria-invalid'); field.removeAttribute('aria-errormessage'); });
    status.textContent = '';
    delete status.dataset.state;
  }
  function showErrors(errors) {
    for (const [name, message] of Object.entries(errors)) {
      const field = fields.namedItem(name);
      if (!field || field.type === 'hidden') continue;
      const error = document.createElement('p');
      error.id = `error-${name}`; error.className = 'field-error'; error.dataset.fieldError = ''; error.textContent = message;
      field.insertAdjacentElement('afterend', error);
      field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-errormessage', error.id);
      field.closest('details')?.setAttribute('open', '');
    }
    const first = form.querySelector('[aria-invalid="true"]');
    if (first) first.focus();
  }
  form.addEventListener('input', () => { review.hidden = true; });
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (pending) return;
    clearErrors(); review.hidden = true;
    const result = validateInquiry(Object.fromEntries(new FormData(form)), [...category.options].map(option => option.value));
    if (!result.valid) { showErrors(result.errors); status.textContent = 'Please check the highlighted fields.'; return; }
    if (!form.dataset.endpoint) {
      const list = form.querySelector('[data-review-details]'); list.replaceChildren();
      const entries = { Name: result.data.name, Service: chosen.hidden ? category.selectedOptions[0].textContent : chosen.textContent.replace('About: ', ''), 'Reply by': `${result.data.method}: ${result.data.contact}`, Context: result.data.context, Area: result.data.location, Request: result.data.message, Timing: result.data.timing };
      for (const [label, value] of Object.entries(entries)) {
        if (!value) continue;
        const term = document.createElement('dt'); term.textContent = label;
        const description = document.createElement('dd'); description.textContent = value;
        list.append(term, description);
      }
      review.hidden = false; status.textContent = 'Request preview ready. Nothing has been sent.'; status.focus(); return;
    }
    pending = true; [...fields].forEach(field => { field.disabled = true; }); form.setAttribute('aria-busy', 'true'); button.textContent = 'Sending…';
    const serialized = JSON.stringify(result.data);
    if (serialized !== lastPayload) { submissionKey = crypto.randomUUID(); lastPayload = serialized; }
    let deliveryErrors;
    try {
      await sendInquiry(form.dataset.endpoint, result.data, submissionKey);
      status.textContent = 'Your request has been sent. I’ll use your preferred contact method to follow up.';
      form.reset(); drafts.clear(); contactDrafts.clear(); currentCategory = category.value; chosen.hidden = true; chosen.textContent = ''; updatePrompts(); updateMethod(false);
      form.querySelector('.form-extras').open = false;
      submissionKey = undefined; lastPayload = undefined;
      status.dataset.state = 'success';
    } catch (error) {
      deliveryErrors = error.fields || {};
      status.dataset.state = 'error';
      status.textContent = error.message === 'The operation was aborted due to timeout' || error.name === 'TimeoutError' || error instanceof TypeError ? 'We couldn’t confirm your request. Your details are still here. Please retry, call, or email.' : error.message;
    } finally {
      pending = false; [...fields].forEach(field => { field.disabled = false; }); button.textContent = 'Send request'; form.removeAttribute('aria-busy');
      if (deliveryErrors) showErrors(deliveryErrors);
      if (!form.querySelector('[aria-invalid="true"]')) status.focus();
    }
  });
  form.noValidate = true; updatePrompts(); updateMethod(false); form.hidden = false;
})();
