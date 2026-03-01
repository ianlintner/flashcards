import type { GameSession, JudgmentType } from "./types";

const POINTS = {
  WRONG: 0,
  CORRECT: 10,
  EASY: 25,
} as const;

const STREAK_THRESHOLDS = {
  LEVEL_1: 5, // 2x
  LEVEL_2: 10, // 3x
  LEVEL_3: 20, // 4x
  LEVEL_4: 50, // 5x
} as const;

export function calculateMultiplier(streak: number): number {
  if (streak >= STREAK_THRESHOLDS.LEVEL_4) return 5;
  if (streak >= STREAK_THRESHOLDS.LEVEL_3) return 4;
  if (streak >= STREAK_THRESHOLDS.LEVEL_2) return 3;
  if (streak >= STREAK_THRESHOLDS.LEVEL_1) return 2;
  return 1;
}

export function updateScore(
  session: GameSession,
  judgment: JudgmentType,
): { pointsEarned: number; previousStreak: number; newMultiplier: boolean } {
  const previousStreak = session.streak;
  const previousMultiplier = session.multiplier;

  session.cardsStudied++;

  if (judgment === "wrong") {
    session.cardsIncorrect++;
    session.streak = 0;
    session.multiplier = 1;
    return { pointsEarned: 0, previousStreak, newMultiplier: false };
  }

  // Correct or Easy
  session.streak++;
  session.maxStreak = Math.max(session.maxStreak, session.streak);

  if (judgment === "easy") {
    session.cardsEasy++;
  } else {
    session.cardsCorrect++;
  }

  // Calculate multiplier
  session.multiplier = calculateMultiplier(session.streak);
  const newMultiplier = session.multiplier > previousMultiplier;

  // Award points
  const basePoints = judgment === "easy" ? POINTS.EASY : POINTS.CORRECT;
  const pointsEarned = basePoints * session.multiplier;
  session.score += pointsEarned;

  return { pointsEarned, previousStreak, newMultiplier };
}

export function getAccuracy(session: GameSession): number {
  if (session.cardsStudied === 0) return 0;
  const correct = session.cardsCorrect + session.cardsEasy;
  return correct / session.cardsStudied;
}

export function getSessionDuration(session: GameSession): number {
  const end = session.endTime || Date.now();
  return Math.floor((end - session.startTime) / 1000);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function shouldShowMilestone(streak: number): boolean {
  return (
    streak === STREAK_THRESHOLDS.LEVEL_1 ||
    streak === STREAK_THRESHOLDS.LEVEL_2 ||
    streak === STREAK_THRESHOLDS.LEVEL_3 ||
    streak === STREAK_THRESHOLDS.LEVEL_4
  );
}

export function getMilestoneMessage(streak: number): string {
  switch (streak) {
    case STREAK_THRESHOLDS.LEVEL_1:
      return "🔥 5 Streak! 2x Multiplier!";
    case STREAK_THRESHOLDS.LEVEL_2:
      return "🔥🔥 10 Streak! 3x Multiplier!";
    case STREAK_THRESHOLDS.LEVEL_3:
      return "🔥🔥🔥 20 Streak! 4x Multiplier!";
    case STREAK_THRESHOLDS.LEVEL_4:
      return "🔥🔥🔥🔥 50 STREAK! 5x MULTIPLIER!!!";
    default:
      return "";
  }
}
