"use client";

import { useState, useRef, useEffect } from "react";
import {
  LuMessageSquare,
  LuX,
  LuSend,
  LuSparkles,
  LuUser,
  LuBot,
  LuTrash2,
} from "react-icons/lu";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  source?: string;
  isError?: boolean;
};

let msgCounter = 0;
function createMessageId(prefix: string): string {
  msgCounter += 1;
  return `${prefix}-${msgCounter}-${Math.random().toString(36).substring(2, 7)}`;
}

function getFormattedTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const initialSuggestedPrompts = [
  "Tell me about your AI projects",
  "How does your AI PR Review Platform work?",
  "What is your AI Platform architecture?",
  "Which projects use RAG?",
  "Tell me about your Model Regression Detection system",
  "What technologies do you specialize in?",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Hi! I'm Rishank's AI assistant. Ask me anything about his AI engineering platforms, distributed architectures, tech stack, or live applications.",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: createMessageId("user"),
      role: "user",
      content: query,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: createMessageId("assistant"),
        role: "assistant",
        content: data.content || "I received your message, but no response was returned.",
        timestamp: getFormattedTime(),
        source: data.source,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: createMessageId("error"),
        role: "assistant",
        content: "Sorry, I encountered a temporary connection issue. Please try again or reach out directly to Rishank.",
        timestamp: getFormattedTime(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: createMessageId("welcome"),
        role: "assistant",
        content:
          "Conversation cleared. How can I help you explore Rishank's engineering background or projects?",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-600 text-white shadow-xl shadow-accent-500/30 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-ink-950"
        aria-label={isOpen ? "Close AI Chatbot" : "Open AI Chatbot"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <LuX className="h-6 w-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            <LuMessageSquare className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
            </span>
          </div>
        )}
      </button>

      {/* Chat Window Dialog */}
      <div
        role="dialog"
        aria-label="AI Portfolio Assistant"
        aria-modal="false"
        className={`fixed bottom-20 right-4 z-50 flex h-[540px] max-h-[82vh] w-[calc(100vw-2rem)] max-w-[400px] flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 sm:bottom-24 sm:right-6 sm:w-[420px] dark:border-white/10 dark:bg-[#101216] ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
              <LuSparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">AI Portfolio Assistant</h3>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Grounded on verified engineering projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              aria-label="Clear chat conversation"
              title="Clear conversation"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-200/60 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <LuTrash2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat window"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-200/60 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <LuX className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  m.role === "user"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "bg-accent-500/10 text-accent-600 dark:text-accent-400"
                }`}
              >
                {m.role === "user" ? <LuUser className="h-3.5 w-3.5" /> : <LuBot className="h-3.5 w-3.5" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                  m.role === "user"
                    ? "bg-accent-600 text-white rounded-tr-xs shadow-sm"
                    : m.isError
                    ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:border-red-900/40 dark:text-red-300 rounded-tl-xs"
                    : "bg-slate-100 text-slate-800 dark:bg-white/5 dark:text-slate-200 rounded-tl-xs"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
                <div className="mt-1 flex items-center justify-between gap-2 text-[10px] opacity-70">
                  <span>{m.timestamp}</span>
                  {m.source === "ai-platform" && (
                    <span className="font-mono text-[9px] text-accent-500">AI Platform</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-500/10 text-accent-500">
                <LuBot className="h-3.5 w-3.5" />
              </div>
              <div className="rounded-2xl rounded-tl-xs bg-slate-100 px-4 py-2.5 text-xs text-slate-700 dark:bg-white/5 dark:text-slate-300 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          {/* Starter Prompts */}
          {messages.length <= 1 && (
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Suggested questions:
              </p>
              <div className="flex flex-col gap-1.5">
                {initialSuggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-left rounded-lg border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-accent-500/40 hover:bg-accent-500/5 hover:text-accent-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-accent-400/30 dark:hover:text-accent-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="border-t border-slate-200 bg-slate-50/50 p-3.5 dark:border-white/10 dark:bg-white/[0.01]"
        >
          <div className="relative flex items-center">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about AI platforms, RAG, skills..."
              disabled={isLoading}
              maxLength={500}
              aria-label="Ask about Rishank's projects or experience"
              className="w-full resize-none rounded-xl border border-slate-300 bg-white py-2.5 pl-3.5 pr-11 text-xs text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 dark:border-white/15 dark:bg-ink-900 dark:text-white dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-accent-600 text-white transition hover:bg-accent-500 disabled:opacity-40"
            >
              <LuSend className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
            <span>Enter to send • Shift+Enter for newline</span>
            <span>{input.length}/500</span>
          </div>
        </form>
      </div>
    </>
  );
}
