import os
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Prompting Guide", docs_url=None, redoc_url=None)

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

        # Fallback to root index.html (SPA routing)
        root_index = STATIC_DIR / "index.html"
        if root_index.is_file():
            return FileResponse(root_index)

        return HTMLResponse("<h1>Not Found</h1>", status_code=404)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8080")))
