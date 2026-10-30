import { pastWork } from '../data/past-work.mjs';
import { arrow } from './icons.mjs';
import { escape } from './html.mjs';

export function pastWorkLinks() {
  return `<div class="past-work" id="past-work">
    <div><h4>Past work</h4><p>A couple of sites I’ve built.</p></div>
    <ul>${pastWork.map(project => `<li><a href="${escape(project.url)}" target="_blank" rel="noopener noreferrer"><span>${escape(project.name)}</span>${arrow}<span class="sr-only"> (opens in a new tab)</span></a></li>`).join('')}</ul>
  </div>`;
}
