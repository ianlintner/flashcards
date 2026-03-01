import type { DeckInfo } from "./types";

export const BEHAVIORAL_INTERVIEW: DeckInfo = {
  id: "behavioral-interview",
  title: "Behavioral Interview",
  description:
    "STAR method, Amazon Leadership Principles, common behavioral questions, and frameworks for structuring answers. Often 50% of the interview weight at FAANG.",
  level: "intermediate",
  category: "Behavioral",
  cards: [
    {
      topic: "STAR Method",
      front:
        "What is the STAR method?\n\nHow do you structure a behavioral\ninterview answer?",
      back: "S - Situation: set the context.\n   'On my team at X, we had...'\n\nT - Task: your specific responsibility.\n   'I was responsible for...'\n\nA - Action: what YOU did (not the team).\n   'I decided to... I built... I led...'\n\nR - Result: measurable outcome.\n   'This reduced latency by 40%...'\n\nKeep answers 2-3 minutes.\nAlways quantify results when possible.",
    },
    {
      topic: "Tell Me About Yourself",
      front:
        "How should you answer\n'Tell me about yourself'\nin a tech interview?",
      back: "Structure (90 seconds max):\n\n1. Current role: 'I'm a senior SWE at X\n   working on Y system.'\n\n2. Key accomplishments: 'I recently led\n   a migration that improved latency\n   by 50%.'\n\n3. Why this role: 'I'm excited about\n   this opportunity because...'\n\nDo NOT:\n- Recite your full resume\n- Talk about hobbies irrelevantly\n- Go longer than 2 minutes\n\nTailor to the company's focus areas.",
    },
    {
      topic: "Leadership Principle: Ownership",
      front:
        "Amazon LP: Ownership\n\n'Leaders are owners. They think\nlong term and don't sacrifice\nlong-term value for short-term results.'\n\nPrepare a STAR story for this.",
      back: "Good story includes:\n- Going beyond your job description\n- Fixing something nobody asked you to\n- Thinking about long-term consequences\n- Taking responsibility for failures\n\nExample themes:\n- 'I noticed our monitoring was\n  inadequate, so I built alerting\n  that prevented 3 outages.'\n- 'I owned the on-call runbook and\n  reduced incident response time\n  from 30 min to 5 min.'\n\nKey phrase: 'It wasn't my job, but...'",
    },
    {
      topic: "Leadership Principle: Bias for Action",
      front:
        "Amazon LP: Bias for Action\n\n'Speed matters in business. Many\ndecisions are reversible and do not\nneed extensive study.'\n\nWhat type of story demonstrates this?",
      back: "Show you can:\n- Make decisions with incomplete info\n- Distinguish reversible (two-way door)\n  from irreversible (one-way door)\n- Act quickly and course-correct\n\nExample themes:\n- 'We had a P0 incident. I made the\n  call to roll back immediately rather\n  than debug in production. We restored\n  service in 5 min vs potential hours.'\n- 'Instead of a 3-month study, I built\n  a prototype in 2 weeks to validate\n  the approach.'\n\nAvoid: reckless decisions without data.",
    },
    {
      topic: "Conflict Resolution",
      front:
        "'Tell me about a time you disagreed\nwith a teammate or manager.'\n\nHow should you structure this answer?",
      back: "Framework:\n1. Context: what was the disagreement?\n2. Your viewpoint + their viewpoint\n   (show you understood both sides)\n3. How you resolved it:\n   - Used data/evidence\n   - Proposed a compromise\n   - Escalated constructively\n4. Outcome: what happened?\n5. Relationship: stayed professional\n\nDo NOT:\n- Badmouth the other person\n- Say 'I was right, they were wrong'\n- Show inability to compromise\n\nShow: empathy, data-driven decision,\nmature conflict resolution.",
    },
    {
      topic: "Failure Question",
      front: "'Tell me about a time you failed.'\n\nWhat makes a good answer?",
      back: "Good failure answer has:\n1. A REAL failure (not a humble brag)\n   Bad: 'I worked too hard.'\n   Good: 'My project missed its deadline.'\n\n2. YOUR role in the failure\n   'I underestimated the complexity...'\n\n3. What you LEARNED\n   'I now break projects into milestones\n   with buffer time.'\n\n4. How you APPLIED the lesson\n   'On the next project, I delivered\n   2 weeks early using this approach.'\n\nShow: self-awareness, growth mindset,\nconcrete behavioral change.",
    },
    {
      topic: "Technical Decision / Trade-off",
      front:
        "'Tell me about a difficult technical\ndecision you made.'\n\nWhat should you emphasize?",
      back: "Structure:\n1. Context: what problem, what constraints?\n2. Options considered (at least 2-3)\n3. How you evaluated trade-offs:\n   - Performance vs maintainability\n   - Build vs buy\n   - Short-term speed vs long-term debt\n4. Your decision and reasoning\n5. Results + what you'd do differently\n\nShow:\n- Analytical thinking\n- Awareness of trade-offs\n- Stakeholder communication\n- Willingness to revisit decisions\n\nBonus: mention data that informed\nthe decision.",
    },
    {
      topic: "Project Leadership",
      front:
        "'Tell me about a project you led.'\n\nWhat elements should your answer\ncover?",
      back: "Cover all phases:\n1. Planning: how you scoped, broke down\n   tasks, estimated timeline\n2. Execution: how you coordinated,\n   unblocked, handled setbacks\n3. People: how you delegated, grew\n   junior engineers, resolved conflicts\n4. Delivery: on time? metrics? impact?\n\nQuantify everything:\n- Team size: 'Led 5 engineers'\n- Timeline: 'Delivered in 3 months'\n- Impact: 'Reduced costs by $200K/year'\n\nShow: planning, execution, people\nskills, and measurable results.",
    },
    {
      topic: "Working Under Pressure",
      front:
        "'Tell me about a time you worked\nunder a tight deadline.'\n\nWhat makes a compelling answer?",
      back: "Strong answer shows:\n1. Real pressure (not self-inflicted)\n   'Customer-facing outage' or\n   'Regulatory deadline in 2 weeks'\n\n2. How you prioritized:\n   'I identified the critical path and\n   cut non-essential features.'\n\n3. Actions you took:\n   - Communicated early to stakeholders\n   - Broke work into parallel streams\n   - Made pragmatic trade-offs\n\n4. Result: delivered + what quality\n\nAvoid: glorifying overwork.\nShow: calm decision-making, clear\ncommunication, smart prioritization.",
    },
    {
      topic: "Mentoring / Growing Others",
      front:
        "'Tell me about a time you mentored\nor helped grow another engineer.'\n\nWhy do FAANG companies ask this?",
      back: "Why asked: senior+ roles require\nforce multiplication. Hiring bar:\n'Does this person make others better?'\n\nGood answer includes:\n1. Who and what was their challenge?\n2. Your approach:\n   - Paired programming sessions\n   - Code review with teaching\n   - Gradually increased responsibility\n3. Their growth: 'They went from\n   needing hand-holding to independently\n   owning the feature.'\n4. Long-term impact: 'They got promoted\n   6 months later.'\n\nShow: patience, investment in others,\nscalable impact.",
    },
    {
      topic: "Ambiguity / Unstructured Problem",
      front:
        "'Tell me about a time you handled\nan ambiguous situation.'\n\nWhat is the interviewer evaluating?",
      back: "Evaluating:\n- Can you operate without clear specs?\n- Can you define the problem yourself?\n- Can you make progress under uncertainty?\n\nGood STAR:\n1. Situation: unclear requirements,\n   no precedent, new domain\n2. What you did to reduce ambiguity:\n   - Talked to stakeholders\n   - Researched prior art\n   - Built a prototype to learn\n   - Defined success criteria yourself\n3. How you made a decision and moved\n   forward despite incomplete info\n4. Result: shipped something valuable\n\nKey: don't wait for perfect info.",
    },
    {
      topic: "Why This Company?",
      front:
        "How do you answer\n'Why do you want to work here?'\n\nWhat should you research beforehand?",
      back: "Research before the interview:\n- Recent product launches or tech blog\n  posts\n- Company mission and values\n- The specific team's projects\n- Tech stack and engineering culture\n\nAnswer structure:\n1. Company mission alignment\n   'I care about X because...'\n2. Technical excitement\n   'Your work on Y is solving Z at scale'\n3. Personal growth\n   'This role challenges me to grow in...'\n\nDo NOT: mention salary, perks, or\nfame. Do NOT give generic answers.\nBe specific to THIS company.",
    },
    {
      topic: "Cross-Functional Collaboration",
      front:
        "'Tell me about working with\nnon-engineering stakeholders.'\n\nWhat should you demonstrate?",
      back: "Show ability to:\n1. Translate technical concepts for\n   non-technical audiences.\n   'I explained latency trade-offs\n   using an analogy of...'\n\n2. Balance competing priorities.\n   'PM wanted feature X, but I showed\n   that Y was a prerequisite.'\n\n3. Build trust.\n   'I gave weekly updates with demos\n   so stakeholders felt involved.'\n\n4. Find win-win solutions.\n   'We shipped a simpler v1 that met\n   80% of requirements in half the time.'\n\nKey: empathy + clear communication.",
    },
    {
      topic: "Biggest Accomplishment",
      front:
        "'What is your biggest accomplishment?'\n\nHow do you select the right story?",
      back: "Selection criteria:\n1. Relevant to the target role level.\n   IC? -> technical depth.\n   Lead? -> team impact.\n   Senior? -> cross-team / org impact.\n\n2. Quantifiable results.\n   Revenue, latency, reliability,\n   cost savings, user growth.\n\n3. Demonstrates both technical AND\n   soft skills.\n\n4. Recent (last 2-3 years).\n\nStructure: STAR with emphasis on\n- What made it HARD\n- What choices YOU made\n- Measurable IMPACT\n\nPrepare 2-3 stories at different scales.",
    },
    {
      topic: "Dealing With Pushback",
      front:
        "'Tell me about a time you convinced\nothers to adopt your idea.'\n\nWhat skills should you showcase?",
      back: "Showcase:\n1. Data-driven persuasion:\n   'I ran benchmarks showing 3x\n   improvement over the current approach.'\n\n2. Prototype / proof of concept:\n   'I built a quick demo in 2 days\n   that made the benefits tangible.'\n\n3. Active listening:\n   'I addressed their concerns by\n   incorporating their feedback into\n   the design.'\n\n4. Patience and persistence:\n   'It took 3 meetings, but we aligned\n   on a modified version.'\n\nShow: influence without authority,\nrespect for others' perspectives.",
    },
    {
      topic: "Leadership Principle: Customer Obsession",
      front:
        "Amazon LP: Customer Obsession\n\n'Leaders start with the customer\nand work backwards.'\n\nWhat kind of story fits?",
      back: "Good story themes:\n- You identified a customer pain point\n  before they reported it.\n- You pushed back on a feature that\n  would hurt user experience.\n- You used customer data/feedback to\n  drive a technical decision.\n- You simplified a complex workflow for\n  end users.\n\nStructure:\n1. How you discovered the customer need\n2. What you built or changed\n3. Customer impact (metrics: NPS,\n   support tickets, adoption rate)\n\nKey: customer = end user, not just\nyour manager or business stakeholder.",
    },
    {
      topic: "Leadership Principle: Dive Deep",
      front:
        "Amazon LP: Dive Deep\n\n'Leaders operate at all levels.\nNo task is beneath them.'\n\nPrepare a STAR story.",
      back: "Good story includes:\n- You personally debugged a production\n  issue at the code/system level.\n- You questioned metrics that didn't\n  look right and found the root cause.\n- You read the source code of a\n  dependency to understand behavior.\n\nExample:\n'Our dashboard showed 99.9% uptime,\nbut customers complained. I dug into\nraw logs and found the health check\nwas only testing a cache, not the\ndatabase. I fixed the check, which\nrevealed real uptime was 97%.\nWe then prioritized reliability work.'\n\nShow: curiosity, attention to detail.",
    },
    {
      topic: "Why Are You Leaving?",
      front:
        "'Why are you leaving your current\nrole?'\n\nHow to answer positively?",
      back: "Positive framing:\n1. Growth: 'I've accomplished X and Y.\n   I'm looking for new challenges in Z.'\n\n2. Scope: 'I want to work on problems\n   at a larger scale.'\n\n3. Mission: 'I'm excited about the\n   impact this company is making in...'\n\nDo NOT:\n- Trash your current employer/manager\n- Mention compensation as primary reason\n- Sound desperate or negative\n- Lie about the reason\n\nHonest + forward-looking = best approach.",
    },
    {
      topic: "Questions to Ask the Interviewer",
      front:
        "What are 5 strong questions to\nask your interviewer?\n\nWhat should you NOT ask?",
      back: "Good questions:\n1. 'What does the first 90 days look\n   like for this role?'\n2. 'What's the biggest technical\n   challenge your team faces now?'\n3. 'How do you measure success for\n   this position?'\n4. 'Can you tell me about the team\n   culture and how decisions are made?'\n5. 'What's something you wish you\n   knew before joining?'\n\nDo NOT ask:\n- Salary in first round\n- 'What does the company do?'\n- Anything easily Googleable\n- Questions that signal low motivation",
    },
    {
      topic: "Story Bank Strategy",
      front:
        "How many stories should you prepare\nfor behavioral interviews?\n\nHow do you organize them?",
      back: "Prepare 8-10 strong STAR stories that\ncover multiple themes:\n\nMap each story to themes:\n- Technical challenge\n- Leadership / ownership\n- Conflict / disagreement\n- Failure + learning\n- Mentoring / helping others\n- Working under pressure\n- Ambiguity / initiative\n- Customer impact\n\nEach story should map to 2-3 themes.\n\nOrganize in a spreadsheet:\nStory | Themes | Situation | Actions\n\nPractice telling each in 2-3 minutes.\nHave a long version (3 min) and\nshort version (90 sec).",
    },
    {
      topic: "Common Red Flags to Avoid",
      front:
        "What are common behavioral interview\nred flags that cause rejection?",
      back: "Red flags interviewers watch for:\n\n1. 'We' instead of 'I': can't identify\n   YOUR contribution.\n\n2. No metrics: 'It went well' vs\n   'Reduced latency by 40%.'\n\n3. Blaming others: 'The PM gave us\n   bad requirements.'\n\n4. No learning from failures: 'It\n   wasn't really my fault.'\n\n5. Vague answers: can't give specifics.\n\n6. Negative about past employers.\n\n7. Can't explain technical decisions\n   at appropriate depth.\n\nFix: practice with a friend who gives\nhonest feedback. Record yourself.",
    },
    {
      topic: "Behavioral Interview Scoring",
      front:
        "How do FAANG companies typically\nscore behavioral interviews?\n\nWhat are they evaluating?",
      back: "Common evaluation criteria:\n\n1. Leadership / Ownership (30%)\n   Scope of impact, initiative taken.\n\n2. Communication (25%)\n   Clarity, structure, conciseness.\n\n3. Problem Solving (20%)\n   How you approached the challenge.\n\n4. Self-Awareness (15%)\n   Honest about failures, growth areas.\n\n5. Culture Fit (10%)\n   Alignment with company values.\n\nScoring: typically 1-4 or 1-5 scale.\n'Strong hire' requires demonstrating\nmultiple criteria at the target level.\n\nInterviewer writes detailed notes\nimmediately after. They quote you.",
    },
  ],
};
