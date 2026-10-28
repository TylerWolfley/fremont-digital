import { homepage } from '../data/homepage.mjs';
import { arrow, serviceIcons } from './icons.mjs';
import { escape } from './html.mjs';

export function businessFeature() {
  const copy = homepage.business;
  return `<section class="business-section section-space" aria-labelledby="business-heading">
    <div class="section-container business-layout">
      <div class="business-copy"><p class="eyebrow">${escape(copy.eyebrow)}</p><h2 id="business-heading">${escape(copy.title)}<em>${escape(copy.accent)}</em></h2><p>${escape(copy.description)}</p><a class="text-link" href="#business-tech">${escape(copy.action)}${arrow}</a></div>
      <div class="connection-list">${copy.connections.map(item => `<a class="connection" href="#${item.target}"><span class="connection__icon">${serviceIcons[item.icon]}</span><span><small>${escape(item.label)}</small><strong>${escape(item.detail)}</strong></span>${arrow}</a>`).join('\n')}</div>
    </div>
  </section>`;
}
