// ============================================
//  PROBABLY TRUE — Shared JavaScript
//  js/main.js
// ============================================

// ── SCROLL REVEAL ──
// Add class="reveal" to any element you want to animate in on scroll
// Optional: add class="delay-1", "delay-2", "delay-3" for staggered timing
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── CHAPTER CARD STAGGER ──
// Animates chapter cards in one by one
function initCardReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.chapter-card:not(.disabled)').forEach((el, i) => {
    el.dataset.delay = i * 120;
    observer.observe(el);
  });
}

// ── ACTIVE NAV LINK ──
// Highlights the correct nav item based on scroll position
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) {
        current = s.getAttribute('id');
      }
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });
}

// ── TOOLTIP HELPER ──
// Usage: addTooltip(element, "Your tooltip text")
function addTooltip(el, text) {
  el.setAttribute('title', text);
  el.style.cursor = 'help';
}

// ── NUMBER FORMATTER ──
// Usage: formatNum(1234567) → "1,234,567"
function formatNum(n) {
  return n.toLocaleString();
}

// ── GAUSSIAN RANDOM (Box-Muller) ──
// Generates a standard normal random number
// Usage: const z = randNorm(); → number around 0, std dev 1
function randNorm() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// ── CLAMP ──
// Keeps a number between min and max
// Usage: clamp(value, 0, 100)
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// ── LERP (Linear Interpolation) ──
// Smoothly moves a value toward a target
// Usage in animation loops: x = lerp(x, targetX, 0.1)
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// ── BRAND COLORS ──
// Import these wherever you need consistent colors in D3 or canvas
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

// ── INIT ON DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCardReveal();
  initActiveNav();
});
