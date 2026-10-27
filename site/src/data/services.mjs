// The current service registry is the source for navigation and future service pages.
// Keep individual services within these groups instead of growing the top-level menu.
export const serviceGroups = [
  {
    id: 'web-digital',
    navLabel: 'Web & Digital',
    title: 'Make your business look the part.',
    description: 'A new website, a better one, or help getting your business noticed online.',
    services: [
      { id: 'website-builds', name: 'Website builds', description: 'A website built around your business.' },
      { id: 'website-updates', name: 'Redesigns & updates', description: 'Give an existing website a fresh start.' },
      { id: 'digital-marketing', name: 'Digital marketing', description: 'Help with your presence online.' },
    ],
  },
  {
    id: 'repairs-tech',
    navLabel: 'Repairs & Tech',
    title: 'Get your everyday tech working.',
    description: 'Tell me what device you have and what is going wrong. We can work out the next step from there.',
    services: [
      { id: 'phone-repair', name: 'Phone & device repairs', description: 'Screens, charging ports, and smaller fixes.' },
      { id: 'computer-help', name: 'Computer troubleshooting', description: 'Help with slow computers and software problems.' },
      { id: 'virus-cleanup', name: 'Virus & malware cleanup', description: 'Help with unwanted software and suspicious behavior.' },
      { id: 'setup-support', name: 'Setup & tech support', description: 'Get help setting up and using your technology.' },
    ],
  },
  {
    id: 'photo-media',
    navLabel: 'Photo & Media',
    title: 'Bring your next idea into focus.',
    description: 'Professional photos and media for your business, your content, or your next project.',
    services: [
      { id: 'photography', name: 'Professional photography', description: 'Tell me what you need photographed.' },
      { id: 'video-production', name: 'Video & YouTube content', description: 'Turn an idea into a video worth watching.' },
      { id: 'video-editing', name: 'Editing & media projects', description: 'Put your footage and content to work.' },
    ],
  },
];

// Not rendered publicly. No inventory, trade-ins, pricing, or purchase flow yet.
export const futureServices = [
  { id: 'phone-resale', name: 'Phone resale', condition: 'After the owner establishes a physical location.' },
];
