import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Array vs Linked List",
    front:
      "Your music app needs a playlist where\nusers jump to any song by number and\nappend new songs at the end.\n\nArray or Linked List? Why?",
    back: "Array. Random access by index is O(1).\nAppend is amortized O(1).\n\nLinked List needs O(n) traversal\nto reach song #k.\n\nMnemonic: 'Array = Address book'\n(jump to any slot). 'Linked List =\nTreasure hunt' (follow clues one by one).\n\nUse Linked List for fast insert/delete\nat arbitrary positions.",
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
    back: "Stack (LIFO - Last In, First Out).\nMost recent action is undone first.\n\nMnemonic: 'Stack of plates' -\nyou always remove the top one.\n\nAlso used for:\n- Balanced parentheses checking\n- Expression evaluation (postfix)\n- DFS traversal (explicit stack)\n- Browser back button navigation",
  },
  {
    topic: "Queue in Practice",
    front:
      "A print server receives jobs from\nmultiple users. Jobs must be processed\nin the order they arrive.\n\nWhich data structure and why?",
    back: "Queue (FIFO - First In, First Out).\nEarliest job prints first.\n\nMnemonic: 'Checkout line' -\nfirst person in line gets served first.\n\nAlso used for:\n- BFS traversal\n- Task scheduling\n- Message queues / event loops\n- Rate limiting (sliding window)",
  },
  {
    topic: "Priority Queue / Heap",
    front:
      "An ER triage system must always treat\nthe most critical patient next, not the\none who arrived first.\n\nWhich data structure and why?",
    back: "Priority Queue (backed by Binary Heap).\nO(log n) insert, O(1) access to min/max.\n\nUnlike Queue (FIFO), PQ serves by\npriority, not arrival order.\n\nAlso used for:\n- Dijkstra's shortest path\n- Merge K sorted lists\n- Running median (two heaps)\n- Huffman encoding",
  },
  {
    topic: "HashSet in Practice",
    front:
      "A web crawler needs to track which URLs\nit has already visited to avoid crawling\nthe same page twice.\n\nWhich data structure and why?",
    back: "HashSet. O(1) membership testing -\njust ask 'seen this URL before?'\n\nMnemonic: 'Bouncer with a guest list' -\ninstant yes/no, no searching needed.\n\nAlso used for:\n- Duplicate detection in streams\n- Two-sum complement lookup\n- Intersection/union of collections\n\nTradeoff: O(n) space for O(1) lookup.",
  },
  {
    topic: "Trie in Practice",
    front:
      "A search engine needs to suggest\ncompletions as the user types each letter.\nResults must update after every keystroke.\n\nWhy is a Trie better than a HashMap here?",
    back: "Trie walks one node per character typed.\nAutocomplete = traverse to prefix node,\nthen collect all descendants.\n\nHashMap can't do prefix queries without\nscanning every key: O(total keys).\n\nTrie: O(prefix length) to reach node.\n\nAlso: spell check, IP routing\n(longest prefix match), word search.",
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
    front:
      "You must find the minimum eating speed\nto finish all banana piles in h hours.\nSpeed can be 1 to max(piles).\n\nHow is this a binary search problem?",
    back: "Binary search on ANSWER SPACE.\nSpeed is monotonic: if speed k works,\nso does k+1. Search the boundary.\n\n  lo=1, hi=max(piles)\n  while lo < hi:\n    mid = (lo+hi)/2\n    if canFinish(mid, h): hi = mid\n    else: lo = mid+1\n\nAlso: split array largest sum,\nsquare root, ship packages in d days.",
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
  {
    topic: "Data Structure Decision Tree",
    front:
      "You face a new problem. How do you\npick the right data structure based\non the key operation needed?",
    back: "Decision tree:\n  Fast lookup by key? -> Hash Table\n  Need sorted order?  -> BST / TreeMap\n  Need FIFO?          -> Queue\n  Need undo / LIFO?   -> Stack\n  Repeated min/max?   -> Heap\n  Prefix search?      -> Trie\n  Connectivity?       -> Union-Find\n  Both ends?          -> Deque\n\nPick by the most frequent operation.",
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
