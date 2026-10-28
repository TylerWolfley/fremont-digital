import { homepage } from '../data/homepage.mjs';
import { serviceGroups } from '../data/services.mjs';
import { inquiryLink } from '../data/business.mjs';
import { arrow, groupIcons, plus } from './icons.mjs';
import { escape } from './html.mjs';

export function services() {
  const copy = homepage.services;
  return `<section id="services" class="services-section section-space" aria-labelledby="services-heading">
    <div class="section-container">
      <div class="section-heading"><div><p class="eyebrow">${escape(copy.eyebrow)}</p><h2 id="services-heading">${escape(copy.title)}</h2></div><p>${escape(copy.description)}</p></div>
      <div class="service-directory">
        ${serviceGroups.map((group, index) => `<details class="service-category" id="${group.id}" name="service-directory"${index === 0 ? ' open' : ''}>
          <summary><span class="index-number">0${index + 1}</span><span class="category-icon">${groupIcons[group.id]}</span><h3>${escape(group.navLabel)}</h3><span class="category-hint">${escape(copy.hints[group.id])}</span><span class="category-toggle">${plus}</span></summary>
          <div class="service-category__body">
            <div class="service-category__intro"><p>${escape(group.description)}</p><span>Choose a service to start an email inquiry.</span></div>
            <ul class="directory-links">${group.services.map(service => `<li><a href="${escape(inquiryLink(`Fremont Digital inquiry: ${service.name}`))}" aria-label="Email about ${escape(service.name)}"><span><strong>${escape(service.name)}</strong><span>${escape(service.description)}</span></span>${arrow}</a></li>`).join('\n')}</ul>
          </div>
        </details>`).join('\n')}
      </div>
      <p class="services-footnote">Not sure where your project fits? <a href="#contact">Start with a conversation.${arrow}</a></p>
    </div>
  </section>`;
}
