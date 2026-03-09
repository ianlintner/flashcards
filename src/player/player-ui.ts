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
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "player-dialog-title");
  overlay.setAttribute(
    "aria-describedby",
    "player-screenreader-help player-card-status",
  );
  overlay.tabIndex = -1;
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
    overlay.focus();
  });
}

export function updatePlayerUI(state: PlayerState): void {
  if (!overlayElement) return;

  const cardChanged = didCardChange(
    previousState?.currentCard ?? null,
    state.currentCard,
  );

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
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute(
      "aria-valuemax",
      state.cardStack.length.toString(),
    );
    progressBar.setAttribute(
      "aria-valuenow",
      Math.min(state.session.cardsStudied, state.cardStack.length).toString(),
    );
    progressBar.setAttribute(
      "aria-label",
      `Studied ${state.session.cardsStudied} of ${state.cardStack.length} cards`,
    );
  }

  // Update card content
  if (state.currentCard && cardElement) {
    const renderCardContent = (): void => {
      const frontSide = cardElement?.querySelector(".player-card__front");
      const backSide = cardElement?.querySelector(".player-card__back");

      if (frontSide) {
        const frontText = escapeHTML(state.currentCard!.front);
        const frontSizeClass = getTextSizeClass(frontText);
        frontSide.innerHTML = `
          <div class="card-inner">
            ${state.currentCard!.topic ? `<div class="card-topic">${escapeHTML(state.currentCard!.topic)}</div>` : ""}
            <div class="card-content ${frontSizeClass}">${frontText.replace(/\n/g, "<br>")}</div>
          </div>
        `;
      }

      if (backSide) {
        const backText = escapeHTML(state.currentCard!.back);
        const backSizeClass = getTextSizeClass(backText);
        backSide.innerHTML = `
          <div class="card-inner">
            ${state.currentCard!.topic ? `<div class="card-topic">${escapeHTML(state.currentCard!.topic)}</div>` : ""}
            <div class="card-content ${backSizeClass}">${backText.replace(/\n/g, "<br>")}</div>
          </div>
        `;
      }
    };

    if (cardChanged) {
      resetCardForState(cardElement, state.isFlipped, renderCardContent);
    } else {
      renderCardContent();
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
    cardElement &&
    !cardChanged
  ) {
    void flipCard(cardElement, state.isFlipped);
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

  updateJudgmentButtons(state);
  updateAccessibility(state, cardChanged);

  previousState = structuredClone(state);
}

function updateJudgmentButtons(state: PlayerState): void {
  if (!overlayElement) return;

  const canJudgeCorrectOrEasy =
    state.gameState === "playing" || state.gameState === "flipped";
  const canJudgeWrong = state.gameState === "flipped" && state.isFlipped;

  setButtonEnabled("#judge-wrong-btn", canJudgeWrong);
  setButtonEnabled("#judge-correct-btn", canJudgeCorrectOrEasy);
  setButtonEnabled("#judge-easy-btn", canJudgeCorrectOrEasy);
}

function setButtonEnabled(selector: string, enabled: boolean): void {
  const button = overlayElement?.querySelector(selector);
  if (!(button instanceof HTMLButtonElement)) return;

  if (enabled) {
    button.removeAttribute("disabled");
    button.classList.remove("disabled");
    return;
  }

  button.setAttribute("disabled", "true");
  button.classList.add("disabled");
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
      <button class="btn btn-primary btn-lg" type="button" id="play-again-btn">
        🔄 Play Again
      </button>
      <button class="btn btn-secondary btn-lg" type="button" id="results-close-btn">
        Done
      </button>
    </div>
  `;

  // Bind result actions
  const playAgainBtn = resultsContainer.querySelector("#play-again-btn");
  const closeBtn = resultsContainer.querySelector("#results-close-btn");

  playAgainBtn?.addEventListener("click", () => callbacks?.onPlayAgain());
  closeBtn?.addEventListener("click", () => callbacks?.onClose());
  if (playAgainBtn instanceof HTMLButtonElement) {
    playAgainBtn.focus();
  }
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

  wrongBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    callbacks?.onJudge("wrong");
  });
  correctBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    callbacks?.onJudge("correct");
  });
  easyBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    callbacks?.onJudge("easy");
  });

  // Pause button
  const pauseBtn = overlayElement.querySelector(".player-pause-btn");
  pauseBtn?.addEventListener("click", () => callbacks?.onPause());
}

function handleKeyDown(e: KeyboardEvent): void {
  if (!callbacks || !previousState) return;

  const target = e.target instanceof HTMLElement ? e.target : null;
  if (
    target &&
    target !== cardElement &&
    ["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"].includes(target.tagName)
  ) {
    return;
  }

  const state = previousState.gameState;
  const isFlipped = previousState.isFlipped;

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

  // SPACE / ENTER / F - flip
  if (e.key === " " || e.key === "Enter" || e.key.toLowerCase() === "f") {
    e.preventDefault();
    callbacks.onFlip();
    return;
  }

  const canJudgeCorrectOrEasy = state === "playing" || state === "flipped";
  const canJudgeWrong = state === "flipped" && isFlipped;

  // Left arrow / 1 - wrong
  if ((e.key === "ArrowLeft" || e.key === "1") && canJudgeWrong) {
    e.preventDefault();
    callbacks.onJudge("wrong");
  }
  // Right arrow / 2 - correct
  else if ((e.key === "ArrowRight" || e.key === "2") && canJudgeCorrectOrEasy) {
    e.preventDefault();
    callbacks.onJudge("correct");
  }
  // Down arrow / 3 - easy
  else if ((e.key === "ArrowDown" || e.key === "3") && canJudgeCorrectOrEasy) {
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
      <h1 class="sr-only" id="player-dialog-title">Flashcard player for ${escapeHTML(state.session.deckTitle || "deck")}</h1>
      <p class="sr-only" id="player-screenreader-help">
        Use Space, Enter, or F to flip the current card. After the answer is shown, use Left Arrow or 1 for need review, Right Arrow or 2 for got it, Down Arrow or 3 for easy, and Escape to close.
      </p>
      <div class="sr-only" id="player-live-region" aria-live="polite" aria-atomic="true"></div>
      <div class="sr-only" id="player-card-status"></div>

      <!-- Header -->
      <div class="player-header">
        <button class="player-close-btn" type="button" title="Close (ESC)" aria-label="Close flashcard player">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
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
        <div class="swipe-hint swipe-hint-left" aria-hidden="true">
          <span>← Need Review</span>
        </div>
        
        <div class="player-card" role="button" tabindex="0" aria-describedby="player-screenreader-help player-card-status" aria-label="Flashcard. Loading question.">
          <div class="player-card__front" id="player-card-front">
            <div class="card-inner">
              <div class="card-content">Loading...</div>
            </div>
          </div>
          <div class="player-card__back" id="player-card-back" aria-hidden="true">
            <div class="card-inner">
              <div class="card-content">Answer</div>
            </div>
          </div>
        </div>
        
        <div class="swipe-hint swipe-hint-right" aria-hidden="true">
          <span>Easy →</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="player-controls">
        <button class="btn btn-judgment btn-wrong" type="button" id="judge-wrong-btn" title="Need Review (← or 1)" aria-label="Mark card as need review">
          <span class="btn-icon" aria-hidden="true">❌</span>
          <span class="btn-text">Need Review</span>
        </button>
        
        <button class="btn btn-judgment btn-correct" type="button" id="judge-correct-btn" title="Got It! (→ or 2)" aria-label="Mark card as got it">
          <span class="btn-icon" aria-hidden="true">✓</span>
          <span class="btn-text">Got It!</span>
        </button>
        
        <button class="btn btn-judgment btn-easy" type="button" id="judge-easy-btn" title="Easy (↓ or 3)" aria-label="Mark card as easy">
          <span class="btn-icon" aria-hidden="true">⚡</span>
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

function didCardChange(
  previousCard: PlayerState["currentCard"],
  currentCard: PlayerState["currentCard"],
): boolean {
  if (previousCard === currentCard) return false;
  if (!previousCard || !currentCard) return previousCard !== currentCard;

  return (
    previousCard.front !== currentCard.front ||
    previousCard.back !== currentCard.back ||
    previousCard.topic !== currentCard.topic
  );
}

function resetCardForState(
  card: HTMLElement,
  isFlipped: boolean,
  onResetComplete: () => void,
): void {
  card.classList.remove(
    "flipping",
    "content-hidden",
    "instant-reset",
    "swipe-left",
    "swipe-right",
    "swipe-down",
    "shake",
    "pulse",
    "tint-red",
    "tint-green",
    "tint-gold",
  );
  card.classList.add("content-hidden");
  card.classList.add("instant-reset");
  card.style.transform = "";
  card.classList.toggle("flipped", isFlipped);

  // Force the card to snap to its new orientation before fresh content renders.
  // Without this, the persistent transform transition can animate a new card from
  // back -> front and briefly expose the new answer side.
  void card.offsetWidth;

  requestAnimationFrame(() => {
    onResetComplete();

    requestAnimationFrame(() => {
      card.classList.remove("instant-reset", "content-hidden");
    });
  });
}

/** Return a CSS class to auto-shrink text based on content length + line count.
 *  For very dense backs, uses 2-column layout instead of tiny single-column text. */
function getTextSizeClass(text: string): string {
  const len = text.length;
  const lines = text.split(/\n|<br>/g).length;
  // Thresholds tuned for 6x4-ish card aspect ratio
  if (len > 600 || lines > 16) return "text-2col";
  if (len > 500 || lines > 14) return "text-xs";
  if (len > 300 || lines > 10) return "text-sm";
  if (len > 180 || lines > 7) return "text-md";
  return "";
}

function updateAccessibility(state: PlayerState, cardChanged: boolean): void {
  if (!overlayElement || !cardElement) return;

  const frontSide = cardElement.querySelector(".player-card__front");
  const backSide = cardElement.querySelector(".player-card__back");
  const statusEl = overlayElement.querySelector("#player-card-status");
  const liveRegion = overlayElement.querySelector("#player-live-region");

  const activeText = state.currentCard
    ? state.isFlipped
      ? state.currentCard.back
      : state.currentCard.front
    : "";
  const sideLabel = state.isFlipped ? "answer" : "question";
  const topicText = state.currentCard?.topic
    ? ` Topic: ${state.currentCard.topic}.`
    : "";
  const helpText = state.isFlipped
    ? " Use Left Arrow for need review, Right Arrow for got it, Down Arrow for easy, or Space to flip back."
    : " Press Space, Enter, or F to flip the card and hear the answer.";
  const statusText = state.currentCard
    ? `Showing ${sideLabel} side.${topicText} ${formatAnnouncementText(activeText)}${helpText}`
    : "No active card.";

  cardElement.setAttribute("aria-label", statusText);
  cardElement.setAttribute(
    "aria-disabled",
    state.gameState === "playing" || state.gameState === "flipped"
      ? "false"
      : "true",
  );
  cardElement.tabIndex =
    state.gameState === "playing" || state.gameState === "flipped" ? 0 : -1;

  frontSide?.setAttribute("aria-hidden", state.isFlipped ? "true" : "false");
  backSide?.setAttribute("aria-hidden", state.isFlipped ? "false" : "true");

  if (statusEl) {
    statusEl.textContent = statusText;
  }

  if (!liveRegion) return;

  let announcement = "";

  if (!previousState) {
    announcement = `Started flashcard player for ${state.session.deckTitle}. ${statusText}`;
  } else if (cardChanged) {
    announcement = `Next card. ${statusText}`;
  } else if (previousState.isFlipped !== state.isFlipped) {
    announcement = state.isFlipped
      ? `Answer revealed. ${formatAnnouncementText(state.currentCard?.back ?? "")}`
      : `Question side. ${formatAnnouncementText(state.currentCard?.front ?? "")}`;
  } else if (
    previousState.gameState !== state.gameState &&
    state.gameState === "results"
  ) {
    announcement = `Session complete. Final score ${state.session.score}. Accuracy ${Math.round(getAccuracy(state.session) * 100)} percent.`;
  }

  if (announcement) {
    liveRegion.textContent = announcement;
  }

  if (previousState?.gameState === "intro" && state.gameState === "playing") {
    requestAnimationFrame(() => {
      cardElement?.focus();
    });
  }
}

function formatAnnouncementText(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= 220) return normalized;
  return `${normalized.slice(0, 217)}...`;
}
