import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "DOM & Virtual DOM",
    front: "What is the DOM?\n\nHow does the Virtual DOM optimize\nrendering?",
    back: "DOM (Document Object Model):\n  Tree representation of HTML.\n  Browser parses HTML -> DOM tree.\n  JS can read/modify DOM nodes.\n  Direct DOM manipulation is slow\n  (triggers layout, paint, composite).\n\nVirtual DOM (React pattern):\n  Lightweight JS object tree\n  representing the UI.\n\n  Process:\n  1. State changes.\n  2. New virtual DOM tree created.\n  3. Diff (reconciliation) with old tree.\n  4. Minimal DOM updates applied (patch).\n\n  Benefits:\n  + Batch updates.\n  + Minimal real DOM touches.\n  + Declarative (describe UI, not steps).\n\n  Cost:\n  - Memory for two trees.\n  - Diffing overhead.\n  - Not always faster than manual DOM.\n\nAlternatives:\n  Svelte: No virtual DOM, compiles to\n  direct DOM updates at build time.\n  Solid.js: Fine-grained reactivity,\n  no virtual DOM, no diffing.\n  Lit: Web Components, direct DOM.\n\nKey insight: Virtual DOM is a tradeoff\nfavoring developer experience over\nraw performance.",
  },
  {
    topic: "CSS Layout Models",
    front: "Compare Flexbox and CSS Grid.\n\nWhen should you use each?",
    back: "Flexbox (one-dimensional):\n  Lay out items in a row OR column.\n  display: flex;\n  justify-content: Align main axis.\n  align-items: Align cross axis.\n  flex-grow/shrink: Item sizing.\n  flex-wrap: Allow wrapping.\n\n  Use for:\n  - Navigation bars.\n  - Centering content.\n  - Card layouts (with wrap).\n  - Equal height columns.\n\nCSS Grid (two-dimensional):\n  Rows AND columns simultaneously.\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-rows: auto 1fr auto;\n  gap: Spacing between cells.\n  grid-area: Named regions.\n\n  Use for:\n  - Page layouts (header, sidebar, main).\n  - Complex dashboard grids.\n  - Photo galleries.\n  - Any 2D layout.\n\nCombine them:\n  Grid for page layout.\n  Flexbox for components within grid cells.\n\nResponsive:\n  Grid: minmax(), auto-fill, auto-fit.\n  Flex: flex-wrap, media queries.\n  Container queries: Size based on parent.",
  },
  {
    topic: "JavaScript Event Loop",
    front:
      "Explain the JavaScript event loop.\n\nWhat are microtasks vs macrotasks?",
    back: "JS is single-threaded with async I/O.\n\nEvent Loop cycle:\n1. Execute call stack (synchronous code).\n2. Run ALL microtasks.\n3. Run ONE macrotask.\n4. Render (if needed).\n5. Go to step 1.\n\nMicrotasks (higher priority):\n  Promise.then / .catch / .finally\n  queueMicrotask()\n  MutationObserver\n  Processed: ALL before next macrotask.\n\nMacrotasks:\n  setTimeout / setInterval\n  setImmediate (Node.js)\n  I/O callbacks\n  requestAnimationFrame (before paint)\n  Processed: ONE per loop iteration.\n\nExample execution order:\n  console.log('1');           // sync\n  setTimeout(() => log('2')); // macro\n  Promise.resolve().then(() => log('3'));\n                              // micro\n  console.log('4');           // sync\n\n  Output: 1, 4, 3, 2\n\nWhy it matters:\n  Long synchronous code blocks the thread.\n  Heavy computation -> Web Workers.\n  requestAnimationFrame for smooth animation.",
  },
  {
    topic: "Web Accessibility (a11y)",
    front:
      "What are the key principles of\nweb accessibility?\n\nWhat ARIA roles should you know?",
    back: "WCAG Principles (POUR):\n  Perceivable: Content available to senses.\n  Operable: UI navigable by all.\n  Understandable: Content is clear.\n  Robust: Works across technologies.\n\nKey practices:\n  Semantic HTML:\n    <button> not <div onclick>.\n    <nav>, <main>, <article>, <aside>.\n    <h1>-<h6> in order (no skipping).\n\n  Images: alt='description' (or alt='' for\n  decorative images).\n\n  Keyboard: Tab, Enter, Escape, arrows.\n  All interactive elements focusable.\n  Visible focus indicator.\n\n  Color: Not sole means of conveying info.\n  4.5:1 contrast ratio (text).\n\nCommon ARIA:\n  role='button' (if not <button>).\n  role='dialog' (modals).\n  role='alert' (live announcements).\n  aria-label='Close menu'.\n  aria-expanded='true/false'.\n  aria-hidden='true' (hide from AT).\n  aria-live='polite' (dynamic content).\n\nRule: No ARIA is better than bad ARIA.\nUse semantic HTML first.",
  },
  {
    topic: "Service Workers & PWAs",
    front: "What are Service Workers?\n\nHow do they enable PWAs?",
    back: "Service Worker:\n  JS running in background thread.\n  Intercepts network requests.\n  Enables offline functionality.\n  Cannot access DOM directly.\n\nLifecycle:\n  1. Register: navigator.serviceWorker.register()\n  2. Install: Cache static assets.\n  3. Activate: Clean old caches.\n  4. Fetch: Intercept requests.\n\nCaching strategies:\n  Cache First: Check cache, fallback to net.\n    Best for: static assets.\n  Network First: Try network, fallback cache.\n    Best for: API calls.\n  Stale While Revalidate:\n    Return cache, update in background.\n    Best for: frequently updated content.\n\nPWA requirements:\n  HTTPS (required for SW).\n  manifest.json (app metadata).\n  Service Worker (offline support).\n  Responsive design.\n\nPWA features:\n  Installable (Add to Home Screen).\n  Offline capable.\n  Push notifications.\n  Background sync.\n\nTools:\n  Workbox (Google): SW library.\n  vite-plugin-pwa: Easy Vite integration.",
  },
  {
    topic: "Web Security Fundamentals",
    front: "What are XSS and CSRF attacks?\n\nHow do you prevent them?",
    back: "XSS (Cross-Site Scripting):\n  Attacker injects JS into your page.\n\n  Stored XSS: Script saved in DB,\n    served to all users.\n  Reflected XSS: Script in URL parameter,\n    reflected in response.\n  DOM XSS: Client-side JS inserts\n    untrusted data into DOM.\n\n  Prevention:\n  - Escape output (HTML entities).\n  - Content Security Policy (CSP) header.\n  - HttpOnly cookies (no JS access).\n  - Use framework auto-escaping (React).\n  - Never innerHTML with user data.\n  - Sanitize with DOMPurify if needed.\n\nCSRF (Cross-Site Request Forgery):\n  Attacker tricks user's browser into\n  making requests to your site (using\n  the user's logged-in cookies).\n\n  Prevention:\n  - CSRF tokens (random per form/session).\n  - SameSite=Lax/Strict cookies.\n  - Check Origin/Referer headers.\n  - Don't use GET for state changes.\n\nOther headers:\n  X-Frame-Options: DENY (clickjacking).\n  Strict-Transport-Security (force HTTPS).\n  X-Content-Type-Options: nosniff.",
  },
  {
    topic: "Module Systems",
    front: "Compare JavaScript module systems:\nCommonJS, ESM, AMD.",
    back: "CommonJS (CJS):\n  Node.js original module system.\n  const fs = require('fs');\n  module.exports = { fn };\n  Synchronous loading.\n  Dynamic (can require in if-blocks).\n  Not tree-shakeable.\n\nES Modules (ESM):\n  import { fn } from './module.js';\n  export const fn = () => {};\n  Static analysis (top-level only).\n  Tree-shakeable (dead code elimination).\n  Async loading (import() for dynamic).\n  Browser native support.\n  Now the standard.\n\nAMD (Asynchronous Module Definition):\n  define(['dep'], function(dep) { ... });\n  RequireJS. Async browser loading.\n  Mostly obsolete (replaced by ESM).\n\nUMD (Universal Module Definition):\n  Works in CJS + AMD + global.\n  Used for library distribution.\n  Being replaced by dual CJS/ESM.\n\nNode.js today:\n  'type': 'module' in package.json -> ESM.\n  .mjs = ESM, .cjs = CommonJS.\n  Can import CJS from ESM.\n  Cannot require ESM from CJS (easily).\n\nBundlers (Webpack, Vite, esbuild):\n  Handle all formats, output optimized code.",
  },
  {
    topic: "Web Components",
    front: "What are Web Components?\n\nWhat are their three main APIs?",
    back: "Web Components: Browser-native component\nmodel. Framework-agnostic, reusable.\n\nThree APIs:\n\n1. Custom Elements:\n   Define new HTML tags.\n   class MyCard extends HTMLElement {\n     connectedCallback() {\n       this.innerHTML = '<h1>Hello</h1>';\n     }\n   }\n   customElements.define('my-card', MyCard);\n   <my-card></my-card>\n\n2. Shadow DOM:\n   Encapsulated DOM subtree.\n   CSS doesn't leak in or out.\n   this.attachShadow({ mode: 'open' });\n   Scoped styles and markup.\n\n3. HTML Templates:\n   <template> and <slot> elements.\n   Template: Not rendered until cloned.\n   Slot: Placeholder for consumer content.\n   <slot name='header'></slot>\n\nAdvantages:\n  + Native browser support (no framework).\n  + True encapsulation (Shadow DOM).\n  + Interoperable with any framework.\n  + Standards-based.\n\nLimitations:\n  - No built-in reactivity.\n  - Verbose without library.\n  - SSR support limited.\n\nLibraries: Lit (Google), Stencil,\nFAST (Microsoft).",
  },
];

export const BROWSER_INTERNALS: DeckInfo = {
  id: "browser-internals",
  title: "Browser Internals & Web Dev",
  description:
    "DOM, Virtual DOM, CSS layout, event loop, accessibility, Service Workers, web security, modules, and Web Components.",
  category: "Web",
  level: "intermediate",
  cards,
  tags: [
    "DOM",
    "CSS",
    "JavaScript",
    "accessibility",
    "PWA",
    "security",
    "modules",
  ],
  estimatedMinutes: 12,
};
