"""AskAIRight X/Twitter auto-poster.

Posts 1 tweet per run about AI prompting tips. Scheduled 2x daily.
Every 5th tweet includes a link to askairight.com.

Usage:
    python x_poster.py              # Post 1 tweet
    python x_poster.py --dry-run    # Preview without posting
    python x_poster.py --count 3    # Post 3 tweets
    python x_poster.py --status     # Show posting stats
"""

import argparse
import json
import logging
import random
import sqlite3
import sys
import time
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from playwright.sync_api import sync_playwright

from ai_tweets import generate_tweet

SCRIPTS_DIR = Path(__file__).resolve().parent
DB_PATH = SCRIPTS_DIR / "ai_posts.db"
COOKIES_FILE = SCRIPTS_DIR / ".x_cookies.json"
SESSION_DIR = SCRIPTS_DIR / ".x_session"
TZ = ZoneInfo("America/New_York")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(SCRIPTS_DIR / "x_poster.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("ai_x_poster")


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    conn.execute("""
        CREATE TABLE IF NOT EXISTS posted_tweets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content_hash INTEGER NOT NULL,
            category TEXT,
            tweet_preview TEXT,
            posted_at TEXT NOT NULL,
            is_promo INTEGER DEFAULT 0
        )
    """)
    conn.commit()
    return conn


def get_post_count(conn): return conn.execute("SELECT COUNT(*) c FROM posted_tweets").fetchone()["c"]
def get_posted_hashes(conn): return {r["content_hash"] for r in conn.execute("SELECT content_hash FROM posted_tweets").fetchall()}
def is_promo(conn): return (get_post_count(conn) + 1) % 5 == 0


def post_tweet(tweet_text: str) -> bool:
    SESSION_DIR.mkdir(exist_ok=True)
    if not COOKIES_FILE.exists():
        log.error("No cookies file: %s", COOKIES_FILE)
        return False

    with sync_playwright() as pw:
        ctx = pw.chromium.launch_persistent_context(
            str(SESSION_DIR), headless=True,
            viewport={"width": 1280, "height": 800},
            locale="en-US", timezone_id="America/New_York",
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        )
        with open(COOKIES_FILE) as f:
            ctx.add_cookies(json.load(f))

        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        try:
            page.goto("https://x.com/home", timeout=20000)
            page.wait_for_timeout(3000 + random.randint(500, 2000))
            if "login" in page.url.lower():
                log.error("Session expired. Update cookies in %s", COOKIES_FILE)
                ctx.close(); return False

            page.evaluate('''() => { document.querySelectorAll('[role="dialog"] [role="button"]').forEach(b => { if (b.textContent.includes('Not now') || b.textContent.includes('Close')) b.click(); }); }''')
            page.wait_for_timeout(1000)

            page.goto("https://x.com/compose/post", timeout=20000)
            page.wait_for_timeout(3000 + random.randint(500, 2000))
            if "login" in page.url.lower():
                log.error("Compose redirected to login"); ctx.close(); return False

            compose = page.query_selector('[data-testid="tweetTextarea_0"]')
            if not compose:
                log.error("No compose box"); ctx.close(); return False

            compose.click(force=True)
            page.wait_for_timeout(500 + random.randint(100, 500))
            for char in tweet_text:
                page.keyboard.type(char, delay=random.randint(30, 80))
                if random.random() < 0.05:
                    page.wait_for_timeout(random.randint(200, 600))
            page.wait_for_timeout(2000 + random.randint(500, 1500))

            clicked = page.evaluate('''() => { const btn = document.querySelector('[data-testid="tweetButton"]') || document.querySelector('[data-testid="tweetButtonInline"]'); if (btn) { btn.click(); return true; } return false; }''')
            if not clicked:
                log.error("No Post button"); ctx.close(); return False

            page.wait_for_timeout(5000)
            toast = page.query_selector('[data-testid="toast"]')
            if toast:
                txt = toast.inner_text().lower()
                if "sent" in txt or "posted" in txt:
                    log.info("Tweet posted successfully"); ctx.close(); return True
                elif "automated" in txt or "error" in txt:
                    log.error("X rejected: %s", toast.inner_text().strip()); ctx.close(); return False

            if "compose" not in page.url.lower():
                log.info("Tweet posted (navigated away)"); ctx.close(); return True
            log.info("Tweet likely posted"); ctx.close(); return True
        except Exception as e:
            log.error("Failed: %s", e); ctx.close(); return False


def show_status(conn):
    total = get_post_count(conn)
    promos = conn.execute("SELECT COUNT(*) c FROM posted_tweets WHERE is_promo = 1").fetchone()["c"]
    cats = conn.execute("SELECT category, COUNT(*) c FROM posted_tweets GROUP BY category ORDER BY c DESC").fetchall()
    print(f"\n{'='*45}\n  AskAIRight Twitter Dashboard\n  {datetime.now(TZ).strftime('%Y-%m-%d %I:%M %p ET')}\n{'='*45}")
    print(f"\n  Total tweets: {total}\n  Promos: {promos}\n  Next promo in: {5 - (total % 5)} tweets\n\n  By category:")
    for row in cats: print(f"    {row['category']:15s} {row['c']:>4}")
    print()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--count", type=int, default=1)
    parser.add_argument("--status", action="store_true")
    args = parser.parse_args()

    conn = get_db()
    if args.status: show_status(conn); conn.close(); return

    posted_hashes = get_posted_hashes(conn)
    posted = 0
    for i in range(args.count):
        promo = is_promo(conn)
        tweet, category, content_hash = generate_tweet(posted_hashes, promo=promo)
        label = " [PROMO]" if promo else ""
        log.info("Tweet #%d%s (%s, %d chars):", i + 1, label, category, len(tweet))

        if args.dry_run:
            print(f"\n--- Tweet {i+1}{label} ({len(tweet)} chars) ---\n{tweet}\n---")
            posted_hashes.add(content_hash); continue

        if post_tweet(tweet):
            now = datetime.now(TZ).isoformat()
            conn.execute("INSERT INTO posted_tweets (content_hash, category, tweet_preview, posted_at, is_promo) VALUES (?,?,?,?,?)",
                (content_hash, category, tweet[:100], now, 1 if promo else 0))
            conn.commit(); posted_hashes.add(content_hash); posted += 1
            log.info("Recorded (total: %d)", get_post_count(conn))
            if i < args.count - 1: time.sleep(random.randint(60, 120))
        else:
            log.error("Stopping due to post failure"); break

    if args.dry_run: log.info("Dry run: %d previewed.", args.count)
    else: log.info("Done. %d/%d posted.", posted, args.count)
    conn.close()

if __name__ == "__main__":
    main()
