export const business = Object.freeze({
  name: 'Fremont Digital',
  location: 'Fremont County, Colorado',
  email: 'digitalfremont@gmail.com',
  description: 'Websites, computer and phone repairs, professional photography, and media services in Fremont County, Colorado.',
});

export function inquiryLink(subject = 'How can Fremont Digital help?') {
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}`;
}
