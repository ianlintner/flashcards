import type { PlayerState, JudgmentType } from "./types";
import { GestureDetector } from "./gestures";
import {
  flipCard,
  swipeCard,
  shakeCard,
  pulseCard,
  showConfetti,
  updateDragPosition,
  resetCardPosition,
  setCardTint,
} from "./animations";
import {
  shouldShowMilestone,
  getMilestoneMessage,
  getAccuracy,
  formatTime,
  getSessionDuration,
} from "./scoring";

interface PlayerCallbacks {
  onFlip: () => void;
  onJudge: (judgment: JudgmentType) => void;
  onPause: () => void;
  onClose: () => void;
  onPlayAgain: () => void;
  onSettings: (settings: any) => void;
}

let overlayElement: HTMLElement | null = null;
let cardElement: HTMLElement | null = null;
let gestureDetector: GestureDetector | null = null;
let callbacks: PlayerCallbacks | null = null;
let previousState: PlayerState | null = null;

export function renderPlayerUI(state: PlayerState, cbs: PlayerCallbacks): void {
  callbacks = cbs;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "player-overlay";
  overlay.className = "player-overlay";
  overlay.innerHTML = getOverlayHTML(state);

  document.body.appendChild(overlay);
  overlayElement = overlay;

  // Get card element
  cardElement = overlay.querySelector(".player-card") as HTMLElement;

  // Setup gesture detector
  if (cardElement) {
    gestureDetector = new GestureDetector(cardElement);
    gestureDetector.onMove((deltaX, deltaY) => {
      if (!cardElement || state.gameState !== "flipped") return;
      updateDragPosition(cardElement, deltaX, deltaY);

      // Show tint based on direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < -50) {
          setCardTint(cardElement, "red");
        } else if (deltaX > 50) {
          setCardTint(cardElement, "green");
        } else {
          setCardTint(cardElement, null);
        }
      } else if (deltaY > 50) {
        setCardTint(cardElement, "gold");
      }
    });

    gestureDetector.onEnd((result) => {
      if (!cardElement) return;
      resetCardPosition(cardElement);
      setCardTint(cardElement, null);

      if (state.gameState !== "flipped") return;

      if (result.direction === "left") {
        callbacks?.onJudge("wrong");
      } else if (result.direction === "right") {
        callbacks?.onJudge("correct");
      } else if (result.direction === "down") {
        callbacks?.onJudge("easy");
      }
    });
  }

  // Bind events
  bindPlayerEvents();

  // Keyboard handler
  document.addEventListener("keydown", handleKeyDown);

  // Initial update
  updatePlayerUI(state);
  previousState = structuredClone(state);

  // Show intro animation
  requestAnimationFrame(() => {
    overlay.classList.add("active");
  });
}

export function updatePlayerUI(state: PlayerState): void {
  if (!overlayElement) return;

  // Update score
  const scoreEl = overlayElement.querySelector(".player-score");
  if (scoreEl) {
    scoreEl.textContent = state.session.score.toString();
  }

  // Update streak
  const streakEl = overlayElement.querySelector(".player-streak");
  if (streakEl) {
    streakEl.textContent = `${state.session.streak} 🔥`;
  }

  // Update multiplier
  const multEl = overlayElement.querySelector(".player-multiplier");
  if (multEl) {
    multEl.textContent = `${state.session.multiplier}x`;
    multEl.className = `player-multiplier mult-${state.session.multiplier}x`;
  }

  // Update progress
  const progressBar = overlayElement.querySelector(
    ".player-progress-bar",
  ) as HTMLElement;
  if (progressBar && state.cardStack.length > 0) {
    const percentage =
      (state.session.cardsStudied / state.cardStack.length) * 100 || 0;
    progressBar.style.width = `${percentage}%`;
  }

  // Update card content
  if (state.currentCard && cardElement) {
    const frontSide = cardElement.querySelector(".player-card__front");
    const backSide = cardElement.querySelector(".player-card__back");

    if (frontSide) {
      frontSide.innerHTML = `
        ${state.currentCard.topic ? `<div class="card-topic">${escapeHTML(state.currentCard.topic)}</div>` : ""}
        <div class="card-content">${escapeHTML(state.currentCard.front).replace(/\n/g, "<br>")}</div>
      `;
    }

    if (backSide) {
      backSide.innerHTML = `
        ${state.currentCard.topic ? `<div class="card-topic">${escapeHTML(state.currentCard.topic)}</div>` : ""}
        <div class="card-content">${escapeHTML(state.currentCard.back).replace(/\n/g, "<br>")}</div>
      `;
    }
  }

  // Handle state transitions
  if (previousState && previousState.gameState !== state.gameState) {
    handleStateTransition(previousState.gameState, state.gameState, state);
  }

  // Handle flip animation
  if (
    previousState &&
    previousState.isFlipped !== state.isFlipped &&
    cardElement
  ) {
    flipCard(cardElement).then(() => {
      cardElement!.classList.toggle("flipped", state.isFlipped);
    });
  }

  // Check for milestones
  if (
    previousState &&
    shouldShowMilestone(state.session.streak) &&
    state.session.streak > previousState.session.streak
  ) {
    showMilestoneNotification(state.session.streak);
  }

  // Update state visibility
  overlayElement.setAttribute("data-state", state.gameState);

  previousState = structuredClone(state);
}

