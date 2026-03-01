import type { Flashcard } from "../types";
import type { DeckInfo } from "../decks/index";
import type {
  PlayerState,
  GameState,
  GameSession,
  JudgmentType,
} from "./types";
import { CardStack, createCardId } from "./card-stack";
import {
  loadCardMemories,
  loadSettings,
  saveSettings,
  saveSession,
  saveHighScore,
  getHighScore,
  updateCardMemory,
} from "./storage";
import {
  updateScore,
  shouldShowMilestone,
  getSessionDuration,
} from "./scoring";
import {
  soundManager,
  initializeSounds,
  playFlipSound,
  playCorrectSound,
  playEasySound,
  playIncorrectSound,
  playStreakSound,
  playCompleteSound,
} from "./sounds";
import { renderPlayerUI, updatePlayerUI, destroyPlayerUI } from "./player-ui";

export class FlashcardPlayer {
  private state: PlayerState;
  private cardStack: CardStack | null = null;

  constructor() {
    const settings = loadSettings();
    const session: GameSession = {
      deckId: "",
      deckTitle: "",
      mode: settings.mode,
      startTime: Date.now(),
      score: 0,
      streak: 0,
      maxStreak: 0,
      cardsStudied: 0,
      cardsCorrect: 0,
      cardsIncorrect: 0,
      cardsEasy: 0,
      multiplier: 1,
    };

    this.state = {
      gameState: "idle",
      currentCard: null,
      currentCardIndex: 0,
      cardStack: [],
      reviewQueue: [],
      cardMemories: loadCardMemories(),
      session,
      settings,
      isFlipped: false,
    };

    // Initialize sounds
    initializeSounds();
    soundManager.setEnabled(settings.soundEnabled);
    soundManager.setVolume(settings.soundVolume);
  }

  start(deck: DeckInfo): void {
    this.state.cardStack = [...deck.cards];
    this.state.session.deckId = deck.id || deck.title;
    this.state.session.deckTitle = deck.title;
    this.state.session.startTime = Date.now();

    this.cardStack = new CardStack(
      this.state.cardStack,
      this.state.cardMemories,
      this.state.settings.mode,
    );

    this.state.currentCard = this.cardStack.getCurrentCard();
    this.state.gameState = "intro";
    this.state.isFlipped = false;

    renderPlayerUI(this.state, this.getCallbacks());

    // Auto-transition to playing after brief intro
    setTimeout(() => {
      this.setState("playing");
    }, 1500);
  }

  private setState(newState: GameState): void {
    this.state.gameState = newState;
    updatePlayerUI(this.state);
  }

  flip(): void {
    if (
      this.state.gameState !== "playing" &&
      this.state.gameState !== "flipped"
    ) {
      return;
    }

    this.state.isFlipped = !this.state.isFlipped;

    if (this.state.settings.soundEnabled) {
      playFlipSound();
    }

    this.setState(this.state.isFlipped ? "flipped" : "playing");
  }

  judge(judgment: JudgmentType): void {
    if (!this.cardStack || !this.state.currentCard) return;
    if (this.state.gameState !== "flipped") {
      // Auto-flip if not already flipped
      if (!this.state.isFlipped) {
        this.flip();
      }
      return;
    }

    this.setState("judging");

    // Update memory
    const cardId = createCardId(this.state.currentCard);
    const correct = judgment !== "wrong";
    const easy = judgment === "easy";
    updateCardMemory(cardId, correct, easy, this.state.cardMemories);

    // Update score and check for milestones
    const { pointsEarned, previousStreak, newMultiplier } = updateScore(
      this.state.session,
      judgment,
    );

    // Play sounds
    if (this.state.settings.soundEnabled) {
      if (judgment === "easy") {
        playEasySound();
      } else if (judgment === "correct") {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }

      if (shouldShowMilestone(this.state.session.streak)) {
        playStreakSound(this.state.session.streak);
      }
    }

    // Mark card in stack
    this.cardStack.markCard(correct);

    // Move to next card
    setTimeout(() => {
      this.nextCard();
    }, 400);
  }

  private nextCard(): void {
    if (!this.cardStack) return;

    if (!this.cardStack.hasNext()) {
      this.complete();
      return;
    }

    this.state.currentCard = this.cardStack.getCurrentCard();
    this.state.isFlipped = false;
    this.setState("playing");
  }

  pause(): void {
    if (
      this.state.gameState === "playing" ||
      this.state.gameState === "flipped"
    ) {
      this.setState("paused");
    } else if (this.state.gameState === "paused") {
      this.setState("playing");
    }
  }

  complete(): void {
    this.state.session.endTime = Date.now();
    this.setState("complete");

    // Play completion sound
    if (this.state.settings.soundEnabled) {
      playCompleteSound();
    }

    // Save session
    saveSession(this.state.session);

    // Update high score
    saveHighScore(
      this.state.session.deckId,
      this.state.session.score,
      this.state.session.maxStreak,
    );

    // Show results after brief delay
    setTimeout(() => {
      this.setState("results");
    }, 1000);
  }

  playAgain(): void {
    // Reset session
    const newSession: GameSession = {
      deckId: this.state.session.deckId,
      deckTitle: this.state.session.deckTitle,
      mode: this.state.settings.mode,
      startTime: Date.now(),
      score: 0,
      streak: 0,
      maxStreak: 0,
      cardsStudied: 0,
      cardsCorrect: 0,
      cardsIncorrect: 0,
      cardsEasy: 0,
      multiplier: 1,
    };

    this.state.session = newSession;
    this.state.isFlipped = false;

    this.cardStack = new CardStack(
      this.state.cardStack,
      this.state.cardMemories,
      this.state.settings.mode,
    );

    this.state.currentCard = this.cardStack.getCurrentCard();
    this.setState("intro");

    setTimeout(() => {
      this.setState("playing");
    }, 1000);
  }

  close(): void {
    destroyPlayerUI();
  }

  updateSettings(newSettings: Partial<typeof this.state.settings>): void {
    this.state.settings = { ...this.state.settings, ...newSettings };
    saveSettings(this.state.settings);

    soundManager.setEnabled(this.state.settings.soundEnabled);
    soundManager.setVolume(this.state.settings.soundVolume);

    updatePlayerUI(this.state);
  }

  getState(): PlayerState {
    return this.state;
  }

  getProgress(): { current: number; total: number; percentage: number } {
    if (!this.cardStack) {
      return { current: 0, total: 0, percentage: 0 };
    }
    return this.cardStack.getProgress();
  }

  getHighScore(): { bestScore: number; bestStreak: number } | null {
    const high = getHighScore(this.state.session.deckId);
    if (!high) return null;
    return { bestScore: high.bestScore, bestStreak: high.bestStreak };
  }

  private getCallbacks() {
    return {
      onFlip: () => this.flip(),
      onJudge: (judgment: JudgmentType) => this.judge(judgment),
      onPause: () => this.pause(),
      onClose: () => this.close(),
      onPlayAgain: () => this.playAgain(),
      onSettings: (settings: Partial<typeof this.state.settings>) =>
        this.updateSettings(settings),
    };
  }
}

// Global player instance
let playerInstance: FlashcardPlayer | null = null;

export function startPlayer(deck: DeckInfo): void {
  if (playerInstance) {
    playerInstance.close();
  }
  playerInstance = new FlashcardPlayer();
  playerInstance.start(deck);
}

export function getPlayer(): FlashcardPlayer | null {
  return playerInstance;
}

export function closePlayer(): void {
  if (playerInstance) {
    playerInstance.close();
    playerInstance = null;
  }
}
