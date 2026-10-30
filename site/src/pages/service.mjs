import { pageShell } from './shell.mjs';
import { pageById } from '../data/pages.mjs';
import { serviceGuides } from '../data/service-guides.mjs';
import { serviceHero, serviceContent, automationFlow, screenPricing, nextStep } from '../components/page-sections.mjs';

export function servicePage(id, config = {}) {
  const page = pageById[id];
  const guide = serviceGuides[page.category];
  return pageShell(page, [serviceHero(page, guide), id === 'automation' ? automationFlow() : '', id === 'repairs' ? screenPricing() : '', serviceContent(page, guide), nextStep(page.category)].join('\n'), config);
}
