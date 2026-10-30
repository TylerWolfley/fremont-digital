// Generate a branded sharing graphic from the existing wordmark; no new logo.
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const modulePath = process.argv[process.argv.indexOf('--sharp-module') + 1];
const sharp = require(process.argv.includes('--sharp-module') ? modulePath : 'sharp');
const assets = new URL('../dist/assets/', import.meta.url);
const logo = await sharp(await readFile(new URL('brand/fremont-digital-wordmark.webp', assets))).png().toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#fff"/><rect width="12" height="630" fill="#155dc7"/>
<image href="data:image/png;base64,${logo.toString('base64')}" x="76" y="52" width="420" height="99"/>
<text x="1120" y="113" text-anchor="end" font-family="Arial,sans-serif" font-size="24" fill="#536274">digitalfremont.com</text>
<path d="M76 190H1120" stroke="#dce3ec"/>
<g font-family="Arial,sans-serif" font-weight="700" font-size="65" fill="#172536"><text x="76" y="292">Websites. Repairs.</text><text x="76" y="378">Business tech. Creative work.</text></g>
<rect x="76" y="446" width="1044" height="112" rx="12" fill="#eaf2ff"/>
<text x="103" y="492" font-family="Arial,sans-serif" font-size="27" font-weight="700" fill="#155dc7">Fremont County, Wyoming</text>
<text x="103" y="529" font-family="Arial,sans-serif" font-size="23" fill="#536274">Remote help · On-site visits · Arranged drop-off</text>
<text x="1090" y="512" text-anchor="end" font-family="Arial,sans-serif" font-size="32" font-weight="700" fill="#172536">(307) 349-4694</text>
</svg>`;
await writeFile(new URL('../src/assets/social-card.svg', import.meta.url), svg);
const output = new URL('brand/fremont-digital-social.png', assets);
await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(output));
console.log('Created 1200 × 630 sharing graphic from the existing wordmark.');
