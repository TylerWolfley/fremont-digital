import { homepage } from '../data/homepage.mjs';
import { serviceGroups } from '../data/services.mjs';
import { arrow } from './icons.mjs';
import { escape } from './html.mjs';
import { landscape } from './landscape.mjs';

export function hero() {
  const copy = homepage.hero;
  return `<section class="hero" aria-labelledby="hero-heading">
    <div class="section-container hero-layout">
      <div class="hero__copy">
        <p class="eyebrow hero__eyebrow"><span aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="M6 2H2v4m12-4h4v4M2 14v4h4m12-4v4h-4M6 10h8m-4-4v8" stroke="currentColor" stroke-width="1.3"/></svg></span>${escape(copy.eyebrow)}</p>
        <h1 id="hero-heading">${escape(copy.title)}<span>${escape(copy.accent)}</span></h1>
        <p class="hero__description">${escape(copy.description)}</p>
        <div class="hero__actions"><a class="button button--dark" href="#services">${escape(copy.primary)}${arrow}</a><a class="text-link" href="#contact">${escape(copy.secondary)}${arrow}</a></div>
      </div>
      <div class="service-board">
        <div class="service-board__heading"><div><p class="eyebrow">Fremont Digital</p><h2>What brings you by?</h2></div><div class="service-board__brand"><img src="/assets/brand/fremont-digital-monogram.webp" width="680" height="505" alt=""></div></div>
        <nav aria-label="Find the help you need">${serviceGroups.map((group, index) => `<a href="#${group.id}"><span class="index-number">0${index + 1}</span><span><strong>${escape(group.prompt)}</strong><small>${escape(group.hint)}</small></span>${arrow}</a>`).join('\n')}</nav>
        <p class="service-board__note">Something else? <a href="#contact">I’m all ears.${arrow}</a></p>
      </div>
      <div class="hero__signature"><p>${escape(copy.note)}</p><span>Independent by nature.<br>Local by choice.</span></div>
    </div>
    <div class="hero__landscape">${landscape()}</div>
  </section>`;
}
