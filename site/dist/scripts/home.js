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
