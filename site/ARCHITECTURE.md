# Website organization

This is a static website with a small Node build step and no runtime framework or third-party JavaScript dependencies.

## Source and output

- `src/data/business.mjs`: business name, location, email, and inquiry links.
- `src/data/services.mjs`: current service groups and separately declared future offerings.
- `src/data/homepage.mjs`: short working copy for the full homepage layout.
- `src/components/`: reusable HTML components and small code-native icons.
- `src/pages/`: page templates; the homepage composes the header, hero, services, business feature, process, contact, and footer. A header-only rendering mode preserves the earlier review stage.
- `src/styles/tokens.css`: shared brand colors, typography, and spacing.
- `src/styles/header.css`: styles for the header and navigation.
- `src/styles/home.css`: page layout, ordered by section, with shared desktop/tablet/phone rules.
- `src/scripts/header.js`: progressive enhancement for native disclosure menus.
- `src/scripts/home.js`: opens the correct service category for section links, including direct URLs and browser history changes.
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

Keep the site local during the component-by-component review. GitHub synchronization and website deployment are separate actions. The current homepage uses `noindex, nofollow`; remove that only as part of an intentional launch after the page is complete.
