/**
 * QR code + copy link for block-share-config-modal.
 */
const QRCODE_JS = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';

let qrcodePromise;

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

function ensureQRCode() {
  if (!qrcodePromise) {
    qrcodePromise = loadExternalScript(QRCODE_JS);
  }
  return qrcodePromise;
}

function normalizeShareUrl(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return 'https://ui.5h3ll.site';
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}

function initShareConfigModal(root) {
  if (root.dataset.shareConfigModalReady === 'true') return;
  root.dataset.shareConfigModalReady = 'true';

  const qrMount = root.querySelector('[data-share-config-qrcode]');
  const urlInput = root.querySelector('[data-share-config-url]');
  const copyBtn = root.querySelector('[data-share-config-copy]');
  const shareUrl = root.dataset.shareUrl || 'https://ui.5h3ll.site';

  if (urlInput && !urlInput.value) {
    urlInput.value = shareUrl.replace(/^https?:\/\//, '');
  }

  copyBtn?.addEventListener('click', async () => {
    const value = normalizeShareUrl(urlInput?.value || shareUrl);
    try {
      await navigator.clipboard.writeText(value);
      copyBtn.dataset.copied = 'true';
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copied';
      window.setTimeout(() => {
        copyBtn.textContent = original;
        delete copyBtn.dataset.copied;
      }, 1600);
    } catch (error) {
      console.error('share-config-modal: copy failed', error);
    }
  });

  if (!qrMount) return;

  ensureQRCode()
    .then(() => {
      if (typeof QRCode !== 'function') return;
      qrMount.innerHTML = '';
      root._shareConfigQr = new QRCode(qrMount, {
        text: shareUrl,
        width: 180,
        height: 180,
        colorDark: '#09090b',
        colorLight: '#ffffff',
      });
    })
    .catch((error) => {
      console.error('share-config-modal:', error);
    });
}

function initShareConfigModals() {
  document
    .querySelectorAll('[data-share-config-modal]:not([data-share-config-modal-ready])')
    .forEach(initShareConfigModal);
}

function bootShareConfigModals() {
  initShareConfigModals();
}

if (!window._shareConfigModalInit) {
  window._shareConfigModalInit = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootShareConfigModals);
  } else {
    bootShareConfigModals();
  }
  document.addEventListener('htmx:afterSwap', bootShareConfigModals);
}
