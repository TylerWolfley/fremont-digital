// The public endpoint is not a secret. Provider credentials must stay server-side.
export function contactConfig({ endpoint = '' } = {}) {
  if (!endpoint) return { contactEndpoint: '' };
  const url = new URL(endpoint);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/api/inquiry') {
    throw new Error('CONTACT_ENDPOINT must be an HTTPS /api/inquiry URL without credentials, query, or fragment.');
  }
  return { contactEndpoint: url.href };
}
