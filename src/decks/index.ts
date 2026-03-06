// ── Original decks ──────────────────────────────────────────────
import { BIG_O_DATA_STRUCTURES } from "./big-o-data-structures";
import { BIG_O_ALGORITHMS } from "./big-o-algorithms";
import { BIG_O_CONTROL_STRUCTURES } from "./big-o-control-structures";
import { DSA_PRACTICAL_USES } from "./dsa-practical-uses";
import { LEETCODE_PATTERNS } from "./leetcode-patterns";
import { LEETCODE_PROBLEMS } from "./leetcode-problems";
import { ADVANCED_DATA_STRUCTURES } from "./advanced-data-structures";
import { ADVANCED_ALGORITHMS } from "./advanced-algorithms";
import { SYSTEM_DESIGN } from "./system-design";
import { CONCURRENCY_PARALLELISM } from "./concurrency-parallelism";
import { DATABASE_INTERNALS } from "./database-internals";
import { OOP_DESIGN } from "./oop-design";
import { BEHAVIORAL_INTERVIEW } from "./behavioral-interview";
import { SYSTEM_DESIGN_ESTIMATION } from "./system-design-estimation";
import { NETWORKING_FUNDAMENTALS } from "./networking-fundamentals";
import { OPERATING_SYSTEMS } from "./operating-systems";
import { DESIGN_PATTERNS } from "./design-patterns";
import { API_DESIGN } from "./api-design";
import { SECURITY_FUNDAMENTALS } from "./security-fundamentals";
import { DISTRIBUTED_SYSTEMS_DEEP } from "./distributed-systems-deep";
import { LEETCODE_PROBLEMS_EXTENDED } from "./leetcode-problems-extended";

// ── Phase A: DSA ────────────────────────────────────────────────
import { GRAPH_ALGORITHMS } from "./graph-algorithms";
import { DYNAMIC_PROGRAMMING } from "./dynamic-programming";
import { SORTING_SEARCHING } from "./sorting-searching";
import { TREES_ADVANCED } from "./trees-advanced";
import { GREEDY_BIT_MANIPULATION } from "./greedy-bit-manipulation";
import { DATA_STRUCTURES_DEEP } from "./data-structures-deep";
import { RECURSION_FUNDAMENTALS } from "./recursion-fundamentals";
import { ALGORITHMIC_PROBLEM_SOLVING } from "./algorithmic-problem-solving";

// ── Phase B: ML / AI ────────────────────────────────────────────
import { ML_FUNDAMENTALS } from "./ml-fundamentals";
import { NEURAL_NETWORKS } from "./neural-networks";
import { TRANSFORMERS_ATTENTION } from "./transformers-attention";
import { LLM_FUNDAMENTALS } from "./llm-fundamentals";
import { PROMPT_ENGINEERING } from "./prompt-engineering";
import { ML_ALGORITHMS } from "./ml-algorithms";
import { ML_SYSTEM_DESIGN } from "./ml-system-design";
import { NLP_FUNDAMENTALS } from "./nlp-fundamentals";
import { REINFORCEMENT_LEARNING } from "./reinforcement-learning";
import { AI_ETHICS_SAFETY } from "./ai-ethics-safety";

// ── Phase C: Cloud / DevOps ─────────────────────────────────────
import { DOCKER_KUBERNETES } from "./docker-kubernetes";
import { CICD_DEVOPS } from "./cicd-devops";
import { CLOUD_FUNDAMENTALS } from "./cloud-fundamentals";
import { DEVOPS_PRACTICES } from "./devops-practices";
import { INFRASTRUCTURE_AS_CODE } from "./infrastructure-as-code";
import { OBSERVABILITY_MONITORING } from "./observability-monitoring";

// ── Phase D: Web / Software Engineering ─────────────────────────
import { HTTP_WEB_PROTOCOLS } from "./http-web-protocols";
import { GRAPHQL_API_PATTERNS } from "./graphql-api-patterns";
import { TESTING_CODE_QUALITY } from "./testing-code-quality";
import { BROWSER_INTERNALS } from "./browser-internals";
import { SOFTWARE_ARCHITECTURE } from "./software-architecture";
import { TYPESCRIPT_REACT_DEEP } from "./typescript-react-deep";

// ── Phase E: CS Theory ──────────────────────────────────────────
import { DISCRETE_MATH_CS } from "./discrete-math-cs";
import { PROBABILITY_STATS_ML } from "./probability-stats-ml";
import { LINEAR_ALGEBRA_ML } from "./linear-algebra-ml";
import { COMPILER_DESIGN } from "./compiler-design";
import { INFO_THEORY_CRYPTO } from "./info-theory-crypto";

