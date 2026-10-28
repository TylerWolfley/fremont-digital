import { business, inquiryLink } from '../data/business.mjs';
import { serviceGroups } from '../data/services.mjs';
import { arrow, chevron, pin } from './icons.mjs';
import { escape } from './html.mjs';

function serviceDisclosure(group, prefix) {
  const labelId = `${prefix}-${group.id}`;
  return `<details class="service-disclosure" data-service-disclosure>
    <summary id="${labelId}">${escape(group.navLabel)}${chevron}</summary>
    <div class="service-panel" aria-labelledby="${labelId}">
      <div class="service-panel__inner">
        <div class="service-panel__intro">
          <p class="eyebrow">${escape(group.navLabel)}</p>
          <h2>${escape(group.title)}</h2>
          <p class="service-panel__description">${escape(group.description)}</p>
        </div>
        <ul class="service-list">
          ${group.services.map(service => `<li><a href="${escape(inquiryLink(`Fremont Digital inquiry: ${service.name}`))}" aria-label="Email about ${escape(service.name)}"><span><strong>${escape(service.name)}</strong><span>${escape(service.description)}</span></span>${arrow}</a></li>`).join('\n')}
        </ul>
        <div class="service-panel__footer"><p>Something else in mind? <a href="${escape(inquiryLink())}">Ask me about it.</a></p><span>Service inquiries open in your email app.</span></div>
      </div>
    </div>
  </details>`;
}

export function header() {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-site-header>
    <div class="utility-bar"><div class="header-container utility-bar__inner"><span>${pin}${business.location}</span><a href="mailto:${business.email}">${business.email}</a></div></div>
    <div class="header-main"><div class="header-container header-main__inner">
      <a class="brand" href="/" aria-label="${business.name} home"><img src="/assets/brand/fremont-digital-wordmark.webp" width="600" height="141" alt="${business.name}" fetchpriority="high"></a>
      <nav class="desktop-nav" aria-label="Services">${serviceGroups.map(group => serviceDisclosure(group, 'desktop')).join('\n')}</nav>
      <a class="contact-button desktop-contact" href="${escape(inquiryLink())}">Get in touch ${arrow}</a>
      <details class="mobile-menu" data-mobile-menu>
        <summary aria-label="Navigation menu"><span class="menu-label">Menu</span><span class="menu-icon" aria-hidden="true"><i></i><i></i></span></summary>
        <div class="mobile-menu__panel"><nav aria-label="Mobile services">${serviceGroups.map(group => serviceDisclosure(group, 'mobile')).join('\n')}</nav><div class="mobile-contact"><a class="contact-button" href="${escape(inquiryLink())}">Get in touch ${arrow}</a><a class="mobile-email" href="mailto:${business.email}">${business.email}</a></div></div>
      </details>
    </div></div>
  </header>`;
}
