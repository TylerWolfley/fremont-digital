# Fremont Digital project decisions

## Working method

Work in orderly stages. After reviewing the layout, the owner requested restrained character improvements, finished text, and preparation for publication. Current scope: the completed homepage copy, services, practical questions, contact behavior, search metadata, and release preparation. The existing supplied-logo favicon is retained. Keep the result available locally and synchronize source to the existing GitHub repository. Preparing for publication is not a request to deploy yet.

The owner rejected the western/turquoise design and requested a complete rebuild. When asked for references, they said “think amazon.com, facebook, and google.” Those references guide clarity, familiar navigation, and useful interactions. The cleaner white, light gray, accessible blue, and Manrope foundation was received favorably. Do not restore the signboard, wireframe scenery, paper/rust theme, or turquoise interface. Original logos and the Wyoming identity remain.

On October 29, 2026, the owner approved removing search and the filter sidebar, strengthening the opening, adding service depth, increasing readability, and replacing email-app-only inquiries with a proper form. The current homepage has four category tiles and rich service panels, process, FAQs, phone/email contact, a contextual form, and a compact footer. Service/category selection carries context into the inquiry form. All category panels remain available without JavaScript. No accounts, cart, fictional reviews, fabricated metrics, or portfolio are included.

The owner supplied **(307) 349-4694** and confirmed **all of Fremont County, Wyoming** is served through **remote help, on-site customer visits, and arranged device drop-off**. These are confirmed operating details. Do not ask whether service is limited to Riverton or invent a narrower service area. There is still no public storefront; drop-off is arranged first. Do not invent operating hours or response times.

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
- Business phone: (307) 349-4694; dialable link `tel:+13073494694`.
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

The public website remains static with no analytics or third-party browser scripts. A separate inquiry handler in `site/server/` implements validation, rate limiting, fixed-recipient email delivery, and honest success/failure responses. It has not been connected to a delivery account or deployed. Review forms explicitly validate and preview only; they never send. Live forms require a configured endpoint and only confirm success after the server accepts the request. Drafts remain in page memory, with no browser storage. Phone and email are always direct alternatives. No prices or response-time promises are invented.

Review builds in `site/dist/` remain noindex. A separate release command validates the actual HTTPS origin and inquiry endpoint before building `site/release/` with indexable metadata, canonical/social URLs, structured business information including phone, robots.txt, sitemap.xml, and a 404 page. Never publish the repository, server source, reviews, or historical references as the website. See `site/LAUNCH.md` for remaining delivery connection, address, and browser-verification work.
