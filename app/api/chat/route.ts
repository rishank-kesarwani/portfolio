import { google } from "@ai-sdk/google";
import { streamText, createUIMessageStreamResponse, toUIMessageStream, type UIMessage } from "ai";
import { projects, groupedSkills } from "@/data/portfolio";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: UIMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are the AI clone of Rishank Kesarwani, a full-stack engineer with 8 years of experience across React, Next.js, Node.js, NestJS, cloud automation, and AI-assisted product systems.
Your goal is to answer questions about Rishank's professional experience, skills, and background concisely and accurately based ONLY on the following context.
If asked something outside this context, politely say you don't have that information but encourage them to contact Rishank directly via the contact form or email (rishankkesar111@gmail.com).

Skills:
${groupedSkills.map((g) => `${g.category}: ${g.skills.join(", ")}`).join("\n")}

Projects:
${projects.map((p) => `- ${p.title}: ${p.description} (Tech: ${p.techStack.join(", ")})`).join("\n")}

Respond in a friendly, professional tone. Keep responses relatively short and easy to read.`;

    const modelMessages = messages.map((m) => {
      let textContent = "";
      if (Array.isArray(m.parts)) {
        textContent = m.parts
          .map((p) => (p.type === "text" ? p.text : ""))
          .join("");
      } else if (typeof (m as unknown as { content?: string }).content === "string") {
        textContent = (m as unknown as { content: string }).content;
      }

      return {
        role: (m.role === "assistant" || m.role === "user" || m.role === "system" ? m.role : "user") as "user" | "assistant" | "system",
        content: textContent,
      };
    });

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages: modelMessages,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while generating a response." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
