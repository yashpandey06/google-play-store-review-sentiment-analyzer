from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routes import app_routes

def create_app() -> FastAPI:
    app = FastAPI(
        title="Google Play Store Review Sentiment Analyzer",
        description="API for analyzing sentiment of Google Play Store reviews",
        version="1.0.0"
    )
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    app.include_router(app_routes.router)
    
    return app
