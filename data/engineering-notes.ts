export type EngineeringNote = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  summary: string;
  problemContext: string;
  coreConcepts: {
    title: string;
    description: string;
    codeSnippet?: {
      language: string;
      code: string;
      caption?: string;
    };
  }[];
  architectureDiagram?: string;
  tradeoffsAndPitfalls: string[];
  productionChecklist: string[];
};

export const engineeringNotes: EngineeringNote[] = [
  {
    slug: "designing-retryable-background-jobs",
    title: "Designing Retryable Background Jobs Without Duplicate Side Effects",
    subtitle:
      "How to build idempotent distributed tasks using BullMQ, Kafka, and PostgreSQL without double-charging or duplicate notifications.",
    category: "Distributed Systems & Queues",
    readTime: "7 min read",
    publishedAt: "2024-11-05",
    updatedAt: "2025-01-15",
    tags: ["BullMQ", "Kafka", "Idempotency", "Redis", "PostgreSQL", "Distributed Systems"],
    summary:
      "In distributed architectures, transient network failures and process crashes are inevitable. When background workers fail mid-execution and queues redeliver the job, naive retry logic can cause catastrophic duplicate side effects—such as duplicate customer emails or repeated payment charges. This note outlines architectural patterns for building strictly idempotent background jobs.",
    problemContext:
      "Most message brokers (Kafka, RabbitMQ, BullMQ/Redis) offer 'at-least-once' delivery guarantees under network partitions. This means a job will never be lost, but it may be delivered to a worker more than once. If your worker code is not designed to be idempotent, retrying a job that partially completed can trigger duplicate database inserts, duplicate downstream API calls, or corrupted state.",
    coreConcepts: [
      {
        title: "Deterministic Idempotency Keys at Job Creation",
        description:
          "Every background job must be assigned an immutable, deterministic idempotency key derived from the originating business event (e.g., checkout_evt_98234_email or pr_eval_#142_sha7c91). Never rely on arbitrary auto-incrementing queue IDs.",
        codeSnippet: {
          language: "typescript",
          caption: "BullMQ Job Creation with Custom Deduplication ID",
          code: `import { Queue } from 'bullmq';

const notificationQueue = new Queue('notifications', { connection: redisOptions });

export async function enqueueNotification(
  userId: string,
  eventId: string,
  channel: 'email' | 'push'
) {
  // Deterministic job ID guarantees BullMQ will ignore duplicate enqueue attempts
  // within the active/waiting job window
  const jobId = 'notify:' + userId + ':' + eventId + ':' + channel;

  await notificationQueue.add(
    'send_alert',
    { userId, eventId, channel, timestamp: Date.now() },
    {
      jobId, // Native deduplication in BullMQ
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 2000, // 2s, 4s, 8s, 16s...
      },
      removeOnComplete: { age: 3600 * 24 }, // retain for 24h audit
    }
  );
}`,
        },
      },
      {
        title: "Atomic State Reservation with PostgreSQL UNIQUE Indexes",
        description:
          "Before executing any non-reversible external side-effect (e.g., calling an SMS gateway or sending an email), the worker must record its intent in a persistent relational store with a UNIQUE constraint. If another worker attempts to process the same key concurrently, the database rejects the duplicate transaction.",
        codeSnippet: {
          language: "sql",
          caption: "Idempotent Transactional Outbox Table",
          code: `CREATE TABLE processed_job_records (
    idempotency_key VARCHAR(128) PRIMARY KEY,
    job_type VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL, -- 'PROCESSING', 'COMPLETED', 'FAILED'
    result_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- In worker code:
-- INSERT INTO processed_job_records (idempotency_key, job_type, status)
-- VALUES ($1, $2, 'PROCESSING')
-- ON CONFLICT (idempotency_key) DO NOTHING;
-- If rows_affected == 0, another worker already owns this job!`,
        },
      },
      {
        title: "Handling Partial Failures and Downstream Retries",
        description:
          "If the external provider returns a 500 error or times out, the worker must throw a specific retryable exception. BullMQ's exponential backoff handles scheduling the retry. However, if the external service does not support idempotency keys natively, you must query their status API before retrying to verify whether the previous attempt actually took effect.",
      },
    ],
    architectureDiagram: `
[ Job Enqueued ] ---> Idempotency Key: "notify:u12:order99:email"
       |
       v
[ Worker Picks Job ]
       |
       v
[ PostgreSQL Check ] ---> INSERT INTO processed_jobs (key, 'PROCESSING')
       |                    ON CONFLICT DO NOTHING;
       |
       +---> Conflict? ---> [ SKIP & ACK: Job already processed ]
       |
       +---> Success!  ---> [ Call External Provider (Resend / Twilio) ]
                                   |
                     +-------------+-------------+
                     |                           |
                (Success 200)             (Network Timeout 504)
                     v                           v
         [ UPDATE: 'COMPLETED' ]     [ Throw RetryableError ]
                     |                           |
            [ BullMQ Job Done ]         [ BullMQ Exponential Backoff ]
`,
    tradeoffsAndPitfalls: [
      "Pitfall: Releasing idempotency locks on error. If you delete the idempotency key on failure, a race condition can cause two concurrent retry workers to run simultaneously. Keep the record and update status to 'RETRY_PENDING' instead.",
      "Pitfall: In-memory only locks. Redis SET NX locks can be lost if the Redis node crashes or experiences a replica failover. For high-value operations, persist the lock key in PostgreSQL.",
      "Trade-off: Deduplication key retention. Storing idempotency keys forever increases table size. Implement a partitioning or rolling cleanup policy (e.g., retaining keys for 7 to 30 days based on business retry windows).",
    ],
    productionChecklist: [
      "Derive idempotency keys deterministically from source business entity IDs.",
      "Configure exponential backoff with jitter on all queue retry policies.",
      "Store idempotency reservations in a relational store with UNIQUE constraints before calling external APIs.",
      "Send permanent failures (4xx client errors) to a Dead Letter Queue (DLQ) immediately rather than retrying indefinitely.",
      "Ensure all downstream provider calls pass client request idempotency headers where supported.",
    ],
  },
  {
    slug: "evaluating-llm-changes-regression-gates",
    title: "Evaluating LLM Changes With Immutable Golden Datasets & Regression Gates",
    subtitle:
      "Why 'eyeballing' prompt changes fails in production, and how to automate regression evaluation in CI/CD pipelines.",
    category: "AI Engineering & Evaluation",
    readTime: "8 min read",
    publishedAt: "2024-11-28",
    updatedAt: "2025-02-01",
    tags: ["LLM Evaluation", "CI/CD", "Prompt Engineering", "Testing", "Python", "TypeScript"],
    summary:
      "When updating system prompts or switching to smaller, cheaper LLMs, developers frequently test 2 or 3 sample prompts locally and assume the change is safe. In production, this causes subtle regressions: JSON schema validation errors, edge-case safety failures, and latency spikes. This note covers how to design immutable golden test datasets and automated CI gates.",
    problemContext:
      "Unlike traditional software where unit tests verify deterministic functions, LLMs produce non-deterministic completions with probabilistic variance. Modifying a system prompt to fix one formatting quirk often degrades performance on another unseen edge case. Without an automated regression pipeline, model updates carry high risk.",
    coreConcepts: [
      {
        title: "Curating Versioned Golden Datasets",
        description:
          "A golden dataset is an immutable collection of curated inputs paired with strict validation criteria. Include three distinct input buckets: 1) Happy-path representative user queries; 2) Adversarial and edge-case queries (malformed JSON, injection attempts, extreme lengths); and 3) Historical production bugs.",
        codeSnippet: {
          language: "json",
          caption: "Sample Golden Test Case Schema",
          code: `{
  "id": "tc_travel_budget_edge_04",
  "version": "1.2.0",
  "input": {
    "destination": "Kyoto, Japan",
    "days": 4,
    "budget": "strict_budget_50_usd_per_day"
  },
  "expectedCriteria": {
    "requiredJsonKeys": ["neighborhoods", "dailySchedules", "estimatedCostUsd"],
    "costUpperLimit": 200,
    "forbiddenWords": ["luxury", "five-star", "michelin-star"],
    "maxLatencyMs": 3500,
    "maxPromptTokens": 800
  }
}`,
        },
      },
      {
        title: "Deterministic Checks vs. LLM-as-a-Judge",
        description:
          "Evaluate candidate model outputs in a two-stage filter: first execute free, deterministic code checks (Zod / Pydantic schema validation, regex matching, numerical range checks). Only pass surviving candidates to an LLM-as-a-Judge for semantic tone and nuance evaluation. This keeps benchmark costs low and results reproducible.",
        codeSnippet: {
          language: "typescript",
          caption: "Multi-Tier Automated Test Evaluation",
          code: `export async function evaluateCandidateOutput(
  output: string,
  testCase: TestCase
): Promise<EvaluationResult> {
  // Stage 1: Deterministic Schema Validation
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(output);
  } catch {
    return { passed: false, stage: 'schema', reason: 'Output is not valid JSON' };
  }

  const schemaValidation = MyOutputSchema.safeParse(parsedJson);
  if (!schemaValidation.success) {
    return {
      passed: false,
      stage: 'schema',
      reason: schemaValidation.error.issues.map(i => i.message).join('; ')
    };
  }

  // Stage 2: Business Rule Constraints
  if (parsedJson.estimatedCostUsd > testCase.expectedCriteria.costUpperLimit) {
    return { passed: false, stage: 'constraints', reason: 'Budget limit exceeded' };
  }

  return { passed: true, stage: 'complete' };
}`,
        },
      },
      {
        title: "Establishing Statistical CI Regression Gates",
        description:
          "Because temperature causes slight variations across runs, single-test assertions can generate false failures. Run candidate benchmarks with temperature=0.0 for deterministic baseline tests, and enforce aggregate thresholds in CI (e.g., Schema Adherence must be 100%, Semantic Accuracy >= 95%, p95 Latency must not increase by > 15%).",
      },
    ],
    tradeoffsAndPitfalls: [
      "Pitfall: Benchmarking against live dynamic third-party APIs. Always mock external tool calls (weather, search) during LLM evaluation runs so failures reflect model changes, not third-party downtime.",
      "Pitfall: Contaminated evaluation data. Ensure test prompts reflect real end-user phrasing, not artificial prompts written by the engineer who wrote the prompt.",
      "Trade-off: Evaluation execution time in CI. Running 200 test cases sequentially takes minutes. Use worker pools with concurrency limits to run evaluations in parallel within 30-45 seconds.",
    ],
    productionChecklist: [
      "Store golden datasets in version control immutably (bump version tag on changes).",
      "Run deterministic schema validation prior to running any LLM judges.",
      "Track latency and token expenditure as first-class regression dimensions.",
      "Mock all external tool integrations for reproducible evaluations.",
      "Block CI pull request merges automatically if schema adherence drops below 100%.",
    ],
  },
  {
    slug: "tenant-aware-authorization-ai-microservices",
    title: "Implementing Tenant-Aware Authorization & Rate Limiting in AI Microservices",
    subtitle:
      "Securing shared LLM gateways with API key scoping, sliding window token buckets, and vector collection multi-tenancy.",
    category: "Security & Cloud Architecture",
    readTime: "7 min read",
    publishedAt: "2024-12-12",
    updatedAt: "2025-01-22",
    tags: ["Security", "API Design", "Rate Limiting", "Qdrant", "Redis", "NestJS"],
    summary:
      "When multiple consumer applications share a centralized AI gateway, you cannot treat all callers as a single trusted client. Without strict tenant scoping, one misconfigured app can exhaust shared LLM quotas, leak vector embeddings to unauthorized users, or inflate infrastructure bills. This note details tenant-aware security for AI backends.",
    problemContext:
      "Shared backend services often fall into the trap of using a single global API key for upstream LLM calls. If client app 'A' deploys a runaway loop, client apps 'B' and 'C' immediately suffer 429 quota exhaustion. Furthermore, in RAG pipelines, failing to partition vector similarity searches by tenant creates serious data isolation risks.",
    coreConcepts: [
      {
        title: "Scoping Authentication via Hashed Service API Keys",
        description:
          "Issue unique API keys per client application (app_id). Store only the SHA-256 hash of the API key in the database with defined capabilities (allowed models, max token budgets, permitted vector collection namespaces).",
        codeSnippet: {
          language: "typescript",
          caption: "NestJS Auth Guard for Service Tenants",
          code: `import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TenantAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || typeof apiKey !== 'string') {
      throw new UnauthorizedException('Missing x-api-key header');
    }

    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
    const tenant = await this.tenantRepo.findByKeyHash(keyHash);

    if (!tenant || !tenant.isActive) {
      throw new UnauthorizedException('Invalid or inactive API key');
    }

    // Attach verified tenant metadata to request context
    request.tenant = {
      id: tenant.id,
      applicationId: tenant.applicationId,
      allowedModels: tenant.allowedModels,
      monthlyTokenBudget: tenant.monthlyTokenBudget,
    };

    return true;
  }
}`,
        },
      },
      {
        title: "Tenant-Specific Sliding Window Rate Limiting in Redis",
        description:
          "Protect against noisy neighbors by enforcing per-tenant request limits using Redis sliding window log algorithms. Calculate both request rate (requests per minute) and token consumption rate (estimated tokens per minute).",
      },
      {
        title: "Enforcing Hard Pre-Filters in Vector Databases",
        description:
          "In Qdrant and other vector engines, never retrieve top-k documents and then filter by tenant in application code. Always apply metadata pre-filtering inside the vector query itself to prevent cross-tenant data leakage.",
        codeSnippet: {
          language: "typescript",
          caption: "Qdrant Tenant Metadata Pre-Filter",
          code: `export async function searchTenantVectorStore(
  client: QdrantClient,
  collectionName: string,
  vector: number[],
  tenantId: string,
  limit = 5
) {
  // Pre-filter enforces tenant isolation at the vector index level
  return await client.search(collectionName, {
    vector,
    limit,
    filter: {
      must: [
        {
          key: 'tenantId',
          match: { value: tenantId },
        },
      ],
    },
    with_payload: true,
  });
}`,
        },
      },
    ],
    tradeoffsAndPitfalls: [
      "Pitfall: Post-filtering vector queries. If tenant B's documents have higher raw similarity than tenant A's, doing post-retrieval filtering can result in zero returned documents for tenant A even though matching documents exist in the database.",
      "Trade-off: Unified vector collections vs separate collections per tenant. Shared collections with metadata pre-filtering simplify index maintenance and reduce idle memory footprint, but separate collections offer stronger physical isolation for compliance-heavy enterprise tenants.",
    ],
    productionChecklist: [
      "Store API key secrets hashed with SHA-256 or bcrypt; never store plaintext keys.",
      "Enforce tenant rate limits at both request-count and token-expenditure levels.",
      "Always use metadata pre-filters on all vector search and RAG retrieval queries.",
      "Log tenant ID with all request traces for unified billing and usage attribution.",
    ],
  },
  {
    slug: "resilient-llm-routing-timeouts-fallbacks",
    title: "Handling Rate Limits, Provider Timeouts, and Graceful Fallback in AI Gateways",
    subtitle:
      "Patterns for building production-grade LLM routing with circuit breakers, exponential backoff, and grounded fallback responses.",
    category: "Backend & API Engineering",
    readTime: "8 min read",
    publishedAt: "2024-12-20",
    updatedAt: "2025-01-25",
    tags: ["Resilience", "LLM Routing", "Circuit Breaker", "Error Handling", "TypeScript"],
    summary:
      "Upstream LLM APIs are notorious for unpredictable latency distributions: a request that usually takes 800ms may occasionally stall for 12 seconds or return HTTP 429 quota errors. Without defensive routing, these stalls cause cascading thread pool exhaustion in client apps. This note details resilient routing strategies.",
    problemContext:
      "When building interactive user applications (such as a travel planner or portfolio assistant), users will not wait 15 seconds for a response. Furthermore, provider-side outages or rate limit spikes should never crash your application. Services must degrade gracefully to secondary models, semantic caches, or grounded fallback engines.",
    coreConcepts: [
      {
        title: "Hard Timeouts with AbortController",
        description:
          "Never issue an HTTP request to an upstream LLM without an explicit, non-negotiable timeout. Use AbortController to cancel hanging connections after a sensible threshold (e.g., 7.5 seconds for interactive chat).",
        codeSnippet: {
          language: "typescript",
          caption: "Timeout and Multi-Provider Fallback Dispatcher",
          code: `export async function callLLMWithFallback(
  prompt: string,
  timeoutMs = 7500
): Promise<string> {
  const providers = [
    { name: 'primary-gemini', call: () => callGemini(prompt) },
    { name: 'secondary-openai', call: () => callOpenAI(prompt) },
  ];

  for (const provider of providers) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await provider.call();
      clearTimeout(timer);
      return response;
    } catch (err: any) {
      clearTimeout(timer);
      console.warn('Provider ' + provider.name + ' failed: ' + err.message + '. Trying next provider...');
      // Continue to next provider in fallback array
    }
  }

  // Graceful degradation when all upstream models are unavailable
  return getGroundedFallbackResponse(prompt);
}`,
        },
      },
      {
        title: "Circuit Breakers to Prevent Downstream Thundering Herds",
        description:
          "If an upstream provider returns 5 consecutive HTTP 500 or 429 responses within 30 seconds, trip a circuit breaker. For the next 60 seconds, fail fast immediately and serve cached or grounded fallback responses rather than hammering the failing upstream API.",
      },
      {
        title: "Grounded Local Fallback Engine",
        description:
          "For domain-specific assistants, maintain an offline, structured knowledge base. If all remote LLMs fail, query this local knowledge base using keyword or local vector matching to return a factual, pre-verified response rather than an empty error screen.",
      },
    ],
    tradeoffsAndPitfalls: [
      "Pitfall: Falling back to a different model family without prompt adjustment. Prompts optimized for Gemini may trigger unexpected behavior on Claude or GPT models if system prompt nuances differ.",
      "Trade-off: Cost of secondary provider standby. Maintaining accounts and configurations across two LLM vendors requires extra setup, but provides 99.9% uptime guarantees.",
    ],
    productionChecklist: [
      "Set strict timeouts (5s to 8s) on all user-facing synchronous LLM invocations.",
      "Implement circuit breakers to protect against provider cascading failures.",
      "Ensure secondary model fallbacks adhere to matching output schema contracts.",
      "Always provide a user-friendly, grounded fallback message on total provider outage.",
    ],
  },
  {
    slug: "database-indexing-query-performance-optimization",
    title: "Measuring Database Query Performance & Selecting Indexes from Execution Plans",
    subtitle:
      "Using EXPLAIN ANALYZE, composite indexing order, and partition pruning to cut relational query latencies from seconds to milliseconds.",
    category: "Database Optimization & Storage",
    readTime: "9 min read",
    publishedAt: "2024-10-25",
    updatedAt: "2024-12-30",
    tags: ["PostgreSQL", "Query Optimization", "Indexing", "Performance", "SQL"],
    summary:
      "Adding indexes randomly when queries feel sluggish often slows down write operations without fixing the root bottleneck. True query optimization requires understanding database execution plans (EXPLAIN ANALYZE), matching column order in composite indexes to query predicates, and avoiding anti-patterns like function-wrapped index columns.",
    problemContext:
      "In high-traffic platforms, a single poorly indexed query can saturate database CPU, exhaust connection pools, and bring an entire backend down. In this note, we examine real techniques used to diagnose slow queries and design optimal indexing strategies.",
    coreConcepts: [
      {
        title: "Reading PostgreSQL EXPLAIN (ANALYZE, BUFFERS) Output",
        description:
          "Never optimize a query based on intuition. Always run EXPLAIN (ANALYZE, BUFFERS) to see actual execution times, node types (Seq Scan vs. Index Scan vs. Bitmap Heap Scan), and buffer hit ratios.",
        codeSnippet: {
          language: "sql",
          caption: "Inspecting Query Execution Plans",
          code: `EXPLAIN (ANALYZE, BUFFERS)
SELECT id, title, published_at, view_count
FROM articles
WHERE status = 'PUBLISHED'
  AND published_at >= '2024-01-01'
ORDER BY published_at DESC
LIMIT 50;

-- Look for:
-- 1. "Seq Scan on articles" -> Indicates missing index on status or published_at
-- 2. "Rows Removed by Filter: 150000" -> Table scan reading and discarding huge row volumes
-- 3. "Buffers: shared hit=4210 read=12900" -> Heavy disk I/O reading table pages into memory`,
        },
      },
      {
        title: "Column Ordering in Composite Indexes",
        description:
          "In a composite index (col_a, col_b, col_c), column order matters tremendously. Follow the Equality-First Rule: place columns used in equality checks (=) first, followed by columns used in range filters (>, <, BETWEEN), and finally columns needed for sorting (ORDER BY).",
        codeSnippet: {
          language: "sql",
          caption: "Optimal Composite Index Definition",
          code: `-- Sub-optimal index:
-- CREATE INDEX idx_articles_bad ON articles (published_at, status);
-- PostgreSQL must scan the range of published_at first, then filter by status!

-- Optimal index adhering to equality-first rule:
CREATE INDEX idx_articles_optimal ON articles (status, published_at DESC)
INCLUDE (title, view_count);
-- 'status' equality matches immediately,
-- 'published_at' satisfies both range condition and ORDER BY sort without a Sort node,
-- 'INCLUDE' allows an Index Only Scan without hitting table heap pages!`,
        },
      },
      {
        title: "Avoiding Partial Scans Caused by Function Wrapping",
        description:
          "Wrapping an indexed column in a function (e.g., WHERE LOWER(email) = $1 or WHERE DATE(created_at) = $1) invalidates standard b-tree indexes, forcing a full table scan. Instead, use expression indexes or range comparisons.",
      },
    ],
    tradeoffsAndPitfalls: [
      "Trade-off: Index write overhead. Every INSERT, UPDATE, or DELETE on a table must update all associated indexes. Maintain only indexes that support high-frequency or mission-critical queries.",
      "Pitfall: Low-cardinality leading index columns. Creating an index on a boolean column alone (is_active) rarely helps because the query planner will prefer a sequence scan if 80% of rows have is_active = true. Use partial indexes instead.",
    ],
    productionChecklist: [
      "Profile queries using EXPLAIN (ANALYZE, BUFFERS) before and after adding indexes.",
      "Apply the equality-first rule when designing composite index column orders.",
      "Use partial indexes for queries that consistently filter by a specific status subset.",
      "Leverage INCLUDE clauses for index-only scans on frequently selected columns.",
      "Monitor index usage periodically using pg_stat_user_indexes and drop unused indexes.",
    ],
  },
];
