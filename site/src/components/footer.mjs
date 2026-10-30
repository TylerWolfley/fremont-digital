import { business } from '../data/business.mjs';
import { escape } from './html.mjs';
export function footer() {
  return `<footer class="site-footer"><div class="section-container footer-main"><a class="footer-brand" href="/" aria-label="Fremont Digital home"><img src="/assets/brand/fremont-digital-wordmark.webp" width="600" height="141" alt="Fremont Digital" loading="lazy"></a><nav aria-label="Footer navigation"><a href="/websites/">Websites</a><a href="/automation/">Automation</a><a href="/contact/">Contact</a><a href="${escape(business.facebookUrl)}">Facebook</a><a href="${business.phoneLink}">${business.phone}</a></nav><p>© ${new Date().getFullYear()} ${escape(business.name)}<span>${escape(business.location)}</span></p></div></footer>`;
}
