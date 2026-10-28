# Full homepage layout review

The owner authorized the whole site skeleton after reviewing the header. This stage prioritizes layout and organization, with short working copy that can be replaced later.

Open `offline-review.html` in a browser. Fonts, logos, styles, and interactions are embedded, so no server or internet connection is required. The width selector offers fit-to-window, 1440, 1200, 1024, 768, 390, and 320px. Scroll inside the page to review every section. The review toolbar is not part of the website.

## Page order

1. Existing header and four service menus.
2. Hero with the supplied FD monogram, service-category shortcuts, and two clear actions.
3. Expandable directory using the same four groups and eighteen services as the header.
4. Dark business-services section showing how website, booking, and support needs connect.
5. Three-step process with minimal working copy.
6. Contact section with the real email address and an explicit email-app action.
7. Footer with category shortcuts and a back-to-top link.

## Editing and behavior

- Working copy: `site/src/data/homepage.mjs`.
- Current services: `site/src/data/services.mjs`.
- Individual sections: named files in `site/src/components/`.
- Layout and responsive styles: `site/src/styles/home.css`; existing header styles remain separate.
- Category shortcuts open the correct directory section and move keyboard focus to its disclosure. Direct category hashes and history changes are handled.
- Email links prefill the subject. Nothing is submitted to a server.
- Native disclosures work without JavaScript; reduced-motion settings are respected.

Run `npm run review` from `site/` to rebuild both review stages. The earlier header review remains separate. No portfolio, invented reviews, speculative resale inventory, security-installation offering, or rejected artwork is included.

## Verification limits

Build, syntax, local asset references, internal section targets, and email destinations are checked. Browser interaction and responsive visual QA remain unverified because the browser tool blocked local preview access; no alternate browser automation was used. The layout is ready for owner review, not a claim of completed browser QA. No website deployment has occurred.
