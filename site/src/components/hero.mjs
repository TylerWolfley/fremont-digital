import { serviceGroups } from '../data/services.mjs';
import { business } from '../data/business.mjs';
import { arrow, groupIcons, pin } from './icons.mjs';
import { escape } from './html.mjs';

export function hero() {
  return `<section class="hero" aria-labelledby="hero-heading"><div class="section-container">
    <p class="hero-location">${pin}${escape(business.location)}</p>
    <h1 id="hero-heading">What can we help you with?</h1>
    <p class="hero-description">Websites, phone and computer repairs, business technology, and creative services.<br class="desktop-break"> Find what you need. Work with someone local.</p>
    <form class="service-search" data-search-form role="search" hidden><label class="sr-only" for="service-search">Search Fremont Digital services</label><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.8"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><input id="service-search" type="search" placeholder="Try phone repair, a new website, or video editing" autocomplete="off" maxlength="120" aria-controls="service-results"><button type="submit">Search</button></form>
    <noscript><a class="button button--primary" href="#services">Browse services ${arrow}</a></noscript>
    <nav class="category-shortcuts" aria-label="Browse by service category">${serviceGroups.map(group => `<a href="#services" data-category-link="${group.id}"><span class="shortcut-icon" data-icon="${group.id}">${groupIcons[group.id]}</span><span><strong>${escape(group.navLabel)}</strong><small>${group.services.length} services</small></span>${arrow}</a>`).join('\n')}</nav>
  </div></section>`;
}
