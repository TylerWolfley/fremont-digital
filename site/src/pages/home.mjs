import { pageShell } from './shell.mjs';
import { pageById } from '../data/pages.mjs';
import { hero } from '../components/hero.mjs';
import { homeServices, ownerIntro, homeClosing } from '../components/home-editorial.mjs';

export function homePage(config = {}) {
  return pageShell(pageById.home, [hero(), homeServices(), ownerIntro(), homeClosing()].join('\n'), config);
}
