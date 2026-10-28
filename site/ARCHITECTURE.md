# Website organization

This is a static website with a small Node build step and no runtime framework or third-party JavaScript dependencies.

## Source and output

- `src/data/business.mjs`: business name, Wyoming location, email, and inquiry links.
- `src/data/services.mjs`: four current service groups, eighteen services, and separately declared future offerings.
- `src/data/catalog.mjs`: search aliases and the order of the eight starting services.
- `src/data/homepage.mjs`: process and FAQ copy.
- `src/config/publication.mjs`: validates the final HTTPS origin and separates review from release settings.
- `src/components/`: reusable HTML components and code-native icons.
- `src/pages/`: homepage and 404 templates. The homepage composes the header, service search, catalog, process, FAQ, contact, and footer. A header-only mode preserves the earlier review stage.
- `src/styles/tokens.css`: shared colors, typography, spacing, and controls.
- `src/styles/header.css`: header and navigation styles.
- `src/styles/home.css`: catalog, page sections, inquiry dialog, and responsive rules.
- `src/scripts/header.js`: progressive enhancement for native disclosure menus.
- `src/scripts/service-tools.js`: pure search, filtering, and email-draft helpers.
- `src/scripts/home.js`: search/filter state, category navigation, inquiry dialog, temporary drafts, and clipboard feedback.
- `src/reviews/`: source templates for the review controls.
- `scripts/`: build, local preview, offline review, verification, and brand-asset utilities.
- `dist/`: generated pages, copied styles/scripts, and prepared assets. Edit source files and rebuild instead of editing generated files separately.

The build preserves `dist/assets/` and does not delete the output directory. Original logos in the repository's `logos/` folder are never overwritten.

## Growing the service list

Add a current service to its group in `src/data/services.mjs`, with a stable ID, short name, and plain-language description. Add useful search aliases to `catalog.mjs`; update `startingServices` when the initial selection should change. Category counts and service cards derive from the registry.

The four groups are Web & Digital, Business Tech, Repairs & Tech, and Photo & Media. Security installations remain a candidate in `../PROJECT-DECISIONS.md` until the owner confirms the scope. Phone resale stays in `futureServices` until the owner makes it available. Neither is advertised in the current site.

## Navigation and catalog

The desktop header has one Services disclosure with four category links and an all-services link. It starts at 900px; keep the CSS and JavaScript breakpoint aligned. Native `details` elements keep navigation usable without JavaScript. Enhancement closes sibling menus, handles Escape/outside clicks, restores focus after Escape, and resets menus when crossing the breakpoint. The expandable mobile menu is not a modal.

All eighteen service cards and their email links exist in the HTML. With JavaScript enabled, the initial view shows eight services and offers a button to reveal all eighteen. Search matches every query word against normalized names, descriptions, and aliases. Category filters, live result counts, clear/reset controls, and a no-results state support browsing. Search stays entirely on the page.

Category links clear the query, select the group, and move keyboard focus to the results heading. Known category hashes also work on arrival or history changes. Without JavaScript, category links reach the complete catalog and the search/filter controls stay hidden. FAQ disclosures remain native.

## Inquiry behavior

Each service has a real `mailto:` link. Where native dialog support exists, selecting a service opens a labelled inquiry dialog with optional details and a contextual prompt. The Continue in email link carries the selected service and details into the visitor's email app for review and sending. It does not submit a message or claim receipt.

Drafts are held in memory per service while the page remains open. There is no account, server submission, local storage, or analytics. Unsupported dialog environments retain the original email link. The contact panel also displays the real email address and provides clipboard copying where supported, with honest success/failure feedback.

## Visual direction

The owner's references are Amazon, Facebook, and Google. The current design interprets that direction as a clear, useful service hub with familiar controls and readable content. It uses white, pale gray `#f5f7fb`, blue `#155dc7`, dark text `#172536`, and muted text `#536274`. Category icons add restrained color. Manrope is bundled locally, and original logos remain unchanged.

The former western signboard, dark hero, turquoise palette, and terrain mesh were rejected. They are not part of this design. Wyoming identity comes through the supplied brand and location. Preserve keyboard focus visibility, reduced-motion support, and the compact footer.

## Review and release workflow

Use `npm run build` to generate the static site, `npm run dev` for a local preview, or `npm run review` to regenerate the self-contained header and full-site reviews. The dev server regenerates both reviews when source changes. No dependency installation is required for these Node scripts.

Each review folder has identical `review.html` and `offline-review.html` files. Either can be opened directly; all resources are embedded. Never use a root-relative iframe source in these files: under `file://` it opens the drive root. Edit templates in `src/reviews/` and regenerate both filenames together.

Run `npm run check` after `npm run review`. Checks cover location, service links, anchors, assets, publication settings, search/filter helpers, simulated UI behavior, email encoding, draft handling, dialog fallback, clipboard states, and standalone preview entry points. These source and simulated interaction checks do not replace browser rendering or responsive visual review.

GitHub synchronization and deployment are separate. `dist/` is a review build with `noindex, nofollow`. `npm run build:release` requires the actual HTTPS origin in `SITE_URL` and writes an ignored `release/` directory with canonical/social URLs, structured business data, indexable homepage metadata, robots.txt, sitemap.xml, and a noindex 404 page. It does not deploy. Offline reviews always use the review build.
