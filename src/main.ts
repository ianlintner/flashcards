import "./style.css";
import "./player.css";
import "./browser/browser.css";
import { parseJSON, parseYAML, parseMarkdown, detectFormat } from "./parsers";
import { generatePDF } from "./pdf-generator";
import {
  BIG_O_CARDS,
  EXAMPLE_MARKDOWN,
  EXAMPLE_JSON,
  EXAMPLE_YAML,
} from "./examples";
import { startPlayer } from "./player/player";
import type {
  InputFormat,
  PDFOptions,
  Flashcard,
  CardSize,
  Orientation,
  FontFamily,
  PageFilter,
} from "./types";
import {
  DEFAULT_PDF_OPTIONS,
  CARD_SIZE_PRESETS,
  getCardDimensions,
} from "./types";
import {
  DECK_LIBRARY,
  getDecksByLevel,
  getTotalCardCount,
  LEVEL_LABELS,
  LEVEL_ORDER,
} from "./decks/index";
import type { DeckInfo, DeckLevel } from "./decks/index";
import { registerRoute, initRouter, navigateTo } from "./router";
import { openDeckBrowser, closeDeckBrowser } from "./browser/deck-browser";

// ─── State ────────────────────────────────────────────────────────────────────

let currentCards: Flashcard[] = [];
let livePreviewIndex = 0;
let livePreviewShowBack = false;
let livePreviewShowBoth = false;
let pendingDeck: DeckInfo | null = null;
let hasUserEdits = false;
let autosaveTimeout: number | null = null;

// ─── DOM refs ────────────────────────────────────────────────────────────────

const inputArea = document.getElementById("input-area") as HTMLTextAreaElement;
const formatSelect = document.getElementById(
  "format-select",
) as HTMLSelectElement;
const separatorInput = document.getElementById(
  "separator-input",
) as HTMLInputElement;
const separatorRow = document.getElementById("separator-row") as HTMLElement;
const parseBtn = document.getElementById("parse-btn") as HTMLButtonElement;
const generateBtn = document.getElementById(
  "generate-btn",
) as HTMLButtonElement;
const errorBox = document.getElementById("error-box") as HTMLElement;
const fontSizeInput = document.getElementById("font-size") as HTMLInputElement;
const includeNums = document.getElementById("include-nums") as HTMLInputElement;
const pdfTitle = document.getElementById("pdf-title") as HTMLInputElement;
const loadExampleBtns =
  document.querySelectorAll<HTMLButtonElement>("[data-example]");
const cardCount = document.getElementById("card-count") as HTMLElement;

// New option refs
const cardSizeSelect = document.getElementById(
  "card-size",
) as HTMLSelectElement;
const fontFamilySelect = document.getElementById(
  "font-family",
) as HTMLSelectElement;
const dimensionBadge = document.getElementById(
  "dimension-badge",
) as HTMLElement;
const copyPromptBtn = document.getElementById(
  "copy-prompt-btn",
) as HTMLButtonElement;

// Live preview refs
const liveCardContainer = document.getElementById(
  "live-card-container",
) as HTMLElement;
const liveCardCounter = document.getElementById(
  "live-card-counter",
) as HTMLElement;
const liveCardInfo = document.getElementById("live-card-info") as HTMLElement;
const prevCardBtn = document.getElementById(
  "prev-card-btn",
) as HTMLButtonElement;
const nextCardBtn = document.getElementById(
  "next-card-btn",
) as HTMLButtonElement;
const flipCardBtn = document.getElementById(
  "flip-card-btn",
) as HTMLButtonElement;
const toggleSideBtn = document.getElementById(
  "toggle-side-btn",
) as HTMLButtonElement;
const livePreviewControls = document.getElementById(
  "live-preview-controls",
) as HTMLElement;
const livePreviewEmpty = document.getElementById(
  "live-preview-empty",
) as HTMLElement;
const livePreviewBody = document.getElementById(
  "live-preview-body",
) as HTMLElement;

