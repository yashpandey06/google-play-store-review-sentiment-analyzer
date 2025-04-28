import asyncio
import logging
from typing import List, Dict, Any
from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException
from transformers import pipeline
from aiolimiter import AsyncLimiter

from models.schemas import AppRequest, AnalysisResponse, AppInfo
from services import play_store_service
from services.sentiment_service import analyze_reviews_concurrent, calculate_average_sentiment
from config import settings

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Sentiment pipeline
_sentiment = pipeline("sentiment-analysis")

# Concurrency and rate limiting
MAX_CONCURRENT_WORKERS = 5                # max simultaneous model inferences
RATE_LIMIT_CALLS = 10                     # max calls per time period
RATE_LIMIT_PERIOD = 1.0                   # seconds

_semaphore = asyncio.Semaphore(MAX_CONCURRENT_WORKERS)
_rate_limiter = AsyncLimiter(RATE_LIMIT_CALLS, RATE_LIMIT_PERIOD)

# In-memory cache for results
def _cache_info():
    return f"Cache TTL={_CACHE_TTL}, current size={len(_ANALYZE_CACHE)}"

_ANALYZE_CACHE: dict[str, tuple[datetime, AnalysisResponse]] = {}
_CACHE_TTL = timedelta(minutes=3)

router = APIRouter()

async def _analyze_single(text: str) -> Dict[str, Any]:
    """
    Analyze a single review text under concurrency and rate limits.
    """
    async with _semaphore:
        async with _rate_limiter:
            result = await asyncio.to_thread(_sentiment, [text])
    res = result[0]
    label = res.get("label", "").upper()
    score = res.get("score", 0.0)
    sentiment_score = score if label == "POSITIVE" else -score
    return {"review_text": text, "sentiment_score": sentiment_score}

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_app_reviews(request: AppRequest):
    logger.info(f"Received analyze request for appName={request.appName}")
    now = datetime.utcnow()

    # Check cache
    cached = _ANALYZE_CACHE.get(request.appName)
    if cached:
        ts, resp = cached
        if now - ts < _CACHE_TTL:
            logger.info(f"Cache hit for appName={request.appName} at {ts.isoformat()}; {_cache_info()}")
            return resp
        else:
            logger.info(f"Cache expired for appName={request.appName} (cached at {ts.isoformat()}); {_cache_info()}")

    try:
        # Get app ID
        logger.info(f"Fetching app ID for appName={request.appName}")
        app_id = await play_store_service.get_app_id(request.appName)
        logger.info(f"Fetched app_id={app_id} for appName={request.appName}")

        # Fetch reviews
        logger.info(f"Fetching up to {settings.DEFAULT_REVIEWS_COUNT} reviews for app_id={app_id}")
        reviews = await play_store_service.get_app_reviews(
            app_id,
            count=settings.DEFAULT_REVIEWS_COUNT
        )
        if not reviews:
            logger.warning(f"No reviews found for app_id={app_id} (appName={request.appName})")
            raise HTTPException(status_code=404, detail="No reviews found for this app")

        logger.info(f"Fetched {len(reviews)} reviews for app_id={app_id}")

        # Analyze reviews concurrently
        analyzed = await analyze_reviews_concurrent(reviews)
        avg = calculate_average_sentiment(analyzed)
        logger.info(f"Analyzed {len(analyzed)} reviews for appName={request.appName}, average_sentiment={avg:.4f}")

        # Prepare response
        response = AnalysisResponse(
            average_sentiment=avg,
            reviews_analyzed=len(analyzed),
            sample_reviews=analyzed[:5]
        )

        # Cache the response
        _ANALYZE_CACHE[request.appName] = (now, response)
        logger.info(f"Cached response for appName={request.appName} at {now.isoformat()}; {_cache_info()}")

        return response

    except HTTPException as http_exc:
        logger.error(f"HTTPException during analysis: {http_exc.detail}")
        raise
    except Exception as e:
        logger.exception(f"Unexpected error analyzing reviews for appName={request.appName}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

@router.get("/search-apps/{query}", response_model=List[AppInfo])
async def search_app_names(query: str):
    logger.info(f"Received search-apps request for query='{query}'")
    if len(query) < 2:
        logger.info("Query length less than 2; returning empty list")
        return []
    try:
        results = await play_store_service.search_apps(query)
        logger.info(f"Found {len(results)} apps for query='{query}'")
        return results
    except Exception as e:
        logger.exception(f"Error searching apps for query='{query}'")
        raise HTTPException(status_code=500, detail=f"Error searching apps: {e}")

@router.get("/")
async def home():
    logger.info("Health check endpoint called")
    return {"message": "Play Store Analyzer API is running"}
