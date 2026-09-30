export type Project = {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Notification Service",
    description:
      "Organization-wide notification platform for SMS, WhatsApp, email, and push alerts with reliable Kafka-backed delivery flows.",
    image: "Notification platform",
    techStack: ["Node.js", "NestJS", "TypeScript", "Kafka", "PostgreSQL"],
  },
  {
    title: "React Plugin for CMS",
    description:
      "Multi-language WordPress CMS publishing experience built as an embedded Next.js and React application.",
    image: "CMS plugin",
    techStack: ["React", "Next.js", "Tailwind CSS", "GraphQL", "Storybook"],
  },
  {
    title: "L18 & MIS Reports",
    description:
      "Automated reporting suite saving weekly manual effort across daily and monthly editorial analytics.",
    image: "Analytics reports",
    techStack: ["Python", "Pandas", "NumPy", "Node.js", "GCP"],
  },
  {
    title: "File18 Micro-frontend",
    description:
      "Configuration-driven micro-frontend platform processing high-volume news content transactions at scale.",
    image: "Micro-frontend",
    techStack: ["React", "Webpack", "TypeScript", "JWT", "REST APIs"],
  },
  {
    title: "Network18 Article Assistant",
    description:
      "RAG chatbot that answers reader questions with grounded responses from verified published article content.",
    image: "RAG chatbot",
    techStack: ["LangGraph", "OpenAI", "ChromaDB", "Python", "React"],
  },
  {
    title: "File18 Backend Monorepo",
    description:
      "An Nx-based monorepo containing NestJS microservices for content ingestion, processing, Temporal workflows, and view personalization.",
    image: "Backend microservices",
    techStack: ["NestJS", "TypeScript", "Kafka", "Temporal", "Redis", "PostgreSQL", "GraphQL", "Nx"],
  },
];

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
  "LangGraph",
  "RAG",
  "OpenAI",
  "LLM Systems",
];

export const groupedSkills = [
  {
    category: "Frontend",
    icon: "Layout",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "Server",
    skills: ["Node.js", "NestJS", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    icon: "Database",
    skills: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    skills: ["GCP", "Docker", "CI/CD"],
  },
  {
    category: "Messaging",
    icon: "Layers",
    skills: ["Kafka"],
  },
  {
    category: "AI & LLMs",
    icon: "Sparkles",
    skills: ["LangGraph", "RAG", "OpenAI", "LLM Systems"],
  },
];
