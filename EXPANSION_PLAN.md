# Flashcard App Expansion Plan

## Current State Inventory

### Existing Decks (21 decks)

| Deck                       | Category      | Level           | Cards |
| -------------------------- | ------------- | --------------- | ----- |
| Big O — Data Structures    | DSA           | foundation      | ~15   |
| Big O — Algorithms         | DSA           | foundation      | ~15   |
| Big O — Control Structures | DSA           | foundation      | ~15   |
| DSA Practical Uses         | DSA           | intermediate    | ~20   |
| LeetCode Patterns          | DSA           | intermediate    | ~20   |
| LeetCode Problems          | DSA           | intermediate    | ~20   |
| LeetCode Problems Extended | DSA           | intermediate    | ~20   |
| Advanced Data Structures   | DSA           | advanced        | ~15   |
| Advanced Algorithms        | DSA           | advanced        | ~15   |
| System Design              | System Design | advanced        | ~20   |
| System Design Estimation   | System Design | senior-staff    | ~15   |
| Distributed Systems Deep   | System Design | staff-principal | ~20   |
| Concurrency & Parallelism  | Systems       | advanced        | ~15   |
| Database Internals         | Systems       | advanced        | ~15   |
| Networking Fundamentals    | Systems       | intermediate    | ~15   |
| Operating Systems          | Systems       | intermediate    | ~15   |
| OOP Design                 | Software Eng  | intermediate    | ~15   |
| Design Patterns            | Software Eng  | intermediate    | ~15   |
| API Design                 | Software Eng  | advanced        | ~15   |
| Security Fundamentals      | Security      | intermediate    | ~15   |
| Behavioral Interview       | Career        | intermediate    | ~15   |

### Identified Gaps

- **No ML/AI/LLM content** at any level
- **No language-specific content** (Python, JS/TS, Go, Rust, Java, etc.)
- **No cloud/infrastructure** (AWS, Azure, GCP, Kubernetes, Docker)
- **No web fundamentals** (HTTP, REST, GraphQL, browser internals)
- **No math foundations** (discrete math, probability, linear algebra for CS)
- **No compiler/language theory**
- **No testing/quality** content
- **Missing DSA depth**: graph algorithms, dynamic programming patterns, string algorithms

---

## Part 1: New Deck Content Plan

### Phase A — Core DSA Gaps (8 new decks)

| #   | Deck Title                            | Category | Level        | Est. Cards |
| --- | ------------------------------------- | -------- | ------------ | ---------- |
| A1  | Graph Algorithms                      | DSA      | intermediate | 20         |
| A2  | Dynamic Programming Patterns          | DSA      | intermediate | 25         |
| A3  | String Algorithms & Pattern Matching  | DSA      | intermediate | 15         |
| A4  | Greedy Algorithms                     | DSA      | intermediate | 15         |
| A5  | Backtracking & Recursion Patterns     | DSA      | intermediate | 15         |
| A6  | Bit Manipulation                      | DSA      | foundation   | 15         |
| A7  | Math for Coding Interviews            | DSA      | foundation   | 20         |
| A8  | Trees & Binary Search Trees Deep Dive | DSA      | intermediate | 20         |

### Phase B — Machine Learning & AI (10 new decks)

| #   | Deck Title                           | Category | Level        | Est. Cards |
| --- | ------------------------------------ | -------- | ------------ | ---------- |
| B1  | ML Fundamentals                      | ML/AI    | foundation   | 25         |
| B2  | Supervised Learning                  | ML/AI    | intermediate | 20         |
| B3  | Unsupervised Learning & Clustering   | ML/AI    | intermediate | 15         |
| B4  | Neural Networks & Deep Learning      | ML/AI    | intermediate | 25         |
| B5  | Natural Language Processing          | ML/AI    | advanced     | 20         |
| B6  | Large Language Models & Transformers | ML/AI    | advanced     | 25         |
| B7  | Prompt Engineering & LLM Techniques  | ML/AI    | intermediate | 20         |
| B8  | Reinforcement Learning               | ML/AI    | advanced     | 15         |
| B9  | ML System Design & MLOps             | ML/AI    | senior-staff | 20         |
| B10 | AI Ethics & Safety                   | ML/AI    | foundation   | 15         |

