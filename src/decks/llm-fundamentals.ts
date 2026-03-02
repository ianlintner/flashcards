import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "What is an LLM?",
    front: 'What is a Large Language Model?\n\nWhat makes it "large"?',
    back: 'Autoregressive neural network trained\nto predict the next token.\n\n"Large" refers to:\n1. Parameters: Billions (7B to 1T+)\n2. Training data: Trillions of tokens\n3. Compute: Thousands of GPU-hours\n\nCapabilities emerge with scale:\n- Few-shot learning\n- Reasoning\n- Code generation\n- Instruction following\n\nExamples: GPT-4, Claude, LLaMA,\nGemini, Mistral, Command R',
  },
  {
    topic: "Tokenization",
    front: "How does tokenization work in LLMs?\n\nWhat is BPE?",
    back: "Convert text to integer IDs\nthat the model processes.\n\nByte Pair Encoding (BPE):\n1. Start with character-level vocab\n2. Iteratively merge most frequent pair\n3. Build vocab of subword tokens\n\n'unbelievable' -> ['un', 'believ', 'able']\n\nVocab size: 32K to 128K tokens\n\nAlternatives:\n- WordPiece (BERT): Similar to BPE\n- SentencePiece: Language-agnostic\n- Unigram: Probabilistic subword\n\nTokenization affects:\n- Context window usage\n- Cost (priced per token)\n- Multilingual performance",
  },
  {
    topic: "Pre-training vs Fine-tuning",
    front:
      "What is the difference between\npre-training and fine-tuning?\n\nWhat is instruction tuning?",
    back: 'Pre-training:\n  Self-supervised on massive text.\n  Next token prediction.\n  Creates "base" model.\n  Vast compute (millions of $).\n\nFine-tuning:\n  Supervised training on curated data.\n  Adapts model for specific tasks.\n  Much less compute needed.\n\nInstruction tuning:\n  Fine-tune on (instruction, response)\n  pairs. Makes model follow directions.\n  Examples: FLAN-T5, Alpaca, Vicuna.\n\nRLHF:\n  Reinforcement Learning from\n  Human Feedback. Aligns model with\n  human preferences. Used by ChatGPT.',
  },
  {
    topic: "Context Window",
    front:
      "What is a context window?\n\nWhat limits it and how is it extended?",
    back: "Max tokens the model can process\nin a single forward pass.\n\nLimits:\n1. Memory: O(n^2) attention, O(n) KV cache\n2. Positional encoding range\n3. Training distribution\n\nSizes (2024):\n  GPT-4: 128K    Claude: 200K\n  Gemini: 1M+    LLaMA: 8K-128K\n\nExtension techniques:\n- RoPE scaling (NTK-aware)\n- ALiBi (no position embedding)\n- Sliding window attention\n- Ring attention (distributed)\n- Retrieval augmentation (RAG)\n  as alternative to longer context",
  },
  {
    topic: "Sampling and Temperature",
    front: "How do temperature and\nsampling strategies affect\nLLM output?",
    back: "Temperature T scales logits before softmax:\n  p_i = exp(z_i / T) / sum(exp(z_j / T))\n\nT = 0: Greedy (always pick highest prob)\nT = 0.7: Balanced creativity/coherence\nT = 1.0: Original distribution\nT > 1.0: More random/creative\n\nSampling strategies:\n- Top-k: Sample from top k tokens\n- Top-p (nucleus): Sample from tokens\n  whose cumulative prob >= p\n- Min-p: Filter tokens below min_p * max_p\n\nTypical: T=0.7, top_p=0.9\nFor code: T=0, greedy decoding\nFor creative: T=0.9, top_p=0.95",
  },
  {
    topic: "RLHF",
    front: "What is RLHF?\n\nWhat are its three stages?",
    back: "Reinforcement Learning from\nHuman Feedback.\n\nStage 1: Supervised Fine-Tuning (SFT)\n  Train on curated instruction-response\n  pairs. Creates initial assistant.\n\nStage 2: Reward Model Training\n  Humans rank multiple responses.\n  Train model to predict human preference.\n  reward_model(prompt, response) -> score\n\nStage 3: RL Optimization (PPO)\n  Generate responses,\n  score with reward model,\n  update policy to maximize reward.\n  KL penalty prevents divergence from SFT.\n\nAlternative: DPO (Direct Preference\nOptimization) - skips reward model.",
  },
  {
    topic: "Hallucination",
    front: "What are LLM hallucinations?\n\nHow can they be mitigated?",
    back: 'Model generates confident but\nfactually incorrect statements.\n\nTypes:\n1. Factual: Wrong facts\n2. Faithfulness: Contradicts context\n3. Fabrication: Invents citations/data\n\nMitigation:\n1. RAG: Ground in retrieved documents\n2. Chain-of-thought: Force reasoning\n3. Self-consistency: Sample N times,\n   take majority answer\n4. Fine-tune on factual data\n5. Tool use: Calculator, search, code\n6. Calibration: Teach model to say\n   "I don\'t know"\n7. Citation requirements\n8. Human-in-the-loop verification',
  },
  {
    topic: "RAG - Retrieval Augmented Generation",
    front: "What is RAG?\n\nWhat are its components?",
    back: "Combine retrieval with generation\nto ground LLM in external knowledge.\n\nPipeline:\n1. Index: Chunk documents, embed them,\n   store in vector database.\n\n2. Retrieve: Embed user query,\n   find top-k similar chunks.\n\n3. Generate: Pass retrieved chunks\n   + query to LLM as context.\n\nBenefits:\n- Reduces hallucination\n- Knowledge stays current\n- No retraining needed\n- Source attribution possible\n\nChallenges:\n- Retrieval quality matters\n- Context window limits\n- Chunk size trade-offs\n- Embedding model selection",
  },
  {
    topic: "Quantization",
    front: "What is model quantization?\n\nWhat are common approaches?",
    back: "Reduce model precision to\ndecrease memory and speed up inference.\n\nFP32 -> FP16 -> INT8 -> INT4\n\nApproaches:\n1. Post-Training Quantization (PTQ):\n   Quantize after training.\n   Quick but some quality loss.\n\n2. Quantization-Aware Training (QAT):\n   Simulate quantization during training.\n   Better quality, more expensive.\n\n3. GPTQ: Layer-wise quantization\n   using calibration data.\n\n4. GGUF/GGML: CPU-optimized format.\n   Runs LLMs on consumer hardware.\n\nMemory savings:\n  70B model: ~140GB (FP16) -> ~35GB (4-bit)\n\nQuality: 4-bit often retains 95%+ of\nfull precision performance.",
  },
  {
    topic: "LoRA and Parameter-Efficient Fine-Tuning",
    front: "What is LoRA?\n\nWhy is it useful for fine-tuning LLMs?",
    back: "Low-Rank Adaptation:\nFreeze original weights, add small\ntrainable matrices.\n\nW' = W + B * A\n  W: frozen (d x d)\n  B: (d x r), A: (r x d)\n  r << d (rank 4-64 typical)\n\nTrainable params: 2*d*r vs d*d\n  ~0.1% of original parameters.\n\nBenefits:\n1. Fine-tune 70B model on 1 GPU\n2. Switch tasks by swapping adapters\n3. No catastrophic forgetting\n4. Merge back into weights for inference\n\nVariants:\n- QLoRA: LoRA + 4-bit quantization\n- DoRA: Weight-decomposed LoRA\n- AdaLoRA: Adaptive rank allocation",
  },
  {
    topic: "Emergent Abilities",
    front: "What are emergent abilities in LLMs?\n\nGive 3 examples.",
    back: "Capabilities that appear suddenly\nat sufficient scale, absent in\nsmaller models.\n\nExamples:\n1. Chain-of-thought reasoning:\n   Step-by-step problem solving\n   without explicit training.\n\n2. Few-shot learning:\n   Learn tasks from a few examples\n   in the prompt.\n\n3. Code generation:\n   Write functional code from\n   natural language descriptions.\n\nDebated: May be artifact of\nevaluation metrics rather than\ntrue phase transitions.\n\nScale dimensions that matter:\n- Parameter count\n- Training data size\n- Compute budget (FLOPs)",
  },
  {
    topic: "Scaling Laws",
    front:
      "What are the Chinchilla scaling laws?\n\nHow do they guide LLM training?",
    back: "Compute-optimal training:\n  Scale model size AND data equally.\n\nChinchilla finding (Hoffmann et al.):\n  For compute budget C:\n  Optimal tokens ~= 20 * params\n\n  Example: 70B model needs ~1.4T tokens.\n\nBefore Chinchilla:\n  GPT-3 (175B) trained on only 300B\n  tokens (undertrained by this rule).\n\nAfter Chinchilla:\n  LLaMA-2 (70B) on 2T tokens.\n  More data, smaller model =\n  better performance per FLOP.\n\nImplication: Many large models are\nundertrained. More data often beats\nmore parameters.",
  },
];

export const LLM_FUNDAMENTALS: DeckInfo = {
  id: "llm-fundamentals",
  title: "Large Language Models (LLMs)",
  description:
    "LLM concepts: tokenization, pre-training, RLHF, RAG, hallucination mitigation, scaling laws, and efficient fine-tuning.",
  category: "ML/AI",
  level: "intermediate",
  cards,
  tags: ["LLM", "GPT", "RLHF", "RAG", "fine-tuning", "scaling"],
  estimatedMinutes: 18,
};
