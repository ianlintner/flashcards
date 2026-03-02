import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "What is Reinforcement Learning?",
    front: "What is Reinforcement Learning?\n\nWhat are its key components?",
    back: "Agent learns to maximize cumulative\nreward through trial and error.\n\nComponents:\n- Agent: The learner/decision maker\n- Environment: World the agent acts in\n- State (s): Current situation\n- Action (a): Agent's choice\n- Reward (r): Feedback signal\n- Policy (pi): State -> action mapping\n- Value V(s): Expected future reward\n- Q-value Q(s,a): Value of action in state\n\nObjective: Find optimal policy pi*\nthat maximizes expected total reward.\n\nKey difference from supervised learning:\n- No labeled correct actions\n- Delayed rewards\n- Exploration vs exploitation trade-off",
  },
  {
    topic: "Markov Decision Process",
    front: "What is an MDP?\n\nWhat are the Markov property assumptions?",
    back: "MDP = (S, A, P, R, gamma)\n  S: Set of states\n  A: Set of actions\n  P(s'|s,a): Transition probability\n  R(s,a,s'): Reward function\n  gamma: Discount factor [0,1]\n\nMarkov property:\n  Future depends only on current state,\n  not on history.\n  P(s_t+1 | s_t, a_t) = P(s_t+1 | s_0...s_t, a_0...a_t)\n\nBellman equation:\n  V(s) = max_a sum_s' P(s'|s,a)\n         * [R(s,a,s') + gamma*V(s')]\n\ngamma controls time horizon:\n  gamma=0: Greedy (immediate reward)\n  gamma->1: Far-sighted (long-term)",
  },
  {
    topic: "Q-Learning",
    front: "What is Q-Learning?\n\nHow does it update?",
    back: "Model-free, off-policy algorithm.\nLearns Q(s,a) = expected return\nstarting from s, taking a.\n\nUpdate rule:\n  Q(s,a) <- Q(s,a) + alpha *\n    [r + gamma * max_a' Q(s',a') - Q(s,a)]\n\nalpha: Learning rate\ngamma: Discount factor\n\nOff-policy: Learns optimal Q\nregardless of exploration policy.\n\nExploration: epsilon-greedy\n  With prob epsilon: random action.\n  With prob 1-epsilon: best Q action.\n  Decay epsilon over time.\n\nConverges to optimal Q* given:\n- All state-action pairs visited\n- Sufficient exploration\n- Decaying learning rate",
  },
  {
    topic: "Deep Q-Network (DQN)",
    front: "What is DQN?\n\nWhat improvements made it work?",
    back: "Use neural network to approximate\nQ(s,a) instead of Q-table.\n\nQ_theta(s,a) ~ Q*(s,a)\n\nKey innovations (DeepMind, 2015):\n1. Experience replay:\n   Store (s,a,r,s') transitions.\n   Sample random mini-batches.\n   Breaks correlation in sequential data.\n\n2. Target network:\n   Separate network for target Q values.\n   Update periodically (every C steps).\n   Stabilizes training.\n\n3. Frame stacking:\n   Stack 4 frames as input.\n   Captures motion/velocity.\n\nAchievement: Superhuman Atari game play\nfrom raw pixels.\n\nLimitations: Discrete actions only,\noverestimation bias.",
  },
  {
    topic: "Policy Gradient Methods",
    front:
      "What are Policy Gradient methods?\n\nHow do they differ from Q-learning?",
    back: "Directly optimize the policy:\n  pi_theta(a|s) = P(action | state)\n\nREINFORCE algorithm:\n  Collect full episode.\n  Update: theta += alpha * G_t * grad(log pi(a|s))\n  G_t = discounted return from step t.\n\nDifferences from Q-learning:\n- Directly parameterize policy\n- Works with continuous actions\n- On-policy (uses current policy data)\n- Can learn stochastic policies\n\nAdvantages:\n- Natural for continuous action spaces\n- Can represent complex policies\n\nDisadvantages:\n- High variance in gradient estimates\n- Sample inefficient\n\nFix variance: Actor-Critic methods.",
  },
  {
    topic: "Actor-Critic Methods",
    front: "What is the Actor-Critic architecture?\n\nWhat is A2C/A3C?",
    back: "Two networks:\n  Actor: Learns policy pi(a|s)\n  Critic: Learns value V(s)\n\nAdvantage function:\n  A(s,a) = Q(s,a) - V(s)\n  = r + gamma*V(s') - V(s)  (TD estimate)\n\nActor update:\n  theta += alpha * A(s,a) * grad(log pi(a|s))\n  Advantage reduces variance vs REINFORCE.\n\nA2C (Advantage Actor-Critic):\n  Synchronous. Multiple workers,\n  synchronized updates.\n\nA3C (Asynchronous):\n  Workers update global model\n  asynchronously. Faster training.\n\nModern: PPO and SAC largely replaced\nA3C in practice.",
  },
  {
    topic: "PPO - Proximal Policy Optimization",
    front: "What is PPO and why is it popular?",
    back: "Policy gradient with clipped objective\nto prevent too-large policy updates.\n\nObjective:\n  L = min(r(theta) * A,\n          clip(r(theta), 1-eps, 1+eps) * A)\n\n  r(theta) = pi_new(a|s) / pi_old(a|s)\n  eps = 0.2 typically\n\nWhy popular:\n1. Simple to implement\n2. Stable training (clipping)\n3. Works for continuous and discrete\n4. Good sample efficiency\n5. State-of-the-art in many domains\n\nUsed in:\n- ChatGPT (RLHF fine-tuning)\n- OpenAI Five (Dota 2)\n- Robotics control\n- Game AI\n\nAlternative: TRPO (trust region) -\nmore principled but harder to implement.",
  },
  {
    topic: "Exploration vs Exploitation",
    front:
      "What is the exploration-exploitation\ndilemma?\n\nName 3 exploration strategies.",
    back: "Dilemma:\n  Exploit: Use known best action\n  (maximize immediate reward).\n  Explore: Try new actions\n  (might find better long-term strategy).\n\nStrategies:\n1. Epsilon-greedy:\n   Random action with prob epsilon.\n   Simple but undirected exploration.\n\n2. UCB (Upper Confidence Bound):\n   Choose action with highest\n   Q(a) + c * sqrt(ln(t) / N(a))\n   Balances value and uncertainty.\n\n3. Thompson Sampling:\n   Maintain posterior over Q values.\n   Sample from posterior, act greedily.\n   Naturally balances explore/exploit.\n\n4. Intrinsic motivation:\n   Reward for visiting novel states.\n   Curiosity-driven exploration.",
  },
  {
    topic: "Multi-Armed Bandits",
    front:
      "What is the Multi-Armed Bandit\nproblem?\n\nHow does it relate to RL?",
    back: "Simplified RL: No states, just actions.\nK slot machines (arms), each with\nunknown reward distribution.\n\nGoal: Maximize total reward over T pulls.\n\nRegret:\n  R_T = T * mu* - sum(rewards)\n  mu* = best arm's expected reward.\n\nAlgorithms:\n- Epsilon-greedy: O(T) regret\n- UCB1: O(sqrt(T*K*ln(T))) regret\n- Thompson Sampling: Near-optimal\n\nApplications:\n- A/B testing (adaptive)\n- Ad selection\n- News article recommendation\n- Clinical trials\n\nRelation to RL:\n  Bandit = 1-state MDP.\n  Contextual bandit: State but no\n  sequential dependency.",
  },
  {
    topic: "Model-Based vs Model-Free RL",
    front: "Compare model-based and model-free\nreinforcement learning.",
    back: "Model-Free:\n  Learn policy/value directly from\n  experience. No environment model.\n  Examples: Q-learning, PPO, SAC.\n  + Simpler to implement\n  + Works with any environment\n  - Sample inefficient\n\nModel-Based:\n  Learn model of environment:\n  P(s'|s,a) and R(s,a).\n  Plan using learned model.\n  Examples: Dyna-Q, MBPO, MuZero.\n  + Sample efficient (imagine rollouts)\n  + Can plan ahead\n  - Model errors compound\n  - Harder to implement\n\nMuZero (DeepMind):\n  Learns model implicitly.\n  Superhuman at Go, Chess, Atari\n  without knowing game rules.\n\nTrend: Hybrid approaches combining both.",
  },
];

export const REINFORCEMENT_LEARNING: DeckInfo = {
  id: "reinforcement-learning",
  title: "Reinforcement Learning",
  description:
    "RL fundamentals: MDPs, Q-learning, policy gradients, actor-critic, PPO, DQN, exploration, and bandits.",
  category: "ML/AI",
  level: "advanced",
  cards,
  tags: ["RL", "Q-learning", "PPO", "policy gradient", "bandits"],
  estimatedMinutes: 15,
};
