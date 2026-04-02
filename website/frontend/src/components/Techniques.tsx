import CopyableCode from "./CopyableCode";

export default function Techniques() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-2">Prompting Techniques</h2>
        <p className="text-[#b0b0b0]">
          Simple tricks to get better answers from any AI. Think of these as
          different ways to ask a question — some work better than others
          depending on what you need.
        </p>
      </section>

      {/* Decision Flowchart */}
      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-xl font-bold mb-4 text-[#f59e0b]">
          Which Technique Should I Use?
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-[#f59e0b] font-mono shrink-0">START</span>
            <span className="text-[#b0b0b0]">Is it a simple, straightforward question?</span>
          </div>
          <div className="ml-8 flex items-start gap-3">
            <span className="text-[#22c55e] font-mono shrink-0">YES &rarr;</span>
            <span><strong>Just ask.</strong> No tricks needed. &quot;What&apos;s the capital of France?&quot;</span>
          </div>
          <div className="ml-8 flex items-start gap-3">
            <span className="text-[#ef4444] font-mono shrink-0">NO &nbsp;&rarr;</span>
            <span className="text-[#b0b0b0]">Does it need thinking through multiple steps?</span>
          </div>
          <div className="ml-16 flex items-start gap-3">
            <span className="text-[#22c55e] font-mono shrink-0">YES &rarr;</span>
            <span>Are you using a &quot;thinking&quot; model (Claude Opus, o3, Gemini Thinking)?</span>
          </div>
          <div className="ml-24 flex items-start gap-3">
            <span className="text-[#22c55e] font-mono shrink-0">YES &rarr;</span>
            <span><strong>Just say &quot;think carefully about this.&quot;</strong> These models already reason on their own.</span>
          </div>
          <div className="ml-24 flex items-start gap-3">
            <span className="text-[#ef4444] font-mono shrink-0">NO &nbsp;&rarr;</span>
            <span><strong>Say &quot;think step by step.&quot;</strong> This alone makes answers 10-20% more accurate.</span>
          </div>
          <div className="ml-16 flex items-start gap-3">
            <span className="text-[#ef4444] font-mono shrink-0">NO &nbsp;&rarr;</span>
            <span className="text-[#b0b0b0]">Do you want the answer in a specific format?</span>
          </div>
          <div className="ml-24 flex items-start gap-3">
            <span className="text-[#22c55e] font-mono shrink-0">YES &rarr;</span>
            <span><strong>Show 2-3 examples</strong> of what you want. The AI will copy the pattern.</span>
          </div>
          <div className="ml-24 flex items-start gap-3">
            <span className="text-[#ef4444] font-mono shrink-0">NO &nbsp;&rarr;</span>
            <span><strong>Give it a role.</strong> &quot;You are a friendly teacher. Explain this to me.&quot;</span>
          </div>
        </div>
      </section>

      {/* Technique Cards */}
      <section className="space-y-6">
        <TechniqueCard
          id="zero-shot"
          name="Just Ask (Zero-Shot)"
          effectiveness="Starting point"
          bestFor="Simple questions with clear answers"
          description="Just type your question normally. No tricks needed. This is how most people use AI — and it works great for everyday questions. Only try fancier techniques when this doesn't give you what you want."
          example={`What's a good birthday gift for a 10-year-old who likes science?`}
          doList={["Start here for every question", "Be clear about what you want", "Mention the format if it matters (\"give me a list\")"]}
          dontList={["Overthink simple questions", "Add unnecessary instructions for basic stuff"]}
        />

        <TechniqueCard
          id="chain-of-thought"
          name="Think Step by Step (Chain-of-Thought)"
          effectiveness="+10-20% more accurate"
          bestFor="Math problems, comparing options, planning"
          description={`Just add "think step by step" to your question. This forces the AI to show its work instead of jumping to an answer — like asking a student to show their math. You can catch mistakes along the way. Skip this on "thinking" models like Claude Opus — they already do it automatically.`}
          example={`I'm choosing between two cars:\n- Car A: $30,000, gets 35 mpg, $200/mo insurance\n- Car B: $25,000, gets 25 mpg, $250/mo insurance\n\nI drive 15,000 miles a year and gas is $3.50/gallon.\nWhich car is cheaper over 5 years?\n\nThink step by step.`}
          doList={["Use for math, comparisons, and decisions", "Use on regular models (Sonnet, GPT-4o, Gemini Flash)", "Let the AI show its work so you can check it"]}
          dontList={["Use on thinking models (they already do this)", "Use for simple facts like \"what year was X born\"", "Expect it to know things it doesn't"]}
        />

        <TechniqueCard
          id="few-shot"
          name="Show Me What You Want (Few-Shot)"
          effectiveness="+15-30% more accurate"
          bestFor="Getting a specific style, format, or tone"
          description="Show the AI 2-3 examples of what good output looks like, then ask it to do the same thing. It's like showing a new employee examples of past work before asking them to do something similar."
          example={`Write short product descriptions in this style:\n\nExample: "Classic White Tee — Soft cotton, relaxed fit. The one you'll reach for every morning. $29"\nExample: "Weekend Joggers — Stretchy, breathable, looks good at brunch or on the couch. $55"\n\nNow write one for:\n- A waterproof hiking jacket, $120\n- A leather laptop bag, $89`}
          doList={["Use 2-5 examples that show variety", "Make sure examples match the difficulty of your real task", "Include edge cases if they matter"]}
          dontList={["Use examples that contradict each other", "Use more than 7 examples (you hit diminishing returns)", "Use examples way simpler than your actual task"]}
        />

        <TechniqueCard
          id="role-playing"
          name="Give It a Role (Persona Prompting)"
          effectiveness="+14-18% on specialized topics"
          bestFor="Getting expert-level answers, matching a specific tone"
          description={`Tell the AI to pretend it's a specific type of expert. "You are a friendly pediatrician" gives very different health advice than "you are a medical researcher." The more specific the role, the better the answer.`}
          example={`You are a patient, experienced home inspector\nwith 20 years in the business.\n\nI'm buying my first house and the inspection report\nmentions "minor foundation cracks." Should I be worried?\nWhat questions should I ask the seller?\nExplain like you're talking to someone who knows\nnothing about houses.`}
          doList={["Be specific about the role (\"experienced pediatrician\" not just \"doctor\")", "Mention the audience (\"explain to a beginner\")", "Combine roles for different perspectives"]}
          dontList={["Use vague roles (\"expert\")", "Expect the role to give it new facts it doesn't know", "Assign conflicting roles in the same prompt"]}
        />

        <TechniqueCard
          name="Explore Multiple Angles (Tree-of-Thought)"
          effectiveness="+83% on complex problems"
          bestFor="Big decisions with multiple factors to weigh"
          description="Ask the AI to consider a problem from several different angles, evaluate each one, then combine them into a recommendation. It's like asking your friend to think about a decision from the money side, the lifestyle side, and the risk side before giving advice."
          example={`I'm deciding whether to accept a job offer in a new city.\nLook at this from 3 angles:\n\nAngle 1: Money (salary difference, cost of living,\n  moving expenses)\nAngle 2: Career (growth potential, industry trends,\n  resume impact)\nAngle 3: Personal (distance from family, city lifestyle,\n  partner's job options)\n\nAfter exploring all 3, give me your overall recommendation.`}
          doList={["Use for important life decisions", "Ask for at least 3 different perspectives", "Ask it to weigh the perspectives against each other"]}
          dontList={["Use for simple questions (way overkill)", "Skip the final synthesis step", "Expect it to know personal preferences — tell it what matters most to you"]}
        />

        <TechniqueCard
          name="Ask 3 Times and Compare (Self-Consistency)"
          effectiveness="-15-20% fewer wrong answers"
          bestFor="When you need to be really sure the answer is right"
          description="Ask the same question 3-5 times in separate chats and see if you get the same answer each time. If all 3 agree, you can trust it. If they give different answers each time, the AI is unsure and you should verify elsewhere."
          example={`[Ask this same question in 3 separate chats]\n\nBased on these symptoms — persistent dry cough\nfor 3 weeks, no fever, worse at night — what are\nthe most likely causes? List them in order of\nprobability.\n\n[Compare: if all 3 chats say the same top causes\n→ high confidence. If they disagree → see a doctor.]`}
          doList={["Use when accuracy really matters", "Run at least 3 separate chats", "Pay attention when answers disagree"]}
          dontList={["Use for creative tasks (different answers are normal)", "Run fewer than 3 tries", "Ignore it when the answers conflict — that means the AI is guessing"]}
        />

        <TechniqueCard
          name="Let It Think Deeply (Extended Thinking)"
          effectiveness="Better answers on hard problems"
          bestFor="Complex questions that need real analysis"
          description={`Some newer AI models (Claude Opus, OpenAI o3, Gemini Thinking) can "think" internally before answering. Instead of telling them exactly how to reason, just say "think carefully" or "think deeply" and let them figure out the best approach. It's like giving someone time to really think before they answer.`}
          example={`Think carefully about this.\n\nI have $50,000 in savings, $30,000 in student loans\nat 5% interest, and my employer matches 401k\ncontributions up to 5% of my $70,000 salary.\n\nWhat's the smartest order to use my money?\nConsider the math but also real-life factors.`}
          doList={["Use with thinking models (Claude Opus, o3, Gemini Thinking)", "Give the big picture, let the AI figure out the details", "Use for complex decisions, tricky problems, or detailed analysis"]}
          dontList={["Say \"think step by step\" (redundant — thinking models do this on their own)", "Micromanage how it should think", "Use on regular models (they won't think deeper, they'll just say \"okay\")"]}
        />

        <TechniqueCard
          id="structured-output"
          name="Ask for a Specific Format (Structured Output)"
          effectiveness="Consistent, organized answers"
          bestFor="Getting clean data, filling templates, organized lists"
          description="Tell the AI exactly how to organize its answer. Want a table? Ask for a table. Want bullet points with headers? Say so. Want it to fill in a template? Paste the template. This prevents rambling and makes answers easier to use."
          example={`Compare these 3 phones for me in a table with columns:\nPhone Name | Price | Battery Life | Camera Quality | Best For\n\niPhone 16\nSamsung Galaxy S25\nGoogle Pixel 9`}
          doList={["Ask for tables, lists, or specific formats by name", "Paste a template if you have one", "Be specific about what columns, sections, or categories you want"]}
          dontList={["Leave the format up to the AI when you have a preference", "Ask for overly complicated formats with 20 columns", "Forget to mention the format and then complain about the layout"]}
        />

        <TechniqueCard
          id="constraints"
          name="Set Boundaries (Constraints)"
          effectiveness="+10-25% more focused"
          bestFor="Keeping answers on topic, limiting scope, controlling length"
          description="Tell the AI what NOT to do, how long the answer should be, or what to exclude. Constraints narrow the output so you get exactly what you need without filler. Think of it like giving a contractor a budget and a deadline — they make better decisions with boundaries."
          example={`Write a product description for a standing desk.\n\nConstraints:\n- Maximum 3 sentences\n- No superlatives (no "best," "amazing," "revolutionary")\n- Must mention the price ($449)\n- Don't compare to competitors\n- Write for someone who already knows what a standing desk is`}
          doList={["Set word or sentence limits", "List things to exclude (topics, words, formats)", "Specify the audience level so it doesn't over-explain", "Combine with other techniques for precision"]}
          dontList={["Add so many constraints the AI can't answer at all", "Contradict yourself (\"be detailed\" + \"keep it under 50 words\")", "Use vague constraints like \"keep it short\" — say exactly how short"]}
        />
      </section>

      {/* Comparison Table */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Quick Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse comparison-table">
            <thead>
              <tr>
                <th className="text-left p-3 border border-[#2a2a3e]">Technique</th>
                <th className="text-center p-3 border border-[#2a2a3e]">How Much It Helps</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Effort</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Works On</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Just Ask", "Baseline", "None", "All AIs"],
                ["Think Step by Step", "+10-20% accuracy", "Add one sentence", "Regular models"],
                ["Show Examples", "+15-30% accuracy", "Write 2-3 examples", "All AIs"],
                ["Give It a Role", "+14-18% on expert topics", "Add one sentence", "All AIs"],
                ["Explore Multiple Angles", "+83% on hard problems", "Write a detailed prompt", "All AIs"],
                ["Ask 3 Times", "Catches 15-20% more errors", "Run 3 separate chats", "All AIs"],
                ["Let It Think Deeply", "Varies (often big improvement)", "Add one phrase", "Thinking models only"],
                ["Ask for a Format", "Much cleaner answers", "Describe the format", "All AIs"],
              ].map(([tech, boost, effort, models], i) => (
                <tr key={i} className="border-b border-[#2a2a3e] hover:bg-[#141414]">
                  <td className="p-3 border border-[#2a2a3e] font-medium">{tech}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center text-[#22c55e]">{boost}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center">{effort}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center text-[#b0b0b0]">{models}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Automated Optimization */}
      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-xl font-bold mb-3">For Developers: Auto-Tune Your Prompts</h3>
        <p className="text-[#b0b0b0] mb-4">
          If you&apos;re building an app that uses AI, these tools can automatically find
          the best prompt for your use case — often beating hand-written prompts by ~20%.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "DSPy", desc: "Build prompt pipelines that optimize themselves. Best for production apps.", maturity: "Ready to use" },
            { name: "TextGrad", desc: "Fine-tunes prompts for specific hard tasks. Great for coding and science.", maturity: "Getting there" },
            { name: "OPRO", desc: "The AI tries different prompts and picks the best one. Easy to set up.", maturity: "Getting there" },
            { name: "metaTextGrad", desc: "Optimizes the optimizer itself. Cutting-edge research.", maturity: "Experimental" },
          ].map((fw) => (
            <div key={fw.name} className="bg-[#141414] rounded-lg p-4">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold">{fw.name}</h4>
                <span className="text-xs px-2 py-0.5 rounded bg-[#2a2a3e] text-[#b0b0b0]">
                  {fw.maturity}
                </span>
              </div>
              <p className="text-sm text-[#b0b0b0]">{fw.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TechniqueCard({
  id,
  name,
  effectiveness,
  bestFor,
  description,
  example,
  doList,
  dontList,
}: {
  id?: string;
  name: string;
  effectiveness: string;
  bestFor: string;
  description: string;
  example: string;
  doList: string[];
  dontList: string[];
}) {
  return (
    <div id={id} className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] overflow-hidden scroll-mt-32">
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h3 className="text-xl font-bold">{name}</h3>
          <span className="text-xs px-2 py-1 rounded bg-[#22c55e]/20 text-[#22c55e] font-medium">
            {effectiveness}
          </span>
        </div>
        <p className="text-sm text-[#b0b0b0] mb-1">
          <strong className="text-white">Best for:</strong> {bestFor}
        </p>
        <p className="text-sm text-[#b0b0b0] mb-4">{description}</p>

        {/* Example */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-[#f59e0b] mb-2">EXAMPLE PROMPT</p>
          <CopyableCode>{example}</CopyableCode>
        </div>

        {/* Do / Don't */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="tip-card tip-do">
            <p className="text-xs font-semibold text-[#22c55e] mb-1">DO</p>
            <ul className="text-sm text-[#b0b0b0] space-y-1">
              {doList.map((item, i) => (
                <li key={i}>+ {item}</li>
              ))}
            </ul>
          </div>
          <div className="tip-card tip-dont">
            <p className="text-xs font-semibold text-[#ef4444] mb-1">DON&apos;T</p>
            <ul className="text-sm text-[#b0b0b0] space-y-1">
              {dontList.map((item, i) => (
                <li key={i}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
