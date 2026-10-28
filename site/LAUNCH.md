# Publication preparation

The site content and release workflow are prepared. It has not been deployed. The owner has confirmed the business is in Fremont County, Wyoming, and does not yet own a domain.

Source checks and an isolated release-build smoke test passed on October 27, 2026. The smoke test verified output assets, canonical metadata, robots.txt, sitemap.xml, and the 404 page using a reserved test origin in a temporary copy; that output was removed. Offline preview assets and the main text-color contrast pairs were also checked. These results do not constitute a browser or full accessibility audit.

## Remaining before launch

1. Select the final HTTPS address. It may be a domain the owner acquires or a confirmed address from the selected host. Do not assume domain availability or use a made-up address.
2. Complete browser review at 320, 390, 768, 1024, 1200, and 1440px. Check the full page, header menus, search, category filters, view-all control, inquiry dialog, FAQ, keyboard navigation, reduced motion, and email/clipboard behavior. The browser tool previously blocked the local preview, so source checks do not establish these results.

The contact method is intentionally email. The inquiry dialog adds service-specific details to a draft through “Continue in email.” There is no server form or delivery confirmation. Verify the recipient and subject in an email client without sending an unsolicited test message. Clipboard copying requires browser support and permission; denial shows a manual-copy instruction.

## Build and publish

With Node.js 20 or later, run from `site/`:

```powershell
npm run review
npm run check
$env:SITE_URL = Read-Host 'Final HTTPS website address'
npm run build:release
```

The release command validates the address before writing anything. It creates `release/` containing the homepage, local assets, 404 page, canonical/social metadata, structured business data, robots.txt, and sitemap.xml. The normal `dist/` and offline reviews remain noindex. The release directory is Git-ignored because its URLs depend on the chosen host.

Publish only the contents of `release/` to a static host that serves `404.html` with a 404 status for missing pages. Never upload the whole repository, project notes, original logos folder, historical archives, or review tools as the public web root. No application server, database, dependency installation, or API key is required.

If using the existing Sites project, retain `appgprj_6ae12daafb7c8191bb15d06f958c03a3`. Confirm its final address, build the release with that address, and set its local hosting manifest's `static.directory` to `release` before the supported packaging/publication workflow. Preserve the project ID and audience; do not create another project. The source helper and native Sites tools must be used for that hosting path.

After deployment, verify the real homepage and 404 response, metadata/canonical address, email links, and phone layout. Do not report browser, accessibility, or performance scores that have not been measured.
