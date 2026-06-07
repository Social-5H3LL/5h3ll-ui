/** Swap Lobe brand PNGs when the docs site toggles light/dark theme. */
function syncLobeBrandImages() {
  const dark = document.documentElement.classList.contains('dark');

  document.querySelectorAll('img[data-brand-light][data-brand-dark]').forEach((img) => {
    const next = dark ? img.dataset.brandDark : img.dataset.brandLight;
    if (img.getAttribute('src') !== next) img.setAttribute('src', next);
  });
}

function bootLobeBrandTheme() {
  syncLobeBrandImages();
}

if (!window._lobeBrandThemeInit) {
  window._lobeBrandThemeInit = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootLobeBrandTheme);
  } else {
    bootLobeBrandTheme();
  }
  document.addEventListener('ui5h3ll:theme', bootLobeBrandTheme);
  document.addEventListener('htmx:afterSwap', bootLobeBrandTheme);
}
