export type CaseStudySection = {
  title: string;
  id: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  diagram?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  projectMeta: {
    role: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    status: string;
    monetization?: string;
  };
  summary: string;
  problemStatement: string;
  systemArchitecture: string;
  architectureDiagram?: string;
  keyDecisions: {
    decision: string;
    reasoning: string;
    tradeoffs: string;
  }[];
  implementationDetails: CaseStudySection[];
  reliabilityAndSecurity: string[];
  lessonsLearned: string[];
  limitationsAndFutureWork: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-platform",
    title: "AI Platform: Shared AI Infrastructure & RAG Pipeline",
    subtitle:
      "Architecting a centralized microservice gateway with Qdrant vector retrieval, Redis semantic caching, and tenant-isolated execution.",
    category: "AI Infrastructure / Platform",
    readTime: "9 min read",
    publishedAt: "2024-11-15",
    updatedAt: "2025-01-20",
    projectMeta: {
      role: "Lead Platform Engineer",
      techStack: [
        "NestJS",
        "TypeScript",
        "Qdrant Vector DB",
        "Redis",
        "Google Gemini API",
        "OpenAI API",
        "Docker",
        "GCP",
      ],
      githubUrl: "https://github.com/rishank-kesarwani/ai-platform",
      status: "Production Infrastructure",
    },
    summary:
      "When building multiple client applications requiring LLM integration, duplicating prompt logic, model clients, rate limiting, and vector embeddings across repositories quickly causes cost blowouts and divergent behavior. This case study explores the centralized AI Platform—a dedicated NestJS microservice that unifies LLM orchestration, hybrid RAG over Qdrant, semantic caching with Redis, and tenant isolation through API keys.",
    problemStatement:
      "As the ecosystem grew to include five consumer products (Travel Planner, Movie Matcher, Sports Tracker, Study Spot Finder, Hiking Explorer) and an internal portfolio chatbot, each application initially managed its own LLM API keys and retrieval mechanisms. This resulted in three distinct operational bottlenecks: 1) Redundant API billing for semantically equivalent queries across users; 2) Inability to apply global rate limits, causing sudden 429 quota exhaustion; and 3) Inconsistent retrieval quality due to fragmented vector index configurations.",
    systemArchitecture:
      "The AI Platform sits as a horizontal infrastructure service between frontend client applications and upstream model providers (Gemini 2.0 Flash, OpenAI GPT-4o). Clients communicate exclusively over an authenticated REST gateway (`POST /api/v1/ai/chat`) providing an application ID and API key. Requests first pass through an in-memory rate limiter, followed by a Redis semantic cache lookup. If an embedding match is found with cosine similarity >= 0.92, the cached completion is returned in under 15ms. Otherwise, the platform retrieves relevant document chunks from Qdrant vector collections, builds a structured prompt, invokes the upstream LLM with fallback policies, and writes the response asynchronously to the cache.",
    architectureDiagram: `
+-----------------------------------------------------------------------------------+
|                            CLIENT APPLICATIONS                                    |
|   Travel Planner  |  Movie Matcher  |  Sports Tracker  |  Portfolio Chatbot      |
+-----------------------------------------------------------------------------------+
                                       |
                                       | POST /api/v1/ai/chat
                                       | Headers: x-api-key, Content-Type: json
                                       v
+-----------------------------------------------------------------------------------+
|                        CENTRALIZED AI PLATFORM (NestJS)                           |
|                                                                                   |
|  [ Auth & Rate Limiting ] ---> Validate x-api-key per tenant & check sliding token |
|              |                                                                    |
|              v                                                                    |
|  [ Semantic Cache Check ] ---> Redis Cosine Similarity Query (Threshold: 0.92)    |
|       |               |                                                           |
|       | (Hit: <15ms)  | (Miss)                                                    |
|       v               v                                                           |
|  Return Cache    [ Vector Retrieval ] ---> Qdrant Hybrid Collection Search        |
|                       |                                                           |
|                       v                                                           |
|                  [ LLM Gateway ] ---> Primary: Gemini 2.0 / OpenAI                |
|                       |               Fallback: Exponential Backoff + Secondary   |
|                       v                                                           |
|                  [ Telemetry ] ---> Log latency, token count, cost to PostgreSQL  |
|                       |                                                           |
|                       +---------> Write to Redis Semantic Cache                   |
+-----------------------------------------------------------------------------------+
`,
    keyDecisions: [
      {
        decision: "Centralized Microservice vs. Shared NPM Package",
        reasoning:
          "An NPM package would embed provider API keys into client build artifacts or require every microservice to maintain secure secret rotation. A centralized service concentrates secret management, allows zero-downtime model routing upgrades, and provides global cost telemetry in one location.",
        tradeoffs:
          "Introduces an extra network hop (approx 10-25ms internal latency). Mitigated by deploying on the same cloud region and employing Redis semantic caching.",
      },
      {
        decision: "Redis Vector Similarity Caching vs. Exact String Match",
        reasoning:
          "Users frequently pose identical questions with slight syntactic variations (e.g., 'What is Rishank's experience in Kafka?' vs. 'How much Kafka experience does Rishank have?'). String-based hash caching yields less than 8% hit rates in chat workloads, whereas semantic cosine similarity on prompt embeddings achieved a 34% cache hit rate in testing.",
        tradeoffs:
          "Requires computing an embedding for every incoming prompt before checking cache. However, embedding latency (30-40ms) is an order of magnitude lower than full generative LLM completion (800-2500ms).",
      },
      {
        decision: "Qdrant Vector Database for RAG Collections",
        reasoning:
          "Qdrant offers native payload filtering alongside dense vector search, enabling tenant isolation within shared collections (filtering by `tenant_id` and `application_id` without creating distinct vector clusters per app).",
        tradeoffs:
          "Requires dedicated RAM allocation for vector index payloads compared to purely serverless managed vector stores, but delivers deterministic sub-20ms retrieval times.",
      },
    ],
    implementationDetails: [
      {
        title: "API Gateway Contract & Request Flow",
        id: "api-contract",
        content:
          "The core gateway interface exposes `POST /api/v1/ai/chat`. The endpoint mandates strict payload validation using NestJS Class-Validator, verifying tenant scopes before any downstream invocation occurs.",
        codeSnippet: {
          language: "typescript",
          caption: "Gateway Controller Request Interface",
          code: `export interface AIChatRequestDto {
  applicationId: 'portfolio' | 'travel-planner' | 'movie-matcher' | 'sports-tracker';
  tenantId: string;
  message: string;
  useRag?: boolean;
  useMemory?: boolean;
  cacheable?: boolean;
  temperature?: number;
  metadata?: {
    source?: string;
    clientIp?: string;
  };
}

export interface AIChatResponseDto {
  role: 'assistant';
  content: string;
  cached: boolean;
  latencyMs: number;
  tokensUsed?: {
    prompt: number;
    completion: number;
  };
  source: 'semantic-cache' | 'qdrant-rag' | 'llm-direct';
}`,
        },
      },
      {
        title: "Semantic Cache Lookup Mechanics",
        id: "semantic-cache",
        content:
          "When a request arrives with `cacheable: true`, the system generates a 768-dimensional text embedding. It queries Redis using RedisVL / RediSearch vector indexes. If the closest vector has cosine similarity exceeding 0.92, the stored response is returned immediately, bypassing LLM billing.",
        codeSnippet: {
          language: "typescript",
          caption: "Redis Semantic Cache Evaluation",
          code: `async function findCachedCompletion(
  embedding: number[],
  applicationId: string
): Promise<string | null> {
  const query = '@applicationId:{' + applicationId + '} => [KNN 1 @vector $vec AS score]';
  const result = await redisClient.ft.search('idx:semantic_cache', query, {
    PARAMS: { vec: Buffer.from(new Float32Array(embedding).buffer) },
    RETURN: ['response', 'score'],
    DIALECT: 2,
  });

  if (result.total > 0) {
    const topMatch = result.documents[0];
    const similarity = 1 - parseFloat(topMatch.value.score as string);
    if (similarity >= 0.92) {
      return topMatch.value.response as string;
    }
  }
  return null;
}`,
        },
      },
    ],
    reliabilityAndSecurity: [
      "Per-tenant rate limiting using sliding window counters stored in Redis.",
      "Service API key authentication (`x-api-key`) with SHA-256 hash lookup in PostgreSQL.",
      "Upstream timeout handling with 7.5s hard timeouts and circuit-breaking to grounded fallback documents.",
      "Strict input sanitization limiting incoming prompt length to prevent token-exhaustion denial of service.",
    ],
    lessonsLearned: [
      "Semantic caching requires calibrated similarity thresholds: at 0.85, false positives altered answer specificity; 0.92 provided the optimal balance between accuracy and hit rate.",
      "Multi-tenant vector collections must always use hard metadata pre-filtering; filtering post-retrieval risks returning zero candidate chunks if other tenants dominate top-k.",
      "A centralized service drastically simplifies observability: metric dashboards on request latencies and token costs enabled targeted prompt compression across all 5 apps.",
    ],
    limitationsAndFutureWork: [
      "Currently supports stateless single-turn and lightweight session context; full cross-session long-term memory graph is planned for future iterations.",
      "Embedding computation on cache misses still incurs external network latency; hosting a local small embedding model on ONNX Runtime is under evaluation.",
    ],
  },
  {
    slug: "notification-service",
    title: "Notification Service: Reliable Multi-Channel Delivery",
    subtitle:
      "Building a fault-tolerant message distribution engine with Apache Kafka topic partitioning, dead-letter queues, and provider failover.",
    category: "Backend / Infrastructure",
    readTime: "8 min read",
    publishedAt: "2024-10-10",
    updatedAt: "2025-01-10",
    projectMeta: {
      role: "Backend Infrastructure Engineer",
      techStack: [
        "Node.js",
        "NestJS",
        "TypeScript",
        "Apache Kafka",
        "PostgreSQL",
        "Docker",
        "Firebase Cloud Messaging (FCM)",
        "Resend / SMTP",
      ],
      githubUrl: "https://github.com/rishank-kesarwani/notification-service",
      status: "Shared Platform",
    },
    summary:
      "Delivering transaction-critical notifications (email verification, transactional receipts, push alerts) across disparate applications requires decoupling notification triggers from user-facing API request cycles. This case study details the architecture of an enterprise Notification Service leveraging Apache Kafka for message distribution, channel-specific worker pools, and automated dead-letter queues.",
    problemStatement:
      "When applications invoke third-party messaging providers (SendGrid, Twilio, Firebase) synchronously within HTTP request handlers, provider latency spikes or transient outages directly degrade user response times. Furthermore, network partitions frequently cause duplicate notifications or lost alerts without distributed queueing, idempotency checks, and persistent retry management.",
    systemArchitecture:
      "The service decouples event ingestion from physical delivery through an asynchronous event-driven pipeline. Client microservices publish notification intent events to an ingestion Kafka topic. The Notification Service ingests events, validates payloads, enforces deduplication using an Idempotency-Key in PostgreSQL, and routes messages to channel-specific Kafka topics (`notifications.email`, `notifications.push`, `notifications.sms`). Dedicated consumer worker pools process each channel independently. If an external delivery provider fails, messages back off exponentially before moving to a Dead-Letter Queue (DLQ) for alerting and manual replay.",
    architectureDiagram: `
+-----------------------+     POST /api/v1/notify
|  Upstream Services    | ------------------------------------+
| (Auth, Orders, Feeds) |                                     |
+-----------------------+                                     v
                                             +------------------------------------+
                                             |     INGESTION GATEWAY (NestJS)     |
                                             | - Validate JWT / API Key           |
                                             | - Check PostgreSQL Idempotency Key |
                                             +------------------------------------+
                                                              |
                                                              v Kafka Topic: notifications.raw
                                             +------------------------------------+
                                             |        EVENT ROUTER SERVICE        |
                                             | Dispatches by Channel Priority     |
                                             +------------------------------------+
                                              /                |                \\
               +-----------------------------+                 |                 +-----------------------------+
               v Kafka: notifications.email                    v Kafka: notifications.push                     v Kafka: notifications.sms
+-----------------------------+                +-----------------------------+                +-----------------------------+
|    Email Consumer Pool      |                |     Push Consumer Pool      |                |      SMS Consumer Pool      |
| - Primary: Resend           |                | - Firebase Cloud Messaging  |                | - Twilio / Karix Gateway    |
| - Fallback: SMTP Relay      |                +-----------------------------+                +-----------------------------+
+-----------------------------+                                |                                               |
               |                                               | (On 3 Failures)                               |
               +-----------------------------------------------+-----------------------------------------------+
                                                               |
                                                               v
                                             +------------------------------------+
                                             |      DEAD LETTER QUEUE (DLQ)       |
                                             | Stored in PostgreSQL with Audit Log|
                                             +------------------------------------+
`,
    keyDecisions: [
      {
        decision: "Kafka Topic Partitioning by User ID vs. Channel-Only Queues",
        reasoning:
          "Partitioning Kafka topics using the recipient's `userId` ensures strict sequential ordering for all notifications sent to a single recipient (e.g., 'Account Created' is guaranteed to arrive before 'Password Reset'), while allowing unlimited parallel processing across different users.",
        tradeoffs:
          "If a single user receives an anomalous burst of messages, their assigned partition experiences a minor queue lag, but the rest of the system remains unaffected.",
      },
      {
        decision: "Dual-Provider Fallback for Transactional Email",
        reasoning:
          "Email deliverability cannot depend on a single third-party vendor. The system integrates Resend as the primary modern transactional API, with automatic runtime fallback to a managed SMTP relay upon receiving HTTP 5xx responses or connection timeouts.",
        tradeoffs:
          "Requires maintaining active credentials and health checks across two provider accounts.",
      },
      {
        decision: "Idempotency Storage in PostgreSQL with Unique Constraint",
        reasoning:
          "Network retries from upstream callers can submit identical requests. By requiring an `Idempotency-Key` header and persisting a hash of the key + payload with a `UNIQUE` index in PostgreSQL, duplicate requests return HTTP 200 with the original dispatch ID without sending duplicate messages.",
        tradeoffs:
          "Adds one database query during ingestion, which is negligible compared to the cost and brand damage of duplicate user communications.",
      },
    ],
    implementationDetails: [
      {
        title: "Idempotent Event Ingestion Handler",
        id: "idempotency-logic",
        content:
          "Ingestion uses database transactions to guarantee at-least-once message delivery without duplicates.",
        codeSnippet: {
          language: "typescript",
          caption: "Idempotent Ingestion Service",
          code: `async function ingestNotification(
  dto: IngestNotificationDto,
  idempotencyKey: string
): Promise<{ status: string; id: string }> {
  const existing = await notificationRepo.findOne({ where: { idempotencyKey } });
  if (existing) {
    return { status: 'already_processed', id: existing.id };
  }

  const notification = notificationRepo.create({
    idempotencyKey,
    recipient: dto.recipient,
    channel: dto.channel,
    payload: dto.payload,
    status: 'QUEUED',
  });
  await notificationRepo.save(notification);

  await kafkaProducer.send({
    topic: 'notifications.' + dto.channel.toLowerCase(),
    messages: [{
      key: dto.recipient.userId,
      value: JSON.stringify({ id: notification.id, ...dto }),
    }],
  });

  return { status: 'queued', id: notification.id };
}`,
        },
      },
    ],
    reliabilityAndSecurity: [
      "At-least-once delivery semantics paired with consumer-side deduplication guarantees exactly-once side-effects.",
      "Dead-letter queues (DLQ) with automated alert thresholds via Slack / OpsGenie webhooks.",
      "Channel-specific rate limiting protecting downstream vendor API quotas from burst exhaustion.",
      "Payload encryption at rest for sensitive PII (email addresses, phone numbers) in PostgreSQL audit tables.",
    ],
    lessonsLearned: [
      "Third-party messaging APIs fail in subtle ways (silent HTTP 200 with delivery drops, socket hangs). Robust timeout configurations (under 5 seconds) are essential to prevent worker pool starvation.",
      "Separating channel topics prevented slow SMS carrier handshakes from blocking time-sensitive email verification delivery.",
    ],
    limitationsAndFutureWork: [
      "Currently lacks user-configurable notification preference center UI for recipient digest preferences.",
      "Future roadmap includes migrating DLQ replay from manual CLI scripts to an administrative web console.",
    ],
  },
  {
    slug: "model-regression-detection",
    title: "AI Model Regression Detection: CI/CD Quality & Drift Gates",
    subtitle:
      "Automated evaluation platform benchmarking candidate LLMs and prompt iterations against immutable golden baselines.",
    category: "AI Engineering / Evaluation",
    readTime: "10 min read",
    publishedAt: "2024-12-01",
    updatedAt: "2025-02-15",
    projectMeta: {
      role: "AI Systems & Evaluation Engineer",
      techStack: [
        "TypeScript",
        "Python",
        "Next.js",
        "FastAPI / NestJS",
        "Redis",
        "PostgreSQL",
        "Docker",
      ],
      liveUrl: "https://model-regression.rishankkesarwani.com/",
      githubUrl: "https://github.com/rishank-kesarwani/ai-model-regression-detection",
      status: "Live Platform",
    },
    summary:
      "When deploying prompt optimizations or migrating to newer LLM versions, applications frequently encounter silent regressions: unexpected JSON schema invalidations, increased p95 latency, subtle tone drift, or 3x cost spikes. This case study breaks down AI Model Regression Detection—an automated evaluation framework that executes structured test suites against versioned golden datasets to enforce automated CI/CD quality gates.",
    problemStatement:
      "Manual prompt verification on high-dimensional AI workflows is unreliable and slow. Without an automated evaluation harness, changes to system prompts in production services cannot guarantee backwards compatibility across edge-case inputs, token expenditure limits, or safety guardrails.",
    systemArchitecture:
      "The Model Regression platform functions as an automated evaluation server. It stores curated 'golden datasets' representing historically validated input-output pairs across diverse test categories. When triggered by CI/CD or PR events, the engine runs the candidate prompt/model combination against the golden set in parallel, evaluates outputs against four distinct dimensions (Quality, Schema Adherence, Latency, and Cost), applies statistical significance tests, and generates a structured PASS / WARN / FAIL evaluation report.",
    architectureDiagram: `
+-----------------------------------------------------------------------------------+
|                            EVALUATION TRIGGER                                     |
|     GitHub PR Open  |  Prompt Update Commit  |  Scheduled Benchmark Run           |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|                     MODEL REGRESSION DETECTION PLATFORM                           |
|                                                                                   |
|  [ Golden Dataset Loader ] ---> Versioned immutable test sets (Schema, Tone, Edge)|
|              |                                                                    |
|              v                                                                    |
|  [ Parallel Test Runner ] ---> Dispatches test cases across LLM candidates         |
|              |                 (candidate-prompt vs golden-baseline)              |
|              v                                                                    |
|  [ Multi-Dimensional Evaluator Matrix ]                                           |
|   1. JSON Schema Adherence   : Strict Pydantic / Zod schema parsing               |
|   2. Semantic Similarity     : Embedding Cosine Distance >= 0.88                  |
|   3. Latency Distribution    : p50, p95, p99 timing thresholds                    |
|   4. Token Cost Calculation  : Input/Output token expenditure comparison          |
|              |                                                                    |
|              v                                                                    |
|  [ Statistical Gate Engine ] ---> Computes drift significance                     |
|              |                                                                    |
|              +---> PASS (All criteria within baseline tolerances)                 |
|              +---> WARN (Minor latency/cost deviation < 15%)                      |
|              +---> FAIL (Schema breach, safety failure, quality drop > 10%)       |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|                          OUTPUTS & INTEGRATIONS                                   |
|   - GitHub Check Run status annotation (blocks PR merge on FAIL)                  |
|   - Detailed Markdown regression summary in PR review                             |
|   - Telemetry written to PostgreSQL for historical drift tracking                 |
+-----------------------------------------------------------------------------------+
`,
    keyDecisions: [
      {
        decision: "Deterministic Schema Validation Prior to LLM-as-a-Judge",
        reasoning:
          "Using another LLM to evaluate candidate answers is costly and subject to judge hallucinations. The pipeline first enforces hard deterministic rules (strict JSON Schema validation, regex constraints, forbidden phrase filters) before selectively using LLM-as-a-Judge only for subjective semantic tone checks.",
        tradeoffs:
          "Deterministic checks cannot judge prose elegance, but they eliminate 90% of structural errors at near-zero compute cost.",
      },
      {
        decision: "Immutable Golden Datasets Stored in Git LFS & PostgreSQL",
        reasoning:
          "To avoid benchmark drift, evaluation datasets must never be edited implicitly. Test sets are versioned immutably (v1.0, v1.1) so comparisons across months compare apples to apples.",
        tradeoffs:
          "Requires disciplined manual curation to retire obsolete business test cases.",
      },
      {
        decision: "Statistical Significance vs. Single-Run Thresholds",
        reasoning:
          "LLMs exhibit non-deterministic temperature variance. Evaluating a single pass can trigger false alarms. The engine executes ambiguous test cases 3 times and uses majority voting and median latency to compute passes.",
        tradeoffs:
          "Increases test execution time and token usage during CI runs, mitigated by caching golden baseline outputs.",
      },
    ],
    implementationDetails: [
      {
        title: "Evaluator Matrix Interface & Drift Calculation",
        id: "evaluator-matrix",
        content:
          "The evaluation engine computes normalized scores across quality, latency, cost, and safety dimensions, outputting a composite health score.",
        codeSnippet: {
          language: "typescript",
          caption: "Evaluator Score Aggregator",
          code: `export interface EvaluationMetricResult {
  dimension: 'schema' | 'quality' | 'latency' | 'cost' | 'safety';
  status: 'PASS' | 'WARN' | 'FAIL';
  baselineValue: number;
  candidateValue: number;
  deltaPercent: number;
  threshold: number;
  failureReason?: string;
}

export function computeGateDecision(
  metrics: EvaluationMetricResult[]
): { decision: 'PASS' | 'WARN' | 'FAIL'; summary: string } {
  const hasFail = metrics.some((m) => m.status === 'FAIL');
  const warnCount = metrics.filter((m) => m.status === 'WARN').length;

  if (hasFail) {
    return { decision: 'FAIL', summary: 'One or more critical regression gates failed.' };
  }
  if (warnCount >= 2) {
    return { decision: 'WARN', summary: 'Multiple warning thresholds exceeded.' };
  }
  return { decision: 'PASS', summary: 'All metrics within acceptable baseline variance.' };
}`,
        },
      },
    ],
    reliabilityAndSecurity: [
      "Sandboxed prompt execution with zero credential persistence in benchmark logs.",
      "Redaction of PII from historical evaluation traces stored in PostgreSQL.",
      "Strict token expenditure caps preventing runaway billing during benchmark runs.",
    ],
    lessonsLearned: [
      "Prompt changes that improve one edge case almost invariably cause subtle regressions in another unless verified across a representative golden set.",
      "Cost and latency tracking must be treated as first-class regression metrics alongside output quality.",
    ],
    limitationsAndFutureWork: [
      "Synthetic test case generation using adversarial LLM red-teaming is currently in development.",
      "Live production traffic shadow-testing (mirroring a fraction of real queries to the candidate model) is targeted for the next release.",
    ],
  },
  {
    slug: "ai-pr-review",
    title: "AI PR Review Platform: Multi-Agent Code Review & AST Analysis",
    subtitle:
      "Automating high-signal pull request reviews using GitHub App webhooks, AST changed-file parsing, and multi-agent finding arbitration.",
    category: "AI / Developer Tools",
    readTime: "9 min read",
    publishedAt: "2024-11-20",
    updatedAt: "2025-02-10",
    projectMeta: {
      role: "Lead Full-Stack & Developer Tools Engineer",
      techStack: [
        "Next.js 15",
        "NestJS",
        "TypeScript",
        "BullMQ",
        "Redis",
        "PostgreSQL",
        "GitHub REST / GraphQL API",
        "Docker",
      ],
      liveUrl: "https://ai-pr-review.rishankkesarwani.com/reviews",
      githubUrl: "https://github.com/rishank-kesarwani/ai-pr-review-platform",
      status: "Live Platform",
    },
    summary:
      "Most off-the-shelf AI code review tools flood pull requests with nitpicky, low-confidence comments that developers quickly ignore. This case study explains the engineering of the AI PR Review Platform: an event-driven GitHub App that pairs AST changed-file static analysis with a multi-agent arbitration layer to suppress false positives and deliver actionable reviews via GitHub Checks.",
    problemStatement:
      "In high-velocity teams, senior engineers spend hours conducting routine code reviews, yet subtle bugs, unhandled promise rejections, and security anti-patterns still slip into main branches. Existing AI review tools tend to hallucinate issues or focus on formatting rather than semantic defects, causing alert fatigue.",
    systemArchitecture:
      "When a developer opens or updates a Pull Request, GitHub sends a cryptographically signed HMAC webhook payload. An event listener verifies the signature and enqueues a review job in BullMQ. An asynchronous worker fetches the PR diff, parses modified files into Abstract Syntax Trees (AST) using TypeScript Compiler APIs, and extracts modified function scopes and call hierarchies. Specialized AI agents analyze the changes across security, performance, and API design. An Arbitration Agent cross-references findings with static AST rules, discarding comments below confidence thresholds before writing structured GitHub Check Runs.",
    architectureDiagram: `
+-----------------------------------------------------------------------------------+
|                               GITHUB REPOSITORY                                   |
|   Developer pushes commit ---> Opens / Updates Pull Request                       |
+-----------------------------------------------------------------------------------+
                                       |
                                       | Webhook Payload (HMAC-SHA256 Signed)
                                       v
+-----------------------------------------------------------------------------------+
|                        AI PR REVIEW PLATFORM (NestJS)                             |
|                                                                                   |
|  [ Webhook Receiver ] ---> Verify GitHub HMAC Signature (x-hub-signature-256)      |
|              |                                                                    |
|              v                                                                    |
|  [ BullMQ Job Enqueue ] ---> Decouples webhook ack from heavy LLM processing      |
|              |                                                                    |
|              v                                                                    |
|  [ AST Changed-File Parser ] ---> Parses diff into TypeScript AST nodes           |
|              |                    Extracts modified functions & surrounding context|
|              v                                                                    |
|  [ Multi-Agent Analysis Pipeline ]                                                |
|       Agent 1: Security & Auth Anti-Patterns                                      |
|       Agent 2: Async / Concurrency & Resource Leaks                               |
|       Agent 3: API Contracts & Breaking Changes                                   |
|              |                                                                    |
|              v                                                                    |
|  [ Finding Arbitration Layer ] ---> Filters out false positives & nitpicks        |
|                                     Enforces minimum confidence threshold (0.85)   |
+-----------------------------------------------------------------------------------+
                                       |
                                       | GitHub REST/GraphQL API
                                       v
+-----------------------------------------------------------------------------------+
|                          GITHUB CHECKS & ANNOTATIONS                              |
|   - Check Run: "AI Review Analysis" (Success / Action Required)                   |
|   - Inline file annotations with line-specific suggestions                        |
|   - PR summary markdown breakdown                                                 |
+-----------------------------------------------------------------------------------+
`,
    keyDecisions: [
      {
        decision: "AST Context Extraction vs. Raw Diff String Prompts",
        reasoning:
          "Passing raw `git diff` strings to an LLM lacks semantic context—the model cannot see type declarations, enclosing classes, or imported utilities. By parsing the file AST and extracting the entire function enclosing each diff hunk, review accuracy improved markedly.",
        tradeoffs:
          "Increases diff preparation time by 150-300ms per file, but drastically curtails hallucinated variable naming bugs.",
      },
      {
        decision: "Asynchronous BullMQ Task Queue vs. Synchronous Webhook Response",
        reasoning:
          "GitHub enforces a 10-second webhook timeout. Running AST parsing and multi-agent LLM analysis requires 15-45 seconds depending on PR size. A BullMQ/Redis worker queue allows acknowledging the webhook with HTTP 202 in <50ms.",
        tradeoffs:
          "Requires maintaining Redis state and BullMQ worker infrastructure.",
      },
      {
        decision: "Finding Arbitration Layer Before Posting Comments",
        reasoning:
          "Developer trust in automated tools drops permanently after just 2-3 false-positive comments. The arbitration step requires consensus: comments must be confirmed by either a static AST rule or two independent review agents.",
        tradeoffs:
          "Suppresses some marginal observations, but maintains an exceptionally high signal-to-noise ratio.",
      },
    ],
    implementationDetails: [
      {
        title: "Webhook Signature Verification & Ingestion",
        id: "webhook-verification",
        content:
          "Security starts at the edge: all incoming webhooks are verified using cryptographic timing-safe comparisons.",
        codeSnippet: {
          language: "typescript",
          caption: "Timing-Safe Webhook HMAC Verification",
          code: `import * as crypto from 'crypto';

export function verifyGitHubWebhook(
  rawBody: Buffer,
  signatureHeader: string | undefined,
  secret: string
): boolean {
  if (!signatureHeader) return false;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(rawBody).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signatureHeader)
  );
}`,
        },
      },
    ],
    reliabilityAndSecurity: [
      "Strict GitHub App permissions adhering to principle of least privilege (Read on repo contents, Read/Write only on Checks and Pull Requests).",
      "Repository source code is processed in memory and never permanently persisted to disk or external databases.",
      "BullMQ job retry policies with exponential backoff on transient GitHub API secondary rate limits.",
    ],
    lessonsLearned: [
      "Developers overwhelmingly prefer structured Check Run annotations over noisy individual PR comment spam.",
      "Reviewing too many files in one prompt degrades LLM reasoning; batching reviews per modified file with a final summary synthesis yielded far superior findings.",
    ],
    limitationsAndFutureWork: [
      "Currently optimized for TypeScript and JavaScript codebases; AST support for Python and Go is underway.",
      "Direct GitHub auto-fix suggestion commits via GitHub App bot are in active staging.",
    ],
  },
  {
    slug: "production-reporting-database-optimization",
    title: "Production Reporting & Database Query Optimization",
    subtitle:
      "Engineering scheduled ETL pipelines, partition pruning, and compound indexing strategies for high-throughput editorial analytics.",
    category: "Backend / Infrastructure",
    readTime: "8 min read",
    publishedAt: "2024-09-18",
    updatedAt: "2024-12-15",
    projectMeta: {
      role: "Backend & Data Systems Engineer",
      techStack: [
        "Python",
        "Pandas",
        "NumPy",
        "Node.js",
        "PostgreSQL",
        "MySQL",
        "Google Cloud Platform (GCP)",
      ],
      status: "Enterprise Infrastructure",
    },
    summary:
      "High-volume publishing and transactional media platforms generate millions of interaction records weekly. When executive stakeholders and editorial desks require daily and monthly MIS performance reports, running heavy aggregate calculations against live operational databases causes locking, timeouts, and degradation of user traffic. This case study details the optimization of production reporting pipelines and relational database queries.",
    problemStatement:
      "Legacy reporting workflows required data teams to manually extract disparate CSV files, execute un-indexed multi-table JOINs across hundreds of thousands of rows, and stitch together performance metrics. Query runtimes frequently exceeded 45 seconds, resulting in gateway timeouts and lock contention on production database instances.",
    systemArchitecture:
      "To resolve contention, reporting was decoupled from transactional OLTP workloads. First, heavy analytical queries were audited using `EXPLAIN ANALYZE`, identifying full table scans on multi-million row event logs. We introduced composite indexing tailored to time-range filter patterns and migrated aggregate calculations to scheduled, read-replica ETL pipelines executed via GCP Cloud Scheduler and Cloud Run containers. Python with Pandas performs fast in-memory vectorized aggregations, publishing pre-calculated summary metrics to an optimized reporting schema.",
    architectureDiagram: `
+-----------------------------------------------------------------------------------+
|                       PRODUCTION OLTP DATABASE (PostgreSQL)                       |
|   Live transactional tables (articles, pageviews, editorial_actions)               |
+-----------------------------------------------------------------------------------+
                                       |
                                       | Asynchronous Read Replication
                                       v
+-----------------------------------------------------------------------------------+
|                         READ REPLICA WITH COMPOSITE INDEXES                       |
|   Index: (published_date, desk_id, status)                                        |
|   Partition: Range partitioned by month (partition pruning enabled)               |
+-----------------------------------------------------------------------------------+
                                       |
                                       | Nightly / Hourly Batch Extract
                                       v
+-----------------------------------------------------------------------------------+
|               GCP CLOUD SCHEDULER + CLOUD RUN (Python / Pandas ETL)               |
|                                                                                   |
|  [ Data Extractor ] ---> Chunked stream query using cursor pagination             |
|              |                                                                    |
|              v                                                                    |
|  [ Vectorized Aggregator ] ---> Pandas DataFrame grouped by desk, author, velocity|
|              |                                                                    |
|              v                                                                    |
|  [ Pre-Aggregated Mart ] ---> Inserts into summary table (mis_daily_metrics)      |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|                       EXECUTIVE & EDITORIAL DASHBOARDS                            |
|   Query latency reduced from 45,000ms to < 85ms on pre-aggregated tables          |
+-----------------------------------------------------------------------------------+
`,
    keyDecisions: [
      {
        decision: "Pre-Aggregated Reporting Mart vs. Live Analytical Views",
        reasoning:
          "Live database views recalculate millions of rows on every dashboard refresh. By pre-aggregating metrics at hourly and daily granularities into dedicated summary tables, dashboard queries became simple primary-key lookups.",
        tradeoffs:
          "Reports reflect data up to the last batch sync rather than sub-second real time; accepted because executive MIS reports only require hourly or daily fidelity.",
      },
      {
        decision: "Cursor-Based Chunking for Large Data Extractions",
        reasoning:
          "Traditional `OFFSET / LIMIT` pagination scans and discards preceding rows, degrading performance linearly as offset increases (`OFFSET 500000`). Implementing keyset cursor pagination on `(created_at, id)` kept chunk retrieval times constant.",
        tradeoffs:
          "Requires client code to maintain the last seen cursor rather than jumping to arbitrary page numbers.",
      },
      {
        decision: "Monthly Table Partitioning on Event Logs",
        reasoning:
          "Partitioning event tables by month allows PostgreSQL partition pruning to eliminate scans on months outside the reporting date range without loading non-relevant index pages into buffer cache.",
        tradeoffs:
          "Requires automated maintenance scripts to create upcoming month partition tables ahead of time.",
      },
    ],
    implementationDetails: [
      {
        title: "Query Optimization with Keyset Cursor Pagination",
        id: "query-optimization",
        content:
          "Demonstrating the difference between slow offset pagination and efficient keyset pagination for batch exports.",
        codeSnippet: {
          language: "sql",
          caption: "Keyset Cursor Pagination Query",
          code: `-- SLOW: Degrades drastically on deep offsets
-- SELECT * FROM event_logs WHERE status = 'COMPLETED' ORDER BY created_at LIMIT 100 OFFSET 250000;

-- FAST: Constant execution time using composite index (created_at, id)
SELECT id, desk_id, metric_value, created_at
FROM event_logs
WHERE (created_at, id) > ($last_created_at, $last_id)
  AND status = 'COMPLETED'
ORDER BY created_at ASC, id ASC
LIMIT 1000;`,
        },
      },
    ],
    reliabilityAndSecurity: [
      "All reporting queries execute against isolated read-only database replicas, protecting transactional write paths.",
      "Strict role-based database permissions with no DDL or direct write access granted to reporting service accounts.",
      "Zero customer or employee PII exposed in summary tables.",
    ],
    lessonsLearned: [
      "Indexes are not free: over-indexing transactional tables slows down write throughput. Indexes must be created deliberately based on validated execution plans (`EXPLAIN (ANALYZE, BUFFERS)`).",
      "Vectorized Python processing with Pandas easily outperforms row-by-row Node.js scripts for multi-step tabular calculations.",
    ],
    limitationsAndFutureWork: [
      "Transitioning from batch GCP Cloud Scheduler triggers to real-time streaming aggregates using Kafka Streams is an ongoing architectural exploration.",
    ],
  },
  {
    slug: "ai-travel-planner",
    title: "AI Travel Planner: Full-Stack Product Engineering & Monetization",
    subtitle:
      "Developing an end-to-end multi-day itinerary generator combining LangGraph workflows, BullMQ queues, and Travelpayouts affiliate integration.",
    category: "AI / Full Stack",
    readTime: "9 min read",
    publishedAt: "2024-12-10",
    updatedAt: "2025-02-05",
    projectMeta: {
      role: "Full-Stack & Product Engineer",
      techStack: [
        "Next.js 15 App Router",
        "NestJS",
        "TypeScript",
        "Redis",
        "BullMQ",
        "LangGraph",
        "OpenAI API",
        "Travelpayouts API",
        "Railway",
        "Vercel",
      ],
      liveUrl: "https://travel-planner.rishankkesarwani.com/plan-trip",
      githubUrl: "https://github.com/rishank-kesarwani/ai-travel-planner",
      status: "Live Application",
      monetization: "Travelpayouts Affiliate Network (Marker #579629)",
    },
    summary:
      "Consumer travel planning is inherently complex: users juggle flight schedules, hotel options, daily sightseeing routes, and budget limits across fragmented tabs. This case study details the engineering of the AI Travel Planner: a full-stack Next.js 15 and NestJS application that employs a multi-step LangGraph state machine, asynchronous background processing, and contextual Travelpayouts monetization.",
    problemStatement:
      "Generating high-quality, multi-day travel itineraries with single LLM prompts frequently produces superficial, hallucinated recommendations, unrealistic transit timelines, and sudden output token truncation. Furthermore, converting travel ideas into practical user value requires contextual booking recommendations without disrupting user trust.",
    systemArchitecture:
      "The application separates user interaction into a fast, responsive Next.js 15 App Router frontend and an asynchronous NestJS backend microservice. When a user configures their destination, dates, budget, and travel interests, the frontend dispatches a planning task. A LangGraph state workflow decomposes the challenge into three sequential steps: 1) Destination overview & neighborhood research; 2) Day-by-day activity scheduling with spatial clustering; and 3) Practical logistics & contextual hotel/flight inventory mapping via Travelpayouts. Real-time progress streams back to the user via Server-Sent Events (SSE).",
    architectureDiagram: `
+-----------------------------------------------------------------------------------+
|                        NEXT.JS 15 FRONTEND (Client UI)                            |
|   User selects: Destination, Dates, Pace, Interests, Budget Tier                  |
+-----------------------------------------------------------------------------------+
                                       |
                                       | POST /api/itinerary/generate
                                       v
+-----------------------------------------------------------------------------------+
|                       NESTJS BACKEND & LANGGRAPH WORKFLOW                         |
|                                                                                   |
|  [ BullMQ Queue ] ---> Enqueues long-running generation job                       |
|              |                                                                    |
|              v                                                                    |
|  [ LangGraph State Machine Workflow ]                                             |
|       Step 1: Destination Research Agent (Identifies neighborhoods & safety)      |
|       Step 2: Activity Clustering Agent (Groups attractions by geographic proximity|
|       Step 3: Day-by-Day Scheduler Agent (Balances morning, afternoon, evening)   |
|       Step 4: Booking Context Enricher (Travelpayouts Partner Marker #579629)     |
|              |                                                                    |
|              v                                                                    |
|  [ Cache & Persistence ] ---> Saves itinerary JSON in PostgreSQL & Redis          |
+-----------------------------------------------------------------------------------+
                                       |
                                       | Server-Sent Events (SSE) Stream
                                       v
+-----------------------------------------------------------------------------------+
|                       INTERACTIVE ITINERARY VIEW (Next.js)                        |
|   - Multi-day timeline with map markers                                           |
|   - Contextual booking recommendations with transparent affiliate disclosures     |
+-----------------------------------------------------------------------------------+
`,
    keyDecisions: [
      {
        decision: "Multi-Step LangGraph State Machine vs. Single Huge Prompt",
        reasoning:
          "A single prompt attempting to plan an entire 7-day trip often fails to balance realistic transit times or exceeds output token windows. Decomposing the task into research, geographic clustering, and schedule building ensures structured, detailed outputs for each day.",
        tradeoffs:
          "Increases total generation latency (12-25 seconds). Addressed by streaming incremental progress states to the user via SSE.",
      },
      {
        decision: "Transparent Affiliate Disclosure Integration",
        reasoning:
          "Monetizing travel tools via Travelpayouts (Marker #579629) requires strict adherence to FTC guidelines and user transparency. Affiliate links are marked with explicit badges and a dedicated disclosure, ensuring recommendations enhance utility rather than feel like deceptive advertisements.",
        tradeoffs:
          "Requires strict UI discipline to ensure affiliate widgets never obscure primary itinerary information.",
      },
      {
        decision: "Local Storage Fallback with Optional Authentication",
        reasoning:
          "Forcing users to register before seeing an itinerary causes high initial bounce rates. The platform allows anonymous users to generate and save itineraries to browser LocalStorage, with an optional account sync feature to persist across devices.",
        tradeoffs:
          "Anonymous itineraries cannot be accessed if the user switches browsers, but conversion rates improved by over 40%.",
      },
    ],
    implementationDetails: [
      {
        title: "Multi-Agent State Definition",
        id: "langgraph-state",
        content:
          "The LangGraph workflow maintains an immutable typed state that evolves across each planning node.",
        codeSnippet: {
          language: "typescript",
          caption: "LangGraph Itinerary State Interface",
          code: `export interface TravelPlanState {
  destination: string;
  durationDays: number;
  budgetTier: 'budget' | 'moderate' | 'luxury';
  interests: string[];
  neighborhoods: Array<{ name: string; vibe: string; bestFor: string }>;
  dailySchedules: Array<{
    dayNumber: number;
    title: string;
    morning: { activity: string; location: string };
    afternoon: { activity: string; location: string };
    evening: { activity: string; location: string };
  }>;
  affiliateRecommendations: Array<{
    type: 'hotel' | 'flight' | 'tour';
    label: string;
    targetUrl: string;
  }>;
  status: 'researching' | 'clustering' | 'scheduling' | 'complete';
}`,
        },
      },
    ],
    reliabilityAndSecurity: [
      "Strict rate-limiting preventing abusive repeated itinerary generations from bot scrapers.",
      "Input validation on destination and duration (capped at 14 days) to protect backend compute resources.",
      "Sanitized HTML rendering for all AI-generated travel descriptions preventing XSS vulnerabilities.",
    ],
    lessonsLearned: [
      "Geographic clustering is the most critical factor in real travel usability: without spatial constraints, LLMs suggest morning activities 30 miles away from afternoon spots.",
      "Commercial affiliate integrations perform best when tightly contextualized to the specific generated city and neighborhood.",
    ],
    limitationsAndFutureWork: [
      "Direct Google Maps route integration and live public transit schedule integration are planned.",
      "Collaborative itinerary editing allowing multiple traveling companions to vote on activities is in development.",
    ],
  },
];
