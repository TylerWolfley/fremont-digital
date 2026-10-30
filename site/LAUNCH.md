# Public launch

The approved V1 website launched on October 30, 2026 at **https://digitalfremont.com** after the owner bought the domain through **Namecheap**. Both the root domain and **https://www.digitalfremont.com** have active hosting and HTTPS status.

The business serves all of Fremont County, Wyoming through remote help, customer visits, and arranged device drop-off. Contact: **(307) 349-4694** and **digitalfremont@gmail.com**.

## Form decision

At launch, the owner requested leaving the existing form as it was and connecting delivery later. The subsequent October 30 audit request authorizes fixing and simplifying the form and connecting Formspree. The owner then supplied `https://formspree.io/f/mrppayow`, now saved in `src/config/contact.mjs` as the production endpoint. Live builds show “Send request” without the preview notice. Offline review builds stay disconnected. Phone and email remain direct alternatives.

The owner submitted a live test after publication and reported “Success message and email received” on October 30, 2026, confirming delivery to digitalfremont@gmail.com. The agent subsequently verified the live form's validation, contact-method controls, optional details, and service-to-form navigation without sending another inquiry. Browser access is now restored; see the completed live audit below. See `server/README.md` for provider configuration and verification details.

## October 30 audit

Completed source and interaction work: clearer service-led opening, less repeated copy, first service details visible, shorter initial form, category-label corruption fixed, phone/email drafts retained, server validation focus repaired, and shareable category selection. Phone, email, Facebook, all four categories, and all eighteen services remain.

Manrope downloads were reduced from 289,364 to 90,760 bytes with full-glyph WOFF2 conversion. The normal text colors checked exceed 4.5:1; input borders were increased from 2.06:1 to 3.39:1 against white. These are source color calculations, not a complete rendered accessibility audit. Sharing now uses a 1200 × 630 brand graphic instead of a favicon, and structured data includes the supplied Facebook page.

Actual-DOM tests exercise the real HTML and scripts with mocked transport: service options and all category prompts, keyboard/deep-link navigation, menu focus, contextual drafts, contact-method drafts, validation, error focus, duplicate-submit prevention, Formspree field mapping, and success/failure states. All standard checks and the actual-DOM tests passed without sending messages. `scripts/verify-dom.mjs` requires jsdom 26.1 or a `--jsdom-module` path. Normal builds remain dependency-free. Font and sharing-image regeneration are optional utilities.

Formspree submission and inbox receipt were confirmed by the owner after version 5 was published. At that stage, browser permissions prevented visual and performance checks. Those site checks were subsequently completed as recorded below; no alternate browser or network route was used to bypass the denial.

### Follow-up source audit

Keyboard category selection now updates the shareable URL for arrow keys, Home/End, Enter, and Space. Service inquiry buttons scroll to the form rather than the start of the contact section, where the contact copy precedes the form on narrow layouts. Form controls and status messages have sticky-header scroll clearance. Field errors are also linked through `aria-describedby`, retaining the original help text when errors are cleared. The real-DOM regressions reproduce the stale category URL before the fix and pass afterward; they check scroll targets and focus, not rendered scrolling.

Source review also covered heading and landmark structure, native disclosure fallbacks, all eighteen service entry points, phone/email/Facebook destinations, local asset references, canonical and social metadata, indexability, input handling, and Formspree success/failure behavior. There is no third-party frontend script, and form drafts remain in memory rather than persistent browser storage. Real delivery remains owner-confirmed. At version 6, live browser checks were still blocked. The completed live audit below supersedes that limitation; Formspree account settings remain outside the tested scope.

### Completed live audit — October 30, 2026

The global Allow setting was correct. An older origin denial saved for this chat overrode it. The owner removed only the site's denial from that chat's settings; the normal in-app browser then opened the site successfully. No settings were bypassed, and the separate Formspree browsing restriction was left unchanged.

Manual testing found two defects that automated scores did not catch. Both are fixed and published in version 7:

- On phones, hiding the headline's line break joined the two sentences without a space. The intended break now remains visible, including at 320 pixels wide.
- A transient focus change closed the mobile menu before a pointer click reached its category link. The header now closes for a known focus destination outside the header, while link clicks, outside clicks, Escape, and breakpoint changes retain their existing behavior. A regression reproduces the transient focus case and checks internal and external focus destinations.

Browser coverage and results:

