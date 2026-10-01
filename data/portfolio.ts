export type ProjectCategory =
  | "AI / Full Stack"
  | "Travel"
  | "Entertainment"
  | "Sports"
  | "Productivity"
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
  statusText?: string;
  liveUrl?: string;
  githubUrl?: string;
  monetization?: string;
  aiFeatures?: string[];
};

export const liveProducts: Project[] = [
  {
    id: "travel-planner",
    title: "AI Travel Planner",
    category: "AI / Full Stack",
    description:
      "Full-stack AI travel planning platform with intelligent itinerary generation, destination insights, and integrated monetization infrastructure.",
    longDescription:
      "A complete AI-driven travel planning engine that transforms traveler preferences into structured, multi-day itineraries. Features automated hotel and activity recommendations, asynchronous job processing, and integrated Travelpayouts monetization with transparent disclosures.",
    problemStatement:
      "Manual travel itinerary planning is time-consuming and fragmented across multiple search engines, booking sites, and review forums.",
    solutionSummary:
      "Built a multi-agent AI workflow that orchestrates destination curation, day-by-day scheduling, and contextual recommendations into a seamless, responsive UI.",
    architectureHighlights: [
      "Multi-step LLM itinerary generation workflow",
      "Asynchronous background task queuing with BullMQ & Redis",
      "Contextual affiliate recommendation system (Travelpayouts #579629)",
      "Next.js frontend with NestJS microservices architecture",
    ],
    techStack: [
      "Next.js",
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
    liveUrl: "https://travel.rishankkesarwani.com",
    monetization: "Travelpayouts Affiliate Network (Marker #579629)",
    aiFeatures: ["Multi-Day Itinerary Orchestration", "Activity Curation", "Context-Aware Suggestions"],
  },
  {
    id: "movie-matcher",
    title: "Movie Matcher",
    category: "Entertainment",
    description:
      "Interactive movie discovery and recommendation platform featuring multi-criteria search, personalized curation, and responsive media views.",
    longDescription:
      "A cinema discovery application designed for rapid exploration of film catalogues. Implements dynamic genre/mood filtering, debounced search pipelines, and responsive layout scaling for seamless media browsing.",
    problemStatement:
      "Browsing large entertainment catalogs often suffers from slow search response times and overwhelming uncurated lists.",
    solutionSummary:
      "Engineered an intuitive matching interface with optimized client-side caching, fluid transition states, and responsive catalog browsing.",
    architectureHighlights: [
      "Debounced query optimization and client-side caching",
      "Dynamic catalog filtering by genre, rating, and era",
      "Responsive media card grid with lazy loading",
    ],
    techStack: ["Next.js", "React", "TypeScript", "REST APIs", "Tailwind CSS"],
    image: "Movie Discovery Engine",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Application Architecture",
    monetization: "AdSense Monetization Framework",
    aiFeatures: ["Contextual Recommendation Logic"],
  },
  {
    id: "sports-tracker",
    title: "Sports Tracker",
    category: "Sports",
    description:
      "Comprehensive athletic tracking application providing match schedules, team rosters, score monitoring, and fixture analytics.",
    longDescription:
      "A sports data hub providing structured insights into athletic fixtures, tournament standings, team performance metrics, and match timelines with fast client-side filtering.",
    problemStatement:
      "Sports enthusiasts need consolidated, low-latency access to fixtures, rosters, and match schedules across multiple leagues.",
    solutionSummary:
      "Developed a responsive sports dashboard with structured data pipelines, match timeline visualizations, and instant search.",
    architectureHighlights: [
      "Structured fixture and match data pipelines",
      "Dynamic timeline views for game progression",
      "Fast client-side category and league filtering",
    ],
    techStack: ["React", "TypeScript", "Node.js", "REST APIs", "Tailwind CSS"],
    image: "Sports Dashboard",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Application Architecture",
    monetization: "AdSense Integration Ready",
  },
  {
    id: "study-spot-finder",
    title: "Study Spot Finder",
    category: "Productivity",
    description:
      "Location-aware discovery platform helping students and remote professionals find verified study spots with amenity filtering.",
    longDescription:
      "A productivity utility that locates study and remote-work friendly spaces based on noise level, Wi-Fi reliability, seating availability, power outlets, and opening hours.",
    problemStatement:
      "Finding dependable, quiet work spaces with guaranteed Wi-Fi and power outlets is a persistent challenge for students and remote workers.",
    solutionSummary:
      "Created a location-aware discovery tool with multi-attribute filtering, amenity badges, and intuitive card summaries.",
    architectureHighlights: [
      "Amenity filtering (Wi-Fi, quiet zones, power outlets)",
      "Location-aware radius discovery interface",
      "Lightweight client-side state caching",
    ],
    techStack: ["Next.js", "TypeScript", "Geolocation", "Tailwind CSS"],
    image: "Workspace Discovery",
    isLiveApp: true,
    isFeatured: true,
    statusText: "Application Architecture",
    monetization: "AdSense Integration Ready",
  },
];

export const enterpriseProjects: Project[] = [
  {
    id: "notification-service",
    title: "Notification Service",
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
    statusText: "Enterprise Platform",
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
  },
];

export const allProjects: Project[] = [...liveProducts, ...enterpriseProjects];
export const projects: Project[] = allProjects;

export const skills = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "REST APIs",
  "GraphQL",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "GCP",
  "Docker",
  "CI/CD",
  "Kafka",
  "BullMQ",
  "Temporal",
  "LangGraph",
  "RAG",
  "OpenAI",
  "LLM Systems",
];

export const groupedSkills = [
  {
    category: "Frontend Architecture",
    icon: "Layout",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend & Microservices",
    icon: "Server",
    skills: ["Node.js", "NestJS", "REST APIs", "GraphQL", "Temporal", "Nx Monorepos"],
  },
  {
    category: "Database & Storage",
    icon: "Database",
    skills: ["PostgreSQL", "MySQL", "Redis", "ChromaDB", "Query Optimization"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    skills: ["Google Cloud (GCP)", "Docker", "CI/CD Pipelines", "Vercel", "Railway"],
  },
  {
    category: "Messaging & Queues",
    icon: "Layers",
    skills: ["Apache Kafka", "BullMQ", "Redis Pub/Sub", "Event-Driven Architecture"],
  },
  {
    category: "AI & LLM Engineering",
    icon: "Sparkles",
    skills: ["LangGraph", "RAG Architecture", "OpenAI APIs", "Vector Search", "LLM Workflows"],
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
      "Production RAG architectures with vector embeddings and grounded retrieval",
      "LangGraph state machine orchestration for complex multi-step workflows",
      "Prompt engineering, context window management, and structured schema output",
      "Factual consistency checks and automated hallucination mitigations",
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
      "Next.js App Router with React 19 Server Components and streaming SSR",
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
      "ChromaDB vector database indexing for semantic similarity search",
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
  {
    title: "Observability & Security",
    icon: "Cpu",
    capabilities: [
      "Secure credential isolation with server-side environment variables",
      "Public API abuse protection with rate limiters and quota boundaries",
      "Health check endpoints, structured JSON logging, and error tracing",
      "Zero mandatory auth for public browsing with secure private boundaries",
    ],
  },
];
