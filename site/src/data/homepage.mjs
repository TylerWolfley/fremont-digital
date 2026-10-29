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
      { question: 'Where do you offer help?', answer: `I serve all of ${business.location}. Remote help, visits to your home or business, and arranged device drop-off are available. Call first to discuss what you need and arrange the right approach.` },
      { question: 'Can I drop off a device?', answer: 'Yes, by arrangement. There isn’t a public storefront at this time. Call before bringing a device so we can agree on the handoff and discuss the issue.' },
      { question: 'What if I need something that isn’t listed?', answer: 'Ask. If it involves a website, technology, photography, or video, tell me what you have in mind. I’ll be clear about whether it’s something I can take on.' },
    ],
  },
};
