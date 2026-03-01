import { jsPDF } from "jspdf";
import type { Flashcard, PDFOptions } from "./types";

// ─── Ink-minimal palette (greyscale only) ─────────────────────────────────────
const BLACK: [number, number, number] = [0, 0, 0];
const DARK: [number, number, number] = [30, 30, 30];
const MID: [number, number, number] = [90, 90, 90];
const LIGHT: [number, number, number] = [160, 160, 160];
const VERY_LIGHT: [number, number, number] = [210, 210, 210];

// ─── Layout constants (inches) — landscape 6×4 ───────────────────────────────
const PAD = 0.2; // outer padding
const BORDER_W = 0.01; // outer border line width
const CORNER_R = 0.06; // rounded corner radius
const TOP_BAR_H = 0.22; // thin meta bar height (topic + badge)
const DIV_Y = PAD + TOP_BAR_H + 0.04; // y where body begins
const FOOT_H = 0.19; // footer strip height
const BADGE_W = 0.72; // badge width
const BADGE_H = 0.16;

export function generatePDF(cards: Flashcard[], options: PDFOptions): jsPDF {
  const W = options.cardWidth;
  const H = options.cardHeight;
  const orient = options.orientation ?? "landscape";

  // jsPDF format: [shorter, longer]; orientation determines layout
  const shorter = Math.min(W, H);
  const longer = Math.max(W, H);

  const doc = new jsPDF({
    orientation: orient,
    unit: "in",
    format: [shorter, longer],
  });

  const filter = options.pageFilter ?? "all";
  const includeFronts = filter === "all" || filter === "fronts";
  const includeBacks = filter === "all" || filter === "backs";
  const reverse = options.reverseOrder ?? false;

  // Optionally reverse card order (useful for manual duplex printing)
  const orderedCards = reverse ? [...cards].reverse() : cards;

  let pageIndex = 0;

  orderedCards.forEach((card, i) => {
    const idx = reverse ? cards.length - 1 - i : i;
    if (includeFronts) {
      if (pageIndex > 0) doc.addPage([shorter, longer], orient);
      drawSide(doc, card, "FRONT", card.front, idx + 1, cards.length, options);
      pageIndex++;
    }

    if (includeBacks) {
      if (pageIndex > 0) doc.addPage([shorter, longer], orient);
      drawSide(doc, card, "BACK", card.back, idx + 1, cards.length, options);
      pageIndex++;
    }
  });

  return doc;
}

// ─── Draw one card side ───────────────────────────────────────────────────────

