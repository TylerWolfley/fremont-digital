import { header } from '../components/header.mjs';
import { hero } from '../components/hero.mjs';
import { services } from '../components/services.mjs';
import { businessFeature } from '../components/business-feature.mjs';
import { processSection } from '../components/process.mjs';
import { contact } from '../components/contact.mjs';
import { footer } from '../components/footer.mjs';
import { faq } from '../components/faq.mjs';
import { metadata } from '../components/metadata.mjs';

export function homePage({ headerOnly = false, indexable = false, siteUrl = '' } = {}) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#061923">
  ${metadata({ indexable: headerOnly ? false : indexable, siteUrl: headerOnly ? '' : siteUrl })}
  <link rel="icon" href="/assets/favicons/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="/assets/favicons/favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon.png">
  <link rel="preload" href="/assets/manrope-regular.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="preload" href="/assets/bitter-variable.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/styles/tokens.css">
  <link rel="stylesheet" href="/styles/header.css">
  ${headerOnly ? '' : '<link rel="stylesheet" href="/styles/home.css">'}
  <script src="/scripts/header.js" defer></script>
  ${headerOnly ? '' : '<script src="/scripts/home.js" defer></script>'}
</head>
<body id="top">
  ${header()}
  <main id="main" class="page-main" tabindex="-1">${headerOnly ? '' : [hero(), services(), businessFeature(), processSection(), faq(), contact()].join('\n')}</main>
  ${headerOnly ? '' : footer()}
</body>
</html>`;
}
