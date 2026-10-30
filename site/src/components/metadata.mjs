import { business } from '../data/business.mjs';
import { escape } from './html.mjs';

export function metadata({ indexable = false, siteUrl = '' } = {}) {
  const imagePath = 'assets/brand/fremont-digital-social.png';
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: business.name,
    description: business.description,
    email: business.email,
    telephone: business.phoneE164,
    sameAs: [business.facebookUrl],
    areaServed: { '@type': 'AdministrativeArea', name: business.location },
    ...(siteUrl ? { url: siteUrl, logo: new URL('assets/favicons/favicon-512.png', siteUrl).href } : {}),
  };
  return `<meta name="robots" content="${indexable ? 'index, follow' : 'noindex, nofollow'}">
  <meta name="description" content="${escape(business.description)}">
  <title>${escape(business.title)}</title>
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="${escape(business.name)}">
  <meta property="og:title" content="${escape(business.title)}">
  <meta property="og:description" content="${escape(business.description)}">
  <meta name="twitter:card" content="summary_large_image">
  ${siteUrl ? `<link rel="canonical" href="${escape(siteUrl)}">
  <meta property="og:url" content="${escape(siteUrl)}">
  <meta property="og:image" content="${escape(new URL(imagePath, siteUrl).href)}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Fremont Digital: websites, repairs, business tech, and creative work in Fremont County, Wyoming">` : ''}
  <script type="application/ld+json">${JSON.stringify(organization).replace(/</g, '\\u003c')}</script>`.replace(/[\t ]+$/gm, '');
}
