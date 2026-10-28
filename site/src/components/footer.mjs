import { business } from '../data/business.mjs';
import { serviceGroups } from '../data/services.mjs';
import { arrow } from './icons.mjs';
import { escape } from './html.mjs';

export function footer() {
  return `<footer class="site-footer"><div class="section-container">
    <div class="footer-main"><a class="footer-brand" href="#top" aria-label="Fremont Digital, back to top"><img src="/assets/brand/fremont-digital-wordmark.webp" width="600" height="141" alt="Fremont Digital" loading="lazy"></a><nav aria-label="Footer services">${serviceGroups.map(group => `<a href="#${group.id}">${escape(group.navLabel)}</a>`).join('\n')}</nav></div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${escape(business.name)}</span><span>${escape(business.location)}</span><a href="#top">Back to top ${arrow}</a></div>
  </div></footer>`;
}
