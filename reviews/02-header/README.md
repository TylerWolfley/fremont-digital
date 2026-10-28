# Header review

This retains a header-only review stage using the current service-hub design. The full page is in `../03-layout/`. The existing favicon is carried forward as a draft, not marked finally approved.

## Open the review

Open either `review.html` or `offline-review.html`. Both are identical, self-contained previews of the generated header, local font, supplied wordmark, and menu interactions. Use the width selector for desktop, tablet, and phone layouts. Review controls are outside the website and excluded from production files.

For local development, run `npm run dev` in `site/`, then open `http://127.0.0.1:4173/review/header`.

## Navigation

At 900px and wider, one Services dropdown contains Web & Digital, Business Tech, Repairs & Tech, Photo & Media, and Browse all services. How it works, FAQs, and Get in touch complete the header. Below 900px, a native expandable Menu contains the category links, section links, and business email.

Category links filter the catalog on the full homepage. The header-only preview shows the navigation in isolation; use the full-site preview to test its destinations and service inquiries. The eighteen service choices appear in the full-page catalog rather than being duplicated in header menus.

The supplied logo remains unchanged. Phone resale and security installation are not advertised.

## Checks and limits

The build checks local assets, service IDs, links, and source syntax. Native disclosure enhancement provides Escape/outside-click dismissal, focus restoration, and breakpoint reset. Browser interaction and responsive visual QA remain unverified because local browser preview access was blocked; no alternate browser automation was used.

This review supports inspecting logo size, spacing, wording, the desktop dropdown, and the mobile menu independently. The site has not been deployed.
