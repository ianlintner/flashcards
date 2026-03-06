import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Trie (Prefix Tree)",
    front:
      "Your phone's keyboard predicts words\nas you type. What data structure\npowers autocomplete?\n\nWhat are its complexities?",
    back: "Trie: each node = one char;\npaths from root spell words.\n\nInsert/Search/Prefix: O(m), m=word len\nSpace: O(ALPHABET * N * m)\n\nUse: autocomplete, spell check,\nIP routing, prefix matching.\n\nMnemonic: reTRIEval tree.",
  },
  {
    topic: "AVL Tree",
    front:
      "You need a sorted container with\nguaranteed O(log n) lookups.\nWhat self-balancing BST enforces\nthe strictest balance?\n\nHow does it maintain balance?",
    back: "AVL: height diff of left/right\nsubtrees <= 1 at every node.\n\nRotations: LL(right), RR(left),\nLR(left+right), RL(right+left)\n\nAll ops: O(log n) guaranteed.\nStricter than Red-Black -> faster lookup.",
  },
  {
    topic: "Red-Black Tree",
    front:
      "Java's TreeMap and C++ std::map\nuse this balanced BST internally.\n\nWhat are its five invariant properties?",
    back: "Red-Black: BST with color rules.\n\n1. Nodes are red or black\n2. Root is black\n3. NIL leaves are black\n4. Red -> children must be black\n5. Equal black depth on all paths\n\nHeight <= 2*log(n+1)\nFewer rotations than AVL on mutation.",
  },
  {
    topic: "B-Tree / B+ Tree",
    front:
      "A database reads data in 4KB pages.\nWhy don't databases use binary trees\nfor indexing?\n\nWhat structure do they use instead?",
    back: "B-Tree: balanced m-ary search tree.\nNodes have m/2 to m children.\nAll ops: O(log_m n)\n\nDatabases: nodes = disk page size,\nshallow tree = fewer disk reads.\nUsed in MySQL, PostgreSQL, ext4.\n\nMnemonic: B = Broad - wide nodes,\nfewer disk trips.",
  },
  {
    topic: "AVL vs Red-Black Tree",
    front:
      "When would you choose an AVL tree\nover a Red-Black tree, or vice versa?\n\nWhat real-world systems use each?",
    back: "AVL: stricter (height diff <=1)\n- Faster lookups, more rotations\n- Best for: read-heavy, in-memory\n\nRed-Black: relaxed balance\n- Fewer rotations on mutation\n- Best for: std libs (TreeMap, std::map)\n\nMnemonic: AVL=Accurate, RB=Relaxed.",
  },
  {
    topic: "Tree Serialization / Deserialization",
    front:
      "How do you convert a binary tree\nto a string and reconstruct it?\n\nWhat approach is simplest?\n(LeetCode #297)",
    back: "Preorder DFS + null markers:\n\nSerialize: visit root, left, right.\nAppend null for missing children.\nResult: 1,2,null,null,3,4,5\n\nDeserialize: split, recursively build\nwith index pointer (left then right).\n\nTime: O(n) | Space: O(n)",
  },
  {
    topic: "Lowest Common Ancestor (LCA)",
    front:
      "Given two nodes in a tree, find their\ndeepest shared ancestor.\n\nWhat approaches work for a plain\nbinary tree vs BST vs general tree?",
    back: "Binary tree (DFS): O(n)\nIf root is p or q, return it.\nBoth subtrees non-null -> LCA. Else propagate.\n\nBST: O(h) - compare values.\nBoth < root: left. Both > root: right.\nSplit point = LCA.\n\nGeneral: Binary Lifting O(log n)\nPrecompute 2^k-th ancestors.",
  },
  {
    topic: "Morris Traversal",
    front:
      "Standard inorder traversal uses O(h)\nstack space. Can you do O(1) space\nwithout modifying the tree permanently?\n\nWhen is this worth the complexity?",
    back: "Morris Traversal: O(1) space inorder\nvia temporary threading.\n\nFor each node:\n1. No left: visit, go right.\n2. Has left: find predecessor.\n   No thread: link + go left.\n   Thread exists: remove, visit, go right.\n\nTime: O(n) | Space: O(1)\nUse when memory is extremely tight.",
  },
  {
    topic: "Monotonic Queue",
    front:
      "You need the maximum value in every\nsliding window of size k over an array.\nBrute force is O(n*k).\n\nWhat structure solves this in O(n)?",
    back: "Monotonic Deque: decreasing order.\n\n- Pop back while back <= new element\n- Pop front if outside window\n- Front = current max\n\nEach element pushed/popped at most once\n-> O(n) total.\n\nPattern: next greater / sliding extremum.",
  },
  {
    topic: "Persistent Data Structures",
    front:
      "An editor needs undo across 1000\nversions without copying the entire\ndocument each time.\n\nWhat technique preserves all versions\nefficiently?",
    back: "Persistent structures: share unchanged\nnodes between versions (path copying).\n\nExample: Persistent Segment Tree\n- Copy only the changed path\n- O(log n) per update\n- O(log n * Q) space for Q versions\n\nUse: undo systems, version control,\nfunctional programming, time travel.",
  },
];

export const TREES_ADVANCED: DeckInfo = {
  id: "trees-advanced",
  title: "Trees & Advanced Structures",
  description:
    "Tries, balanced BSTs (AVL, Red-Black, B-Tree), tree serialization, LCA, Morris traversal, and more.",
  category: "DSA",
  level: "advanced",
  cards,
  tags: ["trees", "trie", "avl", "red-black", "b-tree", "lca", "morris"],
  estimatedMinutes: 15,
};
