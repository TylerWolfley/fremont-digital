import { pastWork } from '../data/past-work.mjs';
import { arrow } from './icons.mjs';
import { escape } from './html.mjs';

export function pastWorkLinks() {
  return `<section class="past-work" id="past-work" aria-labelledby="work-heading"><div class="section-container">
    <div class="work-heading"><div><p class="eyebrow">A look at the work</p><h2 id="work-heading">Different businesses.<br> Different priorities.</h2></div><p>A shop invites people to browse.<br> A service business needs to explain the job.<br> The website should reflect that.</p></div>
    <ul class="work-projects">${pastWork.map((project,index) => `<li class="website-case"><div class="case-image"><a class="work-preview" href="${escape(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escape(project.name)} (opens in a new tab)"><img src="${project.image}" alt="${escape(project.name)} homepage" width="760" height="428" loading="lazy" decoding="async"></a><p class="case-domain"><span>${escape(project.domain)}</span><span>0${index+1}</span></p></div><div class="work-copy"><span class="offer-label">${project.type}</span><h3>${escape(project.name)}</h3><p class="case-focus">${escape(project.focus)}</p><p>${escape(project.description)}</p><p class="work-detail">${escape(project.detail)}</p><a class="text-link case-visit" href="${escape(project.url)}" target="_blank" rel="noopener noreferrer">Visit the website ${arrow}<span class="sr-only"> (opens in a new tab)</span></a></div></li>`).join('')}</ul>
  </div></section>`;
}
