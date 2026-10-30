import { homepage } from '../data/homepage.mjs';
import { plus } from './icons.mjs';
import { escape } from './html.mjs';

export function faq() {
  const copy = homepage.faq;
  return `<section id="questions" class="faq-section section-space" aria-labelledby="faq-heading">
    <div class="section-container faq-layout"><div><p class="eyebrow">${escape(copy.eyebrow)}</p><h2 id="faq-heading">${escape(copy.title)}</h2></div>
      <div class="faq-list">${copy.items.map(item => `<details name="questions"${/repair my phone|drop off a device/.test(item.question) ? ' data-faq-repair' : ''}><summary>${escape(item.question)}${plus}</summary><p>${escape(item.answer)}</p></details>`).join('\n')}</div>
    </div>
  </section>`;
}
