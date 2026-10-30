import { pageShell } from './shell.mjs';
import { pageById } from '../data/pages.mjs';
import { hero } from '../components/hero.mjs';
import { processSection } from '../components/process.mjs';
import { homeServices, nextStep } from '../components/page-sections.mjs';

export function homePage(config = {}) {
  return pageShell(pageById.home, [hero(), homeServices(), processSection(), nextStep()].join('\n'), config);
}
