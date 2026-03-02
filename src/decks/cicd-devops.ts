import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "CI/CD Overview",
    front: "What is CI/CD?\n\nWhat are the key stages?",
    back: "CI (Continuous Integration):\n  Merge code frequently.\n  Automated build + test on every push.\n\nCD (Continuous Delivery):\n  Code always in deployable state.\n  Manual approval to production.\n\nCD (Continuous Deployment):\n  Auto-deploy every passing change.\n  No manual gates.\n\nPipeline stages:\n1. Source: Code push triggers pipeline.\n2. Build: Compile, bundle, containerize.\n3. Test: Unit, integration, e2e.\n4. Deploy: Staging then production.\n5. Monitor: Verify deployment health.\n\nTools: GitHub Actions, GitLab CI,\nJenkins, CircleCI, Azure DevOps.",
  },
  {
    topic: "GitHub Actions",
    front: "What are the key concepts in\nGitHub Actions?",
    back: "Workflow: YAML file in .github/workflows/\n  Triggered by events.\n\nEvent triggers:\n  push, pull_request, schedule,\n  workflow_dispatch (manual).\n\nJob: Group of steps. Runs on runner.\n  Jobs run in parallel by default.\n  Use needs: to create dependencies.\n\nStep: Individual task.\n  run: shell command\n  uses: reusable action\n\nRunner: VM that executes jobs.\n  ubuntu-latest, windows-latest,\n  macos-latest, or self-hosted.\n\nSecrets: Encrypted variables.\n  ${{ secrets.MY_SECRET }}\n\nArtifacts: Upload/download between jobs.\n\nMatrix strategy: Run across\n  multiple versions/OS combinations.",
  },
  {
    topic: "Infrastructure as Code",
    front:
      "What is Infrastructure as Code?\n\nCompare Terraform and CloudFormation.",
    back: "Define infrastructure in declarative\nfiles. Version controlled, repeatable.\n\nTerraform (HashiCorp):\n  + Multi-cloud (AWS, Azure, GCP)\n  + Large provider ecosystem\n  + State management (local/remote)\n  + Plan before apply\n  - HCL language (learning curve)\n  - State file management complexity\n\nCloudFormation (AWS):\n  + Native AWS integration\n  + No state file to manage\n  + Deep AWS feature support\n  - AWS only\n  - Verbose YAML/JSON\n  - Slow rollbacks\n\nOthers:\n- Pulumi: IaC in real languages\n  (Python, TypeScript, Go)\n- CDK: Generate CloudFormation\n  from TypeScript/Python\n- Bicep: Azure-specific, cleaner ARM",
  },
  {
    topic: "Terraform Basics",
    front: "What are the core Terraform\nconcepts and workflow?",
    back: "Core concepts:\n- Provider: Cloud/service plugin.\n- Resource: Infrastructure object.\n- Data source: Read existing infra.\n- Variable: Input parameters.\n- Output: Export values.\n- Module: Reusable resource group.\n- State: Tracks real-world resources.\n\nWorkflow:\n  terraform init    # Download providers\n  terraform plan    # Preview changes\n  terraform apply   # Create/update\n  terraform destroy # Delete everything\n\nState management:\n  Remote backend (S3, Azure Blob, GCS).\n  State locking to prevent conflicts.\n  Never edit state manually.\n\nBest practices:\n- Modules for reuse\n- Remote state\n- Workspaces for environments\n- CI/CD for terraform apply",
  },
  {
    topic: "GitOps",
    front: "What is GitOps?\n\nHow does it work?",
    back: "Git as single source of truth for\ninfra and application deployment.\n\nPrinciples:\n1. Declarative: Desired state in Git.\n2. Versioned: Git history = audit trail.\n3. Automated: Agent syncs Git -> cluster.\n4. Self-healing: Drift auto-corrected.\n\nWorkflow:\n  Developer -> PR -> Review -> Merge\n  -> Agent detects change\n  -> Applies to cluster\n\nTools:\n- ArgoCD: K8s-native GitOps.\n  UI, health checks, sync status.\n- Flux: CNCF GitOps toolkit.\n  Lightweight, composable.\n\nBenefits:\n  - Rollback = git revert\n  - Audit trail built in\n  - No kubectl apply in production\n  - Same process for all changes",
  },
  {
    topic: "Deployment Strategies",
    front: "Compare Blue/Green, Canary,\nand Rolling deployments.",
    back: "Blue/Green:\n  Two identical environments.\n  Blue = current, Green = new.\n  Switch traffic instantly.\n  + Instant rollback (switch back)\n  + Zero downtime\n  - Double infrastructure cost\n  - Database migrations tricky\n\nCanary:\n  Route small % (1-5%) to new version.\n  Monitor metrics. Gradually increase.\n  + Low risk, real production testing\n  + Quick rollback\n  - Complex routing setup\n  - Need good monitoring\n\nRolling:\n  Update instances one at a time.\n  + No extra infrastructure\n  + Simple to implement\n  - Mixed versions during rollout\n  - Slower rollback\n\nChoose based on risk tolerance,\ninfra cost, and rollback needs.",
  },
  {
    topic: "Monitoring and Observability",
    front: "What are the three pillars\nof observability?",
    back: "1. Logs:\n   Timestamped event records.\n   Structured (JSON) > unstructured.\n   Tools: ELK, Loki, CloudWatch.\n   Query: Find specific events.\n\n2. Metrics:\n   Numeric measurements over time.\n   Counter, gauge, histogram.\n   Tools: Prometheus + Grafana,\n   Datadog, CloudWatch.\n   Alert: Thresholds and anomalies.\n\n3. Traces:\n   Request journey across services.\n   Distributed tracing.\n   Tools: Jaeger, Zipkin, Tempo,\n   OpenTelemetry (standard).\n   Debug: Latency, bottlenecks.\n\nOpenTelemetry: Vendor-neutral standard\nfor all three. Instrument once,\nexport to any backend.",
  },
  {
    topic: "Cloud Service Models",
    front: "Compare IaaS, PaaS, SaaS,\nand FaaS (Serverless).",
    back: "IaaS (Infrastructure as a Service):\n  You manage: OS, runtime, app.\n  Provider: Hardware, networking.\n  Examples: EC2, Azure VMs, GCE.\n\nPaaS (Platform as a Service):\n  You manage: App code, data.\n  Provider: OS, runtime, scaling.\n  Examples: Heroku, App Engine,\n  Azure App Service, Elastic Beanstalk.\n\nFaaS (Function as a Service):\n  You manage: Function code.\n  Provider: Everything else.\n  Pay per invocation.\n  Examples: Lambda, Cloud Functions,\n  Azure Functions.\n\nSaaS (Software as a Service):\n  You manage: Configuration only.\n  Provider: Everything.\n  Examples: Gmail, Salesforce, Slack.\n\nTrend: Higher abstraction = less control\nbut faster development.",
  },
  {
    topic: "Secrets Management",
    front: "How should secrets be managed\nin cloud environments?",
    back: "Bad practices:\n  x Hardcoded in source code.\n  x Plain text in env vars.\n  x Committed to Git.\n  x Shared via Slack/email.\n\nGood practices:\n  HashiCorp Vault:\n    Dynamic secrets, rotation, leasing.\n    API-based access.\n  AWS Secrets Manager / SSM:\n    Automatic rotation, IAM-based.\n  Azure Key Vault:\n    Certificates, keys, secrets.\n  GCP Secret Manager:\n    Versioned, IAM-controlled.\n\nKubernetes:\n  K8s Secrets (base64, not encrypted!).\n  Better: External Secrets Operator\n  to sync from Vault/cloud.\n  Sealed Secrets for GitOps.\n\nBest: Rotate regularly, least-privilege\naccess, audit access logs.",
  },
  {
    topic: "Site Reliability Engineering",
    front: "What are SLI, SLO, SLA?\n\nHow do error budgets work?",
    back: "SLI (Service Level Indicator):\n  Measurable metric.\n  Examples: Latency p99, error rate,\n  availability, throughput.\n\nSLO (Service Level Objective):\n  Target for an SLI.\n  Example: 99.9% availability per month.\n  = 43.8 minutes downtime allowed.\n\nSLA (Service Level Agreement):\n  Contract with consequences.\n  SLO + penalties for violation\n  (credits, refunds).\n\nError Budget:\n  100% - SLO = error budget.\n  99.9% SLO -> 0.1% error budget.\n  = 43.8 minutes/month.\n\nWhen budget is spent:\n  Freeze feature releases.\n  Focus on reliability.\n\nWhen budget remains:\n  Ship features faster.\n  Take calculated risks.",
  },
];

export const CICD_DEVOPS: DeckInfo = {
  id: "cicd-devops",
  title: "CI/CD & DevOps Practices",
  description:
    "DevOps essentials: CI/CD pipelines, GitHub Actions, IaC (Terraform), GitOps, deployment strategies, observability, SRE, and secrets management.",
  category: "DevOps",
  level: "intermediate",
  cards,
  tags: ["CI/CD", "DevOps", "Terraform", "GitOps", "SRE", "observability"],
  estimatedMinutes: 15,
};
