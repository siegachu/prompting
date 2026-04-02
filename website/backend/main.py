import os
import sqlite3
from contextlib import contextmanager
from pathlib import Path
from fastapi import FastAPI, Query, Request
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse, RedirectResponse, PlainTextResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ask It Right", docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://www.rsfundmanagement.com",
        "https://askairight.com",
        "https://www.askairight.com",
    ],
    allow_methods=["GET"],
    allow_headers=["*"],
)

BASE_PATH = os.getenv("BASE_PATH", "")
STATIC_DIR = Path(os.getenv("STATIC_DIR", "/app/static"))
BACKEND_DIR = Path(__file__).parent

# --- AI Tools Finder (Professional Tools) ---

DB_PATH = BACKEND_DIR / "ai_tools_jobs.db"
templates = Jinja2Templates(directory=str(BACKEND_DIR / "templates"))


@contextmanager
def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


@app.get("/professional_tools", response_class=HTMLResponse)
@app.get("/professional_tools/", response_class=HTMLResponse)
async def professional_tools_index(request: Request):
    with get_db() as conn:
        c = conn.cursor()
        c.execute("""
            SELECT name, description, url, category, pricing_tier
            FROM ai_tools ORDER BY popularity_rank ASC LIMIT 20
        """)
        top_tools = [dict(r) for r in c.fetchall()]
    return templates.TemplateResponse(request=request, name="professional_tools.html", context={"top_tools": top_tools})


@app.get("/professional_tools/api/professions")
async def pt_get_professions():
    with get_db() as conn:
        c = conn.cursor()
        c.execute("""
            SELECT id, title, category, is_freelance
            FROM jobs ORDER BY is_freelance, category, title
        """)
        rows = c.fetchall()
    grouped = {}
    for r in rows:
        cat = r["category"]
        if r["is_freelance"]:
            cat = f"Freelance — {cat}"
        if cat not in grouped:
            grouped[cat] = []
        grouped[cat].append({
            "id": r["id"],
            "title": r["title"],
            "is_freelance": bool(r["is_freelance"]),
        })
    return grouped


@app.get("/professional_tools/api/categories")
async def pt_get_categories():
    with get_db() as conn:
        c = conn.cursor()
        c.execute("""
            SELECT category, COUNT(*) as cnt,
                   MIN(popularity_rank) as best_rank
            FROM ai_tools GROUP BY category
            ORDER BY best_rank ASC, cnt DESC
        """)
        rows = c.fetchall()
    return [{"category": r["category"], "count": r["cnt"]} for r in rows]


def _get_tools_for_profession(c, profession_id):
    """Top row: 5 tailored tools (star the one with best airankings popularity).
    Bottom row: 2 most-used overall + 2 most-used in the job's broad sector.
    """
    # Get job info for sector
    c.execute("SELECT title, category FROM jobs WHERE id = ?", (profession_id,))
    job = c.fetchone()
    sector = job["category"] if job else None

    # --- TOP ROW: 5 tailored for your role ---
    # Highest value_add_score = most relevant to profession
    c.execute("""
        SELECT t.id, t.name, t.category, t.subcategory, t.description,
               t.url, t.pricing, t.pricing_tier,
               m.use_case, m.automation_potential, m.value_add_score,
               t.popularity_rank
        FROM job_tool_mapping m
        JOIN ai_tools t ON m.tool_id = t.id
        WHERE m.job_id = ?
        GROUP BY t.id
        HAVING m.value_add_score = MAX(m.value_add_score)
        ORDER BY m.value_add_score DESC, t.popularity_rank ASC
        LIMIT 5
    """, (profession_id,))
    tailored = [dict(r) for r in c.fetchall()]
    tailored_ids = {t["id"] for t in tailored}

    # Star the one with best airankings popularity (lowest popularity_rank)
    if tailored:
        best_rank_idx = min(range(len(tailored)),
                            key=lambda i: tailored[i]["popularity_rank"])
        for i, t in enumerate(tailored):
            t["recommendation_type"] = "star" if i == best_rank_idx else "tailored"

    # --- BOTTOM ROW: 2 most-used overall + 2 most-used in sector ---
    # 2 most-used overall (by popularity_rank, not already in tailored)
    if tailored_ids:
        id_ph = ",".join("?" * len(tailored_ids))
        c.execute(f"""
            SELECT t.id, t.name, t.category, t.subcategory, t.description,
                   t.url, t.pricing, t.pricing_tier,
                   m.use_case, m.automation_potential, m.value_add_score,
                   t.popularity_rank
            FROM job_tool_mapping m
            JOIN ai_tools t ON m.tool_id = t.id
            WHERE m.job_id = ? AND t.id NOT IN ({id_ph})
            GROUP BY t.id
            HAVING m.value_add_score = MAX(m.value_add_score)
            ORDER BY t.popularity_rank ASC
            LIMIT 2
        """, (profession_id, *tailored_ids))
    else:
        c.execute("""
            SELECT t.id, t.name, t.category, t.subcategory, t.description,
                   t.url, t.pricing, t.pricing_tier,
                   m.use_case, m.automation_potential, m.value_add_score,
                   t.popularity_rank
            FROM job_tool_mapping m
            JOIN ai_tools t ON m.tool_id = t.id
            WHERE m.job_id = ?
            GROUP BY t.id
            HAVING m.value_add_score = MAX(m.value_add_score)
            ORDER BY t.popularity_rank ASC
            LIMIT 2
        """, (profession_id,))
    most_used = [dict(r) for r in c.fetchall()]
    most_used_ids = {t["id"] for t in most_used}
    for t in most_used:
        t["recommendation_type"] = "popular"

    # 2 most-used in the same broad sector (other jobs in same category)
    all_used_ids = tailored_ids | most_used_ids
    id_ph = ",".join("?" * len(all_used_ids))
    c.execute(f"""
        SELECT t.id, t.name, t.category, t.subcategory, t.description,
               t.url, t.pricing, t.pricing_tier,
               m.use_case, m.automation_potential, m.value_add_score,
               t.popularity_rank
        FROM job_tool_mapping m
        JOIN ai_tools t ON m.tool_id = t.id
        JOIN jobs j ON m.job_id = j.id
        WHERE j.category = ? AND t.id NOT IN ({id_ph})
        GROUP BY t.id
        ORDER BY t.popularity_rank ASC, m.value_add_score DESC
        LIMIT 2
    """, (sector, *all_used_ids))
    sector_tools = [dict(r) for r in c.fetchall()]
    for t in sector_tools:
        t["recommendation_type"] = "sector"
        t["sector_name"] = sector

    return tailored + most_used + sector_tools


