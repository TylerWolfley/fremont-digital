import { homepage } from '../data/homepage.mjs';
import { business, inquiryLink } from '../data/business.mjs';
import { arrow, pin } from './icons.mjs';
import { escape } from './html.mjs';

export function contact() {
  const copy = homepage.contact;
  return `<section id="contact" class="contact-section section-space" aria-labelledby="contact-heading">
    <div class="section-container contact-layout">
      <div><p class="eyebrow contact-location">${pin}${escape(copy.eyebrow)}</p><h2 id="contact-heading">${escape(copy.title)}<em>${escape(copy.accent)}</em></h2></div>
      <div class="contact-details"><p>${escape(copy.description)}</p><a class="button button--dark" href="${escape(inquiryLink())}">${escape(copy.action)}${arrow}</a><a class="contact-address" href="mailto:${escape(business.email)}">${escape(business.email)}</a><small>Opens your email app.</small></div>
    </div>
  </section>`;
}
