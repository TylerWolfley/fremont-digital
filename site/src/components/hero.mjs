import { business } from '../data/business.mjs';
import { arrow, pin } from './icons.mjs';
import { escape } from './html.mjs';
import { connectionVisual } from './connection-visual.mjs';

export function hero() {
  return `<section class="hero" aria-labelledby="hero-heading"><div class="section-container hero-layout"><div class="hero-copy"><p class="hero-location">${pin}${escape(business.location)}</p><h1 id="hero-heading">Websites built to <span>bring you more business.</span></h1><p class="hero-description">Your website should show people why to choose you—and make it easy to take the next step. I build the site and connect the forms, booking, and follow-ups behind it.</p><div class="hero-actions"><a class="button button--primary" href="/contact/?category=web-digital">Tell me about your project ${arrow}</a><a class="text-link" href="/websites/#website-build">What goes into a build ${arrow}</a></div><p class="hero-assurance">Work directly with the person building your site.<br> Based in Wyoming. Working locally and remotely.</p></div>${connectionVisual()}</div></section>`;
}