// Modal refs
const confirmModal = document.getElementById("confirm-modal") as HTMLElement;
const modalMessage = document.getElementById("modal-message") as HTMLElement;
const modalCloseBtn = document.getElementById(
  "modal-close-btn",
) as HTMLButtonElement;
const modalCancelBtn = document.getElementById(
  "modal-cancel-btn",
) as HTMLButtonElement;
const modalConfirmBtn = document.getElementById(
  "modal-confirm-btn",
) as HTMLButtonElement;
const saveStateBtn = document.getElementById(
  "save-state-btn",
) as HTMLButtonElement;
const clearStateBtn = document.getElementById(
  "clear-state-btn",
) as HTMLButtonElement;
const browseDecksBtn = document.getElementById(
  "browse-decks-btn",
) as HTMLButtonElement;

// ─── Boot ─────────────────────────────────────────────────────────────────────

init();

function init(): void {
  inputArea.value = EXAMPLE_MARKDOWN;
  formatSelect.value = "markdown";

  bindEvents();
  toggleSeparatorRow();
  updateDimensionBadge();
  renderDeckLibrary();
  updateSaveButtons();
  initAppRouter();

  // Check for saved state after a brief delay to allow page to settle
  setTimeout(() => {
    promptRestoreSavedState();
  }, 300);
}

function bindEvents(): void {
  parseBtn.addEventListener("click", handleParse);
  generateBtn.addEventListener("click", handleGenerate);
  formatSelect.addEventListener("change", toggleSeparatorRow);

  // Browse decks button
  browseDecksBtn?.addEventListener("click", () => {
    navigateTo("/browse");
  });

  loadExampleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const fmt = btn.dataset.example as InputFormat;
      loadExample(fmt);
    });
  });

  // Auto-detect on paste / input
  inputArea.addEventListener("input", () => {
    if (formatSelect.value === "auto") {
      const detected = detectFormat(inputArea.value);
      setPlaceholder(detected);
    }
  });

  // Card size & orientation change → update badge
  cardSizeSelect?.addEventListener("change", updateDimensionBadge);
  document
    .querySelectorAll<HTMLInputElement>('input[name="orientation"]')
    .forEach((r) => r.addEventListener("change", updateDimensionBadge));

  // Copy AI prompt
  copyPromptBtn?.addEventListener("click", copyAIPrompt);

  // Live preview navigation
  prevCardBtn?.addEventListener("click", () => navigateLivePreview(-1));
  nextCardBtn?.addEventListener("click", () => navigateLivePreview(1));
  flipCardBtn?.addEventListener("click", () => {
    livePreviewShowBack = !livePreviewShowBack;
    renderLivePreview();
  });
  toggleSideBtn?.addEventListener("click", () => {
    livePreviewShowBoth = !livePreviewShowBoth;
    renderLivePreview();
  });

  // Keyboard shortcuts for live preview
  document.addEventListener("keydown", (e) => {
    if (currentCards.length === 0) return;
    // Don't capture when typing in inputs/textarea
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    switch (e.key) {
      case "ArrowLeft":
        navigateLivePreview(-1);
        e.preventDefault();
        break;
      case "ArrowRight":
        navigateLivePreview(1);
        e.preventDefault();
        break;
      case "f":
      case "F":
        livePreviewShowBack = !livePreviewShowBack;
        renderLivePreview();
        e.preventDefault();
        break;
      case "b":
      case "B":
        livePreviewShowBoth = !livePreviewShowBoth;
        renderLivePreview();
        e.preventDefault();
        break;
    }
  });

  // Load example buttons
  document.getElementById("load-all-btn")?.addEventListener("click", () => {
    currentCards = [...BIG_O_CARDS];
    livePreviewIndex = 0;
    livePreviewShowBack = false;
    renderPreview(currentCards);
    showLivePreview();
    generateBtn.disabled = false;
    clearErrors();
    cardCount.textContent = `${currentCards.length} cards ready (Big O set)`;
  });

  document
    .getElementById("load-all-decks-btn")
    ?.addEventListener("click", () => {
      loadAllDecks();
    });

  // Modal event handlers
  modalCloseBtn?.addEventListener("click", closeModal);
  modalCancelBtn?.addEventListener("click", closeModal);
  modalConfirmBtn?.addEventListener("click", confirmLoadDeck);
  confirmModal?.addEventListener("click", (e) => {
    if (e.target === confirmModal) closeModal();
  });

  // State persistence
  saveStateBtn?.addEventListener("click", saveState);
  clearStateBtn?.addEventListener("click", clearSavedState);
  inputArea?.addEventListener("input", handleTextareaInput);
}

