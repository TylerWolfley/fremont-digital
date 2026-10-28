export const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const chevron = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const pin = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M15.5 8c0 4-5.5 8-5.5 8S4.5 12 4.5 8a5.5 5.5 0 1 1 11 0Z" stroke="currentColor" stroke-width="1.3"/><circle cx="10" cy="8" r="1.7" stroke="currentColor" stroke-width="1.3"/></svg>';

const lineIcon = path => `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
export const serviceIcons = {
  web: lineIcon('<rect x="4" y="6" width="24" height="20" rx="2"/><path d="M4 12h24M8 9h.1M11 9h.1M11 17l-3 3 3 3m10-6 3 3-3 3m-4-7-2 10"/>'),
  business: lineIcon('<rect x="11" y="3" width="10" height="8" rx="1"/><rect x="3" y="21" width="10" height="8" rx="1"/><rect x="19" y="21" width="10" height="8" rx="1"/><path d="M16 11v5M8 21v-5h16v5"/>'),
  repair: lineIcon('<rect x="4" y="4" width="15" height="24" rx="2"/><path d="M9 7h5M10 24h3m11-11 2-2 3 3-2 2m-3-3-7 7v3h3l7-7m-3-3 3 3"/>'),
  media: lineIcon('<path d="m10 8 2-3h8l2 3h5a2 2 0 0 1 2 2v16H3V10a2 2 0 0 1 2-2Z"/><circle cx="16" cy="17" r="6"/><path d="M25 12h.1"/>'),
};
export const groupIcons = { 'web-digital': serviceIcons.web, 'business-tech': serviceIcons.business, 'repairs-tech': serviceIcons.repair, 'photo-media': serviceIcons.media };
export const plus = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="1.4"/></svg>';
