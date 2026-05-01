// ============================================
//  PROBABLY TRUE — Shared JavaScript utilities
//  js/main.js
// ============================================
//  Pure utility functions — no auto-init, no DOM hooks.
//  Import where needed: <script src="/js/main.js"></script>
//  Then call functions explicitly from your page's own scripts.
// ============================================


// ── BRAND COLORS ──
// Use these in D3 charts, canvas drawings, or anywhere you'd
// otherwise hard-code a hex value. Matches the CSS palette in style.css.
const BRAND_COLORS = {
  purple: '#7c3aed',
  yellow: '#f9c74f',
  teal:   '#06d6a0',
  pink:   '#f72585',
  blue:   '#4361ee',
  lime:   '#74c417',
  violet: '#a78bfa',
};
const COLOR_ARRAY = Object.values(BRAND_COLORS);


// ── GAUSSIAN RANDOM (Box-Muller) ──
// Standard normal random number — mean 0, stddev 1.
// Use for: CLT animations, normal distribution chapters, sampling
// distribution simulations, regression noise generation.
//   const z = randNorm();         → ~N(0, 1)
//   const x = 100 + 15*randNorm();→ ~N(100, 15)
function randNorm() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}


// ── CLAMP ──
// Keep a value between min and max. Used everywhere sliders are involved.
//   clamp(150, 0, 100)  → 100
//   clamp(-5, 0, 100)   → 0
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}


// ── LERP (linear interpolation) ──
// Smoothly move toward a target. Used in animation loops:
//   x = lerp(x, targetX, 0.1);   // approaches targetX over many frames
function lerp(a, b, t) {
  return a + (b - a) * t;
}


// ── NUMBER FORMATTER ──
// 1234567 → "1,234,567" using the user's locale.
function formatNum(n) {
  return n.toLocaleString();
}


// ── TOOLTIP HELPER ──
// Adds a native hover tooltip. Use sparingly — for D3 elements that
// aren't rich enough for a full tooltip system.
function addTooltip(el, text) {
  el.setAttribute('title', text);
  el.style.cursor = 'help';
}


// ── EXPORT TO WINDOW ──
// So inline <script> blocks in chapter pages can use these without imports.
window.PT_UTIL = { randNorm, clamp, lerp, formatNum, addTooltip, BRAND_COLORS, COLOR_ARRAY };