function toggleSeparatorRow(): void {
  const show =
    formatSelect.value === "markdown" || formatSelect.value === "auto";
  separatorRow.style.display = show ? "" : "none";
}

// ─── Dimension badge ──────────────────────────────────────────────────────────

function getSelectedOrientation(): Orientation {
  const checked = document.querySelector<HTMLInputElement>(
    'input[name="orientation"]:checked',
  );
  return (checked?.value as Orientation) || "landscape";
}

function updateDimensionBadge(): void {
  if (!dimensionBadge) return;
  const size = (cardSizeSelect?.value || "4x6") as CardSize;
  const orientation = getSelectedOrientation();
  const dims = getCardDimensions(size, orientation);
  const preset = CARD_SIZE_PRESETS[size];
  const orientLabel =
    orientation.charAt(0).toUpperCase() + orientation.slice(1);

  // Show dimensions nicely
  const wStr = Number.isInteger(dims.width)
    ? dims.width.toString()
    : dims.width.toFixed(1);
  const hStr = Number.isInteger(dims.height)
    ? dims.height.toString()
    : dims.height.toFixed(1);

  const unit = size.startsWith("a") ? "mm" : "in";
  if (unit === "mm") {
    // Use mm for A sizes
    const wMm = Math.round(dims.width * 25.4);
    const hMm = Math.round(dims.height * 25.4);
    dimensionBadge.textContent = `${wMm} x ${hMm} mm · ${orientLabel}`;
  } else {
    dimensionBadge.textContent = `${wStr} x ${hStr} in · ${orientLabel}`;
  }
  // Suppress unused variable warning
  void preset;
}

// ─── AI Prompt Copy ───────────────────────────────────────────────────────────

