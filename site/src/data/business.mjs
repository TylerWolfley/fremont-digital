const location = 'Fremont County, Wyoming';

export const business = Object.freeze({
  name: 'Fremont Digital',
  location,
  email: 'digitalfremont@gmail.com',
  description: `Websites, computer and phone repairs, professional photography, and media services in ${location}.`,
});

export function inquiryLink(subject = 'How can Fremont Digital help?') {
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}`;
}
