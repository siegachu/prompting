import CopyableCode from "./CopyableCode";

export default function ChatGPTGuide() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#10a37f" }}>
          ChatGPT — OpenAI
        </h2>
        <p className="text-[#b0b0b0]">
          Best for: general knowledge, creative brainstorming, GPT ecosystem (plugins/GPTs),
          image generation, function calling. Models: o3 (reasoning), GPT-4o (balanced), GPT-4o-mini (fast).
        </p>
      </section>

      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-xl font-bold mb-4">What Makes ChatGPT Different</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Largest Ecosystem", desc: "GPT Store, plugins, custom GPTs, API with function calling. The most mature ecosystem for building AI-powered workflows and applications." },
            { title: "JSON Mode", desc: "Native structured output with response_format. Guarantees valid JSON output — no parsing failures. Essential for API integrations." },
            { title: "DALL-E Image Generation", desc: "Generate images directly in conversation. Useful for mockups, diagrams, and creative content alongside text analysis." },
            { title: "o3 Reasoning", desc: "OpenAI's reasoning model. Competes with Claude Opus on complex math, coding, and logic tasks. Uses chain-of-thought internally." },
          ].map((f) => (
            <div key={f.title} className="bg-[#141414] rounded-lg p-4">
              <h4 className="font-bold mb-1">{f.title}</h4>
              <p className="text-sm text-[#b0b0b0]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">ChatGPT-Optimized Prompt Patterns</h3>

        <PromptCard
          title="Pattern 1: System Prompt + JSON Mode"
          desc="ChatGPT's strongest pattern — system prompt defines behavior, JSON mode ensures structured output."
          prompt={`System: You are a financial data extraction engine.
Extract structured data from earnings transcripts.
Always respond in valid JSON matching the provided schema.

User: Extract from this transcript:
"We achieved revenue of $8.2 billion, up 22% year over year.
Operating margin expanded to 34%, and we returned $3.1B
to shareholders through buybacks."

Schema:
{
  "revenue": { "amount": number, "currency": "USD", "yoy_growth": number },
  "operating_margin": number,
  "shareholder_returns": { "amount": number, "type": string }
}`}
        />

        <PromptCard
          title="Pattern 2: Custom GPTs for Repeated Tasks"
          desc="Create a custom GPT with persistent instructions for tasks you repeat weekly."
          prompt={`[Custom GPT Configuration]

Name: Weekly Market Analyst
Instructions:
You are a senior market analyst preparing weekly reports.
Every response must follow this structure:

1. MARKET SUMMARY (3 bullet points, max 20 words each)
2. KEY MOVERS (top 5 stocks by % change, table format)
3. SECTOR ROTATION (which sectors gained/lost flows)
4. RISK FLAGS (anything concerning for next week)
5. ACTION ITEMS (specific portfolio recommendations)

Always use current data. Cite sources.
Tone: professional, concise, no hedging.`}
        />

        <PromptCard
          title="Pattern 3: Function Calling / Tool Use"
          desc="ChatGPT excels at structured function calling for API integration."
          prompt={`System: You have access to these functions:
- get_stock_price(symbol: str) → current price
- get_financials(symbol: str, period: "annual"|"quarterly") → financial data
- calculate_dcf(cash_flows: list, discount_rate: float) → fair value

User: Analyze whether AAPL is overvalued.
Pull the latest financials, project 5-year cash flows
assuming 8% growth declining to 3% terminal,
use 10% discount rate, and compare fair value to current price.

Call the appropriate functions in order.`}
        />

        <PromptCard
          title="Pattern 4: o3 Deep Reasoning"
          desc="Use OpenAI's reasoning model for complex multi-step problems."
          prompt={`[Use o3 model]

A private equity firm is evaluating a leveraged buyout:
- Target EBITDA: $100M
- Purchase price: 10x EBITDA = $1B
- Debt: 60% at 6% interest, 40% equity
- Revenue CAGR assumption: 5%
- EBITDA margin expansion: 2% over 5 years
- Exit multiple: 9x EBITDA

Calculate:
1. IRR for the equity investors over 5 years
2. Break-even exit multiple
3. Sensitivity table: IRR at 7x, 8x, 9x, 10x exit multiples
4. What EBITDA margin is needed for 25% IRR at 9x exit?

Show all work.`}
        />

        <PromptCard
          title="Pattern 5: Image + Text Multimodal"
          desc="Combine image analysis with text prompts for rich analysis."
          prompt={`[Attach: portfolio_performance_chart.png]

Analyze this portfolio performance chart and:

1. Identify the drawdown periods and their magnitudes
2. Calculate approximate Sharpe ratio from the visual data
3. Compare the trajectory to what S&P 500 likely did in the same period
4. Flag any concerning patterns (concentration risk, style drift)

Also generate a diagram showing optimal rebalancing points
based on the drawdown analysis.`}
        />
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4">Which OpenAI Model?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#141414]">
                <th className="text-left p-3 border border-[#2a2a3e]">Model</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Best For</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Strengths</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2a2a3e]">
                <td className="p-3 border border-[#2a2a3e] font-bold text-[#10a37f]">o3</td>
                <td className="p-3 border border-[#2a2a3e]">Math, coding, complex reasoning</td>
                <td className="p-3 border border-[#2a2a3e]">Internal chain-of-thought</td>
                <td className="p-3 border border-[#2a2a3e]">$$$</td>
              </tr>
              <tr className="border-b border-[#2a2a3e]">
                <td className="p-3 border border-[#2a2a3e] font-bold text-[#10a37f]">GPT-4o</td>
                <td className="p-3 border border-[#2a2a3e]">General use, multimodal, function calling</td>
                <td className="p-3 border border-[#2a2a3e]">Best all-rounder from OpenAI</td>
                <td className="p-3 border border-[#2a2a3e]">$$</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#2a2a3e] font-bold text-[#10a37f]">GPT-4o-mini</td>
                <td className="p-3 border border-[#2a2a3e]">High volume, simple tasks, classification</td>
                <td className="p-3 border border-[#2a2a3e]">Extremely fast and cheap</td>
                <td className="p-3 border border-[#2a2a3e]">$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4">Pro Tips</h3>
        <div className="space-y-3">
          <div className="tip-card tip-do">
            <strong>Use JSON mode for any programmatic output.</strong> Set{" "}
            <code className="text-xs bg-[#0d1117] px-1 rounded">response_format: {`{type: "json_object"}`}</code>{" "}
            in the API. Guarantees valid JSON every time.
          </div>
          <div className="tip-card tip-do">
            <strong>Build custom GPTs for repeated workflows.</strong> A custom GPT with good
            instructions saves you from writing the same system prompt every session.
          </div>
          <div className="tip-card tip-do">
            <strong>Use function calling for multi-step workflows.</strong> Define your tools as
            functions and let ChatGPT orchestrate the sequence. More reliable than asking it
            to output API calls as text.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t use o3 for simple tasks.</strong> It&apos;s expensive and slower. GPT-4o
            handles 90% of tasks. Reserve o3 for genuinely hard reasoning problems.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t trust ChatGPT&apos;s confidence.</strong> It can hallucinate facts with
            high confidence. Always verify claims with search-grounded models (Gemini, Grok).
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
