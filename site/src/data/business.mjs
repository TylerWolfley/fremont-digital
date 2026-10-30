const location = 'Fremont County, Wyoming';

export const business = Object.freeze({
  name: 'Fremont Digital',
  owner: 'Tyler Wolfley',
  location,
  email: 'digitalfremont@gmail.com',
  phone: '(307) 349-4694',
  phoneE164: '+13073494694',
  phoneLink: 'tel:+13073494694',
  facebookUrl: 'https://fb.com/digitalfremont',
  title: 'Fremont Digital | Websites & Business Automation in Wyoming',
  description: `Website design and small-business automation, based in ${location}. Websites, booking, forms, and follow-ups built around your business. Local and remote projects.`,
});

export function inquiryLink(subject = 'How can Fremont Digital help?') {
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}`;
}
