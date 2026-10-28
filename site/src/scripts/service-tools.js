// Pure catalog helpers, shared by the page and source-level regression checks.
(() => {
  const normalize = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  function selectServices(items, { query = '', category = 'all', expanded = false } = {}) {
    const terms = normalize(query).split(' ').filter(Boolean);
    const matched = items.filter(item => (category === 'all' || item.category === category) && terms.every(term => normalize(item.search).includes(term)));
    const visible = expanded || terms.length || category !== 'all' ? matched : matched.slice(0, 8);
    return { matched, visible, hasMore: visible.length < matched.length };
  }
  function inquiryURL(email, service, details = '') {
    const subject = `Fremont Digital inquiry: ${service}`;
    const body = `Hello Fremont Digital,\n\nI’m interested in ${service}.${details.trim() ? '\n\n' + details.trim() : ''}\n`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  globalThis.FremontServiceTools = Object.freeze({ normalize, selectServices, inquiryURL });
})();
