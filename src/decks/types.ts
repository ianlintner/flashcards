import type { Flashcard } from "../types";

export type DeckLevel =
  | "foundation"
  | "intermediate"
  | "advanced"
  | "senior-staff"
  | "staff-principal";

export type DeckCategory =
  | "DSA"
  | "ML/AI"
  | "Cloud"
  | "DevOps"
  | "Web"
  | "System Design"
  | "CS Theory"
  | "Languages"
  | "Security"
  | "Career"
  | "Software Eng"
  | "Systems";

export interface DeckInfo {
  id: string;
  title: string;
  description: string;
  level: DeckLevel;
  category: DeckCategory | string;
  cards: Flashcard[];
  icon?: string;
  tags?: string[];
  estimatedMinutes?: number;
  prerequisites?: string[];
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

export const CATEGORY_ICONS: Record<string, string> = {
  DSA: "puzzle",
  "ML/AI": "brain",
  Cloud: "cloud",
  DevOps: "wrench",
  Web: "globe",
  "System Design": "building",
  "CS Theory": "calculator",
  Languages: "code",
  Security: "shield",
  Career: "briefcase",
  "Software Eng": "layers",
  Systems: "cpu",
};

export const CATEGORY_ORDER: string[] = [
  "DSA",
  "ML/AI",
  "System Design",
  "Systems",
  "Software Eng",
  "Web",
  "DevOps",
  "Cloud",
  "CS Theory",
  "Languages",
  "Security",
  "Career",
];