function handleStateTransition(
  from: PlayerState["gameState"],
  to: PlayerState["gameState"],
  state: PlayerState,
): void {
  if (to === "judging" && cardElement) {
    // Will be handled by judgment animations in player.ts
  }

  if (to === "complete") {
    setTimeout(() => showConfetti(), 300);
  }

  if (to === "results") {
    renderResults(state);
  }
}

function renderResults(state: PlayerState): void {
  if (!overlayElement) return;

  const resultsContainer = overlayElement.querySelector(".player-results");
  if (!resultsContainer) return;

  const accuracy = getAccuracy(state.session);
  const duration = getSessionDuration(state.session);

  resultsContainer.innerHTML = `
    <div class="results-header">
      <h2>🎉 Session Complete!</h2>
      <p>${escapeHTML(state.session.deckTitle)}</p>
    </div>
    
    <div class="results-stats">
      <div class="stat-card">
        <div class="stat-value">${state.session.score}</div>
        <div class="stat-label">Final Score</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">${state.session.maxStreak}</div>
        <div class="stat-label">Best Streak</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">${Math.round(accuracy * 100)}%</div>
        <div class="stat-label">Accuracy</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">${formatTime(duration)}</div>
        <div class="stat-label">Time</div>
      </div>
    </div>
    
    <div class="results-breakdown">
      <div class="breakdown-item">
        <span class="breakdown-label">Easy</span>
        <span class="breakdown-value easy">${state.session.cardsEasy}</span>
      </div>
      <div class="breakdown-item">
        <span class="breakdown-label">Correct</span>
        <span class="breakdown-value correct">${state.session.cardsCorrect}</span>
      </div>
      <div class="breakdown-item">
        <span class="breakdown-label">Need Review</span>
        <span class="breakdown-value wrong">${state.session.cardsIncorrect}</span>
      </div>
    </div>
    
    <div class="results-actions">
      <button class="btn btn-primary btn-lg" id="play-again-btn">
        🔄 Play Again
      </button>
      <button class="btn btn-secondary btn-lg" id="results-close-btn">
        Done
      </button>
    </div>
  `;

  // Bind result actions
  const playAgainBtn = resultsContainer.querySelector("#play-again-btn");
  const closeBtn = resultsContainer.querySelector("#results-close-btn");

  playAgainBtn?.addEventListener("click", () => callbacks?.onPlayAgain());
  closeBtn?.addEventListener("click", () => callbacks?.onClose());
}

function showMilestoneNotification(streak: number): void {
  const message = getMilestoneMessage(streak);

  const notification = document.createElement("div");
  notification.className = "milestone-notification";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    showConfetti();
  }, 100);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function bindPlayerEvents(): void {
  if (!overlayElement) return;

  // Close button
  const closeBtn = overlayElement.querySelector(".player-close-btn");
  closeBtn?.addEventListener("click", () => callbacks?.onClose());

  // Flip button / card click
  cardElement?.addEventListener("click", () => {
    if (!callbacks) return;
    if (
      previousState?.gameState === "playing" ||
      previousState?.gameState === "flipped"
    ) {
      callbacks.onFlip();
    }
  });

  // Judgment buttons
  const wrongBtn = overlayElement.querySelector("#judge-wrong-btn");
  const correctBtn = overlayElement.querySelector("#judge-correct-btn");
  const easyBtn = overlayElement.querySelector("#judge-easy-btn");

  wrongBtn?.addEventListener("click", () => callbacks?.onJudge("wrong"));
  correctBtn?.addEventListener("click", () => callbacks?.onJudge("correct"));
  easyBtn?.addEventListener("click", () => callbacks?.onJudge("easy"));

  // Pause button
  const pauseBtn = overlayElement.querySelector(".player-pause-btn");
  pauseBtn?.addEventListener("click", () => callbacks?.onPause());
}

