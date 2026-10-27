// Enhance native disclosures without making navigation dependent on JavaScript.
const header = document.querySelector('[data-site-header]');
const mobileMenu = header.querySelector('[data-mobile-menu]');
const disclosures = [...header.querySelectorAll('[data-service-disclosure]')];
const desktopQuery = window.matchMedia('(min-width: 1100px)');

function closeDisclosure(details, restoreFocus = false) {
  details.open = false;
  if (restoreFocus) details.querySelector('summary').focus();
}

function closeAll() {
  disclosures.forEach(details => closeDisclosure(details));
  mobileMenu.open = false;
}

// Handle the activation synchronously; queued toggle events can race when
// someone opens the next category quickly.
disclosures.forEach(details => {
  details.querySelector('summary').addEventListener('click', () => {
    if (!details.open) disclosures.forEach(other => {
      if (other !== details) closeDisclosure(other);
    });
  });
});

mobileMenu.addEventListener('toggle', () => {
  if (!mobileMenu.open) disclosures.forEach(details => closeDisclosure(details));
});

document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeAll();
});

header.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const current = event.target.closest('[data-service-disclosure][open]')
    || disclosures.find(details => details.open);
  if (current) {
    event.preventDefault();
    closeDisclosure(current, true);
  } else if (mobileMenu.open) {
    event.preventDefault();
    closeDisclosure(mobileMenu, true);
  }
});

header.addEventListener('focusout', () => {
  queueMicrotask(() => {
    if (!header.contains(document.activeElement)) closeAll();
  });
});

header.querySelectorAll('a').forEach(link => link.addEventListener('click', closeAll));
desktopQuery.addEventListener('change', closeAll);
