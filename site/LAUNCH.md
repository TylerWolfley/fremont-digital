# Publication preparation

The owner requested public launch on October 30, 2026, after purchasing **digitalfremont.com** through **Namecheap**. The website has not yet been deployed. The business serves all of Fremont County, Wyoming, with remote help, customer visits, and arranged device drop-off. Contact: **(307) 349-4694** and **digitalfremont@gmail.com**.

On October 29, 2026, the static build, simulated category/form interactions, mocked server delivery cases, standalone previews, source syntax, HTML labels/nesting, and eight key contrast pairs passed. An isolated release smoke test verified the missing-endpoint guard and connected-form output, metadata, robots, sitemap, and 404 using reserved test addresses. The temporary output was removed. These are not browser or inbox-delivery results.

## Remaining before launch

1. Connect `digitalfremont.com` to the published site using the exact DNS records returned by the hosting service. Use `https://digitalfremont.com` for `SITE_URL`. Namecheap sign-in is pending; preserve unrelated records, including email records.
2. Connect and deploy the inquiry delivery endpoint. The form and backend code are ready for configuration; see `server/README.md` for the email provider, verified sender, runtime secret, allowed origin, and rate limiter. No live delivery is currently configured.
3. Complete browser review at 320, 390, 768, 1024, 1200, and 1440px: header, category tabs and disclosures, form prompts, validation, failure/retry behavior, success, keyboard navigation, focus, reduced motion, call links, and email links. Browser access to the local preview was blocked; source checks do not establish these results.
4. With authorization, verify a real inquiry reaches the owner's inbox from the hosted site. Test messages have not been sent during development.

Review builds show an explicit preview form. It can validate and summarize a request but cannot send one. Release builds enable direct submission only with `CONTACT_ENDPOINT` configured. Phone and email links remain available as direct alternatives.

## Build and publish

With Node.js 20 or later, run from `site/`:

```powershell
npm run review
npm run check
$env:SITE_URL = 'https://digitalfremont.com'
$env:CONTACT_ENDPOINT = Read-Host 'Connected HTTPS inquiry endpoint ending in /api/inquiry'
npm run build:release
```

Both URLs are validated before output is written. Provider credentials are runtime secrets on the separate inquiry server, never frontend build variables. The release output contains the homepage, local assets, canonical/social metadata, business structured data including the phone, robots.txt, sitemap.xml, and 404 page. Normal `dist/` and offline previews stay noindex. The host-specific `release/` directory is ignored by Git.

Publish only `release/` to the static website host. Deploy the inquiry server separately. Never publish repository notes, historical archives, original logo folders, review tools, server source, or credentials as the public web root. Serve missing pages with the 404 status.

For the requested public launch, retain Sites project `appgprj_6ae12daafb7c8191bb15d06f958c03a3` and make the published business website publicly accessible. Use the supported source and publication workflow, and set the hosting checkout's static directory to `release` after building with the actual address. Do not create a duplicate Site. The project currently remains unpublished and owner-private.

After deployment, verify the live homepage, 404 response, canonical address, category and phone layouts, and inquiry delivery. Do not report browser, accessibility, inbox-delivery, or performance results that have not been measured.
