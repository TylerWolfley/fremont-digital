import { serviceGroups } from '../data/services.mjs';
import { searchAliases, startingServices } from '../data/catalog.mjs';
import { inquiryLink } from '../data/business.mjs';
import { arrow, groupIcons } from './icons.mjs';
import { escape } from './html.mjs';

export function services() {
  const items = serviceGroups.flatMap(group => group.services.map(service => ({...service, group})));
  items.sort((a,b) => (startingServices.includes(a.id) ? startingServices.indexOf(a.id) : 99) - (startingServices.includes(b.id) ? startingServices.indexOf(b.id) : 99));
  return `<section id="services" class="catalog-section" aria-labelledby="services-heading"><div class="section-container catalog-layout">
    <aside class="catalog-sidebar"><div class="category-filters" data-filters hidden><h2>Browse services</h2><button type="button" class="filter-button" data-filter="all" aria-pressed="true"><span>All services</span><span>${items.length}</span></button>${serviceGroups.map(group => `<button type="button" class="filter-button" data-filter="${group.id}" aria-pressed="false"><span>${escape(group.navLabel)}</span><span>${group.services.length}</span></button>`).join('\n')}</div><div class="sidebar-help"><strong>Not sure which service?</strong><p>Tell me what’s going on. We can find the right place to start.</p><a href="#contact">Ask a question ${arrow}</a></div></aside>
    <div class="catalog-content"><div class="catalog-heading"><div><h2 id="services-heading" tabindex="-1">Find the right service</h2><p class="results-status" data-results-status role="status" aria-live="polite">${items.length} services for your work and everyday life.</p></div><button type="button" class="clear-search" data-clear-search hidden>Clear filters</button></div>
    <div id="service-results" class="service-grid">${items.map(service => `<article class="service-card" data-service-card data-service-id="${service.id}" data-category="${service.group.id}" data-name="${escape(service.name)}" data-group-name="${escape(service.group.navLabel)}" data-description="${escape(service.description)}" data-search="${escape([service.name,service.description,searchAliases[service.id]].join(' '))}"><div class="service-card-top"><span class="card-icon" data-icon="${service.group.id}">${groupIcons[service.group.id]}</span><span>${escape(service.group.navLabel)}</span></div><h3>${escape(service.name)}</h3><p>${escape(service.description)}</p><a class="service-action" href="${escape(inquiryLink(`Fremont Digital inquiry: ${service.name}`))}" data-inquiry-open aria-label="Email about ${escape(service.name)}">Get help with this ${arrow}</a></article>`).join('\n')}</div>
    <div class="empty-results" data-empty-results hidden><h3>No matching services yet.</h3><p>Try a different term, browse all services, or tell me what you need.</p><button type="button" class="button button--secondary" data-reset-search>Browse all services</button><a href="#contact">Ask about your project ${arrow}</a></div>
    <div class="catalog-more" data-more-wrap hidden><button type="button" class="button button--secondary" data-show-all>View all ${items.length} services ${arrow}</button></div>
    </div></div></section>`;
}
