// Review builds stay out of search. A release uses the real final site address.
export function publicationConfig({ release = false, siteUrl = '' } = {}) {
  if (!release) return { indexable: false, siteUrl: '' };
  if (!siteUrl) throw new Error('Set SITE_URL to the final HTTPS website address before building a release.');
  const url = new URL(siteUrl);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('SITE_URL must be an HTTPS origin, without credentials, a path, query, or fragment.');
  }
  return { indexable: true, siteUrl: url.origin + '/' };
}
