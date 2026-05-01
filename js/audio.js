/* =============================================================
   audio.js — small audio helper for chapters that want sound.

   Provides:
     window.PT.audio.play('coin')    → plays /assets/coin-flip.mp3 (or synth fallback)
     window.PT.audio.play('click')   → synth click
     window.PT.audio.play('dice')    → synth dice rattle
     window.PT.audio.play('shuffle') → synth paper shuffle
     window.PT.audio.toggle()        → flips on/off, persists in localStorage
     window.PT.audio.enabled()       → returns boolean
     window.PT.audio.bindToggle(el)  → wires a button to the toggle

   Why this exists:
     Chapter 1 uses the Web Audio API directly with synth tones. That works
     fine, but it's robotic. For future chapters where you want a real
     coin-clink, dice-rattle, or paper-shuffle sound, this helper lets you
     reuse a single mp3 file (assets/coin-flip.mp3) with one consistent API.

     The toggle state is stored in localStorage under 'pt-sound-enabled' so
     turning sound off on one chapter persists across all chapters.

     Chapter 1's existing soundToggle code still works — it's independent.
     You can migrate Ch 1 to this helper later if you want, or keep it as is.
   ============================================================= */
(function () {
  const STORAGE_KEY = 'pt-sound-enabled';
  const COIN_FLIP_URL = '/assets/coin-flip.mp3';

  // Initialize from localStorage; default ON
  let enabled = (() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === null ? true : stored === '1';
    } catch (e) {
      return true;
    }
  })();

  // Lazy AudioContext so we don't create one until the user actually triggers sound
  let _ctx = null;
  function ctx() {
    if (!enabled) return null;
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    return _ctx;
  }

  // Pre-load coin sound on first request, cache the AudioBuffer
  let _coinBuffer = null;
  let _coinLoading = null;
  async function loadCoin() {
    if (_coinBuffer) return _coinBuffer;
    if (_coinLoading) return _coinLoading;
    _coinLoading = (async () => {
      try {
        const c = ctx();
        if (!c) return null;
        const resp = await fetch(COIN_FLIP_URL);
        if (!resp.ok) throw new Error('mp3 not found');
        const arr = await resp.arrayBuffer();
        _coinBuffer = await c.decodeAudioData(arr);
        return _coinBuffer;
      } catch (e) {
        console.warn('[PT.audio] coin-flip.mp3 unavailable, will use synth fallback');
        return null;
      }
    })();
    return _coinLoading;
  }

  // Synthesized one-shot tone
  function tone(freq = 440, dur = 0.08, type = 'sine', vol = 0.03, when = 0) {
    const c = ctx(); if (!c) return;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = type; o.frequency.value = freq; g.gain.value = vol;
    o.connect(g); g.connect(c.destination);
    const now = c.currentTime + when;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(vol, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.start(now); o.stop(now + dur + 0.01);
  }

  const synthSounds = {
    coin:    () => { tone(850, 0.03, 'square', 0.018); tone(620, 0.06, 'triangle', 0.02, 0.03); },
    click:   () => { tone(900, 0.02, 'square', 0.012); },
    dice:    () => { tone(240, 0.04, 'square', 0.015); tone(180, 0.06, 'triangle', 0.017, 0.02); tone(260, 0.04, 'square', 0.012, 0.05); },
    shuffle: () => { tone(260, 0.03, 'sawtooth', 0.009); tone(320, 0.03, 'sawtooth', 0.009, 0.03); tone(210, 0.03, 'sawtooth', 0.009, 0.06); tone(360, 0.04, 'triangle', 0.01, 0.09); },
  };

  function play(kind = 'click') {
    if (!enabled) return;
    if (kind === 'coin') {
      // Try the mp3 first; fall back to synth if not available
      loadCoin().then(buf => {
        const c = ctx();
        if (!c) return;
        if (buf) {
          const src = c.createBufferSource();
          const gain = c.createGain();
          gain.gain.value = 0.5;
          src.buffer = buf;
          src.connect(gain); gain.connect(c.destination);
          src.start();
        } else {
          synthSounds.coin();
        }
      });
      return;
    }
    if (synthSounds[kind]) synthSounds[kind]();
  }

  function toggle() {
    enabled = !enabled;
    try { localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0'); } catch (e) {}
    document.querySelectorAll('[data-pt-sound-toggle]').forEach(syncToggleVisual);
    return enabled;
  }

  function syncToggleVisual(btn) {
    btn.classList.toggle('active', enabled);
    btn.textContent = enabled ? '🔊 Sound On' : '🔇 Sound Off';
  }

  function bindToggle(el) {
    if (!el) return;
    syncToggleVisual(el);
    el.addEventListener('click', () => toggle());
  }

  // Auto-bind any element with data-pt-sound-toggle on DOM ready
  function init() {
    document.querySelectorAll('[data-pt-sound-toggle]').forEach(bindToggle);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API
  window.PT = window.PT || {};
  window.PT.audio = {
    play,
    toggle,
    enabled: () => enabled,
    bindToggle,
  };
})();
