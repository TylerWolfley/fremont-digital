// Homepage copy. Keep wording separate from the section layout.
import { business } from './business.mjs';

export const homepage = {
  hero: {
    eyebrow: business.location,
    title: 'Build. Fix.',
    accent: 'Create.',
    description: 'Websites for your business. Help with your technology. Photos and video that bring your ideas to life.',
    primary: 'Find your service',
    secondary: 'Let’s talk',
    note: 'Independent. Local. Ready to help.',
  },
  services: {
    eyebrow: 'What we do',
    title: 'What needs doing?',
    description: 'Four areas of work. One place to start.',
    hints: {
      'web-digital': 'Websites · Search · Marketing',
      'business-tech': 'Email · Payments · Office setup',
      'repairs-tech': 'Phones · Computers · Support',
      'photo-media': 'Photography · Video · Content',
    },
  },
  business: {
    eyebrow: 'For your business',
    title: 'A website is',
    accent: 'just the start.',
    description: 'Your website, email, booking, and payment tools should feel like parts of the same business. I can help you connect them, along with the devices you use every day.',
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
    description: 'Work directly with the person doing the work. You don’t need the technical terms—just an idea of what you want to do or what isn’t working.',
    steps: [
      { title: 'Start a conversation.', description: 'Tell me about your project or the problem you’re having. A link, photo, or device model is a useful starting point.' },
      { title: 'Know the plan.', description: 'Talk through what’s involved, what it will cost, and a practical timeline before the work starts.' },
      { title: 'Put it to work.', description: 'Walk through the finished work and get answers to your questions about using it.' },
    ],
  },
  faq: {
    eyebrow: 'A few useful answers',
    title: 'Before you reach out.',
    items: [
      { question: 'What will it cost?', answer: 'The cost depends on the project or device and the work involved. Send a few details so we can discuss the scope and a quote.' },
      { question: 'Can you repair my phone or computer?', answer: 'Repair options depend on the model, the issue, and the parts needed. Include the device model and a description of what’s happening. We’ll work out the options from there.' },
      { question: 'Where are you based?', answer: `Fremont Digital is based in ${business.location}. Contact me first to discuss your project and arrange any device handoff. A public storefront is not available at this time.` },
      { question: 'What if my project isn’t listed?', answer: 'Ask. If it involves technology, a website, photography, or video, it’s worth a conversation. I’ll be clear about whether it’s something I can take on.' },
    ],
  },
  contact: {
    eyebrow: `Based in ${business.location}`,
    title: 'Let’s get it',
    accent: 'working.',
    description: 'Tell me what you’re building, what needs fixing, or what you have in mind. A few details are enough to get started.',
    action: 'Start a conversation',
  },
};
