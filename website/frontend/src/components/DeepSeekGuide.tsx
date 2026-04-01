import CopyableCode from "./CopyableCode";

export default function DeepSeekGuide() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#7c3aed" }}>
          DeepSeek
        </h2>
        <p className="text-[#b0b0b0]">
          Best for: math/logic verification, reasoning chains, cost-effective analysis,
          open-weight alternatives. Models: DeepSeek-V3.2 (chat), DeepSeek-R1 (reasoning).
        </p>
      </section>

      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-xl font-bold mb-4">What Makes DeepSeek Different</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Exceptional Math & Logic", desc: "DeepSeek-R1 matches or exceeds GPT-4 on math benchmarks. The reasoning chain is visible, so you can verify each step. Ideal for verification tasks." },
            { title: "Open Weights", desc: "Models are open-weight — you can run them locally, fine-tune them, and inspect their behavior. No vendor lock-in for critical applications." },
            { title: "Extremely Cost-Effective", desc: "API pricing is a fraction of Claude/GPT. Run high-volume analysis tasks at 1/10th the cost. Perfect for batch processing and verification loops." },
            { title: "Transparent Reasoning", desc: "R1 shows its complete chain-of-thought. Unlike Claude Opus or o3 where thinking is hidden, DeepSeek lets you audit every reasoning step." },
          ].map((f) => (
            <div key={f.title} className="bg-[#141414] rounded-lg p-4">
              <h4 className="font-bold mb-1">{f.title}</h4>
              <p className="text-sm text-[#b0b0b0]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">DeepSeek-Optimized Prompt Patterns</h3>

        <PromptCard
          title="Pattern 1: Mathematical Verification"
          desc="Use DeepSeek as a verification layer to check other models' calculations."
          prompt={`Verify this financial calculation step by step.

Claim: "At a 10% discount rate, the NPV of the following
cash flows is $487,000"

Cash flows:
Year 0: -$1,000,000
Year 1: +$300,000
Year 2: +$350,000
Year 3: +$400,000
Year 4: +$450,000
Year 5: +$500,000

Show each step of the NPV calculation.
State whether the claim is CORRECT or INCORRECT.
If incorrect, provide the correct answer.`}
        />

        <PromptCard
          title="Pattern 2: Logic Consistency Check"
          desc="Feed another model's analysis to DeepSeek for logical consistency checking."
          prompt={`Check this analysis for logical consistency and errors.

Analysis from another AI model:
"""
[Paste Claude/Gemini/ChatGPT analysis here]
"""

Evaluate:
1. Are all numerical claims internally consistent?
2. Do the conclusions follow from the premises?
3. Are there any logical fallacies?
4. Are there unstated assumptions that could be wrong?
5. Is the reasoning chain complete (no skipped steps)?

Rate confidence: HIGH (solid logic) / MEDIUM (minor issues) / LOW (major flaws)
For each issue found, explain specifically what's wrong.`}
        />

        <PromptCard
          title="Pattern 3: Batch Verification"
          desc="Cost-effective batch processing for high-volume verification tasks."
          prompt={`Verify each of these 10 stock valuations.
For each, check the math and flag errors.

1. AAPL: P/E 28, EPS $6.50, implied price $182.00
2. MSFT: P/E 32, EPS $11.50, implied price $368.00
3. GOOG: P/E 24, EPS $7.20, implied price $172.80
4. AMZN: P/E 45, EPS $4.80, implied price $216.00
5. NVDA: P/E 55, EPS $2.95, implied price $162.25
6. META: P/E 22, EPS $18.50, implied price $407.00
7. TSLA: P/E 65, EPS $3.20, implied price $280.00
8. BRK.B: P/E 20, EPS $22.00, implied price $440.00
9. JPM: P/E 12, EPS $16.50, implied price $198.00
10. V: P/E 30, EPS $9.80, implied price $294.00

For each: CORRECT or INCORRECT (with correct value).`}
        />

        <PromptCard
          title="Pattern 4: R1 Reasoning Chain"
          desc="Use DeepSeek-R1 for complex reasoning with full chain-of-thought visibility."
          prompt={`Think through this problem carefully, showing all reasoning.

A company is considering two expansion strategies:

Strategy A: Organic growth
- Investment: $5M upfront
- Expected revenue: $2M/year starting Year 2
- Probability of success: 80%
- Time to break-even: 3 years

Strategy B: Acquisition
- Investment: $15M upfront
- Expected revenue: $5M/year starting Year 1
- Probability of success: 60%
- Integration risk: 30% chance of $3M additional cost
- Time to break-even: 4 years

Using expected value analysis, which strategy has higher
risk-adjusted NPV at a 12% discount rate over 7 years?
Account for all probability branches.`}
        />
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4">DeepSeek in the MoE Workflow</h3>
        <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
          <p className="text-[#b0b0b0] mb-4">
            DeepSeek&apos;s primary role in a Mixture of Experts workflow is as the <strong className="text-white">VERIFIER</strong>.
            It checks math, logic, and consistency in outputs from Claude, Gemini, and Grok.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#141414] rounded-lg p-4">
              <h4 className="font-bold text-[#7c3aed] mb-2">Phase 1</h4>
              <p className="text-sm text-[#b0b0b0]">Not used. Primary research done by Claude, Gemini, Grok (they have search).</p>
            </div>
            <div className="bg-[#141414] rounded-lg p-4">
              <h4 className="font-bold text-[#7c3aed] mb-2">Phase 2: Discussion</h4>
              <p className="text-sm text-[#b0b0b0]">Receives synthesis, verifies all calculations and logic. Votes AGREE/DISAGREE with evidence.</p>
            </div>
            <div className="bg-[#141414] rounded-lg p-4">
              <h4 className="font-bold text-[#7c3aed] mb-2">Verification</h4>
              <p className="text-sm text-[#b0b0b0]">Final check on consensus report. Flags numerical inconsistencies and logical errors.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4">Pro Tips</h3>
        <div className="space-y-3">
          <div className="tip-card tip-do">
            <strong>Use DeepSeek to verify other models&apos; outputs.</strong> It&apos;s the cheapest way
            to add a verification layer. Feed Claude&apos;s analysis to DeepSeek for a math check.
          </div>
          <div className="tip-card tip-do">
            <strong>Use R1 for transparent reasoning.</strong> When you need to audit the reasoning
            process (compliance, legal), R1&apos;s visible chain-of-thought is invaluable.
          </div>
          <div className="tip-card tip-do">
            <strong>Batch your requests.</strong> DeepSeek&apos;s low cost makes it ideal for processing
            hundreds of items. Send batch verification requests instead of one-by-one.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t use DeepSeek for web research.</strong> It has no search tools. Use Grok
            or Gemini for anything requiring current data.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t expect polished prose.</strong> DeepSeek optimizes for accuracy over style.
            Use Claude for customer-facing content, DeepSeek for internal verification.
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
