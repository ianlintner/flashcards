import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Supervised vs Unsupervised",
    front:
      "What is the difference between\nsupervised and unsupervised learning?\n\nGive 3 examples of each.",
    back: "Supervised: Labeled training data.\n  Model learns input -> output mapping.\n  Examples:\n  - Classification (spam detection)\n  - Regression (house prices)\n  - Object detection\n\nUnsupervised: No labels.\n  Model finds hidden patterns.\n  Examples:\n  - Clustering (K-means)\n  - Dimensionality reduction (PCA)\n  - Anomaly detection",
  },
  {
    topic: "Bias-Variance Trade-off",
    front:
      "Explain the bias-variance trade-off.\n\nHow does model complexity affect each?",
    back: "Bias: Error from wrong assumptions\n  High bias = underfitting\n  (model too simple)\n\nVariance: Error from sensitivity to\n  training data noise\n  High variance = overfitting\n  (model too complex)\n\nTotal Error = Bias^2 + Variance + Noise\n\nGoal: Find sweet spot where\ntotal error is minimized.",
  },
  {
    topic: "Overfitting vs Underfitting",
    front: "How do you detect and prevent\noverfitting?",
    back: "Detection:\n- Training accuracy >> validation accuracy\n- Loss diverges on validation set\n\nPrevention:\n1. More training data\n2. Regularization (L1/L2)\n3. Dropout (neural networks)\n4. Early stopping\n5. Cross-validation\n6. Simpler model architecture\n7. Data augmentation\n8. Ensemble methods",
  },
  {
    topic: "Cross-Validation",
    front:
      "What is K-Fold Cross-Validation?\n\nWhy is it better than a\nsingle train/test split?",
    back: "Split data into K folds.\nTrain on K-1 folds, validate on 1.\nRepeat K times (each fold is validation once).\n\nFinal score = average of K scores.\n\nAdvantages:\n- Uses all data for both train and test\n- More reliable performance estimate\n- Reduces variance of the estimate\n\nCommon: K = 5 or K = 10\nLeave-One-Out: K = n (expensive)",
  },
  {
    topic: "Linear Regression",
    front:
      "What is Linear Regression?\n\nWhat loss function does it use?\nHow is it optimized?",
    back: "Predict continuous output:\n  y = w*x + b\n\nLoss: Mean Squared Error (MSE)\n  L = (1/n) * sum((y_pred - y_true)^2)\n\nOptimization:\n1. Normal Equation (closed-form):\n   w = (X^T X)^-1 X^T y\n   O(n^3) - for small datasets\n\n2. Gradient Descent:\n   w -= lr * dL/dw\n   O(n*d) per iteration",
  },
  {
    topic: "Logistic Regression",
    front:
      "What is Logistic Regression?\n\nHow does it differ from\nLinear Regression?",
    back: "Binary classification model.\nOutputs probability via sigmoid:\n  p = 1 / (1 + e^(-z))\n  where z = w*x + b\n\nLoss: Binary Cross-Entropy\n  L = -[y*log(p) + (1-y)*log(1-p)]\n\nDifferences from Linear Regression:\n- Output: probability [0,1] not unbounded\n- Loss: cross-entropy, not MSE\n- Decision boundary is linear\n- Optimized with gradient descent",
  },
  {
    topic: "Decision Trees",
    front: "How do Decision Trees work?\n\nWhat splitting criteria are used?",
    back: "Tree of if-then rules.\nEach node splits on a feature.\nLeaves are predictions.\n\nClassification criteria:\n- Gini Impurity: 1 - sum(p_i^2)\n  Lower = more pure\n- Information Gain / Entropy:\n  H = -sum(p_i * log(p_i))\n\nRegression criteria:\n- MSE reduction\n\nProne to overfitting.\nFix: pruning, max depth, min samples.",
  },
  {
    topic: "Random Forest",
    front:
      "What is a Random Forest?\n\nHow does it improve over\na single Decision Tree?",
    back: "Ensemble of decision trees.\n\nKey ideas:\n1. Bagging: Each tree trained on\n   random subset (with replacement)\n2. Feature randomness: Each split\n   considers random subset of features\n3. Aggregation: Average (regression)\n   or majority vote (classification)\n\nBenefits:\n- Reduces overfitting\n- Handles high-dimensional data\n- Feature importance ranking\n- Robust to outliers",
  },
  {
    topic: "K-Nearest Neighbors",
    front: "How does KNN work?\n\nWhat are its strengths and weaknesses?",
    back: "Classify by majority vote of K\nnearest neighbors in feature space.\n\nPrediction: O(n*d) - compare to all points\n  n = dataset size, d = dimensions\n\nStrengths:\n- Simple, no training\n- Non-linear boundaries\n- Works with any distance metric\n\nWeaknesses:\n- Slow prediction (searches all data)\n- Curse of dimensionality\n- Sensitive to feature scaling\n- Must choose K (odd for binary)",
  },
  {
    topic: "SVM - Support Vector Machine",
    front: "What is a Support Vector Machine?\n\nWhat is the kernel trick?",
    back: "Finds hyperplane that maximizes\nmargin between classes.\n\nSupport vectors: points closest\nto the decision boundary.\n\nKernel Trick:\n- Maps data to higher dimension\n  without explicit computation\n- Linear: x^T * y\n- Polynomial: (x^T*y + c)^d\n- RBF: exp(-gamma * ||x-y||^2)\n\nGood for: high-dim data, small datasets.\nBad for: very large datasets (slow).",
  },
  {
    topic: "Feature Engineering",
    front: "What is feature engineering?\n\nName 5 common techniques.",
    back: "Transforming raw data into features\nthat better represent the problem.\n\nTechniques:\n1. Normalization/Standardization:\n   Scale features to same range\n2. One-Hot Encoding:\n   Categorical -> binary columns\n3. Log Transform:\n   Handle skewed distributions\n4. Polynomial Features:\n   Capture non-linear relationships\n5. Binning:\n   Continuous -> discrete ranges\n\nOften more impactful than model choice.",
  },
  {
    topic: "Evaluation Metrics - Classification",
    front: "What is the relationship between\nPrecision, Recall, and F1-Score?",
    back: "Precision = TP / (TP + FP)\n  Of predicted positives, how many correct?\n\nRecall = TP / (TP + FN)\n  Of actual positives, how many found?\n\nF1 = 2 * (P * R) / (P + R)\n  Harmonic mean of P and R.\n\nUse Precision when: cost of FP is high\n  (spam filter - don't lose real email)\n\nUse Recall when: cost of FN is high\n  (cancer detection - don't miss cases)",
  },
];

export const ML_FUNDAMENTALS: DeckInfo = {
  id: "ml-fundamentals",
  title: "Machine Learning Fundamentals",
  description:
    "Core ML concepts: supervised/unsupervised learning, bias-variance, classic algorithms, evaluation metrics.",
  category: "ML/AI",
  level: "foundation",
  cards,
  tags: ["ML", "classification", "regression", "evaluation"],
  estimatedMinutes: 18,
};
