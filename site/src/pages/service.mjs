import { pageShell } from './shell.mjs';
import { pageById } from '../data/pages.mjs';
import { serviceGuides } from '../data/service-guides.mjs';
import { serviceHero, serviceContent, screenPricing, nextStep } from '../components/page-sections.mjs';
import { websiteOffer, websiteSupport } from '../components/website-offer.mjs';
import { pastWorkLinks } from '../components/past-work.mjs';
import { automationDemo, automationConfidence } from '../components/automation-demo.mjs';

export function servicePage(id, config = {}) {
  const page = pageById[id];
  const guide = serviceGuides[page.category];
  return pageShell(page, [serviceHero(page, guide), id === 'websites' ? pastWorkLinks() + websiteOffer() + websiteSupport() : '', id === 'automation' ? automationDemo() + automationConfidence() : '', id === 'repairs' ? screenPricing() : '', serviceContent(page, guide), nextStep(page.category)].join('\n'), config);
}
