// Simple in-memory rate limiter per IP
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

// Grounded fallback answer engine when upstream AI Platform is offline or during testing
function generateGroundedFallback(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes("pr review") || query.includes("code review") || query.includes("github app")) {
    return "The **AI PR Review Platform** (live at https://ai-pr-review.rishankkesarwani.com) is an automated code review system built with Next.js 15, NestJS, and BullMQ. It intercepts GitHub Pull Request webhooks, performs AST changed-file static analysis, runs multi-agent AI code reviews with finding arbitration to reduce noise, and posts automated GitHub Check annotations and inline comments.";
  }

  if (query.includes("regression") || query.includes("model regression") || query.includes("benchmark") || query.includes("eval")) {
    return "The **AI Model Regression Detection** platform (live at https://model-regression.rishankkesarwani.com) is an automated evaluation framework. It benchmarks prompt changes and candidate LLMs against golden datasets, checking for Quality, Latency, Token Cost, and Safety regressions. It generates statistical PASS/WARN/FAIL reports and serves as an automated CI/CD gate.";
  }

  if (query.includes("ai platform") || query.includes("infrastructure") || query.includes("architecture")) {
    return "The **AI Platform** (https://github.com/rishank-kesarwani/ai-platform) is a centralized NestJS microservice that unifies AI capabilities for all ecosystem applications. It features a POST /api/v1/ai/chat gateway, hybrid RAG over Qdrant vector databases, Redis semantic caching for sub-millisecond repeated queries, ephemeral & persistent memory tiers, and service-to-service API key authentication.";
  }

  if (query.includes("rag") || query.includes("retrieval") || query.includes("vector") || query.includes("qdrant")) {
    return "Rishank leverages **RAG (Retrieval-Augmented Generation)** across multiple projects:\n1. **AI Platform**: Hybrid RAG using Qdrant vector database and embeddings.\n2. **Network18 Article Assistant**: LangGraph cyclic state machine with ChromaDB vector search over verified journalistic archives.\n3. **AI Travel Planner**: Destination and activity retrieval augmented with Travelpayouts inventory.";
  }

  if (query.includes("travel") || query.includes("trip") || query.includes("itinerary")) {
    return "The **AI Travel Planner** (live at https://travel-planner.rishankkesarwani.com) is a full-stack Next.js and NestJS application. It uses a LangGraph multi-agent workflow to build customized multi-day travel itineraries, manages asynchronous background jobs with BullMQ and Redis, and integrates Travelpayouts affiliate monetization (Marker #579629).";
  }

  if (query.includes("tech") || query.includes("skill") || query.includes("stack") || query.includes("specializ")) {
    return "Rishank specializes in **Full-Stack, AI & Distributed Systems Engineering** with 8+ years of production experience:\n- **AI & LLMs**: RAG Architectures, LangGraph, Qdrant, ChromaDB, Semantic Caching, Evaluation.\n- **Frontend**: React 19, Next.js 15 App Router, TypeScript, Webpack Module Federation, Tailwind CSS.\n- **Backend**: Node.js, NestJS, REST & GraphQL APIs, Temporal Workflows.\n- **Distributed Systems**: Apache Kafka, BullMQ, Redis, PostgreSQL, Docker, GCP.";
  }

  if (query.includes("movie") || query.includes("sports") || query.includes("study") || query.includes("hiking")) {
    return "Rishank's live public applications include:\n- **AI Movie Matcher** (https://movie-matcher.rishankkesarwani.com) - Mood-based conversational cinema discovery.\n- **AI Sports Tracker** (https://sports-tracker.rishankkesarwani.com) - Athletic fixtures, timelines, and AI match summaries.\n- **AI Study Spot Finder** (https://study-spot-finder.rishankkesarwani.com) - Geolocation study space discovery with amenity filters.\n- **AI Hiking Explorer** (https://hiking-explorer.rishankkesarwani.com) - Trail terrain analytics and AI preparedness advisories.";
  }

  if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("reach")) {
    return "You can reach Rishank directly via email at **rishankkesar111@gmail.com** or through the Contact section on this website. He is open to discussions regarding senior full-stack, AI engineering, and distributed architecture roles.";
  }

  return "I'm Rishank's AI portfolio assistant. Rishank is a Full-Stack & AI Systems Engineer with 8+ years of experience building production AI workflows (AI PR Review Platform, Model Regression Detection, Centralized AI Platform, Travel Planner) and distributed microservices with Next.js, NestJS, Kafka, Redis, and GCP. Feel free to ask about his AI architecture, specific projects, or technical skills!";
}

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. Please wait a moment before sending another message.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const userMessage: string =
      typeof body?.message === "string"
        ? body.message.trim()
        : Array.isArray(body?.messages)
        ? body.messages[body.messages.length - 1]?.content || ""
        : "";

    if (!userMessage || userMessage.length === 0) {
      return new Response(JSON.stringify({ error: "A valid message is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (userMessage.length > 500) {
      return new Response(
        JSON.stringify({ error: "Message exceeds maximum allowed length of 500 characters." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const aiPlatformUrl =
      process.env.AI_PLATFORM_BASE_URL ||
      process.env.AI_PLATFORM_URL ||
      "";
    const aiPlatformKey =
      process.env.AI_PLATFORM_PORTFOLIO_API_KEY ||
      process.env.AI_SERVICE_API_KEY ||
      "";

    // If AI Platform is configured, route the request to the centralized platform
    if (aiPlatformUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7500); // 7.5s timeout

        const platformResponse = await fetch(`${aiPlatformUrl.replace(/\/$/, "")}/api/v1/ai/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": aiPlatformKey,
          },
          body: JSON.stringify({
            applicationId: "portfolio",
            tenantId: "portfolio-public",
            message: userMessage,
            useRag: true,
            useMemory: false,
            cacheable: true,
            temperature: 0.3,
            metadata: {
              source: "portfolio-chatbot",
              clientIp,
            },
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (platformResponse.ok) {
          const data = await platformResponse.json();
          const responseText =
            data?.response || data?.message || data?.content || (typeof data === "string" ? data : "");

          if (responseText) {
            return new Response(
              JSON.stringify({
                role: "assistant",
                content: responseText,
                source: "ai-platform",
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }
        }
      } catch (upstreamError) {
        console.warn("Upstream AI Platform call failed, falling back to grounded knowledge base:", upstreamError);
      }
    }

    // Grounded fallback response from portfolio knowledge base
    const fallbackResponse = generateGroundedFallback(userMessage);

    return new Response(
      JSON.stringify({
        role: "assistant",
        content: fallbackResponse,
        source: "portfolio-knowledge-base",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        role: "assistant",
        content:
          "I'm currently unable to generate a response. Please feel free to explore the projects section or reach out to Rishank directly at rishankkesar111@gmail.com.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
