/**
 * 3D globe for block-contact-global (globe.gl + Three.js).
 * Docs-only — loads CDN scripts and inits each [data-contact-global-globe] mount.
 */
const BELFAST = { lat: 54.5973, lng: -5.9301 };

const CONTACT_GLOBAL_OFFICES = [
  { name: 'Belfast', ...BELFAST },
  { name: 'Dublin', lat: 53.3498, lng: -6.2603 },
  { name: 'London', lat: 51.5072, lng: -0.1276 },
  { name: 'Berlin', lat: 52.52, lng: 13.405 },
  { name: 'New York', lat: 40.7128, lng: -74.006 },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
  { name: 'Montreal', lat: 45.5017, lng: -73.5673 },
  { name: 'Anchorage', lat: 61.2181, lng: -149.9003 },
  { name: 'Mexico City', lat: 19.4326, lng: -99.1332 },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
  { name: 'Honolulu', lat: 21.3069, lng: -157.8583 },
  { name: 'Auckland', lat: -36.8485, lng: 174.7633 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
];

function arcFromBelfast(endLat, endLng) {
  return {
    startLat: BELFAST.lat,
    startLng: BELFAST.lng,
    endLat,
    endLng,
  };
}

const CONTACT_GLOBAL_ARCS = [
  arcFromBelfast(53.3498, -6.2603),
  arcFromBelfast(51.5072, -0.1276),
  arcFromBelfast(52.52, 13.405),
  arcFromBelfast(40.7128, -74.006),
  arcFromBelfast(43.6532, -79.3832),
  arcFromBelfast(49.2827, -123.1207),
  arcFromBelfast(45.5017, -73.5673),
  arcFromBelfast(61.2181, -149.9003),
  arcFromBelfast(19.4326, -99.1332),
  arcFromBelfast(-23.5505, -46.6333),
  arcFromBelfast(21.3069, -157.8583),
  arcFromBelfast(-36.8485, 174.7633),
  arcFromBelfast(-33.8688, 151.2093),
  arcFromBelfast(1.3521, 103.8198),
];

const GLOBE_SCRIPTS = [
  'https://unpkg.com/three',
  'https://unpkg.com/globe.gl',
];

let globeScriptsPromise;

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

function ensureGlobeScripts() {
  if (!globeScriptsPromise) {
    globeScriptsPromise = GLOBE_SCRIPTS.reduce(
      (chain, src) => chain.then(() => loadExternalScript(src)),
      Promise.resolve(),
    );
  }
  return globeScriptsPromise;
}

function buildGlobe(mount) {
  const globe = Globe()(mount)
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundColor('rgba(0,0,0,0)')
    .atmosphereColor('#60a5fa')
    .atmosphereAltitude(0.25)
    .pointsData(CONTACT_GLOBAL_OFFICES)
    .pointLat('lat')
    .pointLng('lng')
    .pointColor(() => '#60a5fa')
    .pointAltitude(0.02)
    .pointRadius(0.35)
    .labelsData(CONTACT_GLOBAL_OFFICES)
    .labelLat('lat')
    .labelLng('lng')
    .labelText('name')
    .labelColor(() => '#ffffff')
    .labelSize(1.2)
    .ringsData(CONTACT_GLOBAL_OFFICES)
    .ringColor(() => '#60a5fa')
    .ringMaxRadius(4)
    .ringPropagationSpeed(2)
    .ringRepeatPeriod(1500)
    .arcsData(CONTACT_GLOBAL_ARCS)
    .arcColor(() => ['#8b5cf6', '#60a5fa'])
    .arcDashLength(0.4)
    .arcDashGap(0.15)
    .arcDashAnimateTime(3000);

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.4;
  globe.pointOfView({ lat: 45, lng: -20, altitude: 2.4 }, 1000);

  mount._contactGlobalGlobe = globe;
  return globe;
}

function initContactGlobalGlobes() {
  const mounts = document.querySelectorAll('[data-contact-global-globe]:not([data-contact-global-globe-ready])');
  if (!mounts.length) return;

  ensureGlobeScripts()
    .then(() => {
      if (typeof Globe !== 'function') return;

      mounts.forEach((mount) => {
        mount.dataset.contactGlobalGlobeReady = 'true';
        mount.innerHTML = '';
        buildGlobe(mount);

        if (typeof ResizeObserver !== 'undefined') {
          const observer = new ResizeObserver(() => {
            const globe = mount._contactGlobalGlobe;
            if (!globe) return;
            const { width, height } = mount.getBoundingClientRect();
            if (width > 0 && height > 0) {
              globe.width(width).height(height);
            }
          });
          observer.observe(mount);
          mount._contactGlobalGlobeResizeObserver = observer;
        }
      });
    })
    .catch((error) => {
      console.error('contact-global-globe:', error);
    });
}

function bootContactGlobalGlobes() {
  initContactGlobalGlobes();
}

if (!window._contactGlobalGlobeInit) {
  window._contactGlobalGlobeInit = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootContactGlobalGlobes);
  } else {
    bootContactGlobalGlobes();
  }
  document.addEventListener('htmx:afterSwap', bootContactGlobalGlobes);
}
