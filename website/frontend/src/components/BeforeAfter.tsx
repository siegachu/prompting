const examples = [
  {
    topic: "Writing Emails",
    before: "Write me an email.",
    after: "Write a professional email to my manager requesting 3 days off next week for a family event. Keep it concise and polite, mention I'll hand off my tasks to Sarah.",
    why: "Added context (who, what, why), tone guidance, and specific details the AI needs.",
  },
  {
    topic: "Code Help",
    before: "Fix my code.",
    after: "This Python function should return the sum of even numbers in a list, but it returns 0 for [2,4,6]. Here's my code: `def sum_evens(lst): return sum(x for x in lst if x % 2 == 1)`. Find and fix the bug.",
    why: "Included the language, expected behavior, actual behavior, and the code itself.",
  },
  {
    topic: "Research",
    before: "Tell me about climate change.",
    after: "Summarize the 3 biggest causes of climate change and for each one, explain what an average household can realistically do to reduce their impact. Use simple language.",
    why: "Narrowed the scope, set a structure (3 causes + actions), and specified the audience level.",
  },
  {
    topic: "Creative Writing",
    before: "Write a story.",
    after: "Write a 500-word short story set in a small coastal town where a retired lighthouse keeper discovers a message in a bottle from the future. Tone: bittersweet and hopeful.",
    why: "Gave length, setting, character, plot hook, and tone -- all the ingredients for a focused story.",
  },
  {
    topic: "Data Analysis",
    before: "Analyze this data.",
    after: "I have monthly sales data for 2025 (Jan-Dec) for 3 product lines. Identify which product had the strongest growth trend, flag any months with unusual dips, and suggest 2 possible explanations for the patterns you find.",
    why: "Specified the data shape, asked for specific analyses (trend, anomalies), and requested explanations.",
  },
  {
    topic: "Explaining Concepts",
    before: "What is blockchain?",
    after: "Explain blockchain technology to someone with no tech background. Use a real-world analogy, keep it under 200 words, and mention one practical use case beyond cryptocurrency.",
    why: "Defined the audience, requested an analogy, set a length limit, and asked for a practical example.",
  },
];

export default function BeforeAfter() {
  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-bold">Before & After: Prompt Makeovers</h3>
      <p className="text-[#b0b0b0]">See how adding context and structure transforms vague prompts into effective ones.</p>

      <div className="space-y-4">
        {examples.map((ex) => (
          <div key={ex.topic} className="rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] p-4">
            <h4 className="text-sm font-bold text-[#b0b0b0] mb-3 uppercase tracking-wide">{ex.topic}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-md bg-[#2a1a1a] border border-[#5a2a2a] p-3">
                <span className="text-xs font-bold text-[#f87171] uppercase">Before</span>
                <p className="text-sm text-[#e0a0a0] mt-1">{ex.before}</p>
              </div>
              <div className="rounded-md bg-[#1a2a1a] border border-[#2a5a2a] p-3">
                <span className="text-xs font-bold text-[#4ade80] uppercase">After</span>
                <p className="text-sm text-[#a0e0a0] mt-1">{ex.after}</p>
              </div>
            </div>
            <p className="text-xs text-[#808080] mt-2"><strong className="text-[#b0b0b0]">What changed:</strong> {ex.why}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
