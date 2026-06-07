/**
 * Single-slide testimonial carousel for layout-testimonial-carousel.
 */
function setCarouselIndex(root, index) {
  const slides = root.querySelectorAll('[data-testimonial-carousel-slide]');
  const dots = root.querySelectorAll('[data-testimonial-carousel-dot]');
  if (!slides.length) return;

  const nextIndex = ((index % slides.length) + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.hidden = i !== nextIndex;
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('layout-testimonial-carousel-dot-active', i === nextIndex);
    dot.setAttribute('aria-current', i === nextIndex ? 'true' : 'false');
  });

  root.dataset.testimonialCarouselIndex = String(nextIndex);
}

function initTestimonialCarousels() {
  document
    .querySelectorAll('[data-testimonial-carousel]:not([data-testimonial-carousel-ready])')
    .forEach((root) => {
      root.dataset.testimonialCarouselReady = 'true';

      const prev = root.querySelector('[data-testimonial-carousel-prev]');
      const next = root.querySelector('[data-testimonial-carousel-next]');
      const dots = root.querySelectorAll('[data-testimonial-carousel-dot]');

      const getIndex = () => Number(root.dataset.testimonialCarouselIndex || 0);

      prev?.addEventListener('click', () => setCarouselIndex(root, getIndex() - 1));
      next?.addEventListener('click', () => setCarouselIndex(root, getIndex() + 1));

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => setCarouselIndex(root, index));
      });

      setCarouselIndex(root, 0);
    });
}

function bootTestimonialCarousels() {
  initTestimonialCarousels();
}

if (!window._testimonialCarouselInit) {
  window._testimonialCarouselInit = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootTestimonialCarousels);
  } else {
    bootTestimonialCarousels();
  }
  document.addEventListener('htmx:afterSwap', bootTestimonialCarousels);
}
