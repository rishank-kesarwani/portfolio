import { google } from "@ai-sdk/google";
import { streamText, createTextStreamResponse, toTextStream } from "ai";
import { projects, groupedSkills } from "@/data/portfolio";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `You are the AI clone of Rishank Kesarwani, a full-stack engineer with 8 years of experience across React, Next.js, Node.js, NestJS, cloud automation, and AI-assisted product systems.
Your goal is to answer questions about Rishank's professional experience, skills, and background concisely and accurately based ONLY on the following context.
If asked something outside this context, politely say you don't have that information but encourage them to contact Rishank directly.

Skills:
${groupedSkills.map((g) => `${g.category}: ${g.skills.join(", ")}`).join("\n")}

Projects:
${projects.map((p) => `- ${p.title}: ${p.description} (Tech: ${p.techStack.join(", ")})`).join("\n")}

Respond in a friendly, professional tone. Keep responses relatively short and easy to read.`;

  const result = streamText({
    model: google("gemini-3.6-flash"),
    system: systemPrompt,
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.parts?.map((p: any) => p.text).join("") || m.content || "",
    })),
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
