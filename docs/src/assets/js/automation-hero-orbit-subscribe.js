/**
 * Expandable email subscribe bar for layout-automation-hero-orbit.
 */
function expandOrbitSubscribe(root) {
  if (root.classList.contains('is-expanded')) return;

  root.classList.add('is-expanded');
  root.setAttribute('aria-expanded', 'true');

  const input = root.querySelector('[data-automation-hero-orbit-subscribe-input]');
  if (input) {
    input.tabIndex = 0;
    input.focus();
  }
}

function collapseOrbitSubscribe(root) {
  const input = root.querySelector('[data-automation-hero-orbit-subscribe-input]');
  if (input?.value.trim()) return;

  root.classList.remove('is-expanded');
  root.setAttribute('aria-expanded', 'false');

  if (input) input.tabIndex = -1;
}

function initOrbitSubscribe(root) {
  if (root.dataset.automationHeroOrbitSubscribeReady === 'true') return;
  root.dataset.automationHeroOrbitSubscribeReady = 'true';

  const open = root.querySelector('[data-automation-hero-orbit-subscribe-open]');
  const input = root.querySelector('[data-automation-hero-orbit-subscribe-input]');

  open?.addEventListener('click', (event) => {
    event.preventDefault();
    expandOrbitSubscribe(root);
  });

  input?.addEventListener('focus', () => {
    expandOrbitSubscribe(root);
  });

  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (input) input.value = '';
      collapseOrbitSubscribe(root);
      open?.focus();
    }
  });

  root.addEventListener('focusout', (event) => {
    if (root.contains(event.relatedTarget)) return;
    collapseOrbitSubscribe(root);
  });

  root.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

function initAllOrbitSubscribes() {
  document
    .querySelectorAll('[data-automation-hero-orbit-subscribe]:not([data-automation-hero-orbit-subscribe-ready])')
    .forEach(initOrbitSubscribe);
}

function bootOrbitSubscribes() {
  initAllOrbitSubscribes();
}

if (!window._automationHeroOrbitSubscribeInit) {
  window._automationHeroOrbitSubscribeInit = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootOrbitSubscribes);
  } else {
    bootOrbitSubscribes();
  }
  document.addEventListener('htmx:afterSwap', bootOrbitSubscribes);
}
