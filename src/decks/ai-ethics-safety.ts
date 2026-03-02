import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "AI Safety - Alignment Problem",
    front: "What is the alignment problem\nin AI?\n\nWhy is it important?",
    back: "Ensuring AI systems pursue goals\nthat match human intentions.\n\nChallenges:\n1. Specification: Hard to define\n   what we actually want.\n   (Goodhart's Law: Metric becomes\n    target, ceases to be good metric.)\n\n2. Robustness: Model should behave\n   well in all situations, not just\n   training distribution.\n\n3. Scalable oversight: How to supervise\n   systems smarter than us?\n\nExamples of misalignment:\n- Reward hacking: Game AI finds exploits\n- Paperclip maximizer (thought experiment)\n- Social media: Optimize engagement\n  -> amplify outrage\n\nApproaches: RLHF, Constitutional AI,\nscalable oversight, interpretability.",
  },
  {
    topic: "Bias in ML",
    front: "What are the main types of bias\nin machine learning?",
    back: "1. Data bias:\n   Training data underrepresents groups.\n   Example: Face recognition worse for\n   darker skin tones.\n\n2. Selection bias:\n   Non-random data collection.\n   Example: Survey only online users.\n\n3. Measurement bias:\n   Proxies that correlate with\n   protected attributes.\n   Example: Zip code as proxy for race.\n\n4. Algorithmic bias:\n   Model amplifies existing biases.\n   Feedback loops reinforce disparities.\n\n5. Evaluation bias:\n   Benchmarks not representative.\n\nMitigation:\n- Diverse training data\n- Fairness metrics (demographic parity,\n  equalized odds, equality of opportunity)\n- Bias auditing before deployment\n- Human review of edge cases",
  },
  {
    topic: "Fairness Metrics",
    front:
      "Name 3 fairness metrics for ML.\n\nCan they all be satisfied simultaneously?",
    back: "1. Demographic Parity:\n   P(Y_hat=1 | A=0) = P(Y_hat=1 | A=1)\n   Equal positive prediction rate\n   across groups.\n\n2. Equalized Odds:\n   Same TPR and FPR across groups.\n   P(Y_hat=1 | Y=1, A) = same for all A.\n\n3. Calibration:\n   P(Y=1 | Y_hat=p, A) = p for all A.\n   Predictions mean the same thing\n   across groups.\n\nImpossibility theorem (Chouldechova):\n  Cannot satisfy all three simultaneously\n  when base rates differ between groups.\n\n  Must choose which fairness notion\n  matters most for the application.\n\nContext matters: Medical (equalized odds)\nvs lending (calibration).",
  },
  {
    topic: "Privacy in ML",
    front: "What is Differential Privacy?\n\nHow is it applied to ML?",
    back: "Guarantees that including or excluding\nany single data point doesn't\nsignificantly change the output.\n\nFormal: For all datasets D, D'\ndiffering in one record:\n  P(M(D) in S) <= e^epsilon * P(M(D') in S)\n\nepsilon = privacy budget.\n  Lower = more private.\n\nApplied to ML:\n1. DP-SGD: Add calibrated noise\n   to gradients during training.\n   Clip gradient norms.\n\n2. Federated Learning:\n   Train on-device, share only\n   model updates (not data).\n\n3. PATE: Teacher ensemble labels\n   data privately.\n\nTrade-off: More privacy = less utility.\nApple, Google use DP in products.",
  },
  {
    topic: "Explainability and Interpretability",
    front:
      "What is the difference between\nexplainability and interpretability?\n\nName 3 XAI techniques.",
    back: "Interpretability: Model is inherently\nunderstandable (decision tree, linear).\n\nExplainability: Post-hoc techniques\nto explain black-box models.\n\nTechniques:\n1. SHAP (Shapley Additive Explanations):\n   Assigns importance score to each\n   feature for each prediction.\n   Based on game theory.\n\n2. LIME (Local Interpretable Model):\n   Approximate model locally with\n   simple (linear) model.\n   Explains individual predictions.\n\n3. Attention visualization:\n   Show which tokens/pixels the model\n   focuses on.\n   (Caution: attention != explanation.)\n\n4. Counterfactual explanations:\n   'If X was Y, prediction changes.'\n\nRegulatory: GDPR \"right to explanation\".",
  },
  {
    topic: "Deepfakes and Misinformation",
    front: "What are deepfakes?\n\nHow can they be detected?",
    back: "AI-generated or manipulated media\n(video, audio, images, text).\n\nGeneration techniques:\n- GANs (face swap, synthesis)\n- Diffusion models (image generation)\n- Voice cloning (text-to-speech)\n- LLMs (text generation)\n\nDetection approaches:\n1. Artifact detection: Inconsistent\n   lighting, missing reflections,\n   irregular blinking.\n\n2. Frequency analysis: GAN-generated\n   images have spectral artifacts.\n\n3. Provenance: C2PA/watermarking\n   to track content origin.\n\n4. AI detectors: Classifiers trained\n   on real vs generated content.\n   (Not fully reliable.)\n\nHarms: Election manipulation,\nnon-consensual content, fraud.\nGovernance: EU AI Act, state laws.",
  },
  {
    topic: "Responsible AI Principles",
    front: "What are the core principles\nof Responsible AI?",
    back: "1. Fairness:\n   Avoid creating or reinforcing bias.\n   Equal treatment across groups.\n\n2. Transparency:\n   Disclose AI use to users.\n   Explain how decisions are made.\n\n3. Privacy:\n   Protect user data.\n   Minimize data collection.\n\n4. Safety:\n   Prevent harmful outputs and\n   unintended consequences.\n\n5. Accountability:\n   Clear ownership of AI decisions.\n   Human-in-the-loop for high stakes.\n\n6. Robustness:\n   Work reliably across conditions.\n   Handle adversarial inputs.\n\n7. Inclusivity:\n   Design for diverse users.\n   Consider marginalized groups.\n\nFrameworks: Microsoft RAI, Google PAIR,\nIBM Trusted AI, NIST AI RMF.",
  },
  {
    topic: "LLM Safety Techniques",
    front: "What techniques are used to make\nLLMs safer?",
    back: "1. RLHF/RLAIF:\n   Align with human preferences.\n   Reward model trains on safety.\n\n2. Constitutional AI (Anthropic):\n   Set of principles (constitution).\n   Model critiques its own outputs.\n\n3. Red-teaming:\n   Adversarial testing to find failures.\n   Automated + human red-teamers.\n\n4. Content filtering:\n   Separate classifier on input/output.\n   Block harmful content.\n\n5. System prompts:\n   Safety guidelines in instructions.\n\n6. Guardrails:\n   Structured validation of outputs.\n   Topic restrictions, PII detection.\n\n7. Monitoring:\n   Log and review outputs at scale.\n   Human review of flagged content.\n\nChallenges: Jailbreaks keep evolving.\nDefense is an ongoing arms race.",
  },
  {
    topic: "Copyright and AI",
    front: "What are the key copyright issues\nwith generative AI?",
    back: "Training data:\n- Models trained on web-scraped data.\n- Lawsuits: NYT v. OpenAI, artists\n  v. Stability AI, Getty v. Stability.\n- Fair use defense is contested.\n\nAI-generated content:\n- US Copyright Office: No protection\n  for purely AI-generated works.\n- Human authorship required.\n- Partial protection if significant\n  human creative input.\n\nKey questions:\n1. Is training on copyrighted data\n   fair use?\n2. Who owns AI-generated output?\n3. Should training data be licensed?\n4. Opt-in vs opt-out for creators?\n\nEmerging solutions:\n- Licensed training data\n- Opt-out mechanisms (robots.txt)\n- Content provenance (C2PA)\n- Attribution systems",
  },
  {
    topic: "Environmental Impact",
    front: "What is the environmental impact\nof training large AI models?",
    back: "Training compute:\n- GPT-3: ~1,287 MWh electricity\n  ~552 tons CO2e\n- GPT-4: Estimated 10x+ more.\n\nInference at scale:\n- ChatGPT: Estimated 564 MWh/day.\n- Much more than training over time.\n\nWater usage:\n- Data centers use water for cooling.\n- GPT-3 training: ~700,000 liters.\n\nMitigation:\n1. Efficient architectures (MoE)\n2. Smaller, better-trained models\n   (Chinchilla scaling)\n3. Quantization reduces inference cost\n4. Renewable energy for data centers\n5. Carbon-aware training scheduling\n6. Distillation: Compress into\n   smaller models.\n\nTrend: Awareness growing but\ncompute demand growing faster.",
  },
];

export const AI_ETHICS_SAFETY: DeckInfo = {
  id: "ai-ethics-safety",
  title: "AI Ethics & Safety",
  description:
    "AI ethics topics: alignment, bias, fairness metrics, privacy, explainability, deepfakes, responsible AI, and environmental impact.",
  category: "ML/AI",
  level: "foundation",
  cards,
  tags: ["ethics", "safety", "bias", "fairness", "privacy", "alignment"],
  estimatedMinutes: 15,
};
