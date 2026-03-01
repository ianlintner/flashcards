export interface SwipeResult {
  direction: "left" | "right" | "down" | null;
  distance: number;
}

export class GestureDetector {
  private element: HTMLElement;
  private startX: number = 0;
  private startY: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;
  private isDragging: boolean = false;
  private threshold: number = 100; // pixels

  private onDragStart?: () => void;
  private onDragMove?: (deltaX: number, deltaY: number) => void;
  private onDragEnd?: (result: SwipeResult) => void;

  constructor(element: HTMLElement) {
    this.element = element;
    this.bindEvents();
  }

  private bindEvents(): void {
    // Mouse events
    this.element.addEventListener("mousedown", this.handleStart.bind(this));
    document.addEventListener("mousemove", this.handleMove.bind(this));
    document.addEventListener("mouseup", this.handleEnd.bind(this));

    // Touch events
    this.element.addEventListener("touchstart", this.handleStart.bind(this));
    document.addEventListener("touchmove", this.handleMove.bind(this));
    document.addEventListener("touchend", this.handleEnd.bind(this));
  }

  private handleStart(e: MouseEvent | TouchEvent): void {
    const point = this.getPoint(e);
    if (!point) return;

    this.startX = point.x;
    this.startY = point.y;
    this.currentX = point.x;
    this.currentY = point.y;
    this.isDragging = true;

    if (this.onDragStart) {
      this.onDragStart();
    }
  }

  private handleMove(e: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    const point = this.getPoint(e);
    if (!point) return;

    this.currentX = point.x;
    this.currentY = point.y;

    const deltaX = this.currentX - this.startX;
    const deltaY = this.currentY - this.startY;

    if (this.onDragMove) {
      this.onDragMove(deltaX, deltaY);
    }
  }

  private handleEnd(_e: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    const deltaX = this.currentX - this.startX;
    const deltaY = this.currentY - this.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    let direction: "left" | "right" | "down" | null = null;

    if (distance > this.threshold) {
      const angle = Math.atan2(deltaY, deltaX);
      const degrees = (angle * 180) / Math.PI;

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          direction = "right";
        } else {
          direction = "left";
        }
      } else if (deltaY > 0) {
        // Vertical swipe (down only)
        direction = "down";
      }
    }

    if (this.onDragEnd) {
      this.onDragEnd({ direction, distance });
    }

    this.isDragging = false;
  }

  private getPoint(
    e: MouseEvent | TouchEvent,
  ): { x: number; y: number } | null {
    if (e instanceof MouseEvent) {
      return { x: e.clientX, y: e.clientY };
    } else if (e instanceof TouchEvent && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return null;
  }

  setThreshold(pixels: number): void {
    this.threshold = pixels;
  }

  onStart(callback: () => void): void {
    this.onDragStart = callback;
  }

  onMove(callback: (deltaX: number, deltaY: number) => void): void {
    this.onDragMove = callback;
  }

  onEnd(callback: (result: SwipeResult) => void): void {
    this.onDragEnd = callback;
  }

  destroy(): void {
    this.element.removeEventListener("mousedown", this.handleStart.bind(this));
    document.removeEventListener("mousemove", this.handleMove.bind(this));
    document.removeEventListener("mouseup", this.handleEnd.bind(this));
    this.element.removeEventListener("touchstart", this.handleStart.bind(this));
    document.removeEventListener("touchmove", this.handleMove.bind(this));
    document.removeEventListener("touchend", this.handleEnd.bind(this));
  }
}
