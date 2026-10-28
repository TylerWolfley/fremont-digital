# Header review

This retains the header-only review stage. The owner reviewed the header favorably and then authorized the full homepage skeleton, now available in `../03-layout/`. The existing favicon is carried forward as a draft, not marked finally approved.

## Open the review

Open `offline-review.html` in a browser. It contains the actual generated header, fonts, supplied wordmark, and interactions, so no local server or internet connection is needed. Use the width selector for desktop, tablet, and phone layouts. The review controls are outside the website and are not included in its production files.

For local development, run `npm run dev` in `site/`, then open `http://127.0.0.1:4173/review/header`.

## Navigation

- Web & Digital: website builds, updates and maintenance, SEO, Google Business Profile, social media and marketing.
- Business Tech: email and domains, booking and payments, POS, office equipment and Wi-Fi, business software, file transfers and backups, digital signage and QR menus.
- Repairs & Tech: phone and device repairs, computer repairs and upgrades, virus and malware cleanup, device and software setup.
- Photo & Media: business/product/real estate photography, video and YouTube content, editing and promotional media.

Each individual service currently opens an email inquiry with its subject already filled in. The menus explain that behavior. There are no unfinished service-page links. Future service pages can use the same registry when those sections are developed.

Phone resale is recorded as a future expansion after a physical location is established. It is not shown as an available service.

Security installations are saved as a candidate in the project decisions, pending confirmation of the owner's scope. They are not included in the current menu. The wider service list uses four compact header categories, with the mobile menu below 1200px.

## Checks and limits

- The build succeeds and checks local asset references and unique service IDs.
- JavaScript syntax checks pass.
- Generated navigation includes the eighteen current service choices in both desktop and mobile menus, with the correct email destination and distinct subjects.
- Logo dimensions and favicon references are checked.
- Browser interaction and responsive visual QA remain unverified: the browser tool denied access to the local preview. No alternate browser automation was used.

This review can still be used to inspect the logo size, spacing, category wording, desktop dropdowns, and mobile menu independently of the full page. This draft has not been deployed.
