// Render the code-native vector master at each target size; never resize a tiny PNG.
// Sharp is needed only to regenerate these committed assets, not to build the site.
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const require = createRequire(import.meta.url);
const moduleArg = process.argv.indexOf('--sharp-module');
const sharp = require(moduleArg === -1 ? 'sharp' : resolve(process.argv[moduleArg + 1]));
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const out = resolve(root, 'site/dist/assets/favicons');
const review = resolve(root, 'reviews/01-favicon');
const svg = await readFile(resolve(root, 'site/src/assets/fd-favicon.svg'));
const originalPath = resolve(root, 'logos/fremont digital logo 2');
const hash = data => createHash('sha256').update(data).digest('hex');
const originalHash = hash(await readFile(originalPath));
await mkdir(out, { recursive: true });
await mkdir(review, { recursive: true });
await writeFile(resolve(out, 'fd-v2.svg'), svg);

const images = new Map();
for (const size of [16, 32, 48, 64, 180, 192, 256, 512]) {
  const png = await sharp(svg, { density: 72 * size / 32 }).png().toBuffer();
  const info = await sharp(png).metadata();
  assert.equal(info.width, size); assert.equal(info.height, size);
  assert.equal(info.hasAlpha, true);
  images.set(size, png);
  await writeFile(resolve(out, size === 180 ? 'apple-touch-icon-v2.png' : `fd-v2-${size}.png`), png);
}

// ICO directory entries point to lossless RGBA PNG frames, including native 16px.
const icoSizes = [16, 32, 48, 64, 256];
const directory = Buffer.alloc(6 + 16 * icoSizes.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(icoSizes.length, 4);
let offset = directory.length;
for (const [index, size] of icoSizes.entries()) {
  const entry = 6 + index * 16;
  directory[entry] = size === 256 ? 0 : size;
  directory[entry + 1] = size === 256 ? 0 : size;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(images.get(size).length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += images.get(size).length;
}
const ico = Buffer.concat([directory, ...icoSizes.map(size => images.get(size))]);
await writeFile(resolve(out, 'fd-v2.ico'), ico);
// Keep legacy URLs useful for browsers/bookmarks that request the old locations.
await writeFile(resolve(out, 'favicon.ico'), ico);
for (const size of [16, 32, 48, 64, 192, 512]) {
  await copyFile(resolve(out, `fd-v2-${size}.png`), resolve(out, `favicon-${size}.png`));
}
await copyFile(resolve(out, 'apple-touch-icon-v2.png'), resolve(out, 'apple-touch-icon.png'));

// The comparison is rendered UI artwork, not a screenshot of a live browser.
const old16 = await readFile(resolve(review, 'before-favicon-16.png'));
const old32 = await readFile(resolve(review, 'before-favicon-32.png'));
const uri = data => `data:image/png;base64,${data.toString('base64')}`;
const comparison = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
 <rect width="960" height="540" fill="#f3f5f8"/>
 <g font-family="Arial,sans-serif" fill="#203039">
 <text x="36" y="43" font-size="13" font-weight="700" letter-spacing="1.5">FREMONT DIGITAL / FAVICON REFINEMENT</text>
 <text x="36" y="87" font-size="29" font-weight="700">Made for the browser tab.</text>
 <text x="36" y="117" font-size="16" fill="#586778">Same FD identity. Clean vector edges. Stronger contrast.</text>
 <text x="36" y="164" font-size="14" font-weight="700">BEFORE</text>
 <text x="500" y="164" font-size="14" font-weight="700">REFINED</text>
 <rect x="36" y="184" width="424" height="58" rx="10" fill="#fff" stroke="#d5dce4"/>
 <rect x="500" y="184" width="424" height="58" rx="10" fill="#fff" stroke="#d5dce4"/>
 <image x="54" y="205" width="16" height="16" href="${uri(old16)}"/>
 <image x="518" y="205" width="16" height="16" href="${uri(images.get(16))}"/>
 <text x="82" y="219" font-size="15">Fremont Digital | Website</text>
 <text x="546" y="219" font-size="15">Fremont Digital | Website</text>
 <rect x="36" y="254" width="424" height="58" rx="10" fill="#2c2b3c"/>
 <rect x="500" y="254" width="424" height="58" rx="10" fill="#2c2b3c"/>
 <image x="54" y="275" width="16" height="16" href="${uri(old16)}"/>
 <image x="518" y="275" width="16" height="16" href="${uri(images.get(16))}"/>
 <text x="82" y="289" font-size="15" fill="#fff">Fremont Digital | Website</text>
 <text x="546" y="289" font-size="15" fill="#fff">Fremont Digital | Website</text>
 <image x="52" y="348" width="32" height="32" href="${uri(old32)}"/>
 <image x="516" y="348" width="32" height="32" href="${uri(images.get(32))}"/>
 <text x="100" y="369" font-size="14" fill="#586778">32px</text>
 <text x="564" y="369" font-size="14" fill="#586778">32px</text>
 <image x="52" y="402" width="96" height="96" href="${uri(old32)}"/>
 <image x="516" y="402" width="96" height="96" href="${uri(images.get(192))}"/>
 <text x="170" y="454" font-size="14" fill="#586778">Enlarged for inspection</text>
 <text x="634" y="454" font-size="14" fill="#586778">Vector master</text>
 <text x="36" y="525" font-size="12" fill="#586778">Illustrative browser tabs. The icons above are shown at their native 16px and 32px sizes.</text>
 </g></svg>`;
await sharp(Buffer.from(comparison)).png().toFile(resolve(review, 'favicon-review.png'));
assert.equal(hash(await readFile(originalPath)), originalHash);
await writeFile(resolve(review, 'source-record.json'), JSON.stringify({
  source: 'logos/fremont digital logo 2', source_sha256: originalHash,
  vector_master: 'site/src/assets/fd-favicon.svg', vector_sha256: hash(svg),
  treatment: 'Favicon-only optical adaptation: white FD on charcoal rounded badge, copper accent, pixel-aligned geometry. Original supplied logo files are unchanged.',
  rendered_sizes: [...images.keys()], ico_sizes: icoSizes,
}, null, 2) + '\n');
console.log('Rendered SVG, native-size PNGs, five-frame ICO, touch icon, and before/after comparison. Original logo preserved.');
