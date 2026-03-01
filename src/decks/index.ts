import { BIG_O_DATA_STRUCTURES } from "./big-o-data-structures";
import { BIG_O_ALGORITHMS } from "./big-o-algorithms";
import { BIG_O_CONTROL_STRUCTURES } from "./big-o-control-structures";
import { DSA_PRACTICAL_USES } from "./dsa-practical-uses";
import { LEETCODE_PATTERNS } from "./leetcode-patterns";
import { LEETCODE_PROBLEMS } from "./leetcode-problems";
import { ADVANCED_DATA_STRUCTURES } from "./advanced-data-structures";
import { ADVANCED_ALGORITHMS } from "./advanced-algorithms";
import { SYSTEM_DESIGN } from "./system-design";
import { CONCURRENCY_PARALLELISM } from "./concurrency-parallelism";
import { DATABASE_INTERNALS } from "./database-internals";
import { OOP_DESIGN } from "./oop-design";
import { BEHAVIORAL_INTERVIEW } from "./behavioral-interview";
import { SYSTEM_DESIGN_ESTIMATION } from "./system-design-estimation";
import { NETWORKING_FUNDAMENTALS } from "./networking-fundamentals";
import { OPERATING_SYSTEMS } from "./operating-systems";
import { DESIGN_PATTERNS } from "./design-patterns";
import { API_DESIGN } from "./api-design";
import { SECURITY_FUNDAMENTALS } from "./security-fundamentals";
import { DISTRIBUTED_SYSTEMS_DEEP } from "./distributed-systems-deep";
import { LEETCODE_PROBLEMS_EXTENDED } from "./leetcode-problems-extended";
import type { DeckInfo } from "./types";
import { LEVEL_ORDER } from "./types";

export type { DeckInfo } from "./types";
export { LEVEL_LABELS, LEVEL_ORDER } from "./types";
export type { DeckLevel } from "./types";

/** All available decks, sorted by level then title */
export const DECK_LIBRARY: DeckInfo[] = [
  BIG_O_DATA_STRUCTURES,
  BIG_O_ALGORITHMS,
  BIG_O_CONTROL_STRUCTURES,
  DSA_PRACTICAL_USES,
  LEETCODE_PATTERNS,
  LEETCODE_PROBLEMS,
  ADVANCED_DATA_STRUCTURES,
  ADVANCED_ALGORITHMS,
  SYSTEM_DESIGN,
  CONCURRENCY_PARALLELISM,
  DATABASE_INTERNALS,
  OOP_DESIGN,
  BEHAVIORAL_INTERVIEW,
  SYSTEM_DESIGN_ESTIMATION,
  NETWORKING_FUNDAMENTALS,
  OPERATING_SYSTEMS,
  DESIGN_PATTERNS,
  API_DESIGN,
  SECURITY_FUNDAMENTALS,
  DISTRIBUTED_SYSTEMS_DEEP,
  LEETCODE_PROBLEMS_EXTENDED,
].sort((a, b) => {
  const la = LEVEL_ORDER.indexOf(a.level);
  const lb = LEVEL_ORDER.indexOf(b.level);
  if (la !== lb) return la - lb;
  return a.title.localeCompare(b.title);
});

/** Group decks by level for UI rendering */
export function getDecksByLevel(): Map<string, DeckInfo[]> {
  const grouped = new Map<string, DeckInfo[]>();
  for (const deck of DECK_LIBRARY) {
    const existing = grouped.get(deck.level) ?? [];
    existing.push(deck);
    grouped.set(deck.level, existing);
  }
  return grouped;
}

/** Get total card count across all decks */
export function getTotalCardCount(): number {
  return DECK_LIBRARY.reduce((sum, d) => sum + d.cards.length, 0);
}

// Re-export individual decks for direct imports
export {
  BIG_O_DATA_STRUCTURES,
  BIG_O_ALGORITHMS,
  BIG_O_CONTROL_STRUCTURES,
  DSA_PRACTICAL_USES,
  LEETCODE_PATTERNS,
  LEETCODE_PROBLEMS,
  ADVANCED_DATA_STRUCTURES,
  ADVANCED_ALGORITHMS,
  SYSTEM_DESIGN,
  CONCURRENCY_PARALLELISM,
  DATABASE_INTERNALS,
  OOP_DESIGN,
  BEHAVIORAL_INTERVIEW,
  SYSTEM_DESIGN_ESTIMATION,
  NETWORKING_FUNDAMENTALS,
  OPERATING_SYSTEMS,
  DESIGN_PATTERNS,
  API_DESIGN,
  SECURITY_FUNDAMENTALS,
  DISTRIBUTED_SYSTEMS_DEEP,
  LEETCODE_PROBLEMS_EXTENDED,
};
