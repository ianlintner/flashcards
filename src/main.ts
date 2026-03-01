import "./style.css";
import { parseJSON, parseYAML, parseMarkdown, detectFormat } from "./parsers";
import { generatePDF } from "./pdf-generator";
import {
  BIG_O_CARDS,
  EXAMPLE_MARKDOWN,
  EXAMPLE_JSON,
  EXAMPLE_YAML,
} from "./examples";
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

// ─── State ────────────────────────────────────────────────────────────────────

let currentCards: Flashcard[] = [];
let livePreviewIndex = 0;
let livePreviewShowBack = false;
let livePreviewShowBoth = false;

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
const previewSection = document.getElementById(
  "preview-section",
) as HTMLElement;
const cardCount = document.getElementById("card-count") as HTMLElement;
const cardPreview = document.getElementById("card-preview") as HTMLElement;
const errorBox = document.getElementById("error-box") as HTMLElement;
const fontSizeInput = document.getElementById("font-size") as HTMLInputElement;
const includeNums = document.getElementById("include-nums") as HTMLInputElement;
const pdfTitle = document.getElementById("pdf-title") as HTMLInputElement;
const loadExampleBtns =
  document.querySelectorAll<HTMLButtonElement>("[data-example]");

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
const livePreviewSection = document.getElementById(
  "live-preview-section",
) as HTMLElement;
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

// ─── Boot ─────────────────────────────────────────────────────────────────────

init();

function init(): void {
  inputArea.value = EXAMPLE_MARKDOWN;
  formatSelect.value = "markdown";

  bindEvents();
  toggleSeparatorRow();
  updateDimensionBadge();
  renderDeckLibrary();
}

function bindEvents(): void {
  parseBtn.addEventListener("click", handleParse);
  generateBtn.addEventListener("click", handleGenerate);
  formatSelect.addEventListener("change", toggleSeparatorRow);

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
    previewSection.classList.remove("hidden");
    generateBtn.disabled = false;
    clearErrors();
    cardCount.textContent = `${currentCards.length} cards ready (Big O set)`;
  });

  document
    .getElementById("load-all-decks-btn")
    ?.addEventListener("click", () => {
      loadAllDecks();
    });
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
  previewSection.classList.remove("hidden");
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
  cardPreview.innerHTML = "";

  cards.slice(0, 12).forEach((card, i) => {
    const el = document.createElement("div");
    el.className = "card-thumb";
    el.innerHTML = `
      <div class="thumb-face thumb-front">
        <span class="thumb-label">FRONT</span>
        ${card.topic ? `<div class="thumb-topic">${esc(card.topic)}</div>` : ""}
        <div class="thumb-body">${esc(card.front)}</div>
      </div>
      <div class="thumb-face thumb-back">
        <span class="thumb-label">BACK</span>
        <div class="thumb-body">${esc(card.back)}</div>
      </div>
      <div class="thumb-num">#${i + 1}</div>
    `;
    cardPreview.appendChild(el);
  });

  if (cards.length > 12) {
    const more = document.createElement("div");
    more.className =
      "more-cards self-center text-sm text-slate-400 italic px-2";
    more.textContent = `+ ${cards.length - 12} more cards...`;
    cardPreview.appendChild(more);
  }
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
  previewSection.classList.add("hidden");
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
      `;
      card.addEventListener("click", () => loadDeck(deck));
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
  previewSection.classList.remove("hidden");
  generateBtn.disabled = false;
  clearErrors();
  pdfTitle.value = deck.title;
  cardCount.textContent = `${currentCards.length} cards ready — ${deck.title}`;
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
  previewSection.classList.remove("hidden");
  generateBtn.disabled = false;
  clearErrors();
  pdfTitle.value = "Complete DSA Study Set";
  cardCount.textContent = `${currentCards.length} cards ready — All Decks`;
}

// ─── Live Preview ─────────────────────────────────────────────────────────────

function showLivePreview(): void {
  livePreviewSection.classList.remove("hidden");
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
