# Website organization

This is a static website with a small Node build step and no runtime framework or third-party JavaScript dependencies.

## Source and output

- `src/data/business.mjs`: business name, location, email, and inquiry links.
- `src/data/services.mjs`: current service groups and separately declared future offerings.
- `src/components/`: reusable HTML components and small code-native icons.
- `src/pages/`: page templates; currently only the homepage header and empty content area.
- `src/styles/tokens.css`: shared brand colors, typography, and spacing.
- `src/styles/header.css`: styles for the header and navigation.
- `src/scripts/header.js`: progressive enhancement for native disclosure menus.
- `scripts/`: build, local preview, offline review, and brand-asset utilities.
- `dist/`: generated pages, copied styles/scripts, and prepared assets. Edit `src/`, then build; do not separately edit generated HTML/CSS/JS.

The asset files in `dist/assets/` are preserved by the build. The scripts do not delete the output directory. Logo originals live in the repository's `logos/` folder and are never overwritten.

## Growing the service list

Add a current service to the appropriate group in `src/data/services.mjs`, with a stable ID, short name, and plain-language description. The desktop and mobile menus share that data. Keep future offerings in `futureServices` until the owner explicitly makes them available.

Three top-level groups keep the navigation understandable as the business grows. Phone resale can become a separate shop section when there is a location, inventory, and actual operating terms. There is no speculative commerce system in this draft.

## Navigation behavior

Native `details` and `summary` elements keep the disclosures usable without JavaScript. The enhancement closes sibling menus, handles Escape and outside clicks, restores focus after Escape, and resets menus across the desktop breakpoint. The mobile menu is an expandable navigation region, not a modal dialog.

Until service pages are designed, the individual service links explicitly open email inquiries. No form sends messages, and no success state claims receipt.

## Review workflow

Use `npm run build` to generate the static site, `npm run dev` for a local preview, or `npm run review` to regenerate the self-contained header review in `reviews/02-header/`. No install is required for these Node scripts.

Keep the site local during the component-by-component review. GitHub synchronization and website deployment are separate actions. The current homepage uses `noindex, nofollow`; remove that only as part of an intentional launch after the page is complete.
