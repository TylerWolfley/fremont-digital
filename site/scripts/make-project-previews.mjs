// Optimize the real, dated browser captures. No mock client work or retouching.
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const arg = process.argv.indexOf('--sharp-module');
const sharp = require(arg === -1 ? 'sharp' : resolve(process.argv[arg + 1]));
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const out = resolve(root, 'site/dist/assets/work');
await mkdir(out, { recursive: true });
for (const [source, target] of [['trading-company-source.png', 'trading-company.webp'], ['renewal-source.png', 'renewal.webp']]) {
  const info = await sharp(resolve(root, 'reviews/07-offer', source)).resize({ width: 760, withoutEnlargement: true }).webp({ quality: 82 }).toFile(resolve(out, target));
  console.log(`${target}: ${info.width}×${info.height}, ${info.size} bytes`);
}
