import { business } from './business.mjs';
export const homepage = {
  process: {
    eyebrow: 'How it works',
    title: 'Local support, from the first conversation.',
    description: 'You work directly with the person doing the work. Start with what you need; we’ll talk through the details together.',
    steps: [
      { title: 'Tell me what you need', description: 'Choose a service or send a question. A few details are enough to get the conversation started.' },
      { title: 'Get a clear plan', description: 'We’ll discuss the scope, cost, and timing before any work begins.' },
      { title: 'Get it working for you', description: 'We’ll go through the finished work and your questions about using it.' },
    ],
  },
  faq: {
    eyebrow: 'Helpful answers',
    title: 'Before you get started',
    items: [
      { question: 'How much will it cost?', answer: 'Pricing depends on the project or device and the work involved. Share a few details, and we can discuss the scope and a quote before getting started.' },
      { question: 'Can you repair my phone or computer?', answer: 'Repair options depend on the model, the problem, and the parts needed. Include the device model and a description of what is happening so we can work out the next step.' },
      { question: 'Where do I bring a device?', answer: `Fremont Digital is based in ${business.location}. Contact me first to discuss the issue and arrange a handoff. There isn’t a public storefront at this time.` },
      { question: 'What if I need something that isn’t listed?', answer: 'Ask. If it involves a website, technology, photography, or video, tell me what you have in mind. I’ll be clear about whether it’s something I can take on.' },
    ],
  },
};
