import type {
  CardMemory,
  GameSession,
  PlayerSettings,
  HighScore,
  SessionHistory,
  GameMode,
} from "./types";

const KEYS = {
  MEMORIES: "flashcards_player_memories",
  SESSIONS: "flashcards_player_sessions",
  SETTINGS: "flashcards_player_settings",
  HIGHSCORES: "flashcards_player_highscores",
} as const;

const DEFAULT_SETTINGS: PlayerSettings = {
  mode: "study",
  targetCards: 20,
  soundEnabled: true,
  soundVolume: 70,
  animationsEnabled: true,
  hapticFeedback: true,
  autoFlip: false,
  autoFlipDelay: 3,
  showTimer: true,
  showProgress: true,
};

// ─── Card Memories ────────────────────────────────────────────────────────────

export function loadCardMemories(): Map<string, CardMemory> {
  try {
    const data = localStorage.getItem(KEYS.MEMORIES);
    if (!data) return new Map();

    const obj = JSON.parse(data);
    const map = new Map<string, CardMemory>();

    for (const [key, value] of Object.entries(obj)) {
      const mem = value as CardMemory;
      mem.nextReview = new Date(mem.nextReview);
      mem.lastSeen = new Date(mem.lastSeen);
      map.set(key, mem);
    }

    return map;
  } catch (err) {
    console.error("Failed to load card memories:", err);
    return new Map();
  }
}

export function saveCardMemories(memories: Map<string, CardMemory>): void {
  try {
    const obj: Record<string, CardMemory> = {};
    for (const [key, value] of memories.entries()) {
      obj[key] = value;
    }
    localStorage.setItem(KEYS.MEMORIES, JSON.stringify(obj));
  } catch (err) {
    console.error("Failed to save card memories:", err);
  }
}

export function getCardMemory(
  cardId: string,
  memories: Map<string, CardMemory>,
): CardMemory {
  const existing = memories.get(cardId);
  if (existing) return existing;

  // New card
  return {
    cardId,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReview: new Date(),
    lastSeen: new Date(),
    correctCount: 0,
    incorrectCount: 0,
  };
}

export function updateCardMemory(
  cardId: string,
  correct: boolean,
  easy: boolean,
  memories: Map<string, CardMemory>,
): void {
  const memory = getCardMemory(cardId, memories);
  memory.lastSeen = new Date();

  if (correct) {
    memory.correctCount++;
    memory.repetitions++;

    if (easy) {
      // Easy: double interval, max ease factor
      memory.interval = Math.max(1, memory.interval * 2);
      memory.easeFactor = Math.min(2.5, memory.easeFactor + 0.15);
    } else {
      // Correct: increase interval, slight ease boost
      memory.interval = Math.max(
        1,
        Math.round(memory.interval * memory.easeFactor),
      );
      memory.easeFactor = Math.min(2.5, memory.easeFactor + 0.1);
    }
  } else {
    // Incorrect: reset to beginning, reduce ease
    memory.incorrectCount++;
    memory.repetitions = 0;
    memory.interval = 1;
    memory.easeFactor = Math.max(1.3, memory.easeFactor - 0.2);
  }

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + memory.interval);
  memory.nextReview = nextReview;

  memories.set(cardId, memory);
  saveCardMemories(memories);
}

// ─── Session History ──────────────────────────────────────────────────────────

export function saveSession(session: GameSession): void {
  try {
    const data = localStorage.getItem(KEYS.SESSIONS);
    const sessions: GameSession[] = data ? JSON.parse(data) : [];
    sessions.push(session);

    // Keep only last 100 sessions
    if (sessions.length > 100) {
      sessions.splice(0, sessions.length - 100);
    }

    localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (err) {
    console.error("Failed to save session:", err);
  }
}

export function loadSessionHistory(deckId?: string): SessionHistory {
  try {
    const data = localStorage.getItem(KEYS.SESSIONS);
    if (!data) {
      return {
        sessions: [],
        totalCardsStudied: 0,
        totalTimeSpent: 0,
        averageAccuracy: 0,
      };
    }

    let sessions: GameSession[] = JSON.parse(data);

    if (deckId) {
      sessions = sessions.filter((s) => s.deckId === deckId);
    }

    const totalCardsStudied = sessions.reduce(
      (sum, s) => sum + s.cardsStudied,
      0,
    );
    const totalTimeSpent = sessions.reduce(
      (sum, s) => sum + ((s.endTime || s.startTime) - s.startTime),
      0,
    );

    const totalCorrect = sessions.reduce(
      (sum, s) => sum + s.cardsCorrect + s.cardsEasy,
      0,
    );
    const totalAttempts = sessions.reduce((sum, s) => sum + s.cardsStudied, 0);
    const averageAccuracy =
      totalAttempts > 0 ? totalCorrect / totalAttempts : 0;

    return {
      sessions,
      totalCardsStudied,
      totalTimeSpent,
      averageAccuracy,
    };
  } catch (err) {
    console.error("Failed to load session history:", err);
    return {
      sessions: [],
      totalCardsStudied: 0,
      totalTimeSpent: 0,
      averageAccuracy: 0,
    };
  }
}

// ─── High Scores ──────────────────────────────────────────────────────────────

export function loadHighScores(): Map<string, HighScore> {
  try {
    const data = localStorage.getItem(KEYS.HIGHSCORES);
    if (!data) return new Map();

    const obj = JSON.parse(data);
    return new Map(Object.entries(obj));
  } catch (err) {
    console.error("Failed to load high scores:", err);
    return new Map();
  }
}

export function saveHighScore(
  deckId: string,
  score: number,
  streak: number,
): void {
  try {
    const highScores = loadHighScores();
    const existing = highScores.get(deckId);

    if (
      !existing ||
      score > existing.bestScore ||
      streak > existing.bestStreak
    ) {
      highScores.set(deckId, {
        deckId,
        bestScore: existing ? Math.max(score, existing.bestScore) : score,
        bestStreak: existing ? Math.max(streak, existing.bestStreak) : streak,
        date: new Date().toISOString(),
      });

      const obj: Record<string, HighScore> = {};
      for (const [key, value] of highScores.entries()) {
        obj[key] = value;
      }
      localStorage.setItem(KEYS.HIGHSCORES, JSON.stringify(obj));
    }
  } catch (err) {
    console.error("Failed to save high score:", err);
  }
}

export function getHighScore(deckId: string): HighScore | null {
  const highScores = loadHighScores();
  return highScores.get(deckId) || null;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export function loadSettings(): PlayerSettings {
  try {
    const data = localStorage.getItem(KEYS.SETTINGS);
    if (!data) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch (err) {
    console.error("Failed to load settings:", err);
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: PlayerSettings): void {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error("Failed to save settings:", err);
  }
}
