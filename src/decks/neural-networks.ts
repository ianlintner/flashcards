import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Perceptron",
    front:
      "What is a Perceptron?\n\nHow does it relate to modern neural networks?",
    back: 'Single-layer neural network.\n  output = activation(w*x + b)\n\nPerceptron = linear classifier.\nCan only learn linearly separable data.\n(Cannot learn XOR.)\n\nModern networks: stack many layers\nof perceptrons with non-linear\nactivation functions.\n\nHistorical significance:\n- Rosenblatt (1958)\n- Minsky & Papert showed XOR limit\n- Led to "AI winter"',
  },
  {
    topic: "Activation Functions",
    front:
      "Compare ReLU, Sigmoid, and Tanh\nactivation functions.\n\nWhen do you use each?",
    back: 'ReLU: f(x) = max(0, x)\n  + Fast, sparse activations\n  - "Dying ReLU" (neurons stuck at 0)\n  Use: Hidden layers (default choice)\n\nSigmoid: f(x) = 1/(1+e^-x)\n  Range: (0, 1)\n  - Vanishing gradient\n  Use: Binary output layer\n\nTanh: f(x) = (e^x - e^-x)/(e^x + e^-x)\n  Range: (-1, 1)\n  - Vanishing gradient\n  Use: When zero-centered output needed\n\nVariants: LeakyReLU, GELU, Swish',
  },
  {
    topic: "Backpropagation",
    front: "Explain backpropagation.\n\nWhat is the chain rule's role?",
    back: "Algorithm to compute gradients\nof loss w.r.t. each weight.\n\nForward pass:\n  Compute output layer by layer.\n\nBackward pass (chain rule):\n  dL/dw_i = dL/da * da/dz * dz/dw_i\n\n  For layer l:\n  delta_l = delta_(l+1) * W_(l+1)^T\n             * f'(z_l)\n\nKey ideas:\n- Reuses intermediate computations\n- O(n) per layer (efficient)\n- Requires storing activations\n  (memory vs compute trade-off)",
  },
  {
    topic: "Gradient Descent Variants",
    front: "Compare SGD, Mini-batch SGD,\nand Adam optimizer.",
    back: "SGD (Stochastic):\n  Update per 1 sample.\n  + Fast updates\n  - Noisy, high variance\n\nMini-batch SGD:\n  Update per batch (32-256 samples)\n  + Balances speed and stability\n  - Must tune learning rate, batch size\n\nAdam (Adaptive Moment Estimation):\n  Combines momentum + RMSProp.\n  Tracks 1st moment (mean) and\n  2nd moment (variance) of gradients.\n  + Adapts LR per parameter\n  + Default choice for most tasks\n  - May not generalize as well as SGD",
  },
  {
    topic: "Convolutional Neural Networks",
    front:
      "What are the key components\nof a CNN?\n\nWhy are CNNs good for images?",
    back: "Components:\n1. Conv layers: Learn spatial filters\n   (edges, textures, patterns)\n2. Pooling: Reduce spatial dimensions\n   (max pool, average pool)\n3. Fully connected: Final classification\n\nWhy good for images:\n- Parameter sharing: Same filter\n  applied across entire image\n- Translation invariance: Detects\n  features regardless of position\n- Hierarchy: Low-level -> high-level\n  features (edges -> shapes -> objects)\n\nKey architectures: LeNet, AlexNet,\nVGG, ResNet, EfficientNet",
  },
  {
    topic: "Recurrent Neural Networks",
    front:
      "What problem do RNNs solve?\n\nWhat is the vanishing gradient issue?",
    back: 'RNNs process sequential data\nby maintaining hidden state:\n  h_t = f(W_h * h_(t-1) + W_x * x_t)\n\nUse cases: Text, time series, speech.\n\nVanishing gradient:\n  Gradients shrink exponentially as\n  they propagate through time steps.\n  Network "forgets" long-range deps.\n\nSolutions:\n- LSTM: Gates control info flow\n  (forget, input, output gates)\n- GRU: Simplified LSTM (2 gates)\n  (reset, update gates)\n- Attention/Transformers (replaced RNNs)',
  },
  {
    topic: "Dropout and Regularization",
    front: "How does Dropout work as\nregularization in neural networks?",
    back: "During training:\n  Randomly set p% of neurons to 0\n  each forward pass.\n  (Typical: p = 0.2 to 0.5)\n\nDuring inference:\n  Use all neurons but scale\n  outputs by (1 - p).\n\nWhy it works:\n1. Prevents co-adaptation of neurons\n2. Approximates ensemble of networks\n3. Forces redundant representations\n\nOther regularization:\n- Weight decay (L2 on weights)\n- Batch normalization\n- Data augmentation\n- Early stopping",
  },
  {
    topic: "Batch Normalization",
    front: "What is Batch Normalization?\n\nWhere is it applied and why?",
    back: "Normalize activations within\neach mini-batch:\n  x_norm = (x - mean) / sqrt(var + eps)\n  y = gamma * x_norm + beta\n\ngamma, beta are learnable parameters.\n\nApplied: Between linear/conv layer\nand activation function.\n\nBenefits:\n1. Faster training (higher LR)\n2. Reduces internal covariate shift\n3. Regularization effect\n4. Reduces sensitivity to init\n\nVariants:\n- Layer Norm (per-sample, used in NLP)\n- Group Norm (per-channel group)\n- Instance Norm (per-sample per-channel)",
  },
  {
    topic: "Loss Functions",
    front: "Name 4 loss functions and when\nto use each.",
    back: "1. MSE (Mean Squared Error):\n   L = mean((y - y_hat)^2)\n   Use: Regression\n\n2. Cross-Entropy:\n   L = -sum(y * log(y_hat))\n   Use: Classification\n\n3. Binary Cross-Entropy:\n   L = -(y*log(p) + (1-y)*log(1-p))\n   Use: Binary classification\n\n4. Huber Loss:\n   MSE when |error| < delta,\n   MAE otherwise.\n   Use: Robust regression\n   (less sensitive to outliers)\n\nOthers: Hinge (SVM), Focal (imbalanced),\nContrastive (similarity learning)",
  },
  {
    topic: "Transfer Learning",
    front: "What is Transfer Learning?\n\nHow is it applied in practice?",
    back: "Use a model trained on task A\nas starting point for task B.\n\nApproach:\n1. Take pre-trained model (e.g., ResNet\n   trained on ImageNet, 1M+ images)\n2. Freeze early layers (generic features)\n3. Replace/fine-tune later layers\n   for your specific task\n\nWhen to use:\n- Small dataset for target task\n- Similar domain (images -> images)\n- Expensive to train from scratch\n\nExamples:\n- ImageNet -> medical imaging\n- BERT -> sentiment analysis\n- GPT -> text summarization",
  },
  {
    topic: "Vanishing and Exploding Gradients",
    front:
      "What causes vanishing/exploding\ngradients?\n\nHow are they addressed?",
    back: "Cause: Repeated multiplication during\nbackprop through many layers.\n\nVanishing (gradients -> 0):\n  - Deep networks with sigmoid/tanh\n  - Weights stop updating\n  Fix: ReLU, skip connections (ResNet),\n       LSTM/GRU, proper initialization\n\nExploding (gradients -> infinity):\n  - Unstable training, NaN losses\n  Fix: Gradient clipping,\n       weight initialization (He, Xavier),\n       batch normalization\n\nResNet insight: Skip connections let\ngradients flow directly through.",
  },
  {
    topic: "Embeddings",
    front: "What are embeddings in\nneural networks?\n\nWhy are they useful?",
    back: "Dense vector representations of\ndiscrete inputs (words, items, etc.)\n\nWord embeddings:\n  'king' -> [0.2, -0.4, 0.7, ...]\n  Dim: 100 to 1024\n\nProperties:\n- Similar items have similar vectors\n- Arithmetic: king - man + woman ~= queen\n- Learned during training\n\nBenefits:\n1. Reduce dimensionality\n   (vs one-hot: 50K dims -> 300 dims)\n2. Capture semantic similarity\n3. Generalize across similar inputs\n\nExamples: Word2Vec, GloVe,\nfastText, learned embeddings in any NN",
  },
];

export const NEURAL_NETWORKS: DeckInfo = {
  id: "neural-networks",
  title: "Neural Networks Deep Dive",
  description:
    "Architecture fundamentals: perceptrons, CNNs, RNNs, backpropagation, optimization, and regularization techniques.",
  category: "ML/AI",
  level: "intermediate",
  cards,
  tags: ["neural networks", "CNN", "RNN", "backpropagation", "optimization"],
  estimatedMinutes: 18,
};
