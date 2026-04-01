import CopyableCode from "./CopyableCode";

export default function ClaudeGuide() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#d97706" }}>
          Claude — Anthropic
        </h2>
        <p className="text-[#b0b0b0]">
          Best for: complex coding, long documents, structured analysis, safety-critical tasks.
          Models: Opus 4.6 (reasoning), Sonnet 4.6 (balanced), Haiku 4.5 (fast/cheap).
        </p>
      </section>

      {/* Key Differentiators */}
      <section className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
        <h3 className="text-xl font-bold mb-4">What Makes Claude Different</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Feature
            title="XML Tags for Structure"
            desc="Claude uniquely excels at XML-structured prompts. Wrap sections in tags like <context>, <instructions>, <examples> for dramatically better results."
          />
          <Feature
            title="Extended Thinking"
            desc="Opus and Sonnet can reason internally before responding. Say 'think deeply' for complex problems — the model allocates reasoning tokens automatically."
          />
          <Feature
            title="200K Context Window"
            desc="Paste entire codebases, long documents, or multiple files. Claude handles massive context better than most competitors."
          />
          <Feature
            title="System Prompts"
            desc="Claude's system prompt strongly shapes behavior. Use it for persistent instructions, persona, and output constraints."
          />
        </div>
      </section>

      {/* Prompt Patterns */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Claude-Optimized Prompt Patterns</h3>

        <PromptExample
          title="Pattern 1: XML-Structured Analysis"
          description="Claude's #1 differentiator. XML tags create clear sections that Claude follows precisely."
          prompt={`<context>
You are a senior software architect reviewing a codebase migration.
The team has 3 months and 4 developers available.
</context>

<current_state>
- Monolithic Django app, 150K lines
- PostgreSQL with 80 tables
- 500 API endpoints
- No test coverage on 40% of code
</current_state>

<task>
Design a phased migration plan to microservices.
For each phase, specify: services to extract, risk level,
estimated duration, and rollback strategy.
</task>

<constraints>
- Zero downtime required
- Must maintain backward compatibility for mobile clients
- Budget: $50K for infrastructure changes
</constraints>

<output_format>
Return as a numbered phase list. Each phase should have:
Phase N: [Name]
- Services: [list]
- Duration: [weeks]
- Risk: [Low/Medium/High]
- Rollback: [strategy]
- Dependencies: [what must complete first]
</output_format>`}
        />

        <PromptExample
          title="Pattern 2: Extended Thinking for Complex Problems"
          description="For reasoning-heavy tasks, let Claude think deeply. Don't micromanage the reasoning — give the goal and constraints."
          prompt={`Think deeply about this architectural decision.

We're choosing between:
A) Event-driven architecture with Kafka
B) Request-response with gRPC
C) Hybrid approach

Our system processes 50K financial transactions/second
with strict ordering requirements within each account
but no ordering requirement across accounts.

Latency budget: p99 < 50ms for reads, < 200ms for writes.

Which architecture and why? Consider failure modes,
operational complexity, and team expertise (strong in Python,
limited Go experience).`}
        />

        <PromptExample
          title="Pattern 3: Multi-Document Analysis"
          description="Leverage Claude's 200K context to analyze multiple documents simultaneously."
          prompt={`<document_1 name="Q4 Earnings Call">
[paste full transcript]
</document_1>

<document_2 name="10-K Filing">
[paste relevant sections]
</document_2>

<document_3 name="Analyst Reports">
[paste 2-3 analyst notes]
</document_3>

<task>
Cross-reference these three sources to identify:
1. Claims in the earnings call not supported by the 10-K
2. Risks mentioned in the 10-K but downplayed in the call
3. Where analyst consensus differs from management guidance
4. Any numerical discrepancies between sources

Present findings as a risk matrix with severity ratings.
</task>`}
        />

        <PromptExample
          title="Pattern 4: Code Generation with Context"
          description="Claude excels at large-scale code tasks when given full context."
          prompt={`<codebase_context>
Framework: FastAPI + SQLAlchemy
Database: PostgreSQL
Auth: JWT tokens via python-jose
Existing patterns: Repository pattern, dependency injection
</codebase_context>

<existing_code>
# models/user.py
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
</existing_code>

<task>
Add a complete role-based access control (RBAC) system:
- Role and Permission models with many-to-many relationships
- Dependency injection for permission checking
- Decorator for route-level permission requirements
- Migration script

Follow the existing code patterns exactly.
</task>`}
        />
      </section>

      {/* Model Selection */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Which Claude Model?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#141414]">
                <th className="text-left p-3 border border-[#2a2a3e]">Model</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Best For</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Context</th>
                <th className="text-left p-3 border border-[#2a2a3e]">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2a2a3e]">
                <td className="p-3 border border-[#2a2a3e] font-bold text-[#d97706]">Opus 4.6</td>
                <td className="p-3 border border-[#2a2a3e]">Architecture, complex reasoning, research, hard code</td>
                <td className="p-3 border border-[#2a2a3e]">200K (1M preview)</td>
                <td className="p-3 border border-[#2a2a3e]">$$$</td>
              </tr>
              <tr className="border-b border-[#2a2a3e]">
                <td className="p-3 border border-[#2a2a3e] font-bold text-[#d97706]">Sonnet 4.6</td>
                <td className="p-3 border border-[#2a2a3e]">Daily coding, analysis, writing — best price/performance</td>
                <td className="p-3 border border-[#2a2a3e]">200K</td>
                <td className="p-3 border border-[#2a2a3e]">$$</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#2a2a3e] font-bold text-[#d97706]">Haiku 4.5</td>
                <td className="p-3 border border-[#2a2a3e]">Quick tasks, classification, extraction, high-volume</td>
                <td className="p-3 border border-[#2a2a3e]">200K</td>
                <td className="p-3 border border-[#2a2a3e]">$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pro Tips */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Pro Tips</h3>
        <div className="space-y-3">
          <div className="tip-card tip-do">
            <strong>Use XML tags for everything.</strong> Even simple prompts benefit from{" "}
            <code className="text-xs bg-[#0d1117] px-1 rounded">&lt;task&gt;</code> and{" "}
            <code className="text-xs bg-[#0d1117] px-1 rounded">&lt;context&gt;</code> wrappers.
            Claude&apos;s training heavily reinforces XML-structured responses.
          </div>
          <div className="tip-card tip-do">
            <strong>Put long documents BEFORE instructions.</strong> Claude attends better to
            instructions that come after the data, not before. Place context first, task second.
          </div>
          <div className="tip-card tip-do">
            <strong>Use the system prompt for persistent behavior.</strong> Persona, output format,
            safety constraints — put these in the system prompt so they persist across turns.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t say &quot;think step by step&quot; to Opus.</strong> It reasons internally.
            Explicit CoT instructions can actually degrade Opus performance by forcing
            unnecessarily verbose output.
          </div>
          <div className="tip-card tip-dont">
            <strong>Don&apos;t ask Claude to browse the web.</strong> Claude Chat has no live web access.
            Use Claude Code (CLI) for tool-augmented workflows, or pair with Grok/Gemini for web data.
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#141414] rounded-lg p-4">
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-sm text-[#b0b0b0]">{desc}</p>
    </div>
  );
}

function PromptExample({
  title,
  description,
  prompt,
}: {
  title: string;
  description: string;
  prompt: string;
}) {
  return (
    <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] overflow-hidden">
      <div className="p-5">
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-sm text-[#b0b0b0] mb-3">{description}</p>
        <CopyableCode>{prompt}</CopyableCode>
      </div>
    </div>
  );
}