**Key topics for B6 (LLMs & Transformers):**

- Attention mechanism / self-attention
- Transformer architecture (encoder/decoder)
- Tokenization (BPE, SentencePiece, WordPiece)
- Fine-tuning vs. pre-training vs. RLHF
- Context windows, KV cache
- Quantization (GPTQ, GGUF, AWQ)
- RAG (Retrieval-Augmented Generation)
- Mixture of Experts (MoE)
- Chain-of-Thought, Tree-of-Thought prompting
- Embeddings and vector similarity
- LoRA / QLoRA
- Hallucination, grounding, guardrails
- Agent architectures (ReAct, tool use)
- Multimodal models (vision + language)

**Key topics for B7 (Prompt Engineering):**

- System / user / assistant roles
- Few-shot, zero-shot, one-shot prompting
- Chain-of-thought prompting
- Structured output (JSON mode)
- Temperature, top-p, top-k
- Token limits and context management
- Prompt injection and defenses
- Evaluation metrics (BLEU, ROUGE, perplexity)
- Function calling / tool use patterns
- Retrieval patterns for grounding

### Phase C — Cloud, DevOps & Infrastructure (6 new decks)

| #   | Deck Title                  | Category | Level        | Est. Cards |
| --- | --------------------------- | -------- | ------------ | ---------- |
| C1  | Docker & Containers         | DevOps   | foundation   | 20         |
| C2  | Kubernetes Fundamentals     | DevOps   | intermediate | 20         |
| C3  | CI/CD & DevOps Practices    | DevOps   | intermediate | 15         |
| C4  | Cloud Architecture Patterns | Cloud    | advanced     | 20         |
| C5  | Infrastructure as Code      | DevOps   | intermediate | 15         |
| C6  | Observability & Monitoring  | DevOps   | intermediate | 15         |

### Phase D — Web & Software Engineering (6 new decks)

| #   | Deck Title                      | Category     | Level        | Est. Cards |
| --- | ------------------------------- | ------------ | ------------ | ---------- |
| D1  | HTTP, REST & Web Protocols      | Web          | foundation   | 20         |
| D2  | GraphQL & API Patterns          | Web          | intermediate | 15         |
| D3  | Browser Internals & Performance | Web          | advanced     | 15         |
| D4  | Testing Strategies & TDD        | Software Eng | intermediate | 15         |
| D5  | Refactoring & Code Quality      | Software Eng | intermediate | 15         |
| D6  | Git & Version Control           | Software Eng | foundation   | 15         |

### Phase E — Computer Science Theory (5 new decks)

| #   | Deck Title                        | Category  | Level        | Est. Cards |
| --- | --------------------------------- | --------- | ------------ | ---------- |
| E1  | Discrete Math for CS              | CS Theory | foundation   | 20         |
| E2  | Probability & Statistics for ML   | CS Theory | intermediate | 20         |
| E3  | Linear Algebra for ML             | CS Theory | intermediate | 15         |
| E4  | Compiler Design & Language Theory | CS Theory | advanced     | 15         |
| E5  | Information Theory & Cryptography | CS Theory | advanced     | 15         |

### Phase F — Language & Framework Specific (6 new decks)

| #   | Deck Title                               | Category      | Level        | Est. Cards |
| --- | ---------------------------------------- | ------------- | ------------ | ---------- |
| F1  | Python Essentials & Gotchas              | Languages     | foundation   | 20         |
| F2  | JavaScript/TypeScript Deep Dive          | Languages     | intermediate | 20         |
| F3  | SQL Mastery                              | Languages     | intermediate | 20         |
| F4  | Go Fundamentals                          | Languages     | foundation   | 15         |
| F5  | Rust Ownership & Memory                  | Languages     | intermediate | 15         |
| F6  | System Design in Practice (Case Studies) | System Design | senior-staff | 20         |

