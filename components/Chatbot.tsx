"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { useState, useRef, useEffect } from "react";
import { LuMessageCircle, LuX, LuSend, LuSparkles } from "react-icons/lu";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I'm the AI clone of Rishank. Ask me anything about his professional experience, skills, or background.",
          },
        ],
      },
    ] as UIMessage[],
  });
  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sendMessage) return;
    sendMessage({ role: "user", parts: [{ type: "text", text: input }] });
    setInput("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-600 text-white shadow-lg shadow-accent-500/30 transition-transform hover:scale-110 active:scale-95"
        aria-label="Toggle AI Chatbot"
      >
        {isOpen ? (
          <LuX className="h-6 w-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            <LuMessageCircle className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"></span>
            </span>
          </div>
        )}
      </button>

      <div
        className={`fixed bottom-6 right-6 z-50 flex h-[550px] max-h-[80vh] w-[350px] flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 sm:w-[400px] dark:border-white/10 dark:bg-[#111315] ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500">
              <LuSparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">AI Clone</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ask about Rishank&apos;s experience</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5 dark:hover:text-white transition"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-accent-600 text-white rounded-br-sm"
                    : "bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-200 rounded-bl-sm"
                }`}
              >
                {m.parts?.map((part, i) =>
                  part.type === "text" ? <span key={i}>{part.text}</span> : null
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-white/5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4 dark:border-white/10">
          <div className="relative flex items-center">
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-4 pr-12 text-sm text-slate-900 placeholder:text-slate-500 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 dark:border-white/10 dark:bg-ink-900 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-accent-500 dark:focus:ring-accent-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, experience..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-white transition hover:bg-accent-500 disabled:opacity-50"
            >
              <LuSend className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
