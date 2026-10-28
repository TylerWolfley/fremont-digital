import { homepage } from '../data/homepage.mjs';
import { inquiryLink } from '../data/business.mjs';
import { arrow } from './icons.mjs';
import { escape } from './html.mjs';

export function businessFeature() {
  const copy = homepage.business;
  return `<section class="business-section section-space" aria-labelledby="business-heading">
    <div class="section-container">
      <div class="business-intro"><div><p class="eyebrow">${escape(copy.eyebrow)}</p><h2 id="business-heading">${escape(copy.title)}<span>${escape(copy.accent)}</span></h2></div><div><p>${escape(copy.description)}</p><a class="text-link" href="${escape(inquiryLink('Fremont Digital inquiry: My business setup'))}">${escape(copy.action)}${arrow}</a></div></div>
      <ol class="business-journey">${copy.connections.map((item, index) => `<li><div class="journey-label"><span>0${index + 1} / ${escape(item.label)}</span>${arrow}</div><h3>${escape(item.detail)}</h3><p>${escape(item.description)}</p><a class="text-link" href="#${item.target}">${escape(item.link)}${arrow}</a></li>`).join('\n')}</ol>
    </div>
  </section>`;
}
