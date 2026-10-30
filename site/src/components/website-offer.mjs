import { arrow, plus } from './icons.mjs';
import { inquiryHref } from '../data/pages.mjs';
import { serviceGroups } from '../data/services.mjs';
import { serviceDetails } from '../data/service-guides.mjs';
import { escape } from './html.mjs';
import { business } from '../data/business.mjs';

export function websiteHero() {
  return `<section class="web-hero" aria-labelledby="web-title"><div class="section-container">
    <p class="eyebrow">Website design & development</p>
    <div class="web-hero-layout"><div class="web-hero-copy"><h1 id="web-title">Show what you do.<br><span>Make it easy<br> to hire you.</span></h1><p>Your website is often the first look someone gets at your business. I’ll help you decide what to show, put it in the right order, and give people a clear way to get in touch.</p><a class="button button--primary" href="${inquiryHref('web-digital','website-builds')}">Talk about your website ${arrow}</a><p class="web-byline">You’ll work directly with me, Tyler Wolfley.</p></div>
    <figure class="web-design-photo"><img src="/assets/design/web-design-1200.webp" srcset="/assets/design/web-design-640.webp 640w, /assets/design/web-design-1200.webp 1200w" sizes="(max-width: 760px) 100vw, 44vw" width="1200" height="800" alt="Website layouts being designed on a laptop and checked on a phone" fetchpriority="high"><figcaption>Photo: <a href="https://unsplash.com/photos/black-and-silver-laptop-computer-FkUTlyPLhJQ" target="_blank" rel="noopener noreferrer">Compagnons / Unsplash<span class="sr-only"> (opens in a new tab)</span></a></figcaption></figure></div>
    <nav class="web-page-nav" aria-label="On this page"><a href="#past-work">The work <span aria-hidden="true">↘</span></a><a href="#website-build">Your project <span aria-hidden="true">↘</span></a><a href="#after-launch">The practical details <span aria-hidden="true">↘</span></a><span>${business.location} · Local & remote</span></nav>
  </div></section>`;
}

export function websiteOffer() {
  return `<section id="website-build" class="web-approach" aria-labelledby="offer-heading"><div class="section-container"><div class="web-section-intro"><p class="eyebrow">The thinking behind the build</p><h2 id="offer-heading">Let’s work out what<br> your site needs to do.</h2><p>You know your business. I’ll help turn that knowledge into pages people can understand and use.</p></div>
    <div class="web-decision-list"><article><span aria-hidden="true">01</span><h3>Put the useful information first.</h3><p>Your services, the work you’ve done, and the questions customers ask before hiring you. We’ll give each a place, then shape the design around it.</p></article><article><span aria-hidden="true">02</span><h3>Make the next step obvious.</h3><p>A call, a quote request, a booking, or a purchase. We’ll choose the right route and ask for the information you actually need to handle it.</p></article><article><span aria-hidden="true">03</span><h3>Think beyond the submit button.</h3><div><p>If inquiries need to reach a spreadsheet, calendar, or customer system, I can plan that connection with the website.</p><a class="text-link" href="/automation/#demo">See a working example ${arrow}</a></div></article></div>
    <p class="web-working-note">You’ll review the design with me before launch. Pages, features, content, revisions, price, and timing are agreed before the build starts.</p></div></section>`;
}

export function websiteServices() {
  const group = serviceGroups.find(group => group.id === 'web-digital');
  return `<section id="service-details" class="web-services"><div class="section-container web-services-layout"><div><p class="eyebrow">Starting fresh or making changes</p><h2>A new site isn’t<br> always the answer.</h2><p>If you already have one, send the link and tell me what isn’t working for you. We can discuss what to keep, what to improve, and whether a rebuild makes sense.</p></div><div class="service-list">${group.services.map(service=>`<details class="service-detail"><summary>${escape(service.name)}${plus}</summary><div><p>${escape(serviceDetails[service.id])}</p><a href="${escape(inquiryHref(group.id,service.id))}">Discuss ${escape(service.name.toLowerCase())} ${arrow}</a></div></details>`).join('')}</div></div></section>`;
}

export function websiteSupport() {
  const items = [
    ['What will it cost?', 'I quote for the pages, content, and features we agree on. Hosting, domain renewals, and any paid tools are identified separately, so you can see both the build cost and the costs of keeping it running.'],
    ['Can I make my own updates?', 'Yes, if that’s how you want to manage it. We’ll choose a suitable editing setup and go through it together. You can also send changes to me, arrange ongoing support, or use a mix of both.'],
    ['Who controls the website and accounts?', 'Your domain and business accounts should be registered to you. The handover covers the agreed site files, account access, and connection notes. Any platform, licensing, or transfer limits are discussed before the build.'],
    ['What happens after launch?', 'Support is agreed for your project: individual updates, ongoing care, or a combination. We’ll set out the work covered, how to request it, and what it costs.'],
  ];
  return `<section id="after-launch" class="website-support section-space" aria-labelledby="support-heading"><div class="section-container support-layout"><div><p class="eyebrow">Before you commit</p><h2 id="support-heading">The practical details.</h2><p>Cost, control, and what happens after the site goes live.</p></div><div class="plain-faq">${items.map(([q,a])=>`<details><summary>${q}${plus}</summary><p>${a}</p></details>`).join('')}</div></div></section>`;
}

export function websiteClosing() {
  return `<section class="web-closing"><div class="section-container"><p class="eyebrow">Start with your business</p><div class="web-closing-layout"><h2>What would you like<br> your website to do?</h2><div><p>Send your current site, or tell me what you’re starting. A little about your business and what you want to change is enough to begin.</p><a class="button button--primary" href="${inquiryHref('web-digital','website-builds')}">Tell me about your project ${arrow}</a><a class="web-call" href="${business.phoneLink}">Or call ${business.phone}</a></div></div></div></section>`;
}