// ── Phase F: Languages & Case Studies ───────────────────────────
import { PYTHON_ESSENTIALS } from "./python-essentials";
import { JAVASCRIPT_DEEP_DIVE } from "./javascript-deep-dive";
import { SQL_MASTERY } from "./sql-mastery";
import { GO_FUNDAMENTALS } from "./go-fundamentals";
import { RUST_OWNERSHIP } from "./rust-ownership";
import { LINEAR_TYPES_AND_OWNERSHIP } from "./linear-types-and-ownership";
import { FUNCTIONAL_PROGRAMMING_FOUNDATIONS } from "./functional-programming-foundations";
import { ADVANCED_FUNCTIONAL_PROGRAMMING } from "./advanced-functional-programming";
import { CATEGORY_THEORY_FOR_PROGRAMMERS } from "./category-theory-for-programmers";
import { EFFECT_SYSTEMS } from "./effect-systems";
import { HASKELL_SCALA_OCAML } from "./haskell-scala-ocaml";
import { PARSER_COMBINATORS } from "./parser-combinators";
import { DEPENDENT_TYPES_AND_GADTS } from "./dependent-types-and-gadts";
import { STREAMING_AND_FRP } from "./streaming-and-frp";
import { DENOTATIONAL_SEMANTICS } from "./denotational-semantics";
import { THEOREM_PROVING_WITH_COQ_AGDA_IDRIS } from "./theorem-proving-with-coq-agda-idris";
import { PROFUNCTORS_ARROWS_AND_FREE_APPLICATIVES } from "./profunctors-arrows-and-free-applicatives";
import { EFFECT_HANDLERS_IN_DEPTH } from "./effect-handlers-in-depth";
import { ADVANCED_OPTICS } from "./advanced-optics";
import { SYSTEM_DESIGN_CASES } from "./system-design-cases";

import type { DeckInfo } from "./types";
import { LEVEL_ORDER } from "./types";

export type { DeckInfo } from "./types";
export { LEVEL_LABELS, LEVEL_ORDER } from "./types";
export type { DeckLevel } from "./types";

/** All available decks, sorted by level then title */
export const DECK_LIBRARY: DeckInfo[] = [
  // Original
  BIG_O_DATA_STRUCTURES,
  BIG_O_ALGORITHMS,
  BIG_O_CONTROL_STRUCTURES,
  DSA_PRACTICAL_USES,
  LEETCODE_PATTERNS,
  LEETCODE_PROBLEMS,
  ADVANCED_DATA_STRUCTURES,
  ADVANCED_ALGORITHMS,
  SYSTEM_DESIGN,
  CONCURRENCY_PARALLELISM,
  DATABASE_INTERNALS,
  OOP_DESIGN,
  BEHAVIORAL_INTERVIEW,
  SYSTEM_DESIGN_ESTIMATION,
  NETWORKING_FUNDAMENTALS,
  OPERATING_SYSTEMS,
  DESIGN_PATTERNS,
  API_DESIGN,
  SECURITY_FUNDAMENTALS,
  DISTRIBUTED_SYSTEMS_DEEP,
  LEETCODE_PROBLEMS_EXTENDED,
  // Phase A — DSA
  GRAPH_ALGORITHMS,
  DYNAMIC_PROGRAMMING,
  SORTING_SEARCHING,
  TREES_ADVANCED,
  GREEDY_BIT_MANIPULATION,
  DATA_STRUCTURES_DEEP,
  RECURSION_FUNDAMENTALS,
  ALGORITHMIC_PROBLEM_SOLVING,
  // Phase B — ML / AI
  ML_FUNDAMENTALS,
  NEURAL_NETWORKS,
  TRANSFORMERS_ATTENTION,
  LLM_FUNDAMENTALS,
  PROMPT_ENGINEERING,
  ML_ALGORITHMS,
  ML_SYSTEM_DESIGN,
  NLP_FUNDAMENTALS,
  REINFORCEMENT_LEARNING,
  AI_ETHICS_SAFETY,
  // Phase C — Cloud / DevOps
  DOCKER_KUBERNETES,
  CICD_DEVOPS,
  CLOUD_FUNDAMENTALS,
  DEVOPS_PRACTICES,
  INFRASTRUCTURE_AS_CODE,
  OBSERVABILITY_MONITORING,
  // Phase D — Web / SWE
  HTTP_WEB_PROTOCOLS,
  GRAPHQL_API_PATTERNS,
  TESTING_CODE_QUALITY,
  BROWSER_INTERNALS,
  SOFTWARE_ARCHITECTURE,
  TYPESCRIPT_REACT_DEEP,
  // Phase E — CS Theory
  DISCRETE_MATH_CS,
  PROBABILITY_STATS_ML,
  LINEAR_ALGEBRA_ML,
  COMPILER_DESIGN,
  INFO_THEORY_CRYPTO,
  // Phase F — Languages & Case Studies
  PYTHON_ESSENTIALS,
  JAVASCRIPT_DEEP_DIVE,
  SQL_MASTERY,
  GO_FUNDAMENTALS,
  RUST_OWNERSHIP,
  LINEAR_TYPES_AND_OWNERSHIP,
  FUNCTIONAL_PROGRAMMING_FOUNDATIONS,
  ADVANCED_FUNCTIONAL_PROGRAMMING,
  CATEGORY_THEORY_FOR_PROGRAMMERS,
  EFFECT_SYSTEMS,
  HASKELL_SCALA_OCAML,
  PARSER_COMBINATORS,
  DEPENDENT_TYPES_AND_GADTS,
  STREAMING_AND_FRP,
  DENOTATIONAL_SEMANTICS,
  THEOREM_PROVING_WITH_COQ_AGDA_IDRIS,
  PROFUNCTORS_ARROWS_AND_FREE_APPLICATIVES,
  EFFECT_HANDLERS_IN_DEPTH,
  ADVANCED_OPTICS,
  SYSTEM_DESIGN_CASES,
].sort((a, b) => {
  const la = LEVEL_ORDER.indexOf(a.level);
  const lb = LEVEL_ORDER.indexOf(b.level);
  if (la !== lb) return la - lb;
  return a.title.localeCompare(b.title);
});

