// ─── Deck search & filter engine ─────────────────────────────────────────────

import type { DeckInfo, DeckLevel } from "../decks/types";

export interface FilterState {
  search: string;
  categories: Set<string>;
  levels: Set<DeckLevel>;
  sortBy: SortOption;
}

export type SortOption =
  | "alpha-asc"
  | "alpha-desc"
  | "cards-most"
  | "cards-fewest"
  | "level-easy"
  | "level-hard";

const LEVEL_RANK: Record<DeckLevel, number> = {
  foundation: 0,
  intermediate: 1,
  advanced: 2,
  "senior-staff": 3,
  "staff-principal": 4,
};

export function createDefaultFilter(): FilterState {
  return {
    search: "",
    categories: new Set<string>(),
    levels: new Set<DeckLevel>(),
    sortBy: "level-easy",
  };
}

/** Filter and sort decks based on current filter state */
export function filterDecks(
  decks: readonly DeckInfo[],
  filter: FilterState,
): DeckInfo[] {
  let results = [...decks];

  // Text search
  if (filter.search.trim()) {
    const query = filter.search.toLowerCase().trim();
    const terms = query.split(/\s+/);
    results = results.filter((deck) => {
      const searchable = [
        deck.title,
        deck.description,
        deck.category,
        ...(deck.tags ?? []),
        ...deck.cards.map((c) => c.topic ?? ""),
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => searchable.includes(term));
    });
  }

  // Category filter
  if (filter.categories.size > 0) {
    results = results.filter((d) => filter.categories.has(d.category));
  }

  // Level filter
  if (filter.levels.size > 0) {
    results = results.filter((d) => filter.levels.has(d.level));
  }

  // Sort
  results.sort((a, b) => {
    switch (filter.sortBy) {
      case "alpha-asc":
        return a.title.localeCompare(b.title);
      case "alpha-desc":
        return b.title.localeCompare(a.title);
      case "cards-most":
        return b.cards.length - a.cards.length;
      case "cards-fewest":
        return a.cards.length - b.cards.length;
      case "level-easy": {
        const diff = LEVEL_RANK[a.level] - LEVEL_RANK[b.level];
        return diff !== 0 ? diff : a.title.localeCompare(b.title);
      }
      case "level-hard": {
        const diff = LEVEL_RANK[b.level] - LEVEL_RANK[a.level];
        return diff !== 0 ? diff : a.title.localeCompare(b.title);
      }
      default:
        return 0;
    }
  });

  return results;
}

/** Get unique categories from deck library */
export function getCategories(decks: readonly DeckInfo[]): string[] {
  const cats = new Set<string>();
  for (const d of decks) cats.add(d.category);
  return [...cats].sort();
}
