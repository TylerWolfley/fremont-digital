import { arrow, plus } from './icons.mjs';
import { inquiryHref } from '../data/pages.mjs';

export function websiteOffer() {
  const items = [
    ['Plan the right pages', 'Your services, your audience, and the decisions your customers need to make.'],
    ['Design, build, and review', 'Layouts for phones and larger screens, with your feedback before launch.'],
    ['Connect and launch', 'The agreed forms, booking or shop features, domain setup, and final checks.'],
    ['Hand it over', 'A walkthrough of the site, the accounts, and how updates will be handled.'],
  ];
  return `<section id="website-build" class="website-offer section-space" aria-labelledby="offer-heading"><div class="section-container offer-layout"><div class="offer-intro"><p class="eyebrow">Your website project</p><h2 id="offer-heading">Built around the job<br> it needs to do.</h2><p>We’ll agree on the pages, features, content, review rounds, price, and timing before the build starts.</p><a class="text-link" href="${inquiryHref('web-digital','website-builds')}">Tell me about your website ${arrow}</a></div><div><ol class="deliverable-list">${items.map(([title,text])=>`<li><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol><p class="quote-scope">Hosting, domain renewals, and paid tools are identified separately. Online stores and custom integrations are quoted for the work involved.</p></div></div></section>`;
}

export function websiteSupport() {
  const items = [
    ['Can I update the website myself?', 'If you want to edit content yourself, we’ll choose an editing setup for that and include a walkthrough. If you prefer to send changes to me, that works too. We’ll decide this before the build so you know how updates will happen.'],
    ['Who controls the domain and accounts?', 'Your domain and business accounts should be registered to you. I’ll help set up and connect the services, with your access retained. The handover identifies the accounts, subscriptions, and responsibilities involved.'],
    ['What if I work with another developer later?', 'The handover includes the agreed site files, account information, and connection notes. We’ll identify any platform, licensing, or transfer limits before building, so you know what moving the site would involve.'],
    ['What support is available after launch?', 'Individual updates, ongoing care, or a combination—depending on our agreement. We’ll set out the work covered, how requests are handled, and the price. The build does not commit you to an undefined support plan.'],
  ];
  return `<section id="after-launch" class="website-support section-space" aria-labelledby="support-heading"><div class="section-container support-layout"><div><p class="eyebrow">After it goes live</p><h2 id="support-heading">Know how your<br> website is managed.</h2><p>Editing, account access, and support should be clear from the start.</p></div><div class="plain-faq">${items.map(([q,a])=>`<details><summary>${q}${plus}</summary><p>${a}</p></details>`).join('')}</div></div></section>`;
}
