export default function Overview() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold mb-4">
          Stop Guessing. Start Prompting.
        </h2>
        <p className="text-xl text-[#b0b0b0] max-w-3xl mx-auto">
          Every AI has different strengths — like asking a doctor vs a lawyer vs
          a mechanic. The same question gets wildly different answers depending
          on who you ask. This guide helps you{" "}
          <strong className="text-white">pick the right AI</strong> and{" "}
          <strong className="text-white">ask it the right way</strong>.
        </p>
      </section>

      {/* Quick Decision Matrix */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Which AI Should I Use?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#141414]">
                <th className="text-left p-3 border border-[#2a2a3e]">What You Need</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Best Pick</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Runner-Up</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Why</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Write or fix code", "Claude", "ChatGPT", "Handles big projects and follows detailed instructions best"],
                ["What's happening right now on social media", "Grok", "Gemini", "Has live access to X/Twitter posts and trending topics"],
                ["Research a topic with sources", "Gemini", "Grok", "Searches Google and gives you links to back up its answers"],
                ["Check math or spot logical errors", "DeepSeek", "Claude", "Built for number-crunching — fast and cheap"],
                ["Write an email, blog post, or story", "Claude", "ChatGPT", "Writes naturally, avoids sounding robotic"],
                ["Quick everyday questions", "ChatGPT", "Gemini", "Fast answers for things like recipes, definitions, how-tos"],
                ["Important decisions (buying a house, investments)", "Claude + Grok together", "Gemini", "Using multiple AIs catches mistakes a single one might miss"],
                ["Summarize a long document or book", "Gemini / Claude", "ChatGPT", "Can read extremely long texts in one shot"],
                ["Work with files on your computer", "Claude Code", "Gemini CLI", "Can read, edit, and organize files directly from your terminal"],
              ].map(([task, best, runner, why], i) => (
                <tr key={i} className="border-b border-[#2a2a3e] hover:bg-[#141414]">
                  <td className="p-3 border border-[#2a2a3e] font-medium">{task}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center font-bold">{best}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center text-[#b0b0b0]">{runner}</td>
                  <td className="p-3 border border-[#2a2a3e] text-[#b0b0b0]">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Model Strengths Cards */}
      <section>
        <h3 className="text-2xl font-bold mb-4">What Each AI Does Best</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: "Claude",
              color: "#d97706",
              strengths: ["Reads up to 500 pages at once", "Great at following detailed instructions", "Thinks through hard problems step by step", "Best at writing and editing code", "Most careful and accurate"],
              weaknesses: ["Can't search the internet in chat", "Sometimes plays it too safe"],
            },
            {
              name: "Gemini",
              color: "#4285f4",
              strengths: ["Reads the longest documents (1M+ words)", "Searches Google to back up answers", "Understands images, video, and audio", "Generous free plan", "Very fast responses"],
              weaknesses: ["Sometimes trips up on tricky logic", "Answers can be overly long"],
            },
            {
              name: "Grok",
              color: "#1da1f2",
              strengths: ["Searches X/Twitter in real time", "Built-in web search", "Gives direct, no-nonsense answers", "Best for breaking news and trends", "DeepSearch digs extra deep"],
              weaknesses: ["Knows less about older/niche topics", "Code answers less reliable"],
            },
            {
              name: "ChatGPT",
              color: "#10a37f",
              strengths: ["Biggest app store (plugins, custom GPTs)", "Knows a lot about everything", "Great conversationalist", "Can generate images (DALL-E)", "Works with other apps and tools"],
              weaknesses: ["Knowledge can be outdated", "Sometimes makes things up confidently"],
            },
            {
              name: "DeepSeek",
              color: "#7c3aed",
              strengths: ["Excellent at math and logic puzzles", "Open-source (you can run it yourself)", "Very cheap to use", "Shows its reasoning step by step", "Great for double-checking other AIs"],
              weaknesses: ["Can't search the web", "Rougher user experience"],
            },
            {
              name: "CLI Tools",
              color: "#22c55e",
              strengths: ["Works directly with files on your computer", "Connects to version control (Git)", "Edits multiple files at once", "Can automate repetitive tasks", "No copy-pasting back and forth"],
              weaknesses: ["Takes some learning to get started", "Terminal/command line only"],
            },
          ].map((model) => (
            <div
              key={model.name}
              className="bg-[#1a1a2e] rounded-lg p-5 border border-[#2a2a3e] hover:border-opacity-60 transition-all"
              style={{ borderTopColor: model.color, borderTopWidth: "3px" }}
            >
              <h4 className="text-lg font-bold mb-3" style={{ color: model.color }}>
                {model.name}
              </h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-[#22c55e] mb-1">STRENGTHS</p>
                  <ul className="text-sm text-[#b0b0b0] space-y-0.5">
                    {model.strengths.map((s, i) => (
                      <li key={i}>+ {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#ef4444] mb-1">WATCH OUT</p>
                  <ul className="text-sm text-[#b0b0b0] space-y-0.5">
                    {model.weaknesses.map((w, i) => (
                      <li key={i}>- {w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The MoE Approach */}
      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-2xl font-bold mb-3">The Power Move: Ask Multiple AIs</h3>
        <p className="text-[#b0b0b0] mb-4">
          For big decisions, don&apos;t just ask one AI. Ask several, compare their
          answers, and look for where they agree. It&apos;s like getting a second
          and third opinion from different doctors — you&apos;ll catch things any
          single one might miss.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#141414] rounded-lg p-4">
            <h4 className="font-bold text-[#f59e0b] mb-2">Step 1: Ask Everyone</h4>
            <p className="text-sm text-[#b0b0b0]">
              Send the same question to Grok (for social media buzz), Gemini
              (for Google-backed research), and Claude (for careful analysis).
              Collect all their answers.
            </p>
          </div>
          <div className="bg-[#141414] rounded-lg p-4">
            <h4 className="font-bold text-[#f59e0b] mb-2">Step 2: Compare Notes</h4>
            <p className="text-sm text-[#b0b0b0]">
              Combine the answers into one summary. Send it back to all the AIs
              and ask: &quot;Do you agree with this? What&apos;s wrong or missing?&quot;
              Keep going until they mostly agree.
            </p>
          </div>
          <div className="bg-[#141414] rounded-lg p-4">
            <h4 className="font-bold text-[#f59e0b] mb-2">Step 3: Final Answer</h4>
            <p className="text-sm text-[#b0b0b0]">
              Write up the final answer with what everyone agreed on and where
              they disagreed. This gives you a much more reliable result than
              trusting any one AI alone.
            </p>
          </div>
        </div>
      </section>

      {/* Universal Rules */}
      <section>
        <h3 className="text-2xl font-bold mb-4">6 Rules That Work on Every AI</h3>
        <div className="space-y-3">
          {[
            { title: "Be Specific", desc: "\"What are 5 easy dinner recipes under 30 minutes using chicken?\" beats \"give me recipes\"" },
            { title: "Tell It Who You Are", desc: "\"I'm a beginner learning to cook\" gets different (and better) answers than asking with no context" },
            { title: "Say How You Want the Answer", desc: "\"Give me a numbered list\" or \"Explain like I'm 10\" — tell the AI what format works for you" },
            { title: "Show an Example", desc: "If you want a specific style, paste an example first. \"Write a product description like this one: [example]\" works great" },
            { title: "Keep the Conversation Going", desc: "Don't start over — say \"make it shorter\" or \"now add more detail about #3\" in the same chat" },
            { title: "Break Big Tasks Into Pieces", desc: "Instead of \"plan my entire vacation,\" ask about flights first, then hotels, then activities separately" },
          ].map((rule, i) => (
            <div key={i} className="bg-[#141414] rounded-lg p-4 flex gap-4 items-start">
              <span className="text-2xl font-bold text-[#f59e0b] shrink-0 w-8 text-center">{i + 1}</span>
              <div>
                <h4 className="font-bold">{rule.title}</h4>
                <p className="text-sm text-[#b0b0b0]">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
