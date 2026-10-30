import { pageShell } from './shell.mjs';
import { pageById } from '../data/pages.mjs';
import { contact } from '../components/contact.mjs';
import { faq } from '../components/faq.mjs';
export function contactPage(config = {}) {
  return pageShell(pageById.contact, contact({ contactEndpoint: config.contactEndpoint || '', standalone: true }) + faq(), config);
}
