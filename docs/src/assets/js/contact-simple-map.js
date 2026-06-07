/**
 * OpenStreetMap / Leaflet map for block-contact-simple.
 * Centered on Belfast HQ with 5H3LL-UI token styling via custom.css.
 */
const BELFAST_HQ = {
  name: 'Belfast HQ',
  subtitle: 'Northern Ireland · Global Operations Center',
  coords: [54.5973, -5.9301],
};

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

let leafletPromise;

function loadExternalScript(src) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    return existing.dataset.loaded === 'true'
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), {
            once: true,
          });
        });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function ensureLeaflet() {
  if (!leafletPromise) {
    leafletPromise = new Promise((resolve, reject) => {
      if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = LEAFLET_CSS;
        document.head.appendChild(link);
      }
      loadExternalScript(LEAFLET_JS).then(resolve).catch(reject);
    });
  }
  return leafletPromise;
}

function hqMarkerIcon() {
  return L.divIcon({
    className: '',
    html: `
      <div class="office-marker office-marker-hq">
        <div class="office-marker-pulse"></div>
        <div class="office-marker-dot"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function buildMap(mount) {
  const map = L.map(mount, {
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true,
  }).setView(BELFAST_HQ.coords, 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  const marker = L.marker(BELFAST_HQ.coords, { icon: hqMarkerIcon() }).addTo(map);

  marker.bindPopup(`
    <div class="block-contact-simple-popup">
      <div class="block-contact-simple-popup-title">${BELFAST_HQ.name}</div>
      <div class="block-contact-simple-popup-subtitle">${BELFAST_HQ.subtitle}</div>
    </div>
  `);

  marker.openPopup();

  mount._contactSimpleMap = map;
  return map;
}

function initContactSimpleMaps() {
  const mounts = document.querySelectorAll('[data-contact-simple-map]:not([data-contact-simple-map-ready])');
  if (!mounts.length) return;

  ensureLeaflet()
    .then(() => {
      if (typeof L === 'undefined') return;

      mounts.forEach((mount) => {
        mount.dataset.contactSimpleMapReady = 'true';
        mount.innerHTML = '';
        const map = buildMap(mount);

        if (typeof ResizeObserver !== 'undefined') {
          const observer = new ResizeObserver(() => {
            map.invalidateSize();
          });
          observer.observe(mount);
          mount._contactSimpleMapResizeObserver = observer;
        }

        requestAnimationFrame(() => map.invalidateSize());
      });
    })
    .catch((error) => {
      console.error('contact-simple-map:', error);
    });
}

function bootContactSimpleMaps() {
  initContactSimpleMaps();
}

if (!window._contactSimpleMapInit) {
  window._contactSimpleMapInit = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootContactSimpleMaps);
  } else {
    bootContactSimpleMaps();
  }
  document.addEventListener('htmx:afterSwap', bootContactSimpleMaps);
}
