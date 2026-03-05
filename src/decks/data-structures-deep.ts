import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Hash Table - Collision Strategies",
    front:
      "What are the two main collision\nresolution strategies in hash tables?\n\nCompare their trade-offs.",
    back: "1. Chaining (open hashing):\n   Each bucket -> linked list\n   + Simple to implement\n   + Handles high load gracefully\n   - Extra memory for pointers\n   - Poor cache locality\n\n2. Open Addressing (closed hashing):\n   Probe for next open slot\n   (linear, quadratic, double hash)\n   + Cache-friendly (contiguous array)\n   + No extra pointer memory\n   - Degrades badly above ~0.7 load\n   - Deletion needs tombstones",
  },
  {
    topic: "Hash Table - Load Factor",
    front:
      "What is the load factor of a hash table?\n\nWhat happens when it gets too high?",
    back: 'Load factor = n / capacity\n(n = number of entries)\n\nHigher load -> more collisions\n-> O(1) degrades toward O(n).\n\nTypical threshold: 0.75\nWhen exceeded: resize to 2x capacity,\nrehash all entries: O(n) cost.\nAmortized insert stays O(1).\n\nMnemonic: "Load over 0.75?\nTime to resize and thrive."',
  },
  {
    topic: "Stack - Balanced Brackets",
    front:
      "A code linter needs to check if\nbrackets in source code are balanced.\nE.g. {[()]} valid, {[(])} invalid.\n\nWhat data structure and algorithm?",
    back: "Use a STACK (LIFO):\n\n1. Scan left to right\n2. Open bracket -> push onto stack\n3. Close bracket -> pop and check match\n4. Mismatch or empty stack -> invalid\n5. End: stack must be empty\n\nTime: O(n), Space: O(n)\n\nWhy stack? Most recent opener must\nclose first - exactly LIFO order.",
  },
  {
    topic: "Queue - Variants",
    front:
      "Name and describe 4 types of queues.\n\nWhat are their key differences?",
    back: "1. Simple Queue (FIFO):\n   Enqueue at back, dequeue from front\n\n2. Circular Queue:\n   Wraps around, efficient array use\n\n3. Double-Ended Queue (Deque):\n   Insert/remove from both ends O(1)\n   Uses: sliding window max,\n   palindrome check, 0-1 BFS\n\n4. Priority Queue:\n   Dequeue by priority, not order\n   Usually implemented with a heap\n   Insert: O(log n), Extract: O(log n)",
  },
  {
    topic: "Heap - Build Heap",
    front:
      "What is the time complexity of\nbuilding a heap from an array?\n\nWhy is it O(n) and not O(n log n)?",
    back: "Build heap = O(n), not O(n log n)!\n\nSift-down example [4,10,3,5,1]:\n     4\n    / \\\n  10   3   sift 10: swap w/ 1\n  / \\\n 5   1     sift 4: swap w/ 1\nResult: [1,4,3,5,10] min-heap\n\nWhy O(n): n/2 leaves need 0 swaps.\nSum: n/4*1 + n/8*2 + ... = O(n)\nInserting one-by-one = O(n log n).",
  },
  {
    topic: "Array vs Linked List",
    front:
      "When should you choose an Array\nover a Linked List, and vice versa?",
    back: "Access:  Array O(1) | List O(n)\nInsert*: Array O(n) | List O(1)\nAppend:  Both O(1) amortized\nCache:   Array great | List poor\nMemory:  Array data-only | List +ptr\nResize:  Array copies O(n) | List free\n\n* mid-sequence insert/delete.\n  List O(1) only with node reference.\n\nRule: default to arrays. Cache\nlocality usually beats linked list's\nO(1) insert in real-world benchmarks.",
  },
  {
    topic: "Graph - Adjacency List vs Matrix",
    front:
      "When should you use adjacency list\nvs adjacency matrix for graphs?",
    back: "Adjacency List: O(V + E) space\n- Use for sparse graphs (E << V^2)\n- Faster iteration over neighbors\n- Most real-world graphs are sparse\n\nAdjacency Matrix: O(V^2) space\n- Use for dense graphs (E ~ V^2)\n- O(1) edge existence check\n- Simpler to implement\n- Good for Floyd-Warshall",
  },
  {
    topic: "HashMap vs TreeMap",
    front: "Compare HashMap and TreeMap.\n\nWhen would you choose each?",
    back: "HashMap (hash table):\n- O(1) average for get/put/delete\n- Unordered keys\n- Can degrade to O(n) with collisions\n\nTreeMap (balanced BST):\n- O(log n) for get/put/delete\n- Keys are sorted\n- Range queries, floor/ceiling ops\n\nChoose TreeMap when you need:\nSorted iteration, range queries,\nor ordered statistics.",
  },
  {
    topic: "When to Use a Trie vs Hash Set",
    front:
      "When should you use a Trie instead\nof a HashSet for string storage?",
    back: "Use Trie when:\n- Need prefix search / autocomplete\n- Checking all words with a prefix\n- Lexicographic ordering needed\n- Memory shared among common prefixes\n\nUse HashSet when:\n- Only need exact match lookup\n- No prefix operations needed\n- Simpler implementation desired\n\nTrie: O(m) per op, m = word len\nHashSet: O(m) avg for hashing strings",
  },
  {
    topic: "Space-Time Trade-offs",
    front: "Give 5 examples of space-time\ntrade-offs in data structures.",
    back: "1. Hash table: O(n) space for O(1) lookup\n   vs array scan O(n) with O(1) space\n\n2. Memoization: O(n) space to avoid\n   O(2^n) recomputation\n\n3. Precomputed prefix sums: O(n) space\n   for O(1) range queries\n\n4. Inverted index: O(n) space\n   for O(1) document lookup\n\n5. Graph adjacency matrix: O(V^2) space\n   for O(1) edge check",
  },
];

export const DATA_STRUCTURES_DEEP: DeckInfo = {
  id: "data-structures-deep",
  title: "Data Structures Deep Dive",
  description:
    "Hash collisions, heap building, stack/queue variants, data structure selection and space-time trade-offs.",
  category: "DSA",
  level: "foundation",
  cards,
  tags: ["hash-table", "heap", "stack", "queue", "trade-offs"],
  estimatedMinutes: 15,
};
