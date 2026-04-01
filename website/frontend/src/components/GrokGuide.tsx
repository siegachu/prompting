import CopyableCode from "./CopyableCode";

export default function GrokGuide() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#1da1f2" }}>
          Grok — xAI
        </h2>
        <p className="text-[#b0b0b0]">
          Best for: real-time X/Twitter data, current events, unfiltered analysis,
          web search. Models: Grok-4 (flagship with search tools).
        </p>
      </section>

      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-xl font-bold mb-4">What Makes Grok Different</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Native X/Twitter Search", desc: "The ONLY model with direct access to X/Twitter data. Search posts, trending topics, and user sentiment in real-time. Invaluable for market sentiment analysis." },
            { title: "Real-Time Web Search", desc: "Built-in web search returns current data, not training cutoff knowledge. Great for breaking news, recent events, and live data." },
            { title: "DeepSearch Mode", desc: "Grok's equivalent of deep research — performs multi-step search, synthesizes findings, and produces comprehensive reports with citations." },
            { title: "Direct / Unfiltered Style", desc: "Less guardrailed than Claude or ChatGPT. Gives direct opinions when asked, doesn't hedge as much. Useful when you want frank assessments." },
          ].map((f) => (
            <div key={f.title} className="bg-[#141414] rounded-lg p-4">
              <h4 className="font-bold mb-1">{f.title}</h4>
              <p className="text-sm text-[#b0b0b0]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Grok-Optimized Prompt Patterns</h3>

        <PromptCard
          title="Pattern 1: X/Twitter Sentiment Analysis"
          desc="Leverage Grok's unique X access for real-time market sentiment."
          prompt={`Search X/Twitter for posts about $NVDA from the last 24 hours.

Analyze:
1. Overall sentiment: bullish vs bearish ratio
2. Top 5 most-engaged posts (by likes/reposts)
3. Key themes being discussed
4. Notable accounts weighing in (analysts, insiders, institutions)
5. Any rumors or breaking news not yet in mainstream media

Present as a sentiment dashboard with confidence levels.`}
        />

        <PromptCard
          title="Pattern 2: Breaking News Research"
          desc="Use web + X search together for comprehensive current event coverage."
          prompt={`Search the web and X for the latest on the Fed meeting today.

I need:
1. Decision announced (rate change, hold, etc.)
2. Key language changes from the statement
3. Market reaction (S&P 500, 10Y yield, USD) within first hour
4. Real-time trader reactions from X/Twitter
5. Consensus on next meeting expectations

Focus on information from the last 4 hours only.`}
        />

        <PromptCard
          title="Pattern 3: Competitive Intelligence"
          desc="Use Grok's web + X to monitor competitor activity in real-time."
          prompt={`Search for recent activity from [CompetitorName]:

1. Recent product announcements or launches (last 30 days)
2. Hiring signals — check their careers page and LinkedIn posts on X
3. Customer complaints or praise trending on X
4. Any regulatory filings or legal actions
5. Executive social media activity (statements, conference appearances)

Compile into a competitive intelligence brief with source links.`}
        />

        <PromptCard
          title="Pattern 4: DeepSearch for Research"
          desc="Enable DeepSearch for multi-step, comprehensive research reports."
          prompt={`[Enable DeepSearch mode]

Research the current state of quantum computing
applications in finance.

Cover:
1. Which banks/funds are actively using quantum computing
2. Specific use cases in production (not just research)
3. Performance benchmarks vs classical computing
4. Timeline for practical quantum advantage in portfolio optimization
5. Key players (hardware: IBM, Google, IonQ; software: firms building on top)

I need citations for every claim.`}
        />
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4">When to Use Grok vs Others</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#141414]">
                <th className="text-left p-3 border border-[#2a2a3e]">Scenario</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Grok</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Alternative</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Real-time X sentiment", "Best", "No alternative", "Grok is the only option"],
                ["Breaking news", "Best", "Gemini (Google News)", "Grok for social, Gemini for mainstream"],
                ["Historical research", "Okay", "Claude or Gemini", "Use Claude for depth, Gemini for breadth"],
                ["Code generation", "Basic", "Claude", "Always use Claude for code"],
                ["Financial data", "Good", "Dedicated APIs", "Grok for context, APIs for numbers"],
              ].map(([scenario, grok, alt, verdict], i) => (
                <tr key={i} className="border-b border-[#2a2a3e] hover:bg-[#141414]">
                  <td className="p-3 border border-[#2a2a3e] font-medium">{scenario}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center">{grok}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center text-[#b0b0b0]">{alt}</td>
                  <td className="p-3 border border-[#2a2a3e] text-[#b0b0b0]">{verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4">Pro Tips</h3>
        <div className="space-y-3">
          <div className="tip-card tip-do">
            <strong>Use X search for market sentiment before earnings.</strong> Grok can scan
            thousands of posts to gauge retail and institutional sentiment before a big announcement.
          </div>
          <div className="tip-card tip-do">
            <strong>Combine web + X search in one prompt.</strong> Grok can use both tools
            simultaneously for the most comprehensive real-time picture.
          </div>
          <div className="tip-card tip-do">
            <strong>Ask for specific account types.</strong> &quot;Show me posts from verified analysts
            and fund managers&quot; filters signal from noise.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t use Grok for complex code.</strong> It&apos;s not optimized for large
            codebase understanding. Use Claude or ChatGPT instead.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t rely solely on X for factual claims.</strong> X data is noisy. Always
            cross-reference Grok&apos;s X findings with Gemini or Claude for verification.
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
