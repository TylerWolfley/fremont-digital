# Fremont Digital

Website and brand assets for Fremont Digital, an independent technology business in Fremont County, Wyoming.

Websites and small-business automation are the main priorities. Repairs, technology setup, photography, and media remain secondary services. Fremont Digital is based in Fremont County, Wyoming; website and automation projects can be handled remotely for customers elsewhere. Local visits and device drop-off are arranged individually. Business inquiries: **(307) 349-4694** or **digitalfremont@gmail.com**.

## Current stage

**V1 approved by the owner on October 29, 2026.** The `v1.0.0` Git tag preserves this website milestone. Further improvements should build from this accepted version. See [version history](CHANGELOG.md).

The current revision treats that V1 as a starting point, not proof of sales effectiveness. Six pages now separate Home, Websites, Business Automation, Repairs & Tech Help, Photography & Media, and Contact. The homepage and main navigation prioritize websites and automation. Copy has been rewritten around customer needs, and the [sales review](reviews/06-pages/sales-review.txt) records specific weaknesses, fixes, and unresolved gaps. Browser access is restored. The owner's Formspree endpoint remains connected; the owner previously confirmed successful delivery.

| Component | Status |
| --- | --- |
| Supplied wordmark and FD symbol | Brand sources received |
| Favicon | Prepared from the supplied FD symbol |
| Header and service navigation | Six-page structure; desktop and mobile navigation checked |
| Homepage and service copy | Revised V1 draft with websites and automation first; conversion effectiveness is not established |
| Screen repair quotes | Model-based quotes with standard and genuine/OEM choices, subject to availability |
| Online inquiries | Formspree connected; owner confirmed successful submission and email receipt |
| Public web address | `digitalfremont.com`, purchased through Namecheap |
| Website deployment | Public at https://digitalfremont.com; www also connected with HTTPS |

The current `site/dist/` contains all six preview pages. The Websites page includes the two owner-supplied past projects in a modest row. There is no owner portrait or fictional client gallery. Phone resale remains a future expansion after a physical location is established.

Read [PROJECT-DECISIONS.md](PROJECT-DECISIONS.md) before making changes. Its current decisions take precedence over historical V1/V2 handoff material.

## Project layout

```text
logos/                    Owner-supplied original logo files
reviews/01-favicon/        Favicon preview, source record, and review notes
reviews/02-header/         Header review, including a self-contained HTML preview
reviews/03-layout/         Full homepage review with desktop and phone widths
reviews/06-pages/          Sales review, responsive checks, and six-page screenshots
site/src/                 Shared content, components, page templates, styles, scripts
site/dist/assets/favicons/ Browser icons and Apple touch icon
site/dist/assets/          Prepared wordmark, bundled fonts, and licenses
site/scripts/              Build, preview, and asset utilities
site/server/               Inquiry delivery handler and connection instructions
reference/                Historical V1/V2 archives and handoff documents
```

The two original logo files are PNG images without filename extensions. Their supplied names and bytes are preserved.

## Layout development

See [site architecture](site/ARCHITECTURE.md). Use the local development server for the complete six-page preview. The two `reviews/03-layout/` HTML files retain standalone homepage snapshots; their cross-page links open the public site. The earlier header-only review is retained in `reviews/02-header/`.

With Node.js 20 or newer, run from `site/`:

```sh
npm run review
npm run check
npm run dev
```

No dependency installation is needed for the static build or standard tests. The complete local preview starts at `http://127.0.0.1:4173/`; the legacy layout and header snapshots remain at `/review/layout` and `/review/header`. Run `npm run review` after changes. Page paths and metadata live in `site/src/data/pages.mjs`, service IDs in `site/src/data/services.mjs`, service copy in `site/src/data/service-guides.mjs`, and repair quote choices in `site/src/data/repair-pricing.mjs`. Additional actual-DOM checks use jsdom as documented in the architecture notes.

See [launch record](site/LAUNCH.md) and [inquiry connection instructions](site/server/README.md). Review builds stay out of search and never send forms. A release requires the actual web address and uses the saved Formspree endpoint by default. `CONTACT_ENDPOINT` can override it. Checks do not replace browser or real delivery verification.

## Favicon

![Favicon review](reviews/01-favicon/favicon-review.png)

The refined favicon uses a vector adaptation of the supplied FD symbol: white on a charcoal rounded badge with a copper accent. Original supplied logo files are unchanged. [Review notes](reviews/01-favicon/README.md) include the source and before/after comparison. The browser strips above are illustrative previews.

To reproduce the icons and comparison with Node.js and Sharp available, run from the repository root:

```sh
node site/scripts/make-favicon.mjs
```

If Sharp is provided by a bundled runtime, pass its package directory with `--sharp-module`. The script renders each target size directly from the vector, packages the ICO, and verifies dimensions and preservation of the original logo. Sharp is only required for icon generation; ordinary website builds have no package dependencies. Icon generation alone does not publish the site.

## Repository boundaries

Rejected artwork, local deployment configuration, temporary downloads, credentials, and development caches are excluded. The approved website launched at `digitalfremont.com` on October 30, 2026. Domain connection is complete. The owner subsequently requested activating the inquiry form and supplied the saved Formspree endpoint. Phone and email remain direct alternatives.
