import { business } from './business.mjs';

// One route registry owns navigation, build output, and the public sitemap.
export const sitePages = [
  { id: 'home', path: '/', label: 'Home', title: business.title, description: business.description },
  { id: 'websites', path: '/websites/', label: 'Websites', category: 'web-digital', title: 'Website Design in Fremont County, WY | Fremont Digital', description: 'Website design, redesigns, and ongoing care from Fremont Digital. Help customers understand your business and make it easy to call, book, or buy. Local and remote projects.' },
  { id: 'automation', path: '/automation/', label: 'Business Automation', category: 'business-tech', title: 'Small Business Automation | Fremont Digital, Wyoming', description: 'Connect your forms, calendars, customer lists, and follow-ups. Small-business automation from Fremont Digital, based in Fremont County, Wyoming.' },
  { id: 'repairs', path: '/repairs/', label: 'Repairs & Tech Help', category: 'repairs-tech', title: 'Screen Repairs & Tech Help | Fremont Digital, Wyoming', description: 'Model-based screen repair quotes with standard aftermarket and genuine/OEM options where available. Phone, computer, and tech help across Fremont County, Wyoming.' },
  { id: 'media', path: '/media/', label: 'Photography & Media', category: 'photo-media', title: 'Photography & Media | Fremont Digital, Wyoming', description: 'Business, product, and real estate photography, video, and editing in Fremont County, Wyoming. Discuss the project, deliverables, and intended use.' },
  { id: 'contact', path: '/contact/', label: 'Contact', title: 'Start a Conversation | Fremont Digital', description: 'Talk about your website, business automation, repair, or media project. Call (307) 349-4694 or send Fremont Digital a request.' },
];
export const pageById = Object.fromEntries(sitePages.map(page => [page.id, page]));
export function inquiryHref(category = '', service = '', screen = '') {
  const params = new URLSearchParams();
  params.set('category', category || 'general');
  if (service) params.set('service', service);
  if (screen) params.set('screen', screen);
  return '/contact/' + (params.size ? `?${params}` : '');
}
