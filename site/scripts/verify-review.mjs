// Guard against the file:// preview loading C:\ instead of the website.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
for (const folder of ['02-header', '03-layout']) {
  const directory = resolve(root, '../reviews', folder);
  const html = await readFile(resolve(directory, 'review.html'), 'utf8');
  assert.equal(html, await readFile(resolve(directory, 'offline-review.html'), 'utf8'), `${folder}: both preview filenames must work independently.`);
  const frame = html.match(/<iframe\b[^>]*\bsrcdoc="([^"]+)"[^>]*>/);
  assert(frame, `${folder}: preview content must be embedded.`);
  const frameAttributes = frame[0].replace(/srcdoc="[^"]*"/, '');
  assert(!/\ssrc=/.test(frameAttributes), `${folder}: iframe must not navigate to a file or server.`);
  const page = frame[1].replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
  assert.match(page, /<base href="about:srcdoc">/);
  assert.match(page, /Fremont Digital/);
  if (folder === '03-layout') assert.match(page, /Fremont County, Wyoming/);
  for (const document of [html.replace(frame[0], ''), page]) {
    assert(!/(?:src|href)="\//.test(document), `${folder}: root-relative resources or links break under file://.`);
    assert(!/url\(['"]?\//.test(document), `${folder}: CSS assets must be embedded.`);
    assert(!/<script\b[^>]*\bsrc=/.test(document), `${folder}: JavaScript must be embedded.`);
    assert(!document.includes('data-preview-content'), `${folder}: unfilled template placeholder.`);
    for (const script of document.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
      if (script[0].startsWith('<script type="application/ld+json"')) JSON.parse(script[1]);
      else new vm.Script(script[1]);
    }
  }
}
console.log('Passed: both preview filenames embed the website, assets, and valid scripts without filesystem-root links. Browser QA remains separate.');
