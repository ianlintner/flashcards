import type { Flashcard } from "../types";
import type { CardMemory } from "./types";
import { getCardMemory } from "./storage";

export function createCardId(card: Flashcard): string {
  return `${card.topic || "notopic"}_${card.front.substring(0, 50)}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function sortByDifficulty(
  cards: Flashcard[],
  memories: Map<string, CardMemory>,
): Flashcard[] {
  return [...cards].sort((a, b) => {
    const memA = getCardMemory(createCardId(a), memories);
    const memB = getCardMemory(createCardId(b), memories);

    // Cards with lower ease factor (harder) come first
    return memA.easeFactor - memB.easeFactor;
  });
}

export function createReviewQueue(
  cards: Flashcard[],
  memories: Map<string, CardMemory>,
): Flashcard[] {
  const now = new Date();
  const dueCards = cards.filter((card) => {
    const memory = getCardMemory(createCardId(card), memories);
    return memory.nextReview <= now;
  });

  // Sort by ease factor (hardest first)
  return sortByDifficulty(dueCards, memories);
}

export class CardStack {
  private stack: Flashcard[];
  private reviewQueue: Flashcard[];
  private incorrectCards: Set<string>;
  private reinsertAfter: number;
  private currentIndex: number;

  constructor(
    cards: Flashcard[],
    private memories: Map<string, CardMemory>,
    private mode: "study" | "review" | "challenge" | "endless",
  ) {
    this.incorrectCards = new Set();
    this.reinsertAfter = 3; // Reshow incorrect cards after 3 correct cards
    this.currentIndex = 0;

    if (mode === "review") {
      // Only show cards due for review
      this.stack = createReviewQueue(cards, memories);
      this.reviewQueue = [];
    } else if (mode === "study") {
      // Mix of new and review cards, prioritize harder ones
      this.stack = sortByDifficulty(shuffleArray(cards), memories);
      this.reviewQueue = [];
    } else {
      // Challenge/Endless: shuffled
      this.stack = shuffleArray(cards);
      this.reviewQueue = [];
    }
  }

  getCurrentCard(): Flashcard | null {
    if (this.currentIndex < this.stack.length) {
      return this.stack[this.currentIndex];
    }
    if (this.reviewQueue.length > 0) {
      return this.reviewQueue[0];
    }
    return null;
  }

  getProgress(): { current: number; total: number; percentage: number } {
    const total = this.stack.length;
    const current = Math.min(this.currentIndex + 1, total);
    const percentage = total > 0 ? (current / total) * 100 : 0;
    return { current, total, percentage };
  }

  markCard(correct: boolean): void {
    const card = this.getCurrentCard();
    if (!card) return;

    const cardId = createCardId(card);

    if (!correct) {
      // Add to review queue if not already there
      if (!this.incorrectCards.has(cardId)) {
        this.incorrectCards.add(cardId);

        // Insert back into stack after N cards
        const insertPosition = Math.min(
          this.currentIndex + this.reinsertAfter + 1,
          this.stack.length,
        );
        this.stack.splice(insertPosition, 0, card);
      }
    } else {
      // Remove from incorrect set if it was there
      this.incorrectCards.delete(cardId);
    }

    this.advance();
  }

  advance(): void {
    // Move to next card in main stack or review queue
    if (this.currentIndex < this.stack.length - 1) {
      this.currentIndex++;
    } else if (this.reviewQueue.length > 0) {
      this.reviewQueue.shift();
    } else {
      this.currentIndex++;
    }
  }

  hasNext(): boolean {
    return this.currentIndex < this.stack.length || this.reviewQueue.length > 0;
  }

  getRemainingCount(): number {
    const mainRemaining = Math.max(0, this.stack.length - this.currentIndex);
    return mainRemaining + this.reviewQueue.length;
  }

  reset(): void {
    this.currentIndex = 0;
    this.reviewQueue = [];
    this.incorrectCards.clear();
  }
}
