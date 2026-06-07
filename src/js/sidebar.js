(() => {
  const resolveBrandMirror = (sidebarComponent) => {
    const sidebarId = sidebarComponent.id;
    if (sidebarId) {
      const byId = document.querySelector(`[data-sidebar-brand-mirror="${sidebarId}"]`);
      if (byId) return byId;
    }
    return sidebarComponent.nextElementSibling?.querySelector('[data-sidebar-brand-mirror]') ?? null;
  };

  const initSidebar = (sidebarComponent) => {
    const initialOpen = sidebarComponent.dataset.initialOpen !== 'false';
    const initialMobileOpen = sidebarComponent.dataset.initialMobileOpen === 'true';
    const breakpoint = parseInt(sidebarComponent.dataset.breakpoint) || 768;
    const brandSource = sidebarComponent.querySelector('[data-sidebar-brand]');
    const brandMirror = resolveBrandMirror(sidebarComponent);
    let brandMirrorReady = false;

    let open = breakpoint > 0 
      ? (window.innerWidth >= breakpoint ? initialOpen : initialMobileOpen)
      : initialOpen;

    const syncBrandMirror = () => {
      if (!brandSource || !brandMirror) return;

      if (!brandMirrorReady) {
        brandMirror.replaceChildren(brandSource.cloneNode(true));
        brandMirrorReady = true;
      }

      brandMirror.hidden = open;
    };

    const updateState = () => {
      sidebarComponent.setAttribute('aria-hidden', !open);
      if (open) {
        sidebarComponent.removeAttribute('inert');
      } else {
        sidebarComponent.setAttribute('inert', '');
      }
      syncBrandMirror();
    };

    const setState = (state) => {
      open = state;
      updateState();
    };

    const sidebarId = sidebarComponent.id;

    document.addEventListener('ui5h3ll:sidebar', (event) => {
      if (event.detail?.id && event.detail.id !== sidebarId) return;

      switch (event.detail?.action) {
        case 'open':
          setState(true);
          break;
        case 'close':
          setState(false);
          break;
        default:
          setState(!open);
          break;
      }
    });
    
    sidebarComponent.addEventListener('click', (event) => {
      const target = event.target;
      const nav = sidebarComponent.querySelector('nav');
      
      const isMobile = window.innerWidth < breakpoint;
      
      if (isMobile && (target.closest('a, button') && !target.closest('[data-keep-mobile-sidebar-open]'))) {
        if (document.activeElement) document.activeElement.blur();
        setState(false);
        return;
      }
      
      if (target === sidebarComponent || (nav && !nav.contains(target))) {
        if (document.activeElement) document.activeElement.blur();
        setState(false);
      }
    });

    updateState();
    sidebarComponent.dataset.ui5h3llSidebarInitialized = true;
    sidebarComponent.dispatchEvent(new CustomEvent('ui5h3ll:initialized'));
  };

  if (window.ui5h3ll) {
    window.ui5h3ll.register('sidebar', '.sidebar:not([data-ui5h3ll-sidebar-initialized])', initSidebar);
  }
})();
