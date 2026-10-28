import { business, inquiryLink } from '../data/business.mjs';
import { escape } from '../components/html.mjs';
import { arrow } from '../components/icons.mjs';

export function notFoundPage() {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page not found | Fremont Digital</title><link rel="icon" href="/assets/favicons/favicon.ico"><link rel="stylesheet" href="/styles/tokens.css"><link rel="stylesheet" href="/styles/home.css"></head>
<body class="not-found"><main class="section-container" id="main"><a class="footer-brand" href="/" aria-label="Fremont Digital home"><img src="/assets/brand/fremont-digital-wordmark.webp" width="600" height="141" alt="Fremont Digital"></a><p class="eyebrow">404 / Page not found</p><h1>This page isn’t here.</h1><p>The link may be out of date. You can find the services on the homepage or get in touch directly.</p><div class="hero__actions"><a class="button button--dark" href="/">Back to the homepage ${arrow}</a><a class="text-link" href="${escape(inquiryLink())}">Contact ${escape(business.name)} ${arrow}</a></div></main></body></html>`;
}
