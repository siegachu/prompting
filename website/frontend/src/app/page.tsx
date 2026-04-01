"use client";

import { useState, useEffect, useCallback } from "react";
import Overview from "@/components/Overview";
import ClaudeGuide from "@/components/ClaudeGuide";
import GeminiGuide from "@/components/GeminiGuide";
import GrokGuide from "@/components/GrokGuide";
import ChatGPTGuide from "@/components/ChatGPTGuide";
import DeepSeekGuide from "@/components/DeepSeekGuide";
import CLIGuide from "@/components/CLIGuide";
import Techniques from "@/components/Techniques";
import PromptBuilder from "@/components/PromptBuilder";
import BeforeAfter from "@/components/BeforeAfter";
import LearningPaths from "@/components/LearningPaths";
import ArticleIndex from "@/components/ArticleIndex";
import ArticleView from "@/components/Articles";
import { articles } from "@/data/articles";

const tabs = [
  { id: "tools", label: "Tools", color: "#f59e0b" },
  { id: "techniques", label: "Techniques", color: "#f59e0b" },
  { id: "overview", label: "Overview", color: "#e8e8e8" },
  { id: "articles", label: "Articles", color: "#ec4899" },
  { id: "claude", label: "Claude", color: "#d97706" },
  { id: "gemini", label: "Gemini", color: "#4285f4" },
  { id: "grok", label: "Grok", color: "#1da1f2" },
  { id: "chatgpt", label: "ChatGPT", color: "#10a37f" },
  { id: "deepseek", label: "DeepSeek", color: "#7c3aed" },
  { id: "cli", label: "CLI Tools", color: "#22c55e" },
  { id: "contact", label: "Contact Us", color: "#f43f5e" },
];

const validTabIds = new Set(tabs.map((t) => t.id));

export default function Home() {
  const [activeTab, setActiveTab] = useState("tools");
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [articleSlug, setArticleSlug] = useState<string | null>(null);

  // Hash routing: read hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("article-")) {
      const slug = hash.replace("article-", "");
      if (articles.find((a) => a.id === slug)) {
        setActiveTab("articles");
        setArticleSlug(slug);
        return;
      }
    }
    if (hash && validTabIds.has(hash)) {
      setActiveTab(hash);
    }
    const onHashChange = () => {
      const h = window.location.hash.replace("#", "");
      if (h.startsWith("article-")) {
        const slug = h.replace("article-", "");
        if (articles.find((a) => a.id === slug)) {
          setActiveTab("articles");
          setArticleSlug(slug);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
      if (h && validTabIds.has(h)) {
        setActiveTab(h);
        setArticleSlug(null);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Hash routing: update hash on tab change
  const switchTab = useCallback((id: string) => {
    setActiveTab(id);
    setArticleSlug(null);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Detect if tab bar is scrollable (mobile hint)
  useEffect(() => {
    const nav = document.getElementById("tab-nav");
    if (nav) {
      const check = () => setShowScrollHint(nav.scrollWidth > nav.clientWidth);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <Overview />;
      case "techniques": return <Techniques />;
      case "claude": return <ClaudeGuide />;
      case "gemini": return <GeminiGuide />;
      case "grok": return <GrokGuide />;
      case "chatgpt": return <ChatGPTGuide />;
      case "deepseek": return <DeepSeekGuide />;
      case "cli": return <CLIGuide />;
      case "tools": return (
        <div className="space-y-12">
          <PromptBuilder />
          <BeforeAfter />
          <LearningPaths />
        </div>
      );
      case "articles": {
        const selectedArticle = articleSlug
          ? articles.find((a) => a.id === articleSlug)
          : null;
        if (selectedArticle) {
          return (
            <ArticleView
              article={selectedArticle}
              onBack={() => {
                setArticleSlug(null);
                window.location.hash = "articles";
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          );
        }
        return (
          <ArticleIndex
            onSelectArticle={(slug) => {
              setArticleSlug(slug);
              window.location.hash = `article-${slug}`;
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );
      }
      case "contact": return (
        <div className="max-w-2xl mx-auto text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-[#b0b0b0] mb-6">
            For all questions or comments, please reach out to{" "}
            <a
              href="mailto:info@askairight.com"
              className="text-[#f43f5e] hover:underline"
            >
              info@askairight.com
            </a>
          </p>
          <p className="text-sm text-[#808080]">
            Ask It Right — AI prompting guides and tools.
          </p>
        </div>
      );
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
      >
        Skip to content
      </a>

      {/* Header */}
      <header className="border-b border-[#2a2a3e] bg-[#0d0d0d] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                AI Prompting Guide
              </h1>
              <p className="text-sm text-[#b0b0b0] mt-1 hidden sm:block">
                Ask It Right — Which model, which prompt, best results
              </p>
            </div>
            <a
              href="/professional_tools"
              className="text-sm text-[#b0b0b0] hover:text-white transition-colors hidden sm:block"
            >
              Find specialized AI tools just for you →
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 relative">
          <nav
            id="tab-nav"
            role="tablist"
            aria-label="Guide sections"
            className="flex gap-1 overflow-x-auto pb-0 -mb-px scrollbar-hide"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => switchTab(tab.id)}
                className={`px-3 sm:px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-t-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:ring-offset-1 focus:ring-offset-[#0d0d0d] ${
                  activeTab === tab.id
                    ? "text-white bg-[#1a1a2e]"
                    : "text-[#b0b0b0] hover:text-white hover:bg-[#141414]"
                }`}
                style={
                  activeTab === tab.id
                    ? { borderBottom: `2px solid ${tab.color}` }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </nav>
          {/* Scroll hint gradient for mobile */}
          {showScrollHint && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0d0d0d] to-transparent pointer-events-none sm:hidden" />
          )}
        </div>
      </header>

      {/* Content */}
      <main
        id="main-content"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        {renderContent()}
      </main>

      {/* Back to top */}
      <BackToTop />

      {/* Footer */}
      <footer className="border-t border-[#2a2a3e] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[#b0b0b0]">
          <p>
            Built with insights from MoE research consensus (Claude + Grok +
            Gemini + DeepSeek + Cerebras)
          </p>
          <p className="mt-1">
            For comments and questions, reach out to{" "}
            <a href="mailto:info@askairight.com" className="text-[#f43f5e] hover:underline">
              info@askairight.com
            </a>
          </p>
          <p className="mt-3 text-[#808080] text-xs">
            Explore our other sites:{" "}
            <a href="https://quotedtruth.com" className="text-[#b0b0b0] hover:text-white transition">Quoted Truth</a>
            {" | "}
            <a href="https://firstdoorkey.com" className="text-[#b0b0b0] hover:text-white transition">First Door Key</a>
            {" | "}
            <a href="https://stock.rsfundmanagement.com" className="text-[#b0b0b0] hover:text-white transition">Stock Research</a>
          </p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} Ask It Right
          </p>
          <p className="mt-1 text-[#808080] text-xs">
            Last updated: March 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#1a1a2e] border border-[#2a2a3e] text-[#b0b0b0] hover:text-white hover:bg-[#22223a] transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4]"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 16V4M4 10l6-6 6 6" />
      </svg>
    </button>
  );
}
