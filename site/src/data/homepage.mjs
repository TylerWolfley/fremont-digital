// Short working copy for the layout pass. Edit wording here, independently of layout.
import { business } from './business.mjs';

export const homepage = {
  hero: {
    eyebrow: 'Technology. Creativity. Community.',
    title: 'Big ideas.',
    accent: 'Local know-how.',
    description: 'Websites, repairs, and creative work. A local connection for your digital world.',
    primary: 'Explore our services',
    secondary: 'Let’s talk',
    note: 'For local businesses. For everyday life.',
  },
  services: {
    eyebrow: 'What we do',
    title: 'A lot of ways to help.',
    description: 'Start with what you need.',
    hints: {
      'web-digital': 'Websites · Search · Marketing',
      'business-tech': 'Email · Payments · Office setup',
      'repairs-tech': 'Phones · Computers · Support',
      'photo-media': 'Photography · Video · Content',
    },
  },
  business: {
    eyebrow: 'For your business',
    title: 'Good on their own.',
    accent: 'Better together.',
    description: 'Your website, content, and everyday tools should work together. Let’s connect the pieces.',
    action: 'Explore business technology',
    connections: [
      { label: 'Your presence', detail: 'Website & content', target: 'web-digital', icon: 'web' },
      { label: 'Your customers', detail: 'Booking & payments', target: 'business-tech', icon: 'business' },
      { label: 'Your day-to-day', detail: 'Devices & support', target: 'repairs-tech', icon: 'repair' },
    ],
  },
  process: {
    eyebrow: 'How we get started',
    title: 'Keep it simple.',
    steps: [
      { title: 'Tell me what you need.', description: 'A project, a problem, or an idea.' },
      { title: 'Find the right approach.', description: 'Work through the scope and next steps.' },
      { title: 'Make it happen.', description: 'Bring the plan to life.' },
    ],
  },
  contact: {
    eyebrow: `Based in ${business.location}`,
    title: 'What can we',
    accent: 'do for you?',
    description: 'Big project or quick question. Start here.',
    action: 'Start a conversation',
  },
};
