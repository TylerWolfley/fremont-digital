# Fremont Digital

Website and brand assets for Fremont Digital, an independent technology business in Fremont County, Wyoming.

The business covers websites, digital marketing, small-business technology setup, professional photography, video and media work, computer troubleshooting, virus cleanup, phone and basic device repairs, and other suitable tech projects. It serves all of Fremont County through remote help, customer visits, and arranged device drop-off. Business inquiries: **(307) 349-4694** or **digitalfremont@gmail.com**.

## Current stage

**V1 approved by the owner on October 29, 2026.** The `v1.0.0` Git tag preserves this website milestone. Further improvements should build from this accepted version. See [version history](CHANGELOG.md).

The homepage uses **four clear service categories**, practical service explanations, readable type, prominent phone contact, and a contextual inquiry form. The October 30 audit tightened the opening and service copy, fixed form-label and draft-handling bugs, reduced font transfers, and prepared Formspree delivery. The public endpoint and a real inbox test remain pending; browser visual review is blocked by permissions.

| Component | Status |
| --- | --- |
| Supplied wordmark and FD symbol | Brand sources received |
| Favicon | Prepared from the supplied FD symbol |
| Header and service navigation | Approved for V1; browser QA remains pending |
| Full homepage and copy | Approved V1 with category browsing, service details, phone contact, and contextual form |
| Online inquiries | Form and backend implemented; delivery connection pending |
| Public web address | `digitalfremont.com`, purchased through Namecheap |
| Website deployment | Public at https://digitalfremont.com; www also connected with HTTPS |

The current `site/dist/` contains the full homepage: opening, four service categories and detail panels, process, practical questions, contact, and compact footer. No portfolio, featured websites, owner portrait, or fictional client gallery is included. The website itself should demonstrate the quality of the work. Phone resale is recorded as a future expansion after a physical location is established.

Read [PROJECT-DECISIONS.md](PROJECT-DECISIONS.md) before making changes. Its current decisions take precedence over historical V1/V2 handoff material.

## Project layout

```text
logos/                    Owner-supplied original logo files
reviews/01-favicon/        Favicon preview, source record, and review notes
reviews/02-header/         Header review, including a self-contained HTML preview
reviews/03-layout/         Full homepage review with desktop and phone widths
site/src/                 Shared content, components, page templates, styles, scripts
site/dist/assets/favicons/ Browser icons and Apple touch icon
site/dist/assets/          Prepared wordmark, bundled fonts, and licenses
site/scripts/              Build, preview, and asset utilities
site/server/               Inquiry delivery handler and connection instructions
reference/                Historical V1/V2 archives and handoff documents
```

The two original logo files are PNG images without filename extensions. Their supplied names and bytes are preserved.

## Layout development

See [the layout review notes](reviews/03-layout/README.md) and [site architecture](site/ARCHITECTURE.md). Open `reviews/03-layout/review.html` or `reviews/03-layout/offline-review.html` in a browser for an interactive full-page review without a server. Both filenames contain the same standalone preview. The earlier header-only review is retained in `reviews/02-header/`. GitHub shows HTML source; download either review file to view it locally.

With Node.js 20 or newer, run from `site/`:

```sh
npm run review
npm run check
npm run dev
```

No dependency installation is needed for the static build or tests. The local site review is at `http://127.0.0.1:4173/review/layout`; the header review remains at `/review/header`. Run `npm run review` after changes. Process and FAQ copy lives in `site/src/data/homepage.mjs`; service IDs are in `site/src/data/services.mjs`. Category explanations, service detail, and form prompts live in `site/src/data/service-guides.mjs`.

See [launch record](site/LAUNCH.md) and [inquiry connection instructions](site/server/README.md). Review builds stay out of search and never send forms. A release requires the actual web address; an inquiry endpoint is optional until delivery is activated. The owner requested leaving the form unchanged for launch and connecting delivery later. Checks do not replace browser or real delivery verification.

## Favicon

![Favicon review](reviews/01-favicon/favicon-review.png)

The refined favicon uses a vector adaptation of the supplied FD symbol: white on a charcoal rounded badge with a copper accent. Original supplied logo files are unchanged. [Review notes](reviews/01-favicon/README.md) include the source and before/after comparison. The browser strips above are illustrative previews.

To reproduce the icons and comparison with Node.js and Sharp available, run from the repository root:

```sh
node site/scripts/make-favicon.mjs
```

If Sharp is provided by a bundled runtime, pass its package directory with `--sharp-module`. The script renders each target size directly from the vector, packages the ICO, and verifies dimensions and preservation of the original logo. Sharp is only required for icon generation; ordinary website builds have no package dependencies. Icon generation alone does not publish the site.

## Repository boundaries

Rejected artwork, local deployment configuration, temporary downloads, credentials, and development caches are excluded. The approved website launched at `digitalfremont.com` on October 30, 2026. Domain connection is complete. Inquiry delivery is deferred at the owner's request; phone and email are the current working contact methods.
