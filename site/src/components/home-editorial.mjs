import { arrow } from './icons.mjs';
import { business } from '../data/business.mjs';

export function homeServices() {
  return `<section id="services" class="home-services" aria-label="Websites and business automation"><div class="section-container">
    <article class="service-story"><div><p class="eyebrow">Website design & development</p><h2>A site that feels<br> like your business.</h2></div><div><p>Your customers need to see what makes you worth choosing. I’ll help organize your services, show your work, and build the pages around the way people find, compare, and contact you.</p><p class="service-types">New websites · Redesigns · Online stores</p><a class="text-link" href="/websites/">Explore websites & past work ${arrow}</a></div></article>
    <article class="service-story"><div><p class="eyebrow">Small-business automation</p><h2>Keep the work.<br> Lose the repetition.</h2></div><div><p>Copying inquiries into a spreadsheet. Chasing bookings. Remembering who needs a reply. I connect those steps so the information gets where it belongs, with less work from you.</p><p class="service-types">Forms · Bookings · Customer records · Follow-ups</p><a class="text-link" href="/automation/#demo">Try an automation example ${arrow}</a></div></article>
  </div></section>`;
}

export function ownerIntro() {
  return `<section class="owner-section" aria-labelledby="owner-heading"><div class="section-container owner-layout"><div><p class="eyebrow">The person behind Fremont Digital</p><h2 id="owner-heading">Hi, I’m Tyler Wolfley.</h2></div><div><p>I design and build the websites and automations here. You work directly with me—from the first conversation through the finished project.</p><p>I also own Wind River Renewal. Its website is one of the <a href="/websites/#past-work">projects you can take a look at</a>.</p><a class="text-link" href="/contact/?category=general">Tell me what you’re working on ${arrow}</a></div></div></section>`;
}

export function homeClosing() {
  return `<section class="home-closing"><div class="section-container"><p class="eyebrow">Have something in mind?</p><div class="closing-line"><h2>Let’s make it happen.</h2><a href="/contact/?category=general" class="closing-arrow" aria-label="Tell Tyler about your project">${arrow}</a></div><div class="closing-details"><a href="${business.phoneLink}">${business.phone}</a><a href="mailto:${business.email}">${business.email}</a></div><p class="secondary-services">Also available: <a href="/repairs/">repairs & tech help</a> and <a href="/media/">photography & media</a>.</p></div></section>`;
}