function handleKeyDown(e: KeyboardEvent): void {
  if (!callbacks || !previousState) return;

  const state = previousState.gameState;

  // ESC - close/pause
  if (e.key === "Escape") {
    if (state === "results") {
      callbacks.onClose();
    } else {
      callbacks.onPause();
    }
    return;
  }

  // Don't handle keys during intro or results
  if (state === "intro" || state === "complete" || state === "results") return;

  // SPACE / F - flip
  if (e.key === " " || e.key.toLowerCase() === "f") {
    e.preventDefault();
    callbacks.onFlip();
    return;
  }

  // Only allow judgments when flipped
  if (state !== "flipped") return;

  // Left arrow / 1 - wrong
  if (e.key === "ArrowLeft" || e.key === "1") {
    e.preventDefault();
    callbacks.onJudge("wrong");
  }
  // Right arrow / 2 - correct
  else if (e.key === "ArrowRight" || e.key === "2") {
    e.preventDefault();
    callbacks.onJudge("correct");
  }
  // Down arrow / 3 - easy
  else if (e.key === "ArrowDown" || e.key === "3") {
    e.preventDefault();
    callbacks.onJudge("easy");
  }
}

export function destroyPlayerUI(): void {
  // Remove keyboard listener
  document.removeEventListener("keydown", handleKeyDown);

  // Destroy gesture detector
  if (gestureDetector) {
    gestureDetector.destroy();
    gestureDetector = null;
  }

  // Remove overlay
  if (overlayElement) {
    overlayElement.classList.remove("active");
    setTimeout(() => {
      overlayElement?.remove();
      overlayElement = null;
      cardElement = null;
      callbacks = null;
      previousState = null;
    }, 300);
  }
}

function getOverlayHTML(state: PlayerState): string {
  return `
    <div class="player-container">
      <!-- Header -->
      <div class="player-header">
        <button class="player-close-btn" title="Close (ESC)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div class="player-stats">
          <div class="stat-item">
            <span class="stat-label">Score</span>
            <span class="player-score">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Streak</span>
            <span class="player-streak">0 🔥</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Multiplier</span>
            <span class="player-multiplier mult-1x">1x</span>
          </div>
        </div>
      </div>

      <!-- Card Display -->
      <div class="player-card-container">
        <div class="swipe-hint swipe-hint-left">
          <span>← Need Review</span>
        </div>
        
        <div class="player-card">
          <div class="player-card__front">
            <div class="card-content">Loading...</div>
          </div>
          <div class="player-card__back">
            <div class="card-content">Answer</div>
          </div>
        </div>
        
        <div class="swipe-hint swipe-hint-right">
          <span>Easy →</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="player-controls">
        <button class="btn btn-judgment btn-wrong" id="judge-wrong-btn" title="Need Review (← or 1)">
          <span class="btn-icon">❌</span>
          <span class="btn-text">Need Review</span>
        </button>
        
        <button class="btn btn-judgment btn-correct" id="judge-correct-btn" title="Got It! (→ or 2)">
          <span class="btn-icon">✓</span>
          <span class="btn-text">Got It!</span>
        </button>
        
        <button class="btn btn-judgment btn-easy" id="judge-easy-btn" title="Easy (↓ or 3)">
          <span class="btn-icon">⚡</span>
          <span class="btn-text">Easy</span>
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="player-progress">
        <div class="player-progress-bar"></div>
      </div>

      <!-- Results Screen (hidden by default) -->
      <div class="player-results"></div>

      <!-- Keyboard Hints -->
      <div class="keyboard-hints">
        SPACE: Flip • ← Need Review • → Got It! • ↓ Easy • ESC: Close
      </div>
    </div>
  `;
}

function escapeHTML(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
