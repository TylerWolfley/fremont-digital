import { homepage } from '../data/homepage.mjs';
import { serviceGroups } from '../data/services.mjs';
import { inquiryLink } from '../data/business.mjs';
import { arrow, groupIcons } from './icons.mjs';
import { escape } from './html.mjs';

export function services() {
  const copy = homepage.services;
  return `<section id="services" class="services-section section-space" aria-labelledby="services-heading">
    <div class="section-container">
      <div class="section-heading"><div><p class="eyebrow">${escape(copy.eyebrow)}</p><h2 id="services-heading">${escape(copy.title).replace('\n', '<br>')}</h2></div><div class="section-heading__aside"><p>${escape(copy.description)}</p><span>Choose any service to start an email.</span></div></div>
      <div class="service-directory">
        ${serviceGroups.map((group, index) => `<article class="service-chapter" id="${group.id}" aria-labelledby="${group.id}-heading">
          <div class="service-chapter__intro">
            <div class="service-chapter__label"><span class="chapter-number" aria-hidden="true">0${index + 1}</span><span>${escape(group.navLabel)}</span><span class="category-icon">${groupIcons[group.id]}</span></div>
            <h3 id="${group.id}-heading" tabindex="-1">${escape(group.title)}</h3>
            <p>${escape(group.description)}</p>
          </div>
          <ul class="directory-links">${group.services.map(service => `<li><a href="${escape(inquiryLink(`Fremont Digital inquiry: ${service.name}`))}" aria-label="Email about ${escape(service.name)}"><span><strong>${escape(service.name)}</strong><span>${escape(service.description)}</span></span>${arrow}</a></li>`).join('\n')}</ul>
        </article>`).join('\n')}
      </div>
      <p class="services-footnote"><span aria-hidden="true">✦</span> Don’t see your project here? <a href="#contact">Let’s talk about it.${arrow}</a></p>
    </div>
  </section>`;
}
