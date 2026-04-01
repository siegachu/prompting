"""Update ai_tools_jobs.db:
1. Update popularity_rank based on airankings.co leaderboard (April 2026)
2. Remove general non-specific tools (chatbots everyone uses)
3. Ensure best tools are ranked by real-world usage
"""
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "ai_tools_jobs.db")

# airankings.co top 50 - April 1, 2026
# Maps tool name patterns to (rank, dominance%)
AIRANKINGS = {
    "ChatGPT": (1, 21.58),
    "Microsoft Copilot": (2, 6.56),
    "Copilot": (2, 6.56),
    "Google Gemini": (3, 4.06),
    "Gemini": (3, 4.06),
    "Claude": (4, 2.74),
    "Anthropic": (5, 2.67),
    "CapCut": (6, 1.9),
    "Semantic Scholar": (7, 1.43),
    "Perplexity": (8, 1.21),
    "Perplexity AI": (8, 1.21),
    "DeepL": (9, 1.18),
    "Miro": (10, 1.06),
    "QuillBot": (11, 1.02),
    "DeepSeek": (12, 0.89),
    "Grok": (13, 0.81),
    "Crisp": (14, 0.78),
    "Wondershare": (15, 0.67),
    "NotebookLM": (16, 0.62),
    "Picsart": (17, 0.61),
    "Doubao": (18, 0.57),
    "Chatbase": (19, 0.56),
    "Glean": (20, 0.54),
    "Suno": (24, 0.44),
    "LanguageTool": (26, 0.39),
    "Sider": (27, 0.38),
    "Hugging Face": (28, 0.36),
    "Character AI": (29, 0.36),
    "Character.ai": (29, 0.36),
    "OpenAI": (30, 0.36),
    "AssemblyAI": (31, 0.35),
    "Cursor": (32, 0.35),
    "Speechify": (35, 0.33),
    "Remove.bg": (37, 0.32),
    "ElevenLabs": (38, 0.32),
    "Eleven Labs": (38, 0.32),
    "Gong": (39, 0.32),
    "Coda": (40, 0.31),
    "Monica": (41, 0.31),
    "Synthesia": (42, 0.3),
    "Google AI Studio": (44, 0.3),
    "Moveworks": (45, 0.29),
    "Windsurf": (46, 0.29),
    "Gamma": (47, 0.29),
    "Brainly": (49, 0.27),
    "Microsoft Designer": (50, 0.27),
}

# General non-specific tools to REMOVE from profession recommendations
# These are general chatbots/assistants that everyone uses - not profession-specific
GENERAL_TOOLS = {
    "ChatGPT", "Claude", "Gemini", "Google Gemini", "Microsoft Copilot", "Copilot",
    "Grok", "DeepSeek", "Poe", "Character.ai", "Character AI", "Doubao",
    "Cici AI", "YouChat", "Anthropic", "OpenAI", "OpenAI API",
    "Google AI Studio", "Hugging Face",
    # Browser extensions that are general
    "Sider", "Monica",
}


def update_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()

    # 1. Update popularity_rank based on airankings data
    c.execute("SELECT id, name FROM ai_tools")
    all_tools = c.fetchall()

    updated = 0
    for tool in all_tools:
        tool_name = tool["name"]
        # Try exact match first, then partial
        rank_info = None
        if tool_name in AIRANKINGS:
            rank_info = AIRANKINGS[tool_name]
        else:
            for pattern, info in AIRANKINGS.items():
                if pattern.lower() in tool_name.lower() or tool_name.lower() in pattern.lower():
                    rank_info = info
                    break

        if rank_info:
            c.execute("UPDATE ai_tools SET popularity_rank = ? WHERE id = ?",
                       (rank_info[0], tool["id"]))
            updated += 1

    print(f"Updated popularity_rank for {updated} tools")

    # 2. Mark general tools - delete their job mappings so they don't show in recommendations
    general_ids = []
    for name in GENERAL_TOOLS:
        c.execute("SELECT id FROM ai_tools WHERE name = ?", (name,))
        for row in c.fetchall():
            general_ids.append(row["id"])

    # Also catch by category - remove generic chatbot entries
    c.execute("SELECT id, name FROM ai_tools WHERE category = 'Chatbots & Assistants'")
    chatbot_tools = c.fetchall()
    for tool in chatbot_tools:
        if tool["name"] in GENERAL_TOOLS or any(g.lower() in tool["name"].lower() for g in GENERAL_TOOLS):
            general_ids.append(tool["id"])

    general_ids = list(set(general_ids))

    if general_ids:
        placeholders = ",".join("?" * len(general_ids))
        # Remove mappings for general tools
        c.execute(f"DELETE FROM job_tool_mapping WHERE tool_id IN ({placeholders})", general_ids)
        # Remove the general tools themselves
        c.execute(f"DELETE FROM ai_tools WHERE id IN ({placeholders})", general_ids)
        print(f"Removed {len(general_ids)} general tools and their mappings")

    # 3. Print stats
    c.execute("SELECT COUNT(*) FROM ai_tools")
    print(f"Remaining tools: {c.fetchone()[0]}")
    c.execute("SELECT COUNT(*) FROM job_tool_mapping")
    print(f"Remaining mappings: {c.fetchone()[0]}")

    conn.commit()
    conn.close()
    print("Done!")


if __name__ == "__main__":
    update_db()
