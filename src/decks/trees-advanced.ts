import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Trie - Overview",
    front:
      "What is a Trie (prefix tree)?\n\nWhat are its time complexities?\nWhen would you use one?",
    back: "A tree where each node represents\na character; paths form words.\n\nInsert:  O(m) m = word length\nSearch:  O(m)\nPrefix:  O(m)\nSpace:   O(ALPHABET * N * m)\n\nUse for: autocomplete, spell check,\nIP routing, prefix matching.",
  },
  {
    topic: "Segment Tree",
    front:
      "What is a Segment Tree?\n\nWhat operations does it support\nand at what complexity?",
    back: "A binary tree for range queries\nand point/range updates.\n\nBuild:        O(n)\nRange query:  O(log n)\nPoint update: O(log n)\nRange update: O(log n) with lazy prop.\nSpace:        O(4n)\n\nUse for: range sum, min, max, GCD queries.",
  },
  {
    topic: "Fenwick Tree (BIT)",
    front:
      "What is a Fenwick Tree\n(Binary Indexed Tree)?\n\nHow does it compare to a Segment Tree?",
    back: "Array-based structure for prefix sums\nwith point updates.\n\nUpdate:      O(log n)\nPrefix sum:  O(log n)\nRange query: O(log n) via subtraction\nSpace:       O(n)\n\nSimpler to implement than segment tree.\nLess flexible (mainly additive queries).",
  },
  {
    topic: "Union-Find (Disjoint Set)",
    front: "What is Union-Find?\n\nWhat optimizations make it near O(1)?",
    back: "Tracks elements in disjoint sets.\nSupports: find(x), union(x, y)\n\nOptimizations:\n1. Path Compression:\n   Make nodes point directly to root\n2. Union by Rank/Size:\n   Attach smaller tree under larger\n\nAmortized: O(alpha(n)) per operation\n(alpha = inverse Ackermann, nearly O(1))",
  },
  {
    topic: "AVL Tree",
    front:
      "What is an AVL Tree?\n\nHow does it maintain balance?\nWhat are the rotation types?",
    back: "Self-balancing BST where height difference\nof left/right subtrees <= 1.\n\nRotations (4 cases):\n- Left-Left: right rotate\n- Right-Right: left rotate\n- Left-Right: left then right\n- Right-Left: right then left\n\nAll ops: O(log n) guaranteed\nStricter balance than Red-Black tree.",
  },
  {
    topic: "Red-Black Tree",
    front: "What is a Red-Black Tree?\n\nList its five properties.",
    back: "Self-balancing BST with color invariant.\n\n1. Every node is red or black\n2. Root is black\n3. Leaves (NIL) are black\n4. Red node has only black children\n5. All paths from node to leaves\n   have same number of black nodes\n\nHeight <= 2 * log(n+1)\nUsed in: TreeMap, TreeSet (Java), std::map",
  },
  {
    topic: "B-Tree",
    front:
      "What is a B-Tree?\n\nWhy is it used in databases\nand file systems?",
    back: "Balanced m-ary search tree.\nEach node has m/2 to m children.\n\nAll ops: O(log n) with base m\n\nOptimized for disk I/O:\n- Nodes sized to match disk pages\n- Shallow tree = fewer disk reads\n- Used in MySQL (InnoDB), PostgreSQL,\n  file systems (NTFS, ext4)",
  },
  {
    topic: "Skip List",
    front: "What is a Skip List?\n\nWhat are its time complexities?",
    back: "Probabilistic data structure.\nMultiple layers of linked lists.\nHigher layers skip over elements.\n\nSearch:  O(log n) expected\nInsert:  O(log n) expected\nDelete:  O(log n) expected\nSpace:   O(n) expected\n\nSimpler alternative to balanced BSTs.\nUsed in Redis sorted sets, LevelDB.",
  },
  {
    topic: "Bloom Filter",
    front: "What is a Bloom Filter?\n\nWhat are its properties and trade-offs?",
    back: "Probabilistic set membership test.\nUses bit array + k hash functions.\n\nInsert: O(k)\nQuery:  O(k)\nSpace:  O(m) bits\n\nProperties:\n- False positives possible\n- False negatives IMPOSSIBLE\n- Cannot delete elements\n  (use Counting Bloom Filter)\n\nUsed in: spell check, cache, CDNs",
  },
  {
    topic: "LRU Cache",
    front:
      "Design an LRU Cache with O(1)\nget and put operations.\n\nWhat data structures do you use?",
    back: "Combine:\n1. Hash Map: key -> node pointer (O(1) lookup)\n2. Doubly Linked List: tracks usage order\n\nget(key):\n  Find in map, move node to front, return\n\nput(key, val):\n  If exists: update, move to front\n  If new: add to front, add to map\n  If over capacity: remove tail, delete from map\n\nBoth: O(1) time",
  },
  {
    topic: "Monotonic Queue",
    front:
      "What is a Monotonic Queue?\n\nWhat problem does it solve efficiently?",
    back: "A deque maintaining elements in\nmonotonic order (increasing or decreasing).\n\nSolves: Sliding Window Maximum/Minimum\nin O(n) total.\n\nFor max: maintain decreasing deque.\n- Pop back while back <= new element\n- Pop front if outside window\n- Front of deque is always the max\n\nEach element added/removed at most once.",
  },
  {
    topic: "Persistent Data Structures",
    front:
      "What are persistent data structures?\n\nGive an example and its use case.",
    back: "Preserve all previous versions\nwhen modified (immutable history).\n\nExample: Persistent Segment Tree\n- Creates new nodes for changes\n- Shares unchanged nodes with old version\n- O(log n) per update\n- O(log n * Q) space for Q versions\n\nUse cases: version control, undo systems,\nfunctional programming, competitive prog.",
  },
];

export const TREES_ADVANCED: DeckInfo = {
  id: "trees-advanced",
  title: "Trees & Advanced Data Structures",
  description:
    "Tries, segment trees, Fenwick trees, Union-Find, balanced BSTs, skip lists, Bloom filters, and more.",
  category: "DSA",
  level: "advanced",
  cards,
  tags: ["trees", "segment-tree", "trie", "union-find", "Bloom-filter"],
  estimatedMinutes: 20,
};
