(() => {
  const frame = document.querySelector('[data-design-skin="openclaw"]');
  const themeToggle = document.querySelector('[data-oc-theme-toggle]');
  const themeIcon = document.querySelector('[data-oc-theme-icon]');
  const storageKey = 'openclaw-demo-theme';

  const applyTheme = (theme) => {
    const next = theme === 'light' ? 'light' : 'dark';
    frame?.setAttribute('data-oc-theme', next);
    document.documentElement.style.colorScheme = next;

    if (themeToggle && themeIcon) {
      const toLight = next === 'dark';
      themeToggle.setAttribute('aria-label', toLight ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.title = toLight ? 'Switch to light mode' : 'Switch to dark mode';
      themeIcon.textContent = toLight ? '☀' : '🌙';
    }

    try {
      localStorage.setItem(storageKey, next);
    } catch (_) {}
  };

  if (themeToggle) {
    let initial = 'dark';
    try {
      initial = localStorage.getItem(storageKey) || 'dark';
    } catch (_) {}
    applyTheme(initial);

    themeToggle.addEventListener('click', () => {
      const current = frame?.getAttribute('data-oc-theme') === 'light' ? 'light' : 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  const root = document.querySelector('[data-oc-demo]');
  if (!root) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const modeButtons = [...root.querySelectorAll('[data-oc-mode]')];
  const pmButtons = [...root.querySelectorAll('[data-oc-pm]')];
  const hackableButtons = [...root.querySelectorAll('[data-oc-hackable]')];
  const panels = [...root.querySelectorAll('[data-oc-panel]')];
  const toolbars = [...root.querySelectorAll('[data-oc-toolbar]')];
  const betaBtn = root.querySelector('[data-oc-beta]');
  const terminal = root.querySelector('.oc-terminal');

  let activeMode = 'oneliner';
  let activePm = 'npm';
  let activeHackable = 'installer';
  let beta = false;
  let typingToken = 0;

  const setActive = (buttons, attr, value) => {
    buttons.forEach((btn) => {
      const on = btn.dataset[attr] === value;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  };

  const visiblePanel = () => panels.find((panel) => panel.dataset.ocPanel === activeMode);

  const updatePmText = () => {
    const installText = `${activePm} i -g openclaw`;
    root.querySelectorAll('[data-oc-pm-install]').forEach((el) => {
      el.textContent = installText;
    });
    root.querySelectorAll('[data-oc-panel="npm"] [data-oc-copy]').forEach((btn) => {
      if (btn.closest('.oc-cmd')?.querySelector('[data-oc-pm-install]')) {
        btn.dataset.ocCopy = installText;
      }
    });
  };

  const updateOnelinerCopy = () => {
    const cmd = root.querySelector('[data-oc-oneliner-cmd]');
    const copyBtn = root.querySelector('[data-oc-panel="oneliner"] .oc-copy-line');
    if (!cmd || !copyBtn) return;
    copyBtn.dataset.ocCopy = cmd.textContent.trim();
  };

  const updateBetaComment = () => {
    const comment = root.querySelector('[data-oc-oneliner-comment]');
    if (!comment) return;
    comment.textContent = beta
      ? '# Beta channel — installs prerelease builds.'
      : '# Works everywhere. On macOS, first run may need an Administrator for Homebrew.';
  };

  const updateOnelinerCmd = () => {
    const cmd = root.querySelector('[data-oc-oneliner-cmd]');
    if (!cmd) return;
    cmd.textContent = beta
      ? 'curl -fsSL https://openclaw.ai/install.sh | bash -s -- --channel beta'
      : 'curl -fsSL https://openclaw.ai/install.sh | bash';
    updateOnelinerCopy();
  };

  const showToolbar = () => {
    toolbars.forEach((bar) => {
      const active = bar.dataset.ocToolbar === activeMode;
      bar.hidden = !active;
      bar.classList.toggle('is-active', active);
    });
  };

  const showHackableContent = () => {
    root.querySelectorAll('[data-oc-hackable-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.ocHackablePanel !== activeHackable;
    });
  };

  const animatePanel = (panel) => {
    if (!panel) return;

    const lines = [...panel.querySelectorAll('[data-oc-line]')].filter((line) => !line.closest('[hidden]'));

    if (prefersReducedMotion) {
      lines.forEach((line, index) => {
        line.classList.add('is-visible');
        line.style.setProperty('--oc-line-delay', `${index * 40}ms`);
      });
      return;
    }

    const token = ++typingToken;
    lines.forEach((line) => line.classList.remove('is-visible', 'is-typing'));

    lines.forEach((line, index) => {
      window.setTimeout(() => {
        if (token !== typingToken) return;
        line.classList.add('is-typing', 'is-visible');
        window.setTimeout(() => line.classList.remove('is-typing'), 520);
      }, index * 220);
    });
  };

  const showPanel = () => {
    panels.forEach((panel) => {
      const active = panel.dataset.ocPanel === activeMode;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
    showToolbar();
    showHackableContent();
    terminal?.classList.toggle('is-apps', activeMode === 'apps');
    updatePmText();
    updateBetaComment();
    updateOnelinerCmd();
    animatePanel(visiblePanel());
  };

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeMode = btn.dataset.ocMode;
      setActive(modeButtons, 'ocMode', activeMode);
      showPanel();
    });
  });

  pmButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activePm = btn.dataset.ocPm;
      setActive(pmButtons, 'ocPm', activePm);
      updatePmText();
      animatePanel(root.querySelector('[data-oc-panel="npm"]'));
    });
  });

  hackableButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeHackable = btn.dataset.ocHackable;
      setActive(hackableButtons, 'ocHackable', activeHackable);
      showHackableContent();
      animatePanel(root.querySelector('[data-oc-panel="hackable"]'));
    });
  });

  betaBtn?.addEventListener('click', () => {
    beta = !beta;
    betaBtn.classList.toggle('is-active', beta);
    betaBtn.dataset.beta = beta ? 'true' : 'false';
    betaBtn.setAttribute('aria-pressed', beta ? 'true' : 'false');
    updateBetaComment();
    updateOnelinerCmd();
    if (activeMode === 'oneliner') animatePanel(visiblePanel());
  });

  root.querySelectorAll('[data-oc-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.ocCopy;
      if (!text) return;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const area = document.createElement('textarea');
          area.value = text;
          document.body.appendChild(area);
          area.select();
          document.execCommand('copy');
          document.body.removeChild(area);
        }
        btn.classList.add('is-copied');
        btn.textContent = 'Copied';
        window.setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.textContent = 'Copy';
        }, 1200);
      } catch (_) {}
    });
  });

  showPanel();
})();
