export type Project = {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
};

export const projects: Project[] = [
  {
    title: "Notification Service",
    description:
      "Organization-wide notification platform for SMS, WhatsApp, email, and push alerts with reliable Kafka-backed delivery flows.",
    image: "Notification platform",
    techStack: ["Node.js", "NestJS", "TypeScript", "Kafka", "PostgreSQL"],
    githubUrl: "https://github.com/your-username/notification-service",
    liveUrl: "https://your-notification-service-demo.com",
  },
  {
    title: "React Plugin for CMS",
    description:
      "Multi-language WordPress CMS publishing experience built as an embedded Next.js and React application.",
    image: "CMS plugin",
    techStack: ["React", "Next.js", "Tailwind CSS", "GraphQL", "Storybook"],
    githubUrl: "https://github.com/your-username/react-cms-plugin",
    liveUrl: "https://your-cms-plugin-demo.com",
  },
  {
    title: "L18 & MIS Reports",
    description:
      "Automated reporting suite that saves 50 hours of weekly manual effort across daily and monthly editorial analytics.",
    image: "Analytics reports",
    techStack: ["Python", "Pandas", "NumPy", "Node.js", "GCP"],
    githubUrl: "https://github.com/your-username/mis-reports",
    liveUrl: "https://your-reports-demo.com",
  },
  {
    title: "File18 Micro-frontend",
    description:
      "Configuration-driven micro-frontend platform processing 300k+ daily news content transactions at scale.",
    image: "Micro-frontend",
    techStack: ["React", "Webpack", "TypeScript", "JWT", "REST APIs"],
    githubUrl: "https://github.com/your-username/file18",
    liveUrl: "https://your-file18-demo.com",
  },
  {
    title: "Network18 Article Assistant",
    description:
      "RAG chatbot that answers reader questions with grounded responses from verified published article content.",
    image: "RAG chatbot",
    techStack: ["LangGraph", "OpenAI", "ChromaDB", "Python", "React"],
    githubUrl: "https://github.com/your-username/article-assistant",
    liveUrl: "https://your-article-assistant-demo.com",
  },
  {
    title: "File18 Backend Monorepo",
    description:
      "An Nx-based monorepo containing NestJS microservices for content ingestion, processing, Temporal workflows, and view personalization.",
    image: "Backend microservices",
    techStack: ["NestJS", "TypeScript", "Kafka", "Temporal", "Redis", "PostgreSQL", "GraphQL", "Nx"],
    githubUrl: "https://github.com/your-username/file18-monorepo",
    liveUrl: "https://your-file18-monorepo-demo.com",
  },
];

export const skills = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "Tailwind CSS",
  "GraphQL",
  "REST APIs",
  "PostgreSQL",
  "Kafka",
  "Redis",
  "GCP",
  "AWS",
  "CI/CD",
  "Cypress",
  "LangGraph",
  "RAG",
  "OpenAI",
];

export const groupedSkills = [
  {
    category: "Frontend",
    icon: "Layout",
    skills: ["React JS", "Redux", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "Database",
    skills: ["NodeJS", "REST APIs", "Express", "NestJS", "PostgreSQL"],
  },
  {
    category: "Infrastructure / Cloud",
    icon: "Cloud",
    skills: ["AWS", "GCP", "Terraform", "CI/CD", "Docker"],
  },
  {
    category: "AI / LLM",
    icon: "Sparkles",
    skills: ["Chat Completions APIs", "Context Window Optimization", "Token Efficiency", "Agentic Coding Workflows", "LangGraph", "RAG"],
  },
];
