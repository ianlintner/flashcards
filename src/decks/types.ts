import type { Flashcard } from "../types";

export type DeckLevel =
  | "foundation"
  | "intermediate"
  | "advanced"
  | "senior-staff"
  | "staff-principal";

export interface DeckInfo {
  id: string;
  title: string;
  description: string;
  level: DeckLevel;
  category: string;
  cards: Flashcard[];
}

export const LEVEL_LABELS: Record<DeckLevel, string> = {
  foundation: "Foundation",
  intermediate: "Intermediate",
  advanced: "Advanced",
  "senior-staff": "Senior / Staff",
  "staff-principal": "Staff / Principal",
};

export const LEVEL_ORDER: DeckLevel[] = [
  "foundation",
  "intermediate",
  "advanced",
  "senior-staff",
  "staff-principal",
];
