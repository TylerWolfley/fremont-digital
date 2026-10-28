# Full website review

The owner liked the rebuilt content layout and requested stronger colors and a more convincing technology identity. This preview retains that layout with a midnight/turquoise palette, crisp interface typography, selected western serif accents, and a terrain mesh horizon. The existing review path is retained so the open preview stays useful.

Open either `review.html` or `offline-review.html` in a browser. Both are identical, self-contained previews: fonts, logos, styles, and interactions are embedded, so no server or internet connection is required. The width selector offers fit-to-window, 1440, 1200, 1024, 768, 390, and 320px. Scroll inside the page to review every section. The review toolbar is not part of the website.

## Page order

1. Compact header and four service menus.
2. “Big ideas. Everyday fixes.” dark hero, a decorative terrain mesh, and an interactive service selector using the supplied FD monogram.
3. Four visible service chapters using the same eighteen services as the header.
4. A business-services journey connecting online presence, booking, and everyday support.
5. Three-step process explaining how to start, agree on the work, and use the result.
6. Practical answers about cost, repair scope, location, and unlisted projects.
7. A direct contact panel with the real email address, an explicit email-app action, and a clipboard option where supported.
8. Compact footer with category shortcuts and a back-to-top link.

## Editing and behavior

- Homepage copy: `site/src/data/homepage.mjs`.
- Current services: `site/src/data/services.mjs`.
- Individual sections: named files in `site/src/components/`.
- Layout and responsive styles: `site/src/styles/home.css`; existing header styles remain separate.
- Category shortcuts move keyboard focus to the correct chapter heading. Direct category hashes and history changes are handled. Every service is visible without opening a disclosure.
- Email links prefill the subject. Nothing is submitted to a server.
- Header and FAQ disclosures work without JavaScript; reduced-motion settings are respected.

Run `npm run review` from `site/` to rebuild both review stages. The earlier header review remains separate. No portfolio, invented reviews, speculative resale inventory, security-installation offering, or rejected artwork is included.

## Verification limits

Build, syntax, local asset references, internal section targets, email destinations, publication settings, and clipboard success/failure logic are checked. Browser interaction and responsive visual QA remain unverified because the browser tool blocked local preview access; no alternate browser automation was used. The site is ready for final review, not a claim of completed browser QA. No website deployment has occurred. The owner does not yet own a domain; see `site/LAUNCH.md` for the remaining launch work.