function copyAIPrompt(): void {
  const promptEl = document.getElementById("ai-prompt-text");
  const text = promptEl?.textContent || "";
  navigator.clipboard.writeText(text).then(
    () => {
      if (copyPromptBtn) {
        const orig = copyPromptBtn.innerHTML;
        copyPromptBtn.innerHTML =
          '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg> Copied!';
        setTimeout(() => {
          copyPromptBtn.innerHTML = orig;
        }, 2000);
      }
    },
    () => {
      // Fallback: select text
      if (promptEl) {
        const range = document.createRange();
        range.selectNodeContents(promptEl);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    },
  );
}

// ─── Parse ────────────────────────────────────────────────────────────────────

function handleParse(): void {
  const raw = inputArea.value.trim();
  const fmt = (
    formatSelect.value === "auto" ? detectFormat(raw) : formatSelect.value
  ) as InputFormat;
  const sep = separatorInput.value.trim() || "===";

  if (!raw) {
    showErrors(["Input is empty."]);
    return;
  }

  const result = (() => {
    switch (fmt) {
      case "json":
        return parseJSON(raw);
      case "yaml":
        return parseYAML(raw);
      case "markdown":
        return parseMarkdown(raw, sep);
      default:
        return parseMarkdown(raw, sep);
    }
  })();

  if (result.errors.length) showErrors(result.errors);
  else clearErrors();

  if (result.cards.length === 0) {
    showErrors([
      ...(result.errors.length ? result.errors : []),
      "No cards were parsed.",
    ]);
    return;
  }

  currentCards = result.cards;
  livePreviewIndex = 0;
  livePreviewShowBack = false;
  renderPreview(currentCards);
  showLivePreview();
  generateBtn.disabled = false;
}

// ─── PDF generation ───────────────────────────────────────────────────────────

function handleGenerate(): void {
  if (!currentCards.length) return;

  const size = (cardSizeSelect?.value || "4x6") as CardSize;
  const orientation = getSelectedOrientation();
  const fontFamily = (fontFamilySelect?.value || "helvetica") as FontFamily;
  const dims = getCardDimensions(size, orientation);

  const pageFilter = (document.querySelector<HTMLInputElement>(
    'input[name="page-filter"]:checked',
  )?.value || "all") as PageFilter;

  const reverseOrder =
    (document.getElementById("reverse-order") as HTMLInputElement)?.checked ??
    false;

  const opts: PDFOptions = {
    ...DEFAULT_PDF_OPTIONS,
    cardSize: size,
    cardWidth: dims.width,
    cardHeight: dims.height,
    orientation,
    fontFamily,
    fontSize: parseFloat(fontSizeInput.value) || 18,
    includeCardNumbers: includeNums.checked,
    pageFilter,
    reverseOrder,
    title: pdfTitle.value.trim() || "Flashcards",
  };

  const doc = generatePDF(currentCards, opts);

  const title = (pdfTitle.value.trim() || "flashcards")
    .replace(/\s+/g, "-")
    .toLowerCase();
  const filterSuffix =
    pageFilter === "fronts"
      ? "-fronts"
      : pageFilter === "backs"
        ? "-backs"
        : "";
  const reverseSuffix = reverseOrder ? "-rev" : "";
  const filename = `${title}${filterSuffix}${reverseSuffix}.pdf`;
  doc.save(filename);
}

// ─── Preview ─────────────────────────────────────────────────────────────────

function renderPreview(cards: Flashcard[]): void {
  cardCount.textContent = `${cards.length} card${cards.length !== 1 ? "s" : ""} ready`;
}

// ─── Examples ────────────────────────────────────────────────────────────────

function loadExample(fmt: InputFormat): void {
  switch (fmt) {
    case "json":
      inputArea.value = EXAMPLE_JSON;
      formatSelect.value = "json";
      break;
    case "yaml":
      inputArea.value = EXAMPLE_YAML;
      formatSelect.value = "yaml";
      break;
    case "markdown":
      inputArea.value = EXAMPLE_MARKDOWN;
      formatSelect.value = "markdown";
      break;
  }
  toggleSeparatorRow();
  clearErrors();
}

// ─── Error display ────────────────────────────────────────────────────────────

function showErrors(errs: string[]): void {
  errorBox.innerHTML = errs
    .map(
      (e) =>
        `<div class="text-sm text-red-600 leading-relaxed">${esc(e)}</div>`,
    )
    .join("");
  errorBox.classList.remove("hidden");
}

function clearErrors(): void {
  errorBox.innerHTML = "";
  errorBox.classList.add("hidden");
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

function setPlaceholder(_fmt: string): void {
  // could update placeholder text based on detected format
}

// ─── State Persistence ────────────────────────────────────────────────────────

const STORAGE_KEY = "flashcards_saved_state";
const AUTOSAVE_DELAY = 1000; // ms

interface SavedState {
  content: string;
  format: InputFormat;
  separator: string;
  timestamp: number;
}

function saveState(): void {
  const state: SavedState = {
    content: inputArea.value,
    format: formatSelect.value as InputFormat,
    separator: separatorInput.value,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    showSaveConfirmation();
  } catch (err) {
    console.error("Failed to save state:", err);
  }
}

function loadSavedState(): SavedState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as SavedState;
  } catch (err) {
    console.error("Failed to load saved state:", err);
    return null;
  }
}

function clearSavedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    hasUserEdits = false;
    updateSaveButtons();
    showClearConfirmation();
  } catch (err) {
    console.error("Failed to clear saved state:", err);
  }
}

function handleTextareaInput(): void {
  if (!hasUserEdits) {
    hasUserEdits = true;
    updateSaveButtons();
  }

  // Auto-save with debounce
  if (autosaveTimeout !== null) {
    clearTimeout(autosaveTimeout);
  }

  autosaveTimeout = window.setTimeout(() => {
    if (hasUserEdits && inputArea.value.trim()) {
      saveState();
    }
  }, AUTOSAVE_DELAY);
}

function updateSaveButtons(): void {
  const hasSaved = loadSavedState() !== null;
  if (saveStateBtn) {
    saveStateBtn.disabled = !hasUserEdits && !inputArea.value.trim();
  }
  if (clearStateBtn) {
    clearStateBtn.disabled = !hasSaved;
  }
}

function showSaveConfirmation(): void {
  const now = new Date().toLocaleTimeString();
  cardCount.textContent = `Saved at ${now}`;
  cardCount.className = "text-sm font-semibold text-blue-600 ml-1";
  setTimeout(() => {
    if (currentCards.length > 0) {
      cardCount.textContent = `${currentCards.length} cards ready`;
      cardCount.className = "text-sm font-semibold text-emerald-600 ml-1";
    } else {
      cardCount.textContent = "";
    }
  }, 2000);
}

function showClearConfirmation(): void {
  cardCount.textContent = "Saved state cleared";
  cardCount.className = "text-sm font-semibold text-slate-600 ml-1";
  setTimeout(() => {
    if (currentCards.length > 0) {
      cardCount.textContent = `${currentCards.length} cards ready`;
      cardCount.className = "text-sm font-semibold text-emerald-600 ml-1";
    } else {
      cardCount.textContent = "";
    }
  }, 2000);
}

function promptRestoreSavedState(): void {
  const saved = loadSavedState();
  if (!saved) return;

  const timeDiff = Date.now() - saved.timestamp;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  let timeStr = "";
  if (hours > 0) {
    timeStr = `${hours}h ${minutes}m ago`;
  } else if (minutes > 0) {
    timeStr = `${minutes}m ago`;
  } else {
    timeStr = "just now";
  }

  const shouldRestore = confirm(
    `Found saved content from ${timeStr}.\n\nWould you like to restore it?`,
  );

  if (shouldRestore) {
    inputArea.value = saved.content;
    formatSelect.value = saved.format;
    separatorInput.value = saved.separator;
    hasUserEdits = false; // Don't mark as edited when restoring
    updateSaveButtons();
  }
}

function markAsPreloadedDeck(): void {
  hasUserEdits = false;
  updateSaveButtons();
}

// ─── Modal ───────────────────────────────────────────────────────────────────────────────

function openDeckConfirmModal(deck: DeckInfo): void {
  pendingDeck = deck;
  const hasCurrentCards = currentCards.length > 0;

  if (hasCurrentCards) {
    modalMessage.innerHTML = `
      <strong class="text-slate-800">${esc(deck.title)}</strong> contains ${deck.cards.length} flashcard${deck.cards.length !== 1 ? "s" : ""}.<br><br>
      Loading this deck will replace your current ${currentCards.length} card${currentCards.length !== 1 ? "s" : ""} and reset the preview.
    `;
  } else {
    modalMessage.innerHTML = `
      Load <strong class="text-slate-800">${esc(deck.title)}</strong> with ${deck.cards.length} flashcard${deck.cards.length !== 1 ? "s" : ""}?
    `;
  }

  confirmModal.classList.remove("hidden");
  modalConfirmBtn.focus();
}

function closeModal(): void {
  confirmModal.classList.add("hidden");
  pendingDeck = null;
}