function drawSide(
  doc: jsPDF,
  card: Flashcard,
  side: "FRONT" | "BACK",
  text: string,
  num: number,
  total: number,
  opts: PDFOptions,
): void {
  const W = opts.cardWidth;
  const H = opts.cardHeight;

  // White page (explicit)
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, H, "F");

  // ── Meta bar: topic left, FRONT/BACK label right ─────────────────────────
  const metaMidY = PAD + TOP_BAR_H * 0.5;
  const sideLabel = side === "FRONT" ? "[ FRONT ]" : "[ BACK ]";
  const sideLabelW =
    (doc.setFont("helvetica", "bold").setFontSize(7),
    doc.getTextWidth(sideLabel));

  const font = opts.fontFamily ?? "helvetica";

  if (card.topic) {
    doc.setFont(font, "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...MID);
    const maxTopicW = W - PAD * 2 - sideLabelW - 0.2;
    const topicStr = firstLine(doc, sanitize(card.topic), maxTopicW);
    doc.text(topicStr, PAD, metaMidY, { baseline: "middle" });
  }

  // Side label — plain text, top-right
  doc.setFont(font, "bold");
  doc.setFontSize(7);
  doc.setTextColor(...LIGHT);
  doc.text(sideLabel, W - PAD, metaMidY, {
    align: "right",
    baseline: "middle",
  });

  // ── Body ──────────────────────────────────────────────────────────────────
  const bodyTop = DIV_Y + 0.04;
  const bodyBottom = H - FOOT_H - 0.06;
  const bodyW = W - PAD * 2;

  drawBodyText(
    doc,
    sanitize(text),
    PAD,
    bodyTop,
    bodyW,
    bodyBottom,
    opts.fontSize,
    opts,
  );

  // ── Footer ────────────────────────────────────────────────────────────────
  if (opts.includeCardNumbers) {
    doc.setFont(font, "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...VERY_LIGHT);
    doc.text(`${num} / ${total}`, W - PAD, H - 0.07, {
      align: "right",
      baseline: "middle",
    });
  }
}

// ─── Body text: auto-shrink until content fits ────────────────────────────────

function drawBodyText(
  doc: jsPDF,
  text: string,
  x: number,
  topY: number,
  maxW: number,
  bottomY: number,
  baseFontSize: number,
  opts: PDFOptions,
): void {
  const bodyH = bottomY - topY;

  // Measure total height at decreasing font sizes until it fits
  let fontSize = Math.min(baseFontSize, 18);
  while (fontSize >= 5.5) {
    const lines = buildLines(doc, text, maxW, fontSize);
    const lineH = ptToIn(fontSize) * 1.48;
    if (lines.length * lineH <= bodyH + 0.01) break;
    fontSize -= 0.5;
  }

  const lines = buildLines(doc, text, maxW, fontSize);
  const lineH = ptToIn(fontSize) * 1.48;
  const totalH = lines.length * lineH;

  // Vertically centre the block within the body area
  const startY = topY + Math.max(0, (bodyH - totalH) / 2);

  lines.forEach((line, i) => {
    const y = startY + i * lineH + lineH * 0.75;
    if (y > bottomY + 0.02) return; // clip overflow

    // Complexity/notation lines -> monospace, slightly smaller
    const bodyFont = opts.fontFamily ?? "helvetica";
    const isNotation =
      /^\s*(Time|Space|Best|Worst|Average|O\(|T:|S:)|^\s*-{3,}/.test(line);
    if (isNotation) {
      doc.setFont("courier", "normal");
      doc.setFontSize(fontSize * 0.92);
      doc.setTextColor(...BLACK);
    } else {
      doc.setFont(bodyFont, "normal");
      doc.setFontSize(fontSize);
      doc.setTextColor(...DARK);
    }

    doc.text(line, x, y);
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Strip characters outside WinAnsi (Latin-1 + Win-1252) so jsPDF renders cleanly. */
function sanitize(text: string): string {
  return (
    text
      // Common replacements first
      .replace(/[\u2192\u21d2]/g, "->")
      .replace(/[\u2190\u21d0]/g, "<-")
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/\u2026/g, "...")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/\u00b7/g, "*")
      .replace(/[\u2500-\u257f]/g, "-") // box-drawing chars
      .replace(/[\u207f]/g, "^n")
      .replace(/[\u00b2]/g, "^2")
      .replace(/[\u00b3]/g, "^3")
      .replace(/[\u2082]/g, "2") // log₂ subscript
      .replace(/[\u03b8\u0398]/g, "O") // theta
      .replace(/[\u03a9]/g, "O") // omega
      // Strip anything not in Latin-1/Win-1252 range after the above
      .replace(/[^\x00-\xff]/g, "")
  );
}

/** Wrap text respecting explicit newlines, then word-wrap each paragraph. */
function buildLines(
  doc: jsPDF,
  text: string,
  maxW: number,
  _fs: number,
): string[] {
  const result: string[] = [];
  for (const para of text.split("\n")) {
    if (para.trim() === "") {
      result.push("");
      continue;
    }
    const wrapped = doc.splitTextToSize(para, maxW) as string[];
    result.push(...wrapped);
  }
  return result;
}

function ptToIn(pt: number): number {
  return pt / 72;
}

/** Truncate to first wrapped line so topic doesn't overflow horizontally. */
function firstLine(doc: jsPDF, str: string, maxW: number): string {
  return (doc.splitTextToSize(str, maxW) as string[])[0] ?? str;
}
