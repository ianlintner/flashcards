import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Observability Overview",
    front:
      "What are the three pillars\nof observability?\n\nHow do they differ from monitoring?",
    back: "Three Pillars:\n\n1. Logs: Discrete events with context.\n   'User X failed login at 14:02:33.'\n   Tools: ELK, Loki, CloudWatch Logs.\n\n2. Metrics: Numeric measurements over time.\n   CPU usage, request rate, error rate.\n   Tools: Prometheus, Datadog, CloudWatch.\n\n3. Traces: Request path across services.\n   Service A -> B -> C with timing.\n   Tools: Jaeger, Zipkin, X-Ray, Tempo.\n\nMonitoring vs Observability:\n  Monitoring: 'Is the system working?'\n    Predefined dashboards and alerts.\n    Known failure modes.\n\n  Observability: 'WHY is it broken?'\n    Explore unknown failure modes.\n    Ask arbitrary questions of telemetry.\n    Debug novel issues.\n\nObservability = monitoring + the ability\nto understand internal system state from\nexternal outputs.",
  },
  {
    topic: "Prometheus & Grafana",
    front: "How does the Prometheus + Grafana\nstack work?",
    back: "Prometheus:\n  Time-series database + scraping.\n  Pull model: scrapes /metrics endpoints.\n  PromQL query language.\n\n  Metric types:\n    Counter: Only goes up (requests_total).\n    Gauge: Can go up/down (cpu_usage).\n    Histogram: Distribution (request_duration).\n    Summary: Like histogram, client-side.\n\n  Architecture:\n    App exposes /metrics (text format).\n    Prometheus scrapes every N seconds.\n    Stores in local TSDB.\n    Alertmanager handles alert routing.\n\nGrafana:\n  Visualization and dashboarding.\n  Connects to Prometheus as data source.\n  Rich panels: graphs, heatmaps, tables.\n  Alerting built-in.\n  Supports many backends (Loki, ES, etc).\n\nCommon setup:\n  App -> Prometheus (scrape) ->\n    Grafana (visualize) +\n    Alertmanager (alert -> PagerDuty/Slack).",
  },
  {
    topic: "Distributed Tracing",
    front: "What is distributed tracing?\n\nHow does context propagation work?",
    back: "Distributed tracing tracks a request\nacross multiple services.\n\nKey concepts:\n  Trace: Full journey of a request.\n  Span: Single operation within a trace.\n  Span context: {traceId, spanId, flags}.\n  Parent-child: Spans form a tree.\n\nContext propagation:\n  HTTP headers carry trace context:\n    traceparent: 00-{traceId}-{spanId}-01\n    (W3C Trace Context standard)\n\n  Each service:\n    1. Extracts trace context from request.\n    2. Creates child span.\n    3. Does work (records timing, tags).\n    4. Propagates context to outgoing calls.\n    5. Reports span to collector.\n\nOpenTelemetry (OTel):\n  Vendor-neutral standard.\n  SDKs for all major languages.\n  Collector: receives, processes, exports.\n  Exporters: Jaeger, Zipkin, vendor APMs.\n\nWhen to trace:\n  Microservices, async flows, debugging\n  latency across service boundaries.",
  },
  {
    topic: "SLIs, SLOs, and SLAs",
    front: "Define SLI, SLO, and SLA.\n\nHow do they relate to each other?",
    back: "SLI (Service Level Indicator):\n  A quantitative measure of service.\n  Examples:\n    Request latency (p99 < 200ms).\n    Availability (% successful requests).\n    Error rate (% of 5xx responses).\n    Throughput (requests/second).\n\nSLO (Service Level Objective):\n  A target value for an SLI.\n  'p99 latency < 200ms for 99.9% of\n   requests over a 30-day window.'\n  Internal engineering goal.\n\nSLA (Service Level Agreement):\n  A contract with customers.\n  'We guarantee 99.95% uptime.'\n  Violation = penalties/credits.\n  SLA is usually less strict than SLO.\n\nRelationship:\n  SLI -> measures the system.\n  SLO -> sets internal targets.\n  SLA -> promises to customers.\n\nError Budget:\n  100% - SLO = Error budget.\n  99.9% SLO = 0.1% of requests can fail.\n  ~43 min downtime/month (for availability).\n  Budget spent -> freeze deployments.",
  },
  {
    topic: "Alerting Best Practices",
    front: "What makes a good alert?\n\nHow do you avoid alert fatigue?",
    back: "Good alert properties:\n1. Actionable: Someone must DO something.\n2. Relevant: Indicates real user impact.\n3. Timely: Fires before users notice.\n4. Contextualized: Includes runbook link,\n   affected service, dashboard link.\n\nAlert levels:\n  Page (wake someone up):\n    Service is DOWN or degraded.\n    SLO error budget nearly exhausted.\n\n  Ticket (fix during business hours):\n    Disk at 80%, slow degradation.\n\n  Notification (FYI):\n    Deploy completed, low-severity warning.\n\nAvoiding alert fatigue:\n- Never alert on metrics that don't\n  require action.\n- Use error budget-based alerts\n  (burn rate alerts).\n- Deduplicate and group alerts.\n- Auto-resolve when condition clears.\n- Review alerts quarterly: if never\n  acted on, delete it.\n- On-call rotation with clear escalation.\n\nBurn rate alert:\n  Alert when error budget consumption\n  rate predicts exhaustion within window.",
  },
  {
    topic: "ELK Stack",
    front: "What is the ELK Stack?\n\nWhat are its components?",
    back: "ELK = Elasticsearch + Logstash + Kibana.\n(Now called Elastic Stack with Beats.)\n\nElasticsearch:\n  Distributed search/analytics engine.\n  Stores and indexes log data.\n  Full-text search with Lucene.\n  Scales horizontally (shards/replicas).\n\nLogstash:\n  Data processing pipeline.\n  Input -> Filter -> Output.\n  Parses, transforms, enriches logs.\n  Plugins for many sources/destinations.\n\nKibana:\n  Visualization and exploration UI.\n  Dashboards, charts, maps.\n  KQL (Kibana Query Language).\n  Alerting and reporting.\n\nBeats (lightweight shippers):\n  Filebeat: Log files.\n  Metricbeat: System/service metrics.\n  Packetbeat: Network data.\n  Heartbeat: Uptime monitoring.\n\nModern alternative: Grafana Loki.\n  Log aggregation (like Prometheus for logs).\n  Labels instead of full-text indexing.\n  Much lower storage cost.\n  Pairs with Grafana for visualization.",
  },
  {
    topic: "OpenTelemetry",
    front: "What is OpenTelemetry (OTel)?\n\nWhy is it becoming the standard?",
    back: "OpenTelemetry: Vendor-neutral observability\nframework for generating, collecting,\nand exporting telemetry data.\n\nComponents:\n  API: Interfaces for instrumentation.\n  SDK: Implementation of the API.\n  Collector: Receives, processes, exports.\n  Instrumentation libraries: Auto-instrument\n  popular frameworks (Express, Flask, etc).\n\nSignals supported:\n  Traces (stable).\n  Metrics (stable).\n  Logs (maturing).\n\nWhy it matters:\n1. Vendor neutral: Switch backends\n   without changing instrumentation.\n2. Single standard: Replaces OpenTracing\n   + OpenCensus.\n3. Auto-instrumentation: Minimal code.\n4. CNCF project: Wide adoption.\n5. All major vendors support it.\n\nCollector pipeline:\n  Receivers -> Processors -> Exporters.\n  Example:\n    OTLP receiver -> batch processor ->\n    Jaeger exporter + Prometheus exporter.\n\nAdopt OTel early: instrument once,\nexport to any backend.",
  },
  {
    topic: "Incident Management",
    front: "What is a structured incident\nmanagement process?",
    back: "Incident lifecycle:\n\n1. Detection:\n   Alert fires or user reports.\n   Severity classification (P1-P4).\n   P1: Service down, major impact.\n   P4: Minor issue, no user impact.\n\n2. Response:\n   Incident commander assigned.\n   Communication channel opened.\n   Status page updated.\n   Stakeholders notified.\n\n3. Mitigation:\n   Restore service ASAP.\n   Rollback, failover, scale up.\n   Fix later, restore NOW.\n\n4. Resolution:\n   Root cause identified and fixed.\n   Monitoring confirms stable.\n\n5. Post-mortem (blameless):\n   Timeline of events.\n   Root cause analysis.\n   What went well.\n   What could improve.\n   Action items with owners.\n\nKey tools:\n  PagerDuty/OpsGenie: On-call + alerting.\n  Statuspage: Customer communication.\n  Slack/Teams: War room.\n  Jira/Linear: Track action items.\n\nMTTR (Mean Time To Recovery)\nis the metric that matters most.",
  },
  {
    topic: "Application Performance Monitoring",
    front: "What is APM and what does it\ntypically measure?",
    back: "APM (Application Performance Monitoring):\nEnd-to-end visibility into application\nhealth and performance.\n\nCore measurements:\n\nRED method (request-driven services):\n  Rate: Requests per second.\n  Errors: Failed requests per second.\n  Duration: Latency distribution.\n\nUSE method (infrastructure resources):\n  Utilization: % resource busy.\n  Saturation: Queue length/backlog.\n  Errors: Error count.\n\nFour Golden Signals (Google SRE):\n  Latency: Time to serve a request.\n  Traffic: Demand on the system.\n  Errors: Rate of failed requests.\n  Saturation: How full the system is.\n\nAPM tools:\n  Datadog APM, New Relic, Dynatrace.\n  Elastic APM, Grafana + Tempo.\n  AWS X-Ray, Azure App Insights.\n\nKey features:\n  Service maps (dependency visualization).\n  Transaction tracing.\n  Error tracking with stack traces.\n  Database query analysis.\n  Real user monitoring (RUM).",
  },
  {
    topic: "Chaos Engineering",
    front: "What is chaos engineering?\n\nHow does it improve reliability?",
    back: "Chaos Engineering: Deliberately injecting\nfailures to find weaknesses BEFORE\nthey cause outages.\n\nProcess:\n1. Define steady state (normal behavior).\n2. Hypothesize: 'System handles X failure.'\n3. Inject failure in production/staging.\n4. Observe: Did steady state hold?\n5. Fix weaknesses discovered.\n\nCommon experiments:\n- Kill random pods/instances.\n- Inject network latency.\n- Simulate AZ/region failure.\n- CPU/memory stress.\n- DNS failure.\n- Dependency unavailable.\n\nTools:\n  Chaos Monkey (Netflix): Kill instances.\n  Litmus Chaos (K8s native).\n  Gremlin: Enterprise chaos platform.\n  AWS FIS: Fault Injection Simulator.\n  Chaos Mesh: K8s chaos experiments.\n\nPrinciples:\n- Start small (non-production).\n- Minimize blast radius.\n- Have a kill switch.\n- Run during business hours initially.\n- Automate regular experiments.\n\nGameDays: Scheduled chaos sessions\nwith the whole team observing.",
  },
];

export const OBSERVABILITY_MONITORING: DeckInfo = {
  id: "observability-monitoring",
  title: "Observability & Monitoring",
  description:
    "The three pillars of observability, Prometheus, Grafana, distributed tracing, SLIs/SLOs, alerting, APM, and chaos engineering.",
  category: "DevOps",
  level: "intermediate",
  cards,
  tags: [
    "observability",
    "monitoring",
    "Prometheus",
    "Grafana",
    "tracing",
    "SRE",
  ],
  estimatedMinutes: 15,
};
