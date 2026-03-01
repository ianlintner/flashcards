import { parseJSON, parseYAML, parseMarkdown, detectFormat } from "./parsers";
import { generatePDF } from "./pdf-generator";
import {
  BIG_O_CARDS,
  EXAMPLE_MARKDOWN,
  EXAMPLE_JSON,
  EXAMPLE_YAML,
} from "./examples";
import type { InputFormat, PDFOptions, Flashcard } from "./types";
import { DEFAULT_PDF_OPTIONS } from "./types";
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

// ─── Boot ─────────────────────────────────────────────────────────────────────

init();

function init(): void {
  // Load example markdown by default
  inputArea.value = EXAMPLE_MARKDOWN;
  formatSelect.value = "markdown";

  bindEvents();
  toggleSeparatorRow();
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

  // Auto-detect format on paste / input
  inputArea.addEventListener("input", () => {
    if (formatSelect.value === "auto") {
      const detected = detectFormat(inputArea.value);
      setPlaceholder(detected);
    }
  });
}

function toggleSeparatorRow(): void {
  const show =
    formatSelect.value === "markdown" || formatSelect.value === "auto";
  separatorRow.style.display = show ? "" : "none";
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
  renderPreview(currentCards);
  previewSection.style.display = "";
  generateBtn.disabled = false;
}

// ─── PDF generation ───────────────────────────────────────────────────────────

function handleGenerate(): void {
  if (!currentCards.length) return;

  const opts: PDFOptions = {
    ...DEFAULT_PDF_OPTIONS,
    fontSize: parseFloat(fontSizeInput.value) || 11,
    includeCardNumbers: includeNums.checked,
    title: pdfTitle.value.trim() || "Flashcards",
  };

  const doc = generatePDF(currentCards, opts);

  const title = (pdfTitle.value.trim() || "flashcards")
    .replace(/\s+/g, "-")
    .toLowerCase();
  const filename = `${title}.pdf`;
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
    more.className = "more-cards";
    more.textContent = `+ ${cards.length - 12} more cards…`;
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
  previewSection.style.display = "none";
}

// ─── Error display ────────────────────────────────────────────────────────────

function showErrors(errs: string[]): void {
  errorBox.innerHTML = errs
    .map((e) => `<div class="err-line">⚠ ${esc(e)}</div>`)
    .join("");
  errorBox.style.display = "";
}

function clearErrors(): void {
  errorBox.innerHTML = "";
  errorBox.style.display = "none";
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
    group.className = "deck-level-group";

    const levelCardCount = decks.reduce((s, d) => s + d.cards.length, 0);

    group.innerHTML = `
      <div class="level-heading">
        <span class="level-badge level-badge--${level}">${LEVEL_LABELS[level as DeckLevel]}</span>
        <h3>${levelCardCount} cards</h3>
      </div>
    `;

    const grid = document.createElement("div");
    grid.className = "deck-grid";

    for (const deck of decks) {
      const card = document.createElement("div");
      card.className = "deck-card";
      card.title = `Click to load "${deck.title}"`;
      card.innerHTML = `
        <div class="deck-card-top">
          <span class="deck-card-title">${esc(deck.title)}</span>
          <span class="deck-card-count">${deck.cards.length} cards</span>
        </div>
        <div class="deck-card-category">${esc(deck.category)}</div>
        <div class="deck-card-desc">${esc(deck.description)}</div>
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
  renderPreview(currentCards);
  previewSection.style.display = "";
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
  renderPreview(currentCards);
  previewSection.style.display = "";
  generateBtn.disabled = false;
  clearErrors();
  pdfTitle.value = "Complete DSA Study Set";
  cardCount.textContent = `${currentCards.length} cards ready — All Decks`;
}

// ─── Load all 25 pre-built cards on startup ───────────────────────────────────

document.getElementById("load-all-btn")?.addEventListener("click", () => {
  currentCards = [...BIG_O_CARDS];
  renderPreview(currentCards);
  previewSection.style.display = "";
  generateBtn.disabled = false;
  clearErrors();
  cardCount.textContent = `${currentCards.length} cards ready (Big O set)`;
});

document.getElementById("load-all-decks-btn")?.addEventListener("click", () => {
  loadAllDecks();
});
