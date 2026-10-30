# Website organization

The website is static HTML/CSS/JavaScript built with Node. Production inquiries go directly to the saved Formspree endpoint. A separate Cloudflare Worker is retained as an optional alternative. No frontend framework or third-party browser script is required.

## Source map

- `src/data/business.mjs`: name, Fremont County/Wyoming base, email, display phone, and dialable phone. Remote projects are not limited to the county.
- `src/data/pages.mjs`: six routes, navigation labels, page metadata, and inquiry URLs; shared by the build and sitemap.
- `src/data/services.mjs`: four categories and twenty services, including workflow automation and screen repair. Future phone resale stays separate.
- `src/data/repair-pricing.mjs`: two screen options. Dollar amounts await supplier and labor decisions.
- `src/data/past-work.mjs`: the two owner-supplied website examples.
- `src/components/website-offer.mjs`: build deliverables, what the quote specifies, and flexible post-launch support arrangements.
- `src/components/home-editorial.mjs`: open service rows, Tyler Wolfley's introduction, and the homepage closing. The hero uses the original FD monogram as a decorative background; the old dark connection diagram is removed.
- `src/components/automation-demo.mjs` and `src/scripts/automation-demo.js`: a local, fictional inquiry-to-record-and-task demonstration, with sample selection, completion, and reset. It sends nothing and connects to no accounts.
- `src/styles/studio.css`: the current homepage composition, larger project previews, compact build/support layout, and interactive automation example.
- `scripts/make-project-previews.mjs`: optional Sharp utility to optimize the dated real browser captures under `reviews/07-offer/`; normal builds do not require Sharp.
- `src/data/service-guides.mjs`: category explanations, outcomes, scope notes, service detail, and contextual form prompts.
- `src/data/homepage.mjs`: process and FAQs.
- `src/components/`: shared header/footer, hero, page sections, process, FAQ, contact form, past work, metadata, and icons.
- `src/pages/`: shared document shell plus home, service, contact, and 404 composition.
- `src/config/publication.mjs`: final site-origin validation and review/release metadata.
- `src/config/contact.mjs`: public inquiry endpoint validation. Credentials never enter the frontend.
- `src/styles/`: shared tokens, header styles, and responsive page styles.
- `src/scripts/header.js`: disclosure enhancements and old one-page hash redirects.
- `src/scripts/home.js`: contact-page controller, validated URL preselection, quote fields, drafts, validation, preview, and submission states. The tab controller is removed.
- `src/scripts/inquiry-tools.js`: dependency-free validation and submission helpers, also used by server verification.
- `server/inquiry.mjs`: validates and rate-limits requests, then sends to the fixed business email through Resend.
- `server/README.md`: delivery configuration and deployment prerequisites.
- `src/reviews/`: editable source for the review wrapper.
- `scripts/`: build, review, local development, and meaningful verification scripts.
- `dist/`: generated review website. Edit source and rebuild; do not edit generated pages separately.

The build preserves prepared assets. Original logo files in `../logos/` remain unchanged. Historical archives are not public website assets.

## Visitor experience

The homepage prioritizes website design and small-business automation. Repairs and media sit under “More services” and have secondary homepage links. “Fremont County, Wyoming” establishes the business's base, not a geographic restriction on remote work.

General office setup, networking, email/domain configuration, backups, and signage are now grouped under Repairs & Tech Help. Automation focuses on workflows, booking/payments, and business software. Legacy inquiry URLs for the moved service IDs are migrated to the new category. The contact page adjusts its introduction and repair-only arrangements/FAQs to the chosen inquiry type. The owner supplied the name Tyler Wolfley and the statement that he has been coding since 2006; this does not imply a company founding date or professional employment history.

The six routes are `/`, `/websites/`, `/automation/`, `/repairs/`, `/media/`, and `/contact/`. Each has its own HTML, title, description, and canonical URL. Links, service disclosures, and FAQs work without JavaScript. The desktop header breakpoint is 1080px in CSS and JavaScript. Legacy homepage hashes for the four categories, contact, and FAQs redirect to the corresponding pages when JavaScript is available.

