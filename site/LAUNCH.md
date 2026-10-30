# Public launch

The approved V1 website launched on October 30, 2026 at **https://digitalfremont.com** after the owner bought the domain through **Namecheap**. Both the root domain and **https://www.digitalfremont.com** have active hosting and HTTPS status.

The business serves all of Fremont County, Wyoming through remote help, customer visits, and arranged device drop-off. Contact: **(307) 349-4694** and **digitalfremont@gmail.com**.

## Form decision

At launch, the owner requested leaving the existing form as it was and connecting delivery later. The subsequent October 30 audit request authorizes fixing and simplifying the form and connecting Formspree. The form is now ready for either a Formspree endpoint or the original custom handler. The actual Formspree endpoint has not been supplied; no real request has been sent. Until configured, it still validates and previews only. Phone and email work directly.

Delivery configuration and a real inbox test remain future work. Follow `server/README.md` when the owner asks to connect the form. No real inquiry messages have been sent during development or launch.

## October 30 audit

Completed source and interaction work: clearer service-led opening, less repeated copy, first service details visible, shorter initial form, category-label corruption fixed, phone/email drafts retained, server validation focus repaired, and shareable category selection. Phone, email, Facebook, all four categories, and all eighteen services remain.

Manrope downloads were reduced from 289,364 to 90,760 bytes with full-glyph WOFF2 conversion. The normal text colors checked exceed 4.5:1; input borders were increased from 2.06:1 to 3.39:1 against white. These are source color calculations, not a complete rendered accessibility audit. Sharing now uses a 1200 × 630 brand graphic instead of a favicon, and structured data includes the supplied Facebook page.

Actual-DOM tests exercise the real HTML and scripts with mocked transport: service options and all category prompts, keyboard/deep-link navigation, menu focus, contextual drafts, contact-method drafts, validation, error focus, duplicate-submit prevention, Formspree field mapping, and success/failure states. All standard checks and the actual-DOM tests passed without sending messages. `scripts/verify-dom.mjs` requires jsdom 26.1 or a `--jsdom-module` path. Normal builds remain dependency-free. Font and sharing-image regeneration are optional utilities.

Remaining gates: the owner must provide the Formspree public endpoint; an actual submission and inbox receipt must be checked. Browser permissions denied the production-site reload and Formspree navigation, so desktop/mobile visual behavior, real browser accessibility, and live performance are unverified. No alternate browser or network route was used to bypass the denial.

## Hosting record

Latest update: audit fixes published October 30, 2026 as Sites version 4. Source commit `349ac40a08eb9fc875c9cfc6b637f095e07bdac4`; saved version `appgprj_6ae12daafb7c8191bb15d06f958c03a3~appgver_d6168623558481919ad4286dea3cc73f`; successful deployment `appgdep_6ae50311dd44819184258da93375a3d1`. The production build still has no contact endpoint; activation and real delivery testing require the owner's Formspree configuration. Build, source, and mocked actual-DOM checks passed. Browser access remained blocked.

Previous update: Facebook footer link (`https://fb.com/digitalfremont`) published October 30, 2026 as Sites version 3. Source commit `80bc1e44ecb0cc0ad08deb267cb349404c8de269`; saved version `appgprj_6ae12daafb7c8191bb15d06f958c03a3~appgver_e522f0e64cdc8191bd9dda8aa283cb83`; successful deployment `appgdep_6ae500eb6ba08191b167668199d438fc`. Build and review checks passed. Post-publication browser verification was blocked by the browser permission gate; no live visual verification is claimed for this update.

Previous update: favicon refinement published October 30, 2026 as Sites version 2. Source commit `7638263fe7e07d4afd298eff76b6fb17ec3b04ce`; saved version `appgprj_6ae12daafb7c8191bb15d06f958c03a3~appgver_c9aa3fda694c8191b2bb3f99163305b7`; successful deployment `appgdep_6ae4ff99b0108191ace2017db12b8710`. The live browser page references the new SVG/PNG/ICO/touch-icon files. Page body and form content were verified unchanged. Icon dimensions, ICO frames, source preservation, builds, and offline review checks passed. Direct Python asset checks encountered Cloudflare 1010; no byte-for-byte live asset verification is claimed.

Initial public launch:

- Existing project: `appgprj_6ae12daafb7c8191bb15d06f958c03a3`, now public.
- Saved version: `appgprj_6ae12daafb7c8191bb15d06f958c03a3~appgver_da9a1d24d0a481918a737f3e0f2c8baa` (version 1).
- Deployment: `appgdep_6ae4fb848cc08191b27ddc5847d5d780`, succeeded.
- Hosting source commit: `de22fa29dc417c3d86813cdb6a97cbfcfb7df60f`.
- Host address: https://fremont-digital-studio.quaboslice.chatgpt.site
- Root-domain record: `appgdom_6ae4fb98954c8191a18348b75dc7353a`.
- www-domain record: `appgdom_6ae4fb9f6b5881918b1f400a2cb046b7`.

Namecheap BasicDNS remains in use. The parking CNAME and root redirect were replaced with the host's CNAME and two A records. Supplied ownership/HTTPS TXT records were added. Existing email forwarding and its SPF record were preserved.

## Build and publish

With Node.js 20 or later, run from `site/`:

```powershell
npm run review
npm run check
$env:SITE_URL = 'https://digitalfremont.com'
Remove-Item Env:CONTACT_ENDPOINT -ErrorAction SilentlyContinue
npm run build:release
```

When delivery is connected, set `CONTACT_ENDPOINT` to its configured HTTPS `/api/inquiry` URL before building. Provider credentials are runtime secrets on the separate inquiry server, never frontend build variables.

The ignored `release/` output contains the homepage, local assets, canonical/social metadata, business structured data, robots.txt, sitemap.xml, and 404 page. Normal `dist/` and offline previews stay noindex.

The supported Sites source workflow uses a separate checkout containing only the site's files, with the release output copied into its `dist/` directory. Its tracked `.openai/hosting.json` retains the existing project ID and declares `static.directory` as `dist`. Push/package with the supported helper and deploy the resulting saved version. Do not create a duplicate Site.

Only compiled website assets are served publicly. Repository notes, archives, original logo folders, reviews, server source, and credentials are not the public web root. GitHub synchronization alone does not redeploy the Site.

## Verification

Launch checks passed for the release build, source/contact/navigation checks, simulated category and form interactions, and standalone review integrity. Production output has the correct canonical domain and indexable metadata. The live root-domain homepage was opened successfully over HTTPS and visually inspected in the browser. Both custom domains report active hosting and SSL status.

HTTPS checks returned 200 for both domain homepages, robots.txt, and sitemap.xml. A nonexistent page returned 404 with the custom missing-page content. The initial sandboxed DNS lookup failed; these checks succeeded with approved network access.

Earlier October 29 checks also covered mocked server delivery, source syntax, HTML structure, contrast, and connected-form release output. Those are not real inbox-delivery results. A full browser accessibility, responsive, and performance audit has not been completed.

Namecheap displayed a pending registration-contact verification for the domain. The owner should complete Namecheap's verification email; no account contact details were changed during launch.
