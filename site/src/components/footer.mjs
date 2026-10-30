import { business } from '../data/business.mjs';
import { escape } from './html.mjs';
export function footer() {
  return `<footer class="site-footer"><div class="section-container footer-main"><a class="footer-brand" href="#top" aria-label="Fremont Digital, back to top"><img src="/assets/brand/fremont-digital-wordmark.webp" width="600" height="141" alt="Fremont Digital" loading="lazy"></a><nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#questions">FAQs</a><a href="${escape(business.facebookUrl)}">Facebook</a><a href="${business.phoneLink}">${business.phone}</a></nav><p>© ${new Date().getFullYear()} ${escape(business.name)}<span>${escape(business.location)}</span></p></div></footer>`;
}
