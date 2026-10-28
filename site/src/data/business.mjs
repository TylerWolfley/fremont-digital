const location = 'Fremont County, Wyoming';

export const business = Object.freeze({
  name: 'Fremont Digital',
  location,
  email: 'digitalfremont@gmail.com',
  title: 'Fremont Digital | Websites & Tech Help in Fremont County, WY',
  description: `Web design, phone and computer repair, business tech, photography, and video in ${location}. Tell Fremont Digital what you need.`,
});

export function inquiryLink(subject = 'How can Fremont Digital help?') {
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}`;
}
