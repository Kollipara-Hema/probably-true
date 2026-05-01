/* =============================================================
   nav.js — reads window.PT_CHAPTERS and renders:
     1. Chapters dropdown   (data-pt-dropdown-chapters)   — interactive pages
     2. Notebooks dropdown  (data-pt-dropdown-notebooks)  — Jupyter pages
     3. Chapter cards       (data-pt-cards)               — homepage hero
     4. Roadmap strip       (data-pt-roadmap)             — homepage footer of hero
     5. Contextual sibling button on chapter / notebook pages
        (data-pt-sibling-button="<slug>")  →
          on /chapters/<slug>/ pages: shows "📓 See the math" linking to notebook
          on /notebooks/<num>-<slug>.html: shows "🎮 Play with it" linking to interactive
   ============================================================= */
(function () {
  const chapters = window.PT_CHAPTERS || [];
  const books    = window.PT_BOOKS    || {};
  const H        = window.PT_HELPERS  || {};

  /* ---------- 1. Chapters dropdown ---------- */
  function renderChaptersDropdown() {
    const target = document.querySelector('[data-pt-dropdown-chapters]');
    if (!target) return;
    target.innerHTML = buildDropdown('interactive');
  }

  /* ---------- 2. Notebooks dropdown ---------- */
  function renderNotebooksDropdown() {
    const target = document.querySelector('[data-pt-dropdown-notebooks]');
    if (!target) return;
    target.innerHTML = buildDropdown('notebook');
  }

  /* shared dropdown builder */
  function buildDropdown(kind) {
    let html = '';
    let lastBook = null;
    chapters.forEach(c => {
      // Insert a book header before the first chapter of each book
      if (c.book !== lastBook) {
        const bk = books[c.book];
        if (bk) {
          html += `<li class="dd-section"><span class="dd-section-label">${bk.label}</span> <span class="dd-section-name">${bk.name}</span></li>`;
        }
        lastBook = c.book;
      }
      const isLive = c.status && c.status[kind] === 'live';
      const url    = isLive
        ? (kind === 'interactive' ? H.interactiveUrl(c) : H.notebookUrl(c))
        : '#';
      const cls    = isLive ? '' : 'disabled';
      const tail   = isLive ? '' : ' · Soon';
      html += `<li><a href="${url}" class="${cls}">${c.icon} Ch ${c.num} · ${c.title}${tail}</a></li>`;
    });
    return html;
  }

  /* ---------- 3. Chapter cards (homepage) ---------- */
  function renderCards() {
    const target = document.querySelector('[data-pt-cards]');
    if (!target) return;

    let html = '';
    Object.keys(books).forEach((bookKey, bookIdx) => {
      const book = books[bookKey];
      const inBook = chapters.filter(c => c.book === bookKey);
      if (inBook.length === 0) return;

      html += `<div class="book-section">
        <div class="book-header">
          <span class="book-label">${book.label}</span>
          <h3 class="book-name">${book.name}</h3>
          <span class="book-sub">${book.subtitle}</span>
        </div>
        <div class="cg">`;

      inBook.forEach((c, idx) => {
        const interactiveLive = c.status && c.status.interactive === 'live';
        const notebookLive    = c.status && c.status.notebook === 'live';
        const href     = interactiveLive ? H.interactiveUrl(c) : '#';
        const dimClass = interactiveLive ? '' : 'dim';
        const cnumLabel = interactiveLive
          ? `Chapter ${c.num} · ${idx === 0 && bookIdx === 0 ? 'Start Here 🎉' : 'Live'}`
          : `Chapter ${c.num} · Coming Soon`;
        const tagHtml = (c.tags || []).map(t => `<span class="ctag">${t}</span>`).join('');
        const notebookBadge = notebookLive
          ? `<a href="${H.notebookUrl(c)}" class="cnotebook-badge" title="Notebook also available">📓 notebook</a>`
          : '';

        html += `<a href="${href}" class="cc ${dimClass}" style="--ca:${c.color};--cl:${hexToBg(c.color)};">
          <div class="cnum">${cnumLabel}</div>
          <div class="cicon">${c.icon}</div>
          <h3 class="ctitle">${c.title}</h3>
          <p class="cdesc">${c.description}</p>
          <div class="ctags">${tagHtml}</div>
          ${notebookBadge}
          ${interactiveLive ? `<div class="carr"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M9 4l5 5-5 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>` : ''}
        </a>`;
      });

      html += `</div></div>`;
    });

    target.innerHTML = html;
  }

  /* ---------- 4. Roadmap strip (homepage) ---------- */
  function renderRoadmap() {
    const target = document.querySelector('[data-pt-roadmap]');
    if (!target) return;
    let html = `<div class="rm-inner">`;
    chapters.forEach((c) => {
      const isLive = c.status && c.status.interactive === 'live';
      const dotClass = isLive ? 'rm-dot active' : 'rm-dot soon';
      const dotContent = isLive ? '✦' : c.num;
      const nameClass = isLive ? 'rm-name active' : 'rm-name';
      html += `<div class="rm-item">
        <div class="${dotClass}">${dotContent}</div>
        <div class="${nameClass}" title="${c.title}">${truncate(c.title, 18)}</div>
      </div>`;
    });
    html += `</div>`;
    target.innerHTML = html;
  }

  /* ---------- 5. Contextual sibling button ---------- */
  /* Looks for <... data-pt-sibling-button="probability"> and fills it
     with the OPPOSITE-surface link. The host page knows its own slug
     and which surface it's on (via data-pt-surface). */
  function renderSiblingButtons() {
    document.querySelectorAll('[data-pt-sibling-button]').forEach(el => {
      const slug    = el.getAttribute('data-pt-sibling-button');
      const surface = el.getAttribute('data-pt-surface') || 'interactive'; // 'interactive' | 'notebook'
      const c = H.findBySlug(slug);
      if (!c) return;

      const otherSurface = surface === 'interactive' ? 'notebook' : 'interactive';
      const otherLive    = c.status && c.status[otherSurface] === 'live';
      const otherUrl     = otherSurface === 'interactive' ? H.interactiveUrl(c) : H.notebookUrl(c);
      const label = otherSurface === 'notebook'
        ? '📓 See the math'
        : '🎮 Play with it';
      const subline = otherSurface === 'notebook'
        ? 'Math derivations, code, animations'
        : 'Interactive intuition, drag and explore';

      if (otherLive) {
        el.innerHTML = `<a href="${otherUrl}" class="pt-sib-btn">
          <span class="pt-sib-label">${label}</span>
          <span class="pt-sib-sub">${subline}</span>
        </a>`;
      } else {
        el.innerHTML = `<span class="pt-sib-btn pt-sib-soon" title="Coming soon">
          <span class="pt-sib-label">${label} · Soon</span>
          <span class="pt-sib-sub">${subline}</span>
        </span>`;
      }
    });
  }

  /* ---------- helpers ---------- */
  function hexToBg(hex) {
    const h = hex.replace('#','');
    const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
    return `rgba(${r},${g},${b},0.08)`;
  }
  function truncate(s, n) { return s.length > n ? s.slice(0, n-1) + '…' : s; }

  /* ---------- run on DOM ready ---------- */
  function init() {
    renderChaptersDropdown();
    renderNotebooksDropdown();
    renderCards();
    renderRoadmap();
    renderSiblingButtons();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
