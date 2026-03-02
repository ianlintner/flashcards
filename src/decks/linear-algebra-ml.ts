import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Vectors",
    front:
      "What is a vector?\n\nDefine dot product, cross product,\nand vector norms.",
    back: "Vector: An ordered list of numbers.\n  v = [v1, v2, ..., vn].\n  Represents a point or direction in R^n.\n\nDot product (inner product):\n  a . b = Sum(a_i * b_i)\n  Scalar result.\n  a . b = |a| * |b| * cos(theta).\n  -> Measures similarity / alignment.\n  Orthogonal vectors: a . b = 0.\n\nCross product (3D only):\n  a x b = vector perpendicular to both.\n  |a x b| = |a| * |b| * sin(theta).\n  = area of parallelogram.\n\nVector norms (length/magnitude):\n  L1 norm: Sum(|v_i|).\n    Manhattan distance.\n  L2 norm: sqrt(Sum(v_i^2)).\n    Euclidean distance.\n  L-inf norm: max(|v_i|).\n\nML uses:\n  Feature vectors: Each data point = vector.\n  Cosine similarity: cos(theta) = a.b / |a||b|.\n  Word embeddings: word2vec, GloVe.\n  L1/L2 regularization.",
  },
  {
    topic: "Matrices",
    front:
      "What are the key matrix operations?\n\nDefine transpose, inverse,\nand matrix multiplication.",
    back: "Matrix: 2D array, m rows x n cols.\n  A in R^(m x n).\n\nTranspose: Flip rows and columns.\n  A^T: (A^T)_ij = A_ji.\n  (AB)^T = B^T * A^T.\n\nMatrix Multiplication: A(mxn) * B(nxp) = C(mxp).\n  C_ij = Sum_k(A_ik * B_kj).\n  NOT commutative: AB != BA.\n  Associative: (AB)C = A(BC).\n\nIdentity Matrix: I (diagonal = 1).\n  AI = IA = A.\n\nInverse: A^(-1) such that A*A^(-1) = I.\n  Only for square, non-singular matrices.\n  det(A) != 0.\n  Solve Ax = b -> x = A^(-1) * b.\n\nDeterminant: Scalar value.\n  det = 0 -> singular (no inverse).\n  2x2: det = ad - bc.\n  Measures volume scaling.\n\nTrace: Sum of diagonal elements.\n  tr(A) = Sum(A_ii).\n\nML uses:\n  Data matrix: rows=samples, cols=features.\n  Weight matrices in neural networks.\n  Covariance matrix: X^T * X / n.\n  Matrix inversion in linear regression.",
  },
  {
    topic: "Linear Transformations",
    front:
      "What is a linear transformation?\n\nHow do matrices represent them?",
    back: "Linear transformation T: R^n -> R^m\nsatisfies:\n  T(u + v) = T(u) + T(v).\n  T(c * v) = c * T(v).\n\nEvery linear transformation can be\nrepresented as matrix multiplication:\n  T(v) = A * v.\n  A is the transformation matrix.\n\nExamples (2D):\n  Rotation by theta:\n    [cos(theta) -sin(theta)]\n    [sin(theta)  cos(theta)]\n\n  Scaling by (sx, sy):\n    [sx  0 ]\n    [0   sy]\n\n  Reflection across x-axis:\n    [1   0]\n    [0  -1]\n\n  Shear:\n    [1  k]\n    [0  1]\n\nComposition = matrix multiplication:\n  Apply T1 then T2 = T2 * T1.\n  (Order matters!)\n\nML uses:\n  Neural network layers:\n    h = f(W * x + b).\n    W is a linear transformation.\n  Attention: Q*K^T -> linear map.\n  PCA: Project onto principal components.",
  },
  {
    topic: "Eigenvalues & Eigenvectors",
    front:
      "What are eigenvalues and\neigenvectors?\n\nWhy do they matter in ML?",
    back: "Definition:\n  For square matrix A:\n  A * v = lambda * v.\n  v = eigenvector (direction unchanged).\n  lambda = eigenvalue (scaling factor).\n\nFinding eigenvalues:\n  det(A - lambda * I) = 0.\n  Solve characteristic polynomial.\n  n x n matrix has n eigenvalues.\n\nProperties:\n  Eigenvectors of different eigenvalues\n  are linearly independent.\n  tr(A) = Sum(eigenvalues).\n  det(A) = Product(eigenvalues).\n\nDiagonalization:\n  A = V * D * V^(-1).\n  D = diagonal matrix of eigenvalues.\n  V = matrix of eigenvectors.\n  Efficient for computing A^k.\n\nML applications:\n\n  PCA: Eigenvectors of covariance matrix\n    = principal components.\n    Eigenvalues = variance explained.\n    Largest eigenvalue = most variance.\n\n  Google PageRank: Dominant eigenvector\n    of link matrix.\n\n  Spectral clustering: Eigenvectors of\n    graph Laplacian.\n\n  Stability analysis:\n    All |eigenvalues| < 1 -> system stable.\n    Gradient descent convergence.",
  },
  {
    topic: "SVD",
    front: "What is Singular Value\nDecomposition (SVD)?\n\nHow is it used?",
    back: "SVD: Any matrix A (m x n) can be\ndecomposed as:\n  A = U * S * V^T.\n\n  U: m x m orthogonal (left singular vecs).\n  S: m x n diagonal (singular values, >= 0).\n  V: n x n orthogonal (right singular vecs).\n\n  Singular values: s1 >= s2 >= ... >= 0.\n\nRelation to eigendecomposition:\n  A^T * A has eigenvalues = s_i^2.\n  Eigenvectors of A^T*A = columns of V.\n  Eigenvectors of A*A^T = columns of U.\n\nTruncated SVD (rank-k approximation):\n  A_k = U_k * S_k * V_k^T.\n  Best rank-k approximation (Frobenius norm).\n  Keep only top-k singular values.\n\nApplications:\n  Dimensionality reduction:\n    LSA/LSI for text -> topic discovery.\n  Image compression:\n    Keep top-k -> approximate image.\n  Recommender systems:\n    Matrix factorization for\n    user-item ratings.\n  Pseudoinverse:\n    A^+ = V * S^+ * U^T.\n    Least-squares solution.\n  Noise reduction:\n    Small singular values = noise.\n    Truncate to denoise.",
  },
  {
    topic: "Vector Spaces & Basis",
    front:
      "What is a vector space?\n\nDefine span, basis, rank,\nand null space.",
    back: "Vector space: Set V with addition\nand scalar multiplication that satisfies:\n  Closure, associativity, commutativity,\n  zero vector, additive inverse.\n  Examples: R^n, polynomials, matrices.\n\nLinear independence:\n  Vectors v1..vk: No vi is a linear\n  combination of the others.\n  c1*v1 + ... + ck*vk = 0 only if\n  all c_i = 0.\n\nSpan: Set of all linear combinations\n  of given vectors.\n  span(v1..vk) = {c1*v1 + ... + ck*vk}.\n\nBasis: Linearly independent set that\n  spans the entire space.\n  Standard basis for R^3: e1, e2, e3.\n  Any vector = unique combo of basis vecs.\n\nDimension: Number of basis vectors.\n  R^n has dimension n.\n\nRank: Dimension of column space.\n  rank(A) = # linearly independent columns.\n  Full rank: rank = min(m, n).\n\nNull space: {x : Ax = 0}.\n  Rank-nullity theorem:\n  rank(A) + nullity(A) = n (# cols).\n\nML uses:\n  Feature rank -> true dimensionality.\n  Rank-deficient -> multicollinearity.\n  Null space -> parameter degeneracies.",
  },
  {
    topic: "Positive Definite Matrices",
    front: "What is a positive definite matrix?\n\nWhy is it important in ML?",
    back: "Symmetric matrix A is:\n\n  Positive definite (PD):\n    x^T * A * x > 0 for all x != 0.\n    All eigenvalues > 0.\n\n  Positive semi-definite (PSD):\n    x^T * A * x >= 0 for all x.\n    All eigenvalues >= 0.\n\n  Negative definite:\n    x^T * A * x < 0 for all x != 0.\n\nProperties of PD matrices:\n  - Always invertible (det > 0).\n  - Unique Cholesky decomposition:\n    A = L * L^T (L = lower triangular).\n  - All diagonal entries > 0.\n\nML importance:\n\n  Covariance matrices:\n    Always PSD.\n    PD if no redundant features.\n    Used in Gaussian distributions.\n\n  Hessian matrix (second derivatives):\n    PD at a point -> local minimum.\n    PSD -> convex function (global min).\n    Negative definite -> local maximum.\n    Indefinite -> saddle point.\n\n  Kernel matrices (Gram matrices):\n    Must be PSD for valid kernel.\n    K_ij = k(x_i, x_j).\n\n  Optimization:\n    Convex loss -> guaranteed convergence.\n    PD Hessian -> Newton's method works.",
  },
  {
    topic: "Matrix Calculus",
    front:
      "What is the gradient of a function\nwith respect to a vector or matrix?\n\nKey derivatives for ML.",
    back: "Gradient: Vector of partial derivatives.\n  f: R^n -> R.\n  grad f = [df/dx1, df/dx2, ..., df/dxn].\n  Points in direction of steepest ascent.\n\nJacobian: Matrix of partial derivatives.\n  f: R^n -> R^m.\n  J_ij = df_i / dx_j.\n  Shape: m x n.\n\nHessian: Matrix of second derivatives.\n  H_ij = d^2f / (dx_i * dx_j).\n  Symmetric if f is smooth.\n  Shape: n x n.\n\nKey derivatives for ML:\n\n  d(a^T x) / dx = a.\n  d(x^T A x) / dx = (A + A^T) x.\n  If A symmetric: = 2Ax.\n\n  d(||Ax - b||^2) / dx\n    = 2 A^T (Ax - b).\n  Set to 0: x = (A^T A)^(-1) A^T b.\n  (Normal equation for least squares.)\n\nChain rule (vector):\n  dz/dx = dz/dy * dy/dx.\n  Jacobians multiply.\n  -> Backpropagation in neural networks.\n\nML uses:\n  Gradient descent: x = x - alpha * grad f.\n  Backprop: Chain rule through layers.\n  Newton's method: x = x - H^(-1) * grad f.",
  },
];

export const LINEAR_ALGEBRA_ML: DeckInfo = {
  id: "linear-algebra-ml",
  title: "Linear Algebra for ML",
  description:
    "Vectors, matrices, eigenvalues, SVD, vector spaces, and matrix calculus foundations for machine learning.",
  category: "CS Theory",
  level: "intermediate",
  cards,
  tags: ["linear algebra", "matrices", "SVD", "eigenvalues", "PCA", "calculus"],
  estimatedMinutes: 12,
};
