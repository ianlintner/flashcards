import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Tokenization and Text Processing",
    front:
      "What are common text preprocessing\nsteps for NLP?\n\nWhen should you skip them?",
    back: "Preprocessing steps:\n1. Lowercasing\n2. Tokenization (word/subword)\n3. Stop word removal\n4. Stemming: running -> run (crude)\n5. Lemmatization: better -> good (accurate)\n6. Punctuation removal\n7. Special character handling\n\nSkip preprocessing when:\n- Using pre-trained models (BERT, GPT)\n  They have their own tokenizers.\n- Case matters (NER: 'Apple' vs 'apple')\n- Punctuation is informative\n  (sentiment: '!!!' vs '.')\n\nModern NLP: Subword tokenization (BPE)\nhandles most preprocessing automatically.",
  },
  {
    topic: "Word Embeddings",
    front: "Compare Word2Vec, GloVe,\nand contextual embeddings.",
    back: "Word2Vec (2013, Google):\n  CBOW: Predict word from context.\n  Skip-gram: Predict context from word.\n  Static: 1 vector per word.\n  'bank' has same embedding in\n  'river bank' and 'bank account'.\n\nGloVe (2014, Stanford):\n  Global word co-occurrence statistics.\n  Also static embeddings.\n  Better on analogy tasks.\n\nContextual (2018+):\n  BERT, GPT, ELMo.\n  Different embedding per occurrence.\n  'bank' differs by context.\n  Much larger models.\n\nStatic: Fast, small. Good for simple tasks.\nContextual: Slower, accurate.\n  Standard for modern NLP.",
  },
  {
    topic: "Named Entity Recognition (NER)",
    front: "What is NER?\n\nWhat are common approaches?",
    back: "Identify and classify named entities:\n  Person, Organization, Location,\n  Date, Money, etc.\n\nExample:\n  '[Barack Obama](PERSON) visited\n   [Paris](LOCATION) on [Monday](DATE).'\n\nApproaches:\n1. Rule-based: Regex, gazetteers.\n   Fast but brittle.\n\n2. CRF (Conditional Random Field):\n   Sequence model with hand-crafted\n   features. Pre-deep learning standard.\n\n3. BiLSTM-CRF:\n   Neural encoder + CRF decoder.\n\n4. Transformer-based:\n   Fine-tune BERT with token-level\n   classification head.\n   Current state-of-the-art.\n\nEvaluation: Entity-level F1\n  (exact span + type match).",
  },
  {
    topic: "Sentiment Analysis",
    front:
      "What approaches exist for\nsentiment analysis?\n\nWhat are the challenges?",
    back: "Approaches:\n1. Lexicon-based: Word sentiment scores.\n   VADER, TextBlob. Fast, interpretable.\n\n2. ML classifiers: TF-IDF + logistic\n   regression / SVM. Good baseline.\n\n3. Deep learning: CNN/LSTM on word\n   embeddings. Better accuracy.\n\n4. Transformers: Fine-tuned BERT.\n   State-of-the-art.\n\n5. Zero-shot: GPT with prompt\n   'Classify sentiment: positive/negative'\n\nChallenges:\n- Sarcasm: 'Oh great, another Monday.'\n- Negation: 'Not bad' = positive\n- Aspect-level: 'Great food, bad service'\n- Domain shift: Movie vs product reviews\n- Multilingual sentiment",
  },
  {
    topic: "Text Classification",
    front: "What is TF-IDF?\n\nHow is it used for text classification?",
    back: "TF-IDF: Term Frequency - Inverse\nDocument Frequency.\n\nTF(t,d) = count(t in d) / |d|\n  How often term appears in document.\n\nIDF(t) = log(N / df(t))\n  N = total docs, df = docs with term.\n  Rare words get higher weight.\n\nTF-IDF = TF * IDF\n  High for important, distinctive words.\n\nClassification pipeline:\n1. Vectorize docs with TF-IDF\n2. Train classifier (LR, SVM, NB)\n3. Predict on new documents\n\nStrong baseline. Often performs\nwithin 5% of BERT for simple tasks\nat 100x lower cost.\n\nModern alternative: Embedding +\nclassifier, or fine-tuned LLM.",
  },
  {
    topic: "Machine Translation",
    front:
      "How has machine translation evolved?\n\nWhat is the current approach?",
    back: "Evolution:\n1. Rule-based (1950s-1990s):\n   Grammar rules + dictionaries.\n\n2. Statistical MT (1990s-2015):\n   Phrase-based alignment.\n   P(target | source) models.\n\n3. Neural MT (2015-2017):\n   Seq2seq with attention.\n   Encoder-decoder RNN.\n\n4. Transformer MT (2017+):\n   Attention Is All You Need.\n   Parallel training, better quality.\n\n5. Large LMs (2023+):\n   GPT-4, Claude can translate\n   via prompting. Near-human quality.\n\nEvaluation:\n- BLEU: n-gram overlap (automated)\n- Human evaluation: Fluency + adequacy\n- COMET: Learned metric (better corr.)",
  },
  {
    topic: "Question Answering",
    front:
      "What are the types of QA systems?\n\nHow do extractive and generative differ?",
    back: "Types:\n1. Extractive QA:\n   Find answer span in given context.\n   Model predicts start/end positions.\n   Example: SQuAD benchmark.\n\n2. Generative QA:\n   Generate answer text.\n   Can synthesize from multiple sources.\n   Example: GPT answering questions.\n\n3. Open-domain QA:\n   Retrieve relevant docs + extract/\n   generate answer. (RAG pattern.)\n\n4. Table QA:\n   Answer from structured data.\n   Example: TAPAS, text-to-SQL.\n\nPipeline (Open-domain):\n  Question -> Retriever -> Top-K docs\n  -> Reader/Generator -> Answer\n\nMetrics: Exact Match (EM), F1 (token).",
  },
  {
    topic: "Text Summarization",
    front: "Compare extractive and abstractive\nsummarization.",
    back: "Extractive:\n  Select important sentences verbatim.\n  Techniques: TextRank (graph-based),\n  BERT sentence scoring.\n  + Grammatically correct (from source)\n  + Faithful to original\n  - Can be choppy/redundant\n  - Can't paraphrase\n\nAbstractive:\n  Generate new text that captures\n  key points.\n  Models: T5, BART, PEGASUS, GPT.\n  + More fluent and concise\n  + Can paraphrase and compress\n  - May hallucinate details\n  - More complex to build\n\nEvaluation:\n- ROUGE: N-gram overlap\n  (ROUGE-1, ROUGE-2, ROUGE-L)\n- BERTScore: Semantic similarity\n- Human eval: Faithfulness + coherence",
  },
  {
    topic: "Sequence-to-Sequence Models",
    front: "What is the sequence-to-sequence\n(Seq2Seq) architecture?",
    back: "Encoder processes input sequence,\nDecoder generates output sequence.\n\nOriginal (2014): RNN encoder-decoder\n  Encoder: Input -> fixed context vector.\n  Decoder: Context -> output tokens.\n  Problem: Bottleneck in fixed vector.\n\nWith Attention (2015):\n  Decoder attends to all encoder states.\n  Dynamic context per output step.\n  Breakthrough for translation.\n\nTransformer Seq2Seq (2017):\n  Self-attention in both encoder/decoder.\n  + Cross-attention (decoder -> encoder).\n  Fully parallel training.\n\nApplications:\n- Translation, summarization\n- Code generation, text-to-SQL\n- Speech recognition (CTC + attention)",
  },
  {
    topic: "Text Generation and Decoding",
    front: "Compare greedy, beam search,\nand sampling-based decoding.",
    back: "Greedy:\n  Pick highest probability token each step.\n  Fast but repetitive/generic.\n\nBeam search:\n  Keep top-B candidates at each step.\n  B=4-5 typical.\n  Better for determined outputs\n  (translation, summarization).\n  Can still be repetitive.\n\nSampling:\n  Sample from probability distribution.\n  + Diverse, creative output.\n  - Can be incoherent.\n\nTop-k sampling:\n  Sample from top k tokens only.\n\nNucleus (top-p) sampling:\n  Sample from smallest set with\n  cumulative probability >= p.\n\nTemperature: Scale logits.\n  Lower = more deterministic.\n  Higher = more random.\n\nBest for chat/creative: top-p + temp.",
  },
];

export const NLP_FUNDAMENTALS: DeckInfo = {
  id: "nlp-fundamentals",
  title: "Natural Language Processing",
  description:
    "NLP concepts: text preprocessing, embeddings, NER, sentiment analysis, machine translation, QA, summarization, and decoding.",
  category: "ML/AI",
  level: "intermediate",
  cards,
  tags: ["NLP", "text classification", "NER", "embeddings", "QA"],
  estimatedMinutes: 15,
};
