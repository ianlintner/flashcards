import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Hash Table - Collision Strategies",
    front:
      "What are the two main collision\nresolution strategies in hash tables?\n\nCompare their trade-offs.",
    back: "1. Chaining (open hashing):\n   Bucket -> linked list of entries\n   + Simple, handles high load well\n   - Extra ptr memory, poor cache\n\n2. Open Addressing (closed hashing):\n   Probe for next open slot\n   (linear, quadratic, double hash)\n   + Cache-friendly, no extra ptrs\n   - Degrades above ~0.7 load factor\n   - Deletion needs tombstones",
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
    back: "Use a STACK (LIFO):\n1. Scan left to right\n2. Open bracket -> push onto stack\n3. Close bracket -> pop & check match\n4. Mismatch or empty stack -> invalid\n5. End: stack must be empty\n\nTime: O(n), Space: O(n)\nWhy stack? Most recent opener must\nclose first - exactly LIFO order.",
  },
  {
    topic: "Queue - Variants",
    front:
      "Name and describe 4 types of queues.\n\nWhat are their key differences?",
    back: "1. Simple Queue (FIFO):\n   Enqueue at back, dequeue from front\n2. Circular Queue:\n   Wraps around for efficient array use\n3. Deque (Double-Ended Queue):\n   Insert/remove both ends O(1)\n   Uses: sliding window, palindrome, BFS\n4. Priority Queue (via heap):\n   Dequeue by priority not insertion order\n   Insert O(log n), Extract O(log n)",
  },
  {
    topic: "Heap - Build Heap",
    front:
      "What is the time complexity of\nbuilding a heap from an array?\n\nWhy is it O(n) and not O(n log n)?",
    back: "Build heap = O(n), not O(n log n)!\n\nSift-down from last non-leaf to root.\nExample: [4,10,3,5,1] -> [1,4,3,5,10]\n\nWhy O(n): n/2 leaves do 0 swaps.\nSum: n/4*1 + n/8*2 + ... converges to O(n)\n\nInsert one-by-one = O(n log n) - slower.\nBuild-heap's sift-down approach wins\nbecause most nodes are near the bottom.",
  },
  {
    topic: "Array vs Linked List",
    front:
      "When should you choose an Array\nover a Linked List, and vice versa?",
    back: "Access:  Array O(1) | List O(n)\nInsert*: Array O(n) | List O(1)\nAppend:  Both O(1) amortized\nCache:   Array great | List poor\nMemory:  Array data-only | List +ptr\nResize:  Array copies O(n) | List free\n\n* List O(1) insert only w/ node ref.\n\nRule: default to arrays. Cache locality\nusu. beats List O(1) insert in practice.",
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
    back: "HashMap (hash table):\n- O(1) avg get/put/delete\n- Unordered keys\n- Can degrade to O(n) w/ collisions\n\nTreeMap (balanced BST):\n- O(log n) get/put/delete\n- Keys sorted, range queries supported\n- floor/ceiling/ordered statistics\n\nDefault: HashMap. Use TreeMap when you\nneed sorted iteration or range lookups.",
  },
  {
    topic: "When to Use a Trie vs Hash Set",
    front:
      "When should you use a Trie instead\nof a HashSet for string storage?",
    back: "Use Trie when:\n- Prefix search / autocomplete needed\n- Checking all words with a prefix\n- Lexicographic ordering needed\n- Shared memory among common prefixes\n\nUse HashSet when:\n- Only exact match lookup needed\n- No prefix operations required\n\nBoth O(m) per op (m = word length).",
  },
  {
    topic: "Space-Time Trade-offs",
    front: "Give 5 examples of space-time\ntrade-offs in data structures.",
    back: "1. Hash table: O(n) space -> O(1) lookup\n   (vs O(n) scan with O(1) space)\n2. Memoization: O(n) space to avoid\n   O(2^n) recomputation\n3. Prefix sums: O(n) space -> O(1) range\n4. Inverted index: O(n) -> O(1) doc lookup\n5. Adj matrix: O(V^2) -> O(1) edge check\n\nPattern: spend space to save time.\nEach trades memory for faster queries.",
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
