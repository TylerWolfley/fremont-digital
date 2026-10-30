import { header } from '../components/header.mjs';
import { footer } from '../components/footer.mjs';
import { metadata } from '../components/metadata.mjs';
import { favicons } from '../components/favicons.mjs';

export function pageShell(page, content, { indexable = false, siteUrl = '', headerOnly = false } = {}) {
  return `<!doctype html><html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#ffffff">
  ${metadata({ ...page, indexable: !headerOnly && indexable, siteUrl: headerOnly ? '' : siteUrl })}${favicons()}
  <link rel="preload" href="/assets/manrope-regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/manrope-extrabold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles/tokens.css"><link rel="stylesheet" href="/styles/header.css">
  <link rel="stylesheet" href="/styles/home.css"><link rel="stylesheet" href="/styles/pages.css">
  <link rel="stylesheet" href="/styles/studio.css">
  ${page.id === 'websites' ? '<link rel="stylesheet" href="/styles/websites.css">' : ''}
  <script src="/scripts/header.js" defer></script>
  ${page.id === 'automation' ? '<script src="/scripts/automation-demo.js" defer></script>' : ''}
  ${page.id === 'contact' ? '<script src="/scripts/inquiry-tools.js" defer></script><script src="/scripts/home.js" defer></script>' : ''}
  </head><body id="top" data-page="${page.id}">${header(page.id)}<main id="main" class="page-main" tabindex="-1">${headerOnly ? '' : content}</main>${headerOnly ? '' : footer()}</body></html>`.replace(/[\t ]+$/gm, '');
}
