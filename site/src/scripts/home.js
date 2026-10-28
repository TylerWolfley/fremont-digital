// Category links open their destination before the browser scrolls to it.
// Native disclosures remain fully usable without JavaScript.
const categories = [...document.querySelectorAll('.service-category')];

function openCategory(hash) {
  const category = categories.find(item => `#${item.id}` === hash);
  if (!category) return null;
  categories.forEach(item => { item.open = item === category; });
  return category;
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const category = openCategory(link.getAttribute('href'));
    if (category) {
      // Keep the next keyboard action in the newly opened category.
      category.querySelector('summary').focus({ preventScroll: true });
    }
  });
});

function syncHash() {
  const category = openCategory(window.location.hash);
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