### Summary: Content Expansion

| Phase             | Decks  | Cards (est.) | Priority |
| ----------------- | ------ | ------------ | -------- |
| A — Core DSA Gaps | 8      | ~145         | High     |
| B — ML/AI/LLM     | 10     | ~200         | High     |
| C — Cloud/DevOps  | 6      | ~105         | Medium   |
| D — Web/SWE       | 6      | ~95          | Medium   |
| E — CS Theory     | 5      | ~85          | Medium   |
| F — Languages     | 6      | ~110         | Lower    |
| **Total New**     | **41** | **~740**     |          |
| **Existing**      | **21** | **~350**     |          |
| **Grand Total**   | **62** | **~1,090**   |          |

---

## Part 2: Deck Browser & Navigation UX

### Problem Statement

The current UI embeds the deck library as a scrollable grid inside the main PDF-generator page. With 62+ decks, this becomes:

- Overwhelming to scan
- No way to search/filter
- No concept of "collections" or tags
- No shareable links

### Design: Full-Screen Deck Browser

#### 2A. Deck Browser Overlay

A **full-screen modal/overlay** (like the player overlay) triggered from a prominent "Browse Decks" button in the header. This becomes the primary entry point for studying.

```
┌──────────────────────────────────────────────────────────┐
│  [X] Close     🔍 Search...        [Filter ▾] [Sort ▾]  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Categories (icon pills, horizontally scrollable):       │
│  [🧮 DSA] [🤖 ML/AI] [☁️ Cloud] [🌐 Web] [🔧 DevOps]   │
│  [🏗️ System Design] [📐 CS Theory] [💻 Languages]       │
│  [🛡️ Security] [💼 Career] [📦 Software Eng]            │
│                                                          │
│  Level Tabs:                                             │
│  [All] [Foundation] [Intermediate] [Advanced] [Senior+]  │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ 🧮       │ │ 🤖       │ │ 🧮       │ │ ☁️       │   │
│  │ Graph    │ │ LLMs &   │ │ DP       │ │ Docker   │   │
│  │ Algos    │ │ Transf.  │ │ Patterns │ │ Basics   │   │
│  │          │ │          │ │          │ │          │   │
│  │ 20 cards │ │ 25 cards │ │ 25 cards │ │ 20 cards │   │
│  │ Inter.   │ │ Advanced │ │ Inter.   │ │ Found.   │   │
│  │          │ │          │ │          │ │          │   │
│  │ [▶ Play] │ │ [▶ Play] │ │ [▶ Play] │ │ [▶ Play] │   │
│  │ [📄 PDF] │ │ [📄 PDF] │ │ [📄 PDF] │ │ [📄 PDF] │   │
│  │ [🔗Share]│ │ [🔗Share]│ │ [🔗Share]│ │ [🔗Share]│   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                          │
│  ... (virtual scroll for many decks)                     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  62 decks · 1,090 cards · [📥 Load All for PDF]         │
└──────────────────────────────────────────────────────────┘
```

#### 2B. Deck Card Design (in browser)

Each deck card is a compact tile showing:

- **Category icon** (emoji or SVG — see icon map below)
- **Title** (bold, 1-2 lines max)
- **Card count** badge
- **Level** badge (colored pill: green/blue/purple/orange/red)
- **Progress indicator** (if user has played: ring showing % mastered)
- **Quick actions row**:
  - **Play** — launches player overlay
  - **PDF** — loads into PDF generator view
  - **Share** — copies share link (see Part 3)

#### 2C. Category Icon Map

