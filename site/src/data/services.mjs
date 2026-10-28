// The current service registry is the source for navigation and future service pages.
// Keep individual services within these groups instead of growing the top-level menu.
export const serviceGroups = [
  {
    id: 'web-digital',
    navLabel: 'Web & Digital',
    title: 'A better place to find you.',
    description: 'Give customers a clear picture of what you do and an easy way to reach you. Build a new website, improve an existing one, or get help with your presence online.',
    services: [
      { id: 'website-builds', name: 'Website builds', description: 'Mobile-friendly websites with clear navigation and a straightforward way to get in touch.' },
      { id: 'website-updates', name: 'Website updates & care', description: 'Redesigns, content updates, and ongoing maintenance.' },
      { id: 'seo', name: 'Search engine optimization', description: 'Page structure, content, and practical improvements to help people find your business.' },
      { id: 'google-business-profile', name: 'Google Business Profile', description: 'Set up your local listing and keep business information current.' },
      { id: 'digital-marketing', name: 'Social media & marketing', description: 'Content and support to help you show up consistently online.' },
    ],
  },
  {
    id: 'business-tech',
    navLabel: 'Business Tech',
    title: 'Make the everyday work easier.',
    description: 'Get the tools behind your business working together: email, booking, payments, Wi-Fi, and office equipment. Practical setup and support for the way you work.',
    services: [
      { id: 'email-domains', name: 'Business email & domains', description: 'Domain configuration, professional email accounts, and setup on your devices.' },
      { id: 'booking-payments', name: 'Booking & payment systems', description: 'Online scheduling, payments, and point-of-sale setup.' },
      { id: 'office-networking', name: 'Office setup & Wi-Fi', description: 'Workstations, networking, printers, and scanners.' },
      { id: 'business-software', name: 'Business software setup', description: 'Configure inventory tools and everyday software around your workflow.' },
      { id: 'business-backups', name: 'Data transfers & backups', description: 'Move business files and set up a backup routine.' },
      { id: 'signage-menus', name: 'Digital signage & QR menus', description: 'Help customers find your menu, information, and offers.' },
    ],
  },
  {
    id: 'repairs-tech',
    navLabel: 'Repairs & Tech',
    title: 'Get your everyday tech working.',
    description: 'A damaged phone, a slow computer, or software that won’t cooperate? Tell me the device model and what’s happening. I’ll help you work out the next step.',
    services: [
      { id: 'phone-repair', name: 'Phone & device repairs', description: 'Screen, charging-port, and other repairs, depending on the device and parts needed.' },
      { id: 'computer-help', name: 'Computer repairs & upgrades', description: 'Troubleshooting, component replacements, and upgrades.' },
      { id: 'virus-cleanup', name: 'Virus & malware cleanup', description: 'Help investigating suspicious behavior and removing unwanted software.' },
      { id: 'setup-support', name: 'Device & software setup', description: 'New devices, software installation, and personal file transfers.' },
    ],
  },
  {
    id: 'photo-media',
    navLabel: 'Photo & Media',
    title: 'Bring your next idea into focus.',
    description: 'Show what you make, what you do, and what makes your business yours. Photography, video, and editing for websites, social media, and YouTube.',
    services: [
      { id: 'photography', name: 'Professional photography', description: 'Photos for businesses, products, and real estate.' },
      { id: 'video-production', name: 'Video & YouTube content', description: 'Planning, filming, and content for your business or channel.' },
      { id: 'video-editing', name: 'Editing & promotional media', description: 'Video editing and content for your website and social media.' },
    ],
  },
];

// Not rendered publicly. No inventory, trade-ins, pricing, or purchase flow yet.
export const futureServices = [
  { id: 'phone-resale', name: 'Phone resale', condition: 'After the owner establishes a physical location.' },
];
