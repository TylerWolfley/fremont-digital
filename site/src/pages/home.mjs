import { header } from '../components/header.mjs';
import { hero } from '../components/hero.mjs';
import { services } from '../components/services.mjs';
import { processSection } from '../components/process.mjs';
import { contact } from '../components/contact.mjs';
import { footer } from '../components/footer.mjs';
import { faq } from '../components/faq.mjs';
import { metadata } from '../components/metadata.mjs';
import { favicons } from '../components/favicons.mjs';

export function homePage({ headerOnly = false, indexable = false, siteUrl = '', contactEndpoint = '' } = {}) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffffff">
  ${metadata({ indexable: headerOnly ? false : indexable, siteUrl: headerOnly ? '' : siteUrl })}
  ${favicons()}
  <link rel="preload" href="/assets/manrope-regular.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="preload" href="/assets/manrope-extrabold.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/styles/tokens.css">
  <link rel="stylesheet" href="/styles/header.css">
  ${headerOnly ? '' : '<link rel="stylesheet" href="/styles/home.css">'}
  <script src="/scripts/header.js" defer></script>
  ${headerOnly ? '' : '<script src="/scripts/inquiry-tools.js" defer></script><script src="/scripts/home.js" defer></script>'}
</head>
<body id="top">
  ${header()}
  <main id="main" class="page-main" tabindex="-1">${headerOnly ? '' : [hero(), services(), processSection(), faq(), contact({ contactEndpoint })].join('\n')}</main>
  ${headerOnly ? '' : footer()}
</body>
</html>`;
}
