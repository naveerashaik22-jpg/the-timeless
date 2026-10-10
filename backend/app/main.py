import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .api import (
    chat,
    menu,
    recommend,
    faq,
    orders,
    zones,
    custom_kitchen,
    books,
    retro,
    echo,
    tranquil,
    tiny_tales,
    user_memories,
    auth
)

load_dotenv()

app = FastAPI(
    title="THE AVES API",
    description="Immersive Vintage Experiential Platform & AI Companion Engine for THE AVES",
    version="2.0.0"
)

# Configurable CORS for dev and production deployment
cors_origins_env = os.getenv("CORS_ORIGINS", "")
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]
if cors_origins_env:
    for o in cors_origins_env.split(","):
        cleaned = o.strip()
        if cleaned and cleaned not in allowed_origins:
            allowed_origins.append(cleaned)

# Origin regex to allow localhost + preview/production deployments (Vercel, Netlify, Render, Cloud Run)
cors_regex = os.getenv(
    "CORS_ORIGIN_REGEX",
    r"https?://(localhost|127\.0\.0\.1|.*\.vercel\.app|.*\.netlify\.app|.*\.onrender\.com)(:\d+)?"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=cors_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include All Routers for the 6 Divisions & Features
app.include_router(chat.router)
app.include_router(menu.router)
app.include_router(recommend.router)
app.include_router(faq.router)
app.include_router(orders.router)
app.include_router(zones.router)
app.include_router(custom_kitchen.router)
app.include_router(books.router)
app.include_router(retro.router)
app.include_router(echo.router)
app.include_router(tranquil.router)
app.include_router(tiny_tales.router)
app.include_router(user_memories.router)
app.include_router(auth.router)

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "platform": "THE AVES",
        "tagline": "Where every moment becomes a story.",
        "divisions": [
            "01. THE TIMELESS (TASTE)",
            "02. INK & EMBER (IMAGINE)",
            "03. THE TRANQUIL NOOK (REFLECT)",
            "04. RETRO (REMEMBER)",
            "05. TINY TALES (CREATE)",
            "06. ECHO BOOTH (CONNECT)"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
