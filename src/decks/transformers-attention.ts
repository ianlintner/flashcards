import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Self-Attention Mechanism",
    front: "What is Self-Attention?\n\nHow are Q, K, V computed?",
    back: "Self-attention lets each token\nattend to all other tokens.\n\nQ = X * W_Q  (Query: what am I looking for?)\nK = X * W_K  (Key: what do I contain?)\nV = X * W_V  (Value: what do I output?)\n\nAttention(Q,K,V) =\n  softmax(Q * K^T / sqrt(d_k)) * V\n\nsqrt(d_k) scaling prevents softmax\nfrom saturating with large dot products.\n\nComplexity: O(n^2 * d)\n  n = sequence length\n  d = embedding dimension",
  },
  {
    topic: "Multi-Head Attention",
    front: "What is Multi-Head Attention?\n\nWhy use multiple heads?",
    back: "Run attention h times in parallel\nwith different learned projections:\n\nhead_i = Attention(Q*W_Qi, K*W_Ki, V*W_Vi)\nMultiHead = Concat(head_1,...,head_h) * W_O\n\nWhy multiple heads:\n1. Different heads learn different\n   relationship types\n   (syntactic, semantic, positional)\n2. Attend to info from different\n   representation subspaces\n3. More stable training\n\nTypical: h = 8 or 12\nHead dim = d_model / h\n(Total compute same as single-head)",
  },
  {
    topic: "Transformer Architecture",
    front:
      "Draw the Transformer architecture.\n\nWhat are its main components?",
    back: 'Encoder (x N layers):\n  1. Multi-Head Self-Attention\n  2. Add & Layer Norm\n  3. Feed-Forward Network (FFN)\n  4. Add & Layer Norm\n\nDecoder (x N layers):\n  1. Masked Multi-Head Self-Attention\n  2. Add & Layer Norm\n  3. Cross-Attention (to encoder output)\n  4. Add & Layer Norm\n  5. Feed-Forward Network\n  6. Add & Layer Norm\n\nOriginal paper: N=6 layers,\nd_model=512, h=8 heads, d_ff=2048\n"Attention Is All You Need" (2017)',
  },
  {
    topic: "Positional Encoding",
    front:
      "Why do Transformers need\npositional encoding?\n\nHow does sinusoidal encoding work?",
    back: "Self-attention is permutation-invariant\n(no notion of position/order).\nPositional encoding adds order info.\n\nSinusoidal (original):\n  PE(pos, 2i) = sin(pos / 10000^(2i/d))\n  PE(pos, 2i+1) = cos(pos / 10000^(2i/d))\n\nProperties:\n- Unique encoding per position\n- Relative positions via linear transform\n- Generalizes to unseen lengths\n\nAlternatives:\n- Learned positional embeddings (BERT)\n- Rotary (RoPE) - used in LLaMA, GPT-NeoX\n- ALiBi - linear attention bias",
  },
  {
    topic: "BERT",
    front: "What is BERT?\n\nHow is it pre-trained?",
    back: "Bidirectional Encoder Representations\nfrom Transformers (Google, 2018)\n\nEncoder-only architecture.\nReads text in both directions.\n\nPre-training objectives:\n1. MLM (Masked Language Model):\n   Mask 15% of tokens, predict them.\n   [CLS] The [MASK] sat on mat [SEP]\n\n2. NSP (Next Sentence Prediction):\n   Predict if sentence B follows A.\n   (Later found not very useful.)\n\nFine-tuning: Add task-specific head.\nExamples: classification, QA, NER.\n\nVariants: RoBERTa, ALBERT, DeBERTa",
  },
  {
    topic: "GPT Architecture",
    front:
      "How does GPT differ from BERT?\n\nWhat is autoregressive generation?",
    back: "GPT: Decoder-only transformer.\n  Left-to-right (causal) attention.\n  Predicts next token.\n\nBERT: Encoder-only.\n  Bidirectional attention.\n  Fills in masked tokens.\n\nAutoregressive generation:\n  P(x_1, ..., x_n) =\n    P(x_1) * P(x_2|x_1) * ... * P(x_n|x_<n)\n\n  Generate one token at a time,\n  feed back into model.\n\nGPT evolution:\n  GPT-1: 117M params\n  GPT-2: 1.5B params\n  GPT-3: 175B params\n  GPT-4: rumored 1.7T (MoE)",
  },
  {
    topic: "Encoder vs Decoder Models",
    front:
      "When would you use encoder-only,\ndecoder-only, or encoder-decoder?",
    back: "Encoder-only (BERT, RoBERTa):\n  Classification, NER, similarity.\n  Good at understanding/analysis.\n\nDecoder-only (GPT, LLaMA):\n  Text generation, chat, code.\n  Good at producing output.\n  Dominant architecture for LLMs.\n\nEncoder-Decoder (T5, BART):\n  Translation, summarization.\n  Good at sequence-to-sequence.\n\nTrend: Decoder-only models now\nhandle all tasks well via prompting,\nreducing need for encoder-only models.",
  },
  {
    topic: "Attention Complexity",
    front:
      "What is the computational complexity\nof standard self-attention?\n\nWhat are efficient alternatives?",
    back: "Standard: O(n^2 * d)\n  n = sequence length, d = dimension\n  Quadratic in sequence length.\n\nMemory: O(n^2) for attention matrix.\n\nEfficient alternatives:\n1. Flash Attention: O(n^2*d) but\n   IO-aware, much faster in practice.\n   No materialization of n*n matrix.\n\n2. Sparse Attention: O(n * sqrt(n))\n   Attend to fixed patterns only.\n\n3. Linear Attention: O(n * d^2)\n   Kernel approximation of softmax.\n\n4. Sliding Window: O(n * w)\n   Local attention window w.\n   (Mistral, Longformer)",
  },
  {
    topic: "Layer Norm vs Batch Norm",
    front:
      "Why do Transformers use\nLayer Normalization\ninstead of Batch Normalization?",
    back: "Layer Norm: Normalize across features\n  for each sample independently.\n  mean, var over (d_model) dimension.\n\nBatch Norm: Normalize across batch\n  for each feature.\n  mean, var over (batch) dimension.\n\nWhy Layer Norm for Transformers:\n1. Works with variable-length sequences\n2. Independent of batch size\n3. Consistent behavior train/inference\n4. Better for sequential/autoregressive\n\nPre-LN (before attention) vs Post-LN\n(after attention): Pre-LN trains more\nstably, now the default.",
  },
  {
    topic: "Feed-Forward Network in Transformers",
    front:
      "What does the FFN do in\na Transformer block?\n\nWhat is its structure?",
    back: "FFN processes each token independently\n(unlike attention which mixes tokens).\n\nStructure:\n  FFN(x) = W_2 * activation(W_1 * x + b_1) + b_2\n\n  W_1: (d_model, d_ff)  - expand\n  W_2: (d_ff, d_model)  - project back\n  d_ff = 4 * d_model typically\n\nActivation: ReLU (original),\n  GELU (BERT, GPT), SwiGLU (LLaMA)\n\nRole: Provides non-linearity and\nacts as key-value memory.\nStores factual knowledge.\n\n~2/3 of Transformer parameters\nare in FFN layers.",
  },
  {
    topic: "KV Cache",
    front:
      "What is the KV Cache in\nautoregressive Transformers?\n\nWhy is it critical for inference?",
    back: "During generation, each new token\nattends to ALL previous tokens.\n\nWithout cache: Recompute K,V for\n  all previous tokens each step.\n  Cost: O(n^2) total for n tokens.\n\nWith KV cache: Store K,V from\n  previous steps, only compute\n  new token's Q,K,V.\n  Cost: O(n) per step.\n\nMemory: O(n * d * L * 2)\n  n = context, d = dim,\n  L = layers, 2 = K+V\n\nFor GPT-4 scale models, KV cache\ncan use tens of GB per request.\nTechniques: grouped-query attention,\nmulti-query attention reduce KV size.",
  },
  {
    topic: "Mixture of Experts (MoE)",
    front: "What is Mixture of Experts (MoE)\nin Transformers?",
    back: 'Replace dense FFN with multiple\n"expert" FFN networks + a gating\nnetwork that routes tokens.\n\nGating: g(x) = softmax(W_g * x)\nSelect top-k experts per token.\n(Typically k=1 or k=2)\n\nBenefits:\n1. Scale params without scaling compute\n   (only active experts used)\n2. Sparse model: 8x params, ~2x compute\n3. Each expert can specialize\n\nChallenges:\n- Load balancing (avoid hot experts)\n- Communication overhead (distributed)\n- Training instability\n\nUsed in: Switch Transformer, Mixtral,\nrumored GPT-4',
  },
];

export const TRANSFORMERS_ATTENTION: DeckInfo = {
  id: "transformers-attention",
  title: "Transformers & Attention Mechanisms",
  description:
    "Self-attention, multi-head attention, Transformer architecture, BERT, GPT, positional encoding, and modern efficient attention.",
  category: "ML/AI",
  level: "advanced",
  cards,
  tags: ["transformers", "attention", "BERT", "GPT", "architecture"],
  estimatedMinutes: 18,
};
