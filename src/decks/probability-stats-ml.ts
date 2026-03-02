import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Probability Basics",
    front: "Define probability, conditional\nprobability, and Bayes' Theorem.",
    back: "Probability: P(A) = favorable / total.\n  0 <= P(A) <= 1.\n  P(A') = 1 - P(A) (complement).\n\nConditional probability:\n  P(A|B) = P(A ^ B) / P(B)\n  'Probability of A given B occurred.'\n\nIndependence:\n  P(A ^ B) = P(A) * P(B)\n  A and B don't affect each other.\n\nBayes' Theorem:\n  P(A|B) = P(B|A) * P(A) / P(B)\n\n  Where P(B) = P(B|A)*P(A) + P(B|A')*P(A')\n  (Law of total probability)\n\nExample:\n  Test is 99% accurate.\n  Disease prevalence: 1%.\n  P(Disease | Positive)?\n\n  P(Pos|Dis) = 0.99\n  P(Dis) = 0.01\n  P(Pos|NoDis) = 0.01 (false positive)\n\n  P(Dis|Pos) = 0.99*0.01 /\n    (0.99*0.01 + 0.01*0.99)\n  = 0.5 = 50%!\n  (Surprising: base rate matters!)\n\nML uses: Naive Bayes, Bayesian inference,\npriors and posteriors, MAP estimation.",
  },
  {
    topic: "Random Variables & Distributions",
    front: "What are the key probability\ndistributions for ML?",
    back: "Discrete distributions:\n\n  Bernoulli: Single trial, p(success).\n    Coin flip. X in {0, 1}.\n\n  Binomial: n independent Bernoulli trials.\n    P(X=k) = C(n,k) * p^k * (1-p)^(n-k).\n    E[X] = np, Var = np(1-p).\n\n  Poisson: Events in fixed interval.\n    P(X=k) = (lambda^k * e^(-lambda)) / k!\n    E[X] = Var = lambda.\n    Use: Rare events, counts.\n\nContinuous distributions:\n\n  Uniform: Equal probability on [a,b].\n    E[X] = (a+b)/2.\n\n  Normal (Gaussian): Bell curve.\n    N(mu, sigma^2).\n    68-95-99.7 rule (1-2-3 sigma).\n    Central Limit Theorem: Averages\n    of any distribution -> Normal.\n\n  Exponential: Time between events.\n    Memoryless property.\n    P(X > s+t | X > s) = P(X > t).\n\nML key distributions:\n  Softmax output -> Categorical.\n  Gaussian -> Regression, VAEs, noise.\n  Bernoulli -> Binary classification.",
  },
  {
    topic: "Descriptive Statistics",
    front:
      "Define mean, median, mode,\nvariance, and standard deviation.\n\nWhen is each useful?",
    back: "Mean (average): Sum / n.\n  Sensitive to outliers.\n  Use: Symmetric data, no outliers.\n\nMedian: Middle value (sorted).\n  Robust to outliers.\n  Use: Skewed data, income, house prices.\n\nMode: Most frequent value.\n  Use: Categorical data.\n\nVariance: Average squared deviation.\n  Var = Sum((x_i - mean)^2) / n.\n  Measures spread.\n\nStandard Deviation: sqrt(Variance).\n  Same units as data.\n  Normal dist: 68% within 1 SD.\n\nPercentiles / Quartiles:\n  Q1 (25th), Q2 (median), Q3 (75th).\n  IQR = Q3 - Q1 (interquartile range).\n  Outlier: < Q1 - 1.5*IQR or\n           > Q3 + 1.5*IQR.\n\nSkewness:\n  Positive: Tail on right (mean > median).\n  Negative: Tail on left (mean < median).\n\nKurtosis:\n  Tailedness of distribution.\n  High: Heavy tails (outlier prone).\n\nFor ML: Feature scaling uses mean and SD.\n  Z-score = (x - mean) / SD.\n  Min-max: (x - min) / (max - min).",
  },
  {
    topic: "Hypothesis Testing",
    front:
      "What is hypothesis testing?\n\nDefine p-value, Type I and\nType II errors.",
    back: "Hypothesis testing:\n  H0: Null hypothesis (no effect).\n  H1: Alternative hypothesis (effect exists).\n\nProcess:\n  1. State H0 and H1.\n  2. Choose significance level alpha\n     (usually 0.05).\n  3. Compute test statistic from data.\n  4. Find p-value.\n  5. If p < alpha, reject H0.\n\np-value: Probability of observing data\n  at least as extreme, assuming H0 is true.\n  Low p-value -> evidence against H0.\n  NOT the probability H0 is true.\n\nType I Error (False Positive):\n  Reject H0 when H0 is actually true.\n  Probability = alpha.\n\nType II Error (False Negative):\n  Fail to reject H0 when H1 is true.\n  Probability = beta.\n\nPower = 1 - beta.\n  Probability of correctly rejecting H0.\n  Higher power = better test.\n\nCommon tests:\n  t-test: Compare means.\n  chi-squared: Categorical association.\n  ANOVA: Compare multiple group means.\n\nML context: A/B testing, model comparison,\nfeature significance.",
  },
  {
    topic: "Correlation & Regression",
    front:
      "What is the difference between\ncorrelation and causation?\n\nExplain linear regression.",
    back: "Correlation: Strength of linear\n  relationship between two variables.\n  Pearson r: -1 to +1.\n    +1: Perfect positive linear.\n     0: No linear relationship.\n    -1: Perfect negative linear.\n\n  Correlation != Causation!\n  Ice cream sales correlate with drownings.\n  (Confounding variable: hot weather.)\n\nLinear Regression:\n  y = wx + b (simple linear).\n  w: slope (weight), b: intercept (bias).\n  Goal: Minimize sum of squared errors.\n\n  Loss function (MSE):\n    L = (1/n) * Sum((y_i - y_hat_i)^2)\n\n  Normal equation (closed form):\n    w = (X^T X)^(-1) X^T y\n\n  Gradient descent (iterative):\n    w = w - alpha * dL/dw\n    alpha = learning rate.\n\n  R-squared (coefficient of determination):\n    R^2 = 1 - (SS_res / SS_tot)\n    1 = perfect fit, 0 = no better than mean.\n\nMultiple regression: y = w1*x1 + w2*x2 + b.\nPolynomial: y = w1*x + w2*x^2 + b.\nRegularization: Ridge (L2), Lasso (L1).",
  },
  {
    topic: "Maximum Likelihood Estimation",
    front:
      "What is Maximum Likelihood\nEstimation (MLE)?\n\nHow is it used in ML?",
    back: "MLE: Find parameter values that\nmaximize the likelihood of observed data.\n\nLikelihood: L(theta | data) =\n  Product of P(x_i | theta) for all x_i.\n\nLog-likelihood (easier to work with):\n  log L = Sum log P(x_i | theta).\n  (Turns product into sum.)\n\nExample: Coin flips.\n  7 heads, 3 tails.\n  L(p) = p^7 * (1-p)^3\n  d(log L)/dp = 0 -> p_MLE = 7/10 = 0.7\n\nConnection to ML:\n  Minimizing cross-entropy loss\n  = maximizing log-likelihood.\n\n  Binary classification:\n    Loss = -[y*log(p) + (1-y)*log(1-p)]\n    This IS negative log-likelihood\n    of Bernoulli distribution.\n\n  Linear regression with MSE loss:\n    Equivalent to MLE assuming\n    Gaussian noise.\n\nMAP (Maximum A Posteriori):\n  MLE + prior distribution on parameters.\n  P(theta|data) ~ P(data|theta) * P(theta).\n  L2 regularization = Gaussian prior.\n  L1 regularization = Laplace prior.\n\nBayesian inference:\n  Full posterior distribution,\n  not just point estimate.",
  },
  {
    topic: "Sampling & Estimation",
    front:
      "What is the Central Limit Theorem?\n\nHow does it enable estimation?",
    back: "Central Limit Theorem (CLT):\n  The distribution of sample MEANS\n  approaches Normal as sample size\n  grows, REGARDLESS of the original\n  population distribution.\n\n  X_bar ~ N(mu, sigma^2/n)\n  mu = population mean.\n  sigma^2/n = variance of sample mean.\n\nWhy it matters:\n  + Enables confidence intervals.\n  + Justifies many statistical tests.\n  + Works for n >= 30 in practice.\n\nConfidence Interval:\n  Range likely containing true parameter.\n  95% CI for mean:\n    X_bar +/- 1.96 * (sigma / sqrt(n))\n\n  Interpretation: If we repeat the\n  experiment many times, 95% of CIs\n  would contain the true mean.\n\nBootstrap (resampling):\n  Sample with replacement from data.\n  Compute statistic on each resample.\n  Distribution of statistics -> CI.\n  Works for ANY statistic.\n  No distributional assumptions.\n\nML uses:\n  Training/test split (sampling).\n  Cross-validation.\n  Confidence intervals on metrics.\n  Bootstrap aggregating (bagging).",
  },
  {
    topic: "Dimensionality & Curse",
    front: "What is the curse of dimensionality?\n\nHow does PCA address it?",
    back: "Curse of Dimensionality:\n  As dimensions increase:\n  - Data becomes sparse.\n  - Distances become meaningless.\n  - All points roughly equidistant.\n  - Need exponentially more data.\n\n  Example: To sample uniformly:\n    1D: 10 points (10 bins).\n    2D: 100 points (10x10 grid).\n    3D: 1000 points.\n    100D: 10^100 points (impossible).\n\n  Effects on ML:\n  - kNN fails (all neighbors equidistant).\n  - Overfitting (more features than samples).\n  - Slow training.\n\nPCA (Principal Component Analysis):\n  Find directions of maximum variance.\n  Project data onto top-k components.\n  Linear dimensionality reduction.\n\n  Steps:\n  1. Center data (subtract mean).\n  2. Compute covariance matrix.\n  3. Eigendecomposition.\n  4. Keep top-k eigenvectors.\n  5. Project: X_new = X * V_k.\n\n  Scree plot: Choose k where\n  explained variance plateaus.\n\nAlternatives:\n  t-SNE: Non-linear, visualization.\n  UMAP: Faster non-linear.\n  Autoencoders: Neural network reduction.",
  },
];

export const PROBABILITY_STATS_ML: DeckInfo = {
  id: "probability-stats-ml",
  title: "Probability & Statistics for ML",
  description:
    "Probability, Bayes' theorem, distributions, hypothesis testing, MLE, sampling, and dimensionality for machine learning.",
  category: "CS Theory",
  level: "intermediate",
  cards,
  tags: ["probability", "statistics", "Bayes", "MLE", "distributions", "PCA"],
  estimatedMinutes: 12,
};