/** Group decks by level for UI rendering */
export function getDecksByLevel(): Map<string, DeckInfo[]> {
  const grouped = new Map<string, DeckInfo[]>();
  for (const deck of DECK_LIBRARY) {
    const existing = grouped.get(deck.level) ?? [];
    existing.push(deck);
    grouped.set(deck.level, existing);
  }
  return grouped;
}

/** Get total card count across all decks */
export function getTotalCardCount(): number {
  return DECK_LIBRARY.reduce((sum, d) => sum + d.cards.length, 0);
}

// Re-export individual decks for direct imports
export {
  // Original
  BIG_O_DATA_STRUCTURES,
  BIG_O_ALGORITHMS,
  BIG_O_CONTROL_STRUCTURES,
  DSA_PRACTICAL_USES,
  LEETCODE_PATTERNS,
  LEETCODE_PROBLEMS,
  ADVANCED_DATA_STRUCTURES,
  ADVANCED_ALGORITHMS,
  SYSTEM_DESIGN,
  CONCURRENCY_PARALLELISM,
  DATABASE_INTERNALS,
  OOP_DESIGN,
  BEHAVIORAL_INTERVIEW,
  SYSTEM_DESIGN_ESTIMATION,
  NETWORKING_FUNDAMENTALS,
  OPERATING_SYSTEMS,
  DESIGN_PATTERNS,
  API_DESIGN,
  SECURITY_FUNDAMENTALS,
  DISTRIBUTED_SYSTEMS_DEEP,
  LEETCODE_PROBLEMS_EXTENDED,
  // Phase A — DSA
  GRAPH_ALGORITHMS,
  DYNAMIC_PROGRAMMING,
  SORTING_SEARCHING,
  TREES_ADVANCED,
  GREEDY_BIT_MANIPULATION,
  DATA_STRUCTURES_DEEP,
  RECURSION_FUNDAMENTALS,
  ALGORITHMIC_PROBLEM_SOLVING,
  // Phase B — ML / AI
  ML_FUNDAMENTALS,
  NEURAL_NETWORKS,
  TRANSFORMERS_ATTENTION,
  LLM_FUNDAMENTALS,
  PROMPT_ENGINEERING,
  ML_ALGORITHMS,
  ML_SYSTEM_DESIGN,
  NLP_FUNDAMENTALS,
  REINFORCEMENT_LEARNING,
  AI_ETHICS_SAFETY,
  // Phase C — Cloud / DevOps
  DOCKER_KUBERNETES,
  CICD_DEVOPS,
  CLOUD_FUNDAMENTALS,
  DEVOPS_PRACTICES,
  INFRASTRUCTURE_AS_CODE,
  OBSERVABILITY_MONITORING,
  // Phase D — Web / SWE
  HTTP_WEB_PROTOCOLS,
  GRAPHQL_API_PATTERNS,
  TESTING_CODE_QUALITY,
  BROWSER_INTERNALS,
  SOFTWARE_ARCHITECTURE,
  TYPESCRIPT_REACT_DEEP,
  // Phase E — CS Theory
  DISCRETE_MATH_CS,
  PROBABILITY_STATS_ML,
  LINEAR_ALGEBRA_ML,
  COMPILER_DESIGN,
  INFO_THEORY_CRYPTO,
  // Phase F — Languages & Case Studies
  PYTHON_ESSENTIALS,
  JAVASCRIPT_DEEP_DIVE,
  SQL_MASTERY,
  GO_FUNDAMENTALS,
  RUST_OWNERSHIP,
  LINEAR_TYPES_AND_OWNERSHIP,
  FUNCTIONAL_PROGRAMMING_FOUNDATIONS,
  ADVANCED_FUNCTIONAL_PROGRAMMING,
  CATEGORY_THEORY_FOR_PROGRAMMERS,
  EFFECT_SYSTEMS,
  HASKELL_SCALA_OCAML,
  PARSER_COMBINATORS,
  DEPENDENT_TYPES_AND_GADTS,
  STREAMING_AND_FRP,
  DENOTATIONAL_SEMANTICS,
  THEOREM_PROVING_WITH_COQ_AGDA_IDRIS,
  PROFUNCTORS_ARROWS_AND_FREE_APPLICATIVES,
  EFFECT_HANDLERS_IN_DEPTH,
  ADVANCED_OPTICS,
  SYSTEM_DESIGN_CASES,
};
