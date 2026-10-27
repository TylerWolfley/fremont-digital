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
      { id: 'website-updates', name: 'Website updates & care', description: 'Redesigns, content updates, and ongoing maintenance.' },
      { id: 'seo', name: 'Search engine optimization', description: 'Help people find and understand your website.' },
      { id: 'google-business-profile', name: 'Google Business Profile', description: 'Set up and maintain your local business listing.' },
      { id: 'digital-marketing', name: 'Social media & marketing', description: 'Content and practical help promoting your business online.' },
    ],
  },
  {
    id: 'business-tech',
    navLabel: 'Business Tech',
    title: 'Make the everyday work easier.',
    description: 'From business email to the tools at your counter, get help connecting the technology your business runs on.',
    services: [
      { id: 'email-domains', name: 'Business email & domains', description: 'A business email address and help connecting your domain.' },
      { id: 'booking-payments', name: 'Booking & payment systems', description: 'Online scheduling, payments, and point-of-sale setup.' },
      { id: 'office-networking', name: 'Office setup & Wi-Fi', description: 'Workstations, networking, printers, and scanners.' },
      { id: 'business-software', name: 'Business software setup', description: 'Get inventory tools and everyday business software ready to use.' },
      { id: 'business-backups', name: 'Data transfers & backups', description: 'Move business files and set up a backup routine.' },
      { id: 'signage-menus', name: 'Digital signage & QR menus', description: 'Help customers find your menu, information, and offers.' },
    ],
  },
  {
    id: 'repairs-tech',
    navLabel: 'Repairs & Tech',
    title: 'Get your everyday tech working.',
    description: 'Tell me what device you have and what is going wrong. We can work out the next step from there.',
    services: [
      { id: 'phone-repair', name: 'Phone & device repairs', description: 'Screens, charging ports, and smaller fixes.' },
      { id: 'computer-help', name: 'Computer repairs & upgrades', description: 'Troubleshooting, component replacements, and upgrades.' },
      { id: 'virus-cleanup', name: 'Virus & malware cleanup', description: 'Help with unwanted software and suspicious behavior.' },
      { id: 'setup-support', name: 'Device & software setup', description: 'New devices, software installation, and personal file transfers.' },
    ],
  },
  {
    id: 'photo-media',
    navLabel: 'Photo & Media',
    title: 'Bring your next idea into focus.',
    description: 'Professional photos and media for your business, your content, or your next project.',
    services: [
      { id: 'photography', name: 'Professional photography', description: 'Photos for businesses, products, and real estate.' },
      { id: 'video-production', name: 'Video & YouTube content', description: 'Turn an idea into a video worth watching.' },
      { id: 'video-editing', name: 'Editing & promotional media', description: 'Video editing and content for your website and social media.' },
    ],
  },
];

// Not rendered publicly. No inventory, trade-ins, pricing, or purchase flow yet.
export const futureServices = [
  { id: 'phone-resale', name: 'Phone resale', condition: 'After the owner establishes a physical location.' },
];
