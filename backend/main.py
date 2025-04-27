from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google_play_scraper
from google_play_scraper.features.reviews import Sort, reviews_all
import asyncio
import aiohttp
import os
from typing import List, Dict, Any
import statistics
from dotenv import load_dotenv

load_dotenv()

import uvicorn
from app import create_app
from config import settings

app = create_app()

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
