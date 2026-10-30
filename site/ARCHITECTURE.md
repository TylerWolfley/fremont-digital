# Website organization

The website is static HTML/CSS/JavaScript built with Node. Production inquiries go directly to the saved Formspree endpoint. A separate Cloudflare Worker is retained as an optional alternative. No frontend framework or third-party browser script is required.

## Source map

- `src/data/business.mjs`: name, countywide Wyoming location, email, display phone, and dialable phone.
- `src/data/services.mjs`: four categories and eighteen service IDs. Future phone resale is kept separate.
- `src/data/service-guides.mjs`: category explanations, outcomes, scope notes, service detail, and contextual form prompts.
- `src/data/homepage.mjs`: process and FAQs.
- `src/components/`: header, hero, category panels, process, FAQ, contact form, footer, metadata, and icons.
- `src/pages/`: homepage and 404 composition.
- `src/config/publication.mjs`: final site-origin validation and review/release metadata.
- `src/config/contact.mjs`: public inquiry endpoint validation. Credentials never enter the frontend.
- `src/styles/`: shared tokens, header styles, and responsive page styles.
- `src/scripts/header.js`: native disclosure enhancements.
- `src/scripts/home.js`: category tabs, contextual inquiry form, validation feedback, preview, and submission states.
- `src/scripts/inquiry-tools.js`: dependency-free validation and submission helpers, also used by server verification.
- `server/inquiry.mjs`: validates and rate-limits requests, then sends to the fixed business email through Resend.
- `server/README.md`: delivery configuration and deployment prerequisites.
- `src/reviews/`: editable source for the review wrapper.
- `scripts/`: build, review, local development, and meaningful verification scripts.
- `dist/`: generated review website. Edit source and rebuild; do not edit generated pages separately.

The build preserves prepared assets. Original logo files in `../logos/` remain unchanged. Historical archives are not public website assets.

## Visitor experience

The opening states the business purpose, phone number, countywide coverage, remote help, on-site visits, and arranged drop-off. Four category tiles lead to detailed service panels. Each panel combines relevant service explanations with outcomes, scope expectations, and advice for a first inquiry. There is no search bar, filtering sidebar, or repeated product-card catalog.

All four panels exist in HTML and remain available without JavaScript. JavaScript turns the category links into an accessible tab interface, with selected state, roving focus, arrow keys, Home/End, and deep-link handling. Native service and FAQ disclosures work independently of JavaScript. Category header links open and focus the corresponding content. The desktop header breakpoint is 900px in both CSS and JavaScript.

Selecting a category or individual service for an inquiry carries the context into the form. Prompts vary for websites, business tools, repairs, and media. Name and reply contact stay shared while message/context/timing drafts are retained per category in page memory. Drafts are never saved in browser storage.

The phone number is available through `tel:` links in the header, hero, contact section, and footer. Email is visible in the contact section and mobile menu. Without JavaScript the form stays hidden and a direct phone/email fallback remains.

## Form and delivery

Review builds always use a local preview form. It validates and displays the prepared request, clearly states that nothing was sent, and makes no network request. It must never display a sending success message.

Release builds require `SITE_URL` and default to the public Formspree endpoint saved in `src/config/contact.mjs`. `CONTACT_ENDPOINT` can override it with another valid Formspree endpoint or an HTTPS `/api/inquiry` handler; an explicitly empty override produces a disconnected preview. The form disables controls while pending, preserves details on errors, and confirms success only after the provider accepts the request. The owner confirmed a real submission and inbox receipt on October 30, 2026.

Formspree receives the selected reply method, the appropriate email or phone field, inquiry details, and a honeypot. The custom endpoint alone receives retry keys; Formspree requests do not send that custom header. Frontend checks and mocked delivery tests do not verify the provider's spam filtering, quota, or account configuration.

The optional separate server validates the origin, content type, request identifier, body size, fields, category/service pairing, and honeypot; a required runtime rate-limiter binding limits requests. The recipient is fixed in business data. User text is sent as plain text, and an email reply-to is used only for a validated email contact. Provider credentials remain in runtime secrets. These are features of the retained alternative server, not claims about the active Formspree configuration. See `server/README.md` before switching delivery providers.

## Visual direction

Keep the cleaner white/gray/blue foundation, original branding, and locally bundled Manrope font. Main descriptions are 15–17px, controls are legible, and the footer remains compact. The Amazon/Facebook/Google references guide familiarity and clarity; the owner explicitly agreed to removing search and catalog styling. Do not restore rejected artwork, dark/turquoise terrain designs, fabricated proof, a portrait, or a portfolio.

## Build, review, and verification

From `site/`, run `npm run review` and `npm run check`. `npm run dev` serves the local review and regenerates it after source changes. Both `review.html` and `offline-review.html` in each review folder are identical self-contained files. The builder embeds assets and scripts; never replace the iframe with a root-relative URL that opens the drive root under `file://`.

Checks cover business details, phone links, service coverage, anchors, assets, release settings, contextual forms, validation, tab keyboard behavior, drafts, submission retries, backend failures, and offline review integrity. Provider calls are mocked; no test emails are sent. These checks do not establish browser layout, accessibility, inbox delivery, or performance scores.

GitHub synchronization does not deploy. Normal builds stay noindex; `build:release` writes ignored `release/` output after configuration validation. The existing Sites project was reused for the October 30, 2026 public launch. Its separate publishing checkout places the release files in `dist/`, the static directory declared by its hosting manifest. The inquiry endpoint is deployed separately when connected.
