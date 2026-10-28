import { homepage } from '../data/homepage.mjs';
import { business, inquiryLink } from '../data/business.mjs';
import { arrow } from './icons.mjs';
import { escape } from './html.mjs';

export function contact() {
  const copy = homepage.contact;
  return `<section id="contact" class="contact-section section-space" aria-labelledby="contact-heading">
    <div class="section-container"><div class="contact-card">
      <div class="contact-card__heading"><p class="eyebrow">A good place to start</p><span class="contact-stamp" aria-label="Based in Wyoming">WY<span>LOCAL</span></span><h2 id="contact-heading">${escape(copy.title)}<span>${escape(copy.accent)}</span></h2><p>${escape(copy.eyebrow)}</p></div>
      <div class="contact-details"><p>${escape(copy.description)}</p><a class="button button--dark" href="${escape(inquiryLink())}">${escape(copy.action)}${arrow}</a><div class="contact-email"><a class="contact-address" href="mailto:${escape(business.email)}">${escape(business.email)}</a><button class="copy-email" type="button" data-copy-email="${escape(business.email)}" hidden>Copy email address</button></div><small>Opens your email app.</small><p class="copy-status" role="status" aria-live="polite" data-copy-status></p></div>
    </div></div>
  </section>`;
}
