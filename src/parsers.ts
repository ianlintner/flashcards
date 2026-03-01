import yaml from "js-yaml";
import type { Flashcard, ParseResult } from "./types";

// ─── JSON ────────────────────────────────────────────────────────────────────

export function parseJSON(input: string): ParseResult {
  const errors: string[] = [];
  try {
    const data = JSON.parse(input);
    const cards = normaliseData(data, errors);
    return { cards, errors };
  } catch (e) {
    return { cards: [], errors: [`JSON parse error: ${(e as Error).message}`] };
  }
}

// ─── YAML ────────────────────────────────────────────────────────────────────

export function parseYAML(input: string): ParseResult {
  const errors: string[] = [];
  try {
    const data = yaml.load(input);
    const cards = normaliseData(data as unknown, errors);
    return { cards, errors };
  } catch (e) {
    return { cards: [], errors: [`YAML parse error: ${(e as Error).message}`] };
  }
}

// ─── Markdown ────────────────────────────────────────────────────────────────
//
// Format:
//   Content before first "===" is ignored (optional title / notes).
//   Each card block is separated by "===" (or a custom separator).
//   Within one card block the first "---" (alone on a line) splits FRONT / BACK.
//   A leading "# Heading" on the first line of the front becomes the `topic`.
//
// Example:
//   === Big O: Array Access
//   What is the time complexity of accessing an element by index in an array?
//   ---
//   **O(1)** – Constant time.
//   Arrays store elements in contiguous memory, so any index is a direct pointer offset.
//   ===

export function parseMarkdown(
  input: string,
  cardSeparator = "===",
): ParseResult {
  const errors: string[] = [];
  const cards: Flashcard[] = [];

  // Normalise line endings
  const normalised = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Split by card separator (line that is exactly the separator, trimmed)
  const sepRegex = new RegExp(`^\\s*${escapeRegex(cardSeparator)}\\s*$`, "gm");
  const rawBlocks = normalised
    .split(sepRegex)
    .map((b) => b.trim())
    .filter(Boolean);

  // The content before the first separator is a preamble (title / comments) —
  // skip it silently unless it contains a "---" divider (i.e. looks like a card).
  const firstSepIndex = normalised.search(sepRegex);
  const preamble =
    firstSepIndex > 0 ? normalised.slice(0, firstSepIndex).trim() : "";
  const blocks =
    preamble && rawBlocks.length > 0 && rawBlocks[0] === preamble
      ? rawBlocks.slice(1)
      : rawBlocks;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Split front/back by a line containing only "---"
    const dividerRegex = /^-{3,}$/m;
    const dividerMatch = block.match(dividerRegex);

    if (!dividerMatch) {
      errors.push(
        `Card block ${i + 1}: missing "---" divider between front and back – skipped.`,
      );
      continue;
    }

    const dividerIndex = block.indexOf(dividerMatch[0]);
    const rawFront = block.slice(0, dividerIndex).trim();
    const rawBack = block.slice(dividerIndex + dividerMatch[0].length).trim();

    if (!rawFront) {
      errors.push(`Card block ${i + 1}: empty front – skipped.`);
      continue;
    }
    if (!rawBack) {
      errors.push(`Card block ${i + 1}: empty back – skipped.`);
      continue;
    }

    // Extract an optional topic from "# Heading" on first line of front
    let topic: string | undefined;
    let front = rawFront;
    const headingMatch = rawFront.match(/^#{1,3}\s+(.+)/);
    if (headingMatch) {
      topic = headingMatch[1].trim();
      front = rawFront.slice(headingMatch[0].length).trim();
      if (!front) front = topic; // if nothing else, repeat the heading as front text
    }

    cards.push({ front, back: rawBack, topic });
  }

  return { cards, errors };
}

// ─── Auto-detect ─────────────────────────────────────────────────────────────

export function detectFormat(input: string): "json" | "yaml" | "markdown" {
  const trimmed = input.trim();
  if (trimmed.startsWith("[") || trimmed.startsWith("{")) return "json";
  if (trimmed.startsWith("-") || trimmed.match(/^[a-zA-Z_]+:/m)) return "yaml";
  return "markdown";
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normaliseData(data: unknown, errors: string[]): Flashcard[] {
  if (!Array.isArray(data)) {
    errors.push("Expected a top-level array of card objects.");
    return [];
  }
  const cards: Flashcard[] = [];
  data.forEach((item: unknown, idx: number) => {
    if (typeof item !== "object" || item === null) {
      errors.push(`Item ${idx + 1}: not an object – skipped.`);
      return;
    }
    const obj = item as Record<string, unknown>;
    const front = String(obj.front ?? obj.question ?? obj.q ?? "").trim();
    const back = String(obj.back ?? obj.answer ?? obj.a ?? "").trim();
    const topic = obj.topic ? String(obj.topic).trim() : undefined;
    if (!front || !back) {
      errors.push(`Item ${idx + 1}: missing front/back fields – skipped.`);
      return;
    }
    cards.push({ front, back, topic });
  });
  return cards;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
