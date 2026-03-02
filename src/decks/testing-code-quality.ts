import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Testing Pyramid",
    front:
      "What is the testing pyramid?\n\nWhat types of tests belong\nat each level?",
    back: "Testing Pyramid (bottom to top):\n\n        /  E2E  \\        <- Few, slow, costly\n       / Integr. \\       <- Medium count\n      /   Unit    \\      <- Many, fast, cheap\n\nUnit Tests (base):\n  Test single function/class.\n  Mock dependencies.\n  Run in milliseconds.\n  Aim: 70-80% of all tests.\n  Tools: Jest, pytest, JUnit.\n\nIntegration Tests (middle):\n  Test components working together.\n  Real DB, real HTTP calls.\n  Run in seconds.\n  Aim: 15-20% of tests.\n  Tools: Supertest, testcontainers.\n\nE2E Tests (top):\n  Test full user flows.\n  Real browser/app.\n  Run in minutes.\n  Aim: 5-10% of tests.\n  Tools: Playwright, Cypress, Selenium.\n\nAlternative: Testing Trophy (Kent Dodds).\n  Emphasizes integration tests more.\n  Static -> Unit -> Integration -> E2E.\n  'Write tests. Not too many.\n   Mostly integration.'",
  },
  {
    topic: "Test-Driven Development",
    front: "What is TDD?\n\nDescribe the Red-Green-Refactor cycle.",
    back: "TDD: Write tests BEFORE implementation.\n\nRed-Green-Refactor cycle:\n\n1. RED: Write a failing test.\n   Define expected behavior.\n   Test should fail (no code yet).\n\n2. GREEN: Write minimal code to pass.\n   Simplest possible implementation.\n   Don't optimize or refactor yet.\n\n3. REFACTOR: Improve the code.\n   Clean up duplication.\n   Improve naming.\n   Optimize if needed.\n   Tests still pass.\n\nRepeat for next behavior.\n\nBenefits:\n  + Forces clear requirements thinking.\n  + High test coverage by default.\n  + Regression safety.\n  + Small incremental steps.\n  + Tests document behavior.\n\nCriticism:\n  - Slower initially.\n  - Hard for UI/visual work.\n  - Over-testing implementation details.\n  - Difficult for exploratory/prototype work.\n\nVariant: BDD (Behavior-Driven Development).\n  Given/When/Then syntax.\n  Business-readable test descriptions.\n  Tools: Cucumber, behave.",
  },
  {
    topic: "Mocking & Test Doubles",
    front: "What are the types of test doubles?\n\nWhen should you use each?",
    back: "Test Doubles (Gerard Meszaros):\n\n1. Dummy: Passed but never used.\n   Fill parameter lists.\n   new User('dummy', 'dummy@test.com')\n\n2. Stub: Returns pre-programmed answers.\n   db.getUser = () => ({ id: 1, name: 'Jo' })\n   Use: Isolate from dependencies.\n\n3. Spy: Records calls made to it.\n   const spy = jest.fn();\n   expect(spy).toHaveBeenCalledWith(42);\n   Use: Verify interactions.\n\n4. Mock: Pre-programmed with expectations.\n   Verifies correct calls were made.\n   Use: Verify behavior.\n\n5. Fake: Working but simplified.\n   In-memory database instead of real DB.\n   Use: Fast tests needing real behavior.\n\nWhen to mock:\n  External services (APIs, DB).\n  Non-deterministic (time, random).\n  Slow operations (network, disk).\n\nWhen NOT to mock:\n  Simple value objects.\n  Core business logic.\n  When integration test is better.\n\nOver-mocking = brittle tests that\ntest implementation, not behavior.",
  },
  {
    topic: "Code Coverage",
    front:
      "What types of code coverage exist?\n\nIs 100% coverage a good goal?",
    back: "Coverage types:\n\n  Line coverage: % of lines executed.\n  Branch coverage: % of if/else branches.\n  Function coverage: % of functions called.\n  Statement coverage: % of statements.\n  Path coverage: % of execution paths\n    (exponential -- rarely practical).\n\nBranch > line coverage:\n  if (a && b) { x() } else { y() }\n  Line: 2 tests (true & false paths).\n  Branch: 4 tests (all combinations).\n\nIs 100% a good goal? No.\n\n80-90% is typical good target.\n\nProblems with 100%:\n- Tests for trivial code (getters/setters).\n- Tests that exercise code but don't\n  assert meaningful behavior.\n- False confidence.\n- Slow test suites.\n\nWhat coverage misses:\n- Doesn't verify correctness.\n- Missing test cases (edge cases).\n- Error handling quality.\n- Integration between components.\n\nBetter metric:\n  Mutation testing: Modify code, verify\n  tests catch the change. Tools: Stryker,\n  PIT, mutmut.",
  },
  {
    topic: "Property-Based Testing",
    front:
      "What is property-based testing?\n\nHow does it differ from\nexample-based testing?",
    back: "Example-based (traditional):\n  Specific input -> expected output.\n  add(2, 3) => 5\n  add(0, 0) => 0\n  You choose the examples.\n\nProperty-based:\n  Define properties that must hold\n  for ALL inputs. Framework generates\n  random test cases.\n\nProperties for sort():\n  1. Output length = input length.\n  2. Every output element was in input.\n  3. Output is ordered.\n  (These properties fully specify sort.)\n\nProperties for add(a, b):\n  Commutative: add(a,b) = add(b,a).\n  Associative: add(add(a,b),c) = add(a,add(b,c)).\n  Identity: add(a, 0) = a.\n\nShrinking:\n  When failure found, framework minimizes\n  the failing input to simplest case.\n  Fail on [42, -7, 3] -> shrinks to [-7, 3].\n\nTools:\n  fast-check (JS/TS).\n  Hypothesis (Python).\n  QuickCheck (Haskell, original).\n  jqwik (Java).\n\nBest for: parsers, serializers,\ndata transformations, algorithms.",
  },
  {
    topic: "Refactoring Patterns",
    front: "What are the most valuable\nrefactoring patterns?",
    back: "Extract Method:\n  Long function -> smaller named functions.\n  Improves readability and reuse.\n\nExtract Class:\n  Class doing too much -> split.\n  Single Responsibility Principle.\n\nReplace Conditional with Polymorphism:\n  if (type === 'A') ... else if ...\n  -> Interface + implementations.\n\nIntroduce Parameter Object:\n  fn(x, y, z, w) -> fn(config: Config).\n  Groups related parameters.\n\nReplace Magic Numbers:\n  if (status === 3) ->\n  if (status === STATUS.APPROVED).\n\nDecompose Conditional:\n  Complex if condition ->\n  isEligible() method.\n\nRename (most common refactoring):\n  Better names = better documentation.\n\nMove Method:\n  Method in wrong class -> move it\n  to where the data lives.\n\nWhen to refactor:\n  Rule of Three: Duplicate 3 times -> extract.\n  Boy Scout Rule: Leave code cleaner\n  than you found it.\n  Before adding feature to messy code.\n  After tests pass (refactor step of TDD).",
  },
  {
    topic: "Code Smells",
    front: "What are common code smells\nand how do you fix them?",
    back: "Long Method (> 20-30 lines):\n  Fix: Extract methods.\n\nGod Class (does everything):\n  Fix: Extract classes by responsibility.\n\nFeature Envy (uses other class's data):\n  Fix: Move method to that class.\n\nData Clumps (same params everywhere):\n  Fix: Extract into a class/type.\n\nPrimitive Obsession:\n  Email as string, Money as number.\n  Fix: Value objects (Email, Money types).\n\nShotgun Surgery (one change, many files):\n  Fix: Move related code together.\n\nDivergent Change (one file, many reasons):\n  Fix: Split into focused classes.\n\nDead Code (unused functions/branches):\n  Fix: Delete it. Git remembers.\n\nComments explaining WHAT (not WHY):\n  Fix: Rename to be self-documenting.\n  Bad:  // check if user is active\n  Good: if (user.isActive())\n\nLong Parameter List (> 3-4 params):\n  Fix: Parameter object or builder.\n\nDuplicate Code:\n  Fix: Extract common code.\n  DRY (Don't Repeat Yourself).",
  },
  {
    topic: "Static Analysis & Linting",
    front: "What are static analysis tools\nand why use them?",
    back: "Static analysis: Examine code without\nexecuting it. Catch bugs early.\n\nLinters (style + simple bugs):\n  ESLint (JS/TS): Rules, plugins.\n  Prettier (formatting only).\n  Pylint / Ruff (Python).\n  golangci-lint (Go).\n  Clippy (Rust).\n\nType checkers:\n  TypeScript: Compile-time type safety.\n  mypy (Python): Optional typing.\n  Flow (JS): Type annotations.\n\nSecurity scanners:\n  Semgrep: Custom pattern rules.\n  SonarQube: Quality + security.\n  Snyk / Dependabot: Dependency vulns.\n  Bandit (Python security).\n\nBenefits:\n  Catch bugs before tests/review.\n  Enforce consistent style.\n  Find security vulnerabilities.\n  Reduce code review nitpicks.\n  Document team conventions.\n\nBest practices:\n  Run in CI (fail build on violations).\n  Pre-commit hooks (local).\n  Auto-fix where possible.\n  Team agrees on rules.\n  Don't suppress without explanation.\n\nLint rule as documentation:\n  'Why no console.log?' ->\n  eslint no-console rule.",
  },
];

export const TESTING_CODE_QUALITY: DeckInfo = {
  id: "testing-code-quality",
  title: "Testing Strategies & Code Quality",
  description:
    "Testing pyramid, TDD, mocking, coverage, property-based testing, refactoring patterns, code smells, and static analysis.",
  category: "Software Eng",
  level: "intermediate",
  cards,
  tags: ["testing", "TDD", "refactoring", "code smells", "linting", "coverage"],
  estimatedMinutes: 12,
};
