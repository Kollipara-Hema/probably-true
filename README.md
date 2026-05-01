# Probably True 🎲

> **Statistics, Visually** — Interactive visual explanations of statistics, machine learning, and AI for everyone.

![Probably True](assets/images/preview.png)

## 🌐 Live Site

[probably-true.vercel.app](https://probably-true.vercel.app)

## 📖 About

Probably True makes statistics accessible through interactive D3-style visualizations. Inspired by [Seeing Theory](https://seeing-theory.brown.edu/) and [ML Visualized](https://ml-visualized.com), but with our own unique style — colorful, playful, and built for students, professionals, and curious minds of all ages.

The site has **two surfaces** that link to each other:

| Surface | Path | Built with | For |
|---|---|---|---|
| **Interactive chapters** | `/chapters/<slug>/` | Hand-written HTML + SVG + JS | Building intuition. Drag, click, see. |
| **Notebooks** | `/notebooks/...` | Jupyter Book (`.ipynb` → HTML) | Math derivations, code, animations |

A reader can use either surface alone, or click between them.

## 🗂️ Project Structure

```
.
├── index.html                          # Homepage
├── js/
│   ├── main.js                         ← Shared utility helpers
│   ├── chapters.js                     # ⭐ Source of truth for all 17 chapters
│   ├── nav.js                          # Renders dropdowns / cards / roadmap / sibling button
│   └── audio.js                        # Optional sound helper for future chapters
│
├── assets/                             # YOUR existing assets folder (untouched)
│   ├── coin-flip.mp3                   # Real coin sound (used by audio.js)
│   └── images/
│       ├── logo-mark.svg               # 400×400 nav logo (also inlined in pages)
│       ├── logo.svg                    # 900×500 banner (for OpenGraph etc)
│       └── ...
│
├── chapters/                           # Interactive HTML chapters
│   ├── probability/index.html          # ✅ Built (Ch 1)
│   ├── compound-probability/index.html # ✅ Built (Ch 2)
│   ├── sampling-and-design/index.html  # 🚧 Placeholder (Ch 3)
│   └── ...
│
├── notebooks/                          # Jupyter notebook source
│   ├── 01-probability.ipynb            # 🚧 Stub
│   ├── 02-compound-probability.ipynb   # 🚧 Stub
│   └── ...
│
├── _config.yml                         # Jupyter Book config
├── _toc.yml                            # Jupyter Book TOC
├── intro.md                            # Notebook surface landing page
├── requirements.txt                    # Python deps for building notebooks
│
└── Archive/                            ← Old / orphaned files kept for reference

```
## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| HTML5 | Page structure |
| CSS3 | Styling, animations |
| JavaScript (ES6) | Interactivity, physics |
| [D3.js v7](https://d3js.org/) | Data visualizations |
| [Jupyter Book](https://jupyterbook.org/) | Builds the notebook surface |
| matplotlib + celluloid | Animations inside notebooks |
| [Google Fonts](https://fonts.google.com/) | Nunito + DM Mono |
| Vercel | Hosting (interactive site) |
| GitHub Actions | Auto-builds notebooks on push |


## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Kollipara-Hema/probably-true.git
cd probably-true
```

### 2. Open locally

```bash
# Option A — just open in browser
open index.html

# Option B — use VS Code Live Server (recommended)
# Install "Live Server" extension in VS Code
# Right-click index.html → "Open with Live Server"
```

### 3. Make changes

- **Edit text or visuals** → open any `.html` file in `chapters/<slug>/`
- **Change colors** → edit the `:root` block at the top of any chapter's `<style>` (or in `Archive/css/style.css` if you want a starting reference)
- **Add or update a chapter** → edit `js/chapters.js` (single source of truth — see workflow below)
- **Build a notebook** → edit `notebooks/<num>-<slug>.ipynb` in Jupyter Lab or VS Code

### 4. Publish a chapter

`js/chapters.js` is the source of truth. Each chapter has *two* status fields:

```js
status: { interactive: 'soon', notebook: 'soon' }
```

When you ship the **interactive page**, change `interactive: 'soon'` → `'live'`.
When you ship the **notebook**, change `notebook: 'soon'` → `'live'`.

That single edit updates every page on the site — both dropdowns, homepage cards, roadmap strip, and the contextual sibling button.

### 5. Deploy

```bash
git add .
git commit -m "your message"
git push
```

Vercel auto-deploys the interactive site in ~60 seconds. The GitHub Action takes 1–3 minutes to rebuild the notebook surface.

## 🎨 Brand Colors

| Name | Hex | Used For |
|------|-----|---------|
| Purple | `#7c3aed` | Primary, logo, headings |
| Yellow | `#f9c74f` | Accents, highlights |
| Teal | `#06d6a0` | Secondary CTA |
| Pink | `#f72585` | Chapter accents |
| Blue | `#4361ee` | Links |
| Lime | `#74c417` | Accent |

Available in JS as `BRAND_COLORS` and `COLOR_ARRAY` (see `js/main.js`).

## 📚 Chapters Roadmap

**Book I — Statistics**
- [x] Ch 1 · Probability
- [x] Ch 2 · Compound Probability & Bayes
- [ ] Ch 3 · Sampling & Study Design
- [ ] Ch 4 · Descriptive Statistics
- [ ] Ch 5 · The Normal Curve
- [ ] Ch 6 · Distributions
- [ ] Ch 7 · Sampling Distributions, LLN & CLT
- [ ] Ch 8 · Confidence Intervals & the Bootstrap
- [ ] Ch 9 · Hypothesis Testing & p-values
- [ ] Ch 10 · Regression

**Book II — Advanced Statistics**
- [ ] Ch 11 · Categorical Data & Chi-Square
- [ ] Ch 12 · ANOVA
- [ ] Ch 13 · Bayesian Inference
- [ ] Ch 14 · Multiple Testing & Reproducibility

**Book III — Machine Learning**
- [ ] Ch 15 · Machine Learning Foundations
- [ ] Ch 16 · Deep Learning
- [ ] Ch 17 · Large Language Models

## 🤝 Contributing

This is an open educational project. PRs welcome!

---

Made with curiosity & D3.js 🎲
```