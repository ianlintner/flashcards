// ─── Share link generation ───────────────────────────────────────────────────

import type { DeckInfo } from "../decks/types";
import { buildShareUrl } from "../router";
import { showToast } from "./toast";

/** Share a deck via Web Share API or clipboard fallback */
export async function shareDeck(deck: DeckInfo): Promise<void> {
  const url = buildShareUrl(deck.id);
  const title = `Study: ${deck.title}`;
  const text = `${deck.cards.length} flashcards on ${deck.title}`;

  // Try Web Share API first (mostly mobile)
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch (err) {
      // User cancelled or API failed, fall through to clipboard
      if ((err as DOMException).name === "AbortError") return;
    }
  }

  // Clipboard fallback
  try {
    await navigator.clipboard.writeText(url);
    showToast({
      message: "Link copied to clipboard!",
      type: "success",
      duration: 2500,
    });
  } catch {
    // Final fallback: prompt
    prompt("Copy this link to share:", url);
  }
}