function confirmLoadDeck(): void {
  if (!pendingDeck) return;

  loadDeck(pendingDeck);
  closeModal();
}
// ─── Deck Library ─────────────────────────────────────────────────────────────

function renderDeckLibrary(): void {
  const container = document.getElementById("deck-library-container");
  const totalBadge = document.getElementById("deck-total-badge");
  if (!container) return;

  const totalCards = getTotalCardCount();
  if (totalBadge) {
    totalBadge.textContent = `${DECK_LIBRARY.length} decks · ${totalCards} cards`;
  }

  const grouped = getDecksByLevel();
  container.innerHTML = "";

  for (const level of LEVEL_ORDER) {
    const decks = grouped.get(level);
    if (!decks || decks.length === 0) continue;

    const group = document.createElement("div");
    group.className = "mt-4 first:mt-2";

    const levelCardCount = decks.reduce((s, d) => s + d.cards.length, 0);

    group.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <span class="level-badge level-badge--${level}">${LEVEL_LABELS[level as DeckLevel]}</span>
        <h3 class="text-sm font-bold text-slate-700">${levelCardCount} cards</h3>
      </div>
    `;

    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5";

    for (const deck of decks) {
      const card = document.createElement("div");
      card.className = "deck-card";
      card.title = `Click to load "${deck.title}"`;
      card.innerHTML = `
        <div class="flex items-center justify-between gap-2">
          <span class="text-sm font-bold text-slate-800">${esc(deck.title)}</span>
          <span class="text-[11px] font-semibold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">${deck.cards.length} cards</span>
        </div>
        <div class="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">${esc(deck.category)}</div>
        <div class="text-xs text-slate-500 leading-snug">${esc(deck.description)}</div>
        <button class="deck-play-btn" title="Play flashcard game with this deck">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Play
        </button>
      `;
      card.addEventListener("click", (e) => {
        // Don't trigger if clicking play button
        if ((e.target as HTMLElement).closest(".deck-play-btn")) return;
        openDeckConfirmModal(deck);
      });

      const playBtn = card.querySelector(".deck-play-btn");
      playBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        openPlayer(deck);
      });

      grid.appendChild(card);
    }

    group.appendChild(grid);
    container.appendChild(group);
  }
}

function loadDeck(deck: DeckInfo): void {
  currentCards = [...deck.cards];
  livePreviewIndex = 0;
  livePreviewShowBack = false;
  renderPreview(currentCards);
  showLivePreview();
  generateBtn.disabled = false;
  clearErrors();
  pdfTitle.value = deck.title;
  cardCount.textContent = `${currentCards.length} cards ready — ${deck.title}`;
  markAsPreloadedDeck();
}

function loadAllDecks(): void {
  const allCards: Flashcard[] = [];
  for (const deck of DECK_LIBRARY) {
    allCards.push(...deck.cards);
  }
  currentCards = allCards;
  livePreviewIndex = 0;
  livePreviewShowBack = false;
  renderPreview(currentCards);
  showLivePreview();
  generateBtn.disabled = false;
  clearErrors();
  pdfTitle.value = "Complete DSA Study Set";
  cardCount.textContent = `${currentCards.length} cards ready — All Decks`;
}

function openPlayer(deck: DeckInfo): void {
  startPlayer(deck);
}

// ─── Router ───────────────────────────────────────────────────────────────────

function initAppRouter(): void {
  const browserCallbacks = {
    onPlayDeck: (deck: DeckInfo) => {
      navigateTo(`/play/${deck.id}`);
      openPlayer(deck);
    },
    onLoadDeckForPdf: (deck: DeckInfo) => {
      loadDeck(deck);
    },
  };

  registerRoute("browse", "/browse", () => {
    openDeckBrowser(browserCallbacks);
  });

  registerRoute("browse-category", "/browse/:category", (params) => {
    openDeckBrowser(browserCallbacks, params.category);
  });

  registerRoute("play", "/play/:id", (params) => {
    const deck = DECK_LIBRARY.find((d) => d.id === params.id);
    if (deck) {
      openPlayer(deck);
    }
  });

  registerRoute("deck", "/deck/:id", (params) => {
    const deck = DECK_LIBRARY.find((d) => d.id === params.id);
    if (deck) {
      loadDeck(deck);
    }
  });

  initRouter(() => {
    // Default / fallback: close overlays
    closeDeckBrowser();
  });
}

// ─── Live Preview ─────────────────────────────────────────────────────────────

function showLivePreview(): void {
  // Show controls, hide empty state, show card view
  livePreviewControls.classList.remove("hidden");
  livePreviewEmpty.classList.add("hidden");
  livePreviewBody.classList.remove("hidden");
  renderLivePreview();
}

function navigateLivePreview(delta: number): void {
  if (currentCards.length === 0) return;
  livePreviewIndex =
    (livePreviewIndex + delta + currentCards.length) % currentCards.length;
  livePreviewShowBack = false;
  renderLivePreview();
}

function renderLivePreview(): void {
  if (!liveCardContainer || currentCards.length === 0) return;

  const card = currentCards[livePreviewIndex];
  const total = currentCards.length;
  const idx = livePreviewIndex + 1;

  // Update counter
  if (liveCardCounter) {
    liveCardCounter.textContent = `${idx} / ${total}`;
  }
  if (liveCardInfo) {
    liveCardInfo.textContent = card.topic || "";
  }

  // Update button state
  if (toggleSideBtn) {
    toggleSideBtn.classList.toggle("!bg-indigo-50", livePreviewShowBoth);
    toggleSideBtn.classList.toggle("!border-indigo-300", livePreviewShowBoth);
  }

  liveCardContainer.innerHTML = "";

  if (livePreviewShowBoth) {
    // Side-by-side: front + back
    liveCardContainer.appendChild(buildLiveCard(card, "FRONT", idx, total));
    liveCardContainer.appendChild(buildLiveCard(card, "BACK", idx, total));
  } else {
    // Single card, flippable
    const side = livePreviewShowBack ? "BACK" : "FRONT";
    const el = buildLiveCard(card, side, idx, total);
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      livePreviewShowBack = !livePreviewShowBack;
      renderLivePreview();
    });
    // Click hint
    const hint = document.createElement("div");
    hint.className = "live-card__click-hint";
    hint.innerHTML = `<span>Click to flip</span>`;
    el.appendChild(hint);
    liveCardContainer.appendChild(el);
  }
}

function buildLiveCard(
  card: Flashcard,
  side: "FRONT" | "BACK",
  num: number,
  total: number,
): HTMLElement {
  const el = document.createElement("div");
  el.className = "live-card" + (side === "BACK" ? " live-card--back" : "");

  const text = side === "FRONT" ? card.front : card.back;
  const badgeClass =
    side === "FRONT"
      ? "live-card__side-badge--front"
      : "live-card__side-badge--back";

  el.innerHTML = `
    <div class="live-card__topbar">
      <span class="live-card__topic">${card.topic ? esc(card.topic) : ""}</span>
      <span class="live-card__side-badge ${badgeClass}">${side}</span>
    </div>
    <div class="live-card__body">${formatCardText(esc(text))}</div>
    <div class="live-card__footer">${num} / ${total}</div>
  `;

  return el;
}

function formatCardText(escaped: string): string {
  // Highlight notation lines (Time:, Space:, O(, Best:, Worst:, etc.)
  return escaped
    .split("<br>")
    .map((line) => {
      const raw = line
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
      const isNotation =
        /^\s*(Time|Space|Best|Worst|Average|O\(|T:|S:)|^\s*-{3,}/.test(raw);
      if (isNotation) {
        return `<span class="font-mono text-xs text-slate-900">${line}</span>`;
      }
      return line;
    })
    .join("<br>");
}
