// ─── Full-screen Deck Browser overlay ────────────────────────────────────────

import { DECK_LIBRARY, getTotalCardCount } from "../decks/index";
import { LEVEL_LABELS, CATEGORY_ORDER } from "../decks/types";
import type { DeckInfo, DeckLevel } from "../decks/types";
import { filterDecks, getCategories, createDefaultFilter } from "./deck-search";
import type { FilterState, SortOption } from "./deck-search";
import { getCategoryIcon, getIcon } from "./icons";
import { shareDeck } from "./deck-share";
import { navigateTo } from "../router";

// ─── Callbacks ───────────────────────────────────────────────────────────────

interface BrowserCallbacks {
  onPlayDeck: (deck: DeckInfo) => void;
  onLoadDeckForPdf: (deck: DeckInfo) => void;
}

let callbacks: BrowserCallbacks | null = null;
let overlayEl: HTMLElement | null = null;
let filter: FilterState = createDefaultFilter();
let debounceTimer: number | null = null;

// ─── Public API ──────────────────────────────────────────────────────────────

export function openDeckBrowser(
  cbs: BrowserCallbacks,
  initialCategory?: string,
): void {
  callbacks = cbs;
  filter = createDefaultFilter();
  if (initialCategory) {
    filter.categories.add(initialCategory);
  }
  render();
}

export function closeDeckBrowser(): void {
  if (overlayEl) {
    overlayEl.classList.add("browser-overlay--exit");
    setTimeout(() => {
      overlayEl?.remove();
      overlayEl = null;
    }, 250);
  }
  callbacks = null;
}

export function isDeckBrowserOpen(): boolean {
  return overlayEl !== null;
}

// ─── Rendering ───────────────────────────────────────────────────────────────

function render(): void {
  // Remove existing
  overlayEl?.remove();

  const overlay = document.createElement("div");
  overlay.id = "deck-browser-overlay";
  overlay.className = "browser-overlay";
  document.body.appendChild(overlay);
  overlayEl = overlay;

  const filteredDecks = filterDecks(DECK_LIBRARY, filter);
  const allCategories = getCategories(DECK_LIBRARY);
  // Prefer our defined order, add any extras at the end
  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => allCategories.includes(c)),
    ...allCategories.filter((c) => !CATEGORY_ORDER.includes(c)),
  ];
  const totalCards = getTotalCardCount();

  overlay.innerHTML = `
    <div class="browser-container">
      <!-- Header -->
      <div class="browser-header">
        <div class="browser-header__left">
          <h2 class="browser-header__title">Deck Library</h2>
          <span class="browser-header__badge">${DECK_LIBRARY.length} decks &middot; ${totalCards} cards</span>
        </div>
        <div class="browser-header__right">
          <div class="browser-search">
            ${getIcon("search")}
            <input type="text" class="browser-search__input" placeholder="Search decks..." value="${escAttr(filter.search)}" />
          </div>
          <button class="browser-close-btn" title="Close (Esc)">
            ${getIcon("close")}
          </button>
        </div>
      </div>

      <!-- Category pills -->
      <div class="browser-categories">
        <button class="browser-cat-pill ${filter.categories.size === 0 ? "browser-cat-pill--active" : ""}" data-category="all">
          All
        </button>
        ${orderedCategories
          .map(
            (cat) => `
          <button class="browser-cat-pill ${filter.categories.has(cat) ? "browser-cat-pill--active" : ""}" data-category="${escAttr(cat)}">
            <span class="browser-cat-pill__icon">${getCategoryIcon(cat)}</span>
            ${escHtml(cat)}
          </button>
        `,
          )
          .join("")}
      </div>

      <!-- Level tabs + sort -->
      <div class="browser-filters">
        <div class="browser-level-tabs">
          <button class="browser-level-tab ${filter.levels.size === 0 ? "browser-level-tab--active" : ""}" data-level="all">All Levels</button>
          ${(
            [
              "foundation",
              "intermediate",
              "advanced",
              "senior-staff",
              "staff-principal",
            ] as DeckLevel[]
          )
            .map(
              (lvl) => `
            <button class="browser-level-tab ${filter.levels.has(lvl) ? "browser-level-tab--active" : ""}" data-level="${lvl}">
              ${LEVEL_LABELS[lvl]}
            </button>
          `,
            )
            .join("")}
        </div>
        <div class="browser-sort">
          ${getIcon("sort")}
          <select class="browser-sort__select">
            <option value="level-easy" ${filter.sortBy === "level-easy" ? "selected" : ""}>Easiest First</option>
            <option value="level-hard" ${filter.sortBy === "level-hard" ? "selected" : ""}>Hardest First</option>
            <option value="alpha-asc" ${filter.sortBy === "alpha-asc" ? "selected" : ""}>A-Z</option>
            <option value="alpha-desc" ${filter.sortBy === "alpha-desc" ? "selected" : ""}>Z-A</option>
            <option value="cards-most" ${filter.sortBy === "cards-most" ? "selected" : ""}>Most Cards</option>
            <option value="cards-fewest" ${filter.sortBy === "cards-fewest" ? "selected" : ""}>Fewest Cards</option>
          </select>
        </div>
      </div>

      <!-- Results count -->
      <div class="browser-results-count">
        ${filteredDecks.length === DECK_LIBRARY.length ? `Showing all ${filteredDecks.length} decks` : `${filteredDecks.length} of ${DECK_LIBRARY.length} decks`}
        ${filteredDecks.length === 0 ? ` &mdash; <button class="browser-clear-filters">clear filters</button>` : ""}
      </div>

      <!-- Deck grid -->
      <div class="browser-grid">
        ${filteredDecks.map((deck) => renderDeckCard(deck)).join("")}
      </div>

      ${
        filteredDecks.length === 0
          ? `
        <div class="browser-empty">
          <div class="browser-empty__icon">${getIcon("search")}</div>
          <h3>No decks found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      `
          : ""
      }
    </div>
  `;

  bindBrowserEvents(overlay);
}

