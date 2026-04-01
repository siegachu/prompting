export interface ArticleSection {
  heading: string;
  content: string;
}

export interface Article {
  id: string;
  title: string;
  metaDescription: string;
  bestModel: string;
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    id: "write-perfect-resume",
    title: "How to Use AI to Write a Perfect Resume",
    metaDescription: "Learn the best AI prompts to craft a standout resume. Get copy-paste templates for Claude, ChatGPT, and Gemini that land interviews.",
    bestModel: "Claude",
    sections: [
      {
        heading: "Why AI Is Great for Resume Writing",
        content:
          "Writing a resume is one of the highest-ROI uses of AI. Models excel at restructuring your experience into achievement-oriented bullet points, tailoring language to specific job descriptions, and eliminating filler words. AI can transform a mediocre resume into a polished, ATS-friendly document in minutes rather than hours.",
      },
      {
        heading: "The Best Prompt Template",
        content: `Use this prompt to generate a tailored resume. Replace the bracketed sections with your details.

\`\`\`
I need you to rewrite my resume for a [JOB TITLE] role at [COMPANY].

Here is the job description:
[PASTE JOB DESCRIPTION]

Here is my current resume:
[PASTE RESUME TEXT]

Instructions:
1. Rewrite each bullet point as an achievement using the XYZ format: "Accomplished [X] as measured by [Y] by doing [Z]"
2. Prioritize skills and experience that match the job description
3. Remove irrelevant experience or condense it
4. Use strong action verbs and quantify results wherever possible
5. Keep it to one page if I have <10 years experience, two pages if more
6. Make it ATS-friendly — no tables, columns, or graphics
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**Claude** is best for resumes because it follows complex formatting instructions precisely and produces natural, non-robotic language. **ChatGPT** is a close second and handles creative phrasing well. **Gemini** works but sometimes ignores length constraints. **Grok** is serviceable but less polished for professional writing. For best results, use Claude or ChatGPT and iterate 2-3 times.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Do not paste your resume without the job description — the AI cannot tailor it blindly. Do not accept the first output without reviewing for accuracy; AI may embellish or fabricate metrics. Never use AI output verbatim without checking that every claim is truthful. Avoid generic prompts like \"write me a resume\" with no context — you will get generic results.",
      },
      {
        heading: "Advanced Tips",
        content:
          "Run the output through a second prompt: \"Review this resume as a hiring manager for [ROLE]. What would make you reject this candidate?\" This surfaces weak spots. You can also ask the AI to generate 3 variations of each bullet point so you can pick the strongest. For executive roles, add: \"Use a senior leadership tone emphasizing strategic impact and P&L ownership.\"",
      },
    ],
  },
  {
    id: "debug-code",
    title: "How to Use AI to Debug Your Code",
    metaDescription: "Fix bugs faster with AI. Get proven debugging prompts for Claude, ChatGPT, and Gemini that identify root causes and suggest fixes.",
    bestModel: "Claude",
    sections: [
      {
        heading: "Why AI Is Great for Debugging",
        content:
          "AI models can analyze stack traces, spot pattern mismatches, and suggest fixes across languages in seconds. They are especially powerful for unfamiliar codebases, cryptic error messages, and subtle logic bugs that a human might spend hours tracking down. The key is giving the model enough context to reason about your specific problem.",
      },
      {
        heading: "The Best Prompt Template",
        content: `Use this structure for maximum debugging accuracy:

\`\`\`
I have a bug in my [LANGUAGE] code. Here is the context:

**What I expect to happen:**
[DESCRIBE EXPECTED BEHAVIOR]

**What actually happens:**
[DESCRIBE ACTUAL BEHAVIOR, PASTE ERROR MESSAGE/STACK TRACE]

**Relevant code:**
[PASTE THE FUNCTION OR MODULE — include imports and type definitions]

**What I have already tried:**
[LIST DEBUGGING STEPS TAKEN]

Please:
1. Identify the root cause of the bug
2. Explain why it happens
3. Provide a corrected version of the code
4. Suggest how to prevent this class of bug in the future
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**Claude** leads for debugging thanks to its large context window (handles entire files) and precise reasoning about code flow. **ChatGPT** is strong for common patterns and quick fixes. **DeepSeek** excels at algorithmic and logic bugs. **Gemini** is good when you need to reference documentation. For complex multi-file bugs, Claude's 200K context is unmatched.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Do not paste only the error message without the code — the model needs both. Avoid sending your entire codebase; isolate the relevant function and its dependencies. Do not skip describing what you expected vs. what happened — \"it does not work\" gives the AI nothing to reason about. Never blindly apply a fix without understanding the explanation.",
      },
      {
        heading: "Advanced Tips",
        content:
          "For intermittent bugs, ask: \"What race conditions or timing issues could cause this behavior?\" For performance bugs, include profiling output and ask: \"Identify the bottleneck and suggest an O(n) alternative.\" Chain prompts: first ask for diagnosis, then ask for the fix, then ask for a unit test that would have caught the bug.",
      },
    ],
  },
  {
    id: "research-papers",
    title: "How to Use AI for Research Papers",
    metaDescription: "Write better research papers with AI. Get prompts for literature reviews, outlines, and drafts that maintain academic rigor.",
    bestModel: "Gemini",
    sections: [
      {
        heading: "Why AI Is Great for Research Papers",
        content:
          "AI accelerates every phase of research writing: brainstorming thesis angles, structuring arguments, summarizing source material, and refining prose. It excels at synthesizing information from multiple sources into coherent narratives. The key is using AI as a research assistant, not a ghostwriter — you bring the ideas and critical thinking, AI handles the heavy lifting of organization and drafting.",
      },
      {
        heading: "The Best Prompt Template",
        content: `Start with this prompt to generate a structured outline:

\`\`\`
I am writing a research paper on [TOPIC] for a [LEVEL: undergraduate/graduate/journal] audience.

My thesis statement is: [YOUR THESIS]

Key sources I am working with:
- [SOURCE 1: author, title, key finding]
- [SOURCE 2: author, title, key finding]
- [SOURCE 3: author, title, key finding]

Please:
1. Create a detailed outline with introduction, 3-4 body sections, and conclusion
2. For each section, suggest which sources support the argument
3. Identify potential counterarguments I should address
4. Suggest 2-3 areas where my argument might need more evidence
5. Use an academic tone appropriate for [FIELD]
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**Gemini** is best for research because Google Search grounding lets it find and reference real sources. **Claude** produces the most well-structured academic prose and handles long documents well. **ChatGPT** is good for brainstorming but sometimes fabricates citations. **DeepSeek** is strong for technical and scientific papers. Always verify every citation the AI provides — hallucinated references are common across all models.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Never submit AI-generated text as your own without thorough revision and fact-checking. Do not ask AI to \"write my paper\" — ask it to outline, draft sections, or improve your existing draft. Avoid trusting any citation the AI provides without verifying it exists. Do not use AI for the entire paper; your unique analysis and critical thinking are what matter.",
      },
      {
        heading: "Advanced Tips",
        content:
          "Use a multi-pass approach: first generate an outline, then draft each section separately with focused prompts, then ask AI to review the full draft for logical flow and gaps. Ask: \"What would a peer reviewer criticize about this argument?\" For literature reviews, feed the AI abstracts of 10-15 papers and ask it to identify themes and contradictions across them.",
      },
    ],
  },
  {
    id: "marketing-copy",
    title: "How to Use AI to Write Marketing Copy",
    metaDescription: "Create high-converting marketing copy with AI. Get prompts for ads, landing pages, and email campaigns that drive results.",
    bestModel: "ChatGPT",
    sections: [
      {
        heading: "Why AI Is Great for Marketing Copy",
        content:
          "Marketing copy requires volume, variation, and speed — exactly what AI delivers. Need 20 headline variations for A/B testing? Done in seconds. Need to adapt copy for different audiences or platforms? AI handles tone-shifting effortlessly. It also excels at applying proven copywriting frameworks (AIDA, PAS, BAB) consistently, which even experienced writers sometimes forget under deadline pressure.",
      },
      {
        heading: "The Best Prompt Template",
        content: `This prompt works for any marketing asset:

\`\`\`
Write [ASSET TYPE: landing page / email / ad copy / social post] for [PRODUCT/SERVICE].

Target audience: [DEMOGRAPHICS + PSYCHOGRAPHICS]
Tone: [professional / casual / urgent / playful]
Goal: [sign up / purchase / click through / share]
Key benefit: [THE #1 THING THE CUSTOMER GETS]
Proof point: [STAT, TESTIMONIAL, OR CASE STUDY]

Use the [AIDA / PAS / BAB] copywriting framework.
Include a clear call-to-action.
Keep it under [WORD COUNT] words.

Write 3 variations so I can A/B test.
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**ChatGPT** leads for marketing copy — it has the most natural, persuasive tone and understands copywriting frameworks deeply. **Claude** is excellent for longer-form content like landing pages and case studies where precision matters. **Grok** brings a punchy, conversational style good for social media. **Gemini** is solid but sometimes produces overly safe, corporate-sounding copy.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Do not use vague audience descriptions like \"everyone\" or \"businesses\" — specificity drives better copy. Avoid accepting the first draft; always ask for variations and iterate. Do not forget to specify the platform (LinkedIn copy differs from Instagram copy). Never skip the proof point — AI copy without evidence sounds hollow and generic.",
      },
      {
        heading: "Advanced Tips",
        content:
          "Feed the AI your best-performing past copy and say: \"Analyze the tone, structure, and hooks in this copy, then write new copy in the same style for [NEW PRODUCT].\" For email sequences, generate the entire 5-7 email nurture in one prompt with escalating urgency. Ask AI to write copy from the customer's perspective first (\"What would I need to hear to buy this?\") before writing the final version.",
      },
    ],
  },
  {
    id: "data-analysis",
    title: "How to Use AI for Data Analysis",
    metaDescription: "Analyze data faster with AI prompts. Get templates for cleaning, visualizing, and interpreting datasets in Python, R, and SQL.",
    bestModel: "Claude",
    sections: [
      {
        heading: "Why AI Is Great for Data Analysis",
        content:
          "Data analysis involves repetitive tasks — cleaning messy data, writing SQL queries, creating visualizations, running statistical tests — where AI saves enormous time. Models can generate pandas/R/SQL code from natural language descriptions, explain statistical results in plain English, and suggest analyses you might not have considered. The biggest win is going from question to working code in one prompt.",
      },
      {
        heading: "The Best Prompt Template",
        content: `Use this to go from raw data to insights:

\`\`\`
I have a dataset with these columns:
[LIST COLUMN NAMES AND TYPES, e.g., "date (datetime), revenue (float), region (string), product_category (string)"]

Here are the first 5 rows:
[PASTE SAMPLE DATA]

I want to answer this question:
[YOUR ANALYSIS QUESTION, e.g., "Which product categories are growing fastest by region?"]

Please:
1. Write Python (pandas) code to clean and prepare the data
2. Perform the analysis to answer my question
3. Create a clear visualization using matplotlib or seaborn
4. Summarize the key findings in 3-5 bullet points
5. Suggest 2 follow-up analyses I should consider
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**Claude** is best for data analysis because it handles large data contexts, writes clean Python, and explains its reasoning step-by-step. **ChatGPT** with Code Interpreter can actually execute code and show results, which is uniquely powerful. **DeepSeek** excels at complex statistical and mathematical analysis. **Gemini** is good for quick SQL queries. For exploratory analysis, ChatGPT Code Interpreter is hard to beat; for production-quality code, use Claude.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Do not dump an entire CSV into the prompt — paste the column schema and a few sample rows instead. Avoid asking \"analyze this data\" without a specific question; open-ended requests produce generic outputs. Do not skip validating the AI-generated code against known results. Never assume the AI's statistical interpretation is correct — verify p-values, confidence intervals, and effect sizes yourself.",
      },
      {
        heading: "Advanced Tips",
        content:
          "For complex pipelines, break it into steps: first ask for data cleaning code, validate the output, then ask for the analysis. Use the prompt: \"Write a data quality report for this dataset: check for nulls, duplicates, outliers, and type mismatches.\" For dashboards, ask AI to generate a complete Streamlit or Plotly Dash app from your data schema. Chain analysis: \"Given these findings, what hypotheses should I test next?\"",
      },
    ],
  },
  {
    id: "meal-planning",
    title: "How to Use AI to Plan Meals and Recipes",
    metaDescription: "Plan weekly meals with AI. Get prompts for custom recipes, grocery lists, and meal prep schedules tailored to your diet.",
    bestModel: "ChatGPT",
    sections: [
      {
        heading: "Why AI Is Great for Meal Planning",
        content:
          "Meal planning is a constraint-satisfaction problem — dietary restrictions, budget, time, ingredients on hand, variety — and AI handles constraints brilliantly. It can generate a full week of meals in seconds, adapt recipes to your pantry, scale portions, calculate macros, and create organized grocery lists. No more staring at the fridge wondering what to cook.",
      },
      {
        heading: "The Best Prompt Template",
        content: `Get a full weekly plan with one prompt:

\`\`\`
Create a 7-day meal plan for [NUMBER] people with these constraints:

Dietary needs: [vegetarian / keto / gluten-free / no restrictions]
Budget: [$ per week]
Cooking time: max [X] minutes per meal on weekdays
Skill level: [beginner / intermediate / advanced]
Ingredients I already have: [LIST]
Foods to avoid: [ALLERGIES OR DISLIKES]

For each day, provide:
1. Breakfast, lunch, dinner, and one snack
2. Estimated prep time and calories per serving
3. Use overlapping ingredients to minimize waste

Then generate a consolidated grocery list organized by store section (produce, dairy, protein, pantry).
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**ChatGPT** is best for meal planning — it produces creative, practical recipes and handles dietary constraints well. **Claude** gives more detailed nutritional breakdowns and follows complex constraint lists precisely. **Gemini** with Google Search can find trending recipes and seasonal ingredients. **Grok** works but tends toward simpler suggestions. For serious meal prep, ChatGPT or Claude are your best options.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Do not forget to specify serving sizes — AI defaults vary wildly. Avoid accepting calorie counts as gospel; AI estimates can be off by 20-30%. Do not ask for exotic ingredients if you want a practical plan — specify your grocery store and budget. Never skip the \"ingredients I already have\" field — this is what makes AI meal planning actually useful and reduces waste.",
      },
      {
        heading: "Advanced Tips",
        content:
          "Ask for a \"meal prep Sunday\" plan: \"Which of these meals can be batch-prepped on Sunday? Give me a 3-hour prep schedule.\" For leftovers optimization: \"Design meals where Monday's dinner protein becomes Tuesday's lunch.\" You can also paste a photo of your fridge contents (with ChatGPT or Gemini) and ask: \"What can I make with what I have?\" For fitness goals, add macro targets: \"Each day should hit approximately 150g protein, 200g carbs, 60g fat.\"",
      },
    ],
  },
  {
    id: "learn-new-language",
    title: "How to Use AI to Learn a New Language",
    metaDescription: "Learn any language faster with AI. Get prompts for conversation practice, grammar drills, and immersive learning scenarios.",
    bestModel: "ChatGPT",
    sections: [
      {
        heading: "Why AI Is Great for Language Learning",
        content:
          "AI is the first truly patient, always-available language tutor. It can hold conversations at your level, explain grammar rules with examples, correct your mistakes without judgment, and simulate real-world scenarios like ordering food or negotiating a lease. Unlike apps like Duolingo, AI adapts to your specific weaknesses and interests in real time.",
      },
      {
        heading: "The Best Prompt Template",
        content: `Set up an immersive practice session:

\`\`\`
You are my [LANGUAGE] tutor. My current level is [beginner/intermediate/advanced].

Rules for our conversation:
1. Speak to me in [LANGUAGE] with an English translation in parentheses after each sentence
2. If I make a grammar or vocabulary mistake, correct me immediately and explain the rule
3. Use vocabulary appropriate for my level, introducing 2-3 new words per exchange
4. After every 5 exchanges, give me a mini quiz on the new vocabulary
5. Adjust difficulty up if I am getting everything right

Let us start with this scenario: [ORDERING AT A RESTAURANT / JOB INTERVIEW / ASKING FOR DIRECTIONS / CASUAL SMALL TALK]

Begin the conversation.
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**ChatGPT** is best for language learning because its voice mode enables actual spoken conversation practice — a game-changer. **Claude** excels at grammar explanations and structured lessons. **Gemini** is strong for Asian languages and can reference Google Translate data. **Grok** and **DeepSeek** are less reliable for non-English languages. For speaking practice, ChatGPT voice mode is unmatched; for written study, Claude's detailed explanations are excellent.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Do not practice only in English and ask the AI to translate — you need to think in the target language. Avoid focusing solely on vocabulary without grammar context. Do not skip specifying your level — a beginner prompt fed advanced content will frustrate you. Never rely on AI alone; combine it with real human conversation, media consumption, and structured courses.",
      },
      {
        heading: "Advanced Tips",
        content:
          "Create spaced repetition by asking: \"Quiz me on all the vocabulary from our last 5 conversations.\" For writing practice: \"I will write a paragraph in [LANGUAGE]. Correct every error, rate my fluency 1-10, and rewrite it as a native speaker would.\" Simulate immersion: \"For the next 10 messages, respond only in [LANGUAGE] with no English. If I do not understand, rephrase more simply instead of translating.\" Use different scenarios each session to build diverse vocabulary.",
      },
    ],
  },
  {
    id: "business-emails",
    title: "How to Use AI to Write Business Emails",
    metaDescription: "Write professional business emails in seconds with AI. Get prompts for cold outreach, follow-ups, and difficult conversations.",
    bestModel: "Claude",
    sections: [
      {
        heading: "Why AI Is Great for Business Emails",
        content:
          "Business emails eat hours of your week, yet most follow predictable patterns. AI can draft a polished email in seconds, adjust tone for different recipients (CEO vs. peer vs. client), and help navigate delicate situations like delivering bad news or following up without being pushy. The ROI is massive: better emails, sent faster, with fewer awkward phrasings.",
      },
      {
        heading: "The Best Prompt Template",
        content: `This template handles any business email scenario:

\`\`\`
Write a professional email with these details:

To: [RECIPIENT ROLE, e.g., "VP of Engineering at a potential client"]
From: [YOUR ROLE]
Purpose: [WHAT YOU WANT TO ACHIEVE]
Context: [RELEVANT BACKGROUND — what happened before this email]
Tone: [formal / friendly-professional / direct / diplomatic]
Constraints: [MAX LENGTH, THINGS TO AVOID MENTIONING]

Key points to include:
1. [POINT 1]
2. [POINT 2]
3. [POINT 3]

End with a clear call-to-action: [WHAT YOU WANT THEM TO DO NEXT]

Write 2 versions: one concise (under 100 words) and one detailed.
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**Claude** is best for business emails — it nails professional tone, handles nuance in sensitive situations, and follows length constraints precisely. **ChatGPT** is a close second with slightly more creative phrasing. **Gemini** tends toward verbose, corporate-speak. **Grok** can be too casual for formal business contexts. For high-stakes emails (board communications, client escalations), Claude's precision is the safest choice.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Do not send AI-generated emails without reading them carefully — they sometimes include placeholder text or overly generic phrases. Avoid letting AI make promises or commitments on your behalf. Do not use the same template for internal and external emails — the tone should differ. Never include confidential information in your prompt if using a free-tier AI service.",
      },
      {
        heading: "Advanced Tips",
        content:
          "For email threads, paste the entire conversation and say: \"Read this thread and draft a reply that addresses all open questions while moving toward [GOAL].\" For difficult conversations: \"Draft an email delivering this bad news: [NEWS]. Be empathetic but clear. Do not over-apologize or make excuses.\" Create a \"voice profile\" prompt: \"Here are 5 emails I have written. Analyze my writing style, then use that style for all future emails in this conversation.\"",
      },
    ],
  },
  {
    id: "creative-writing",
    title: "How to Use AI for Creative Writing",
    metaDescription: "Boost your creative writing with AI. Get prompts for stories, poetry, worldbuilding, and overcoming writer's block effectively.",
    bestModel: "Claude",
    sections: [
      {
        heading: "Why AI Is Great for Creative Writing",
        content:
          "AI is a tireless brainstorming partner that never runs out of ideas. It excels at generating story concepts, developing characters, building consistent worlds, and helping you push past writer's block. The best use is as a collaborator, not a replacement: you provide the creative vision and emotional core, AI helps with structure, variation, and volume. Many published authors now use AI to draft outlines and explore plot alternatives.",
      },
      {
        heading: "The Best Prompt Template",
        content: `Use this to kickstart any creative project:

\`\`\`
I am writing a [GENRE] [FORMAT: short story / novel chapter / poem / screenplay scene].

Premise: [YOUR CORE IDEA IN 1-2 SENTENCES]
Protagonist: [NAME, KEY TRAITS, MOTIVATION]
Setting: [TIME, PLACE, ATMOSPHERE]
Tone: [dark / humorous / literary / fast-paced / lyrical]
Theme: [THE DEEPER MEANING OR QUESTION]

Please:
1. Write the opening scene (500 words) that hooks the reader immediately
2. Use vivid sensory details and strong voice
3. End on a moment of tension or surprise
4. Show, do not tell — convey emotion through action and dialogue
5. After the scene, suggest 3 possible directions the story could go
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**Claude** is best for creative writing — it produces the most literary, nuanced prose and follows stylistic instructions precisely. **ChatGPT** is more commercially accessible and great for genre fiction. **Gemini** can be creative but sometimes defaults to safe, predictable plotting. **Grok** has a distinctive voice that works for humor and satire. For serious literary fiction or poetry, Claude leads; for fast-paced genre fiction, ChatGPT is excellent.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Do not ask AI to \"write a story\" with no constraints — you will get generic output. Avoid using AI prose verbatim without editing for your voice. Do not let AI resolve conflict too easily; it defaults to neat, happy endings. Never share AI-generated work as entirely your own in contexts where originality is expected. The best creative writing uses AI as a tool within a human creative process.",
      },
      {
        heading: "Advanced Tips",
        content:
          "Feed the AI a passage from an author you admire and say: \"Analyze the prose style — sentence length, vocabulary level, use of metaphor, pacing. Then write a scene in a similar style about [YOUR TOPIC].\" For worldbuilding: \"Create a consistent magic system / political structure / technology for [SETTING] with clear rules and limitations.\" To beat writer's block: \"Here is my story so far. Write 5 wildly different versions of what happens next — make at least 2 of them surprising.\"",
      },
    ],
  },
  {
    id: "job-interview-prep",
    title: "How to Use AI to Prepare for Job Interviews",
    metaDescription: "Ace your next job interview with AI. Get prompts for mock interviews, STAR answers, and company research that impress hiring managers.",
    bestModel: "ChatGPT",
    sections: [
      {
        heading: "Why AI Is Great for Interview Preparation",
        content:
          "Interview prep is one of the most impactful uses of AI. Models can simulate realistic interview scenarios, generate likely questions based on job descriptions, help you structure STAR-method answers, and give instant feedback on your responses. Unlike practicing in a mirror, AI provides specific, actionable critiques. It is like having a career coach available 24/7 at no cost.",
      },
      {
        heading: "The Best Prompt Template",
        content: `Run a full mock interview session:

\`\`\`
You are a hiring manager interviewing me for [JOB TITLE] at [COMPANY].

Here is the job description:
[PASTE JOB DESCRIPTION]

Here is my resume:
[PASTE RESUME]

Conduct a realistic 30-minute interview:
1. Start with an icebreaker question
2. Ask 5 behavioral questions using the STAR method (Situation, Task, Action, Result)
3. Ask 2 technical/role-specific questions
4. Ask 1 curveball question
5. After each of my answers, rate it 1-10 and give specific feedback on how to improve
6. At the end, give an overall assessment and top 3 things to work on

Wait for my response after each question before proceeding.
\`\`\``,
      },
      {
        heading: "Model Comparison",
        content:
          "**ChatGPT** is best for interview prep — especially with voice mode for realistic verbal practice. **Claude** gives the most detailed and constructive feedback on your answers. **Gemini** with search can pull real interview questions reported for specific companies on Glassdoor. **Grok** can search X for recent interview experiences at target companies. For the full experience, use ChatGPT voice for practice and Claude for answer refinement.",
      },
      {
        heading: "Common Mistakes to Avoid",
        content:
          "Do not memorize AI-generated answers word-for-word — interviewers spot rehearsed responses immediately. Avoid using the same STAR stories for every question; prepare 5-7 diverse examples. Do not skip the company research step; ask AI to summarize the company's recent news, challenges, and culture. Never lie or exaggerate in your STAR stories, even if AI suggests embellishments.",
      },
      {
        heading: "Advanced Tips",
        content:
          "After your mock interview, ask: \"Based on my answers, what follow-up questions would a skeptical interviewer ask?\" Prepare for salary negotiation: \"I have an offer for [ROLE] at [AMOUNT]. The market range is [RANGE]. Script a negotiation conversation where I ask for [TARGET].\" For final rounds, ask: \"What strategic questions should I ask the CEO/VP to show I think at a senior level?\" Create a cheat sheet: \"Summarize my top 5 STAR stories in bullet points I can review 10 minutes before the interview.\"",
      },
    ],
  },
];
