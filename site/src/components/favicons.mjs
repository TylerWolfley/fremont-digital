// Versioned filenames allow browsers to replace the original cached favicon.
export function favicons() {
  return `<link rel="icon" type="image/x-icon" href="/assets/favicons/fd-v2.ico" sizes="16x16 32x32 48x48 64x64 256x256">
  <link rel="icon" type="image/png" href="/assets/favicons/fd-v2-16.png" sizes="16x16">
  <link rel="icon" type="image/png" href="/assets/favicons/fd-v2-32.png" sizes="32x32">
  <link rel="icon" type="image/svg+xml" href="/assets/favicons/fd-v2.svg" sizes="any">
  <link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon-v2.png" sizes="180x180">`;
}
