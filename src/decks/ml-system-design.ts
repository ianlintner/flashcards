import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "ML System Design Framework",
    front: "What framework should you follow\nfor ML system design interviews?",
    back: "1. Clarify requirements:\n   - What is the objective/metric?\n   - Scale: QPS, data size, latency\n   - Online vs batch prediction?\n\n2. Data:\n   - What data is available?\n   - Labels, features, collection\n\n3. Feature engineering:\n   - Raw features -> model features\n   - Feature store design\n\n4. Model selection:\n   - Baseline -> iterate\n   - Offline metrics vs online KPIs\n\n5. Training pipeline:\n   - Data splits, validation\n   - Retraining frequency\n\n6. Serving:\n   - Real-time vs batch\n   - A/B testing, monitoring\n\n7. Iteration: Feedback loops, drift",
  },
  {
    topic: "Feature Store",
    front: "What is a Feature Store?\n\nWhy is it important in ML systems?",
    back: "Centralized repository for storing,\nmanaging, and serving ML features.\n\nComponents:\n1. Offline store: Historical features\n   for training (data warehouse).\n2. Online store: Low-latency serving\n   for real-time inference (Redis, DynamoDB).\n3. Feature registry: Metadata, lineage.\n\nBenefits:\n- Feature reuse across models\n- Consistency: Train/serve skew eliminated\n- Point-in-time correctness for training\n- Feature versioning and monitoring\n\nExamples: Feast (open source),\nTecton, Databricks Feature Store,\nSageMaker Feature Store.\n\nAnti-pattern: Computing features\ndifferently in training vs serving.",
  },
  {
    topic: "Training-Serving Skew",
    front: "What is training-serving skew?\n\nHow do you prevent it?",
    back: "Difference between data/features\nseen during training vs production.\n\nTypes:\n1. Data skew: Training data doesn't\n   represent production distribution.\n2. Feature skew: Feature computation\n   differs between train and serve.\n3. Label skew: Label definitions\n   change over time.\n\nPrevention:\n1. Use same code for train/serve\n   feature computation.\n2. Feature store (single source of truth).\n3. Log and monitor feature distributions.\n4. Shadow mode: Run new model alongside\n   old without serving results.\n5. Integration tests comparing\n   train and serve feature outputs.",
  },
  {
    topic: "A/B Testing for ML",
    front: "How do you A/B test ML models\nin production?",
    back: "1. Define hypothesis and metrics:\n   Primary: CTR, revenue, engagement.\n   Guardrails: Latency, error rate.\n\n2. Randomization:\n   Split users (not requests) randomly.\n   Avoid selection bias.\n\n3. Sample size:\n   Power analysis to determine\n   minimum users needed.\n   Typically 1-2 weeks minimum.\n\n4. Statistical significance:\n   p < 0.05, or better:\n   use sequential testing.\n\n5. Pitfalls:\n   - Network effects (users influence\n     each other)\n   - Novelty effects (short-term boost)\n   - Multiple comparisons\n   - Peeking (check too early)\n\nAlternatives: Multi-armed bandits,\ninterleaving experiments.",
  },
  {
    topic: "Model Monitoring",
    front: "What should you monitor for\nML models in production?",
    back: "1. Data quality:\n   - Missing values, schema changes\n   - Input distribution shift\n\n2. Feature drift:\n   - Statistical tests (KS, PSI)\n   - Feature value distributions\n\n3. Prediction drift:\n   - Output distribution changes\n   - Confidence score trends\n\n4. Performance metrics:\n   - Accuracy, precision, recall\n   - Requires delayed ground truth\n\n5. Operational:\n   - Latency (p50, p99)\n   - Throughput (QPS)\n   - Error rates, timeouts\n   - Resource usage (CPU, GPU, memory)\n\nAlerts: Set thresholds on each.\nDashboard: Grafana, Datadog, W&B.\nRetrain trigger: Automated when\ndrift exceeds threshold.",
  },
  {
    topic: "Batch vs Real-Time Serving",
    front: "When do you choose batch prediction\nvs real-time inference?",
    back: "Batch prediction:\n  Pre-compute predictions periodically.\n  Store results in DB/cache.\n\n  + Simple infrastructure\n  + Cost-efficient (GPU batching)\n  + Predictable latency for reads\n  - Stale predictions\n  - Can't use real-time features\n\n  Use: Email recommendations,\n  daily risk scores, content ranking.\n\nReal-time inference:\n  Compute on each request.\n\n  + Fresh predictions\n  + Uses real-time features\n  - Complex infrastructure\n  - Latency constraints (< 100ms)\n  - Expensive at scale\n\n  Use: Search ranking, fraud detection,\n  ad bidding, chatbots.\n\nHybrid: Batch base + real-time re-rank.",
  },
  {
    topic: "Data Labeling and Quality",
    front:
      "How do you handle data labeling\nat scale?\n\nWhat about label quality?",
    back: "Labeling approaches:\n1. Manual: Annotators via Mechanical Turk,\n   Scale AI, Labelbox.\n2. Programmatic: Snorkel (labeling functions),\n   weak supervision.\n3. Active learning: Model picks uncertain\n   samples for human labeling.\n4. Self-training: Model labels easy\n   examples, human handles hard ones.\n\nQuality control:\n- Inter-annotator agreement (Cohen kappa)\n- Gold standard questions (hidden tests)\n- Multiple annotators per example\n- Adjudication process for disagreements\n\nCost optimization:\n- Prioritize high-impact labels\n- Use embedding similarity to\n  de-duplicate near-identical examples",
  },
  {
    topic: "Embedding-Based Retrieval",
    front: "How do you design an\nembedding-based retrieval system?",
    back: "Architecture:\n1. Encode: Map items to dense vectors.\n   Two-tower model: query encoder +\n   item encoder trained jointly.\n\n2. Index: Store item vectors in\n   approximate nearest neighbor (ANN) index.\n   - FAISS (Facebook)\n   - ScaNN (Google)\n   - Pinecone, Weaviate (managed)\n\n3. Retrieve: Encode query, find top-K\n   nearest items.\n   ANN: O(log n) vs exact O(n).\n\n4. Re-rank: Score top-K with\n   heavier model using full features.\n\nTraining:\n- Contrastive loss: Pull similar\n  pairs together, push dissimilar apart.\n- Hard negatives: Mine difficult examples.\n\nUsed in: Search, recommendations,\nRAG, similar item discovery.",
  },
  {
    topic: "Model Compression for Production",
    front: "Name 4 techniques to make\nmodels faster for production.",
    back: '1. Quantization:\n   FP32 -> INT8/INT4.\n   2-8x speedup, minimal accuracy loss.\n\n2. Knowledge Distillation:\n   Train small "student" model to\n   mimic large "teacher" model.\n   Student learns soft probabilities.\n   10-100x smaller models.\n\n3. Pruning:\n   Remove low-magnitude weights.\n   Structured: Remove entire neurons.\n   Unstructured: Zero individual weights.\n   + Sparse matrix acceleration.\n\n4. Architecture optimization:\n   - MobileNet: Depthwise separable conv.\n   - EfficientNet: Compound scaling.\n   - TinyBERT: Smaller Transformer.\n\nCombine: Distill + quantize + prune\nfor maximum compression.',
  },
  {
    topic: "ML Pipeline Orchestration",
    front: "What components does an ML\npipeline need?",
    back: "Pipeline stages:\n1. Data ingestion: Collect, validate.\n2. Feature engineering: Transform, store.\n3. Training: Experiment tracking,\n   hyperparameter tuning.\n4. Evaluation: Metrics, comparison.\n5. Deployment: Model registry,\n   canary rollout.\n6. Monitoring: Drift, performance.\n\nTools:\n- Orchestration: Airflow, Kubeflow,\n  Dagster, Prefect.\n- Experiment tracking: MLflow, W&B.\n- Model registry: MLflow, Vertex AI.\n- Feature store: Feast, Tecton.\n- Serving: TorchServe, Triton,\n  TF Serving, vLLM.\n\nMLOps principle: Automate everything.\nManual steps = technical debt.",
  },
];

export const ML_SYSTEM_DESIGN: DeckInfo = {
  id: "ml-system-design",
  title: "ML System Design",
  description:
    "Designing production ML systems: feature stores, serving infrastructure, A/B testing, monitoring, and MLOps pipelines.",
  category: "ML/AI",
  level: "advanced",
  cards,
  tags: [
    "MLOps",
    "system design",
    "feature store",
    "monitoring",
    "A/B testing",
  ],
  estimatedMinutes: 15,
};
