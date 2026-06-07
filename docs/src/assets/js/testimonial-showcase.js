/**
 * Prev/next testimonial showcase for layout-testimonial-showcase.
 */
function pravatarUrl(size, id) {
  return `https://i.pravatar.cc/${size}?img=${id}`;
}

function renderShowcaseSlide(root, index) {
  const slides = JSON.parse(root.dataset.slides || '[]');
  if (!slides.length) return;

  const nextIndex = ((index % slides.length) + slides.length) % slides.length;
  const slide = slides[nextIndex];

  const quote = root.querySelector('[data-testimonial-showcase-quote]');
  const avatar = root.querySelector('[data-testimonial-showcase-avatar]');
  const name = root.querySelector('[data-testimonial-showcase-name]');
  const role = root.querySelector('[data-testimonial-showcase-role]');
  const dots = root.querySelectorAll('[data-testimonial-showcase-dot]');

  if (quote) quote.textContent = `“${slide.quote}”`;
  if (avatar) {
    avatar.src = pravatarUrl(48, slide.avatarId);
    avatar.alt = slide.name;
  }
  if (name) name.textContent = slide.name;
  if (role) role.textContent = slide.role;

  dots.forEach((dot, i) => {
    const active = i === nextIndex;
    dot.classList.toggle('layout-testimonial-showcase-dot-active', active);
    dot.setAttribute('aria-current', active ? 'true' : 'false');
  });

  root.dataset.testimonialShowcaseIndex = String(nextIndex);
}

function initTestimonialShowcases() {
  document
    .querySelectorAll('[data-testimonial-showcase]:not([data-testimonial-showcase-ready])')
    .forEach((root) => {
      root.dataset.testimonialShowcaseReady = 'true';

      const prev = root.querySelector('[data-testimonial-showcase-prev]');
      const next = root.querySelector('[data-testimonial-showcase-next]');
      const dots = root.querySelectorAll('[data-testimonial-showcase-dot]');

      const getIndex = () => Number(root.dataset.testimonialShowcaseIndex || 0);

      prev?.addEventListener('click', () => renderShowcaseSlide(root, getIndex() - 1));
      next?.addEventListener('click', () => renderShowcaseSlide(root, getIndex() + 1));

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => renderShowcaseSlide(root, index));
      });

      renderShowcaseSlide(root, 0);
    });
}

function bootTestimonialShowcases() {
  initTestimonialShowcases();
}

if (!window._testimonialShowcaseInit) {
  window._testimonialShowcaseInit = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootTestimonialShowcases);
  } else {
    bootTestimonialShowcases();
  }
  document.addEventListener('htmx:afterSwap', bootTestimonialShowcases);
}
