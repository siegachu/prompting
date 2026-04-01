"""AI prompting tweet content generator for askairight.com.

Generates tweets about AI prompting tips, model comparisons,
and practical AI usage advice.
"""

import random

SITE_URL = "askairight.com"

PROMPTING_TIPS = [
    "AI prompting tip: Always include context before your question. \"I'm a marketing manager writing ad copy\" gets 10x better results than just asking for ad copy.",
    "The #1 mistake people make with AI: being too vague. \"Write something good\" fails. \"Write a 3-paragraph blog intro about remote work trends for HR professionals\" works.",
    "Want better AI responses? Use the XYZ framework: give eXamples of what you want, specify Your constraints, and define the Zone (audience/tone).",
    "Pro tip: Tell AI what NOT to do. \"Don't use jargon. Don't exceed 200 words. Don't start with 'In today's world.'\" Constraints improve output dramatically.",
    "AI prompting hack: Ask for multiple options. \"Give me 5 different subject lines\" then pick the best one. AI is better at generating variety than perfection.",
    "Role prompting works. \"You are a senior tax accountant explaining to a small business owner\" produces dramatically different (and better) output than a generic ask.",
    "Temperature matters. For factual answers, set temperature to 0. For creative writing, set it to 0.8-1.0. Most people never adjust this.",
    "Chain-of-thought prompting: Add \"Think step by step\" to complex questions. It forces the AI to show its reasoning and catches errors before the final answer.",
    "AI can't read your mind. If you're unhappy with the output, don't re-prompt from scratch — tell it what was wrong. \"This is too formal, make it conversational\" is faster.",
    "The best AI prompt has 4 parts: Role (who the AI is), Context (background info), Task (what to do), and Format (how to structure the output).",
    "Prompt chaining: Break complex tasks into steps. Step 1: research. Step 2: outline. Step 3: draft. Step 4: edit. Each step uses the previous output as input.",
    "Few-shot prompting: Show the AI 2-3 examples of what you want before asking it to generate. Works incredibly well for consistent formatting and tone.",
    "Always specify your output format. \"Return as a numbered list\" or \"Format as a markdown table\" or \"Write as a JSON object.\" Don't leave formatting to chance.",
    "Iteration beats perfection. Your first prompt won't be perfect. Send it, see what comes back, then refine. 3 iterations usually gets you to 90%+ quality.",
    "System prompts are underrated. If you use the API, a well-crafted system prompt saves you from repeating instructions in every message.",
    "AI is great at transformation tasks: summarize this, translate that, convert this format. It struggles more with pure creation from nothing. Give it raw material.",
    "Use delimiters in your prompts. Wrap input text in triple quotes or XML tags so the AI knows what's instruction vs. what's content to process.",
    "Negative examples help. \"Here's a BAD example of what I don't want: [example]. Here's a GOOD example: [example]. Now write one like the good example.\"",
    "Length control tip: \"Write exactly 3 sentences\" works better than \"Keep it short.\" Be specific about length, word count, or paragraph count.",
    "AI hallucination defense: Ask \"Are you confident this is factually accurate? If not, say so.\" Models will often flag their own uncertainty when prompted.",
]

