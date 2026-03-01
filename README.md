# Flashcard Generator

A browser-based TypeScript app that converts structured content into print-ready **6 × 4 inch landscape PDF flashcards** (front + back). Designed for physical printing with minimal ink usage.

## Features

- **Three import formats** — JSON, YAML, or Markdown
- **PDF output** — one page per card side (front then back), landscape 6 × 4 in
- **Auto-shrink** — font scales down automatically if content overflows
- **Ink-minimal design** — white background, greyscale text, no fills or borders
- **25 built-in example cards** — Big O notation time & space complexity
- **Runs entirely in the browser** — no server required

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, paste or load card content, then click **Generate PDF**.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the built dist/
```

## Input Formats

### Markdown (recommended)

Cards are separated by `===` on its own line. Front and back are separated by `---` on its own line. An optional `# Heading` on the first line of the front becomes the card topic.

```
===
# Card Topic
Front side text goes here.
Multiple lines are fine.
---
Back side answer goes here.

More detail on additional lines.
===
# Second Card
Another question.
---
Another answer.
===
```

### JSON

A top-level array of objects with `front`, `back`, and optional `topic` fields.

```json
[
  {
    "topic": "Card Topic",
    "front": "Question text",
    "back": "Answer text"
  }
]
```

### YAML

A YAML sequence of objects with the same fields. Literal block scalars (`|`) preserve newlines.

```yaml
- topic: Card Topic
  front: |
    Question text
    second line
  back: |
    Answer text
    more detail
```

## PDF Layout

| Property          | Value                                             |
| ----------------- | ------------------------------------------------- |
| Page size         | 6 × 4 inches, landscape                           |
| Pages per card    | 2 (front + back)                                  |
| Default font size | 18 pt (auto-shrinks to fit)                       |
| Font              | Helvetica (body), Courier (code/complexity lines) |
| Background        | White                                             |
| Corner label      | `[ FRONT ]` / `[ BACK ]` in light grey            |

## Project Structure

```
src/
  types.ts          — Flashcard, PDFOptions interfaces and defaults
  parsers.ts        — JSON, YAML, Markdown parsers + auto-detect
  pdf-generator.ts  — jsPDF rendering engine
  examples.ts       — 25 Big O notation example cards
  main.ts           — UI wiring
index.html          — Single-page app shell + embedded CSS
```

## Encoding Constraint

jsPDF's built-in fonts (Helvetica, Courier) use **WinAnsi (Latin-1 / Win-1252) encoding**. Characters outside this range (emoji, Unicode arrows, superscripts, etc.) will render as garbage glyphs. Keep all card content to plain ASCII or basic Latin-1. The generator includes a `sanitize()` function that strips/replaces common offenders automatically.

Safe substitutions:

- `->` instead of `→`
- `^2` instead of `²`
- `O(n^2)` instead of `O(n²)`
- `>=` instead of `≥`
- `-` instead of `—` or `–`

## License

MIT
