import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "SOLID Principles",
    front: "What are the SOLID principles?\n\nGive a brief example of each.",
    back: "S - Single Responsibility:\n  A class has ONE reason to change.\n  Bad: UserService handles auth + email.\n  Good: AuthService + EmailService.\n\nO - Open/Closed:\n  Open for extension, closed for modification.\n  Add behavior via new classes, not\n  editing existing ones.\n  Strategy pattern, polymorphism.\n\nL - Liskov Substitution:\n  Subtypes must be substitutable for\n  their base types.\n  Bad: Square extends Rectangle\n  (setWidth breaks setHeight invariant).\n\nI - Interface Segregation:\n  No client should depend on methods\n  it doesn't use.\n  Bad: IWorker { work(), eat() }\n  Good: IWorkable { work() }\n        IFeedable { eat() }\n\nD - Dependency Inversion:\n  High-level modules should not depend\n  on low-level modules.\n  Both should depend on abstractions.\n  Inject interfaces, not concrete classes.\n\nSOLID enables:\n  - Easier testing (mock interfaces).\n  - Flexible extension.\n  - Reduced coupling.\n  - Better maintainability.",
  },
  {
    topic: "Clean Architecture",
    front: "What is Clean Architecture?\n\nDescribe the dependency rule.",
    back: "Clean Architecture (Robert C. Martin):\n  Layers with dependencies pointing INWARD.\n\n  Outer layers depend on inner layers.\n  Inner layers know nothing about outer.\n\n  Layers (outside -> inside):\n  4. Frameworks & Drivers:\n     Web framework, DB, UI.\n  3. Interface Adapters:\n     Controllers, presenters, gateways.\n  2. Use Cases (Application):\n     Business rules, orchestration.\n  1. Entities (Domain):\n     Core business objects and rules.\n\nDependency Rule:\n  Source code dependencies can only\n  point INWARD. Nothing in an inner\n  circle can know about an outer circle.\n\nBenefits:\n  - Framework independent.\n  - Testable (inner layers have no deps).\n  - UI independent (swap React for CLI).\n  - DB independent (swap Postgres for Mongo).\n\nRelated patterns:\n  Hexagonal Architecture (Ports & Adapters).\n  Onion Architecture.\n  All share: domain at center,\n  infrastructure at edges.",
  },
  {
    topic: "DDD (Domain-Driven Design)",
    front: "What are the key concepts\nin Domain-Driven Design?",
    back: "Strategic patterns:\n\n  Bounded Context:\n    Explicit boundary around a model.\n    'User' in Auth != 'User' in Billing.\n    Each context has its own language.\n\n  Ubiquitous Language:\n    Team and code use same terms.\n    'Order', 'Shipment' mean same thing\n    to developers AND domain experts.\n\n  Context Map:\n    How bounded contexts relate.\n    Upstream/downstream relationships.\n\nTactical patterns:\n\n  Entity: Has identity (ID).\n    Two users with same name != same user.\n\n  Value Object: No identity, defined by value.\n    Money(100, 'USD') == Money(100, 'USD').\n    Immutable.\n\n  Aggregate: Cluster of entities.\n    Aggregate root: entry point.\n    Order (root) -> OrderLines -> Product.\n    Consistency boundary.\n\n  Repository: Persistence abstraction.\n    userRepo.findById(id)\n\n  Domain Event: Something that happened.\n    OrderPlaced, PaymentReceived.\n\n  Domain Service: Logic not belonging\n    to any entity. TransferService.",
  },
  {
    topic: "Twelve-Factor App",
    front:
      "What is the Twelve-Factor App\nmethodology?\n\nList the 12 factors.",
    back: "Methodology for building modern,\nscalable, deployable SaaS apps.\n\n1.  Codebase:\n    One repo per app, many deploys.\n2.  Dependencies:\n    Explicitly declare and isolate.\n3.  Config:\n    Store in environment variables.\n4.  Backing Services:\n    Treat as attached resources.\n5.  Build, Release, Run:\n    Strictly separate stages.\n6.  Processes:\n    Stateless, share-nothing.\n7.  Port Binding:\n    Export services via port.\n8.  Concurrency:\n    Scale via process model.\n9.  Disposability:\n    Fast startup, graceful shutdown.\n10. Dev/Prod Parity:\n    Keep environments similar.\n11. Logs:\n    Treat as event streams.\n12. Admin Processes:\n    Run as one-off processes.\n\nKey themes:\n  Stateless processes (scale horizontally).\n  Config in env (not code).\n  Disposable (containers, serverless).\n  Automation (CI/CD, IaC).",
  },
  {
    topic: "Technical Debt",
    front: "What is technical debt?\n\nHow do you manage it effectively?",
    back: "Technical Debt: Shortcuts in code\nthat save time now but cost more later.\n\nTypes:\n  Deliberate/Prudent:\n    'Ship now, refactor next sprint.'\n    Known tradeoff, planned payoff.\n\n  Deliberate/Reckless:\n    'We don't have time for tests.'\n    Known shortcut, no payoff plan.\n\n  Inadvertent/Prudent:\n    'Now I know how I should have done it.'\n    Learning reveals better approach.\n\n  Inadvertent/Reckless:\n    'What is layering?'\n    Lack of knowledge.\n\nManaging debt:\n1. Track it: Label in issue tracker.\n2. Make it visible: Debt dashboard.\n3. Pay it down incrementally:\n   20% rule (20% sprint capacity).\n4. Don't let it compound:\n   Fix as you go (Boy Scout Rule).\n5. Prioritize by impact:\n   Debt in hot paths > rarely-touched code.\n6. Write ADRs (Architecture Decision Records)\n   to document WHY decisions were made.\n\nMetrics: Code churn, bug density,\ntime to implement features.",
  },
  {
    topic: "Microservices vs Monolith",
    front: "When should you choose microservices\nvs a monolith?",
    back: "Monolith:\n  Single deployable unit.\n  + Simpler development and debugging.\n  + No network overhead between modules.\n  + Easier transactions (ACID).\n  + Better for small teams (< 10).\n  - Scaling is all-or-nothing.\n  - Deploys affect entire app.\n  - Technology lock-in.\n\nMicroservices:\n  Independent, loosely coupled services.\n  + Independent deployment.\n  + Scale individual services.\n  + Tech diversity per service.\n  + Team autonomy (Conway's Law).\n  - Network complexity.\n  - Distributed transactions.\n  - Operational overhead (K8s, etc).\n  - Debugging across services hard.\n\nStart monolith, extract later:\n  'Monolith first' (Martin Fowler).\n  Extract services at natural boundaries\n  when team/scale demands it.\n\nModular monolith (middle ground):\n  One deployable, clear module boundaries.\n  Can extract to services later.\n\nConway's Law:\n  System architecture mirrors\n  organization communication structure.",
  },
  {
    topic: "Event-Driven Architecture",
    front:
      "What is event-driven architecture?\n\nCompare event sourcing vs CQRS.",
    back: "Event-Driven Architecture:\n  Components communicate via events.\n  Loose coupling, async processing.\n\nPatterns:\n  Event Notification:\n    'OrderPlaced' -> other services react.\n    Minimal data in event.\n\n  Event-Carried State Transfer:\n    Event contains full data.\n    Consumers maintain local copies.\n    Reduces query dependencies.\n\nEvent Sourcing:\n  Store ALL events, derive state.\n  OrderCreated -> ItemAdded -> ItemRemoved\n  -> OrderSubmitted -> OrderShipped.\n  Replay events to rebuild state.\n  + Complete audit trail.\n  + Time travel (state at any point).\n  - Complexity, eventual consistency.\n  - Event schema evolution.\n\nCQRS (Command Query Responsibility Seg.):\n  Separate write model from read model.\n  Commands: Validate and write.\n  Queries: Optimized read projections.\n  + Scale reads/writes independently.\n  + Optimized read models.\n  - Eventual consistency.\n  - Complexity.\n\nOften combined:\n  Event Sourcing (write) +\n  CQRS (separate read projections) +\n  Event bus (Kafka, RabbitMQ).",
  },
  {
    topic: "Git Advanced",
    front: "What Git commands should every\ndeveloper master?",
    back: "Daily workflow:\n  git stash / git stash pop\n    Save in-progress work temporarily.\n\n  git rebase -i HEAD~5\n    Squash, reorder, edit commits.\n    Clean history before merge.\n\n  git cherry-pick <sha>\n    Apply single commit to another branch.\n\n  git bisect start/good/bad\n    Binary search for bug-introducing commit.\n\nUndo mistakes:\n  git reset --soft HEAD~1\n    Undo commit, keep changes staged.\n  git reset --hard HEAD~1\n    Undo commit AND changes (destructive).\n  git reflog\n    Find lost commits (safety net).\n  git revert <sha>\n    Create new commit that undoes change.\n    Safe for shared branches.\n\nAdvanced:\n  git worktree add ../feature feature-branch\n    Multiple working directories.\n  git blame -L 10,20 file.ts\n    Who changed these lines.\n  git log --oneline --graph --all\n    Visual branch history.\n  git diff --stat main..feature\n    Summary of changes between branches.\n\nRules:\n  Never force-push to main/shared branches.\n  Rebase local, merge shared.",
  },
];

export const SOFTWARE_ARCHITECTURE: DeckInfo = {
  id: "software-architecture",
  title: "Software Architecture & Practices",
  description:
    "SOLID, Clean Architecture, DDD, Twelve-Factor, tech debt management, microservices vs monolith, event-driven, and Git mastery.",
  category: "Software Eng",
  level: "intermediate",
  cards,
  tags: [
    "SOLID",
    "architecture",
    "DDD",
    "microservices",
    "Git",
    "twelve-factor",
  ],
  estimatedMinutes: 12,
};
