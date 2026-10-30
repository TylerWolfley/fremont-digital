import { business, inquiryLink } from '../data/business.mjs';
import { serviceGuides } from '../data/service-guides.mjs';
import { arrow, plus } from './icons.mjs';
import { escape } from './html.mjs';

export function contact({ contactEndpoint = '' } = {}) {
  const options = Object.entries(serviceGuides).map(([id, guide]) => `<option value="${id}" ${id === 'general' ? 'selected' : ''} data-context-label="${escape(guide.contextLabel)}" data-context-placeholder="${escape(guide.contextPlaceholder)}" data-message-prompt="${escape(guide.messagePrompt)}" data-timing-label="${escape(guide.timingLabel)}">${escape(guide.label)}</option>`).join('');
  return `<section id="contact" class="contact-section section-space" aria-labelledby="contact-heading">
    <div class="section-container contact-layout">
      <div class="contact-copy">
        <p class="eyebrow">Let’s make a start</p><h2 id="contact-heading">What can I<br>help you with?</h2>
        <p>Tell me about the project or problem. I’ll follow up using your preferred contact method so we can discuss the next step.</p>
        <a class="contact-phone" href="${business.phoneLink}">${business.phone}</a>
        <a class="contact-address" href="${escape(inquiryLink())}">${business.email}</a>
        <div class="coverage"><h3>All of Fremont County, Wyoming.</h3><p>Remote help, visits to your home or business, and arranged device drop-off are available.</p><p>For device drop-off, call first to arrange a handoff. There isn’t a public storefront yet.</p></div>
      </div>
      <div class="inquiry-panel">
        <form class="inquiry-form" data-inquiry-form data-endpoint="${escape(contactEndpoint)}" hidden>
          <div class="form-heading"><h3>Start a conversation</h3><p>A name, a way to reach you, and a few details. That’s enough to start. <span>Required fields are marked *.</span></p></div>
          ${contactEndpoint ? '' : '<p class="preview-notice">Preview: you can fill out and review this request. Online sending will be connected before launch. To get in touch now, call or email.</p>'}
          <div class="form-row">
            <div><label for="inquiry-name">Your name *</label><input id="inquiry-name" name="name" autocomplete="name" maxlength="100" required></div>
            <div><label for="inquiry-category">What do you need?</label><select id="inquiry-category" name="category">${options}</select></div>
          </div>
          <input type="hidden" name="service" value=""><p class="chosen-service" data-chosen-service hidden></p>
          <div class="form-row">
            <div><label for="inquiry-method">Reply by</label><select id="inquiry-method" name="method"><option value="phone">Phone</option><option value="email">Email</option></select></div>
            <div><label for="inquiry-contact" data-contact-label>Phone number *</label><input id="inquiry-contact" name="contact" type="tel" autocomplete="tel" maxlength="160" required></div>
          </div>
          <label for="inquiry-message">What can I help with? *</label>
          <textarea id="inquiry-message" name="message" rows="4" minlength="10" maxlength="4000" required aria-describedby="message-hint"></textarea>
          <p id="message-hint" class="field-hint" data-message-hint>Tell me what you need help with. We can work out where to start.</p>
          <details class="form-extras"><summary>Add a few more details <span>(optional)</span>${plus}</summary>
            <label for="inquiry-context" data-context-label>A little context <span>(optional)</span></label><input id="inquiry-context" name="context" maxlength="240" placeholder="Your business, device, or project">
            <div class="form-row">
              <div><label for="inquiry-location">Town or area <span>(optional)</span></label><input id="inquiry-location" name="location" autocomplete="address-level2" maxlength="100" placeholder="Where are you based?"></div>
              <div><label for="inquiry-timing" data-timing-label>Preferred timeframe <span>(optional)</span></label><input id="inquiry-timing" name="timing" maxlength="160" placeholder="If you have a date in mind"></div>
            </div>
          </details>
          <div class="form-trap" aria-hidden="true"><label for="inquiry-company-url">Leave this blank</label><input id="inquiry-company-url" name="company_url" tabindex="-1" autocomplete="off"></div>
          <p class="privacy-note">Your details are used to respond to this request${contactEndpoint.startsWith('https://formspree.io/f/') ? ' and are processed by Formspree' : ''}. Please don’t include passwords, payment details, or private files.</p>
          <button class="button button--primary form-submit" type="submit" data-submit>${contactEndpoint ? 'Send request' : 'Review request'} ${arrow}</button>
          <p class="form-status" role="status" aria-live="polite" tabindex="-1" data-form-status></p>
          <div class="request-review" data-request-review hidden><h4>Your request preview</h4><dl data-review-details></dl><p>This request has not been sent. Call or email using the details alongside the form.</p></div>
        </form>
        <noscript><div class="no-script-contact"><h3>Let’s talk.</h3><p>Call <a href="${business.phoneLink}">${business.phone}</a> or <a href="mailto:${business.email}">send an email</a> to get started.</p></div></noscript>
      </div>
    </div>
  </section>`;
}
