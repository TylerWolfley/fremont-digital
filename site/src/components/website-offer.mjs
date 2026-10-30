import { arrow } from './icons.mjs';
import { inquiryHref } from '../data/pages.mjs';

export function websiteOffer() {
  const deliverables = [
    ['Pages & content', 'A plan for the pages your customers need, with your services, business details, and next steps in the right places.'],
    ['Design & build', 'A design that fits your business, built to work on phones and larger screens. You review it before it goes live.'],
    ['Forms & connections', 'The agreed contact forms, booking links, or other features, checked from the customer’s first click through to the destination.'],
    ['Launch & handover', 'Domain connection, page titles and descriptions, final checks, and a walkthrough of how the site and its accounts are managed.'],
  ];
  return `<section class="website-offer section-space" id="website-build" aria-labelledby="offer-heading"><div class="section-container offer-layout">
    <div class="offer-intro"><p class="eyebrow">The website build</p><h2 id="offer-heading">Know what you’re getting.<br> Before we start.</h2><p>A new website or a rebuild starts with your business: what you sell, what customers need to know, and what you want them to do.</p><a class="text-link" href="${inquiryHref('web-digital','website-builds')}">Talk through your website ${arrow}</a></div>
    <div><ol class="deliverable-list">${deliverables.map(([title,text],i)=>`<li><span class="deliverable-number" aria-hidden="true">0${i+1}</span><div><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ol>
    <div class="quote-scope"><h3>What goes in your quote</h3><p>The pages, features, content work, review rounds, timing, and project price. Hosting, domain renewals, and paid tools are identified separately, so you can see the costs beyond the build.</p><p>Online stores, custom integrations, photography, and larger content projects are quoted for the work involved.</p></div></div>
  </div></section>`;
}

export function websiteSupport() {
  return `<section class="website-support section-space" id="after-launch" aria-labelledby="support-heading"><div class="section-container">
    <div class="support-heading"><div><p class="eyebrow">After launch</p><h2 id="support-heading">Support that fits how you work.</h2></div><p>Need occasional changes, regular help, or a bit of both? We’ll agree on the arrangement for your business.</p></div>
    <div class="support-options"><article><span class="offer-label">When you need it</span><h3>Individual updates</h3><p>A new service page, updated photos, a change to your booking setup. Send what you need and we’ll agree on the work and price.</p></article><article><span class="offer-label">An ongoing agreement</span><h3>Regular care</h3><p>For businesses that want continuing help. We’ll set out the updates, checks, and support covered, how requests are handled, and the cost.</p></article></div>
    <p class="support-note">The build and ongoing support are separate parts of the agreement. Coverage, response arrangements, account access, and third-party costs are discussed before you commit.</p>
  </div></section>`;
}
