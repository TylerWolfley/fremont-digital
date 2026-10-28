# Website organization

This is a static website with a small Node build step and no runtime framework or third-party JavaScript dependencies.

## Source and output

- `src/data/business.mjs`: business name, location, email, and inquiry links.
- `src/data/services.mjs`: current service groups and separately declared future offerings.
- `src/data/homepage.mjs`: homepage copy, process, and practical questions.
- `src/config/publication.mjs`: validates the final HTTPS origin and separates review from release settings.
- `src/components/`: reusable HTML components and small code-native icons.
- `src/pages/`: homepage and 404 templates; the homepage composes the header, hero, services, business feature, process, practical questions, contact, and footer. A header-only rendering mode preserves the earlier review stage.
- `src/styles/tokens.css`: shared brand colors, typography, and spacing.
- `src/styles/header.css`: styles for the header and navigation.
- `src/styles/home.css`: page layout, ordered by section, with shared desktop/tablet/phone rules.
- `src/scripts/header.js`: progressive enhancement for native disclosure menus.
- `src/scripts/home.js`: opens the correct service category for section links, handles direct URLs and browser history changes, and provides clipboard copying with honest success/failure states.
- `scripts/`: build, local preview, offline review, and brand-asset utilities.
- `dist/`: generated pages, copied styles/scripts, and prepared assets. Edit `src/`, then build; do not separately edit generated HTML/CSS/JS.

The asset files in `dist/assets/` are preserved by the build. The scripts do not delete the output directory. Logo originals live in the repository's `logos/` folder and are never overwritten.

## Growing the service list

Add a current service to the appropriate group in `src/data/services.mjs`, with a stable ID, short name, and plain-language description. The desktop and mobile menus share that data. Keep future offerings in `futureServices` until the owner explicitly makes them available.

Four top-level groups organize the current offering: Web & Digital, Business Tech, Repairs & Tech, and Photo & Media. Specific tasks are combined into short inquiry choices within each group. Security installations remain a candidate in `../PROJECT-DECISIONS.md` until the owner confirms the scope. Phone resale can become a separate shop section when there is a location, inventory, and actual operating terms. There is no speculative commerce system in this draft.

## Navigation behavior

Native `details` and `summary` elements keep the disclosures usable without JavaScript. The enhancement closes sibling menus, handles Escape and outside clicks, restores focus after Escape, and resets menus across the desktop breakpoint. The mobile menu is an expandable navigation region, not a modal dialog.

The four-category desktop header starts at 1200px; keep the CSS and JavaScript breakpoint aligned. Expanded desktop panels and the mobile menu can scroll within the available viewport height as the service list grows.

Until service pages are designed, the individual service links explicitly open email inquiries. No form sends messages, and no success state claims receipt.

The homepage directory uses native `details` elements with one shared `name`, so opening a category closes the previous one in supporting browsers. All categories remain usable without JavaScript. With JavaScript, category shortcuts open their destination before scrolling; keyboard focus follows a clicked shortcut. The contact area uses an explicit mailto action, with a visible email address.

## Review workflow

Use `npm run build` to generate the static site, `npm run dev` for a local preview, or `npm run review` to regenerate the self-contained header and layout reviews in `reviews/02-header/` and `reviews/03-layout/`. The dev server regenerates both reviews when source changes. No install is required for these Node scripts.

GitHub synchronization and website deployment are separate actions. `dist/` is the review build and uses `noindex, nofollow`. `npm run build:release` requires the actual HTTPS origin in `SITE_URL` and writes a separate, ignored `release/` directory. It generates canonical/social URLs, structured business data, indexable homepage metadata, robots.txt, sitemap.xml, and a noindex 404 page. It does not deploy. The offline reviews always use the review build.

Run `npm run check` after building. The verification covers the corrected Wyoming location, all service inquiry destinations, internal anchors, asset availability, metadata settings, invalid/missing release addresses, category navigation, and clipboard success/failure/unavailable cases. Browser visual testing remains separate.
