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
    topic: "Embeddings",
    front: "What are embeddings?\n\nWhy are they useful in modern AI apps?",
    back: "Dense numeric vectors that encode\nsemantic meaning of text, code,\nimages, or documents.\n\nNearby vectors imply similar meaning.\n\nUses:\n1. Semantic search\n2. RAG retrieval\n3. Clustering and deduplication\n4. Recommendations\n5. Similarity scoring\n\nImportant choices:\n- Model quality\n- Vector dimension size\n- Latency and cost\n- Domain fit for your data",
  },
  {
    topic: "Vector Databases",
    front: "What is a vector database?\n\nWhat features matter most?",
    back: "Database optimized for storing\nembeddings and nearest-neighbor search.\n\nCore features:\n1. ANN indexes like HNSW or IVF\n2. Metadata filters\n3. Upserts and deletes\n4. Hybrid search support\n5. Horizontal scaling\n\nCommon systems:\n- Pinecone, Weaviate, Milvus\n- pgvector, Elasticsearch, FAISS\n\nKey trade-offs:\n- Recall vs latency\n- Cost vs scale\n- Managed vs self-hosted",
  },
  {
    topic: "Semantic Search",
    front:
      "How does semantic search differ\nfrom keyword search?\n\nWhen is hybrid best?",
    back: "Keyword search matches exact terms.\nGreat for IDs, names, and precision.\n\nSemantic search matches meaning using\nembeddings, even when words differ.\n\nExample:\n  Query: 'cheap laptop'\n  Semantic may match 'budget notebook'\n\nHybrid search combines BM25 + vectors.\nOften best in production because it:\n- Preserves exact-match precision\n- Handles synonyms and paraphrases\n- Improves retrieval robustness\n\nTypical flow: retrieve -> rerank -> answer",
  },
  {
    topic: "RAG Design",
    front:
      "What design choices matter most\nin a RAG system beyond basic retrieval?",
    back: "High-impact RAG choices:\n1. Chunking strategy:\n   300-800 tokens with overlap.\n2. Metadata:\n   Source, date, tenant, permissions.\n3. Retrieval:\n   Top-k, filters, hybrid search.\n4. Reranking:\n   Improve precision before generation.\n5. Grounded prompt:\n   'Use only provided context.'\n6. Evaluation:\n   Track recall, faithfulness, latency.\n\nBad retrieval means bad answers,\neven with a strong model.",
  },
  {
    topic: "Agentic Design",
    front: "What is agentic design?\n\nWhen should you use agents?",
    back: "Agentic systems let an LLM\nplan steps, call tools, inspect results,\nand decide what to do next.\n\nUse agents when tasks need:\n- Tool use or API calls\n- Multi-step decisions\n- Dynamic branching\n- Long-running workflows\n\nAvoid agents for simple deterministic\nflows. A plain pipeline is cheaper,\nfaster, and easier to debug.\n\nRule of thumb:\nworkflow first, agent second.\nUse the least autonomy that works.",
  },
  {
    topic: "Agent Patterns",
    front: "What common agent patterns\nshow up in modern LLM systems?",
    back: "Common patterns:\n1. ReAct:\n   Reason, act, observe, repeat.\n2. Planner-executor:\n   One model plans, another executes.\n3. Router:\n   Send request to best tool or model.\n4. Critic-refiner:\n   Generate, review, improve.\n5. Multi-agent:\n   Specialized agents collaborate.\n\nDesign concerns:\n- Tool reliability\n- State management\n- Cost and latency budgets\n- Guardrails and permissions",
  },
  {
    topic: "LangChain and LangGraph",
    front:
      "What does the LangChain stack\nprovide for LLM application development?",
    back: "LangChain offers building blocks\nfor prompts, models, retrievers,\nparsers, memory, and tool calling.\n\nLangGraph adds explicit graph-based\nstate machines for durable agents and\nmulti-step workflows.\n\nTypical stack pieces:\n- Model wrappers\n- Prompt templates\n- Retriever interfaces\n- Tool calling\n- Output parsers\n- Tracing and evaluation via LangSmith\n\nUse it when orchestration complexity\nis high. Skip it when a thin SDK plus\nplain functions is enough.",
  },
  {
    topic: "LLM API Parameters",
    front: "Which LLM API parameters matter\nmost, and what do they do?",
    back: "Key parameters:\n- temperature: randomness level\n- top_p: nucleus sampling cutoff\n- max_tokens: output length cap\n- stop: termination strings\n- seed: more repeatable sampling\n- response_format: JSON or schema mode\n- tools/tool_choice: enable function calls\n- frequency_penalty: reduce repetition\n- presence_penalty: encourage new topics\n\nDefaults should match the task:\n- Code: low temperature\n- Creative writing: higher temperature\n- Extraction: schema mode + low temp",
  },
  {
    topic: "Training Methods",
    front:
      "What training methods are common\nfor modern LLMs after pre-training?",
    back: "Common post-pretraining methods:\n1. Continued pretraining:\n   Add domain-specific corpora.\n2. SFT:\n   Supervised instruction tuning.\n3. Preference tuning:\n   RLHF or DPO for alignment.\n4. PEFT:\n   LoRA or QLoRA adapters.\n5. Distillation:\n   Train smaller student models.\n\nChoose based on goal:\n- Domain knowledge -> continued pretrain\n- Better behavior -> SFT or DPO\n- Low-cost customization -> LoRA\n- Cheap inference -> distillation",
  },
  {
    topic: "Hugging Face and Ollama",
    front: "What roles do Hugging Face\nand Ollama play in the AI stack?",
    back: "Hugging Face is the open model hub:\n- Model and dataset hosting\n- Transformers and tokenizers\n- Inference endpoints and Spaces\n- Fine-tuning and evaluation tooling\n\nOllama focuses on simple local serving\nof open models on a laptop or workstation.\n\nWhy teams use Ollama:\n- Fast local prototyping\n- Privacy for local documents\n- Offline demos and testing\n\nTypical path:\nprototype locally with Ollama, then\nmove to managed or self-hosted serving.",
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
    "LLM concepts and practical AI app design: tokenization, RAG, embeddings, vector search, agent patterns, API tuning, training methods, and efficient fine-tuning.",
  category: "ML/AI",
  level: "intermediate",
  cards,
  tags: [
    "LLM",
    "GPT",
    "RLHF",
    "RAG",
    "embeddings",
    "vector-db",
    "agents",
    "fine-tuning",
    "HuggingFace",
    "Ollama",
  ],
  estimatedMinutes: 30,
};