```typescript
const CATEGORY_ICONS: Record<string, string> = {
  DSA: "puzzle", // 🧩
  "ML/AI": "brain", // 🧠
  Cloud: "cloud", // ☁️
  DevOps: "wrench", // 🔧
  Web: "globe", // 🌐
  "System Design": "building", // 🏗️
  "CS Theory": "calculator", // 📐
  Languages: "code", // 💻
  Security: "shield", // 🛡️
  Career: "briefcase", // 💼
  "Software Eng": "layers", // 📦
  Systems: "cpu", // ⚙️
};
```

Use **inline SVG icons** (not emoji) for reliable rendering. Source from Heroicons or Lucide icon set (both MIT licensed, already lightweight).

#### 2D. Search & Filter

**Search** (top bar):

- Fuzzy matches against deck `title`, `description`, `category`, and card `topic` fields
- Instant filtering as you type (debounce 150ms)
- Highlights matching text in results

**Filter dropdown** (multi-select):

- By category (checkboxes)
- By level (checkboxes)
- By card count range ("< 15", "15-25", "> 25")
- "Has progress" / "Not started" (if user has played before)

**Sort dropdown**:

- Alphabetical (A-Z / Z-A)
- Card count (most / fewest)
- Level (easiest first / hardest first)
- Recently played (from localStorage)
- Least mastered (from spaced repetition data)

#### 2E. Responsive Layout

- **Desktop (>1024px)**: 4-column grid
- **Tablet (768-1024px)**: 3-column grid
- **Mobile (<768px)**: 2-column grid, cards become more compact
- **Small mobile (<480px)**: 1-column list view

#### 2F. Quick-Launch Widget (Header)

Replace the current "Browse Decks" section in the main page with a compact **quick-launch bar** in the header:

```
┌────────────────────────────────────────────────┐
│ [📚 Browse 62 Decks]  [🎯 Continue: LLMs 60%] │
└────────────────────────────────────────────────┘
```

- **Browse button**: Opens the full deck browser overlay
- **Continue button**: Shows only if the user has an in-progress deck (from localStorage). One click resumes the player.

---

## Part 3: Share Links for Decks

### 3A. URL Scheme

Since this is a client-side SPA with no backend, share links encode the deck ID in the URL hash:

```
https://yoursite.com/#/play/big-o-algorithms
https://yoursite.com/#/browse/ml-ai
https://yoursite.com/#/deck/llms-transformers
```

**Route patterns:**
| Route | Action |
|---|---|
| `#/play/{deckId}` | Opens player overlay immediately for the deck |
| `#/deck/{deckId}` | Opens deck browser with that deck's detail expanded |
| `#/browse` | Opens the deck browser overlay |
| `#/browse/{category}` | Opens browser filtered to a category |
| (no hash) | Default: PDF generator view |

### 3B. Simple Hash Router

Implement a lightweight hash-based router in `main.ts`:

```typescript
// src/router.ts
interface Route {
  pattern: RegExp;
  handler: (params: Record<string, string>) => void;
}

function initRouter(): void {
  const routes: Route[] = [
    { pattern: /^\/play\/(.+)$/, handler: ({ id }) => autoPlayDeck(id) },
    { pattern: /^\/deck\/(.+)$/, handler: ({ id }) => showDeckDetail(id) },
    { pattern: /^\/browse\/?(.*)$/, handler: ({ cat }) => openBrowser(cat) },
  ];

  window.addEventListener("hashchange", () => matchRoute(routes));
  matchRoute(routes); // Handle initial load
}
```

### 3C. Share Button Behavior

When user clicks "Share" on a deck card:

1. Construct share URL: `${window.location.origin}${window.location.pathname}#/play/${deck.id}`
2. **Try Web Share API** (mobile-first):
   ```typescript
   if (navigator.share) {
     navigator.share({
       title: `Study: ${deck.title}`,
       text: `${deck.cards.length} flashcards on ${deck.title}`,
       url: shareUrl,
     });
   }
   ```
