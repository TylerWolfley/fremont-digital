import { homepage } from '../data/homepage.mjs';
import { serviceGroups } from '../data/services.mjs';
import { arrow } from './icons.mjs';
import { escape } from './html.mjs';

export function hero() {
  const copy = homepage.hero;
  return `<section class="hero section-container" aria-labelledby="hero-heading">
    <div class="hero__copy">
      <p class="eyebrow">${escape(copy.eyebrow)}</p>
      <h1 id="hero-heading">${escape(copy.title)}<em>${escape(copy.accent)}</em></h1>
      <p class="hero__description">${escape(copy.description)}</p>
      <div class="hero__actions"><a class="button button--dark" href="#services">${escape(copy.primary)}${arrow}</a><a class="text-link" href="#contact">${escape(copy.secondary)}${arrow}</a></div>
      <p class="hero__note"><span aria-hidden="true"></span>${escape(copy.note)}</p>
    </div>
    <div class="brand-board">
      <div class="brand-board__top"><span>Fremont Digital</span><span>Local by design</span></div>
      <div class="brand-board__mark"><img src="/assets/brand/fremont-digital-monogram.webp" width="680" height="505" alt="" fetchpriority="high"></div>
      <nav class="brand-board__index" aria-label="Explore service categories">
        ${serviceGroups.map((group, index) => `<a href="#${group.id}"><span class="index-number">0${index + 1}</span><span>${escape(group.navLabel)}</span>${arrow}</a>`).join('\n')}
      </nav>
    </div>
  </section>`;
}
