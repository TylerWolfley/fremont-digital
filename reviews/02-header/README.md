# Header review

Current scope: the site foundation, header, and service navigation. The hero and the remainder of the page have not been designed. The existing favicon is carried forward as a draft, not marked finally approved.

## Open the review

Open `offline-review.html` in a browser. It contains the actual generated header, fonts, supplied wordmark, and interactions, so no local server or internet connection is needed. Use the width selector for desktop, tablet, and phone layouts. The review controls are outside the website and are not included in its production files.

For local development, run `npm run dev` in `site/`, then open `http://127.0.0.1:4173/review/header`.

## Navigation

- Web & Digital: website builds, redesigns and updates, digital marketing.
- Repairs & Tech: phone and device repairs, computer troubleshooting, virus and malware cleanup, setup and support.
- Photo & Media: professional photography, video and YouTube content, editing and media projects.

Each individual service currently opens an email inquiry with its subject already filled in. The menus explain that behavior. There are no unfinished service-page links. Future service pages can use the same registry when those sections are developed.

Phone resale is recorded as a future expansion after a physical location is established. It is not shown as an available service.

## Checks and limits

- The build succeeds and checks local asset references and unique service IDs.
- JavaScript syntax checks pass.
- Generated navigation includes the ten current services in both desktop and mobile menus, with the correct email destination and distinct subjects.
- Logo dimensions and favicon references are checked.
- Browser interaction and responsive visual QA remain unverified: the browser tool denied access to the local preview. No alternate browser automation was used.

The next review should cover the logo size, spacing, category wording, desktop dropdowns, and mobile menu. This draft has not been deployed.
