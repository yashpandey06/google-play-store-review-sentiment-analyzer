from fastapi import APIRouter, HTTPException
from models.schemas import AppRequest, AnalysisResponse, AppInfo
from services import play_store_service, sentiment_service
from config import settings
from datetime import datetime, timedelta

router = APIRouter()

_ANALYZE_CACHE: dict[str, tuple[datetime, AnalysisResponse]] = {}
_CACHE_TTL = timedelta(minutes=3)

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_app_reviews(request: AppRequest):
    now = datetime.utcnow()
    cached = _ANALYZE_CACHE.get(request.appName)
    if cached:
        ts, resp = cached
        if now - ts < _CACHE_TTL:
            return resp  

    try:
        app_id = await play_store_service.get_app_id(request.appName)

        reviews = await play_store_service.get_app_reviews(
            app_id,
            count=settings.DEFAULT_REVIEWS_COUNT
        )
        if not reviews:
            raise HTTPException(status_code=404, detail="No reviews found for this app")

        analyzed = await sentiment_service.analyze_reviews_batch(
            reviews,
            batch_size=settings.BATCH_SIZE,
            batch_delay=settings.BATCH_DELAY
        )

        avg = sentiment_service.calculate_average_sentiment(analyzed)

        response = AnalysisResponse(
            average_sentiment=avg,
            reviews_analyzed=len(analyzed),
            sample_reviews=analyzed[:5]
        )

        _ANALYZE_CACHE[request.appName] = (now, response)

        return response

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")


@router.get("/search-apps/{query}", response_model=list[AppInfo])
async def search_app_names(query: str):
    if len(query) < 2:
        return []
    try:
        return await play_store_service.search_apps(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching apps: {e}")


@router.get("/")
async def home():
    return {"message": "Play Store Analyzer API is running"}
