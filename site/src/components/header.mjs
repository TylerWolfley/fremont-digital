import { business, inquiryLink } from '../data/business.mjs';
import { serviceGroups } from '../data/services.mjs';
import { arrow, chevron, groupIcons } from './icons.mjs';
import { escape } from './html.mjs';

const categoryLinks = () => serviceGroups.map(group => `<a href="#${group.id}" data-category-link="${group.id}"><span class="nav-category-icon">${groupIcons[group.id]}</span><span>${escape(group.navLabel)}</span>${arrow}</a>`).join('\n');
export function header() {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-site-header><div class="header-container">
    <a class="brand" href="/" aria-label="${business.name} home"><img src="/assets/brand/fremont-digital-wordmark.webp" width="600" height="141" alt="${business.name}" fetchpriority="high"></a>
    <nav class="desktop-nav" aria-label="Main navigation">
      <details class="service-disclosure" data-service-disclosure><summary>Services ${chevron}</summary><div class="service-menu">${categoryLinks()}<a class="service-menu-all" href="#services">Explore services ${arrow}</a></div></details>
      <a href="#how-it-works">How it works</a><a href="#questions">FAQs</a>
    </nav>
    <a class="header-phone" href="${business.phoneLink}" aria-label="Call Fremont Digital at ${business.phone}"><span class="phone-full">${business.phone}</span><span class="phone-short">Call</span></a>
    <details class="mobile-menu" data-mobile-menu><summary aria-label="Navigation menu">Menu <span class="menu-icon" aria-hidden="true"><i></i><i></i></span></summary><div class="mobile-menu__panel"><nav aria-label="Mobile navigation">${categoryLinks()}<a href="#how-it-works">How it works</a><a href="#questions">FAQs</a><a href="#contact">Get in touch ${arrow}</a></nav><a class="mobile-email" href="${escape(inquiryLink())}">${business.email}</a></div></details>
  </div></header>`;
}