def _get_tools_for_category(c, category):
    """Top row: 5 most unique/niche tools in this category.
    Bottom row: 2 most popular overall + 2 broader related tools.
    """
    # Top row: unique tools in this category (fewest job mappings = most niche)
    c.execute("""
        SELECT t.id, t.name, t.category, t.subcategory, t.description,
               t.url, t.pricing, t.pricing_tier, t.popularity_rank,
               (SELECT COUNT(DISTINCT m2.job_id) FROM job_tool_mapping m2
                WHERE m2.tool_id = t.id) as job_count
        FROM ai_tools t
        WHERE t.category = ?
        ORDER BY job_count ASC, t.popularity_rank ASC
        LIMIT 5
    """, (category,))
    unique_tools = [dict(r) for r in c.fetchall()]
    unique_ids = {t["id"] for t in unique_tools}

    # Star the one with best airankings popularity
    if unique_tools:
        best_rank_idx = min(range(len(unique_tools)),
                            key=lambda i: unique_tools[i]["popularity_rank"])
        for i, t in enumerate(unique_tools):
            t["recommendation_type"] = "star" if i == best_rank_idx else "tailored"

    # Bottom: 2 most popular in this category + 2 from broader/related categories
    if unique_ids:
        id_ph = ",".join("?" * len(unique_ids))
        c.execute(f"""
            SELECT t.id, t.name, t.category, t.subcategory, t.description,
                   t.url, t.pricing, t.pricing_tier, t.popularity_rank
            FROM ai_tools t
            WHERE t.category = ? AND t.id NOT IN ({id_ph})
            ORDER BY t.popularity_rank ASC
            LIMIT 2
        """, (category, *unique_ids))
    else:
        c.execute("""
            SELECT t.id, t.name, t.category, t.subcategory, t.description,
                   t.url, t.pricing, t.pricing_tier, t.popularity_rank
            FROM ai_tools t WHERE t.category = ?
            ORDER BY t.popularity_rank ASC LIMIT 2
        """, (category,))
    popular = [dict(r) for r in c.fetchall()]
    popular_ids = {t["id"] for t in popular}
    for t in popular:
        t["recommendation_type"] = "popular"

    # 2 broader tools (most popular from ANY category, not already shown)
    all_ids = unique_ids | popular_ids
    id_ph = ",".join("?" * len(all_ids))
    c.execute(f"""
        SELECT t.id, t.name, t.category, t.subcategory, t.description,
               t.url, t.pricing, t.pricing_tier, t.popularity_rank
        FROM ai_tools t
        WHERE t.id NOT IN ({id_ph})
        ORDER BY t.popularity_rank ASC
        LIMIT 2
    """, (*all_ids,))
    broader = [dict(r) for r in c.fetchall()]
    for t in broader:
        t["recommendation_type"] = "sector"

    return unique_tools + popular + broader


