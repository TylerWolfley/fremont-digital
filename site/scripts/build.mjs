import { copyFile, mkdir, writeFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage } from '../src/pages/home.mjs';
import { serviceGroups } from '../src/data/services.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'dist');
const ids = new Set();
for (const group of serviceGroups) {
  for (const item of [group, ...group.services]) {
    if (!/^[a-z][a-z0-9-]*$/.test(item.id) || ids.has(item.id)) throw new Error(`Invalid or duplicate service ID: ${item.id}`);
    ids.add(item.id);
  }
}

for (const folder of ['styles', 'scripts']) {
  await mkdir(resolve(out, folder), { recursive: true });
  for (const name of await readdir(resolve(root, 'src', folder))) {
    await copyFile(resolve(root, 'src', folder, name), resolve(out, folder, name));
  }
}
const html = homePage();
// Catch broken local asset references before any preview is served.
for (const match of html.matchAll(/(?:href|src)="(\/[^"#]+)"/g)) {
  await access(resolve(out, '.' + match[1]));
}
await writeFile(resolve(out, 'index.html'), html);
console.log(`Built header and navigation: ${serviceGroups.length} service groups, ${ids.size-serviceGroups.length} current services.`);
