"use client";

import { articles } from "@/data/articles";

const modelColors: Record<string, string> = {
  Claude: "#d97706",
  ChatGPT: "#10a37f",
  Gemini: "#4285f4",
  Grok: "#1da1f2",
  DeepSeek: "#7c3aed",
};

export default function ArticleIndex({
  onSelectArticle,
}: {
  onSelectArticle: (slug: string) => void;
}) {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">AI Prompting Articles</h2>
        <p className="text-[#b0b0b0] text-lg max-w-2xl mx-auto">
          Practical guides with copy-paste prompt templates for the most common
          AI tasks. Pick a topic and start getting better results immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <button
            key={article.id}
            onClick={() => onSelectArticle(article.id)}
            className="text-left bg-[#1a1a2e] rounded-xl p-6 border border-[#2a2a3e] hover:border-[#4a4a6e] transition-all hover:shadow-lg hover:shadow-black/20 group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-[#e8e8e8] pr-2 leading-tight">
                {article.title}
              </h3>
              <span
                className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                style={{
                  backgroundColor: `${modelColors[article.bestModel] || "#888"}22`,
                  color: modelColors[article.bestModel] || "#888",
                  border: `1px solid ${modelColors[article.bestModel] || "#888"}44`,
                }}
              >
                {article.bestModel}
              </span>
            </div>
            <p className="text-sm text-[#b0b0b0] leading-relaxed">
              {article.metaDescription}
            </p>
            <span className="inline-block mt-4 text-sm text-[#808080] group-hover:text-white transition-colors">
              Read article &rarr;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