Inquiry links carry category and service IDs into the contact page. The form accepts only known categories and matching service IDs and focuses the visible name field. Screen-repair links carry a validated screen preference; the request requires the device model and a standard, genuine, or compare-options choice. No client-side price is invented. Name/contact stay shared while message/context/timing drafts are retained per category in memory, never persistent storage.

Phone links remain in the header, hero, contact page, and footer. Email is in the contact page and mobile menu. Without JavaScript, the form stays hidden and direct phone/email alternatives remain available.

## Form and delivery

Review builds always use a local preview form. It validates and displays the prepared request, clearly states that nothing was sent, and makes no network request. It must never display a sending success message.

Release builds require `SITE_URL` and default to the public Formspree endpoint saved in `src/config/contact.mjs`. `CONTACT_ENDPOINT` can override it with another valid Formspree endpoint or an HTTPS `/api/inquiry` handler; an explicitly empty override produces a disconnected preview. The form disables controls while pending, preserves details on errors, and confirms success only after the provider accepts the request. The owner confirmed a real submission and inbox receipt on October 30, 2026.

Formspree receives the selected reply method, email or phone, inquiry details, and a honeypot. Screen-repair requests also include `device_model` and `screen_option`; these fields are validated and cleared from unrelated requests. The custom endpoint alone receives retry keys; Formspree requests do not send that custom header. Frontend checks and mocked delivery tests do not verify the provider's spam filtering, quota, or account configuration.

The optional separate server validates the origin, content type, request identifier, body size, fields, category/service pairing, and honeypot; a required runtime rate-limiter binding limits requests. The recipient is fixed in business data. User text is sent as plain text, and an email reply-to is used only for a validated email contact. Provider credentials remain in runtime secrets. These are features of the retained alternative server, not claims about the active Formspree configuration. See `server/README.md` before switching delivery providers.

## Visual direction

Keep the cleaner white/gray/blue foundation, original branding, and locally bundled Manrope font. Main descriptions are 15–17px, controls are legible, and the footer remains compact. The Amazon/Facebook/Google references guide familiarity and clarity; the owner explicitly agreed to removing search and catalog styling. Do not restore rejected artwork, dark/turquoise terrain designs, fabricated proof, or a portrait. The owner subsequently authorized two modest past-work links on the website page; keep them secondary.

## Build, review, and verification

From `site/`, run `npm run review` and `npm run check`. `npm run dev` serves the local review and regenerates it after source changes. Both `review.html` and `offline-review.html` in each review folder are identical self-contained files. The builder embeds assets and scripts; cross-page links in these one-page snapshots go to the public domain. Use the local server for the complete multi-page preview. Never point a file-based iframe at the drive root.

Checks cover six page outputs, internal links, unique metadata, service coverage, inquiry URL handoffs, required quote fields, labels, menu focus, drafts, submission retries, backend failures, and review integrity. The actual-DOM suite exercises the rendered contact page and URLs generated by every service page. Provider calls are mocked; no test emails are sent. These checks do not establish browser layout, accessibility, inbox delivery, or performance scores.

`verify-automation-demo.mjs --jsdom-module <installed-jsdom-path>` checks sample execution, task completion, repeat runs, sample changes, reset/focus, and legacy category migration. The demo is explicitly an illustration, not evidence of a deployed customer integration. Browser layout evidence for this revision is under `reviews/08-editorial/` at the repository root.

GitHub synchronization does not deploy. Normal builds stay noindex; `build:release` writes ignored `release/` output after configuration validation. The existing Sites project was reused for the October 30, 2026 public launch. Its separate publishing checkout places the release files in `dist/`, the static directory declared by its hosting manifest. The inquiry endpoint is deployed separately when connected.