MODEL_COMPARISONS = [
    "Claude vs ChatGPT: Claude follows complex instructions more precisely. ChatGPT is more creative with open-ended tasks. Both are excellent — pick based on your task.",
    "Best AI for coding: Claude and ChatGPT-4 lead. Claude excels at large codebase understanding. ChatGPT is faster for quick snippets. Gemini is catching up fast.",
    "Best AI for writing: Claude produces the most natural-sounding prose. ChatGPT is great for brainstorming and drafts. Gemini handles research-heavy writing well.",
    "Free AI tier comparison: ChatGPT free (GPT-4o mini), Claude free (limited Sonnet), Gemini free (Flash). All capable for basic prompting. Paid tiers unlock the real power.",
    "Grok's superpower: real-time X/Twitter data. If you need current social media trends or sentiment, Grok is the only model with live access.",
    "Gemini's advantage: Google Search integration. For research tasks that need current web data, Gemini can search and synthesize in one step.",
    "For math and logic problems: Claude and ChatGPT-4 are neck and neck. DeepSeek is surprisingly strong for mathematical reasoning at a fraction of the cost.",
    "Image generation: DALL-E (ChatGPT), Imagen (Gemini), and standalone tools like Midjourney/Flux all have different strengths. Midjourney for art, DALL-E for quick concepts.",
    "AI for spreadsheets: ChatGPT with Code Interpreter handles Excel/CSV analysis best. Claude is better for formula writing and complex data logic.",
    "Context window matters: Claude offers 200K tokens (a full novel). ChatGPT-4 offers 128K. Gemini 2.5 offers 1M. For long documents, context window is king.",
]

PRACTICAL_USES = [
    "Use AI to prepare for job interviews: \"I'm interviewing for [ROLE] at [COMPANY]. Give me 10 likely questions and strong answers based on my background: [RESUME].\"",
    "AI for email writing: paste the email you received and say \"Draft a professional reply that [your goal]. Keep it under 100 words.\" Saves 10 minutes per email.",
    "Students: Don't ask AI to write your essay. Instead: \"I've outlined my argument as [X]. What are the strongest counterarguments I should address?\" That's learning.",
    "AI for meeting notes: Paste a transcript and prompt: \"Extract: (1) key decisions made, (2) action items with owners, (3) unresolved questions. Format as bullet points.\"",
    "Use AI to learn faster: \"Explain [concept] to me as if I'm a [your background]. Use analogies from [your field]. Then quiz me with 3 questions.\"",
    "AI for cooking: \"I have [ingredients]. Give me 3 dinner recipes ranked by prep time. Include exact measurements and step-by-step instructions.\"",
    "Negotiation prep with AI: \"I'm negotiating [salary/lease/contract]. My position is [X]. What are the strongest arguments for and against? Give me 3 counter-strategies.\"",
    "AI for travel planning: \"Plan a 5-day trip to [destination] for [budget]. Include daily itinerary, restaurant recommendations, and transport between locations.\"",
    "Use AI to proofread: Don't just say \"proofread this.\" Say \"Check for grammar, clarity, and tone. Flag any sentences that are unclear or could be misread.\"",
    "AI for parents: \"My 8-year-old asked me [question]. Explain it in a way a child would understand, using a fun analogy.\" Works brilliantly for homework help.",
]

AI_FACTS = [
    "GPT-4 was trained on roughly 13 trillion tokens of text. For context, that's about 10 million books worth of information.",
    "The word \"hallucination\" in AI means the model confidently generates false information. It's not lying — it's pattern-matching without understanding truth.",
    "AI models don't \"remember\" your previous conversations (unless you're in the same chat session). Each new chat starts from zero.",
    "The AI industry uses more electricity than some small countries. A single ChatGPT query uses ~10x more energy than a Google search.",
    "Prompt engineering is now a real job title. Senior prompt engineers at top companies earn $150,000-$300,000/year.",
    "Claude was trained using Constitutional AI (CAI) — it has internal rules it follows, not just RLHF from human feedback.",
    "AI models are getting cheaper fast. GPT-4 API costs dropped 95% in 18 months. What cost $100 in 2023 costs $5 in 2025.",
    "The 'temperature' setting in AI controls randomness. 0 = deterministic (same answer every time). 1 = creative (different each time).",
    "Most AI chatbots have a 'system prompt' you never see — hidden instructions from the developer that shape behavior before you type anything.",
    "RAG (Retrieval-Augmented Generation) is how AI gets current information. It searches a database first, then generates answers using those results.",
    "Fine-tuning an AI model costs $500-$50,000+ depending on data size. But prompt engineering can achieve 80% of the same results for free.",
    "AI can now pass the bar exam, medical licensing exams, and most AP tests. But it still struggles with basic spatial reasoning and counting.",
    "The 2024 NAR settlement changed real estate. AI tools are now helping FSBO sellers handle tasks that used to require expensive agents.",
    "Multi-modal AI (text + images + audio) is the 2026 frontier. Models that can see, read, and hear simultaneously are becoming standard.",
    "Open-source AI models (LLaMA, Mistral, DeepSeek) are closing the gap with proprietary ones. You can run capable models on your own hardware.",
]

