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
- `src/scripts/home.js`: moves keyboard focus into a service chapter for section links, handles direct URLs and browser history changes, and provides clipboard copying with honest success/failure states.
- `src/reviews/`: source templates for the header and layout review controls. The builder embeds the website into these templates.
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

The homepage directory is four visible `article` sections. All eighteen service choices remain visible without JavaScript; nothing is hidden in a service accordion. Category shortcuts move keyboard focus to the destination heading. The header menus and FAQ retain native `details` elements. The contact area uses an explicit mailto action, with a visible email address.

## Visual direction

The owner liked the rebuilt layout and requested a stronger technology identity. The current palette uses midnight `#061923`, panel blue-green `#102c38`, turquoise `#68edc6`, cool off-white `#f8fbfa`, and a darker teal `#087765` for readable accents on light surfaces. Shared semantic color tokens live in `src/styles/tokens.css`; do not reuse the former paper/rust palette.

Manrope leads the headings and interface; Bitter appears in selected headline accents to preserve a western influence. Both are bundled locally with their licenses. The Bitter font comes from the [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/bitter). Original logo bytes are preserved. `src/components/landscape.mjs` is a decorative terrain mesh with survey-like traces, not a map or a depiction of a named range. Fine grids and responsive hover/focus states support the digital identity without fake terminal output, metrics, or availability claims. Keep reduced-motion support and clear keyboard focus states.

## Review workflow

Use `npm run build` to generate the static site, `npm run dev` for a local preview, or `npm run review` to regenerate the self-contained header and layout reviews in `reviews/02-header/` and `reviews/03-layout/`. The dev server regenerates both reviews when source changes. No install is required for these Node scripts.

Each review folder has identical `review.html` and `offline-review.html` files. Either file can be opened directly or downloaded individually; all resources are embedded. Never put a root-relative iframe source in these files: under `file://` it opens the drive root instead of the site. Edit the templates in `src/reviews/` and regenerate both filenames together.

GitHub synchronization and website deployment are separate actions. `dist/` is the review build and uses `noindex, nofollow`. `npm run build:release` requires the actual HTTPS origin in `SITE_URL` and writes a separate, ignored `release/` directory. It generates canonical/social URLs, structured business data, indexable homepage metadata, robots.txt, sitemap.xml, and a noindex 404 page. It does not deploy. The offline reviews always use the review build.

Run `npm run check` after `npm run review`. The verification covers the corrected Wyoming location, all service inquiry destinations, internal anchors, asset availability, metadata settings, invalid/missing release addresses, category navigation, clipboard success/failure/unavailable cases, and self-contained preview entry points. Browser visual testing remains separate.
