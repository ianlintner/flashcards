import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Streaming Fundamentals",
    front: "What problem does streaming solve in functional systems?",
    back: "Streaming lets programs process data\nin bounded memory while preserving clear\ncomposition.\n\nInstead of loading everything at once, a stream\nrepresents a staged flow of values over time or\nover demand.\n\nWhy it matters:\n  - huge files and datasets\n  - network protocols\n  - event pipelines\n  - backpressure-aware services\n  - resource-safe pipelines\n\nGood streaming models combine composition with\nexplicit control of evaluation and resources.",
  },
  {
    topic: "Pull vs Push",
    front: "Compare pull-based and push-based stream models.",
    back: "Pull model:\n  downstream asks upstream for the next value.\n  Good for demand-driven processing and backpressure.\n\nPush model:\n  upstream emits values toward subscribers.\n  Natural for events and GUI/reactive systems.\n\nReal systems often blend both ideas.\n\nImportant question:\n  who controls the pace of production?\nThat answer shapes memory behavior, latency,\nand cancellation semantics.",
  },
  {
    topic: "Backpressure",
    front: "Why is backpressure central in streaming design?",
    back: "Backpressure prevents fast producers from\noverwhelming slow consumers.\n\nWithout it, systems get:\n  - unbounded queues\n  - high memory growth\n  - unstable latency\n  - dropped messages or timeouts\n\nA solid streaming runtime makes demand and\nflow control explicit so throughput is managed\nrather than wished into existence.",
  },
  {
    topic: "Resource-Safe Streams",
    front: "How do functional streaming libraries keep resources safe?",
    back: "Streams often wrap resources such as files,\nsockets, database cursors, or HTTP bodies.\n\nA safe stream abstraction must guarantee:\n  - acquisition happens at the right time\n  - cleanup runs on success, failure, or cancel\n  - downstream short-circuiting still releases\n    upstream resources\n\nThis is where effect systems and streaming\nlibraries pair naturally: composition without\nturning cleanup into a manual scavenger hunt.",
  },
  {
    topic: "FRP Core Idea",
    front: "What is functional reactive programming (FRP)?",
    back: "FRP models time-varying values and event\nstreams declaratively.\n\nTwo classic concepts:\n  behaviors/signals  values that vary over time\n  events             discrete occurrences\n\nGoal:\n  describe relationships between changing values\n  instead of wiring imperative callbacks by hand.\n\nWhy it is attractive:\n  - compositional UI or signal logic\n  - clearer dependency graphs\n  - fewer ad hoc state transitions\n\nWhy it is tricky:\n  time, glitches, feedback loops, and space use\n  are much harder than toy demos suggest.",
  },
  {
    topic: "Glitches and Time Semantics",
    front: "What is a glitch in FRP, and why do semantics matter so much?",
    back: "A glitch is a transient inconsistent value\nobserved during propagation through a reactive\ndependency graph.\n\nExample:\n  C depends on A and B\n  B also depends on A\nIf updates propagate in the wrong order, C may\nsee mixed old/new values briefly.\n\nSerious FRP systems need well-defined update\nsemantics so derived values remain coherent.\nTime models, scheduling, and dependency ordering\nare not implementation details; they are the\nwhole game.",
  },
  {
    topic: "Streaming vs FRP",
    front:
      "How should engineers distinguish streaming libraries from FRP systems?",
    back: "Streaming libraries focus on ordered flows\nof data, backpressure, batching, and resource\nsafety.\n\nFRP focuses on declarative relationships among\ntime-varying values and events.\n\nThere is overlap, but they optimize for\ndifferent questions:\n  Streaming: how do values move efficiently?\n  FRP: how do changing values relate over time?\n\nConfusing the two leads to awkward abstractions\nthat are neither operationally solid nor\nsemantically clean.",
  },
  {
    topic: "When to Use Streaming or FRP",
    front: "When do streaming and FRP pay off in real systems?",
    back: "Streaming pays off for:\n  ETL, messaging, ingestion, protocol handling,\n  large data processing, resource-safe I/O.\n\nFRP pays off for:\n  interactive UIs, dashboards, live state graphs,\n  simulation, signal processing, time-driven apps.\n\nDo not adopt them just because the abstractions\nlook elegant. Adopt them when time, flow, and\ncomposition are genuinely central to the domain.",
  },
];

export const STREAMING_AND_FRP: DeckInfo = {
  id: "streaming-and-frp",
  title: "Streaming and Functional Reactive Programming",
  description:
    "Streaming pipelines, backpressure, resource safety, FRP models, glitches, and time semantics.",
  category: "Languages",
  level: "senior-staff",
  cards,
  tags: [
    "streaming",
    "FRP",
    "backpressure",
    "reactive systems",
    "resource safety",
    "time semantics",
  ],
  estimatedMinutes: 16,
};
