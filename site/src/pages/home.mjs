import { business } from '../data/business.mjs';
import { header } from '../components/header.mjs';

export function homePage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#202b34">
  <meta name="description" content="${business.description}">
  <title>${business.name} — Websites, Repairs, Photography & Media</title>
  <link rel="icon" href="/assets/favicons/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="/assets/favicons/favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon.png">
  <link rel="preload" href="/assets/manrope-regular.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/styles/tokens.css">
  <link rel="stylesheet" href="/styles/header.css">
  <script src="/scripts/header.js" defer></script>
</head>
<body>
  ${header()}
  <!-- The hero and remaining content will be designed after the header review. -->
  <main id="main" class="page-main" tabindex="-1"></main>
</body>
</html>`;
}
