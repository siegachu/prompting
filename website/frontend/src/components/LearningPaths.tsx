"use client";

import { useState, useEffect } from "react";

const tracks = [
  {
    title: "Beginner",
    color: "#22c55e",
    items: [
      { label: "Read the Overview to understand what each AI does best", tab: "overview" },
      { label: "Try asking a simple question to any AI (no technique needed)", tab: "overview" },
      { label: "Learn why the same prompt gives different results on different models", tab: "overview" },
      { label: "Explore the ChatGPT guide for everyday tasks", tab: "chatgpt" },
    ],
  },
  {
    title: "Intermediate",
    color: "#f59e0b",
    items: [
      { label: "Master prompting techniques: Chain of Thought, Few-shot, and more", tab: "techniques" },
      { label: "Learn Claude's strengths for writing and coding tasks", tab: "claude" },
      { label: "Use Gemini with Google Search for research with sources", tab: "gemini" },
      { label: "Try Grok for real-time social media and news analysis", tab: "grok" },
      { label: "Use DeepSeek for math, logic, and data analysis", tab: "deepseek" },
    ],
  },
  {
    title: "Advanced",
    color: "#f43f5e",
    items: [
      { label: "Set up CLI tools (Claude Code, Gemini CLI) for file-level work", tab: "cli" },
      { label: "Combine multiple AIs for important decisions (multi-model strategy)", tab: "techniques" },
      { label: "Write system prompts that shape AI behavior from the start", tab: "claude" },
      { label: "Use the Prompt Builder above to practice different techniques", tab: "tools" },
    ],
  },
];

const STORAGE_KEY = "askairight-learning-progress";

export default function LearningPaths() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-bold">Learning Paths</h3>
      <p className="text-[#b0b0b0]">Follow a track from beginner to advanced. Check off items as you go -- progress is saved in your browser.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tracks.map((track) => {
          const done = track.items.filter((_, i) => checked[`${track.title}-${i}`]).length;
          return (
            <div key={track.title} className="rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold" style={{ color: track.color }}>{track.title}</h4>
                <span className="text-xs text-[#808080]">{done}/{track.items.length}</span>
              </div>
              <div className="w-full h-1.5 rounded bg-[#2a2a3e] mb-4">
                <div className="h-1.5 rounded transition-all" style={{ width: `${(done / track.items.length) * 100}%`, backgroundColor: track.color }} />
              </div>
              <ul className="space-y-2">
                {track.items.map((item, i) => {
                  const key = `${track.title}-${i}`;
                  return (
                    <li key={key} className="flex items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={!!checked[key]}
                        onChange={() => toggle(key)}
                        className="mt-0.5 accent-[#f59e0b] cursor-pointer"
                      />
                      <a
                        href={`#${item.tab}`}
                        className="text-[#b0b0b0] hover:text-white hover:underline transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
