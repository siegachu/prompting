import CopyableCode from "./CopyableCode";

export default function GeminiGuide() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#4285f4" }}>
          Gemini — Google
        </h2>
        <p className="text-[#b0b0b0]">
          Best for: Google-grounded research, multimodal tasks, long documents (1M+ tokens),
          and free-tier heavy usage. Models: 2.5 Pro (best), 2.5 Flash (fast/cheap).
        </p>
      </section>

      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-xl font-bold mb-4">What Makes Gemini Different</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Google Search Grounding", desc: "Native integration with Google Search. Responses include real-time web data with source citations. No other model has this depth of search integration." },
            { title: "1M+ Token Context", desc: "The largest context window available. Upload entire codebases, books, or hours of video. Gemini handles ultra-long contexts better than any competitor." },
            { title: "True Multimodal", desc: "Natively processes images, video, audio, and code together. Upload a screenshot and ask questions about it — no preprocessing needed." },
            { title: "Generous Free Tier", desc: "Free tier includes 2.5 Flash with Google Search. Best option for high-volume, non-critical tasks where you want web grounding." },
          ].map((f) => (
            <div key={f.title} className="bg-[#141414] rounded-lg p-4">
              <h4 className="font-bold mb-1">{f.title}</h4>
              <p className="text-sm text-[#b0b0b0]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Gemini-Optimized Prompt Patterns</h3>

        <PromptCard
          title="Pattern 1: Google-Grounded Research"
          desc="Leverage Gemini's native Google Search for real-time, cited responses."
          prompt={`Search for the latest information on NVIDIA's Q1 2026 earnings results.

Include:
- Revenue and EPS (actual vs estimates)
- Data center segment performance
- Management guidance for Q2
- Analyst reaction and price target changes

Cite your sources with URLs.`}
        />

        <PromptCard
          title="Pattern 2: Multimodal Analysis"
          desc="Upload images, charts, or screenshots alongside text prompts."
          prompt={`[Attach: quarterly_revenue_chart.png]

Analyze this revenue chart and answer:
1. What is the overall trend (growing, flat, declining)?
2. Which quarters show the largest QoQ changes?
3. Are there any seasonal patterns visible?
4. Based on the trend, what would you project for Q3?

Return analysis as a structured summary with numbers.`}
        />

        <PromptCard
          title="Pattern 3: Long Document Processing"
          desc="Use Gemini's 1M token context for massive documents."
          prompt={`[Paste entire 300-page 10-K filing]

You have the complete annual report above.

Extract the following into a structured summary:
1. Revenue breakdown by segment (table format)
2. Top 5 risk factors by severity
3. Related party transactions
4. Off-balance-sheet arrangements
5. Changes in accounting policies from prior year

For each item, include the specific page/section reference.`}
        />

        <PromptCard
          title="Pattern 4: Thinking Mode (2.5 Pro)"
          desc="Enable Gemini's reasoning mode for complex analysis."
          prompt={`Think carefully about this problem before answering.

A SaaS company shows:
- ARR: $50M growing 40% YoY
- Net revenue retention: 130%
- Gross margin: 75%
- Rule of 40 score: 55
- CAC payback: 18 months

However, their largest customer (15% of ARR) just announced
they're building an in-house alternative.

Model three scenarios (optimistic, base, pessimistic) for
next 12 months. Include the impact on each metric above.`}
        />

        <PromptCard
          title="Pattern 5: Video/Audio Analysis"
          desc="Gemini can process uploaded video and audio files directly."
          prompt={`[Upload: earnings_call_recording.mp3]

Transcribe and analyze this earnings call recording.

Create:
1. Key quotes from the CEO (with timestamps)
2. Analyst questions that seemed to make management uncomfortable
3. Forward-looking statements and guidance numbers
4. Tone analysis: confident, defensive, evasive, or neutral

Flag any statements that conflict with the written press release.`}
        />
      </section>

      {/* Model Selection */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Which Gemini Model?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#141414]">
                <th className="text-left p-3 border border-[#2a2a3e]">Model</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Best For</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Context</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2a2a3e]">
                <td className="p-3 border border-[#2a2a3e] font-bold text-[#4285f4]">2.5 Pro</td>
                <td className="p-3 border border-[#2a2a3e]">Complex reasoning, research, analysis</td>
                <td className="p-3 border border-[#2a2a3e]">1M tokens</td>
                <td className="p-3 border border-[#2a2a3e]">Medium</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#2a2a3e] font-bold text-[#4285f4]">2.5 Flash</td>
                <td className="p-3 border border-[#2a2a3e]">Fast tasks, high volume, free tier</td>
                <td className="p-3 border border-[#2a2a3e]">1M tokens</td>
                <td className="p-3 border border-[#2a2a3e]">Fast</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4">Pro Tips</h3>
        <div className="space-y-3">
          <div className="tip-card tip-do">
            <strong>Use Google Search grounding for any factual question.</strong> Gemini with
            search enabled produces cited, verifiable answers. Always enable it for research tasks.
          </div>
          <div className="tip-card tip-do">
            <strong>Upload files directly instead of pasting.</strong> Gemini handles PDFs, images,
            video, and audio natively. Direct upload preserves formatting better than copy-paste.
          </div>
          <div className="tip-card tip-do">
            <strong>Use Thinking mode for complex analysis.</strong> Gemini 2.5 Pro with thinking
            enabled competes with Claude Opus on reasoning tasks.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t trust Gemini for precise code refactoring.</strong> It&apos;s good at
            explaining and generating code but less reliable than Claude for large-scale
            systematic refactoring.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t ignore multi-part responses.</strong> When using Google Search, Gemini
            can split output across multiple parts. Check all parts — the API returns an array.
          </div>
        </div>
      </section>
    </div>
  );
}

function PromptCard({ title, desc, prompt }: { title: string; desc: string; prompt: string }) {
  return (
    <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] overflow-hidden">
      <div className="p-5">
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-sm text-[#b0b0b0] mb-3">{desc}</p>
        <CopyableCode>{prompt}</CopyableCode>
      </div>
    </div>
  );
}
