// The current service registry is the source for navigation and future service pages.
// Keep individual services within these groups instead of growing the top-level menu.
export const serviceGroups = [
  {
    id: 'web-digital',
    navLabel: 'Web & Digital',
    prompt: 'Build my website.',
    hint: 'Websites, search & marketing',
    title: 'Give your business a proper home online.',
    description: 'You put real work into your business. Your website should show it. Let’s make it easy for people to see what you do, find what they need, and get in touch.',
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
    prompt: 'Set up my business.',
    hint: 'Email, payments & everyday tools',
    title: 'Less fiddling. More getting on with it.',
    description: 'The printer, the Wi-Fi, the booking system: the little things can eat up a workday. Get help setting up the tools behind your business so they fit the way you work.',
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
    prompt: 'Get my tech working.',
    hint: 'Phone repairs, computers & support',
    title: 'Cracked. Slow. Just plain stuck.',
    description: 'A phone that won’t charge. A computer taking forever. A pop-up that doesn’t look right. Tell me what’s happening and which device you’re using. We’ll start there.',
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
    prompt: 'Make something worth seeing.',
    hint: 'Photography, video & YouTube',
    title: 'Show people what you’re all about.',
    description: 'The product you make. The place you’re selling. The story you want to tell. Bring it into focus with photography, video, and editing for your business or your next project.',
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
