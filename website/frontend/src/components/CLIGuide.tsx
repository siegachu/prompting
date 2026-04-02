import CopyableCode from "./CopyableCode";

export default function CLIGuide() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#22c55e" }}>
          CLI (Command Line Interface) Tools — AI That Works With Your Files
        </h2>
        <p className="text-[#b0b0b0]">
          Instead of copying and pasting between a chat window and your files,
          CLI tools let the AI read, edit, and organize your files directly.
          Think of it as having an assistant who can actually sit at your computer
          and do the work — not just tell you what to do.
        </p>
      </section>

      {/* What can CLI do for everyday people */}
      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-xl font-bold mb-4 text-[#22c55e]">
          What Can CLI AI Do for You?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              task: "Organize your messy files",
              desc: "\"Sort all the photos in my Downloads folder by year and month into organized folders\"",
              icon: "Folders",
            },
            {
              task: "Rename files in bulk",
              desc: "\"Rename all 200 vacation photos from IMG_1234.jpg to 'Hawaii 2025 - 001.jpg' format\"",
              icon: "Photos",
            },
            {
              task: "Clean up spreadsheet data",
              desc: "\"Read my contacts.csv, remove duplicates, fix phone number formatting, and save a clean version\"",
              icon: "Data",
            },
            {
              task: "Build a simple website",
              desc: "\"Create a one-page website for my dog walking business with a contact form and pricing table\"",
              icon: "Web",
            },
            {
              task: "Write and send emails",
              desc: "\"Draft a professional complaint letter to my landlord about the broken heater, using the photos I took as reference\"",
              icon: "Email",
            },
            {
              task: "Analyze your finances",
              desc: "\"Read my bank statement CSV and tell me how much I spent on dining out vs groceries this month\"",
              icon: "Money",
            },
            {
              task: "Convert file formats",
              desc: "\"Convert all the Word documents in this folder to PDFs\"",
              icon: "Convert",
            },
            {
              task: "Create scripts for repetitive tasks",
              desc: "\"Write me a script that backs up my important folders to an external drive every Sunday\"",
              icon: "Automate",
            },
          ].map((item) => (
            <div key={item.task} className="bg-[#141414] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded bg-[#22c55e]/20 text-[#22c55e]">{item.icon}</span>
                <h5 className="font-bold">{item.task}</h5>
              </div>
              <p className="text-sm text-[#b0b0b0] italic">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why CLI > Chat */}
      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-xl font-bold mb-4 text-[#22c55e]">
          CLI vs Chat: What&apos;s the Difference?
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#141414]">
                <th className="text-left p-3 border border-[#2a2a3e]">What You&apos;re Doing</th>
                <th className="text-left p-3 border border-[#2a2a3e]">With Chat (browser)</th>
                <th className="text-left p-3 border border-[#2a2a3e]">With CLI (terminal)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Sharing files with the AI", "Copy-paste text or upload one at a time", "It reads all your files instantly"],
                ["Making changes to a file", "AI tells you what to change, you do it manually", "AI edits the file directly for you"],
                ["Fixing mistakes", "Copy error message, paste it back, repeat", "AI sees the error and fixes it automatically"],
                ["Working on multiple files", "One file at a time, lots of copying", "Works across your whole project at once"],
                ["Saving your work", "Copy the AI's answer somewhere yourself", "AI saves everything to the right files"],
                ["Remembering past conversations", "Start fresh each time (mostly)", "Remembers your preferences and project details"],
              ].map(([aspect, chat, cli], i) => (
                <tr key={i} className="border-b border-[#2a2a3e]">
                  <td className="p-3 border border-[#2a2a3e] font-medium">{aspect}</td>
                  <td className="p-3 border border-[#2a2a3e] text-[#ef4444]/80">{chat}</td>
                  <td className="p-3 border border-[#2a2a3e] text-[#22c55e]">{cli}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to Install */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">How to Install Claude Code</h3>
        <p className="text-[#b0b0b0]">
          Claude Code is the most capable CLI AI tool. Here&apos;s how to get it running
          on your computer in under 5 minutes.
        </p>

        <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] p-5">
          <h4 className="font-bold mb-3">Step 1: Install Node.js (if you don&apos;t have it)</h4>
          <p className="text-sm text-[#b0b0b0] mb-2">
            Node.js is what runs Claude Code. Download it from{" "}
            <span className="text-[#22c55e]">nodejs.org</span> — pick the
            &quot;LTS&quot; version. Install it like any other program.
          </p>
          <CopyableCode>{`# Check if you already have it (open terminal/command prompt):
node --version
# If you see a version number, you're good!`}</CopyableCode>
        </div>

        <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] p-5">
          <h4 className="font-bold mb-3">Step 2: Install Claude Code</h4>
          <CopyableCode>{`# Open your terminal (Mac: Terminal app, Windows: Command Prompt)
npm install -g @anthropic-ai/claude-code`}</CopyableCode>
        </div>

        <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] p-5">
          <h4 className="font-bold mb-3">Step 3: Start Using It</h4>
          <CopyableCode>{`# Go to the folder you want to work in
cd ~/Documents/my-project

# Start Claude Code
claude

# Now just type what you want in plain English:
# "Organize all the files in this folder by type"
# "Read the README and explain what this project does"
# "Find all TODO comments in my code and list them"`}</CopyableCode>
        </div>

        <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] p-5">
          <h4 className="font-bold mb-3">What Each Component Does</h4>
          <div className="space-y-3">
            {[
              {
                name: "Node.js",
                what: "The engine that runs Claude Code on your computer. Like how you need a browser to visit websites, you need Node.js to run Claude Code.",
              },
              {
                name: "npm (comes with Node.js)",
                what: "The app store for command-line tools. You use it to install Claude Code with one command.",
              },
              {
                name: "Claude Code itself",
                what: "The AI assistant that runs in your terminal. It can read your files, make changes, search the web, run programs, and remember things between sessions.",
              },
              {
                name: "Terminal / Command Prompt",
                what: "The text-based window where you type commands. On Mac, it's called \"Terminal.\" On Windows, \"Command Prompt\" or \"PowerShell.\" Claude Code lives here.",
              },
              {
                name: "CLAUDE.md (optional)",
                what: "A text file you can create in any folder to give Claude standing instructions. Like leaving a note for your assistant: \"Always use these guidelines when working in this folder.\"",
              },
            ].map((comp) => (
              <div key={comp.name} className="bg-[#141414] rounded-lg p-3">
                <span className="font-bold text-[#22c55e]">{comp.name}</span>
                <span className="text-sm text-[#b0b0b0]"> — {comp.what}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Everyday Workflows */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Real Examples for Real People</h3>
        <div className="space-y-4">
          <WorkflowExample
            title="Organize 3 Years of Tax Documents"
            steps={[
              "\"I have a mess of PDFs in my tax folder. Sort them by year, then by type (W-2s, 1099s, receipts, bank statements).\"",
              "Claude reads all the file names and contents",
              "Creates folders: 2024/, 2025/, 2026/ with subfolders for each type",
              "Moves each file to the right place",
              "Gives you a summary of what went where",
            ]}
          />
          <WorkflowExample
            title="Build a Birthday Party Invite Website"
            steps={[
              "\"Make a simple webpage for my daughter's birthday party. Pink and purple theme, include the date (April 15), time (2pm), address (123 Oak St), and an RSVP button that sends me an email.\"",
              "Claude creates the HTML file with the design",
              "You open the file in your browser to preview it",
              "\"Make the text bigger and add a photo of balloons at the top\"",
              "Claude edits the file — you refresh and see the changes instantly",
            ]}
          />
          <WorkflowExample
            title="Analyze Your Monthly Spending"
            steps={[
              "\"Read my bank-statement.csv and break down spending by category. Show me a summary of where my money went this month.\"",
              "Claude reads the CSV file",
              "Categorizes each transaction (groceries, dining, gas, subscriptions, etc.)",
              "Creates a clean summary with totals per category",
              "\"Which subscriptions am I paying for? List them with amounts.\"",
              "Claude filters and lists recurring charges",
            ]}
          />
          <WorkflowExample
            title="Fix Your Resume"
            steps={[
              "\"Read my resume.docx. Make it more professional, fix any grammar issues, and make sure each bullet point starts with an action verb.\"",
              "Claude reads the document",
              "Rewrites weak bullet points, fixes grammar",
              "Saves the improved version",
              "\"Now make a version tailored for a marketing manager position at a tech company\"",
              "Claude creates a second version with relevant keywords and focus",
            ]}
          />
        </div>
      </section>

      {/* Power Features (simplified) */}
      <section className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] p-5">
        <h4 className="font-bold mb-3">Power Features (for when you&apos;re comfortable)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Standing Instructions (CLAUDE.md)",
              desc: "Create a file called CLAUDE.md in any folder with rules like \"always write in a casual tone\" or \"this project uses Python.\" Claude reads it every time you start a session there.",
            },
            {
              title: "Automatic Quality Checks (Hooks)",
              desc: "Set up automatic checks that run every time Claude edits a file — like a spell-checker that runs automatically after every edit.",
            },
            {
              title: "Memory Across Sessions",
              desc: "Claude remembers things you tell it — your preferences, your project details, what worked last time. You don't have to repeat yourself every session.",
            },
            {
              title: "Parallel Workers",
              desc: "Claude can spin up helper agents to do multiple things at once — like having one assistant research while another edits files. Faster than doing things one at a time.",
            },
          ].map((feat) => (
            <div key={feat.title} className="bg-[#141414] rounded-lg p-4">
              <h5 className="font-bold text-[#22c55e] mb-1">{feat.title}</h5>
              <p className="text-sm text-[#b0b0b0]">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other CLI Tools */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Other CLI Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ToolCard
            name="Gemini CLI"
            provider="Google"
            color="#4285f4"
            desc="Google's version. Can search Google for you. Good free tier. Still newer and less polished than Claude Code."
            install="npm install -g @anthropic-ai/claude-code"
            strengths={["Google Search built-in", "Handles very long files", "Free to try"]}
            weaknesses={["Fewer features than Claude Code", "Less reliable on complex tasks"]}
          />
          <ToolCard
            name="GitHub Copilot CLI"
            provider="GitHub / OpenAI"
            color="#10a37f"
            desc="Helps you write terminal commands. If you forget how to do something in the command line, it'll write the command for you."
            install="gh extension install github/gh-copilot"
            strengths={["Great for terminal commands", "Works with Git", "Explains what commands do"]}
            weaknesses={["Can't edit your files for you", "Only suggests commands"]}
          />
          <ToolCard
            name="Aider"
            provider="Open Source"
            color="#f59e0b"
            desc="Free, open-source AI coding assistant. Works with any AI model. Good option if you want flexibility or want to run AI locally."
            install="pip install aider-chat"
            strengths={["Works with any AI model", "Free and open source", "Good for coding"]}
            weaknesses={["Takes more setup", "Less hand-holding than Claude Code"]}
          />
          <ToolCard
            name="Cursor / Windsurf"
            provider="Various"
            color="#a78bfa"
            desc="AI-powered code editors with a visual interface. Best for people who prefer clicking buttons over typing commands."
            install="Download from cursor.com / codeium.com"
            strengths={["Visual interface (not just text)", "See changes side by side", "Good for beginners"]}
            weaknesses={["Not pure command line", "Less powerful for automation"]}
          />
        </div>
      </section>

      {/* Tips */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Tips for Using CLI Tools</h3>
        <div className="space-y-3">
          <div className="tip-card tip-do">
            <strong>Tell it what you want, not how to do it.</strong> Say &quot;organize my photos
            by date&quot; instead of listing every step. The AI figures out the how.
          </div>
          <div className="tip-card tip-do">
            <strong>Start small.</strong> Try a simple task first (renaming files, reading a document)
            before asking it to build a website or write a program.
          </div>
          <div className="tip-card tip-do">
            <strong>Review before you approve.</strong> CLI tools ask for permission before making
            changes. Read what it plans to do before saying yes.
          </div>
          <div className="tip-card tip-info">
            <strong>CLI + Chat = Best combo.</strong> Use CLI for tasks that involve your files.
            Use the regular chat (browser) for general questions and brainstorming.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t be afraid of the terminal.</strong> It looks intimidating but you&apos;re
            just typing English sentences. Claude Code understands plain language.
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <h3 className="text-2xl font-bold mb-4">CLI Tool Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#141414]">
                <th className="text-left p-3 border border-[#2a2a3e]">Feature</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Claude Code</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Gemini CLI</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Aider</th>
                <th className="text-center p-3 border border-[#2a2a3e]">Copilot CLI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Can edit your files", "Yes", "Yes", "Yes", "No"],
                ["Searches the web", "Yes", "Yes (Google)", "No", "No"],
                ["Remembers you", "Yes", "A little", "A little", "No"],
                ["Works on its own", "Yes (fully)", "Somewhat", "Somewhat", "No"],
                ["Free to use", "Limited free", "Yes", "Bring your own key", "GitHub subscription"],
                ["Best for", "Everything", "Research", "Coding", "Terminal commands"],
              ].map(([feature, cc, gem, aider, copilot], i) => (
                <tr key={i} className="border-b border-[#2a2a3e]">
                  <td className="p-3 border border-[#2a2a3e] font-medium">{feature}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center">{cc}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center">{gem}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center">{aider}</td>
                  <td className="p-3 border border-[#2a2a3e] text-center">{copilot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function WorkflowExample({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="bg-[#141414] rounded-lg p-4">
      <h5 className="font-bold mb-2">{title}</h5>
      <ol className="text-sm text-[#b0b0b0] space-y-1">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-[#22c55e] shrink-0 font-mono">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ToolCard({
  name,
  provider,
  color,
  desc,
  install,
  strengths,
  weaknesses,
}: {
  name: string;
  provider: string;
  color: string;
  desc: string;
  install: string;
  strengths: string[];
  weaknesses: string[];
}) {
  return (
    <div
      className="bg-[#1a1a2e] rounded-lg p-5 border border-[#2a2a3e]"
      style={{ borderTopColor: color, borderTopWidth: "3px" }}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold" style={{ color }}>{name}</h4>
        <span className="text-xs text-[#b0b0b0]">{provider}</span>
      </div>
      <p className="text-sm text-[#b0b0b0] mb-3">{desc}</p>
      <div className="code-block-wrapper mb-3">
        <pre className="text-xs"><code>{install}</code></pre>
        <button
          onClick={() => {
            navigator.clipboard.writeText(install);
          }}
          className="copy-btn"
          aria-label="Copy install command"
        >
          Copy
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="font-semibold text-[#22c55e] mb-1">Strengths</p>
          {strengths.map((s, i) => (
            <p key={i} className="text-[#b0b0b0]">+ {s}</p>
          ))}
        </div>
        <div>
          <p className="font-semibold text-[#ef4444] mb-1">Limitations</p>
          {weaknesses.map((w, i) => (
            <p key={i} className="text-[#b0b0b0]">- {w}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
