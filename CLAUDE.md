# Claude Instructions — Flashcard Generator

## Project Summary

Vite 5 + TypeScript 5 single-page app. No backend. Generates print-ready **6 × 4 in landscape PDF flashcards** (front + back pages) from JSON, YAML, or Markdown input. Key libraries: **jsPDF 2.5** (PDF), **js-yaml 4** (YAML parsing).

## Build & Dev Commands

```bash
npm install          # install dependencies
npm run dev          # dev server (default port 5173)
npm run build        # tsc + vite build -> dist/
npx tsc --noEmit     # type-check only (run after every edit)
```

Always run `npx tsc --noEmit` after edits to confirm zero errors before stopping.

## File Map

| File                   | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `src/types.ts`         | `Flashcard`, `PDFOptions` interfaces; `DEFAULT_PDF_OPTIONS`    |
| `src/parsers.ts`       | `parseJSON`, `parseYAML`, `parseMarkdown`, `detectFormat`      |
| `src/pdf-generator.ts` | `generatePDF()` — all jsPDF rendering logic                    |
| `src/examples.ts`      | `BIG_O_CARDS[]` + derived `EXAMPLE_JSON/YAML/MARKDOWN` strings |
| `src/main.ts`          | DOM event wiring, preview rendering, download trigger          |
| `index.html`           | SPA shell + embedded CSS                                       |

## Core Data Type

```typescript
interface Flashcard {
  front: string; // question side text
  back: string; // answer side text
  topic?: string; // optional heading shown at top of each page
}
```

---

## Generating Flashcard Decks

### Fastest: Markdown format

Paste directly into the textarea or set as `EXAMPLE_MARKDOWN`. Separator is `===`, front/back divider is `---`, optional `# Heading` sets the topic.

```
===
# Topic Name
Front text here.
More lines fine.
---
Back answer here.

Extra detail lines.
===
# Second Card
Question.
---
Answer.
===
```

### TypeScript array in `examples.ts`

Best for permanent decks that ship with the app:

```typescript
export const MY_DECK: Flashcard[] = [
  {
    topic: "Topic Label",
    front: "Question text\nline two\nline three",
    back: "Answer text\n\nAdditional explanation.",
  },
  {
    topic: "Another Card",
    front: "Another question?",
    back: "Best: O(n)\nAverage: O(n log n)\nWorst: O(n^2)",
  },
];
```

After adding, update `EXAMPLE_JSON`, `EXAMPLE_YAML`, `EXAMPLE_MARKDOWN` at the bottom of `examples.ts` to include the new deck (they are generated dynamically from the array — just point them at your new constant or merge arrays).

### JSON format

```json
[
  {
    "topic": "Optional Topic",
    "front": "Question\nline two",
    "back": "Answer\nline two"
  }
]
```

### YAML format

```yaml
- topic: Optional Topic
  front: |
    Question text
    line two
  back: |
    Answer text
    line two
```

---

## CRITICAL: WinAnsi Encoding Constraint

jsPDF's built-in fonts (Helvetica, Courier) use **WinAnsi / Latin-1 / Win-1252 encoding**. Characters outside U+0000–U+00FF produce **silent garbage glyphs** in the PDF output. This is a non-obvious hard constraint.

### Characters that WILL corrupt output

| Character            | Renders as          | Use instead          |
| -------------------- | ------------------- | -------------------- |
| `→` (U+2192)         | corrupt box         | `->`                 |
| `←` (U+2190)         | corrupt box         | `<-`                 |
| `–` en-dash (U+2013) | corrupt replacement | `-`                  |
| `—` em-dash (U+2014) | corrupt replacement | `-`                  |
| `²` (U+00B2)         | corrupt             | `^2`                 |
| `³` (U+00B3)         | corrupt             | `^3`                 |
| `…` (U+2026)         | corrupt             | `...`                |
| `✓ ✗ ✔`              | corrupt             | `[x]` / `yes` / `no` |
| `▶ ◀`                | corrupt             | `>` / `<`            |
| Any emoji            | corrupt multi-char  | remove entirely      |
| Smart quotes `" "`   | corrupt             | straight `"`         |

### Safe characters

All standard ASCII (U+0020–U+007E) and basic Latin-1 supplement (U+00A0–U+00FF, e.g., `é à ü ñ ©`) are safe.

### Sanitize function

`src/pdf-generator.ts` exports a `sanitize(str: string): string` function that handles common cases. All user-supplied text passes through it before rendering. When adding hardcoded decks in `examples.ts`, ensure the source data is already clean so sanitize is a safety net, not required.

---

## PDF Layout Details

```
Page: 6 in wide × 4 in tall (landscape)
PAD       = 0.22 in   (margin on all sides)
TOP_BAR_H = 0.20 in   (topic area height)
FOOT_H    = 0.18 in   (card number footer area)
Body area = remaining space between topic bar and footer
```

- **Auto-shrink**: font starts at `baseFontSize` (default 18 pt), decrements 0.5 pt until text fits in body area, minimum 5.5 pt. Long cards will never clip — they just get smaller text.
- **Corner label**: `[ FRONT ]` / `[ BACK ]` — plain text, right-aligned, light grey. No boxes or borders.
- **Notation lines** (matching `Time:|Space:|O(|Best:|Worst:` etc.) render in Courier at 0.92× size.

## Changing Font Size

Two values must stay in sync:

1. `src/types.ts` → `DEFAULT_PDF_OPTIONS.fontSize` — the default used by the UI
2. `src/pdf-generator.ts` → `Math.min(baseFontSize, N)` — the cap applied at render time

Both should be set to the same value (currently `18`).

## Coding Rules

- TypeScript strict mode — no `any`, no implicit `undefined`.
- Named exports only, no default exports.
- After any edit: `npx tsc --noEmit` must exit 0.
- After a visible feature change: `npm run build` must exit 0.
- Do not create summary or changelog Markdown files unless explicitly asked.
