import type { Flashcard } from "../types";

export type GameState =
  | "idle"
  | "intro"
  | "playing"
  | "flipped"
  | "judging"
  | "paused"
  | "complete"
  | "results";

export type GameMode = "study" | "review" | "challenge" | "endless";

export type JudgmentType = "wrong" | "correct" | "easy";

export interface CardMemory {
  cardId: string;
  easeFactor: number; // 1.3 to 2.5
  interval: number; // Days until next review
  repetitions: number; // Consecutive correct answers
  nextReview: Date;
  lastSeen: Date;
  correctCount: number;
  incorrectCount: number;
}

export interface GameSession {
  deckId: string;
  deckTitle: string;
  mode: GameMode;
  startTime: number;
  endTime?: number;
  score: number;
  streak: number;
  maxStreak: number;
  cardsStudied: number;
  cardsCorrect: number;
  cardsIncorrect: number;
  cardsEasy: number;
  multiplier: number;
}

export interface PlayerSettings {
  mode: GameMode;
  targetCards?: number;
  timeLimit?: number;
  soundEnabled: boolean;
  soundVolume: number; // 0-100
  animationsEnabled: boolean;
  hapticFeedback: boolean;
  autoFlip: boolean;
  autoFlipDelay: number;
  showTimer: boolean;
  showProgress: boolean;
}

export interface PlayerState {
  gameState: GameState;
  currentCard: Flashcard | null;
  currentCardIndex: number;
  cardStack: Flashcard[];
  reviewQueue: Flashcard[];
  cardMemories: Map<string, CardMemory>;
  session: GameSession;
  settings: PlayerSettings;
  isFlipped: boolean;
}

export interface HighScore {
  deckId: string;
  bestScore: number;
  bestStreak: number;
  date: string;
}

export interface SessionHistory {
  sessions: GameSession[];
  totalCardsStudied: number;
  totalTimeSpent: number;
  averageAccuracy: number;
}
