import { business, inquiryLink } from '../data/business.mjs';
import { pageById } from '../data/pages.mjs';
import { arrow, chevron } from './icons.mjs';
import { escape } from './html.mjs';

export function header(current = 'home') {
  const link = id => { const page = pageById[id]; return `<a href="${page.path}"${current === id ? ' aria-current="page"' : ''}>${escape(page.label)}</a>`; };
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-site-header><div class="header-container">
    <a class="brand" href="/" aria-label="${business.name} home"><img src="/assets/brand/fremont-digital-wordmark.webp" width="600" height="141" alt="${business.name}" fetchpriority="high"></a>
    <nav class="desktop-nav" aria-label="Main navigation">
      ${link('websites')}${link('automation')}
      <details class="service-disclosure" data-service-disclosure><summary>More services ${chevron}</summary><div class="service-menu">${link('repairs')}${link('media')}</div></details>
      ${link('contact')}
    </nav>
    <a class="header-phone" href="${business.phoneLink}" aria-label="Call Fremont Digital at ${business.phone}"><span class="phone-full">${business.phone}</span><span class="phone-short">Call</span></a>
    <details class="mobile-menu" data-mobile-menu><summary aria-label="Navigation menu">Menu <span class="menu-icon" aria-hidden="true"><i></i><i></i></span></summary><div class="mobile-menu__panel"><nav aria-label="Mobile navigation">${link('home')}${link('websites')}${link('automation')}${link('contact')}<p class="mobile-nav-label">More services</p>${link('repairs')}${link('media')}</nav><a class="mobile-email" href="${escape(inquiryLink())}">${business.email} ${arrow}</a></div></details>
  </div></header>`;
}