COMMON_MISTAKES = [
    "Stop starting prompts with \"Can you...\" or \"Please...\" — just state what you need. AI doesn't need politeness, it needs clarity.",
    "Don't use AI as a search engine. It can't give you today's stock price or yesterday's news. Use it for analysis, writing, and reasoning.",
    "Biggest AI mistake: accepting the first response without iterating. Always follow up with \"Now improve this by [specific feedback].\"",
    "Don't paste sensitive data (SSN, passwords, medical records) into free AI chatbots. Paid API access with data policies is safer for sensitive info.",
    "Stop asking AI \"Is this correct?\" about its own output. It will almost always say yes. Instead, ask it to \"List potential errors in your response.\"",
    "AI is not a replacement for expertise — it's an amplifier. A good prompt from an expert produces 10x better output than the same prompt from a novice.",
    "Don't expect AI to be creative on command. Feed it constraints. \"Write a poem\" is boring. \"Write a haiku about debugging code at 3 AM\" is interesting.",
    "Copying AI output word-for-word is detectable by AI detection tools. More importantly, it's usually not as good as output you've edited and personalized.",
    "Don't ask AI to \"be concise\" without defining what concise means to you. \"Answer in 2 sentences\" is better than \"keep it brief.\"",
    "AI doesn't understand sarcasm reliably. If you want a sarcastic tone, explicitly say \"Use a sarcastic, witty tone\" — don't expect it to infer.",
]

ALL_POOLS = {
    "prompting": PROMPTING_TIPS,
    "models": MODEL_COMPARISONS,
    "practical": PRACTICAL_USES,
    "facts": AI_FACTS,
    "mistakes": COMMON_MISTAKES,
}

HASHTAG_MAP = {
    "prompting": ["#AI", "#PromptEngineering", "#AITips", "#ChatGPT"],
    "models": ["#AI", "#ChatGPT", "#Claude", "#Gemini"],
    "practical": ["#AI", "#Productivity", "#AITips", "#LifeHack"],
    "facts": ["#AI", "#ArtificialIntelligence", "#TechFacts", "#MachineLearning"],
    "mistakes": ["#AI", "#AITips", "#PromptEngineering", "#TechTips"],
}


def generate_tweet(posted_hashes: set[int], promo: bool = False) -> tuple[str, str, int]:
    """Generate a unique tweet. Returns (tweet_text, category, content_hash)."""
    max_attempts = 50
    for _ in range(max_attempts):
        category = random.choice(list(ALL_POOLS.keys()))
        content = random.choice(ALL_POOLS[category])

        content_hash = hash(content)
        if content_hash in posted_hashes:
            continue

        tags = HASHTAG_MAP.get(category, ["#AI", "#AITips"])
        tag_str = " ".join(tags)

        if promo:
            footer = f"\n\nLearn to prompt better at {SITE_URL}\n{tag_str}"
        else:
            footer = f"\n\n{tag_str}"

        tweet = f"{content}{footer}"

        if len(tweet) > 280:
            over = len(tweet) - 280
            content = content[:-(over + 3)].rstrip() + "..."
            tweet = f"{content}{footer}"

        if len(tweet) <= 280:
            return tweet, category, content_hash

    tweet = f"The best AI prompt has 4 parts: Role, Context, Task, and Format. Master these and you'll get better results from any model.\n\n#AI #PromptEngineering"
    return tweet, "prompting", hash(tweet)
