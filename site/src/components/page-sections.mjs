import { pageById, inquiryHref } from '../data/pages.mjs';
import { serviceGroups } from '../data/services.mjs';
import { serviceDetails } from '../data/service-guides.mjs';
import { screenOptions } from '../data/repair-pricing.mjs';
import { pastWorkLinks } from './past-work.mjs';
import { escape } from './html.mjs';
import { arrow, plus, groupIcons } from './icons.mjs';

export function homeServices() {
  const priorities = [
    { id: 'websites', title: 'Give customers the information they came for.', text: 'Your services, your work, and a way to get in touch. I build the pages around what customers need to know before they call, book, or buy.', items: ['New websites and redesigns', 'Online booking, payments, and forms', 'Updates when your business changes'] },
    { id: 'automation', title: 'Stop entering the same information twice.', text: 'Connect the tools you already use so inquiries, bookings, and follow-ups don’t depend on copying details from one place to another.', items: ['Inquiries sent to the right place', 'Reminders and follow-up tasks', 'Connected forms, calendars, and customer lists'] },
  ];
  return `<section id="services" class="section-space" aria-labelledby="services-heading"><div class="section-container"><p class="eyebrow">Built for small businesses</p><h2 id="services-heading">A better website. Less work behind the scenes.</h2><p class="section-lead">Build your online presence, connect the tools behind it, or tackle both together.</p><div class="priority-grid">${priorities.map(item => { const page = pageById[item.id]; return `<article class="priority-card"><span class="category-icon" data-icon="${page.category}">${groupIcons[page.category]}</span><p class="eyebrow">${page.label}</p><h3>${item.title}</h3><p>${item.text}</p><ul>${item.items.map(text => `<li>${text}</li>`).join('')}</ul><a class="text-link" href="${page.path}">Explore ${item.id === 'websites' ? 'websites' : 'business automation'} ${arrow}</a></article>`; }).join('')}</div><div class="other-services"><p>Repairs and creative services are also available.</p><a href="/repairs/">Repairs & tech help ${arrow}</a><a href="/media/">Photography & media ${arrow}</a></div></div></section>`;
}

export function serviceHero(page, guide) {
  const repair = page.id === 'repairs';
  return `<section class="page-hero"><div class="section-container"><a class="breadcrumb" href="/">Fremont Digital ${arrow}</a><p class="eyebrow">${escape(page.label)} · Fremont County, Wyoming</p><h1>${escape(guide.title)}</h1><p class="page-intro">${escape(guide.introduction)}</p><div class="hero-actions"><a class="button button--primary" href="${escape(repair ? inquiryHref(page.category, 'screen-repair') : inquiryHref(page.category))}">${repair ? 'Get a screen repair quote' : page.id === 'websites' ? 'Discuss your website' : page.id === 'automation' ? 'Talk through a task' : 'Discuss your shoot or edit'} ${arrow}</a>${repair ? '<a class="text-link" href="#screen-pricing">Compare screen options</a>' : page.id === 'websites' ? '<a class="text-link" href="#past-work">See a couple of sites I’ve built</a>' : '<a class="text-link" href="#service-details">See the services</a>'}</div></div></section>`;
}

export function serviceContent(page, guide) {
  const group = serviceGroups.find(group => group.id === page.category);
  const heading = { websites: 'Website services', automation: 'Automation & business tools', repairs: 'Repairs & everyday tech help', media: 'Photography, video & editing' }[page.id];
  return `<section id="service-details" class="section-space" aria-labelledby="detail-heading"><div class="section-container"><div class="service-panel"><h2 id="detail-heading">${heading}</h2><div class="service-depth"><div class="service-list"><h3 class="detail-subheading">How I can help</h3>${group.services.map((service, index) => `<details class="service-detail" name="details-${group.id}"${index === 0 ? ' open' : ''}><summary>${escape(service.name)}${plus}</summary><div><p>${escape(serviceDetails[service.id])}</p><a href="${escape(inquiryHref(group.id, service.id))}">Discuss ${escape(service.name.toLowerCase())} ${arrow}</a></div></details>`).join('')}</div><aside class="service-outcomes"><h3 class="detail-subheading">${escape(guide.outcomeTitle)}</h3><ul>${guide.outcomes.map(text => `<li>${escape(text)}</li>`).join('')}</ul><p class="scope-note">${escape(guide.note)}</p><a class="button button--primary" href="${escape(inquiryHref(group.id))}">Let’s talk about it ${arrow}</a></aside></div>${page.id === 'websites' ? pastWorkLinks() : ''}</div>${page.id === 'websites' ? '<p class="related-service">Need the tools behind your website connected? <a href="/automation/">Explore business automation →</a></p>' : ''}</div></section>`;
}

