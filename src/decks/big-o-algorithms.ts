import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Bubble Sort",
    front:
      "What are the time and space complexities\nof Bubble Sort?\n\n(compare adjacent pairs, swap, repeat)",
    back: "Best:    O(n)   - already sorted\nAverage: O(n^2)\nWorst:   O(n^2)\nSpace:   O(1) - in-place\n\nNot used in practice; useful for teaching\nand for nearly-sorted tiny datasets.",
  },
  {
    topic: "Selection Sort",
    front:
      "What are the time and space complexities\nof Selection Sort?\n\n(find min, swap to front, repeat)",
    back: "Best:    O(n^2)\nAverage: O(n^2)\nWorst:   O(n^2)\nSpace:   O(1) - in-place\n\nAlways O(n^2) comparisons regardless\nof input order. Minimizes swaps (n-1).",
  },
  {
    topic: "Insertion Sort",
    front:
      "What are the time and space complexities\nof Insertion Sort?\n\n(build sorted prefix, insert each element)",
    back: "Best:    O(n)   - already sorted\nAverage: O(n^2)\nWorst:   O(n^2)\nSpace:   O(1) - in-place\n\nExcellent for small or nearly-sorted\narrays; used inside Timsort for small runs.\n\nLike sorting cards in your hand one by one.",
  },
  {
    topic: "Merge Sort",
    front:
      "What are the time and space complexities\nof Merge Sort?\n\n(divide, sort halves, merge)",
    back: 'Best / Avg / Worst: O(n log n)\nSpace: O(n) - auxiliary array\n\nStable sort; predictable O(n log n) in\nall cases. Extra memory is the tradeoff.\nPreferred for sorting linked lists.\n\n"Divide to conquer, merge to order."',
  },
  {
    topic: "Quick Sort",
    front:
      "What are the time and space complexities\nof Quick Sort?\n\n(partition around pivot, recurse)",
    back: 'Best / Average: O(n log n)\nWorst:          O(n^2) - bad pivot\nSpace: O(log n) avg stack depth\n\nFastest in practice (cache friendly).\nWorst case avoided with random pivot\nor median-of-three strategy.\n\n"Pivot is king - choose wisely."',
  },
  {
    topic: "Heap Sort",
    front: "What are the time and space complexities\nof Heap Sort?",
    back: "Best / Avg / Worst: O(n log n)\nSpace: O(1) - in-place\n\nObtains O(n log n) worst-case AND O(1)\nextra space (unlike Merge Sort).\nNot stable; poor cache performance.",
  },
  {
    topic: "Counting Sort",
    front:
      "What are the time and space complexities\nof Counting Sort?\n\n(integer keys in range [0, k])",
    back: "Time:  O(n + k)\nSpace: O(k)\n\nLinear time because no comparisons are\nmade - elements are bucketed by value.\nOnly works for small integer ranges.",
  },
  {
    topic: "Radix Sort",
    front:
      "What are the time and space complexities\nof Radix Sort (LSD)?\n\n(sort digit by digit)",
    back: "Time:  O(n * d) where d = digits\nSpace: O(n + b) b = base\n\nWith fixed-width integers d = constant\n-> effectively O(n). Uses stable counting\nsort as sub-routine for each digit.",
  },
  {
    topic: "Bucket Sort",
    front:
      "What are the time and space complexities\nof Bucket Sort?\n\n(distribute into buckets, sort each)",
    back: "Best/Average: O(n + k)\nWorst:        O(n^2)\nSpace:        O(n + k)\n\nAssumes uniform distribution.\nk = number of buckets.\nWorst case: all elements in one bucket.",
  },
  {
    topic: "Timsort",
    front:
      "What is Timsort and what is its\ntime complexity?\n\n(Python's default, Java Arrays.sort)",
    back: 'Best:    O(n)   - nearly sorted\nAverage: O(n log n)\nWorst:   O(n log n)\nSpace:   O(n)\n\nHybrid: merge sort + insertion sort.\nExploits existing sorted runs ("galloping").\nStable sort.',
  },
  {
    topic: "Binary Search",
    front: "What is the time complexity of\nBinary Search on a sorted array?",
    back: "Time:  O(log n)\nSpace: O(1) iterative / O(log n) recursive\n\nHalves the search space each step.\nRequires sorted input.\nUsed everywhere: arrays, trees, answers.",
  },
  {
    topic: "Linear Search",
    front: "What is the time complexity of\nLinear Search (sequential search)?",
    back: "Time:  O(n)\nSpace: O(1)\n\nChecks every element until found.\nWorks on unsorted data.\nNo preprocessing required.",
  },
  {
    topic: "BFS - Breadth-First Search",
    front:
      "What are the time and space complexities\nof BFS on a graph?\n\nV = vertices,  E = edges",
    back: "Time:  O(V + E)\nSpace: O(V) - visited set + queue\n\nEach vertex is enqueued once (O(V))\nand each edge is relaxed once (O(E)).\nFinds shortest path in unweighted graphs.\n\nThink level by level, like ripples in a pond.",
  },
  {
    topic: "DFS - Depth-First Search",
    front:
      "What are the time and space complexities\nof DFS on a graph?\n\nV = vertices,  E = edges",
    back: "Time:  O(V + E)\nSpace: O(V) - recursion / explicit stack\n\nEach vertex and edge is visited once.\nUsed for cycle detection, topological sort,\nconnected components, and path finding.",
  },
  {
    topic: "Dijkstra's Algorithm",
    front:
      "You need shortest driving routes from\nyour warehouse to all stores. All roads\nhave positive distances.\n\nWhat algorithm and time complexity?\n(with a min-heap priority queue)",
    back: "Dijkstra's Algorithm\n\nTime:  O((V + E) log V)\nSpace: O(V)\n\nExtracts each vertex from heap: O(V log V)\nRelaxes each edge: O(E log V)\nDoes NOT work with negative edges.",
  },
  {
    topic: "Bellman-Ford Algorithm",
    front:
      "What is the time complexity of\nBellman-Ford shortest-path algorithm?",
    back: "Time:  O(V * E)\nSpace: O(V)\n\nRelaxes all edges V-1 times.\nHandles negative edge weights.\nDetects negative-weight cycles\n(one more iteration finds changes).",
  },
  {
    topic: "Floyd-Warshall Algorithm",
    front:
      "What is the time complexity of\nFloyd-Warshall all-pairs shortest paths?",
    back: "Time:  O(V^3)\nSpace: O(V^2)\n\nThree nested loops over V vertices.\nFinds shortest path between every pair.\nHandles negative weights (no neg cycles).\nDP approach using intermediate vertices.",
  },
  {
    topic: "Topological Sort",
    front:
      "What is the time complexity of\nTopological Sort on a DAG?\n\n(Kahn's BFS or DFS-based)",
    back: "Time:  O(V + E)\nSpace: O(V)\n\nProcess each vertex and edge once.\nOnly valid for DAGs (directed acyclic).\nUsed for: dependency resolution,\nbuild systems, course scheduling.",
  },
  {
    topic: "Kruskal's MST",
    front: "What is the time complexity of\nKruskal's Minimum Spanning Tree?",
    back: "Time:  O(E log E)\nSpace: O(V) for Union-Find\n\nSort edges by weight: O(E log E)\nUnion-Find for cycle detection:\n  nearly O(1) per operation\nBest for sparse graphs.",
  },
  {
    topic: "Prim's MST",
    front:
      "What is the time complexity of\nPrim's Minimum Spanning Tree?\n\n(with a min-heap)",
    back: "Time:  O((V + E) log V)\nSpace: O(V)\n\nSimilar to Dijkstra's approach.\nGrow MST from a starting vertex.\nBetter for dense graphs.\nWith Fibonacci heap: O(E + V log V).",
  },
  {
    topic: "Dynamic Programming - Fibonacci",
    front:
      "Compare the complexities of computing\nFibonacci(n) with:\n  A) Naive recursion\n  B) Memoisation / DP",
    back: "A) Naive recursion\n   Time:  O(2^n) - exponential!\n   Space: O(n)  - call stack\n\nB) Memoisation / Bottom-up DP\n   Time:  O(n) - linear\n   Space: O(n) - memo table\n     (O(1) with rolling variables)",
  },
  {
    topic: "Two-Pointer Technique",
    front:
      "Given a sorted array of prices, find two\nitems that sum to a target budget.\n\nWhat technique solves this in O(n)?",
    back: "Two-Pointer Technique\n\nTime:  O(n)   Space: O(1)\n\nOne pointer at start, one at end.\nSum too small -> move left pointer right.\nSum too large -> move right pointer left.\nAlso: removing duplicates, palindromes,\ncontainer with most water.",
  },
  {
    topic: "Sliding Window",
    front:
      "Find the maximum total sales in any\n7 consecutive days from a daily sales log.\n\nWhat technique solves this in O(n)?",
    back: "Sliding Window\n\nTime:  O(n)   Space: O(1) to O(k)\n\nMaintain a window [left, right] over\nthe array. Expand right, shrink left.\nAs window slides, add new and drop old.\nAlso: longest substring without repeats,\nminimum window substring.",
  },
  {
    topic: "Sorting Cheat Sheet - Time",
    front:
      "Rank these sorts by worst-case time:\n\n  Bubble, Insertion, Selection\n  Merge,  Quick,    Heap\n  Counting (k=n)",
    back: "O(n)       Counting Sort (k=n)\nO(n log n) Merge Sort (always)\nO(n log n) Heap Sort  (always)\nO(n^2)     Quick Sort (worst; avg n log n)\nO(n^2)     Bubble, Insertion, Selection\n\nKey: Quick Sort is O(n^2) worst case\nbut fastest in practice (cache friendly).",
  },
  {
    topic: "Sorting Cheat Sheet - Space & Stability",
    front:
      "For Bubble, Insertion, Merge, Quick,\nHeap, and Counting Sort:\n\nWhich are in-place? Which are stable?",
    back: "In-place (O(1) extra):\n  Bubble, Insertion, Heap, Selection\n\nNot in-place:\n  Merge O(n), Counting O(k), Quick O(log n)\n\nStable (preserve equal-key order):\n  Bubble, Insertion, Merge, Counting\n\nUnstable: Heap, Selection, Quick",
  },
  {
    topic: "Comparison Sort Lower Bound",
    front:
      "What is the lower bound for\ncomparison-based sorting algorithms?\n\nCan any comparison sort beat it?",
    back: "Lower bound: O(n log n)\n\nDecision tree argument: sorting n items\nneeds log2(n!) = O(n log n) compares.\n\nNo comparison sort can do better.\nCounting/Radix bypass this via bucketing.",
  },
  {
    topic: "When to Use Which Sort",
    front:
      "You need to choose a sorting algorithm.\nWhat sort for each scenario?\n\n1) Small array (< 20 elements)\n2) General-purpose, speed matters\n3) Must preserve order of equal keys\n4) Integers in a small known range",
    back: "1) Small -> Insertion Sort\n   Low overhead, fast on small n.\n2) General -> Quick Sort\n   Best avg cache performance.\n3) Stability needed -> Merge Sort\n   Guaranteed O(n log n) and stable.\n4) Small int range -> Counting Sort\n   O(n+k), no comparisons needed.\n\nReal-world: Timsort = Merge + Insertion.",
  },
  {
    topic: "Binary Search Invariant",
    front:
      "What must be true for binary search\nto work correctly?\n\nWhat are two common implementation\nmistakes?",
    back: "Requirement: monotonic property -\nthe search space must be sorted or\nhave a clear true/false boundary.\n\nCommon mistakes:\n1) Off-by-one: wrong lo<=hi vs lo<hi\n   or wrong mid+1 / mid-1 boundary.\n2) Overflow: mid = (lo+hi)/2 can\n   overflow. Use mid = lo+(hi-lo)/2.",
  },
];

export const BIG_O_ALGORITHMS: DeckInfo = {
  id: "big-o-algorithms",
  title: "Big O: Algorithms",
  description:
    "Time and space complexity for sorting, searching, graph traversal, shortest path, MST, and common algorithmic techniques.",
  level: "foundation",
  category: "Big O Notation",
  cards,
};