3. **Fallback**: Copy to clipboard + toast notification "Link copied!"
4. Optional: Generate a QR code inline (tiny library like `qr-creator`, ~3KB)

### 3D. Deep Link Auto-Play Flow

When someone opens `#/play/llms-transformers`:

1. Router matches `/play/{id}`
2. Look up deck by `id` in `DECK_LIBRARY`
3. If found → immediately call `startPlayer(deck)` (no browser/PDF view shown)
4. If not found → show toast "Deck not found" + redirect to `#/browse`
5. When player closes → navigate to `#/browse`

This means **share links are instant play links** — one tap and you're studying.

---

## Part 4: DeckInfo Type Extensions

### 4A. Extended Metadata

Add new optional fields to `DeckInfo` for richer browser experience:

```typescript
interface DeckInfo {
  id: string;
  title: string;
  description: string;
  level: DeckLevel;
  category: string;
  cards: Flashcard[];

  // New fields:
  icon?: string; // Lucide icon name for the deck
  tags?: string[]; // Searchable tags: ["sorting", "comparison", "in-place"]
  estimatedMinutes?: number; // Avg study time estimate
  prerequisites?: string[]; // Deck IDs that should be studied first
  version?: number; // For future deck updates
}
```

### 4B. New Categories

Extend the category system:

```typescript
type DeckCategory =
  | "DSA"
  | "ML/AI"
  | "Cloud"
  | "DevOps"
  | "Web"
  | "System Design"
  | "CS Theory"
  | "Languages"
  | "Security"
  | "Career"
  | "Software Eng"
  | "Systems";
```

---

## Part 5: Implementation Order & Architecture

### File Structure Changes

```
src/
  decks/
    index.ts                      (updated: register all new decks)
    types.ts                      (updated: extended DeckInfo)

    # Existing decks unchanged
    big-o-algorithms.ts
    ...

    # Phase A — DSA gaps
    graph-algorithms.ts
    dynamic-programming.ts
    string-algorithms.ts
    greedy-algorithms.ts
    backtracking-recursion.ts
    bit-manipulation.ts
    math-for-interviews.ts
    trees-bst-deep.ts

    # Phase B — ML/AI
    ml-fundamentals.ts
    supervised-learning.ts
    unsupervised-learning.ts
    neural-networks.ts
    nlp-fundamentals.ts
    llms-transformers.ts
    prompt-engineering.ts
    reinforcement-learning.ts
    ml-system-design.ts
    ai-ethics-safety.ts

    # Phase C — Cloud/DevOps
    docker-containers.ts
    kubernetes-fundamentals.ts
    cicd-devops.ts
    cloud-architecture.ts
    infrastructure-as-code.ts
    observability-monitoring.ts

    # Phase D — Web/SWE
    http-rest-web.ts
    graphql-api-patterns.ts
    browser-internals.ts
    testing-strategies.ts
    refactoring-code-quality.ts
    git-version-control.ts

    # Phase E — CS Theory
    discrete-math.ts
    probability-statistics.ts
    linear-algebra-ml.ts
    compiler-design.ts
    information-theory-crypto.ts

    # Phase F — Languages
    python-essentials.ts
    javascript-typescript.ts
    sql-mastery.ts
    go-fundamentals.ts
    rust-ownership.ts
    system-design-cases.ts

  browser/
    deck-browser.ts           # Browser overlay logic
    deck-browser-ui.ts        # DOM rendering for browser
    deck-search.ts            # Search & filter engine
    deck-share.ts             # Share link generation, QR
    browser.css               # Browser-specific styles

  router.ts                   # Hash-based SPA router
```

### Implementation Sprints

#### Sprint 1: Infrastructure & Architecture (1-2 days)

1. Extend `DeckInfo` type with new fields (`tags`, `icon`, `estimatedMinutes`, `prerequisites`)
2. Add new `DeckCategory` type
3. Create `src/router.ts` — hash-based router
4. Wire router into `main.ts` `init()`
5. Create `src/browser/` directory structure
6. Build empty deck browser overlay shell

