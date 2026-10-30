# Public launch

The approved V1 website launched on October 30, 2026 at **https://digitalfremont.com** after the owner bought the domain through **Namecheap**. Both the root domain and **https://www.digitalfremont.com** have active hosting and HTTPS status.

The business serves all of Fremont County, Wyoming through remote help, customer visits, and arranged device drop-off. Contact: **(307) 349-4694** and **digitalfremont@gmail.com**.

## Form decision

At launch, the owner requested leaving the existing form as it was and connecting delivery later. The subsequent October 30 audit request authorizes fixing and simplifying the form and connecting Formspree. The owner then supplied `https://formspree.io/f/mrppayow`, now saved in `src/config/contact.mjs` as the production endpoint. Live builds show “Send request” without the preview notice. Offline review builds stay disconnected. Phone and email remain direct alternatives.

The owner submitted a live test after publication and reported “Success message and email received” on October 30, 2026, confirming delivery to digitalfremont@gmail.com. Browser access was retried after the owner offered to enable it, but the saved permission gate still denied the agent access. The successful real submission was performed and verified by the owner. See `server/README.md` for provider configuration and verification details.

## October 30 audit

Completed source and interaction work: clearer service-led opening, less repeated copy, first service details visible, shorter initial form, category-label corruption fixed, phone/email drafts retained, server validation focus repaired, and shareable category selection. Phone, email, Facebook, all four categories, and all eighteen services remain.

Manrope downloads were reduced from 289,364 to 90,760 bytes with full-glyph WOFF2 conversion. The normal text colors checked exceed 4.5:1; input borders were increased from 2.06:1 to 3.39:1 against white. These are source color calculations, not a complete rendered accessibility audit. Sharing now uses a 1200 × 630 brand graphic instead of a favicon, and structured data includes the supplied Facebook page.

Actual-DOM tests exercise the real HTML and scripts with mocked transport: service options and all category prompts, keyboard/deep-link navigation, menu focus, contextual drafts, contact-method drafts, validation, error focus, duplicate-submit prevention, Formspree field mapping, and success/failure states. All standard checks and the actual-DOM tests passed without sending messages. `scripts/verify-dom.mjs` requires jsdom 26.1 or a `--jsdom-module` path. Normal builds remain dependency-free. Font and sharing-image regeneration are optional utilities.

Formspree submission and inbox receipt were confirmed by the owner after version 5 was published. Remaining audit gates: browser permissions denied the production-site reload and Formspree navigation, so desktop/mobile visual behavior, real browser accessibility, and live performance remain unverified. No alternate browser or network route was used to bypass the denial.

### Follow-up source audit

Keyboard category selection now updates the shareable URL for arrow keys, Home/End, Enter, and Space. Service inquiry buttons scroll to the form rather than the start of the contact section, where the contact copy precedes the form on narrow layouts. Form controls and status messages have sticky-header scroll clearance. Field errors are also linked through `aria-describedby`, retaining the original help text when errors are cleared. The real-DOM regressions reproduce the stale category URL before the fix and pass afterward; they check scroll targets and focus, not rendered scrolling.

Source review also covered heading and landmark structure, native disclosure fallbacks, all eighteen service entry points, phone/email/Facebook destinations, local asset references, canonical and social metadata, indexability, input handling, and Formspree success/failure behavior. There is no third-party frontend script, and form drafts remain in memory rather than persistent browser storage. Real delivery remains owner-confirmed. Runtime provider account settings and live desktop/mobile rendering, browser accessibility, and performance measurements remain unverified because the normal browser tool continued to report a saved origin block after the settings change. No alternate browsing route was used.

## Hosting record

Latest update: follow-up audit fixes published October 30, 2026 as Sites version 6. Source commit `96fb626735ce3ea1e88bd05391013af692229f7c`; saved version `appgprj_6ae12daafb7c8191bb15d06f958c03a3~appgver_c8ba9b76e9dc81918dd112814f328aed`; successful deployment `appgdep_6ae5082aa4bc8191a7c1fa99f708a7d7`. Updated keyboard category URLs, service-to-form scrolling/focus, field-error associations, and delivery documentation. Standard checks and actual-DOM regressions passed, and the production Formspree endpoint and indexability were checked. Browser access still reported a saved origin block; no new visual or performance verification is claimed.

Previous update: Formspree connection published October 30, 2026 as Sites version 5. Source commit `8ced16b05689698aac18c285128d97c5037424ee`; saved version `appgprj_6ae12daafb7c8191bb15d06f958c03a3~appgver_b7d893b95e608191ad613f293ea66e83`; successful deployment `appgdep_6ae503ceb2fc8191ba94233ff902e135`. Production uses `https://formspree.io/f/mrppayow`, shows “Send request,” and omits the preview notice. The built HTML and saved configuration were verified. Browser access remained blocked; the owner submitted a test and confirmed both the success message and inbox receipt.

Previous update: audit fixes published October 30, 2026 as Sites version 4. Source commit `349ac40a08eb9fc875c9cfc6b637f095e07bdac4`; saved version `appgprj_6ae12daafb7c8191bb15d06f958c03a3~appgver_d6168623558481919ad4286dea3cc73f`; successful deployment `appgdep_6ae50311dd44819184258da93375a3d1`. That release had no contact endpoint. Build, source, and mocked actual-DOM checks passed. Browser access remained blocked.

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

The saved Formspree endpoint is used by default. Only set `CONTACT_ENDPOINT` when deliberately overriding delivery with another valid Formspree endpoint or the optional HTTPS `/api/inquiry` server. Provider credentials must never be frontend build variables.

The ignored `release/` output contains the homepage, local assets, canonical/social metadata, business structured data, robots.txt, sitemap.xml, and 404 page. Normal `dist/` and offline previews stay noindex.

The supported Sites source workflow uses a separate checkout containing only the site's files, with the release output copied into its `dist/` directory. Its tracked `.openai/hosting.json` retains the existing project ID and declares `static.directory` as `dist`. Push/package with the supported helper and deploy the resulting saved version. Do not create a duplicate Site.

Only compiled website assets are served publicly. Repository notes, archives, original logo folders, reviews, server source, and credentials are not the public web root. GitHub synchronization alone does not redeploy the Site.

## Verification

Launch checks passed for the release build, source/contact/navigation checks, simulated category and form interactions, and standalone review integrity. Production output has the correct canonical domain and indexable metadata. The live root-domain homepage was opened successfully over HTTPS and visually inspected in the browser. Both custom domains report active hosting and SSL status.

HTTPS checks returned 200 for both domain homepages, robots.txt, and sitemap.xml. A nonexistent page returned 404 with the custom missing-page content. The initial sandboxed DNS lookup failed; these checks succeeded with approved network access.

Earlier October 29 checks also covered mocked server delivery, source syntax, HTML structure, contrast, and connected-form release output. Those are not real inbox-delivery results. A full browser accessibility, responsive, and performance audit has not been completed.

Namecheap displayed a pending registration-contact verification for the domain. The owner should complete Namecheap's verification email; no account contact details were changed during launch.