function renderDeckCard(deck: DeckInfo): string {
  const levelClass = `level-badge--${deck.level}`;
  const est = deck.estimatedMinutes
    ? `~${deck.estimatedMinutes}min`
    : `~${Math.max(5, Math.round(deck.cards.length * 1.5))}min`;

  return `
    <div class="browser-deck-card" data-deck-id="${escAttr(deck.id)}">
      <div class="browser-deck-card__header">
        <span class="browser-deck-card__icon">${getCategoryIcon(deck.category)}</span>
        <span class="browser-deck-card__count">${deck.cards.length} cards</span>
      </div>
      <h3 class="browser-deck-card__title">${escHtml(deck.title)}</h3>
      <div class="browser-deck-card__meta">
        <span class="level-badge ${levelClass}">${LEVEL_LABELS[deck.level]}</span>
        <span class="browser-deck-card__est">${est}</span>
      </div>
      <p class="browser-deck-card__desc">${escHtml(deck.description)}</p>
      ${
        deck.tags && deck.tags.length > 0
          ? `
        <div class="browser-deck-card__tags">
          ${deck.tags
            .slice(0, 4)
            .map((t) => `<span class="browser-tag">${escHtml(t)}</span>`)
            .join("")}
        </div>
      `
          : ""
      }
      <div class="browser-deck-card__actions">
        <button class="browser-action-btn browser-action-btn--play" data-action="play" data-deck-id="${escAttr(deck.id)}" title="Play this deck">
          ${getIcon("play")} Play
        </button>
        <button class="browser-action-btn browser-action-btn--pdf" data-action="pdf" data-deck-id="${escAttr(deck.id)}" title="Load for PDF">
          ${getIcon("pdf")} PDF
        </button>
        <button class="browser-action-btn browser-action-btn--share" data-action="share" data-deck-id="${escAttr(deck.id)}" title="Share link">
          ${getIcon("share")}
        </button>
      </div>
    </div>
  `;
}

