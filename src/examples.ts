import type { Flashcard } from "./types";

export const BIG_O_CARDS: Flashcard[] = [
  // ── Arrays ──────────────────────────────────────────────────────────────────
  {
    topic: "Array – Access by Index",
    front:
      "What is the time complexity of accessing\nan element by index in an Array?\n\narr[i]",
    back: "Time:  O(1)  - Constant\nSpace: O(1)\n\nArrays occupy contiguous memory.\nAny index maps to a direct address offset,\nso no traversal is required.",
  },
  {
    topic: "Array – Linear Search",
    front:
      "What is the time complexity of searching\nfor a value in an unsorted Array?\n\nfor (x of arr) if (x === target) ...",
    back: "Time:  O(n)  - Linear\nSpace: O(1)\n\nIn the worst case every element must be\nexamined before finding the target\n(or confirming it is absent).",
  },
  {
    topic: "Array – Insertion at End",
    front:
      "What is the time complexity of inserting\nan element at the END of a dynamic Array?\n\narr.push(val)",
    back: "Time:  O(1) amortized\nSpace: O(1) amortized\n\nMost pushes are O(1), but occasional\nresizing copies all n elements -> O(n).\nAmortized across all operations = O(1).",
  },
  {
    topic: "Array – Insertion at Beginning",
    front:
      "What is the time complexity of inserting\nan element at the BEGINNING of an Array?\n\narr.unshift(val)",
    back: "Time:  O(n)  - Linear\nSpace: O(1)\n\nAll existing elements must be shifted\none position to the right to make room\nfor the new first element.",
  },
  // ── Linked Lists ─────────────────────────────────────────────────────────────
  {
    topic: "Linked List – Access / Search",
    front:
      "What is the time complexity of accessing\nan element by index in a Linked List?",
    back: "Time:  O(n)  - Linear\nSpace: O(1)\n\nLinked list nodes are not contiguous in\nmemory. Reaching index k requires walking\nthrough k->0 next pointers.",
  },
  {
    topic: "Linked List – Insert at Head",
    front:
      "What is the time complexity of inserting\na node at the HEAD of a Linked List?\n\nnewNode.next = head; head = newNode",
    back: "Time:  O(1)  - Constant\nSpace: O(1)\n\nOnly two pointer assignments needed;\nno traversal of the list is required.",
  },
  // ── Hash Table ────────────────────────────────────────────────────────────────
  {
    topic: "Hash Table – Lookup / Insert / Delete",
    front:
      "What is the AVERAGE time complexity\nfor lookup, insert, and delete\nin a Hash Table (HashMap)?",
    back: "Time:  O(1) average  |  O(n) worst\nSpace: O(n)\n\nA good hash function distributes keys\nuniformly. Worst-case occurs when all\nkeys collide into one bucket -> O(n).",
  },
  // ── Stack & Queue ─────────────────────────────────────────────────────────────
  {
    topic: "Stack – Push / Pop / Peek",
    front: "What is the time complexity of\npush, pop, and peek on a Stack?",
    back: "Time:  O(1)  - Constant (all ops)\nSpace: O(n)\n\nA stack only ever touches the top element.\nWith an array or linked-list backing,\nall three operations are O(1).",
  },
  {
    topic: "Queue – Enqueue / Dequeue",
    front: "What is the time complexity of\nenqueue and dequeue on a Queue?",
    back: "Time:  O(1) amortized  (linked-list)\nSpace: O(n)\n\nWith a doubly-linked list (or circular\nbuffer) both ends are O(1). A naive\narray-based queue has O(n) dequeue.",
  },
  // ── Trees ─────────────────────────────────────────────────────────────────────
  {
    topic: "Binary Search Tree – Search / Insert",
    front: "What is the time complexity of\nsearch and insert in a BST?",
    back: "Time:  O(log n) balanced  |  O(n) skewed\nSpace: O(h)  where h = height\n\nA balanced BST (AVL, Red-Black) keeps\nh = log n. A degenerate (sorted input)\nBST degrades to a linked list -> O(n).",
  },
  {
    topic: "Binary Tree – Traversal (In/Pre/Post)",
    front:
      "What is the time complexity of\nin-order, pre-order, or post-order\ntraversal of a Binary Tree?",
    back: "Time:  O(n)  - Linear\nSpace: O(h)  call stack (h = height)\n\nEvery node is visited exactly once.\nFor a balanced tree h = O(log n),\nfor a skewed tree h = O(n).",
  },
  // ── Heap ─────────────────────────────────────────────────────────────────────
  {
    topic: "Binary Heap – Insert",
    front:
      "What is the time complexity of\ninserting an element into a Binary Heap?",
    back: 'Time:  O(log n)\nSpace: O(1)  (in-place sift-up)\n\nThe new element is appended at the end\nthen "bubbled up" until the heap property\nis restored - at most log2(n) swaps.',
  },
  {
    topic: "Binary Heap – Extract Min / Max",
    front:
      "What is the time complexity of\nremoving the root (min or max)\nfrom a Binary Heap?",
    back: 'Time:  O(log n)\nSpace: O(1)\n\nThe root is swapped with the last element,\nthen "sifted down" to restore heap order.\nAt most log2(n) comparisons required.',
  },
  {
    topic: "Binary Heap – Build (heapify)",
    front:
      "What is the time complexity of\nbuilding a heap from an unsorted array\nusing heapify?",
    back: "Time:  O(n)  <- surprising!\nSpace: O(1)  (in-place)\n\nBottom-up heapify performs O(n) total\nwork even though each sift-down is\nO(log n). Most nodes are near leaves.",
  },
  // ── Sorting ───────────────────────────────────────────────────────────────────
  {
    topic: "Bubble Sort",
    front:
      "What are the time and space complexities\nof Bubble Sort?\n\n(compare adjacent pairs, swap, repeat)",
    back: "Best:    O(n)   - already sorted\nAverage: O(n^2)\nWorst:   O(n^2)\nSpace:   O(1)  - in-place\n\nNot used in practice; useful for teaching\nand for nearly-sorted tiny datasets.",
  },
  {
    topic: "Insertion Sort",
    front:
      "What are the time and space complexities\nof Insertion Sort?\n\n(build sorted prefix, insert each element)",
    back: "Best:    O(n)   - already sorted\nAverage: O(n^2)\nWorst:   O(n^2)\nSpace:   O(1)  - in-place\n\nExcellent for small or nearly-sorted\narrays; used inside Timsort for small runs.",
  },
  {
    topic: "Merge Sort",
    front:
      "What are the time and space complexities\nof Merge Sort?\n\n(divide, sort halves, merge)",
    back: "Best / Avg / Worst: O(n log n)\nSpace: O(n)  - auxiliary array\n\nStable sort; predictable O(n log n) in\nall cases. Extra memory is the tradeoff.\nPreferred for sorting linked lists.",
  },
  {
    topic: "Quick Sort",
    front:
      "What are the time and space complexities\nof Quick Sort?\n\n(partition around pivot, recurse)",
    back: "Best / Average: O(n log n)\nWorst:          O(n^2)  - bad pivot\nSpace: O(log n) avg stack depth\n\nFastest in practice (cache friendly).\nWorst case avoided with random pivot\nor median-of-three strategy.",
  },
  {
    topic: "Heap Sort",
    front: "What are the time and space complexities\nof Heap Sort?",
    back: "Best / Avg / Worst: O(n log n)\nSpace: O(1)  - in-place\n\nObtains O(n log n) worst-case AND O(1)\nextra space (unlike Merge Sort).\nNot stable; poor cache performance.",
  },
  {
    topic: "Counting Sort",
    front:
      "What are the time and space complexities\nof Counting Sort?\n\n(integer keys in range [0, k])",
    back: "Time:  O(n + k)\nSpace: O(k)\n\nLinear time is possible because no\ncomparisons are made - elements are\nbucketed by value. Only works for\nsmall integer ranges.",
  },
  {
    topic: "Radix Sort",
    front:
      "What are the time and space complexities\nof Radix Sort (LSD)?\n\n(sort digit by digit)",
    back: "Time:  O(n * d)  where d = digits\nSpace: O(n + b)  b = base\n\nWith fixed-width integers d = constant\n-> effectively O(n). Uses stable counting\nsort as sub-routine for each digit.",
  },
  // ── Graphs ─────────────────────────────────────────────────────────────────
  {
    topic: "Graph – Breadth-First Search (BFS)",
    front:
      "What are the time and space complexities\nof BFS on a graph?\n\nV = vertices,  E = edges",
    back: "Time:  O(V + E)\nSpace: O(V)  - visited set + queue\n\nEach vertex is enqueued once (O(V))\nand each edge is relaxed once (O(E)).\nFinds shortest path in unweighted graphs.",
  },
  {
    topic: "Graph – Depth-First Search (DFS)",
    front:
      "What are the time and space complexities\nof DFS on a graph?\n\nV = vertices,  E = edges",
    back: "Time:  O(V + E)\nSpace: O(V)  - recursion / explicit stack\n\nEach vertex and edge is visited once.\nUsed for cycle detection, topological sort,\nconnected components, and path finding.",
  },
  // ── Dynamic Programming ──────────────────────────────────────────────────────
  {
    topic: "Dynamic Programming – Fibonacci",
    front:
      "Compare the complexities of computing\nFibonacci(n) with:\n  A) Naive recursion\n  B) Memoisation / DP",
    back: "A) Naive recursion\n   Time:  O(2^n)  - exponential!\n   Space: O(n)   - call stack\n\nB) Memoisation / Bottom-up DP\n   Time:  O(n)  - linear\n   Space: O(n)  - memo table\n      (O(1) with rolling variables)",
  },
  // ── Trie ─────────────────────────────────────────────────────────────────────
  {
    topic: "Trie – Insert / Search",
    front:
      "What are the time and space complexities\nof insert and search in a Trie?\n\n(prefix tree over an alphabet of size A)",
    back: "Time:  O(L)  where L = key length\nSpace: O(n * L * A)  - all nodes\n\nEvery character of the key is processed\nexactly once. Independent of how many\nkeys are stored - no comparisons needed.",
  },
  // ── Sorting comparison ────────────────────────────────────────────────────────
  {
    topic: "Sorting Algorithm Cheat Sheet",
    front:
      "Rank these sorts by worst-case time:\n\n  Bubble, Insertion, Selection\n  Merge,  Quick,    Heap\n  Counting (k=n)",
    back: "------------------------------\nO(n)      Counting Sort (k=n)\nO(n log n) Merge, Heap Sort\nO(n log n) Quick (avg) / O(n^2) worst\nO(n^2)    Bubble, Insertion, Selection\n------------------------------\nSpace:\n  O(1) in-place: Heap, Bubble, Insertion\n  O(n):          Merge, Counting\n  O(log n) stack: Quick",
  },
];

// ─── Derived example strings (generated from all 25 BIG_O_CARDS) ─────────────

function _yamlLiteral(s: string): string {
  return (
    "|\n" +
    s
      .split("\n")
      .map((l) => "    " + l)
      .join("\n")
  );
}

function _yamlQuote(s: string): string {
  return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
}

export const EXAMPLE_JSON = JSON.stringify(
  BIG_O_CARDS.map(({ front, back, topic }) => ({ topic, front, back })),
  null,
  2,
);

export const EXAMPLE_YAML =
  "# Big O Notation Flashcards (YAML) - all 25 cards\n" +
  BIG_O_CARDS.map(
    (c) =>
      `- topic: ${_yamlQuote(c.topic ?? "")}\n  front: ${_yamlLiteral(c.front)}\n  back: ${_yamlLiteral(c.back)}`,
  ).join("\n\n");

export const EXAMPLE_MARKDOWN =
  "# Big O Notation Flashcards - all 25 cards\n" +
  "# Format: === separates cards, --- separates front from back\n\n" +
  BIG_O_CARDS.map((c) => `===\n# ${c.topic}\n${c.front}\n---\n${c.back}`).join(
    "\n",
  ) +
  "\n===\n";
