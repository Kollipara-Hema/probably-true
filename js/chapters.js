/* =============================================================
   chapters.js — single source of truth for the entire site.
   Edit this file when you publish a chapter or its notebook.

   Each chapter has TWO statuses:
     status.interactive   — the playful HTML/SVG page at /chapters/<slug>/
     status.notebook      — the math/code Jupyter page at /notebooks/<num>-<slug>.html

   Either can be 'live' or 'soon' independently. So if you ship a
   notebook before the interactive page (or vice versa), the right
   dropdown lights up but the wrong one stays dimmed.

   To publish: change 'soon' → 'live' on the matching field.
   ============================================================= */

window.PT_CHAPTERS = [
  /* ---------- BOOK I — STATISTICS ---------- */
  {
    id: 1, book: 'stats',
    slug: 'probability', num: '01',
    title: 'Probability',
    icon: '🎲',
    color: '#7c3aed',
    description: "What are the chances? Explore randomness, outcomes, and the math of uncertainty through coins, dice, and live animations you can actually play with.",
    tags: ['Chance Events', 'Expectation', 'Independence'],
    status: { interactive: 'live', notebook: 'soon' }
  },
  {
    id: 2, book: 'stats',
    slug: 'compound-probability', num: '02',
    title: 'Compound Probability & Bayes',
    icon: '🔀',
    color: '#06d6a0',
    description: "How do probabilities combine? Visual intuition for overlap, \"at least one,\" reversed conditionals, and Bayes' rule.",
    tags: ['Addition Rule', 'At Least One', 'Bayes\' Rule'],
    status: { interactive: 'live', notebook: 'soon' }
  },
  {
    id: 3, book: 'stats',
    slug: 'sampling-and-design', num: '03',
    title: 'Sampling & Study Design',
    icon: '🎯',
    color: '#f9c74f',
    description: "Random vs stratified sampling, observation vs experiment, confounding, the placebo effect, and the logic of randomized controlled trials.",
    tags: ['Random Sampling', 'Bias', 'RCTs'],
    status: { interactive: 'live', notebook: 'soon' }
  },
  {
    id: 4, book: 'stats',
    slug: 'descriptive-stats', num: '04',
    title: 'Descriptive Statistics & Visualization',
    icon: '📊',
    color: '#f72585',
    description: "Mean, median, percentiles, standard deviation. Histograms, box plots, scatter plots — and the pitfalls of visualizing data badly.",
    tags: ['Mean & Median', 'SD', 'Box Plots'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 5, book: 'stats',
    slug: 'normal-curve', num: '05',
    title: 'The Normal Curve',
    icon: '🔔',
    color: '#4361ee',
    description: "The empirical rule, standardization, the standard normal curve, and why the bell curve is everywhere.",
    tags: ['Empirical Rule', 'Z-scores', 'Standardization'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 6, book: 'stats',
    slug: 'distributions', num: '06',
    title: 'Distributions',
    icon: '📈',
    color: '#74c417',
    description: "Binomial, Poisson, geometric, uniform — understanding how data clusters, when each shape applies, and why.",
    tags: ['Binomial', 'Poisson', 'Random Variables'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 7, book: 'stats',
    slug: 'sampling-distributions-clt', num: '07',
    title: 'Sampling Distributions, LLN & CLT',
    icon: '🧲',
    color: '#7c3aed',
    description: "Parameter vs statistic, expected value and standard error, the square root law, the Law of Large Numbers, and the Central Limit Theorem.",
    tags: ['LLN', 'CLT', 'Standard Error'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 8, book: 'stats',
    slug: 'confidence-intervals-bootstrap', num: '08',
    title: 'Confidence Intervals & the Bootstrap',
    icon: '🎚️',
    color: '#06d6a0',
    description: "What a confidence interval really means, how CLT gives us one, and how the bootstrap gets us one without theory.",
    tags: ['CI', 'Bootstrap', 'Estimation'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 9, book: 'stats',
    slug: 'hypothesis-testing', num: '09',
    title: 'Hypothesis Testing & p-values',
    icon: '⚖️',
    color: '#f72585',
    description: "Test statistics, p-values as evidence, the t-test, two-sample tests, matched pairs — and why statistical significance isn't importance.",
    tags: ['p-values', 'T-test', 'Significance'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 10, book: 'stats',
    slug: 'regression', num: '10',
    title: 'Regression',
    icon: '📉',
    color: '#4361ee',
    description: "Correlation, least squares, regression to the mean, residuals, outliers, and the difference between prediction and explanation.",
    tags: ['Least Squares', 'Correlation', 'Residuals'],
    status: { interactive: 'soon', notebook: 'soon' }
  },

  /* ---------- BOOK II — ADVANCED STATISTICS ---------- */
  {
    id: 11, book: 'advanced',
    slug: 'categorical-chi-square', num: '11',
    title: 'Categorical Data & Chi-Square',
    icon: '🟦',
    color: '#7c3aed',
    description: "Two-way tables, the chi-square test for independence and homogeneity, and how to think about counts instead of means.",
    tags: ['Chi-Square', 'Independence', 'Two-way Tables'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 12, book: 'advanced',
    slug: 'anova', num: '12',
    title: 'ANOVA',
    icon: '🎛️',
    color: '#06d6a0',
    description: "Comparing several means at once, the F distribution, and the geometric idea behind partitioning variance.",
    tags: ['F-test', 'Variance', 'One-way ANOVA'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 13, book: 'advanced',
    slug: 'bayesian-inference', num: '13',
    title: 'Bayesian Inference',
    icon: '🧠',
    color: '#f9c74f',
    description: "Priors, likelihoods, posteriors. Updating beliefs visually as evidence arrives, plus an intuitive intro to MCMC.",
    tags: ['Prior', 'Posterior', 'MCMC'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 14, book: 'advanced',
    slug: 'multiple-testing', num: '14',
    title: 'Multiple Testing & Reproducibility',
    icon: '🚨',
    color: '#f72585',
    description: "Data snooping, the multiple comparisons fallacy, Bonferroni and FDR corrections, and why so many published findings don't replicate.",
    tags: ['p-hacking', 'Bonferroni', 'FDR'],
    status: { interactive: 'soon', notebook: 'soon' }
  },

  /* ---------- BOOK III — MACHINE LEARNING ---------- */
  {
    id: 15, book: 'ml',
    slug: 'ml-foundations', num: '15',
    title: 'Machine Learning Foundations',
    icon: '🤖',
    color: '#4361ee',
    description: "Gradient descent, classification, decision trees, overfitting and regularization — the bridge from statistics to AI.",
    tags: ['Gradient Descent', 'Decision Trees', 'Overfitting'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 16, book: 'ml',
    slug: 'deep-learning', num: '16',
    title: 'Deep Learning',
    icon: '🧬',
    color: '#7c3aed',
    description: "Neural networks, backpropagation, convolution — what's actually happening inside a model that recognizes images.",
    tags: ['Neural Nets', 'Backprop', 'CNNs'],
    status: { interactive: 'soon', notebook: 'soon' }
  },
  {
    id: 17, book: 'ml',
    slug: 'llms', num: '17',
    title: 'Large Language Models',
    icon: '✨',
    color: '#06d6a0',
    description: "Embeddings, attention, transformers — visualizing how language models actually understand and generate text.",
    tags: ['Embeddings', 'Attention', 'Transformers'],
    status: { interactive: 'soon', notebook: 'soon' }
  }
];

window.PT_BOOKS = {
  stats:    { label: 'Book I',  name: 'Statistics',          subtitle: 'The foundations everyone needs' },
  advanced: { label: 'Book II', name: 'Advanced Statistics', subtitle: 'Beyond the basics' },
  ml:       { label: 'Book III', name: 'Machine Learning',   subtitle: 'From stats to AI' }
};

/* ---------- helpers shared by nav.js and chapter pages ---------- */
window.PT_HELPERS = {
  interactiveUrl: (c) => `/chapters/${c.slug}/`,
  notebookUrl:    (c) => `/notebooks/${c.num}-${c.slug}.html`,
  findBySlug:     (slug) => window.PT_CHAPTERS.find(c => c.slug === slug),
};
