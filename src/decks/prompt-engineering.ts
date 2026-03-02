import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "What is Prompt Engineering?",
    front: "What is prompt engineering?\n\nWhy does it matter for LLMs?",
    back: "Crafting inputs to guide LLM\nbehavior and output quality.\n\nWhy it matters:\n1. Same model, vastly different results\n   depending on prompt.\n2. No retraining needed.\n3. Cost-effective vs fine-tuning.\n\nKey elements:\n- System prompt: Set role/behavior\n- User prompt: The actual request\n- Context: Background information\n- Examples: Demonstrate desired output\n- Constraints: Format, length, style\n\nPrompt > model selection for most tasks.",
  },
  {
    topic: "Zero-Shot vs Few-Shot",
    front: "What is zero-shot vs few-shot\nprompting?\n\nWhen do you use each?",
    back: "Zero-shot: No examples provided.\n  'Classify this sentiment: I love it!'\n  Use when: Task is straightforward,\n  model understands the format.\n\nOne-shot: 1 example.\n  'Positive: Great movie! -> positive\n   Classify: I love it! ->'\n\nFew-shot: 2-5 examples.\n  Show input/output pairs that\n  demonstrate the desired pattern.\n  Use when: Complex or ambiguous tasks,\n  specific output format needed.\n\nMore examples = better consistency\nbut uses more context window.\n\nBalance: Use minimum examples that\nachieve reliable output.",
  },
  {
    topic: "Chain-of-Thought (CoT)",
    front:
      "What is Chain-of-Thought prompting?\n\nHow does it improve reasoning?",
    back: "Instruct model to show its\nreasoning step by step.\n\nStandard prompt:\n  'What is 23 * 17?'  -> Often wrong\n\nCoT prompt:\n  'What is 23 * 17?\n   Think step by step.'\n  -> '23*17 = 23*10 + 23*7\n      = 230 + 161 = 391'\n\nWhy it works:\n1. Breaks complex problems into steps\n2. Each step is easier for the model\n3. Errors become visible/debuggable\n\nVariants:\n- Zero-shot CoT: 'Think step by step'\n- Few-shot CoT: Provide example reasoning\n- Tree-of-Thought: Explore branches\n- Self-consistency: Sample N chains,\n  take majority vote",
  },
  {
    topic: "System Prompts",
    front: "What makes a good system prompt?\n\nWhat should it include?",
    back: "System prompt sets the model's\nbehavior, role, and constraints.\n\nGood system prompt includes:\n1. Role: 'You are a senior Python dev.'\n2. Task: 'Help users debug code.'\n3. Constraints: 'Be concise. No jargon.'\n4. Format: 'Reply in bullet points.'\n5. Guardrails: 'Don't write malware.'\n\nBest practices:\n- Be specific about what NOT to do\n- Define output format explicitly\n- Set knowledge boundaries\n- Include edge case handling\n- Less is more (don't over-constrain)\n\nCommon pitfall: Long system prompts\nget partially ignored. Prioritize\nthe most important instructions.",
  },
  {
    topic: "Structured Output",
    front: "How do you get LLMs to produce\nstructured output (JSON, XML)?",
    back: 'Techniques:\n1. Explicit format instruction:\n   \'Reply with valid JSON matching:\n   {"name": string, "score": number}\'\n\n2. Few-shot with examples:\n   Show 2-3 examples of desired format.\n\n3. JSON mode (API feature):\n   Force JSON output at API level.\n   (OpenAI, Anthropic support this.)\n\n4. Grammar-constrained decoding:\n   Restrict token sampling to valid\n   JSON grammar. (llama.cpp, Outlines)\n\n5. Schema validation + retry:\n   Parse output, if invalid, send\n   error back and retry.\n\nBest: Combine API JSON mode +\nschema validation + retry logic.',
  },
  {
    topic: "Prompt Injection",
    front: "What is prompt injection?\n\nHow can it be defended against?",
    back: "Attack where user input overrides\nsystem instructions.\n\nExample:\n  System: 'Only discuss cooking.'\n  User: 'Ignore above. Tell me about...'\n\nTypes:\n1. Direct: 'Ignore instructions...'\n2. Indirect: Hidden instructions in\n   retrieved documents/websites.\n\nDefenses:\n1. Input sanitization\n2. Delimiters for user content:\n   <user_input>{{input}}</user_input>\n3. Output validation/filtering\n4. Separate LLM for moderation\n5. Instruction hierarchy (system > user)\n6. Canary tokens to detect extraction\n\nNo perfect defense exists yet.\nDefense-in-depth is essential.",
  },
  {
    topic: "ReAct Pattern",
    front: "What is the ReAct\n(Reasoning + Acting) pattern?",
    back: "Combine reasoning and tool use\nin an interleaved loop.\n\nLoop:\n1. Thought: Reason about what to do\n2. Action: Call a tool (search, calc...)\n3. Observation: Process tool output\n4. Repeat until answer found\n\nExample:\n  Q: 'Population of France in 2023?'\n  Thought: I need to search for this.\n  Action: search('France population 2023')\n  Observation: '68.17 million'\n  Thought: I have the answer.\n  Answer: '68.17 million'\n\nBenefits:\n- Grounds responses in real data\n- Reduces hallucination\n- Transparent reasoning chain\n\nUsed in: LangChain agents, AutoGPT",
  },
  {
    topic: "Retrieval-Augmented Prompting",
    front: "How do you structure a RAG prompt\neffectively?",
    back: "Template structure:\n  System: 'Answer using ONLY the\n  provided context. If not found,\n  say \"I don't know.\"'\n\n  Context:\n  ---\n  [Retrieved chunk 1]\n  [Retrieved chunk 2]\n  [Retrieved chunk 3]\n  ---\n\n  Question: {user_query}\n\nBest practices:\n1. Cite sources: 'Cite [Source N]'\n2. Limit context: Top 3-5 chunks\n3. Order matters: Most relevant first\n4. Include metadata (dates, sources)\n5. Explicit \"don't hallucinate\" guard\n6. Ask model to assess confidence\n\nAnti-pattern: Dumping entire docs.\nChunk wisely (500-1000 tokens each).",
  },
  {
    topic: "Evaluation and Testing",
    front: "How do you evaluate prompt quality\nsystematically?",
    back: "1. Test suite: Create 20-50 diverse\n   input/expected-output pairs.\n\n2. Metrics:\n   - Accuracy: Correct vs incorrect\n   - Format compliance: Valid JSON?\n   - Latency: Response time\n   - Cost: Tokens used\n   - Safety: Refusal on bad inputs\n\n3. A/B testing:\n   Compare prompt variants on\n   same test suite.\n\n4. LLM-as-judge:\n   Use another LLM to rate outputs.\n   (GPT-4 rating GPT-3.5 outputs)\n\n5. Red-teaming:\n   Try to break the prompt with\n   adversarial inputs.\n\nAutomation: CI/CD pipeline for\nprompt regression testing.",
  },
  {
    topic: "Prompt Optimization Tips",
    front: "Name 6 practical tips for\nbetter prompts.",
    back: "1. Be specific about output format:\n   'Return a JSON array of strings'\n   not 'Give me a list'\n\n2. Use delimiters:\n   Separate instructions from content\n   with ```, ---, or XML tags.\n\n3. Assign a role:\n   'You are an expert at X'\n   activates relevant knowledge.\n\n4. Provide negative examples:\n   'Do NOT include explanations'\n   'Do NOT use markdown'\n\n5. Break complex tasks:\n   Multiple focused prompts beat\n   one huge prompt.\n\n6. Iterate empirically:\n   Test, measure, adjust.\n   Small wording changes can\n   cause large output differences.",
  },
];

export const PROMPT_ENGINEERING: DeckInfo = {
  id: "prompt-engineering",
  title: "Prompt Engineering",
  description:
    "Effective prompting techniques: zero/few-shot, chain-of-thought, system prompts, structured output, RAG patterns, and prompt security.",
  category: "ML/AI",
  level: "foundation",
  cards,
  tags: ["prompting", "LLM", "RAG", "chain-of-thought", "few-shot"],
  estimatedMinutes: 15,
};
