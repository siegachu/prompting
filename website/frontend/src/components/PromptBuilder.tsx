"use client";

import { useState } from "react";

const models = ["Claude", "Gemini", "Grok", "ChatGPT", "DeepSeek"] as const;

const techniques: Record<string, (goal: string, model: string) => string> = {
  "Zero-shot": (goal) =>
    `${goal}\n\nProvide a clear, detailed answer.`,
  "Few-shot": (goal) =>
    `Here are examples of good responses:\n\nExample 1: [User asks a clear question] -> [Detailed, structured answer]\nExample 2: [User gives context first] -> [Tailored, specific answer]\n\nNow, following that same quality:\n${goal}`,
  "Chain of Thought": (goal) =>
    `${goal}\n\nThink through this step-by-step:\n1. First, identify the key aspects of the question\n2. Then, analyze each aspect\n3. Finally, synthesize into a complete answer\n\nShow your reasoning at each step.`,
  "Role-playing": (goal, model) =>
    `You are an expert consultant with deep knowledge in this area. A client has come to you with the following request:\n\n${goal}\n\nAs a seasoned ${model} expert, provide your professional analysis and recommendations.`,
  "Structured Output": (goal) =>
    `${goal}\n\nFormat your response as:\n## Summary\n[Brief overview]\n\n## Key Points\n- [Point 1]\n- [Point 2]\n- [Point 3]\n\n## Detailed Analysis\n[In-depth response]\n\n## Recommendations\n[Actionable next steps]`,
  "Constraints": (goal) =>
    `${goal}\n\nConstraints:\n- Be concise (under 300 words)\n- Use simple language (explain as if to a smart 12-year-old)\n- Include at least one concrete example\n- Avoid jargon unless you define it`,
};

export default function PromptBuilder() {
  const [goal, setGoal] = useState("");
  const [model, setModel] = useState<string>(models[0]);
  const [technique, setTechnique] = useState<string>("Zero-shot");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const buildPrompt = () => {
    if (!goal.trim()) return;
    setOutput(techniques[technique](goal.trim(), model));
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-bold">Interactive Prompt Builder</h3>
      <p className="text-[#b0b0b0]">
        Type your goal, pick a model and technique, and get an improved prompt you can copy and paste.
      </p>

      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="What do you want the AI to help with? e.g. 'Help me write a cover letter for a software engineering role'"
        className="w-full h-28 p-3 rounded-lg bg-[#141414] border border-[#2a2a3e] text-white placeholder-[#606060] resize-none focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
      />

      <div className="flex flex-wrap gap-3">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[#141414] border border-[#2a2a3e] text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
        >
          {models.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <select
          value={technique}
          onChange={(e) => setTechnique(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[#141414] border border-[#2a2a3e] text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
        >
          {Object.keys(techniques).map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <button
          onClick={buildPrompt}
          disabled={!goal.trim()}
          className="px-5 py-2 rounded-lg font-medium bg-[#f59e0b] text-black hover:bg-[#d97706] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Build Prompt
        </button>
      </div>

      {output && (
        <div className="relative rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] p-4">
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 px-3 py-1 text-xs rounded bg-[#2a2a3e] text-[#b0b0b0] hover:text-white hover:bg-[#3a3a4e] transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <pre className="whitespace-pre-wrap text-sm text-[#e0e0e0] pr-16 font-mono">{output}</pre>
        </div>
      )}
    </section>
  );
}