@app.get("/professional_tools/api/tools")
async def pt_get_tools(
    profession_id: int = Query(None, description="Job/profession ID"),
    category: str = Query(None, description="Tool category filter"),
    q: str = Query(None, description="Search query"),
):
    with get_db() as conn:
        c = conn.cursor()

        if profession_id:
            tools = _get_tools_for_profession(c, profession_id)
            total = len(tools)

            c.execute("SELECT title, category FROM jobs WHERE id = ?", (profession_id,))
            job = c.fetchone()
            job_info = {"title": job["title"], "category": job["category"]} if job else None

        elif category:
            tools = _get_tools_for_category(c, category)
            total = len(tools)
            job_info = {"category_search": category}

        elif q:
            search_term = f"%{q}%"
            c.execute("""
                SELECT id, title, category, is_freelance FROM jobs
                WHERE title LIKE ? OR category LIKE ?
                ORDER BY title LIMIT 5
            """, (search_term, search_term))
            matching_jobs = [dict(r) for r in c.fetchall()]

            if matching_jobs:
                tools = _get_tools_for_profession(c, matching_jobs[0]["id"])
                total = len(tools)
                job_info = {"matched_jobs": matching_jobs}
            else:
                c.execute("""
                    SELECT id, name, category, subcategory, description, url, pricing, pricing_tier,
                           popularity_rank
                    FROM ai_tools WHERE name LIKE ? OR description LIKE ? OR category LIKE ?
                    ORDER BY popularity_rank ASC, name LIMIT 9
                """, (search_term, search_term, search_term))
                tools = [dict(r) for r in c.fetchall()]
                total = len(tools)
                job_info = None
        else:
            c.execute("""
                SELECT id, name, category, subcategory, description, url, pricing, pricing_tier,
                       popularity_rank
                FROM ai_tools ORDER BY popularity_rank ASC, name LIMIT 9
            """)
            tools = [dict(r) for r in c.fetchall()]
            total = len(tools)
            job_info = None

    return {
        "tools": tools,
        "total": total,
        "page": 1,
        "limit": 9,
        "total_pages": 1,
        "job_info": job_info,
    }


@app.get("/professional_tools/api/search-professions")
async def pt_search_professions(q: str = Query("", min_length=1)):
    with get_db() as conn:
        c = conn.cursor()
        search_term = f"%{q}%"
        c.execute("""
            SELECT id, title, category, is_freelance
            FROM jobs WHERE title LIKE ? OR category LIKE ?
            ORDER BY title LIMIT 10
        """, (search_term, search_term))
        results = [dict(r) for r in c.fetchall()]
    return results


@app.get("/professional_tools/api/stats")
async def pt_get_stats():
    with get_db() as conn:
        c = conn.cursor()
        stats = {}
        c.execute("SELECT COUNT(*) FROM ai_tools")
        stats["total_tools"] = c.fetchone()[0]
        c.execute("SELECT COUNT(*) FROM jobs")
        stats["total_jobs"] = c.fetchone()[0]
        c.execute("SELECT COUNT(*) FROM job_tool_mapping")
        stats["total_mappings"] = c.fetchone()[0]
        c.execute("SELECT COUNT(DISTINCT category) FROM ai_tools")
        stats["total_categories"] = c.fetchone()[0]
    return stats


# --- Prompting Guide (SPA) ---

@app.get("/", include_in_schema=False)
async def root_redirect():
    if not BASE_PATH:
        root_index = STATIC_DIR / "index.html"
        if root_index.is_file():
            return FileResponse(root_index)
    return RedirectResponse(url=BASE_PATH)


@app.get(f"{BASE_PATH}/api/health")
async def health():
    return {"status": "ok", "service": "prompting-guide"}


# Serve Next.js static export
if STATIC_DIR.exists():
    app.mount(
        f"{BASE_PATH}/_next",
        StaticFiles(directory=STATIC_DIR / "_next"),
        name="next-assets",
    )

    @app.get(f"{BASE_PATH}/{{path:path}}")
    async def serve_spa(request: Request, path: str = ""):
        # Skip professional_tools paths (handled above)
        if path.startswith("professional_tools"):
            return HTMLResponse("<h1>Not Found</h1>", status_code=404)

        # Try exact file first
        file_path = STATIC_DIR / path
        if file_path.is_file():
            return FileResponse(file_path)

        # Try with .html extension
        html_path = STATIC_DIR / f"{path}.html"
        if html_path.is_file():
            return FileResponse(html_path)

        # Try index.html in directory
        index_path = STATIC_DIR / path / "index.html"
        if index_path.is_file():
            return FileResponse(index_path)

        # Serve 404 page for unknown routes
        not_found_page = STATIC_DIR / "404.html"
        if not_found_page.is_file():
            return HTMLResponse(not_found_page.read_text(), status_code=404)

        return HTMLResponse("<h1>Not Found</h1>", status_code=404)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8080")))
