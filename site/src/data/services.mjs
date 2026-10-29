// The current service registry is the source for navigation and future service pages.
// Keep individual services within these groups instead of growing the top-level menu.
export const serviceGroups = [
  {
    id: 'web-digital',
    navLabel: 'Web & Digital',
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