#### Sprint 2: Deck Browser MVP (2-3 days)

1. Build `deck-browser-ui.ts` — full overlay with grid layout
2. Implement category filter pills
3. Implement level tab filters
4. Add search with fuzzy matching (no external deps — simple substring + word boundary matching)
5. Responsive grid (CSS grid with media queries)
6. Wire Play / PDF / Share actions from browser cards

#### Sprint 3: Share Links (1 day)

1. Implement share URL generation (`#/play/{id}`, `#/deck/{id}`, `#/browse`)
2. Web Share API + clipboard fallback
3. Deep link auto-play on page load
4. Toast notification system for "Link copied" feedback
5. QR code generation (optional, evaluate bundle size tradeoff)

#### Sprint 4: Content — DSA Gaps (Phase A) (2-3 days)

1. Create all 8 Phase A deck files
2. Register in `decks/index.ts`
3. Add tags and icons
4. Type check + build verify
5. Test in browser and player

#### Sprint 5: Content — ML/AI (Phase B) (3-4 days)

1. Create all 10 Phase B deck files
2. Focus on accuracy — these are highly technical and evolving topics
3. Ensure WinAnsi-safe content (no special Unicode)
4. Register, tag, verify

#### Sprint 6: Content — Cloud, Web, CS Theory, Languages (Phases C-F) (4-5 days)

1. Create remaining 23 deck files in priority order
2. Register and verify each
3. Cross-reference prerequisites between decks

#### Sprint 7: Polish & Enhancement (2-3 days)

1. Progress indicators in browser (from localStorage spaced repetition data)
2. "Continue where you left off" quick-launch widget
3. Sort by "least mastered" and "recently played"
4. Deck detail view (expandable card showing sample questions, prereqs, progress)
5. Mobile gesture optimization for browser (swipe between categories)
6. Performance: lazy-load deck card arrays (dynamic imports) if bundle gets too large

---

## Part 6: Bundle Size Strategy

With 62 decks and ~1,090 cards, the deck data alone could be 300-500KB of TypeScript source. Strategies:

### Option A: Static Imports (Current Approach, Simplest)

- All decks imported at build time
- Vite tree-shakes unused exports
- Works fine up to ~100 decks / ~2,000 cards
- **Recommendation: Use this for now.** Flashcard text compresses extremely well with gzip (~85% reduction).

### Option B: Dynamic Imports (If Needed Later)

```typescript
// Lazy-load deck content only when needed
const deckModules: Record<string, () => Promise<{ default: DeckInfo }>> = {
  "graph-algorithms": () => import("./decks/graph-algorithms"),
  "llms-transformers": () => import("./decks/llms-transformers"),
  // ...
};

// In browser, only metadata is loaded eagerly. Card arrays are lazy.
```

### Option C: External JSON (Future)

- Serve deck content as JSON files from `/public/decks/`
- Fetch on demand
- Enables community-contributed decks without rebuilds
- More complex, defer to a future phase

**Recommended path**: Start with Option A. Monitor bundle size. Switch to Option B if total JS exceeds 1MB gzipped.

---

## Part 7: Quick-Reference Implementation Checklist

### Must Have (MVP)

- [ ] Extended `DeckInfo` type
- [ ] Hash router with `/play/{id}`, `/browse`, `/deck/{id}` routes
- [ ] Full-screen deck browser overlay with category + level filters
- [ ] Search bar with instant filtering
- [ ] Share link generation (clipboard copy)
- [ ] Deep link auto-play
- [ ] 8 new DSA decks (Phase A)
- [ ] 10 new ML/AI decks (Phase B)
- [ ] Toast notification system

### Should Have

- [ ] 23 additional decks (Phases C-F)
- [ ] Progress indicators in browser (% mastered)
- [ ] "Continue studying" quick-launch in header
- [ ] Sort options (alpha, card count, level, recently played)
- [ ] Responsive mobile layout for browser
- [ ] Web Share API (mobile share sheet)

