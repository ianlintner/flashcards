import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Array vs Linked List",
    front: "When should you choose an Array\nover a Linked List?",
    back: "Use Array when:\n- Frequent random access by index\n- Cache-friendly iteration needed\n- Known or bounded size\n- Append-mostly workload\n\nUse Linked List when:\n- Frequent insert/delete at head\n- Unknown size, many insertions\n- No random access needed",
  },
  {
    topic: "HashMap vs TreeMap",
    front: "When should you choose a HashMap\nvs a TreeMap (sorted map)?",
    back: "HashMap:\n- O(1) avg lookup/insert/delete\n- Unordered keys\n- Best for pure key->value lookup\n\nTreeMap (BST-based):\n- O(log n) all operations\n- Keys maintained in sorted order\n- Range queries, min/max, floor/ceiling",
  },
  {
    topic: "Stack - Use Cases",
    front: "Name 5 classic use cases for a Stack\ndata structure.",
    back: "1. Function call stack / recursion\n2. Undo/redo operations\n3. Balanced parentheses checking\n4. Expression evaluation (postfix)\n5. DFS traversal (explicit stack)\n\nAlso: browser back button, syntax\nparsing, monotonic stack problems.",
  },
  {
    topic: "Queue - Use Cases",
    front: "Name 5 classic use cases for a Queue\ndata structure.",
    back: "1. BFS traversal\n2. Task scheduling (FIFO)\n3. Print job spooling\n4. Message queues / event loops\n5. Rate limiting (sliding window)\n\nVariants: priority queue, deque,\ncircular buffer.",
  },
  {
    topic: "Priority Queue / Heap",
    front:
      "When should you use a Priority Queue?\n\nWhat data structure backs it?",
    back: "Use when you need repeated access\nto the min or max element.\n\nBacked by a Binary Heap.\n\nUse cases:\n- Dijkstra's shortest path\n- Task scheduling by priority\n- Merge K sorted lists\n- Running median\n- Huffman encoding",
  },
  {
    topic: "HashSet - Use Cases",
    front:
      "When should you use a HashSet?\n\nWhat problems does it solve well?",
    back: "O(1) membership testing:\n- Duplicate detection\n- Two-sum (complement lookup)\n- Intersection/union of collections\n- Seen-tracking in graph traversal\n- Blacklist/whitelist filtering\n\nTradeoff: extra O(n) space for\nO(1) lookup instead of O(n) scan.",
  },
  {
    topic: "Trie - Use Cases",
    front: "When should you use a Trie\ninstead of a HashMap?",
    back: "Trie excels at PREFIX operations:\n- Autocomplete / typeahead\n- Spell checking\n- IP routing (longest prefix match)\n- Word search / boggle\n- Counting words with shared prefix\n\nHashMap can't efficiently do prefix\nqueries without scanning all keys.",
  },
  {
    topic: "Graph - When to Use",
    front: "When should you model a problem\nas a Graph? Give examples.",
    back: "Model as graph when entities have\npairwise relationships:\n\n- Social networks (friend connections)\n- Maps/routing (roads between cities)\n- Dependencies (build systems)\n- Web crawling (page links)\n- State machines (transitions)\n- Network flow (capacity between nodes)",
  },
  {
    topic: "BFS vs DFS",
    front: "When should you use BFS vs DFS\nfor graph traversal?",
    back: "BFS (queue-based):\n- Shortest path in unweighted graph\n- Level-order traversal\n- Closest node to source\n- Minimum moves/steps problems\n\nDFS (stack/recursion):\n- Cycle detection\n- Topological sort\n- Connected components\n- Path existence\n- Backtracking / exhaustive search",
  },
  {
    topic: "Binary Search - Beyond Arrays",
    front: "Name 3 non-obvious applications\nof Binary Search.",
    back: "1. Binary search on the ANSWER\n   (min/max optimization problems)\n\n2. Finding insertion point\n   (bisect_left / lower_bound)\n\n3. Search in rotated sorted array\n\n4. Square root / nth root\n\n5. Minimizing maximum (split array)\n\nKey insight: binary search works on\nany monotonic function, not just arrays.",
  },
  {
    topic: "Dynamic Programming - When",
    front: "How do you recognize a problem that\nneeds Dynamic Programming?",
    back: 'Two key properties:\n\n1. OPTIMAL SUBSTRUCTURE\n   Optimal solution built from optimal\n   solutions to subproblems\n\n2. OVERLAPPING SUBPROBLEMS\n   Same subproblems solved repeatedly\n\nSignals: "minimum cost", "number of ways",\n"longest/shortest", "can you reach..."',
  },
  {
    topic: "Greedy vs DP",
    front: "When can you use Greedy instead of\nDynamic Programming?",
    back: "Greedy works when:\n- Locally optimal choice leads to\n  globally optimal (greedy choice property)\n- No need to reconsider past decisions\n\nExamples: coin change (canonical coins),\nactivity selection, Huffman coding\n\nCounterexample: coin change with\narbitrary denominations needs DP.",
  },
  {
    topic: "Union-Find - Use Cases",
    front: "When should you use Union-Find\n(Disjoint Set Union)?",
    back: "Grouping/connectivity problems:\n- Are two nodes connected?\n- Number of connected components\n- Kruskal's MST (cycle detection)\n- Network connectivity\n- Accounts merge\n- Redundant connections\n\nOperations: union O(alpha(n)) ~ O(1)\n            find  O(alpha(n)) ~ O(1)",
  },
  {
    topic: "Monotonic Stack",
    front: "What is a Monotonic Stack?\n\nWhen should you use it?",
    back: "Stack that maintains elements in\nsorted (increasing or decreasing) order.\n\nUse for:\n- Next Greater Element\n- Next Smaller Element\n- Largest Rectangle in Histogram\n- Trapping Rain Water\n- Daily Temperatures\n\nTime: O(n) - each element pushed/popped\nat most once.",
  },
  {
    topic: "Segment Tree vs Fenwick Tree",
    front: "When would you use a Segment Tree\nvs a Fenwick Tree (BIT)?",
    back: "Fenwick Tree (Binary Indexed Tree):\n- Prefix sums + point updates\n- Simpler implementation\n- O(log n) both operations\n\nSegment Tree:\n- Range queries + range updates\n- More flexible (min/max/gcd)\n- Lazy propagation for range updates\n- O(log n) both operations\n\nFenwick = simpler for sum queries.",
  },
  {
    topic: "When to Sort First",
    front:
      "Name problems where sorting the\ninput first simplifies the solution.",
    back: "- Two Sum (then two pointers)\n- 3Sum / 4Sum\n- Merge intervals\n- Meeting rooms\n- Closest pair of points\n- Assign cookies\n- Minimum platforms\n\nSorting adds O(n log n) but often\nreduces overall complexity from O(n^2).",
  },
  {
    topic: "Bit Manipulation - Use Cases",
    front: "When is bit manipulation useful\nin DSA problems?",
    back: "- Single number (XOR all elements)\n- Power of 2 check: n & (n-1) == 0\n- Count set bits\n- Subsets enumeration (2^n bitmask)\n- Swap without temp: a ^= b; b ^= a\n- Parity checking\n\nKey properties:\n  a ^ a = 0,  a ^ 0 = a\n  a & (a-1) clears lowest set bit",
  },
  {
    topic: "Choosing the Right DS: Summary",
    front:
      "Match the requirement to the best\ndata structure:\n\n1. Fast lookup by key\n2. Sorted iteration\n3. LIFO access\n4. FIFO access\n5. Min/max access\n6. Prefix search",
    back: "1. Fast lookup by key -> HashMap\n2. Sorted iteration  -> TreeMap / BST\n3. LIFO access       -> Stack\n4. FIFO access       -> Queue\n5. Min/max access    -> Heap / PQ\n6. Prefix search     -> Trie\n\nAlways consider the tradeoff:\ntime vs space vs implementation.",
  },
  {
    topic: "Space-Time Tradeoffs",
    front: "Give 4 examples of classic\nspace-time tradeoffs in DSA.",
    back: "1. Hash table: O(n) space to get\n   O(1) lookup (vs O(n) scan)\n\n2. Memoization: O(n) space to go\n   from O(2^n) to O(n) time\n\n3. Precomputed prefix sums: O(n)\n   space for O(1) range queries\n\n4. Adjacency matrix: O(V^2) space\n   for O(1) edge lookup vs O(V+E)\n   list with O(degree) lookup",
  },
  {
    topic: "Sliding Window vs Two Pointers",
    front: "What's the difference between\nSliding Window and Two Pointers?",
    back: "Two Pointers:\n- Both pointers can move independently\n- Often converge from opposite ends\n- Examples: pair sum, container water\n\nSliding Window:\n- Maintains a contiguous subarray\n- Right expands, left contracts\n- Examples: max subarray of size k,\n  longest substring without repeats\n\nSliding window IS a two-pointer technique\nbut not all two-pointer is sliding window.",
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
