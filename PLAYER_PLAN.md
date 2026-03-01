# Flashcard Game Player — Implementation Plan

## Overview

Transform the flashcard app into an interactive, gamified learning experience with a dedicated player mode featuring animations, sound effects, spaced repetition algorithm, and score tracking.

---

## 🎯 Core Features

### 1. **Game Modes**

- **Study Mode**: Learn new cards with spaced repetition
- **Review Mode**: Focus on cards marked as difficult
- **Challenge Mode**: Timed rounds with bonus multipliers
- **Endless Mode**: Continuous play with adaptive difficulty

### 2. **Interaction Methods**

- **Keyboard**:
  - `SPACE` or `F` — Flip card
  - `←` or `1` — Mark "Need Review" (swipe left)
  - `→` or `2` — Mark "Got It!" (swipe right)
  - `↓` or `3` — Mark "Easy" (swipe down, bonus points)
  - `ESC` — Pause/Settings
- **Mouse**:
  - Click card to flip
  - Drag card left/right/down to mark
  - Button controls below card
- **Touch**:
  - Tap to flip
  - Swipe gestures (Tinder-style)
  - Multi-touch for special actions

### 3. **Learning Algorithm** (SM-2 Simplified)

```typescript
interface CardMemory {
  cardId: string;
  easeFactor: number; // 1.3 to 2.5 (difficulty multiplier)
  interval: number; // Days until next review
  repetitions: number; // Consecutive correct answers
  nextReview: Date; // When to show again
  lastSeen: Date;
  correctCount: number;
  incorrectCount: number;
}
```

**Algorithm Logic**:

- **Got It!** → Increase interval, boost ease factor
- **Need Review** → Reset interval to 1, reduce ease factor
- **Easy** → Double interval, max ease factor
- Cards with lower ease factor appear more frequently
- Within a session: incorrect cards reappear after 3-5 correct cards

### 4. **Scoring System**

```typescript
interface GameSession {
  score: number;
  streak: number; // Current correct streak
  maxStreak: number; // Best streak this session
  cardsStudied: number;
  cardsCorrect: number;
  cardsIncorrect: number;
  timeElapsed: number; // Seconds
  multiplier: number; // Streak bonus (1x to 5x)
}
```

**Point Values**:

- **Need Review**: 0 points (breaks streak)
- **Got It!**: 10 points × multiplier
- **Easy**: 25 points × multiplier
- **Streak Bonuses**:
  - 5 streak: 2x multiplier
  - 10 streak: 3x multiplier
  - 20 streak: 4x multiplier
  - 50 streak: 5x multiplier + confetti 🎉

### 5. **Visual Feedback**

- **Card Animations**:
  - 3D flip transition (500ms)
  - Swipe with rotation and fade
  - Bounce on incorrect
  - Glow/pulse on correct
  - Confetti explosion on milestones
- **Color Coding**:
  - Red tint + shake → Need Review
  - Green tint + scale → Got It!
  - Gold tint + sparkle → Easy
- **Progress Indicators**:
  - Session progress ring
  - Mastery percentage per card
  - XP bar with level-up animations

### 6. **Sound Effects**

Use Web Audio API with audio sprites:

- `flip.mp3` — Card flip (subtle whoosh)
- `correct.mp3` — Got It! (positive chime)
- `easy.mp3` — Easy (triumphant bell)
- `incorrect.mp3` — Need Review (gentle buzz)
- `streak-5.mp3` — Milestone reached
- `streak-10.mp3` — Higher milestone
- `complete.mp3` — Session complete (fanfare)
- `confetti.mp3` — Achievement unlocked

**Settings**:

- Volume slider (0-100%)
- Individual sound toggles
- Master mute

---

## 🏗️ Architecture

### File Structure

```
src/
  player/
    player.ts              # Main game logic & state machine
    player-ui.ts           # DOM manipulation & rendering
    card-stack.ts          # Card queue & algorithm
    scoring.ts             # Points, streaks, multipliers
    animations.ts          # CSS/JS animation helpers
    sounds.ts              # Audio management
    gestures.ts            # Touch/swipe detection
    storage.ts             # localStorage persistence
    types.ts               # Player-specific types
  player.css               # Player mode styles
  sounds/
    flip.mp3
    correct.mp3
    easy.mp3
    incorrect.mp3
    streak-5.mp3
    streak-10.mp3
    complete.mp3
    confetti.mp3
```