- **Responsive layout:** actual viewport widths of 320, 375, 390, 768, 900, and 1440 pixels checked after publication. No horizontal page overflow. Desktop and phone full-page layouts and a tablet view were inspected; final desktop and phone screenshots are saved in `../reviews/04-audit/`.
- **Navigation:** all four categories, keyboard category movement, URL changes, deep-link reload, Escape/focus return, and skip-to-content checked. Mobile pointer selection and desktop dropdown selection both passed after the menu fix.
- **Service and FAQ content:** all eighteen service disclosures and their contact destinations checked on version 6; all six FAQs checked after version 7. The service components did not change in version 7.
- **Inquiry path:** selecting a service chooses its form category, scrolls to the form, and focuses the visible name field. Empty submission presents three required-field errors and focuses the name field; error associations preserve help text. Phone/email controls, optional details, and context prompts work. No valid submission was sent during this browser audit. Success/failure handling, payload mapping, draft preservation, and duplicate-submit protection also pass the local actual-DOM tests; real inbox delivery remains the owner's confirmed test.
- **Content and contact:** the site consistently identifies Fremont County, Wyoming and includes remote help, visits, and arranged drop-off. Phone, email, and Facebook destinations match the supplied business details. No public storefront, fabricated reviews, unsupported prices, or invented results were added.
- **Search and recovery:** canonical/social metadata and structured data checked in the source/release; live robots.txt allows crawling and points to the correct live sitemap. The sitemap lists the canonical homepage. A missing route displays the custom missing-page screen, and its home link returns successfully.
- **Browser logs:** the homepage and tested service/contact interactions produced no warnings or errors. Opening the sitemap's browser XML viewer reproducibly produced an unattributed animation TypeError; a fresh homepage tab was clean before navigating to XML. This viewer-only observation is not attributed to the site's scripts, which contain no animation lookup.

Google PageSpeed Insights tested the public site at 3:28 PM MDT on October 30, immediately before the two small version 7 fixes. Both mobile and desktop scored **100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**. Mobile largest contentful paint was **1.4 seconds**, desktop **0.2 seconds**; both reported **0 ms** total blocking time and **0** cumulative layout shift. The mobile run used the report's emulated Moto G Power / slow 4G configuration. See the [mobile report](https://pagespeed.web.dev/analysis/https-digitalfremont-com/m0u18dcsyw?form_factor=mobile) and [desktop report](https://pagespeed.web.dev/analysis/https-digitalfremont-com/m0u18dcsyw?form_factor=desktop). The exact report text and measurements are preserved in `../reviews/04-audit/pagespeed-results.json`; this is a version 6 lab measurement, not a second measurement of version 7.

Nonblocking opportunities in that report were small logo-image savings (6–8 KiB) and render-blocking resource estimates. These did not justify another asset or styling change during this audit. The site now explains the scope, next step, and arrangements clearly. Real customer reviews could add independent trust later; none were invented, and the owner's decision not to feature portfolio projects was retained.

Limits: there is no real-user performance data yet. Lab scores do not establish rankings, conversions, or complete accessibility. Manual browser work used Chromium viewport emulation, not physical iOS/Android devices or a full assistive-technology certification. This audit does not claim a penetration test or verification of Formspree account quotas, spam controls, or future delivery reliability. Within the tested scope, the identified functional defects are resolved.

Validation passed after the fixes: normal/release/review builds, standard verification, service interactions, optional inquiry-server tests, review integrity, and actual-DOM regressions. The optional server tests do not test Formspree's infrastructure. Audit measurements, interaction results, and screenshots are organized under `../reviews/04-audit/`.

## Hosting record

Latest update: live audit fixes published October 30, 2026 as Sites version 7. Source commit `919de3b9b3211019e8c2003e04ec1b209bc70a6c`; saved version `appgprj_6ae12daafb7c8191bb15d06f958c03a3~appgver_cf3c25758d4081919d02d63b8527b7a5`; successful deployment `appgdep_6ae50c569fe48191b39d5be5b068e981`. Fixed mobile headline spacing and menu pointer activation, added the focus-transition regression, and verified the deployed behavior and six viewport widths through the restored browser connection. The full audit record above distinguishes live checks, local tests, owner-confirmed delivery, and measured lab results.

Previous update: follow-up audit fixes published October 30, 2026 as Sites version 6. Source commit `96fb626735ce3ea1e88bd05391013af692229f7c`; saved version `appgprj_6ae12daafb7c8191bb15d06f958c03a3~appgver_c8ba9b76e9dc81918dd112814f328aed`; successful deployment `appgdep_6ae5082aa4bc8191a7c1fa99f708a7d7`. Updated keyboard category URLs, service-to-form scrolling/focus, field-error associations, and delivery documentation. Standard checks and actual-DOM regressions passed, and the production Formspree endpoint and indexability were checked. Browser access still reported a saved origin block when this version was published.

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

Earlier October 29 checks also covered mocked server delivery, source syntax, HTML structure, contrast, and connected-form release output. Those were not real inbox-delivery results. The October 30 completed live audit above records subsequent browser, responsive, accessibility, performance, and owner-confirmed delivery results and their limits.

Namecheap displayed a pending registration-contact verification for the domain. The owner should complete Namecheap's verification email; no account contact details were changed during launch.
