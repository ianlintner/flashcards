import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Clustering - K-Means",
    front: "How does K-Means clustering work?\n\nWhat is its time complexity?",
    back: "1. Choose K random centroids.\n2. Assign each point to nearest centroid.\n3. Update centroids = mean of cluster.\n4. Repeat until convergence.\n\nComplexity: O(n * K * d * I)\n  n = points, K = clusters,\n  d = dimensions, I = iterations\n\nWeaknesses:\n- Must choose K in advance\n- Assumes spherical clusters\n- Sensitive to initialization\n  (Fix: K-Means++ initialization)\n- Local optima\n  (Fix: Run multiple times)\n\nAlternatives: DBSCAN (density-based),\nHierarchical, Gaussian Mixture Models",
  },
  {
    topic: "Dimensionality Reduction - PCA",
    front: "What is PCA?\n\nWhen and why do you use it?",
    back: "Principal Component Analysis:\nProject data onto directions of\nmaximum variance.\n\nSteps:\n1. Standardize features\n2. Compute covariance matrix\n3. Eigendecomposition\n4. Select top k eigenvectors\n5. Project data onto them\n\nUse when:\n- Reduce features (1000 -> 50)\n- Visualization (project to 2D/3D)\n- Remove multicollinearity\n- Preprocessing for other models\n\nKeep components explaining 95%+ variance.\n\nAlternatives: t-SNE (visualization),\nUMAP (faster, preserves structure),\nAutoencoders (non-linear)",
  },
  {
    topic: "Gradient Boosting",
    front:
      "How does Gradient Boosting work?\n\nCompare XGBoost, LightGBM, CatBoost.",
    back: "Train trees sequentially.\nEach tree corrects errors of previous.\n\nF_m(x) = F_(m-1)(x) + lr * h_m(x)\n  h_m fits the residuals (gradient).\n\nXGBoost:\n  Level-wise growth, regularization.\n  Great accuracy, slower training.\n\nLightGBM:\n  Leaf-wise growth, histogram binning.\n  Faster training, handles large data.\n\nCatBoost:\n  Native categorical feature handling.\n  Ordered boosting (reduces overfitting).\n\nAll three dominate tabular data tasks.\nOften beat neural networks on\nstructured/tabular datasets.",
  },
  {
    topic: "Ensemble Methods",
    front: "Compare Bagging, Boosting,\nand Stacking.",
    back: "Bagging (Bootstrap Aggregating):\n  Train models on random subsets.\n  Aggregate: Average/vote.\n  Reduces variance.\n  Example: Random Forest\n\nBoosting:\n  Train sequentially, each model\n  focuses on previous errors.\n  Reduces bias.\n  Example: XGBoost, AdaBoost\n\nStacking:\n  Train diverse base models,\n  then train meta-model on their\n  predictions.\n  Combines strengths of different\n  model types.\n\nBlending: Like stacking but uses\nholdout set instead of cross-val.",
  },
  {
    topic: "Naive Bayes",
    front:
      "What assumption does Naive Bayes\nmake?\n\nWhy does it work despite that?",
    back: "Assumes features are conditionally\nindependent given the class.\n  P(x1,x2|y) = P(x1|y) * P(x2|y)\n\nBayes' theorem:\n  P(y|x) = P(x|y) * P(y) / P(x)\n\nWhy it works despite wrong assumption:\n1. Classification only needs the\n   argmax, not exact probabilities.\n2. Errors in individual features\n   can cancel out.\n3. Very fast: O(n*d) training.\n\nVariants:\n- Gaussian: Continuous features\n- Multinomial: Count data (text)\n- Bernoulli: Binary features\n\nExcellent for: Spam filtering,\ntext classification, real-time.",
  },
  {
    topic: "Regularization (L1 vs L2)",
    front:
      "What is the difference between\nL1 (Lasso) and L2 (Ridge)\nregularization?",
    back: "L1 (Lasso):\n  Penalty = lambda * sum(|w_i|)\n  Effect: Drives weights to exactly 0.\n  Result: Feature selection (sparse model).\n  Use: When many irrelevant features.\n\nL2 (Ridge):\n  Penalty = lambda * sum(w_i^2)\n  Effect: Shrinks weights toward 0.\n  Result: All features kept, small weights.\n  Use: When most features are useful.\n\nElastic Net: Combines L1 + L2\n  alpha * L1 + (1-alpha) * L2\n  Best of both worlds.\n\nlambda controls regularization strength.\nTune via cross-validation.",
  },
  {
    topic: "ROC and AUC",
    front: "What is the ROC curve and AUC?\n\nWhen is AUC misleading?",
    back: "ROC: True Positive Rate (Recall)\n  vs False Positive Rate\n  at different thresholds.\n\nAUC: Area Under ROC Curve.\n  1.0 = perfect, 0.5 = random.\n\nInterpretation: Probability that\nmodel ranks a random positive\nhigher than a random negative.\n\nMisleading when:\n1. Highly imbalanced classes\n   (99% negative: AUC looks good\n    but model misses most positives)\n2. Cost of FP != cost of FN\n\nBetter alternatives for imbalanced:\n- Precision-Recall curve\n- Average Precision (AP)\n- F1-Score at optimal threshold",
  },
  {
    topic: "Anomaly Detection",
    front: "Name 4 approaches to\nanomaly detection.",
    back: "1. Statistical:\n   Z-score, IQR method.\n   Assumes normal distribution.\n   Fast but simplistic.\n\n2. Isolation Forest:\n   Random trees isolate anomalies\n   with fewer splits (short path).\n   Good for high-dimensional data.\n\n3. Autoencoder:\n   Train to reconstruct normal data.\n   High reconstruction error = anomaly.\n   Handles complex patterns.\n\n4. One-Class SVM:\n   Learn boundary around normal data.\n   Points outside = anomaly.\n\n5. DBSCAN:\n   Points not in any cluster = anomaly.\n\nChoose based on:\n- Data dimensionality\n- Labeled anomalies available?\n- Real-time requirement",
  },
  {
    topic: "Time Series Forecasting",
    front: "What are common approaches to\ntime series forecasting?",
    back: "Statistical:\n- ARIMA: Auto-regressive integrated\n  moving average. Good for linear trends.\n- Exponential Smoothing: Weighted avg\n  of past values.\n- Prophet (Facebook): Trend + seasonality.\n\nML-based:\n- XGBoost with lag features:\n  Create features from past values.\n  Often wins competitions.\n\nDeep Learning:\n- LSTM/GRU: Sequential processing.\n- Temporal Fusion Transformer:\n  Attention over time steps.\n- N-BEATS: Pure DL, interpretable.\n- PatchTST: Patches + Transformer.\n\nKey concepts:\n- Stationarity (differencing)\n- Autocorrelation\n- Train/test: temporal split (no shuffle!)",
  },
  {
    topic: "Recommender Systems",
    front: "Compare collaborative filtering\nand content-based filtering.",
    back: "Collaborative Filtering:\n  Use user-item interaction patterns.\n  'Users who liked X also liked Y.'\n\n  User-based: Similar users\n  Item-based: Similar items\n  Matrix factorization: SVD, ALS\n  Deep: Neural Collaborative Filtering\n\n  + No content features needed\n  - Cold start problem\n  - Popularity bias\n\nContent-based:\n  Use item features to recommend.\n  'You liked action movies -> more action'\n\n  + No cold start for items\n  - Limited diversity\n  - Need good features\n\nHybrid: Combine both approaches.\nModern: Two-tower models, transformers.",
  },
];

export const ML_ALGORITHMS: DeckInfo = {
  id: "ml-algorithms",
  title: "ML Algorithms & Techniques",
  description:
    "Classic ML algorithms: clustering, boosting, dimensionality reduction, regularization, anomaly detection, and recommender systems.",
  category: "ML/AI",
  level: "intermediate",
  cards,
  tags: ["clustering", "boosting", "PCA", "ensemble", "anomaly detection"],
  estimatedMinutes: 15,
};
