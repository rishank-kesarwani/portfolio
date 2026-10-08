export type ProjectCategory =
  | "AI / Developer Tools"
  | "AI Engineering / Evaluation"
  | "AI Infrastructure / Platform"
  | "AI / Full Stack"
  | "Entertainment / AI Discovery"
  | "Sports / Real-Time Data"
  | "Productivity / Geo Discovery"
  | "Outdoor / Geo AI"
  | "Backend / Infrastructure"
  | "Developer Tools"
  | "Frontend";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  longDescription?: string;
  problemStatement?: string;
  solutionSummary?: string;
  architectureHighlights?: string[];
  techStack: string[];
  image: string;
  isLiveApp?: boolean;
  isFeatured?: boolean;
  isEnterprise?: boolean;
  isInfrastructure?: boolean;
  statusText?: string;
  liveUrl?: string;
  githubUrl?: string;
  monetization?: string;
  aiFeatures?: string[];
  badges?: string[];
};

export const aiEngineeringProjects: Project[] = [
  {
    id: "ai-pr-review",
    title: "AI PR Review Platform",
    category: "AI / Developer Tools",
    description:
      "Automated code review platform utilizing GitHub App webhooks, AST changed-file analysis, multi-agent finding arbitration, and GitHub Checks integration.",
    longDescription:
      "A production-grade developer automation platform that intercepts GitHub Pull Request webhooks, performs AST-level changed-file parsing, executes static analysis, and runs multi-agent AI code reviews. Features automated finding arbitration to eliminate noise, integration with Model Regression Detection for evaluator gates, and direct GitHub Checks annotations with optional inline PR comments.",
    problemStatement:
      "Manual code reviews on high-velocity repositories are slow, prone to missed regressions, and consume significant senior engineering bandwidth.",
    solutionSummary:
      "Built an event-driven GitHub App with BullMQ task queues, AST analysis, and an arbitration layer that filters false positives before posting structured GitHub Check runs.",
    architectureHighlights: [
      "GitHub App integration with secure HMAC webhook signature verification",
      "Changed-file parsing and AST static analysis pipeline",
      "Multi-agent AI code review with consensus arbitration",
      "Asynchronous distributed processing via BullMQ and Redis",
      "Integration with Model Regression Detection for evaluator test gates",
      "Chrome Extension and responsive web dashboard for PR review metrics",
    ],
    techStack: [
      "Next.js 15",
      "NestJS",
      "TypeScript",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "GitHub REST/GraphQL API",
      "Docker",
    ],
    image: "AI PR Review Engine",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Live Platform",
    liveUrl: "https://ai-pr-review.rishankkesarwani.com",
    githubUrl: "https://github.com/rishank-kesarwani/ai-pr-review-platform",
    badges: ["LIVE", "AI ENGINEERING", "GITHUB APP", "BULLMQ"],
    aiFeatures: ["AST-Informed Code Review", "Multi-Agent Finding Arbitration", "Automated GitHub Checks"],
  },
  {
    id: "model-regression-detection",
    title: "AI Model Regression Detection",
    category: "AI Engineering / Evaluation",
    description:
      "Automated LLM evaluation framework benchmarking candidate models and prompts against golden baselines across quality, latency, cost, and safety.",
    longDescription:
      "An automated evaluation platform designed to prevent regressions during prompt iterations or LLM model upgrades. Runs structured test suites against curated golden datasets, measuring quality, latency, token expenditure, and safety guardrails. Outputs statistical PASS / WARN / FAIL evaluation reports and integrates directly into CI/CD and the AI PR Review Platform.",
    problemStatement:
      "Prompt updates and model migrations frequently cause unexpected regressions in output schema validity, latency, accuracy, or cost without automated CI benchmarking.",
    solutionSummary:
      "Engineered an evaluation framework with golden-dataset test suites, structured output schema validators, statistical hypothesis comparison, and automated report generation.",
    architectureHighlights: [
      "Multi-dimensional regression benchmarking (Quality, Latency, Cost, Safety)",
      "Strict structured-output validation using JSON Schema and Pydantic",
      "Statistical hypothesis comparison generating PASS / WARN / FAIL reports",
      "Evaluator test gate integration with AI PR Review Platform and CI/CD",
      "Historical evaluation run comparisons and metric drift telemetry",
    ],
    techStack: [
      "TypeScript",
      "Python",
      "Next.js",
      "FastAPI / NestJS",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    image: "Model Regression Platform",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Live Platform",
    liveUrl: "https://model-regression.rishankkesarwani.com",
    githubUrl: "https://github.com/rishank-kesarwani/ai-model-regression-detection",
    badges: ["LIVE", "AI EVALUATION", "CI/CD GATE", "BENCHMARKING"],
    aiFeatures: ["Golden Dataset Benchmarking", "Schema Adherence Validation", "Cost & Latency Tracking"],
  },
  {
    id: "ai-platform",
    title: "AI Platform (Centralized Infrastructure)",
    category: "AI Infrastructure / Platform",
    description:
      "Centralized microservice providing shared LLM orchestration, Qdrant vector RAG pipelines, Redis semantic caching, and unified telemetry.",
    longDescription:
      "Shared backend AI infrastructure powering all applications across the ecosystem. Implements a unified POST /api/v1/ai/chat gateway with Gemini and OpenAI integrations, hybrid RAG over Qdrant vector collections, Redis semantic caching for sub-millisecond repeated queries, ephemeral & persistent memory tiers, and per-service API key authentication.",
    problemStatement:
      "Building isolated LLM integrations in every application creates duplicated prompt code, inconsistent vector embeddings, uncoordinated rate limits, and inflated API costs.",
    solutionSummary:
      "Centralized all AI capabilities into a high-performance NestJS platform with shared vector collections, semantic caching, rate limiting, and telemetry.",
    architectureHighlights: [
      "Centralized POST /api/v1/ai/chat gateway with multi-model routing",
      "Hybrid RAG pipeline using Qdrant vector database and embeddings",
      "Redis semantic response caching to eliminate redundant LLM invocations",
      "Multi-tier memory management (conversation session + user memory)",
      "Service-to-service authentication (x-api-key) and per-tenant rate limits",
      "End-to-end execution telemetry, latency monitoring, and token budgets",
    ],
    techStack: [
      "NestJS",
      "TypeScript",
      "Qdrant Vector DB",
      "Redis",
      "Google Gemini APIs",
      "OpenAI",
      "Docker",
      "GCP",
    ],
    image: "AI Platform Infrastructure",
    isInfrastructure: true,
    isFeatured: true,
    statusText: "Production Infrastructure",
    githubUrl: "https://github.com/rishank-kesarwani/ai-platform",
    badges: ["AI INFRASTRUCTURE", "RAG", "QDRANT", "SEMANTIC CACHE"],
    aiFeatures: ["Qdrant Vector Search", "Semantic Redis Caching", "Multi-Tier Memory Engine"],
  },
  {
    id: "travel-planner",
    title: "AI Travel Planner",
    category: "AI / Full Stack",
    description:
      "Full-stack AI itinerary planning platform featuring multi-day schedule orchestration, destination insights, and Travelpayouts monetization.",
    longDescription:
      "A complete AI-powered travel planning engine that converts traveler preferences and budget constraints into structured, multi-day itineraries. Orchestrates destination research, day-by-day scheduling, asynchronous BullMQ background jobs, and integrated Travelpayouts booking recommendations with transparent disclosures.",
    problemStatement:
      "Manual travel planning requires hours of fragmented searching across hotel aggregators, activity portals, map routes, and travel guides.",
    solutionSummary:
      "Built a multi-step LangGraph AI workflow that orchestrates destination curation, day-by-day scheduling, and contextual recommendations into a seamless, responsive UI.",
    architectureHighlights: [
      "Multi-step LangGraph itinerary generation workflow with real-time streaming",
      "Asynchronous background task queuing with BullMQ and Redis",
      "Contextual affiliate monetization engine (Travelpayouts Marker #579629)",
      "Next.js 15 App Router frontend with NestJS backend microservices",
    ],
    techStack: [
      "Next.js 15",
      "NestJS",
      "TypeScript",
      "Redis",
      "BullMQ",
      "LangGraph",
      "OpenAI",
      "Railway",
      "Vercel",
    ],
    image: "AI Travel Platform",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Live Application",
    liveUrl: "https://travel-planner.rishankkesarwani.com",
    githubUrl: "https://github.com/rishank-kesarwani/ai-travel-planner",
    monetization: "Travelpayouts Affiliate Network (Marker #579629)",
    badges: ["LIVE", "AI FULL-STACK", "LANGGRAPH", "TRAVELPAYOUTS"],
    aiFeatures: ["Multi-Day Itinerary Generation", "Context-Aware Curation", "Dynamic Activity Suggestions"],
  },
  {
    id: "movie-matcher",
    title: "AI Movie Matcher",
    category: "Entertainment / AI Discovery",
    description:
      "Interactive cinema discovery platform featuring multi-criteria search, mood-based matching, dynamic catalog filtering, and responsive media views.",
    longDescription:
      "A discovery application designed for rapid exploration of film catalogues. Implements AI-assisted mood matching, dynamic genre/era filtering, debounced search pipelines, and responsive layout scaling for seamless media browsing.",
    problemStatement:
      "Large entertainment catalogs often suffer from slow search response times and overwhelming uncurated lists when users search by mood or complex criteria.",
    solutionSummary:
      "Engineered an intuitive matching interface with optimized client-side caching, debounced queries, and responsive catalog browsing.",
    architectureHighlights: [
      "Debounced query optimization and client-side caching",
      "AI-driven conversational discovery matching complex user moods",
      "Dynamic catalog filtering by genre, rating, and era",
      "Responsive media card grid with lazy loading",
    ],
    techStack: ["Next.js", "React", "TypeScript", "REST APIs", "Tailwind CSS"],
    image: "Movie Discovery Engine",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Live Application",
    liveUrl: "https://movie-matcher.rishankkesarwani.com",
    githubUrl: "https://github.com/rishank-kesarwani/ai-movie-matcher",
    badges: ["LIVE", "AI DISCOVERY", "ENTERTAINMENT"],
    aiFeatures: ["Mood-Based Matching", "Contextual Recommendation Logic"],
  },
  {
    id: "sports-tracker",
    title: "AI Sports Tracker",
    category: "Sports / Real-Time Data",
    description:
      "Athletic data platform tracking match schedules, team rosters, score monitoring, fixture analytics, and AI match insights.",
    longDescription:
      "A comprehensive sports data hub providing structured insights into athletic fixtures, tournament standings, team performance metrics, and match timelines with fast client-side filtering.",
    problemStatement:
      "Sports enthusiasts need consolidated, low-latency access to fixtures, rosters, and match timelines across multiple leagues without clutter.",
    solutionSummary:
      "Developed a responsive sports dashboard with structured data pipelines, match timeline visualizations, and instant search.",
    architectureHighlights: [
      "Structured fixture and match data pipelines",
      "Dynamic timeline views for game progression",
      "Fast client-side category and league filtering",
      "AI-assisted match summaries and key event highlights",
    ],
    techStack: ["React", "TypeScript", "Node.js", "REST APIs", "Tailwind CSS"],
    image: "Sports Dashboard",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Live Application",
    liveUrl: "https://sports-tracker.rishankkesarwani.com",
    githubUrl: "https://github.com/rishank-kesarwani/ai-sports-tracker",
    badges: ["LIVE", "DATA PLATFORM", "SPORTS"],
    aiFeatures: ["AI Match Summarization", "Key Event Extraction"],
  },
  {
    id: "study-spot-finder",
    title: "AI Study Spot Finder",
    category: "Productivity / Geo Discovery",
    description:
      "Location-aware discovery platform helping students and remote professionals find verified study spots with amenity and noise-level filtering.",
    longDescription:
      "A productivity utility that locates study and remote-work friendly spaces based on noise level, Wi-Fi reliability, seating availability, power outlets, and opening hours with smart recommendations.",
    problemStatement:
      "Finding dependable, quiet work spaces with guaranteed Wi-Fi and power outlets is a persistent challenge for students and remote workers.",
    solutionSummary:
      "Created a location-aware discovery tool with multi-attribute filtering, amenity badges, and intuitive card summaries.",
    architectureHighlights: [
      "Amenity filtering (Wi-Fi, quiet zones, power outlets, seating)",
      "Location-aware radius discovery interface",
      "Lightweight client-side state caching",
      "AI study environment recommendations tailored to focus needs",
    ],
    techStack: ["Next.js", "TypeScript", "Geolocation", "Tailwind CSS"],
    image: "Workspace Discovery",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Live Application",
    liveUrl: "https://study-spot-finder.rishankkesarwani.com",
    githubUrl: "https://github.com/rishank-kesarwani/ai-study-spot-finder",
    badges: ["LIVE", "GEO DISCOVERY", "PRODUCTIVITY"],
    aiFeatures: ["Smart Focus Spot Recommendations", "Amenity Matching"],
  },
  {
    id: "hiking-explorer",
    title: "AI Hiking Explorer",
    category: "Outdoor / Geo AI",
    description:
      "Outdoor trail discovery and elevation platform featuring terrain analytics, weather forecasting, and AI trail preparedness guides.",
    longDescription:
      "An adventure planning platform providing comprehensive hiking trail datasets, elevation profile visualizations, terrain difficulty assessments, and AI-generated safety checklists for outdoor enthusiasts.",
    problemStatement:
      "Hikers need reliable, aggregated trail difficulty ratings, elevation changes, and weather-aware safety preparations before heading outdoors.",
    solutionSummary:
      "Built a geospatial trail explorer with elevation profiles, difficulty scoring, and AI-generated gear/safety advisories.",
    architectureHighlights: [
      "Geospatial trail data indexing and elevation profile visualization",
      "Difficulty and terrain filtering with weather integration",
      "AI-generated trail preparedness guides and packing recommendations",
    ],
    techStack: ["Next.js", "TypeScript", "Leaflet / Maps", "REST APIs", "Tailwind CSS"],
    image: "Hiking Explorer Platform",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Live Application",
    liveUrl: "https://hiking-explorer.rishankkesarwani.com",
    githubUrl: "https://github.com/rishank-kesarwani/ai-hiking-explorer",
    badges: ["LIVE", "GEO AI", "OUTDOORS"],
    aiFeatures: ["AI Trail Preparedness Advisories", "Terrain Difficulty Scoring"],
  },
];

export const enterpriseProjects: Project[] = [
  {
    id: "notification-service",
    title: "Notification Service (Shared Infrastructure)",
    category: "Backend / Infrastructure",
    description:
      "Organization-wide distributed notification platform for SMS, WhatsApp, email, and push alerts with Kafka-backed delivery guarantees.",
    longDescription:
      "Enterprise notification backend handling high-throughput messaging across multiple delivery channels. Designed with Kafka topic partitioning, dead-letter queues, and resilient retry mechanisms.",
    problemStatement:
      "Disparate product teams needed a centralized, resilient notification layer with unified delivery tracking and rate protection.",
    solutionSummary:
      "Architected a NestJS microservice utilizing Kafka message queues and PostgreSQL persistence for guaranteed at-least-once delivery.",
    architectureHighlights: [
      "Kafka-backed event streaming and queue decoupling",
      "Multi-channel adapter architecture (SMS, WhatsApp, Push, Email)",
      "Dead-letter queues and automated failure retry flows",
    ],
    techStack: ["Node.js", "NestJS", "TypeScript", "Kafka", "PostgreSQL", "Docker"],
    image: "Notification Platform",
    isEnterprise: true,
    isInfrastructure: true,
    statusText: "Shared Platform",
    githubUrl: "https://github.com/rishank-kesarwani/notification-service",
    badges: ["INFRASTRUCTURE", "KAFKA", "NESTJS", "DISTRIBUTED"],
  },
  {
    id: "react-cms-plugin",
    title: "React Plugin for CMS",
    category: "Developer Tools",
    description:
      "Multi-language WordPress CMS publishing experience built as an embedded Next.js and React micro-frontend.",
    longDescription:
      "Embedded editorial workflow tool serving multi-language news desks. Integrates directly into WordPress publishing dashboards with real-time preview and GraphQL backend synchronisation.",
    problemStatement:
      "Editorial teams required a modern, responsive UI within legacy CMS systems to accelerate multi-language article composition.",
    solutionSummary:
      "Built an embedded Next.js and React plugin with GraphQL data fetching, Storybook component testing, and seamless CMS iframe communication.",
    architectureHighlights: [
      "Embedded micro-frontend bridge architecture",
      "GraphQL query caching and optimistic updates",
      "Multi-language editorial localization support",
    ],
    techStack: ["React", "Next.js", "Tailwind CSS", "GraphQL", "Storybook"],
    image: "CMS Publishing Plugin",
    isEnterprise: true,
    statusText: "Enterprise Platform",
    badges: ["ENTERPRISE", "GRAPHQL", "MICRO-FRONTEND"],
  },
  {
    id: "mis-reports",
    title: "L18 & MIS Reports Suite",
    category: "Backend / Infrastructure",
    description:
      "Automated analytics reporting suite saving weekly manual effort across daily and monthly editorial performance metrics.",
    longDescription:
      "Data processing and reporting pipeline automating editorial analytics ingestion, metric aggregation, and scheduled stakeholder distribution.",
    problemStatement:
      "Editorial leaders spent hours manually compiling daily and monthly performance metrics across fragmented reporting tools.",
    solutionSummary:
      "Engineered automated ETL pipelines with Python, Pandas, and GCP scheduling to generate accurate editorial performance reports.",
    architectureHighlights: [
      "Automated ETL pipelines with Pandas and NumPy",
      "GCP Cloud Scheduler and Cloud Run processing triggers",
      "Automated tabular and executive summary generation",
    ],
    techStack: ["Python", "Pandas", "NumPy", "Node.js", "GCP"],
    image: "Analytics Reporting Engine",
    isEnterprise: true,
    statusText: "Enterprise Platform",
    badges: ["ENTERPRISE", "PYTHON", "GCP", "ETL"],
  },
  {
    id: "file18-microfrontend",
    title: "File18 Micro-frontend",
    category: "Frontend",
    description:
      "Configuration-driven micro-frontend platform processing high-volume news and editorial transactions at scale.",
    longDescription:
      "Modular frontend architecture enabling independent deployment of editorial tools across different content desks with JWT authentication and shared state management.",
    problemStatement:
      "A monolithic UI slowed development cycles and prevented independent team releases across major news desks.",
    solutionSummary:
      "Implemented a Webpack Module Federation micro-frontend architecture with isolated route boundaries and unified theme tokens.",
    architectureHighlights: [
      "Webpack Module Federation for runtime micro-app composition",
      "Unified design token sharing across distributed modules",
      "JWT-based single sign-on across micro-apps",
    ],
    techStack: ["React", "Webpack", "TypeScript", "JWT", "REST APIs"],
    image: "Micro-frontend Engine",
    isEnterprise: true,
    statusText: "Enterprise Platform",
    badges: ["ENTERPRISE", "WEBPACK FEDERATION", "REACT"],
  },
  {
    id: "article-assistant",
    title: "Network18 Article Assistant",
    category: "AI / Full Stack",
    description:
      "RAG chatbot that answers reader and editorial questions with grounded responses from verified published article content.",
    longDescription:
      "Production Retrieval-Augmented Generation (RAG) assistant indexing verified journalistic content to provide factual, citation-backed answers with strict hallucination guardrails.",
    problemStatement:
      "Readers and journalists needed rapid, fact-checked answers from extensive historical article archives without hallucinations.",
    solutionSummary:
      "Constructed a LangGraph state machine workflow with ChromaDB vector embeddings and OpenAI models to deliver source-grounded answers.",
    architectureHighlights: [
      "LangGraph cyclic state machine for retrieval and answer validation",
      "Vector search over published articles using ChromaDB",
      "Factual grounding checks and citation generation",
    ],
    techStack: ["LangGraph", "OpenAI", "ChromaDB", "Python", "React"],
    image: "RAG Article Assistant",
    isEnterprise: true,
    statusText: "Enterprise AI System",
    badges: ["ENTERPRISE", "RAG", "LANGGRAPH", "CHROMADB"],
    aiFeatures: ["LangGraph State Machine", "ChromaDB Vector Retrieval", "Factual Verification"],
  },
  {
    id: "file18-monorepo",
    title: "File18 Backend Monorepo",
    category: "Backend / Infrastructure",
    description:
      "Nx-based monorepo containing NestJS microservices for content ingestion, processing, Temporal workflows, and personalization.",
    longDescription:
      "High-scale content infrastructure powering editorial operations. Orchestrates asynchronous workflow execution with Temporal, Redis caching, Kafka message streaming, and PostgreSQL data persistence.",
    problemStatement:
      "Managing disparate backend repositories caused dependency drift and complicated complex distributed workflows.",
    solutionSummary:
      "Unified microservices into an Nx workspace with shared domain libraries, Temporal durable workflow execution, and Kafka messaging.",
    architectureHighlights: [
      "Nx workspace with shared TypeScript contracts and domain models",
      "Temporal durable execution for long-running workflows",
      "Redis distributed caching and PostgreSQL indexing",
    ],
    techStack: [
      "NestJS",
      "TypeScript",
      "Kafka",
      "Temporal",
      "Redis",
      "PostgreSQL",
      "GraphQL",
      "Nx",
    ],
    image: "Backend Monorepo Microservices",
    isEnterprise: true,
    statusText: "Enterprise Platform",
    badges: ["ENTERPRISE", "NX MONOREPO", "TEMPORAL", "KAFKA"],
  },
];

export const liveProducts: Project[] = aiEngineeringProjects;
export const allProjects: Project[] = [...aiEngineeringProjects, ...enterpriseProjects];
export const projects: Project[] = allProjects;

export const skills = [
  "React",
  "Next.js 15",
  "JavaScript",
  "TypeScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "REST APIs",
  "GraphQL",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Qdrant",
  "ChromaDB",
  "GCP",
  "Docker",
  "CI/CD",
  "Apache Kafka",
  "BullMQ",
  "Temporal",
  "LangGraph",
  "RAG",
  "Google Gemini",
  "OpenAI APIs",
  "Semantic Caching",
];

export const groupedSkills = [
  {
    category: "AI & LLM Systems",
    icon: "Sparkles",
    skills: [
      "RAG Architectures",
      "LangGraph State Machines",
      "Qdrant Vector DB",
      "Semantic Redis Caching",
      "Model Regression Testing",
      "Gemini & OpenAI APIs",
    ],
  },
  {
    category: "Backend & Microservices",
    icon: "Server",
    skills: ["Node.js", "NestJS", "REST APIs", "GraphQL", "Temporal Workflows", "Nx Monorepos"],
  },
  {
    category: "Distributed Systems & Queues",
    icon: "Layers",
    skills: ["Apache Kafka", "BullMQ Task Queues", "Redis Pub/Sub", "Event-Driven Systems"],
  },
  {
    category: "Frontend Architecture",
    icon: "Layout",
    skills: ["React 19", "Next.js 15 App Router", "TypeScript", "Webpack Module Federation", "Tailwind CSS"],
  },
  {
    category: "Databases & Storage",
    icon: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Qdrant", "ChromaDB", "Query Optimization"],
  },
  {
    category: "Cloud, DevOps & Tooling",
    icon: "Cloud",
    skills: ["Google Cloud (GCP)", "Docker", "CI/CD Pipelines", "GitHub Apps & Webhooks", "Vercel"],
  },
];

export type EngineeringPillar = {
  title: string;
  icon: string;
  capabilities: string[];
};

export const engineeringPillars: EngineeringPillar[] = [
  {
    title: "AI & LLM Engineering",
    icon: "Sparkles",
    capabilities: [
      "Production RAG architectures with Qdrant vector search and grounded retrieval",
      "LangGraph state machine orchestration for complex multi-step workflows",
      "Automated Model Regression Testing across quality, latency, cost, and safety",
      "Redis semantic caching and prompt management for low-latency AI responses",
    ],
  },
  {
    title: "Distributed Systems & Queues",
    icon: "Layers",
    capabilities: [
      "Apache Kafka event streaming with partition strategies and dead-letter handling",
      "BullMQ and Redis asynchronous task queues with backoff retries",
      "Temporal workflow engine for durable, stateful distributed processes",
      "Resilient microservice communication with circuit breakers and fallback policies",
    ],
  },
  {
    title: "Developer Tools & Automation",
    icon: "Cpu",
    capabilities: [
      "GitHub Apps with webhook verification, changed-file AST static analysis, and Checks",
      "Multi-agent AI code review pipelines with finding arbitration to minimize noise",
      "Automated CI/CD evaluator test gates preventing code and prompt regressions",
      "Chrome extensions and developer dashboards for real-time telemetry",
    ],
  },
  {
    title: "Backend & API Engineering",
    icon: "Server",
    capabilities: [
      "NestJS & Node.js modular architecture with clean dependency injection",
      "RESTful API design and high-performance GraphQL schema integration",
      "Strict request validation, rate limiting, and defensive input sanitization",
      "Optimized payload serialization and robust error telemetry",
    ],
  },
  {
    title: "Frontend Architecture & Performance",
    icon: "Layout",
    capabilities: [
      "Next.js 15 App Router with React 19 Server Components and streaming SSR",
      "Micro-frontend platforms using Webpack Module Federation",
      "Core Web Vitals optimization (LCP, INP, CLS) and minimal client JS overhead",
      "Accessible, mobile-responsive UI with smooth theme transitions",
    ],
  },
  {
    title: "Cloud Infrastructure & CI/CD",
    icon: "Cloud",
    capabilities: [
      "Google Cloud Platform (GCP) services (Cloud Run, Scheduler, Storage)",
      "Docker containerization for reproducible multi-stage builds",
      "Automated CI/CD pipelines with linting, testing, and continuous deployment",
      "Edge caching, CDN asset distribution, and serverless runtime tuning",
    ],
  },
  {
    title: "Database Optimization & Storage",
    icon: "Database",
    capabilities: [
      "PostgreSQL relational schema modeling, indexing, and query tuning",
      "Redis in-memory caching patterns and distributed state management",
      "Qdrant & ChromaDB vector database indexing for semantic similarity search",
      "Large-scale analytical ETL aggregations with Python and Pandas",
    ],
  },
  {
    title: "Monetization & Growth Engineering",
    icon: "Shield",
    capabilities: [
      "Google AdSense setup with strict ads.txt compliance and non-intrusive placement",
      "Travelpayouts affiliate integration with dynamic contextual travel widgets",
      "Transparent affiliate disclosures adhering to FTC and advertising guidelines",
      "Event-driven analytics tracking for user engagement and conversions",
    ],
  },
];
