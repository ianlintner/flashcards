import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Optics Refresher",
    front: "Why do advanced optics exist beyond simple getters and setters?",
    back: "Immutable nested data is easy to read and hard\nto update ergonomically at scale. Optics provide\ncomposable access and update descriptions rather\nthan ad hoc manual copy chains.\n\nAdvanced optics generalize this idea across\nproducts, sums, optional focus, and many-focus\ntraversals.",
  },
  {
    topic: "Lens, Prism, Traversal, Iso",
    front: "Compare the main optic families: lens, prism, traversal, and iso.",
    back: "Lens:\n  one guaranteed focus in product-like data.\n\nPrism:\n  optional focus into one branch of a sum type.\n\nTraversal:\n  zero or more focuses.\n\nIso:\n  reversible view between equivalent forms.\n\nChoosing the weakest optic that fits keeps APIs\nclear and laws easier to reason about.",
  },
  {
    topic: "Optic Laws",
    front: "Why do optic laws matter?",
    back: "Without laws, composition becomes unreliable.\n\nLens laws commonly include:\n  get after set returns what was set\n  set after get changes nothing\n  last set wins\n\nPrisms and traversals have analogous sanity\nconstraints. Lawful optics support safe refactor\nand reusable generic tooling.",
  },
  {
    topic: "Profunctor Encoding",
    front: "Why do advanced optic libraries often use profunctor encodings?",
    back: "Profunctor encodings provide a uniform way to\nrepresent many optic families and compose them\nthrough shared categorical structure.\n\nThis can yield:\n  - elegant generic composition\n  - library reuse across optic kinds\n  - better abstraction over implementations\n\nIt feels abstract because it is abstract, but\nit buys real compositional leverage.",
  },
  {
    topic: "Indexed and Filtered Traversals",
    front: "What do indexed or filtered traversals add?",
    back: "Indexed traversals expose position or key data\nwhile traversing. Filtered traversals restrict\nfocuses by predicate-like conditions.\n\nThese are useful for:\n  - maps and records with keys\n  - UI updates keyed by location\n  - partial transformations over large trees\n  - selective edits inside immutable collections",
  },
  {
    topic: "Optics and Domain Modeling",
    front: "How should teams think about optics in large domain models?",
    back: "Optics are strongest when domain data is rich,\nimmutable, and nested.\n\nBenefits:\n  - fewer bespoke update helpers\n  - cleaner composition across modules\n  - better reuse in UI/state/validation layers\n\nRisk:\n  teams can hide simple logic behind dense optic\nchains that only three residents of the typelevel\nmountain can read comfortably.",
  },
  {
    topic: "Performance and Readability",
    front: "What trade-offs should engineers watch with heavy optics use?",
    back: "Watch for:\n  - readability loss from dense combinator chains\n  - allocation or inlining issues in hot paths\n  - over-abstracting simple updates\n  - weak team familiarity with laws and encodings\n\nOptics should reduce boilerplate and bugs, not\nturn basic field updates into interpretive dance.",
  },
  {
    topic: "When Advanced Optics Pay Off",
    front: "When are advanced optics genuinely worth it?",
    back: "They pay off when your codebase has:\n  - large immutable domain objects\n  - repeated nested transformations\n  - sum/product heavy data models\n  - generic libraries over structure\n  - teams comfortable with the abstractions\n\nUse them where compositional updates are core,\nnot merely available.",
  },
];

export const ADVANCED_OPTICS: DeckInfo = {
  id: "advanced-optics",
  title: "Advanced Optics",
  description:
    "Lawful lenses, prisms, traversals, profunctor encodings, indexed traversals, and real-world trade-offs.",
  category: "Languages",
  level: "staff-principal",
  cards,
  tags: [
    "optics",
    "lenses",
    "prisms",
    "traversals",
    "profunctors",
    "immutability",
  ],
  estimatedMinutes: 16,
};
