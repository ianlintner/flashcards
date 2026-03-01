export function flipCard(cardElement: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    cardElement.classList.add("flipping");
    setTimeout(() => {
      cardElement.classList.remove("flipping");
      resolve();
    }, 600);
  });
}

export function swipeCard(
  cardElement: HTMLElement,
  direction: "left" | "right" | "down",
): Promise<void> {
  return new Promise((resolve) => {
    cardElement.classList.add(`swipe-${direction}`);
    setTimeout(() => {
      cardElement.classList.remove(`swipe-${direction}`);
      resolve();
    }, 400);
  });
}

export function shakeCard(cardElement: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    cardElement.classList.add("shake");
    setTimeout(() => {
      cardElement.classList.remove("shake");
      resolve();
    }, 500);
  });
}

export function pulseCard(cardElement: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    cardElement.classList.add("pulse");
    setTimeout(() => {
      cardElement.classList.remove("pulse");
      resolve();
    }, 600);
  });
}

export function showConfetti(): void {
  // Using canvas-confetti if available, fallback to CSS animation
  if (typeof window !== "undefined" && (window as any).confetti) {
    (window as any).confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  } else {
    // Fallback: create simple CSS confetti
    createCSSConfetti();
  }
}

function createCSSConfetti(): void {
  const container = document.createElement("div");
  container.className = "confetti-container";
  document.body.appendChild(container);

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-piece";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 3}s`;
    confetti.style.backgroundColor = getRandomColor();
    container.appendChild(confetti);
  }

  setTimeout(() => {
    container.remove();
  }, 3000);
}

function getRandomColor(): string {
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#f9ca24",
    "#6c5ce7",
    "#fd79a8",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function updateDragPosition(
  cardElement: HTMLElement,
  deltaX: number,
  deltaY: number,
): void {
  const rotation = deltaX / 20; // Subtle rotation based on horizontal movement
  cardElement.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
}

export function resetCardPosition(cardElement: HTMLElement): void {
  cardElement.style.transform = "";
}

export function setCardTint(
  cardElement: HTMLElement,
  color: "red" | "green" | "gold" | null,
): void {
  cardElement.classList.remove("tint-red", "tint-green", "tint-gold");
  if (color) {
    cardElement.classList.add(`tint-${color}`);
  }
}
