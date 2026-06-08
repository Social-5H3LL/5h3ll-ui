/**
 * 5H3LL-UI sensory-ui spike — procedural UI sounds (Web Audio API).
 * Inspired by https://www.sensory-ui.com/ — vanilla, no bundled audio files.
 */
(() => {
  const STORAGE_KEY = '5h3ll-sensory';

  const ROLES = {
    'interaction.tap': { freq: 880, duration: 0.04, type: 'sine', gain: 0.08 },
    'interaction.subtle': { freq: 660, duration: 0.03, type: 'sine', gain: 0.05 },
    'interaction.toggle': { freq: 520, duration: 0.05, type: 'triangle', gain: 0.07 },
    'interaction.confirm': { freq: 740, duration: 0.08, type: 'sine', gain: 0.09 },
    'overlay.open': { freq: 440, duration: 0.12, type: 'sine', gain: 0.06, sweep: 1.4 },
    'overlay.close': { freq: 380, duration: 0.1, type: 'sine', gain: 0.05, sweep: 0.75 },
    'navigation.tab': { freq: 600, duration: 0.06, type: 'triangle', gain: 0.06 },
    'notification.success': { freq: 523, duration: 0.15, type: 'sine', gain: 0.07, sweep: 1.25 },
    'notification.error': { freq: 220, duration: 0.12, type: 'sawtooth', gain: 0.04 },
  };

  let ctx = null;

  const disabled = () => {
    if (document.documentElement.dataset.sensory === 'off') return true;
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'off') return true;
    } catch (_) {}
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const unlock = () => {
    if (disabled() || ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    ctx = new Ctx();
    if (ctx.state === 'suspended') ctx.resume();
  };

  const play = (role) => {
    if (disabled()) return;
    unlock();
    if (!ctx) return;

    const spec = ROLES[role];
    if (!spec) return;

    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = spec.type;
    osc.frequency.setValueAtTime(spec.freq, t0);
    if (spec.sweep) {
      osc.frequency.exponentialRampToValueAtTime(spec.freq * spec.sweep, t0 + spec.duration);
    }

    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(spec.gain, t0 + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + spec.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + spec.duration + 0.02);
  };

  const roleFromElement = (el) => el?.closest?.('[data-sound]')?.dataset?.sound;

  document.addEventListener(
    'click',
    (event) => {
      const role = roleFromElement(event.target);
      if (role) play(role);
    },
    true
  );

  document.addEventListener(
    'change',
    (event) => {
      const el = event.target;
      if (!el?.matches?.('input[type="checkbox"], input[type="radio"], input[role="switch"], input[type="range"]')) return;
      const role = el.dataset.sound
        || (el.matches('input[type="range"]') ? 'interaction.subtle' : 'interaction.toggle');
      play(role);
    },
    true
  );

  document.addEventListener('ui5h3ll:sensory', (event) => {
    const role = event.detail?.role;
    if (role) play(role);
  });

  window.ui5h3llSensory = { play, unlock, roles: Object.keys(ROLES) };

  ['pointerdown', 'keydown'].forEach((type) => {
    document.addEventListener(type, unlock, { once: true, capture: true });
  });
})();
