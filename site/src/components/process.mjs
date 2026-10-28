import { homepage } from '../data/homepage.mjs';
import { escape } from './html.mjs';

export function processSection() {
  const copy = homepage.process;
  return `<section id="how-it-works" class="process-section section-space" aria-labelledby="process-heading">
    <div class="section-container">
      <div class="section-heading"><div><p class="eyebrow">${escape(copy.eyebrow)}</p><h2 id="process-heading">${escape(copy.title)}</h2></div><p class="process-intro">${escape(copy.description)}</p></div>
      <ol class="process-steps">${copy.steps.map((step, index) => `<li><span class="step-number" aria-hidden="true">0${index + 1}</span><h3>${escape(step.title)}</h3><p>${escape(step.description)}</p></li>`).join('\n')}</ol>
    </div>
  </section>`;
}
