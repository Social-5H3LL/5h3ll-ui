(() => {
  let toaster;
  const toasts = new WeakMap();
  let isPaused = false;

  /**
   * Escape HTML special characters to prevent XSS when inserting
   * user-controlled strings into innerHTML.
   */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Validate a URL scheme. Rejects javascript:, data:, and other
   * potentially dangerous schemes. Only http and https are allowed.
   */
  function isValidUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
      return false;
    }
  }

  const ICONS = {
    success: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    error: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
    info: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
    warning: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>'
  };

  function initToaster(toasterElement) {
    if (toasterElement.dataset.ui5h3llToasterInitialized) return;
    toaster = toasterElement;

    toaster.addEventListener('mouseenter', pauseAllTimeouts);
    toaster.addEventListener('mouseleave', resumeAllTimeouts);

    // Delegated click handler — no inline onclick attributes.
    // Action buttons dispatch a CustomEvent so the host app controls execution.
    toaster.addEventListener('click', (event) => {
      const actionLink = event.target.closest('.toast footer a[data-toast-action]');
      const actionButton = event.target.closest('.toast footer button[data-toast-action]');
      const cancelButton = event.target.closest('.toast footer button[data-toast-cancel]');
      const toast = event.target.closest('.toast');

      if (cancelButton && toast) {
        closeToast(toast);
        return;
      }

      if ((actionLink || actionButton) && toast) {
        toast.dispatchEvent(new CustomEvent('ui5h3ll:toast:action', {
          bubbles: true,
          detail: {
            action: toast.dataset.toastAction || null,
            close: () => closeToast(toast),
          },
        }));
        closeToast(toast);
      }
    });

    toaster.querySelectorAll('.toast:not([data-ui5h3ll-toast-initialized])').forEach(initToast);
    toaster.dataset.ui5h3llToasterInitialized = 'true';
    toaster.dispatchEvent(new CustomEvent('ui5h3ll:initialized'));
  }

  function initToast(element) {
    if (element.dataset.ui5h3llToastInitialized) return;

    const duration = parseInt(element.dataset.duration);
    const timeoutDuration = duration !== -1
      ? duration || (element.dataset.category === 'error' ? 5000 : 3000)
      : -1;

    const state = {
      remainingTime: timeoutDuration,
      timeoutId: null,
      startTime: null,
    };

    if (timeoutDuration !== -1) {
      if (isPaused) {
        state.timeoutId = null;
      } else {
        state.startTime = Date.now();
        state.timeoutId = setTimeout(() => closeToast(element), timeoutDuration);
      }
    }
    toasts.set(element, state);

    element.dataset.ui5h3llToastInitialized = 'true';
  }

  function pauseAllTimeouts() {
    if (isPaused) return;

    isPaused = true;

    toaster.querySelectorAll('.toast:not([aria-hidden="true"])').forEach(element => {
      if (!toasts.has(element)) return;

      const state = toasts.get(element);
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
        state.remainingTime -= Date.now() - state.startTime;
      }
    });
  }

  function resumeAllTimeouts() {
    if (!isPaused) return;

    isPaused = false;

    toaster.querySelectorAll('.toast:not([aria-hidden="true"])').forEach(element => {
      if (!toasts.has(element)) return;

      const state = toasts.get(element);
      if (state.remainingTime !== -1 && !state.timeoutId) {
        if (state.remainingTime > 0) {
          state.startTime = Date.now();
          state.timeoutId = setTimeout(() => closeToast(element), state.remainingTime);
        } else {
          closeToast(element);
        }
      }
    });
  }

  function closeToast(element) {
    if (!toasts.has(element)) return;

    const state = toasts.get(element);
    clearTimeout(state.timeoutId);
    toasts.delete(element);

    if (element.contains(document.activeElement)) document.activeElement.blur();
    element.setAttribute('aria-hidden', 'true');
    element.addEventListener('transitionend', () => element.remove(), { once: true });
  }

  /**
   * Build a toast element imperatively using textContent for all
   * user-controlled strings — prevents XSS via innerHTML interpolation.
   * href values are validated to block javascript: and data: schemes.
   */
  function createToast(config) {
    const {
      category = 'info',
      title,
      description,
      action,
      cancel,
      duration,
      icon,
    } = config;

    const iconHtml = icon || (category && ICONS[category]) || '';

    const toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', category === 'error' ? 'alert' : 'status');
    toastEl.setAttribute('aria-atomic', 'true');
    if (category) toastEl.dataset.category = category;
    if (duration !== undefined) toastEl.dataset.duration = String(duration);
    if (action?.id) toastEl.dataset.toastAction = action.id;

    const contentEl = document.createElement('div');
    contentEl.className = 'toast-content';

    if (iconHtml) {
      const iconWrapper = document.createElement('div');
      iconWrapper.innerHTML = iconHtml;
      contentEl.appendChild(iconWrapper.firstChild);
    }

    const sectionEl = document.createElement('section');

    if (title) {
      const titleEl = document.createElement('h2');
      titleEl.textContent = title;
      sectionEl.appendChild(titleEl);
    }
    if (description) {
      const descEl = document.createElement('p');
      descEl.textContent = description;
      sectionEl.appendChild(descEl);
    }
    contentEl.appendChild(sectionEl);

    const footerEl = document.createElement('footer');
    let hasFooter = false;

    if (action) {
      hasFooter = true;
      if (action.href && isValidUrl(action.href)) {
        const a = document.createElement('a');
        a.href = action.href;
        a.className = 'btn';
        a.dataset.toastAction = '';
        a.textContent = action.label ? escapeHtml(action.label) : '';
        footerEl.appendChild(a);
      } else if (action.label) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn';
        btn.dataset.toastAction = '';
        btn.textContent = escapeHtml(action.label);
        footerEl.appendChild(btn);
      }
    }

    if (cancel) {
      hasFooter = true;
      const cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.className = 'btn-outline h-6 text-xs px-2.5 rounded-sm';
      cancelBtn.dataset.toastCancel = '';
      cancelBtn.textContent = cancel.label ? escapeHtml(cancel.label) : '';
      footerEl.appendChild(cancelBtn);
    }

    if (hasFooter) toastEl.appendChild(contentEl);
    else toastEl.appendChild(contentEl);

    return toastEl;
  }

  document.addEventListener('ui5h3ll:toast', (event) => {
    if (!toaster) {
      console.error('Cannot create toast: toaster container not found on page.');
      return;
    }
    const config = event.detail?.config || {};
    const toastElement = createToast(config);
    toaster.appendChild(toastElement);
  });

  if (window.ui5h3ll) {
    window.ui5h3ll.register('toaster', '#toaster:not([data-ui5h3ll-toaster-initialized])', initToaster);
    window.ui5h3ll.register('toast', '.toast:not([data-ui5h3ll-toast-initialized])', initToast);
  }
})();
