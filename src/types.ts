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

export interface PDFOptions {
  cardWidth: number; // inches
  cardHeight: number; // inches
  fontSize: number;
  includeCardNumbers: boolean;
  title?: string;
}

export const DEFAULT_PDF_OPTIONS: PDFOptions = {
  cardWidth: 6, // landscape: 6" wide
  cardHeight: 4, // landscape: 4" tall
  fontSize: 18,
  includeCardNumbers: true,
};
