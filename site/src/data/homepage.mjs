// Homepage copy. Keep wording separate from the section layout.
import { business } from './business.mjs';

export const homepage = {
  hero: {
    eyebrow: 'Local know-how. Wide-open possibilities.',
    title: 'Big ideas.',
    accent: 'Everyday fixes.',
    description: 'A website for the business you’re building. A fix for the device you rely on. Photos and video for something worth sharing. Right here in Fremont County, Wyoming.',
    primary: 'Find what you need',
    secondary: 'Tell me about it',
    note: 'Websites, technology & creative work.',
  },
  services: {
    eyebrow: 'The work',
    title: 'A lot of hats.\nOne local connection.',
    description: 'For the business you run, the devices you use, and the ideas you haven’t made real yet.',
  },
  business: {
    eyebrow: 'For the folks building something',
    title: 'Your business has',
    accent: 'a lot of moving parts.',
    description: 'A customer finds your website. They book a time, make a payment, and get a confirmation. Behind the scenes, your email, software, and devices need to keep up. Let’s make those pieces work together.',
    action: 'Talk through your setup',
    connections: [
      { label: 'Get found', detail: 'A place to call yours.', description: 'Your website, local listing, and photos give people a clear picture of your business.', target: 'web-digital', link: 'Websites & online presence' },
      { label: 'Get booked', detail: 'An easier next step.', description: 'Booking, payments, and business email help turn that first visit into a conversation or a sale.', target: 'business-tech', link: 'Business systems & setup' },
      { label: 'Keep going', detail: 'Tools that do their job.', description: 'Get help with the computers, Wi-Fi, files, and software you count on every day.', target: 'repairs-tech', link: 'Repairs & everyday support' },
    ],
  },
  process: {
    eyebrow: 'Straight talk. A clear plan.',
    title: 'Let’s figure it out.',
    description: 'You work directly with me. Bring the problem or the idea; you don’t need to know the technical terms.',
    steps: [
      { title: 'Tell me what’s up.', description: 'A few details, a website link, or a device model gives us a place to start.' },
      { title: 'Agree on the work.', description: 'We’ll talk through the approach, cost, and timing before getting started.' },
      { title: 'Put it to use.', description: 'We’ll walk through the result and your questions about using it.' },
    ],
  },
  faq: {
    eyebrow: 'Before you write',
    title: 'Fair questions.',
    items: [
      { question: 'What will it cost?', answer: 'Every project starts a little differently. Send me a few details about what you need, and we can talk through the scope and a quote before work begins.' },
      { question: 'Can you fix my particular phone or computer?', answer: 'That depends on the model, the problem, and the parts needed. Send the device model and describe what’s happening, including any damage or error messages. I’ll help you work out the options.' },
      { question: 'Where do I bring a device?', answer: `Contact me first so we can discuss the issue and arrange a handoff. Fremont Digital is based in ${business.location}; there isn’t a public storefront at this time.` },
      { question: 'My project doesn’t fit neatly into a category.', answer: 'That’s fine. If it involves a computer, a website, photography, video, or getting technology to cooperate, tell me about it. I’ll be straight with you about whether I can help.' },
    ],
  },
  contact: {
    eyebrow: business.location,
    title: 'What have you',
    accent: 'got in mind?',
    description: 'A big idea, a small fix, or an “I’m not sure where to start.” Send it my way.',
    action: 'Write to Fremont Digital',
  },
};