### State Machine

```typescript
type GameState =
  | "idle" // Not started
  | "intro" // Deck preview, settings
  | "playing" // Active gameplay
  | "flipped" // Card back visible, awaiting judgment
  | "judging" // Swipe animation in progress
  | "paused" // Settings/pause menu
  | "complete" // Session finished
  | "results"; // Stats screen

interface PlayerState {
  gameState: GameState;
  currentCard: Flashcard | null;
  cardStack: Flashcard[]; // Remaining cards
  reviewQueue: Flashcard[]; // Cards to review
  cardMemories: Map<string, CardMemory>;
  session: GameSession;
  settings: PlayerSettings;
  isFlipped: boolean;
}
```

### Settings Interface

```typescript
interface PlayerSettings {
  mode: "study" | "review" | "challenge" | "endless";
  targetCards?: number; // Goal for session (study mode)
  timeLimit?: number; // Seconds (challenge mode)
  soundEnabled: boolean;
  soundVolume: number; // 0-100
  animationsEnabled: boolean;
  hapticFeedback: boolean; // Mobile vibration
  autoFlip: boolean; // Auto-flip after X seconds
  autoFlipDelay: number; // Seconds
  showTimer: boolean;
  showProgress: boolean;
}
```

---

## 🎨 UI Layout

### Full-Screen Overlay

```
┌─────────────────────────────────────────────────┐
│  [X] Close    🎯 Score: 450    🔥 Streak: 12   │ ← Header
├─────────────────────────────────────────────────┤
│                                                 │
│            ┌───────────────────┐                │
│            │                   │                │
│            │   FLASHCARD       │  ← 3D Card    │
│            │   [Front/Back]    │     (flippable,
│            │                   │      swipeable)
│            └───────────────────┘                │
│                                                 │
│        ← Need Review    Easy →                  │ ← Swipe hints
│                                                 │
├─────────────────────────────────────────────────┤
│   [⌨️ Keyboard]  [🔊 Sound]  [⚙️ Settings]      │ ← Control bar
│   Progress: ████████░░ 12/20  (60%)            │
└─────────────────────────────────────────────────┘
```

### Card Design

- **Front**: Question in large, readable font
- **Back**: Answer + optional explanation
- **Indicators**:
  - Topic badge (top)
  - Difficulty stars (bottom)
  - Mastery ring (corner, colored by performance)
- **Animations**: Smooth 3D CSS transforms

### Action Buttons (Below Card)

```
┌──────────┬──────────┬──────────┐
│ ❌ Need  │ ✓ Got It │ ⭐ Easy  │
│  Review  │    (→)   │   (↓)    │
│   (←)    │          │          │
└──────────┴──────────┴──────────┘
```

### Settings Panel (Slide-in Drawer)

- Mode selector
- Sound toggles + volume
- Animation toggles
- Session goals
- Keyboard shortcuts reference

### Results Screen

```
┌─────────────────────────────────────┐
│         🎉 Session Complete!        │
│                                     │
│  Score:        2,450 pts           │
│  Best Streak:  23 cards            │
│  Accuracy:     85%                 │
│  Time:         12m 34s             │
│                                     │
│  Cards Studied:   20               │
│  ✓ Got It:        17               │
│  ❌ Need Review:  3                │
│  ⭐ Easy:         10               │
│                                     │
│  [📊 View Stats] [🔁 Play Again]   │
│  [🏠 Back to Decks]                │
└─────────────────────────────────────┘
```

---

## 🔧 Implementation Phases

### Phase 1: Core Player (MVP) — ~4-6 hours

**Goal**: Functional player with basic interactions

**Tasks**:

1. ✅ Create player overlay HTML structure
2. ✅ Add "Play" button to each deck card
3. ✅ Implement game state machine
4. ✅ Build card stack with simple queue
5. ✅ Add keyboard controls (flip, left, right)
6. ✅ Basic CSS flip animation
7. ✅ Simple scoring (no multipliers yet)
8. ✅ Results screen with basic stats

**Deliverable**: Working flashcard player with keyboard controls

---

### Phase 2: Swipe Mechanics — ~2-3 hours

**Goal**: Mouse drag and touch gestures

**Tasks**:

1. ✅ Implement mouse drag with visual feedback
2. ✅ Detect drag direction and threshold
3. ✅ Animate card off-screen on swipe
4. ✅ Add touch event handlers
5. ✅ Touch gesture detection (swipe left/right/down)
6. ✅ Mobile-friendly card sizing

**Deliverable**: Tinder-style swipe interactions

---

### Phase 3: Learning Algorithm — ~2-3 hours

**Goal**: Smart card ordering based on performance

**Tasks**:

1. ✅ Implement CardMemory interface
2. ✅ Build SM-2-inspired algorithm
3. ✅ Review queue logic (reshow incorrect cards)
4. ✅ Save/load card memories from localStorage
5. ✅ Difficulty indicators on cards
6. ✅ Adaptive card queue

**Deliverable**: Spaced repetition system

---

### Phase 4: Gamification — ~3-4 hours

**Goal**: Scoring, streaks, multipliers

**Tasks**:

1. ✅ Implement streak tracking
2. ✅ Multiplier system (2x-5x)
3. ✅ Point calculation with bonuses
4. ✅ Progress bar with visual updates
5. ✅ XP/level system (optional)
6. ✅ Achievements/badges (optional)
7. ✅ High scores leaderboard (per deck)

**Deliverable**: Full scoring system

---

### Phase 5: Visual Polish — ~2-3 hours

**Goal**: Animations and visual feedback

**Tasks**:

1. ✅ Confetti animation library (canvas-confetti)
2. ✅ Card glow/pulse effects
3. ✅ Shake animation on incorrect
4. ✅ Smooth transitions between states
5. ✅ Color-coded feedback (red/green/gold)
6. ✅ Progress ring animations
7. ✅ Milestone celebration animations

**Deliverable**: Polished, satisfying animations

---

### Phase 6: Sound Effects — ~1-2 hours

**Goal**: Audio feedback

**Tasks**:

1. ✅ Find/create CC0 sound effects
2. ✅ Implement Web Audio API manager
3. ✅ Load audio sprites
4. ✅ Trigger sounds on actions
5. ✅ Volume controls
6. ✅ Sound preferences in localStorage

**Deliverable**: Full audio experience

---

### Phase 7: Settings & Persistence — ~2-3 hours

**Goal**: User configuration and data persistence

**Tasks**:

1. ✅ Settings panel UI
2. ✅ Mode selection (study/review/challenge/endless)
3. ✅ Session goals configuration
4. ✅ Save player state to localStorage
5. ✅ Resume interrupted sessions
6. ✅ Stats history tracking
7. ✅ Export/import progress

**Deliverable**: Fully configurable player

---

### Phase 8: Challenge/Endless Modes — ~2-3 hours

**Goal**: Additional game modes

**Tasks**:

1. ✅ Timed challenge mode with countdown
2. ✅ Endless mode with increasing difficulty
3. ✅ Bonus point mechanics
4. ✅ Mode-specific UI tweaks
5. ✅ Mode selection screen

**Deliverable**: Multiple game modes

---

## 📦 Dependencies

### Required NPM Packages

```json
{
  "canvas-confetti": "^1.9.2", // Confetti effects
  "hammerjs": "^2.0.8" // Touch gestures (optional, could use native)
}
```

### Optional Enhancements

- `howler.js` — Advanced audio (better than Web Audio API for some use cases)
- `gsap` — Professional animations (if CSS insufficient)
- `chart.js` — Stats visualization

---

## 🎮 User Flow

### Entry

1. User clicks **[▶ Play]** button on a deck card
2. Player overlay slides in from bottom (or fades in)
3. Brief intro animation showing deck info
4. Game starts with first card (front side visible)

### Gameplay Loop

1. **Present Card** (front side)
   - Show question/term
   - User studies content
2. **Flip Card** (space/click/tap)
   - Smooth 3D flip animation
   - Show answer/definition
3. **Judge Response** (keyboard/swipe/buttons)
   - User marks: Need Review / Got It / Easy
   - Card animates off-screen in chosen direction
   - Sound effect plays
   - Score/streak updates
4. **Next Card**
   - If cards remain → goto 1
   - If session complete → Results screen

### Exit

1. **Results Screen** displays session stats
2. **Confetti** if achieved milestone
3. **Options**:
   - View detailed stats
   - Play again (same deck)
   - Return to deck library

---