### Nice to Have

- [ ] QR code for share links
- [ ] Deck detail/preview view (sample cards)
- [ ] Prerequisites graph (suggested study order)
- [ ] Dynamic imports for large deck library
- [ ] Animated category transitions
- [ ] Deck favoriting / "My Study Plan" lists

---

## Appendix A: Sample Deck Skeleton

```typescript
// src/decks/llms-transformers.ts
import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Transformer Architecture",
    front:
      "What are the two main components\nof the original Transformer\narchitecture (Vaswani et al., 2017)?",
    back: "Encoder and Decoder\n\nEncoder: processes input sequence\n  in parallel using self-attention\nDecoder: generates output tokens\n  auto-regressively using masked\n  self-attention + cross-attention\n\nKey innovation: replaced recurrence\nwith multi-head self-attention.",
  },
  {
    topic: "Self-Attention",
    front: "Explain the self-attention mechanism.\n\nWhat are Q, K, and V?",
    back: "Q (Query), K (Key), V (Value)\n\nAttention(Q,K,V) =\n  softmax(Q * K^T / sqrt(d_k)) * V\n\nEach token generates Q, K, V vectors.\nQ*K^T computes pairwise similarity.\nDivide by sqrt(d_k) for stability.\nSoftmax gives attention weights.\nWeighted sum of V = output.\n\nAllows each token to attend to\nall other tokens in the sequence.",
  },
  // ... 23 more cards
];

export const LLMS_TRANSFORMERS: DeckInfo = {
  id: "llms-transformers",
  title: "Large Language Models & Transformers",
  description:
    "Transformer architecture, attention mechanisms, tokenization, fine-tuning, RLHF, RAG, quantization, and modern LLM techniques.",
  level: "advanced",
  category: "ML/AI",
  cards,
  // New optional fields:
  tags: [
    "transformers",
    "attention",
    "GPT",
    "BERT",
    "fine-tuning",
    "RLHF",
    "RAG",
    "tokenization",
  ],
  icon: "brain",
  estimatedMinutes: 30,
  prerequisites: ["neural-networks", "nlp-fundamentals"],
};
```

---

## Appendix B: Router Integration Points

```
main.ts init()
  |
  +-- initRouter()
  |     |
  |     +-- #/play/{id}  --> find deck --> startPlayer(deck)
  |     +-- #/browse      --> openDeckBrowser()
  |     +-- #/browse/{cat} --> openDeckBrowser(category)
  |     +-- #/deck/{id}   --> openDeckBrowser() + scrollToDeck(id)
  |     +-- (default)     --> show main PDF generator view
  |
  +-- renderDeckLibrary()  (still exists, but simplified — shows top 6 + "Browse All" button)
```

On player close: `window.location.hash = "#/browse"`  
On browser close: `window.location.hash = ""`

Browser back/forward navigation works naturally with hashchange events.

---

## Appendix C: Estimated Timeline

| Sprint    | Duration        | What                                   |
| --------- | --------------- | -------------------------------------- |
| Sprint 1  | 1-2 days        | Router, type extensions, browser shell |
| Sprint 2  | 2-3 days        | Deck browser UI, filters, search       |
| Sprint 3  | 1 day           | Share links, deep linking, toasts      |
| Sprint 4  | 2-3 days        | 8 DSA decks (Phase A)                  |
| Sprint 5  | 3-4 days        | 10 ML/AI decks (Phase B)               |
| Sprint 6  | 4-5 days        | 23 remaining decks (Phases C-F)        |
| Sprint 7  | 2-3 days        | Polish, progress, mobile               |
| **Total** | **~15-21 days** | **62 decks, browser, sharing**         |

Priority order if time-constrained: Sprint 1 → 2 → 3 → 5 (ML/AI) → 4 (DSA) → 6 → 7