// ─── Event binding ───────────────────────────────────────────────────────────

function bindBrowserEvents(overlay: HTMLElement): void {
  // Close button
  overlay.querySelector(".browser-close-btn")?.addEventListener("click", () => {
    navigateTo("");
    closeDeckBrowser();
  });

  // ESC key
  const escHandler = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      navigateTo("");
      closeDeckBrowser();
      document.removeEventListener("keydown", escHandler);
    }
  };
  document.addEventListener("keydown", escHandler);

  // Search
  const searchInput = overlay.querySelector(
    ".browser-search__input",
  ) as HTMLInputElement;
  searchInput?.addEventListener("input", () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      filter.search = searchInput.value;
      rerender();
    }, 150);
  });
  // Auto-focus search
  searchInput?.focus();

  // Category pills
  overlay.querySelectorAll(".browser-cat-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = (btn as HTMLElement).dataset.category!;
      if (cat === "all") {
        filter.categories.clear();
      } else {
        if (filter.categories.has(cat)) {
          filter.categories.delete(cat);
        } else {
          filter.categories.clear();
          filter.categories.add(cat);
        }
      }
      rerender();
    });
  });

  // Level tabs
  overlay.querySelectorAll(".browser-level-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lvl = (btn as HTMLElement).dataset.level!;
      if (lvl === "all") {
        filter.levels.clear();
      } else {
        const level = lvl as DeckLevel;
        if (filter.levels.has(level)) {
          filter.levels.delete(level);
        } else {
          filter.levels.clear();
          filter.levels.add(level);
        }
      }
      rerender();
    });
  });

  // Sort
  const sortSelect = overlay.querySelector(
    ".browser-sort__select",
  ) as HTMLSelectElement;
  sortSelect?.addEventListener("change", () => {
    filter.sortBy = sortSelect.value as SortOption;
    rerender();
  });

  // Clear filters button
  overlay
    .querySelector(".browser-clear-filters")
    ?.addEventListener("click", () => {
      filter = createDefaultFilter();
      rerender();
    });

  // Action buttons (Play, PDF, Share)
  overlay.querySelectorAll(".browser-action-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const action = (btn as HTMLElement).dataset.action!;
      const deckId = (btn as HTMLElement).dataset.deckId!;
      const deck = DECK_LIBRARY.find((d) => d.id === deckId);
      if (!deck) return;

      // Save callbacks reference before closing (closeDeckBrowser nulls it out)
      const savedCallbacks = callbacks;

      switch (action) {
        case "play":
          closeDeckBrowser();
          savedCallbacks?.onPlayDeck(deck);
          break;
        case "pdf":
          closeDeckBrowser();
          navigateTo("");
          savedCallbacks?.onLoadDeckForPdf(deck);
          break;
        case "share":
          shareDeck(deck);
          break;
      }
    });
  });

  // Click deck card to play
  overlay.querySelectorAll(".browser-deck-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest(".browser-action-btn")) return;
      const deckId = (card as HTMLElement).dataset.deckId!;
      const deck = DECK_LIBRARY.find((d) => d.id === deckId);
      if (!deck) return;
      // Save callbacks reference before closing
      const savedCallbacks = callbacks;
      closeDeckBrowser();
      savedCallbacks?.onPlayDeck(deck);
    });
  });
}

function rerender(): void {
  if (!overlayEl || !callbacks) return;
  const scrollTop =
    overlayEl.querySelector(".browser-container")?.scrollTop ?? 0;
  render();
  const container = overlayEl?.querySelector(".browser-container");
  if (container) container.scrollTop = scrollTop;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escAttr(str: string): string {
  return str.replace(/"/g, "&quot;").replace(/&/g, "&amp;");
}
