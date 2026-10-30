import { business } from './business.mjs';
export const homepage = {
  process: {
    eyebrow: 'How it works',
    title: 'Here’s how we get your project moving.',
    description: 'You work directly with me, from the first conversation through the finished project.',
    steps: [
      { title: 'Tell me what needs to change', description: 'Send your current site, an example you like, or the task that eats up your time.' },
      { title: 'Agree on the work', description: 'You’ll know what’s included, what it costs, and what I need from you before we start.' },
      { title: 'Build, test, and hand over', description: 'We’ll check the finished work together and go through how to use it.' },
    ],
  },
  faq: {
    eyebrow: 'Helpful answers',
    title: 'A few things you might be wondering',
    items: [
      { question: 'What can business automation help with?', answer: 'Start with a task you repeat: collecting inquiry details, following up, scheduling, or moving information between business tools. We’ll map the steps, choose a practical setup, and agree on costs before building it.' },
      { question: 'How much will it cost?', answer: 'Pricing depends on the project or device and the work involved. Share a few details, and we can discuss the scope and a quote before getting started.' },
      { question: 'Can you improve my existing website?', answer: 'Yes. Send the website link and tell me what you want to change. I can help with content, layout, technical issues, and ongoing care; we’ll agree on the work before getting started.' },
      { question: 'What happens after my website launches?', answer: 'Support is agreed for your business. You can arrange individual updates, ongoing care, or a mix of both. We’ll set out the work covered, how requests are handled, account access, and costs. Hosting, domain renewals, and paid tools are identified separately from the website build.' },
      { question: 'Can you repair my phone or computer?', answer: 'Repair options depend on the model, the problem, and the parts needed. Include the device model and a description of what is happening so we can work out the next step.' },
      { question: 'Where do you offer help?', answer: `I’m based in ${business.location}. Website and automation projects can be handled remotely, so you don’t need to be nearby. Local visits and device drop-off can be arranged by phone.` },
      { question: 'Can I drop off a device?', answer: 'Yes, by arrangement. There isn’t a public storefront at this time. Call before bringing a device so we can agree on the handoff and discuss the issue.' },
      { question: 'What if I need something that isn’t listed?', answer: 'Ask. If it involves a website, technology, photography, or video, tell me what you have in mind. I’ll be clear about whether it’s something I can take on.' },
    ],
  },
};
