import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "AWS Core Services",
    front:
      "Name the core AWS services\nfor compute, storage, and database.\n\nWhat is each used for?",
    back: "Compute:\n- EC2: Virtual servers (IaaS).\n- Lambda: Serverless functions (FaaS).\n- ECS/EKS: Container orchestration.\n- Fargate: Serverless containers.\n\nStorage:\n- S3: Object storage (unlimited).\n- EBS: Block storage for EC2.\n- EFS: Managed NFS file system.\n- Glacier: Long-term archival.\n\nDatabase:\n- RDS: Managed SQL (Postgres, MySQL).\n- DynamoDB: Key-value/document (NoSQL).\n- ElastiCache: Redis/Memcached.\n- Redshift: Data warehouse.\n\nNetworking:\n- VPC: Virtual private network.\n- Route 53: DNS.\n- CloudFront: CDN.\n- ALB/NLB: Load balancers.",
  },
  {
    topic: "AWS Lambda",
    front: "What is AWS Lambda?\n\nWhat are its limits and pricing?",
    back: "Serverless compute service.\nRun code without provisioning servers.\n\nTriggers: API Gateway, S3, SQS,\nDynamoDB Streams, CloudWatch Events.\n\nLimits:\n- Timeout: Max 15 minutes.\n- Memory: 128 MB to 10 GB.\n- Package: 50 MB zipped, 250 MB unzipped.\n- Concurrency: 1000 default (adjustable).\n- /tmp storage: 512 MB to 10 GB.\n\nPricing:\n  Per request: $0.20 per 1M requests.\n  Per duration: $0.0000166667 per GB-second.\n  Free tier: 1M requests + 400K GB-sec/month.\n\nCold start: First invocation slower.\n  Fix: Provisioned concurrency, SnapStart.\n\nBest for: Event-driven, short tasks,\nAPI backends, data processing.",
  },
  {
    topic: "AWS S3",
    front: "What are S3 storage classes?\n\nWhen do you use each?",
    back: "Standard:\n  Frequent access. 99.99% availability.\n  Use: Active data, websites.\n\nStandard-IA (Infrequent Access):\n  Lower storage cost, retrieval fee.\n  Use: Backups, older data.\n\nOne Zone-IA:\n  Single AZ. Cheaper than Standard-IA.\n  Use: Reproducible, non-critical data.\n\nGlacier Instant Retrieval:\n  Lowest cost, millisecond retrieval.\n  Use: Quarterly access archives.\n\nGlacier Flexible Retrieval:\n  Minutes to hours retrieval.\n  Use: Annual archives.\n\nGlacier Deep Archive:\n  Cheapest. 12-48 hour retrieval.\n  Use: Compliance, 7+ year retention.\n\nIntelligent-Tiering:\n  Auto-moves objects between tiers.\n  Use: Unknown/changing access patterns.",
  },
  {
    topic: "AWS DynamoDB",
    front: "What is DynamoDB?\n\nWhat are its key design concepts?",
    back: "Fully managed NoSQL key-value and\ndocument database.\n\nKey concepts:\n- Table: Collection of items.\n- Primary key:\n  Partition key (hash): Required.\n  Sort key (range): Optional.\n- Item: Single record (max 400 KB).\n\nCapacity modes:\n- On-demand: Pay per request. Auto-scales.\n- Provisioned: Set RCU/WCU. Cheaper\n  for predictable workloads.\n\nFeatures:\n- Single-digit ms latency at any scale.\n- Global tables (multi-region).\n- DynamoDB Streams (change events).\n- TTL: Auto-delete expired items.\n- DAX: In-memory cache layer.\n\nDesign pattern: Single-table design.\n  Denormalize related data into one table.\n  Access patterns drive schema (not ER).",
  },
  {
    topic: "AWS VPC Networking",
    front: "What is a VPC?\n\nWhat are its key components?",
    back: "Virtual Private Cloud: Isolated\nvirtual network in AWS.\n\nComponents:\n- Subnets: Subdivide VPC CIDR.\n  Public: Has route to Internet Gateway.\n  Private: No direct internet access.\n\n- Internet Gateway (IGW):\n  Connects VPC to internet.\n\n- NAT Gateway:\n  Lets private subnets access internet\n  (outbound only).\n\n- Route Tables:\n  Rules for traffic routing.\n\n- Security Groups:\n  Stateful firewall for instances.\n  Allow rules only (no deny).\n\n- NACLs:\n  Stateless firewall for subnets.\n  Allow and deny rules.\n\nTypical: 3 AZs, each with public +\nprivate subnet. ALB in public,\napp in private, DB in private.",
  },
  {
    topic: "AWS IAM",
    front: "What is AWS IAM?\n\nWhat is the principle of least privilege?",
    back: "Identity and Access Management.\nControls who can do what in AWS.\n\nEntities:\n- Users: Human identities.\n- Groups: Collection of users.\n- Roles: Assumed by services/apps.\n  (Preferred over user credentials.)\n\nPolicies: JSON documents defining\npermissions.\n  {\n    Effect: Allow/Deny,\n    Action: s3:GetObject,\n    Resource: arn:aws:s3:::mybucket/*\n  }\n\nLeast Privilege:\n  Grant minimum permissions needed.\n  Start with zero, add as required.\n  Regularly review and prune.\n\nBest practices:\n- Use roles, not long-term credentials.\n- Enable MFA on all accounts.\n- Use conditions in policies.\n- Service control policies (SCPs)\n  for organization-wide guardrails.",
  },
  {
    topic: "Cloud Architecture Patterns",
    front: "Name 4 cloud architecture patterns\nand when to use each.",
    back: "1. Microservices:\n   Small, independent services.\n   Own database, API-based comm.\n   Use: Complex domains, team autonomy.\n   Trade-off: Operational complexity.\n\n2. Event-Driven:\n   Services communicate via events.\n   SQS, SNS, EventBridge, Kafka.\n   Use: Async workflows, decoupling.\n   Trade-off: Eventual consistency.\n\n3. Serverless:\n   Lambda + API GW + DynamoDB.\n   Use: Bursty workloads, rapid dev.\n   Trade-off: Cold starts, vendor lock-in.\n\n4. CQRS + Event Sourcing:\n   Separate read/write models.\n   Events as source of truth.\n   Use: Complex domains, audit trails.\n   Trade-off: Complexity, eventual\n   consistency between models.",
  },
  {
    topic: "Multi-Region Architecture",
    front: "How do you design a multi-region\ncloud application?",
    back: "Patterns:\n1. Active-Passive:\n   Primary region handles traffic.\n   Secondary on standby for failover.\n   RTO: Minutes. RPO: Depends on replication.\n\n2. Active-Active:\n   Both regions serve traffic.\n   Route53 / Global Accelerator routing.\n   RTO: ~0. RPO: ~0 (sync replication).\n\nData replication:\n- DynamoDB Global Tables (multi-region)\n- Aurora Global Database (< 1s replication)\n- S3 Cross-Region Replication\n\nChallenges:\n- Data consistency across regions.\n- Network latency for sync replication.\n- Cost (2x infrastructure minimum).\n- Conflict resolution for writes.\n\nDNS: Route53 health checks +\nfailover/latency routing policies.\n\nTest: Chaos engineering, game days.",
  },
  {
    topic: "Cloud Cost Optimization",
    front: "Name 5 cloud cost optimization\nstrategies.",
    back: "1. Right-sizing:\n   Match instance size to actual usage.\n   Use monitoring data to identify waste.\n   Often 30-40% savings.\n\n2. Reserved Instances / Savings Plans:\n   Commit 1-3 years for 30-70% discount.\n   Good for steady-state workloads.\n\n3. Spot Instances:\n   Use spare capacity at 60-90% discount.\n   Can be interrupted. Good for:\n   batch jobs, CI/CD, stateless workers.\n\n4. Auto-scaling:\n   Scale down during low traffic.\n   Schedule-based or metric-based.\n\n5. Storage lifecycle:\n   Move infrequent data to cheaper tiers.\n   Delete unused snapshots/AMIs.\n   S3 lifecycle policies.\n\nBonus:\n- Graviton ARM instances (20% cheaper)\n- Serverless for variable workloads\n- Tag everything for cost allocation",
  },
  {
    topic: "Cloud Security Best Practices",
    front: "Name 5 cloud security\nbest practices.",
    back: "1. Identity:\n   Use SSO/federation.\n   MFA everywhere.\n   IAM roles over credentials.\n   Least privilege.\n\n2. Network:\n   Private subnets for backends.\n   Security groups (allow-list).\n   VPN/PrivateLink for internal comm.\n   WAF for web applications.\n\n3. Data:\n   Encrypt at rest (KMS).\n   Encrypt in transit (TLS).\n   Bucket policies, no public access.\n\n4. Monitoring:\n   CloudTrail for API audit logs.\n   GuardDuty for threat detection.\n   Config for compliance rules.\n   Alerting on suspicious activity.\n\n5. Incident response:\n   Automated remediation (Lambda).\n   Runbooks for common scenarios.\n   Regular penetration testing.\n   IR plan and practice.",
  },
];

export const CLOUD_FUNDAMENTALS: DeckInfo = {
  id: "cloud-fundamentals",
  title: "Cloud Computing (AWS Focus)",
  description:
    "Cloud computing concepts with AWS focus: core services, Lambda, S3, DynamoDB, VPC, IAM, architecture patterns, multi-region, cost optimization.",
  category: "Cloud",
  level: "intermediate",
  cards,
  tags: ["AWS", "cloud", "Lambda", "S3", "DynamoDB", "VPC", "IAM"],
  estimatedMinutes: 15,
};
