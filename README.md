# Fremont Digital

Website and brand assets for Fremont Digital, an independent technology business in Fremont County, Colorado.

The business covers websites, digital marketing, video work, computer troubleshooting, virus cleanup, basic device repairs, and other suitable tech projects. Business inquiries: **digitalfremont@gmail.com**.

## Current stage

We are building the site **top down, one component at a time**.

| Component | Status |
| --- | --- |
| Supplied wordmark and FD symbol | Brand sources received |
| Favicon | Draft prepared; awaiting owner review |
| Header | Not started |
| Remaining page | Not started |
| Website deployment | Not published |

The current `site/dist/` contains assets only; it is not a complete website. No portfolio, featured websites, or fictional client gallery will be included. The website itself should demonstrate the quality of the work.

Read [PROJECT-DECISIONS.md](PROJECT-DECISIONS.md) before making changes. Its current decisions take precedence over historical V1/V2 handoff material.

## Project layout

```text
logos/                    Owner-supplied original logo files
reviews/01-favicon/        Favicon preview, source record, and review notes
site/dist/assets/favicons/ Browser icons and Apple touch icon
site/dist/assets/          Bundled fonts and their licenses
site/scripts/              Favicon generation script
reference/                Historical V1/V2 archives and handoff documents
```

The two original logo files are PNG images without filename extensions. Their supplied names and bytes are preserved.

## Favicon draft

![Favicon review](reviews/01-favicon/favicon-review.png)

The favicon uses the supplied FD symbol with its original colors, centered on white. [Review notes](reviews/01-favicon/README.md) describe the files and intended integration. The browser strips above are illustrative previews, not a deployed website.

To reproduce the icons and review image with Python and Pillow installed, run from the repository root:

```sh
python site/scripts/make-favicon.py
```

The script verifies icon dimensions and that the original logo file remains unchanged. It does not build or publish a website.

## Repository boundaries

Rejected artwork, local deployment configuration, temporary downloads, credentials, and development caches are excluded. Keeping this repository up to date does not authorize moving to the next design component or deploying the site.
