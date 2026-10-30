# Favicon refinement

Requested October 30, 2026 after comparison with the neighboring Google, Facebook, Namecheap, and Gmail tab icons in the owner's screenshot.

The first version placed a reduced raster logo on a white square. At tab size, the flat white background and softened edges made it read like a miniature image. The replacement is a code-native vector adaptation of the same FD symbol, with white strokes on a charcoal rounded badge and a copper accent. Its geometry is aligned to the 16px pixel grid; the original supplied wordmark and symbol files remain unchanged.

## Files

- Master: `site/src/assets/fd-favicon.svg`.
- Generator: `site/scripts/make-favicon.mjs` (Node.js and Sharp; optional `--sharp-module` path for bundled runtimes).
- Served assets: `site/dist/assets/favicons/fd-v2.svg`, `fd-v2.ico`, native 16/32/48/64/192/256/512px PNGs, and a 180px touch icon.
- ICO frames: 16, 32, 48, 64, and 256 pixels, rendered individually from the vector.
- Homepage and 404 references: `site/src/components/favicons.mjs`.
- Root `/favicon.ico` and legacy asset filenames remain valid fallbacks.

Versioned filenames prevent the previous asset URL from masking the update in browser caches. The SVG is the scalable choice; PNG/ICO fallbacks are provided with their actual sizes. Icon-link selection follows the [HTML icon relationship](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel#icon).

`favicon-review.png` compares the original and refined icon at actual 16px and 32px sizes on light/dark tab backgrounds, plus enlarged inspection views. These are illustrative tabs, not screenshots from a browser. The exact old PNGs are retained as `before-favicon-16.png` and `before-favicon-32.png` for this comparison. Source hashes and generation details are in `source-record.json`.
