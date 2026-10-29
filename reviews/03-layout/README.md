# Full website review

The owner approved simplifying the service hub: remove search and the sidebar, add deeper service explanations, increase text size, and improve inquiries. The confirmed phone is **(307) 349-4694**. Service covers **all of Fremont County, Wyoming**, with remote help, on-site visits, and arranged device drop-off.

Open either `review.html` or `offline-review.html`. Both are identical self-contained previews containing all fonts, images, styles, and scripts. No server or internet connection is needed. The width selector includes 1440, 1200, 1024, 768, 390, and 320px. The review toolbar is not part of the website.

## Page order

1. Compact navigation with a call link.
2. “Your local connection for all things tech” opening and direct phone contact.
3. Four service categories with detailed explanations, scope, outcomes, and inquiry prompts.
4. Three-step process.
5. FAQs including countywide coverage and arranged drop-off.
6. Phone/email contact, service arrangements, and contextual inquiry form.
7. Compact footer with phone contact.

Category tiles act as keyboard-accessible tabs when JavaScript is available. Without JavaScript all category panels remain visible. Individual service and FAQ disclosures are native HTML.

Selecting a service carries it into the form. The form asks for relevant context for websites, business technology, device repair, or photography/media. Category drafts stay in memory only while the page is open.

## Preview form

The offline preview validates and displays a request summary but does not send anything. Its preview notice and result state explain this explicitly. Phone and email links are direct contact options. The real submission controller and backend are implemented, but live delivery requires the setup in `site/server/README.md` before release.

## Editing

- Phone, email, and location: `site/src/data/business.mjs`.
- Service names and IDs: `site/src/data/services.mjs`.
- Category/detail content and prompts: `site/src/data/service-guides.mjs`.
- Process and FAQs: `site/src/data/homepage.mjs`.
- Layout: `site/src/components/` and `site/src/styles/`.
- Browser behavior: `site/src/scripts/`.

Run `npm run review` and `npm run check` from `site/` after edits. Browser layout and interaction QA remain unverified because local browser access was blocked; no alternate browser automation was used. Source and simulated interaction checks passed, including backend success/failure handling with mocked delivery. No real test message or website deployment has occurred.
