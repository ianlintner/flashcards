export interface Flashcard {
  front: string;
  back: string;
  topic?: string;
}

export type InputFormat = "json" | "yaml" | "markdown";

export interface ParseResult {
  cards: Flashcard[];
  errors: string[];
}

// ─── Card size presets ────────────────────────────────────────────────────────

export type CardSize = "3x5" | "4x6" | "5x7" | "a6" | "a7";
export type Orientation = "landscape" | "portrait";
export type FontFamily = "helvetica" | "courier" | "times";
export type PageFilter = "all" | "fronts" | "backs";

export interface CardSizePreset {
  short: number; // shorter physical dimension (inches)
  long: number; // longer physical dimension (inches)
  label: string;
}

export const CARD_SIZE_PRESETS: Record<CardSize, CardSizePreset> = {
  "3x5": { short: 3, long: 5, label: "3 × 5 in" },
  "4x6": { short: 4, long: 6, label: "4 × 6 in (Standard)" },
  "5x7": { short: 5, long: 7, label: "5 × 7 in (Jumbo)" },
  a6: { short: 4.13, long: 5.83, label: "A6 (105 × 148 mm)" },
  a7: { short: 2.91, long: 4.13, label: "A7 (74 × 105 mm)" },
};

export const FONT_FAMILY_LABELS: Record<FontFamily, string> = {
  helvetica: "Helvetica (Sans-serif)",
  courier: "Courier (Monospace)",
  times: "Times New Roman (Serif)",
};

/** Given a size preset and orientation, return the PDF page width & height. */
export function getCardDimensions(
  size: CardSize,
  orientation: Orientation,
): { width: number; height: number } {
  const preset = CARD_SIZE_PRESETS[size];
  if (orientation === "landscape") {
    return { width: preset.long, height: preset.short };
  }
  return { width: preset.short, height: preset.long };
}

// ─── PDF options ──────────────────────────────────────────────────────────────

export interface PDFOptions {
  cardSize: CardSize;
  cardWidth: number; // inches — derived from size + orientation
  cardHeight: number; // inches — derived from size + orientation
  orientation: Orientation;
  fontFamily: FontFamily;
  fontSize: number;
  includeCardNumbers: boolean;
  pageFilter: PageFilter; // "all" | "fronts" (odd pages) | "backs" (even pages)
  reverseOrder: boolean; // print cards last-to-first (useful for manual duplex)
  title?: string;
}

export const DEFAULT_PDF_OPTIONS: PDFOptions = {
  cardSize: "4x6",
  cardWidth: 6, // landscape: 6" wide
  cardHeight: 4, // landscape: 4" tall
  orientation: "landscape",
  fontFamily: "helvetica",
  fontSize: 18,
  includeCardNumbers: true,
  pageFilter: "all",
  reverseOrder: false,
};
