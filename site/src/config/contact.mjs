// The public endpoint is not a secret. Provider credentials must stay server-side.
export const configuredContactEndpoint = 'https://formspree.io/f/mrppayow';

export function contactConfig({ endpoint = configuredContactEndpoint } = {}) {
  if (!endpoint) return { contactEndpoint: '' };
  const url = new URL(endpoint);
  const formspree = url.origin === 'https://formspree.io' && /^\/f\/[a-zA-Z0-9]+$/.test(url.pathname);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || (!formspree && url.pathname !== '/api/inquiry')) {
    throw new Error('CONTACT_ENDPOINT must be a Formspree /f/form-id URL or an HTTPS /api/inquiry URL without credentials, query, or fragment.');
  }
  return { contactEndpoint: url.href };
}
