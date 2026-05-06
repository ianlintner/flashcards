# GitHub Copilot Instructions — Flashcard Generator

## Project Overview

This is a **Vite 5 + TypeScript 5** browser app that generates print-ready PDF flashcards (6 × 4 in landscape) from JSON, YAML, or Markdown input. There is no backend. All processing happens in the browser using **jsPDF 2.5** and **js-yaml 4**.

## Repository Layout

```
src/
  types.ts          — shared interfaces (Flashcard, PDFOptions) and DEFAULT_PDF_OPTIONS
  parsers.ts        — parseJSON(), parseYAML(), parseMarkdown(), detectFormat()
  pdf-generator.ts  — generatePDF() — the jsPDF rendering engine
  examples.ts       — BIG_O_CARDS array + EXAMPLE_JSON / EXAMPLE_YAML / EXAMPLE_MARKDOWN
  main.ts           — DOM wiring, preview, download trigger
index.html          — SPA shell with embedded CSS
```

## Core Type

```typescript
interface Flashcard {
  front: string;   // text printed on the question side
  back: string;    // text printed on the answer side
  topic?: string;  // optional label shown at the top of each page
}
```

## How to Generate a New Flashcard Deck

### Option A — Add to `examples.ts` (TypeScript, recommended for persistent decks)

1. Extend the `BIG_O_CARDS` array or create a new exported `Flashcard[]` constant.
2. Each card is a plain object: `{ topic, front, back }`.
3. All text must be plain ASCII or Latin-1 — **no emoji, no Unicode arrows/symbols**.  
   Use `->` not `→`, `^2` not `²`, `-` not `–` or `—`.
4. Use `\n` for explicit line breaks within a field.

```typescript
export const MY_DECK: Flashcard[] = [
  {
    topic: "HTTP Status Codes – 404",
    front: "What does HTTP 404 mean?\n\nGET /missing-page HTTP/1.1",
    back:  "404 Not Found\n\nThe server cannot locate the\nrequested resource. The URL may\nbe wrong or the resource deleted.",
  },
  // ... more cards
];
```

5. Wire it to the UI in `main.ts` the same way `EXAMPLE_MARKDOWN` is wired to the default textarea load.

### Option B — Markdown string (quickest for one-off decks)

Provide a string in this format (separator `===`, divider `---`):

```
===
# Card Topic
Front side text.
Multiple lines allowed.
---
Back side text.

More lines allowed.
===
# Card 2 Topic
Second question.
---
Second answer.
===
```

Rules:
- A line with only `===` starts/ends each card block.
- A line with only `---` splits front from back within a block.
- `# Heading` on the first line of the front sets the `topic` field.
- Comments start with `#` **before** the first `===` only.
- No emoji or non-Latin-1 characters.

### Option C — JSON array

```json
[
  {
    "topic": "Card Topic",
    "front": "Question text\nSecond line",
    "back": "Answer text\nSecond line"
  }
]
```

`topic` is optional. `front` and `back` are required. `\n` creates line breaks.

### Option D — YAML sequence

```yaml
- topic: Card Topic
  front: |
    Question text
    second line
  back: |
    Answer text
    second line
```

Use literal block scalars (`|`) to preserve newlines.

## PDF Rendering Rules

- **Page size**: 6 × 4 in landscape (jsPDF format `[4, 6]` with `orientation: "landscape"`).
- **Two pages per card**: front page then back page.
- **Font**: Helvetica for body text, Courier for lines matching complexity/notation patterns.
- **Auto-shrink**: Body font starts at `PDFOptions.fontSize` (default 18 pt) and decrements by 0.5 pt down to 5.5 pt until all text fits. Long cards won't clip — they just get smaller text.
- **`sanitize(str)`** in `pdf-generator.ts` replaces `→`→`->`, `–`→`-`, `²`→`^2`, strips remaining non-Latin-1 characters. Always call this or ensure source data is already clean.

## Critical Encoding Constraint

jsPDF built-in fonts use **WinAnsi encoding (Latin-1 / Win-1252)**. Any character with code point > U+00FF will silently render as a garbage glyph (e.g., `⏱` → `#ñ`, `→` → corrupt box). This is the single most common bug when adding new decks.

**Forbidden in card text**: emoji, `→ ← ↑ ↓`, `² ³`, `– — …`, `✓ ✗ ▶`, smart quotes `" "`, and any Unicode outside U+0000–U+00FF.

## Coding Conventions

- TypeScript strict mode — no `any`, no implicit `undefined`.
- All exports are named (no default exports).
- Tests are not yet set up; run `npx tsc --noEmit` to validate types.
- `npm run build` must exit with code 0 before considering a change complete.

## Common Tasks

| Task | Where to edit |
|---|---|
| Add a new built-in deck | `src/examples.ts` |
| Change default font size | `src/types.ts` → `DEFAULT_PDF_OPTIONS.fontSize` AND `src/pdf-generator.ts` → `Math.min(baseFontSize, N)` |
| Change card dimensions | `src/types.ts` → `DEFAULT_PDF_OPTIONS.cardWidth/cardHeight` |
| Add a new import format | `src/parsers.ts` + new case in `detectFormat()` + UI wiring in `main.ts` |
| Change PDF layout/margins | `src/pdf-generator.ts` constants `PAD`, `TOP_BAR_H`, `FOOT_H` |

## Caretaker

This repo uses the [caretaker](https://github.com/ianlintner/caretaker) autonomous
maintenance system. The orchestrator runs weekly via GitHub Actions and assigns tasks to
`@copilot` via structured issue and PR comments.

Agent instruction files live in `.github/agents/`:
- `maintainer-pr.md` — how to respond to PR fix requests
- `maintainer-issue.md` — how to execute assigned issues
- `maintainer-upgrade.md` — how to apply caretaker upgrades

Always check these files when you receive a caretaker assignment.

<!-- Added by caretaker -->

## Caretaker System

This repository uses the caretaker automated management system.

### How it works

- An orchestrator runs weekly via GitHub Actions
- It creates issues and assigns them to @copilot for execution
- When @copilot opens PRs, the orchestrator monitors them through CI, review, and merge
- The orchestrator communicates with @copilot via structured issue/PR comments

### When assigned an issue by caretaker

- Read the full issue body carefully — it contains structured instructions
- Follow the instructions exactly as written
- If unclear, comment on the issue asking for clarification
- Always ensure CI passes before considering work complete
- Reference the agent file for your role: `.github/agents/maintainer-pr.md` or `maintainer-issue.md`

### Conventions

- Branch naming: `maintainer/{type}-{description}`
- Commit messages: `chore(maintainer): {description}`
- Always run existing tests before pushing
- Do not modify `.github/maintainer/` files unless explicitly instructed
