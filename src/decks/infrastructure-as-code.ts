import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "IaC Overview",
    front: "What is Infrastructure as Code (IaC)?\n\nWhy is it important?",
    back: "Infrastructure as Code (IaC):\nManaging and provisioning infrastructure\nthrough machine-readable config files\ninstead of manual processes.\n\nBenefits:\n- Version controlled (Git history).\n- Reproducible environments.\n- Self-documenting infrastructure.\n- Peer review via PRs.\n- Automated testing.\n- Drift detection.\n- Disaster recovery (re-create from code).\n\nDeclarative vs Imperative:\n  Declarative: Define desired state.\n    Tools: Terraform, CloudFormation, Pulumi.\n    'I want 3 servers with 4GB RAM.'\n\n  Imperative: Define steps to reach state.\n    Tools: Ansible, shell scripts.\n    'Create server A, then server B...'",
  },
  {
    topic: "Terraform Fundamentals",
    front:
      "What are the core Terraform concepts?\n\nProviders, resources, state, modules.",
    back: "Provider: Plugin for a cloud/service.\n  provider 'aws' { region = 'us-east-1' }\n\nResource: Infrastructure component.\n  resource 'aws_instance' 'web' {\n    ami = 'ami-123'\n    instance_type = 't3.micro'\n  }\n\nState: Terraform tracks what exists.\n  terraform.tfstate (JSON).\n  Remote state: S3, Azure Blob, GCS.\n  State locking prevents conflicts.\n\nModules: Reusable groups of resources.\n  module 'vpc' {\n    source = './modules/vpc'\n    cidr   = '10.0.0.0/16'\n  }\n\nWorkflow:\n  terraform init   -> Download providers.\n  terraform plan   -> Preview changes.\n  terraform apply  -> Execute changes.\n  terraform destroy -> Remove all.",
  },
  {
    topic: "Terraform State Management",
    front:
      "Why is Terraform state important?\n\nWhat are best practices for\nmanaging state?",
    back: "State tracks resource -> real world mapping.\nWithout state, Terraform cannot know\nwhat exists or what to change.\n\nBest practices:\n1. Remote backend (never local in teams).\n   S3 + DynamoDB for locking (AWS).\n   Azure Blob + lease locking.\n\n2. State locking: Prevent concurrent\n   modifications.\n\n3. Workspaces: Separate state per env.\n   terraform workspace new staging\n\n4. State encryption at rest.\n\n5. Never manually edit state.\n   Use: terraform state mv/rm/import.\n\n6. Minimize blast radius:\n   Split into smaller state files.\n   Networking, compute, data separate.\n\n7. terraform plan before every apply.\n\nDanger: Deleting state = Terraform\nforgets all resources (they still exist\nbut become unmanaged).",
  },
  {
    topic: "Ansible",
    front: "What is Ansible and how does it\ndiffer from Terraform?",
    back: "Ansible: Agentless configuration\nmanagement and automation tool.\n\nKey differences from Terraform:\n  Ansible: Imperative (tasks in order).\n  Terraform: Declarative (desired state).\n\n  Ansible: Config management (software).\n  Terraform: Infrastructure provisioning.\n\n  Ansible: Agentless (SSH/WinRM).\n  Terraform: API-based.\n\nAnsible concepts:\n  Inventory: List of target hosts.\n  Playbook: YAML file with tasks.\n  Role: Reusable set of tasks.\n  Module: Unit of work (apt, copy, etc).\n  Fact: System info gathered at start.\n\nExample playbook:\n  - hosts: webservers\n    tasks:\n      - name: Install nginx\n        apt: name=nginx state=present\n      - name: Start nginx\n        service: name=nginx state=started\n\nBest used together:\n  Terraform provisions infra.\n  Ansible configures software on it.",
  },
  {
    topic: "CloudFormation & CDK",
    front: "What are AWS CloudFormation and\nthe AWS CDK?",
    back: "CloudFormation (CFN):\n  AWS-native IaC in JSON/YAML.\n  Templates define stacks of resources.\n  Automatic rollback on failure.\n  Drift detection built-in.\n  Change sets preview modifications.\n\nAWS CDK (Cloud Development Kit):\n  Write IaC in TypeScript, Python, etc.\n  Synthesizes to CloudFormation.\n  + Real programming constructs.\n  + Type safety and IDE support.\n  + Reusable constructs (components).\n  + L1 (raw CFN), L2 (opinionated),\n    L3 (patterns) construct levels.\n\nExample CDK (TypeScript):\n  const bucket = new s3.Bucket(this,\n    'MyBucket', {\n    versioned: true,\n    encryption: BucketEncryption.S3_MANAGED\n  });\n\nCDK vs Terraform:\n  CDK: AWS-only, real code, strong types.\n  Terraform: Multi-cloud, HCL, huge\n  ecosystem of providers.",
  },
  {
    topic: "Pulumi",
    front: "What is Pulumi and how does it\ncompare to Terraform and CDK?",
    back: "Pulumi: IaC using general-purpose\nlanguages (TypeScript, Python, Go, C#).\n\nKey features:\n- Real programming languages (loops,\n  conditionals, functions).\n- Multi-cloud (AWS, Azure, GCP, K8s).\n- State managed by Pulumi Cloud or\n  self-hosted backends.\n- Policy as Code (CrossGuard).\n- Native testing with language tools.\n\nvs Terraform:\n  + Real language vs HCL.\n  + Better abstraction/reuse.\n  - Smaller community.\n  - Less mature providers.\n\nvs CDK:\n  + Multi-cloud (not AWS-only).\n  + Direct deployment (no CFN layer).\n  - Fewer AWS-specific constructs.\n\nExample (TypeScript):\n  const bucket = new aws.s3.Bucket(\n    'my-bucket',\n    { acl: 'private' }\n  );\n  export const name = bucket.id;",
  },
  {
    topic: "GitOps for Infrastructure",
    front: "What is GitOps and how does it\napply to infrastructure?",
    back: "GitOps: Git as single source of truth\nfor declarative infrastructure.\n\nPrinciples:\n1. Declarative: Desired state in Git.\n2. Versioned: Git history = audit trail.\n3. Automated: Changes auto-applied.\n4. Self-healing: Drift auto-corrected.\n\nWorkflow:\n  Developer -> PR with infra changes\n  -> Review & approve\n  -> Merge to main\n  -> Operator detects change\n  -> Applies to cluster/cloud\n  -> Reconciliation loop\n\nTools:\n  ArgoCD: K8s GitOps controller.\n    Watches Git repo, syncs to cluster.\n  Flux: CNCF GitOps toolkit.\n    Controllers for sources, Helm, etc.\n  Atlantis: Terraform pull request\n    automation (plan on PR, apply on merge).\n\nBenefits:\n- No manual kubectl/terraform apply.\n- Complete audit trail.\n- Easy rollback (git revert).\n- Consistent environments.",
  },
  {
    topic: "IaC Testing",
    front: "How do you test Infrastructure\nas Code?",
    back: "Levels of IaC testing:\n\n1. Static Analysis (fastest):\n   terraform validate - syntax check.\n   tflint - linting rules.\n   checkov - security scanning.\n   tfsec - security best practices.\n\n2. Unit Tests:\n   Test module logic without deploying.\n   Terraform: terratest (Go).\n   CDK: cdk assertions library.\n   Pulumi: native language tests.\n\n3. Integration Tests:\n   Deploy to ephemeral environment.\n   Verify resources created correctly.\n   Run smoke tests.\n   Destroy environment.\n\n4. Policy Tests:\n   OPA/Rego policies.\n   Sentinel (Terraform Cloud).\n   CrossGuard (Pulumi).\n   'No public S3 buckets.'\n\n5. Drift Detection:\n   Compare actual vs declared state.\n   terraform plan (detect drift).\n   AWS Config rules.\n\nPipeline:\n  PR -> lint + validate + policy\n  -> plan -> review -> apply -> verify.",
  },
  {
    topic: "Secrets in IaC",
    front: "How should secrets be managed\nin IaC workflows?",
    back: "NEVER store secrets in:\n- Terraform state (plaintext).\n- Git repositories.\n- Environment variables in CI logs.\n\nSecret management solutions:\n\n1. Vault (HashiCorp):\n   Dynamic secrets, lease-based.\n   terraform + vault provider.\n\n2. Cloud Secret Managers:\n   AWS Secrets Manager / SSM Parameter.\n   Azure Key Vault.\n   GCP Secret Manager.\n\n3. SOPS (Mozilla):\n   Encrypt files in Git.\n   Decrypt at deploy time.\n   KMS/PGP key encryption.\n\n4. External Secrets Operator (K8s):\n   Syncs cloud secrets to K8s secrets.\n\nBest practices:\n- Encrypt state backend at rest.\n- Use data sources to fetch secrets\n  at plan/apply time.\n- Rotate secrets automatically.\n- Audit secret access.\n- Mark sensitive outputs:\n  output 'db_pass' {\n    value     = var.db_pass\n    sensitive = true\n  }",
  },
  {
    topic: "IaC Anti-Patterns",
    front: "What are common IaC anti-patterns\nto avoid?",
    back: "1. ClickOps: Manual console changes.\n   Fix: All changes through code + PR.\n\n2. Snowflake environments:\n   Environments drift apart.\n   Fix: Same modules, different vars.\n\n3. Monolithic state:\n   One state file for everything.\n   Fix: Split by service/layer.\n\n4. Hardcoded values:\n   Fix: Use variables, data sources,\n   and dynamic lookups.\n\n5. No remote state:\n   Local state = no collaboration.\n   Fix: Remote backend + locking.\n\n6. Ignoring plan output:\n   Fix: Always review plan before apply.\n\n7. No tagging strategy:\n   Fix: Required tags (env, team, cost).\n\n8. Copy-paste modules:\n   Fix: Shared module registry.\n\n9. Skipping destroy/cleanup:\n   Fix: Automated cleanup for dev/test.\n\n10. No documentation:\n   Fix: README per module, examples,\n   architecture diagrams.",
  },
];

export const INFRASTRUCTURE_AS_CODE: DeckInfo = {
  id: "infrastructure-as-code",
  title: "Infrastructure as Code",
  description:
    "IaC tools and practices: Terraform, Ansible, CloudFormation, Pulumi, GitOps, testing, and secrets management.",
  category: "DevOps",
  level: "intermediate",
  cards,
  tags: ["IaC", "Terraform", "Ansible", "CloudFormation", "Pulumi", "GitOps"],
  estimatedMinutes: 15,
};
