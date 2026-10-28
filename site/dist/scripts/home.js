// Every service is visible without JavaScript. Shortcuts also move keyboard
// focus into the selected chapter; native fragment navigation still works.
const categories = [...document.querySelectorAll('.service-chapter')];

function findCategory(hash) {
  return categories.find(item => `#${item.id}` === hash);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const category = findCategory(link.getAttribute('href'));
    if (category) {
      category.querySelector('h3').focus({ preventScroll: true });
    }
  });
});

function syncHash() {
  const category = findCategory(window.location.hash);
  if (category) requestAnimationFrame(() => category.scrollIntoView({ block: 'start' }));
}
window.addEventListener('hashchange', syncHash);
syncHash();

// Offer webmail users a second way to start; never claim an email was sent.
const copyEmail = document.querySelector('[data-copy-email]');
const copyStatus = document.querySelector('[data-copy-status]');
if (copyEmail && copyStatus && navigator.clipboard?.writeText) {
  copyEmail.hidden = false;
  copyEmail.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyEmail.dataset.copyEmail);
      copyStatus.textContent = 'Email address copied.';
    } catch {
      copyStatus.textContent = 'Copy isn’t available here. Select the email address above to copy it manually.';
    }
  });
}
