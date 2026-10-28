# Fremont Digital project decisions

## Working method

Work in orderly stages. After reviewing the layout, the owner requested restrained character improvements, finished text, and preparation for publication. Current scope: the completed homepage copy, services, practical questions, contact behavior, search metadata, and release preparation. The existing supplied-logo favicon is retained. Keep the result available locally and synchronize source to the existing GitHub repository. Preparing for publication is not a request to deploy yet.

The owner rejected the first full site as generic and placeholder-like, then requested a rebuild around the content with a little western character. They liked that rebuilt design, but found its warm paper/rust colors generic and wanted a stronger technology identity that conveys leading local quality. Keep the content structure; the current style pass replaces the print-shop palette with midnight blue-green, bright turquoise, and cool off-white. Use crisp Manrope headings and interface text, with Bitter reserved for selected headline accents. A decorative terrain mesh, fine grid, precise numbering, and clear hover/focus feedback connect the western and digital influences. Preserve the original logo artwork. No fake heritage dates, fabricated local rankings, testimonials, performance counters, or availability indicators.

The homepage order is: compact header, “Big ideas. Everyday fixes.” opening with four customer-need shortcuts, four fully visible service chapters, a connected business-services journey, process, practical questions, direct contact panel, and compact footer. Use the actual FD monogram as a small mark in the service selector. Homepage copy lives in `site/src/data/homepage.mjs`; service content and shortcut wording live in the shared registry. Each section has its own component.

Keep the footer compact, with spacing proportional to its limited content. The owner rejected the oversized footer in the first full-layout draft.

The owner declined using a personal photograph. Do not add the supplied Central Park photo or an owner portrait.

## Brand sources

- Full wordmark: `logos/Fremont Digital Logo 1` (PNG file without an extension).
- FD symbol: `logos/fremont digital logo 2` (PNG file without an extension).
- These user-supplied files supersede the assets recovered from V1 and V2. Preserve the originals. Do not redraw the identity without a request.

## Direction

- The owner confirmed that the business is in **Fremont County, Wyoming**. This location supersedes all earlier assumptions and historical material. Keep site location text sourced from `site/src/data/business.mjs`.
- Aim to make the website a leading example of quality in Fremont County, Wyoming. Do not claim a verified ranking.
- Fremont Digital covers websites, digital marketing, professional photography, YouTube/video and media work, computer troubleshooting, virus cleanup, phone and basic device repairs, and other suitable technology jobs.
- Organize current services into Web & Digital, Business Tech, Repairs & Tech, and Photo & Media. Use one shared service registry for desktop/mobile navigation and future service pages.
- Phone resale is a future expansion after a physical location is established. Do not advertise inventory, purchases, trade-ins, or resale as available now.
- The site itself demonstrates capability. No featured websites, portfolio, fictional client projects, or case-study gallery.
- Personal, clear writing. No invented reviews, credentials, team, results, pricing, or turnaround guarantees.
- Business email: digitalfremont@gmail.com.
- The owner confirmed they do not yet own a domain. Do not invent a public URL. `SITE_URL` must be supplied with the actual HTTPS origin for a release build; it can be a chosen domain or the confirmed hosting address.

## Service scope refinement

The owner supplied a proposed five-category service list and asked us to use the helpful parts. The header draft now has four current categories, with security installation retained as a candidate below.

- **Web & Digital:** website builds, redesigns, maintenance, SEO, Google Business Profile setup and management, social media, and digital marketing. Do not promise rankings or marketing results.
- **Business Tech:** business email and domains; online booking, payments, and POS setup; workstations, Wi-Fi, printers, and scanners; inventory and business software; file transfers and backups; digital signage and QR menus. Keep these grouped into six clear inquiry choices rather than a separate navigation item for every task.
- **Repairs & Tech:** phone screens and charging ports; computer troubleshooting, component replacements and upgrades; virus and malware cleanup; device and software setup; personal file transfers.
- **Photo & Media:** business, product, and real estate photography; video production and YouTube content; editing and promotional content for websites and social media. Do not imply drone services or a portfolio of completed client work.
- **Security & Installation — candidate, not advertised yet:** camera and video doorbell setup, security-equipment troubleshooting, connected equipment, and remote-viewing apps. Confirm the owner's intended installation scope and ability to deliver it before adding a public service category. The supplied licensing caveat is not a verified determination of local requirements.
- **Not actively advertised:** TV mounting, VHS conversion, smartwatch setup, smart appliances, car electronics, and general handyman work. Keep the general inquiry invitation for unusual technology requests.

Website projects and business technology often connect: email, booking, payments, and office setup belong together in future service-page planning. Do not invent bundles or prices. Phone resale remains a separate future expansion, not part of the current service menu.

## Rejected artwork

- The generated copper sculpture is explicitly rejected. Do not include it in the site, previews, or future design directions. It is archived only locally in `reference/rejected-artwork/`, excluded from Git, and has no site references.
- This rejection applies to the sculpture, not to the supplied FD logo or the favicon preview. The later request to begin website coding authorizes the current header draft while preserving the step-by-step workflow.

## Existing material

`reference/` preserves the recovered handoff and original website archives. A private, unpublished Sites project has been registered in the local `site/.openai/hosting.json`; this deployment configuration is excluded from Git. Reuse that identity if publication is requested later. No website version has been deployed in this chat.

## Publication preparation

The site remains static, with no contact-form backend, analytics, or third-party scripts. Email actions open the visitor's email app; a clipboard option supports webmail users. Do not claim an inquiry was sent or received. The public copy gives project-based pricing guidance without inventing amounts or response-time promises.

Review builds in `site/dist/` remain noindex. A separate release command validates the actual HTTPS origin and builds `site/release/` with indexable metadata, canonical and social URLs, structured business information, robots.txt, sitemap.xml, and a 404 page. Never publish the whole repository or the `reviews/` and `reference/` directories as the website. See `site/LAUNCH.md` for the remaining address and browser-verification work.
