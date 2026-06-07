(() => {
  const initPopover = (popoverComponent) => {
    const trigger = popoverComponent.querySelector(':scope > button');
    const content = popoverComponent.querySelector(':scope > [data-popover]');

    if (!trigger || !content) {
      const missing = [];
      if (!trigger) missing.push('trigger');
      if (!content) missing.push('content');
      console.error(`Popover initialisation failed. Missing element(s): ${missing.join(', ')}`, popoverComponent);
      return;
    }

    popoverComponent._ui5h3llPopoverAbort?.abort();
    const abort = new AbortController();
    popoverComponent._ui5h3llPopoverAbort = abort;
    const { signal } = abort;

    const closePopover = (focusOnTrigger = true) => {
      if (trigger.getAttribute('aria-expanded') === 'false') return;
      trigger.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
      if (focusOnTrigger) {
        trigger.focus();
      }
    };

    const openPopover = () => {
      document.dispatchEvent(new CustomEvent('ui5h3ll:popover', {
        detail: { source: popoverComponent }
      }));

      const elementToFocus = content.querySelector('[autofocus]');
      if (elementToFocus) {
        content.addEventListener('transitionend', () => {
          elementToFocus.focus();
        }, { once: true, signal });
      }

      trigger.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
    };

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closePopover();
      } else {
        openPopover();
      }
    }, { signal });

    popoverComponent.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    }, { signal });

    document.addEventListener('click', (event) => {
      if (!popoverComponent.contains(event.target)) {
        closePopover();
      }
    }, { signal });

    document.addEventListener('ui5h3ll:popover', (event) => {
      if (event.detail.source !== popoverComponent) {
        closePopover(false);
      }
    }, { signal });

    popoverComponent.dataset.ui5h3llPopoverInitialized = true;
    popoverComponent.dispatchEvent(new CustomEvent('ui5h3ll:initialized'));
  };

  if (window.ui5h3ll) {
    window.ui5h3ll.register('popover', '.popover:not([data-ui5h3ll-popover-initialized])', initPopover);
  }
})();