export function automationFlow() {
  return `<section class="workflow-section section-space" aria-labelledby="workflow-heading"><div class="section-container"><p class="eyebrow">Start with one useful workflow</p><h2 id="workflow-heading">An inquiry comes in. The follow-up is already organized.</h2><p class="section-lead">Here’s one example of how the pieces could work together:</p><ol class="workflow"><li><span>01</span><h3>A customer gets in touch</h3><p>Your website form asks for the details you need to respond.</p></li><li><span>02</span><h3>The details go where you need them</h3><p>The inquiry is added to your customer list or spreadsheet, without retyping it.</p></li><li><span>03</span><h3>A follow-up task is created</h3><p>You get a reminder or notification, with the customer’s details ready to use.</p></li></ol><p class="workflow-note">The setup depends on your tools and how you work. We’ll test it with real examples and make sure you know how to manage it.</p></div></section>`;
}

export function screenPricing() {
  return `<section id="screen-pricing" class="section-space screen-pricing" aria-labelledby="screen-heading"><div class="section-container"><p class="eyebrow">Screen repair · Pricing by model</p><h2 id="screen-heading">Choose the screen that makes sense for your device.</h2><p class="section-lead">Send the model and describe the damage. I’ll check the available screens and quote the repair before you commit.</p><div class="screen-options">${screenOptions.map(option => `<article><p class="eyebrow">${escape(option.type)}</p><h3>${escape(option.name)}</h3><p>${escape(option.description)}</p><a class="text-link" href="${escape(inquiryHref('repairs-tech', 'screen-repair', option.id))}">Ask for this option ${arrow}</a></article>`).join('')}</div><div class="quote-method"><div><h3>How the quote is worked out</h3><p><strong>Model-specific screen + installation.</strong> Any additional work is explained and agreed before it starts.</p></div><ol><li>Send the exact make and model, plus what’s damaged.</li><li>Choose a screen preference, or ask to compare both.</li><li>Review the available part, its condition, and the total quote.</li></ol></div><p class="repair-note">If a genuine screen is available, the quote will state whether it’s new, refurbished, or used. The options also depend on the condition of your device.</p><a class="text-link" href="${escape(inquiryHref('repairs-tech', 'screen-repair', 'not-sure'))}">Not sure which screen? Ask to compare ${arrow}</a></div></section>`;
}

export function nextStep(category = '') {
  const messages = {
    'web-digital': ['Ready to improve your website?', 'Send your current site, or tell me what you’re starting. We can talk through the pages and features your business needs.'],
    'business-tech': ['What are you tired of doing by hand?', 'Tell me about the task and the tools you use. I’ll help work out which steps can be connected.'],
    'repairs-tech': ['Tell me what’s wrong with your device.', 'Send the make and model and describe the problem. I’ll check the options and put together a quote.'],
    'photo-media': ['What do you need to show?', 'Tell me about the subject, where the content will appear, and any date you have in mind.'],
  };
  const [title, text] = messages[category] || ['Have a project in mind?', 'Send your website or tell me how you’re handling things now. We can work out what needs to change.'];
  return `<section class="next-step"><div class="section-container"><div><h2>${title}</h2><p>${text}</p></div><a class="button button--primary" href="${escape(inquiryHref(category))}">Tell me about it ${arrow}</a></div></section>`;
}
