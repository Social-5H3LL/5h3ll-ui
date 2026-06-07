(() => {
  const root = document.querySelector('[data-hm-demo]');
  if (!root) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const platformButtons = [...root.querySelectorAll('[data-hm-platform]')];
  const installPanels = [...root.querySelectorAll('[data-hm-install-panel]')];
  const revealBlocks = [...root.querySelectorAll('[data-hm-reveal]')];
  const featureCards = [...root.querySelectorAll('[data-hm-feature]')];
  const moreBtn = root.querySelector('[data-hm-more]');
  const extraFeatures = root.querySelector('[data-hm-extra]');
  const terminalOutput = root.querySelector('[data-hm-terminal-output]');

  const terminalScript = [
    {
      type: 'prompt',
      text: 'Research the latest approaches to GRPO training and write a summary',
    },
    { type: 'spacer' },
    {
      type: 'tool',
      cmd: 'web_search',
      arg: '"GRPO reinforcement learning 2026"',
      duration: '1.2s',
    },
    {
      type: 'tool',
      cmd: 'web_extract',
      arg: 'arxiv.org/abs/2402.03300',
      duration: '3.1s',
    },
    {
      type: 'tool',
      cmd: 'web_search',
      arg: '"GRPO vs PPO ablation results"',
      duration: '0.9s',
    },
    {
      type: 'tool',
      cmd: 'web_extract',
      arg: 'huggingface.co/blog/grpo',
      duration: '2.8s',
    },
    {
      type: 'tool',
      cmd: 'write_file',
      arg: '~/research/grpo-summary.md',
      duration: '0.1s',
    },
    { type: 'spacer' },
    { type: 'text', text: "Done! I've written a summary covering:" },
    { type: 'spacer' },
    {
      type: 'check',
      text: "GRPO's group-relative advantage (no critic model needed)",
    },
    {
      type: 'check',
      text: 'Comparison with PPO/DPO on reasoning benchmarks',
    },
    {
      type: 'check',
      text: 'Implementation notes for Axolotl and TRL',
    },
    { type: 'spacer' },
    { type: 'saved', text: 'Saved to ~/research/grpo-summary.md' },
  ];

  const setActivePlatform = (value) => {
    platformButtons.forEach((btn) => {
      const on = btn.dataset.hmPlatform === value;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    installPanels.forEach((panel) => {
      panel.hidden = panel.dataset.hmInstallPanel !== value;
    });
  };

  const copyText = async (text, btn) => {
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
  };

  platformButtons.forEach((btn) => {
    btn.addEventListener('click', () => setActivePlatform(btn.dataset.hmPlatform));
  });

  root.querySelectorAll('[data-hm-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.closest('[data-hm-step]')?.querySelector('code');
      copyText(code?.textContent?.trim(), btn);
    });
  });

  moreBtn?.addEventListener('click', () => {
    const expanded = extraFeatures?.classList.toggle('is-open');
    moreBtn.classList.toggle('is-open', expanded);
    moreBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    moreBtn.textContent = expanded ? 'Less Details ⌃' : 'More Details ⌄';
    if (expanded) {
      extraFeatures?.querySelectorAll('[data-hm-feature]').forEach((card, index) => {
        window.setTimeout(() => card.classList.add('is-visible'), index * 80);
      });
    }
  });

  const revealOnLoad = () => {
    revealBlocks.forEach((block, index) => {
      if (prefersReducedMotion) {
        block.classList.add('is-visible');
        return;
      }
      window.setTimeout(() => block.classList.add('is-visible'), index * 120);
    });
  };

  const revealFeatures = () => {
    if (!featureCards.length) return;
    if (prefersReducedMotion) {
      featureCards.forEach((card) => card.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = featureCards.indexOf(entry.target);
          window.setTimeout(() => entry.target.classList.add('is-visible'), index * 80);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    featureCards.forEach((card) => observer.observe(card));
  };

  const lineDelay = (line) => {
    if (line.type === 'spacer') return 120;
    if (line.type === 'prompt') return 700;
    if (line.type === 'tool') return 380;
    if (line.type === 'check') return 280;
    if (line.type === 'saved') return 500;
    return 420;
  };

  const renderTerminalLine = (line) => {
    if (line.type === 'spacer') {
      const el = document.createElement('div');
      el.className = 'hm-terminal-gap';
      el.setAttribute('aria-hidden', 'true');
      return el;
    }

    if (line.type === 'prompt') {
      const el = document.createElement('p');
      el.className = 'hm-prompt';
      el.innerHTML = `<span class="hm-prompt-mark">❯</span> ${line.text}`;
      return el;
    }

    if (line.type === 'tool') {
      const el = document.createElement('div');
      el.className = 'hm-tool-line';
      el.innerHTML = `
        <span class="hm-tool-cmd">${line.cmd} ${line.arg}</span>
        <span class="hm-tool-time">${line.duration}</span>
      `;
      return el;
    }

    if (line.type === 'check') {
      const el = document.createElement('p');
      el.className = 'hm-check-line';
      el.innerHTML = `<span class="hm-check-mark">✓</span> ${line.text}`;
      return el;
    }

    if (line.type === 'saved') {
      const el = document.createElement('p');
      el.className = 'hm-saved-line';
      el.textContent = line.text;
      return el;
    }

    const el = document.createElement('p');
    el.className = 'hm-terminal-text';
    el.textContent = line.text;
    return el;
  };

  const runTerminalDemo = () => {
    if (!terminalOutput) return;

    let token = 0;
    const loop = () => {
      const current = ++token;
      terminalOutput.innerHTML = '';
      terminalOutput.classList.remove('is-typing');

      if (prefersReducedMotion) {
        terminalScript.forEach((line) => terminalOutput.appendChild(renderTerminalLine(line)));
        terminalOutput.appendChild(createCursor());
        return;
      }

      let delay = 300;
      terminalScript.forEach((line) => {
        window.setTimeout(() => {
          if (current !== token) return;
          terminalOutput.appendChild(renderTerminalLine(line));
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, delay);
        delay += lineDelay(line);
      });

      window.setTimeout(() => {
        if (current !== token) return;
        terminalOutput.appendChild(createCursor());
        terminalOutput.classList.add('is-typing');
      }, delay + 200);

      window.setTimeout(() => {
        if (current !== token) return;
        loop();
      }, delay + 6000);
    };

    loop();
  };

  const createCursor = () => {
    const cursor = document.createElement('span');
    cursor.className = 'hm-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    return cursor;
  };

  setActivePlatform('unix');
  revealOnLoad();
  revealFeatures();
  runTerminalDemo();
})();
