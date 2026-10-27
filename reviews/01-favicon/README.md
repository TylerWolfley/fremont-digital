# Favicon review

Prepared from the supplied `logos/fremont digital logo 2` file. The FD symbol and its colors are unchanged. Excess outer background was cropped, and the symbol was centered on a white square for consistent contrast in light and dark browser tabs.

Browser files are in `site/dist/assets/favicons/`. The ICO contains 16, 32, and 48 pixel versions. PNG versions include 16, 32, 48, 64, 192, and 512 pixels, with a 180 pixel Apple touch icon.

`favicon-review.png` shows an enlarged view and the actual 16 and 32 pixel sizes. The browser strips are illustrative preview frames, not screenshots of a deployed website.

When the site is built, use these head tags:

```html
<link rel="icon" href="/assets/favicons/favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="/assets/favicons/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon.png">
```

Status: ready for owner review. The header has not been started.
