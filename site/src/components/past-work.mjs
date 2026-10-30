import { pastWork } from '../data/past-work.mjs';
import { arrow } from './icons.mjs';
import { escape } from './html.mjs';

export function pastWorkLinks() {
  return `<section class="past-work" id="past-work" aria-labelledby="work-heading"><div class="section-container">
    <div class="work-heading"><h2 id="work-heading">A couple of sites I’ve built.</h2><p>Open them, look around, and see the work for yourself.</p></div>
    <ul class="work-projects">${pastWork.map(project => `<li><a class="work-preview" href="${escape(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escape(project.name)} (opens in a new tab)"><img src="${project.image}" alt="${escape(project.name)} homepage" width="760" height="428" loading="lazy" decoding="async"></a><div class="work-copy"><span class="offer-label">${project.type}</span><h3><a href="${escape(project.url)}" target="_blank" rel="noopener noreferrer">${escape(project.name)}${arrow}<span class="sr-only"> (opens in a new tab)</span></a></h3><p>${escape(project.description)}</p><p class="work-detail">${escape(project.detail)}</p></div></li>`).join('')}</ul>
  </div></section>`;
}
