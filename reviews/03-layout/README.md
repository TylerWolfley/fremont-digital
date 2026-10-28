# Full website review

The owner rejected the previous design and named Amazon, Facebook, and Google as references. This ground-up rebuild uses a clean service-hub structure: prominent search, category filters, service cards, and a guided email inquiry. The existing review path remains the entry point.

Open either `review.html` or `offline-review.html` in a browser. Both are identical, self-contained previews with embedded fonts, logos, styles, and scripts. No server or internet connection is required. The width selector offers fit-to-window, 1440, 1200, 1024, 768, 390, and 320px. Scroll inside the page to inspect each section. The review toolbar is not part of the website.

## Page order

1. Compact header with Services, How it works, FAQs, and Get in touch.
2. “What can we help you with?” search and four category shortcuts.
3. Filterable service catalog, initially showing eight services with a button to reveal all eighteen.
4. Three-step process.
5. Practical FAQs about costs, repairs, location, and other projects.
6. Contact panel with the actual email address and clipboard option where supported.
7. Compact footer.

Selecting a service opens a native inquiry dialog where supported. Optional details are added to an email draft; Continue in email opens the visitor's email app for review and sending. Nothing is submitted by the website. Temporary drafts stay in memory while the page is open.

## Editing and behavior

- Business details: `site/src/data/business.mjs`.
- Services: `site/src/data/services.mjs`.
- Search aliases and initial selection: `site/src/data/catalog.mjs`.
- Process and FAQ copy: `site/src/data/homepage.mjs`.
- Layout: `site/src/components/` and `site/src/styles/`.
- Search/filter/email helpers: `site/src/scripts/service-tools.js`.
- Page interactions: `site/src/scripts/home.js`.

Search works locally against names, descriptions, and aliases. Category selection clears the search and narrows the catalog; clear/reset restores the starting selection. Category shortcuts move keyboard focus to the result heading. Known category hashes work on entry and history changes. Without JavaScript, all eighteen services and email links remain available, and search/filter controls stay hidden. Header and FAQ disclosures use native HTML.

Run `npm run review` from `site/` to rebuild both review stages, then `npm run check`. No personal portrait, portfolio, invented reviews, resale inventory, security installation offering, or rejected artwork is included.

## Verification limits

Build, syntax, assets, anchors, email destinations, publication settings, search/filter behavior, inquiry drafts, dialog fallback, and clipboard feedback receive source or simulated interaction checks. Browser interaction and responsive visual QA remain unverified because browser access to the local preview was blocked. No alternate browser automation was used.

No website deployment has occurred. The owner does not yet own a domain; see `site/LAUNCH.md` for remaining launch work.