## 💾 localStorage Schema

### Keys

- `flashcards_player_memories` — Map of card memories across all decks
- `flashcards_player_sessions` — Array of completed sessions
- `flashcards_player_settings` — User preferences
- `flashcards_player_highscores` — Best scores per deck
- `flashcards_player_achievements` — Unlocked achievements

### Data Samples

```typescript
// Card Memories
{
  "big-o-algorithms_O(1) lookup": {
    easeFactor: 2.1,
    interval: 3,
    repetitions: 4,
    nextReview: "2026-03-04T12:00:00Z",
    lastSeen: "2026-03-01T14:30:00Z",
    correctCount: 8,
    incorrectCount: 2
  }
}

// Session History
[
  {
    deckId: "big-o-algorithms",
    date: "2026-03-01T14:30:00Z",
    mode: "study",
    score: 2450,
    streak: 23,
    cardsStudied: 20,
    accuracy: 0.85,
    duration: 754 // seconds
  }
]

// High Scores
{
  "big-o-algorithms": {
    bestScore: 5200,
    bestStreak: 47,
    date: "2026-02-28T10:15:00Z"
  }
}
```

---

## 🎨 CSS Animation Examples

### Card Flip (3D)

```css
.player-card {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.player-card.flipped {
  transform: rotateY(180deg);
}

.player-card__front,
.player-card__back {
  backface-visibility: hidden;
}

.player-card__back {
  transform: rotateY(180deg);
}
```

### Swipe Animation

```css
.player-card.swiping-right {
  transform: translateX(var(--drag-x)) rotate(calc(var(--drag-x) / 20));
  transition: none;
}

.player-card.swipe-right {
  animation: swipeOffRight 0.4s ease-out forwards;
}

@keyframes swipeOffRight {
  to {
    transform: translateX(150vw) rotate(30deg);
    opacity: 0;
  }
}
```

### Streak Milestone

```css
@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(34, 197, 94, 0);
  }
  50% {
    box-shadow: 0 0 40px rgba(34, 197, 94, 0.8);
  }
}

.streak-milestone {
  animation: pulseGlow 1s ease-in-out;
}
```

---

## 🚀 Launch Checklist

### Before Implementation

- [ ] Review plan with stakeholders
- [ ] Gather/create sound effect assets
- [ ] Design card templates in Figma (optional)
- [ ] Set up testing device matrix

### During Development

- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test touch gestures thoroughly
- [ ] Verify audio on different devices
- [ ] Test localStorage limits
- [ ] Accessibility audit (keyboard navigation, screen readers)

### Before Release

- [ ] Performance profiling (60fps target)
- [ ] localStorage fallback if quota exceeded
- [ ] Error boundary for player crashes
- [ ] Analytics integration (optional)
- [ ] User guide/tutorial on first use
- [ ] Beta testing with real users

---

## 📈 Success Metrics

### Engagement

- Average session length
- Cards studied per session
- Return rate (users who play multiple sessions)
- Completion rate (finish to results screen)

### Learning Effectiveness

- Accuracy improvement over time
- Cards mastered (high ease factor)
- Review compliance (cards reviewed on schedule)

### Gamification

- Streaks achieved
- Achievements unlocked
- High scores beaten

---

## 🔮 Future Enhancements

### Advanced Features

- **Multiplayer Mode**: Compete with friends in real-time
- **Daily Challenges**: Curated card sets with bonus rewards
- **Leaderboards**: Global/friends rankings
- **Custom Decks**: User-created flashcards
- **Social Sharing**: Share scores/achievements
- **Themes**: Dark mode, colorblind mode, custom skins
- **Voice Input**: Speak answers (speech recognition)
- **AR Mode**: Overlay cards in physical space (mobile)

### Integrations

- **Spaced Repetition Export**: Export to Anki/Quizlet
- **Cloud Sync**: Save progress across devices
- **Mobile App**: PWA or native wrapper
- **Browser Extension**: Quick-play from toolbar

---

## 🏁 Phase 1 Implementation (MVP)

Ready to start with Phase 1? This will create a working player with:

- ✅ Full-screen overlay
- ✅ Card display with flip animation
- ✅ Keyboard controls (←, →, SPACE)
- ✅ Basic scoring
- ✅ Results screen

Estimated time: **4-6 hours**

Shall I proceed with implementing Phase 1?
