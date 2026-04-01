"use client";

import { useState, useCallback } from "react";
import type { Article } from "@/data/articles";

const modelColors: Record<string, string> = {
  Claude: "#d97706",
  ChatGPT: "#10a37f",
  Gemini: "#4285f4",
  Grok: "#1da1f2",
  DeepSeek: "#7c3aed",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-[#2a2a3e] text-[#b0b0b0] hover:text-white hover:bg-[#3a3a5e] transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function renderContent(content: string) {
  // Split on code blocks: ```...```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, i) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const code = part.slice(3, -3).trim();
      return (
        <div key={i} className="relative my-4">
          <pre className="bg-[#0d0d0d] border border-[#2a2a3e] rounded-lg p-4 overflow-x-auto text-sm text-[#e8e8e8] leading-relaxed">
            <code>{code}</code>
          </pre>
          <CopyButton text={code} />
        </div>
      );
    }

    // Render markdown-style bold and paragraphs
    const paragraphs = part.split("\n\n").filter((p) => p.trim());
    return paragraphs.map((para, j) => {
      const rendered = para.split(/(\*\*.*?\*\*)/g).map((segment, k) => {
        if (segment.startsWith("**") && segment.endsWith("**")) {
          return (
            <strong key={k} className="text-white font-semibold">
              {segment.slice(2, -2)}
            </strong>
          );
        }
        return <span key={k}>{segment}</span>;
      });

      return (
        <p
          key={`${i}-${j}`}
          className="text-[#b0b0b0] leading-relaxed mb-4"
        >
          {rendered}
        </p>
      );
    });
  });
}

export default function ArticleView({
  article,
  onBack,
}: {
  article: Article;
  onBack: () => void;
}) {
  const badgeColor = modelColors[article.bestModel] || "#888";

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="text-sm text-[#808080] hover:text-white transition-colors mb-6 flex items-center gap-1"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 12L6 8l4-4" />
        </svg>
        Back to articles
      </button>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              backgroundColor: `${badgeColor}22`,
              color: badgeColor,
              border: `1px solid ${badgeColor}44`,
            }}
          >
            Best Model: {article.bestModel}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          {article.title}
        </h1>
        <p className="text-[#808080] mt-3 text-base">{article.metaDescription}</p>
      </header>

      <div className="space-y-8">
        {article.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-[#808080] text-sm font-normal">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </h2>
            <div>{renderContent(section.content)}</div>
          </section>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-[#2a2a3e]">
        <button
          onClick={onBack}
          className="text-sm text-[#808080] hover:text-white transition-colors flex items-center gap-1"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
          Back to articles
        </button>
      </div>
    </div>
  );
}
