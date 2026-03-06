import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Array vs Linked List",
    front:
      "Your music app needs a playlist where\nusers jump to any song by number and\nappend new songs at the end.\n\nArray or Linked List? Why?",
    back: "Array. O(1) random access by index,\nO(1) amortized append.\n\nLinked List needs O(n) to reach song #k.\n\nMnemonic: 'Array = Address book' (jump\nto any slot), 'Linked List = Treasure\nhunt' (follow clues one by one).\n\nUse LL for fast insert/delete mid-list.",
  },
  {
    topic: "HashMap vs TreeMap",
    front:
      "You're building a leaderboard that must\ndisplay players sorted by score and\nanswer 'who has rank 50-60?'\n\nHashMap or TreeMap?",
    back: "TreeMap (BST-based).\n- Keys in sorted order -> ranked display\n- Range queries: O(log n + k) for result\n- Floor/ceiling for nearest score\n\nHashMap can't do sorted iteration\nor range queries without sorting all keys.\n\nUse HashMap for pure key->value lookups\nwhere order doesn't matter. O(1) avg.",
  },
  {
    topic: "Stack in Practice",
    front:
      "A text editor needs an undo feature.\nEach action must be reversible in\nreverse chronological order.\n\nWhich data structure and why?",
    back: "Stack (LIFO - Last In, First Out).\nMost recent action is undone first.\nMnemonic: 'Stack of plates.'\n\nAlso used for:\n- Balanced parentheses checking\n- Expression evaluation (postfix)\n- DFS traversal (explicit stack)\n- Browser back button",
  },
  {
    topic: "Queue in Practice",
    front:
      "A print server receives jobs from\nmultiple users. Jobs must be processed\nin the order they arrive.\n\nWhich data structure and why?",
    back: "Queue (FIFO - First In, First Out).\nEarliest job prints first.\nMnemonic: 'Checkout line.'\n\nAlso: BFS traversal, task scheduling,\nmessage queues / event loops,\nrate limiting (sliding window).",
  },
  {
    topic: "Priority Queue / Heap",
    front:
      "An ER triage system must always treat\nthe most critical patient next, not the\none who arrived first.\n\nWhich data structure and why?",
    back: "Priority Queue (Binary Heap).\nO(log n) insert, O(1) peek min/max.\nServes by priority, not arrival order.\n\nAlso: Dijkstra's shortest path,\nmerge K sorted lists,\nrunning median (two heaps),\nHuffman encoding.",
  },
  {
    topic: "HashSet in Practice",
    front:
      "A web crawler needs to track which URLs\nit has already visited to avoid crawling\nthe same page twice.\n\nWhich data structure and why?",
    back: "HashSet. O(1) membership test.\nMnemonic: 'Bouncer with a guest list' -\ninstant yes/no, no searching needed.\n\nAlso: duplicate detection in streams,\ntwo-sum complement lookup,\nintersection/union of collections.\nTradeoff: O(n) space for O(1) lookup.",
  },
  {
    topic: "Trie in Practice",
    front:
      "A search engine needs to suggest\ncompletions as the user types each letter.\nResults must update after every keystroke.\n\nWhy is a Trie better than a HashMap here?",
    back: "Trie: one node per character typed.\nAutocomplete = traverse to prefix node,\nthen collect all descendants.\n\nHashMap can't do prefix queries\nwithout scanning all keys.\nTrie: O(prefix length) to reach node.\n\nAlso: spell check, IP routing, word search.",
  },
  {
    topic: "Graph - When to Use",
    front: "When should you model a problem\nas a Graph? Give examples.",
    back: "Model as graph when entities have\npairwise relationships:\n\n- Social networks (friend connections)\n- Maps/routing (roads between cities)\n- Dependencies (build systems)\n- Web crawling (page links)\n- State machines (transitions)\n- Network flow (capacity between nodes)",
  },
  {
    topic: "BFS vs DFS",
    front: "When should you use BFS vs DFS\nfor graph traversal?",
    back: "BFS (queue): shortest path (unweighted),\nlevel-order, closest to source,\nminimum moves/steps.\n\nDFS (stack/recursion): cycle detection,\ntopological sort, connected components,\npath existence, backtracking.",
  },
  {
    topic: "Binary Search - Beyond Arrays",
    front:
      "You must find the minimum eating speed\nto finish all banana piles in h hours.\nSpeed can be 1 to max(piles).\n\nHow is this a binary search problem?",
    back: "Binary search on ANSWER SPACE.\nMonotonic: if k works, so does k+1.\n\nlo=1, hi=max(piles)\nwhile lo<hi:\n  if canFinish(mid,h): hi=mid\n  else: lo=mid+1\n\nAlso: split array largest sum,\nsqrt, ship packages in d days.",
  },
  {
    topic: "Dynamic Programming - When",
    front: "How do you recognize a problem that\nneeds Dynamic Programming?",
    back: 'Two key properties:\n1. OPTIMAL SUBSTRUCTURE - optimal solution\n   built from optimal sub-solutions\n2. OVERLAPPING SUBPROBLEMS - same\n   subproblems solved repeatedly\n\nSignals: "minimum cost", "number of ways",\n"longest/shortest", "can you reach..."',
  },
  {
    topic: "Greedy vs DP",
    front: "When can you use Greedy instead of\nDynamic Programming?",
    back: "Greedy works when:\n- Local optimal -> globally optimal\n  (greedy choice property)\n- No need to reconsider past decisions\n\nExamples: coin change (canonical coins),\nactivity selection, Huffman coding.\nCounterexample: arbitrary coins needs DP.",
  },
  {
    topic: "Union-Find - Use Cases",
    front: "When should you use Union-Find\n(Disjoint Set Union)?",
    back: "Grouping/connectivity problems:\n- Are two nodes connected?\n- Number of connected components\n- Kruskal's MST (cycle detection)\n- Network connectivity\n- Accounts merge\n- Redundant connections\n\nOperations: union O(alpha(n)) ~ O(1)\n            find  O(alpha(n)) ~ O(1)",
  },
  {
    topic: "Monotonic Stack",
    front: "What is a Monotonic Stack?\n\nWhen should you use it?",
    back: "Stack maintaining elements in sorted\n(increasing or decreasing) order.\n\nUse for: Next Greater/Smaller Element,\nLargest Rectangle in Histogram,\nTrapping Rain Water, Daily Temperatures.\n\nO(n) - each element pushed/popped once.",
  },
  {
    topic: "Segment Tree vs Fenwick Tree",
    front: "When would you use a Segment Tree\nvs a Fenwick Tree (BIT)?",
    back: "Fenwick (BIT): prefix sums + point update.\nSimpler. O(log n) both ops.\n\nSegment Tree: range query + range update.\nMore flexible (min/max/gcd), supports\nlazy propagation. O(log n) both ops.\n\nFenwick = simpler for sum queries only.",
  },
  {
    topic: "When to Sort First",
    front:
      "Name problems where sorting the\ninput first simplifies the solution.",
    back: "- Two Sum (then two pointers)\n- 3Sum / 4Sum\n- Merge intervals / Meeting rooms\n- Closest pair of points\n- Assign cookies / Minimum platforms\n\nSorting adds O(n log n) but often\nreduces overall from O(n^2).",
  },
  {
    topic: "Bit Manipulation - Use Cases",
    front: "When is bit manipulation useful\nin DSA problems?",
    back: "- Single number (XOR all elements)\n- Power of 2: n & (n-1) == 0\n- Count set bits / Parity checking\n- Subsets: 0 to 2^n-1 bitmask\n- Swap: a^=b; b^=a; a^=b\n\nKey: a^a=0, a^0=a,\na & (a-1) clears lowest set bit.",
  },
  {
    topic: "Choosing the Right DS: Summary",
    front:
      "Match the requirement to the best\ndata structure:\n\n1. Fast lookup by key\n2. Sorted iteration\n3. LIFO access\n4. FIFO access\n5. Min/max access\n6. Prefix search",
    back: "1. Lookup by key -> HashMap\n2. Sorted order   -> TreeMap / BST\n3. LIFO           -> Stack\n4. FIFO           -> Queue\n5. Min/max        -> Heap / PQ\n6. Prefix search  -> Trie\n\nAlways weigh time vs space vs complexity.",
  },
  {
    topic: "Space-Time Tradeoffs",
    front: "Give 4 examples of classic\nspace-time tradeoffs in DSA.",
    back: "1. Hash table: O(n) space -> O(1) lookup\n2. Memoization: O(n) space -> O(2^n)\n   reduced to O(n) time\n3. Prefix sums: O(n) space ->\n   O(1) range queries\n4. Adj matrix: O(V^2) space ->\n   O(1) edge lookup (vs O(deg) for list)",
  },
  {
    topic: "Sliding Window vs Two Pointers",
    front: "What's the difference between\nSliding Window and Two Pointers?",
    back: "Two Pointers: move independently,\noften converge from opposite ends.\nEx: pair sum, container with most water.\n\nSliding Window: contiguous subarray,\nright expands, left contracts.\nEx: max sum size k, longest no-repeat.\n\nSliding window IS two-pointer, but\nnot all two-pointer is sliding window.",
  },
  {
    topic: "Data Structure Decision Tree",
    front:
      "You face a new problem. How do you\npick the right data structure based\non the key operation needed?",
    back: "Lookup by key?  -> Hash Table\nSorted order?   -> BST / TreeMap\nFIFO?           -> Queue\nUndo / LIFO?    -> Stack\nRepeated min/max? -> Heap\nPrefix search?  -> Trie\nConnectivity?   -> Union-Find\nBoth ends?      -> Deque\nPick by the MOST FREQUENT operation.",
  },
];

export const DSA_PRACTICAL_USES: DeckInfo = {
  id: "dsa-practical-uses",
  title: "DSA: Practical Uses",
  description:
    "When to use which data structure or algorithm. Real-world applications, tradeoffs, and decision-making guides.",
  level: "intermediate",
  category: "Data Structures & Algorithms",
  cards,
};
