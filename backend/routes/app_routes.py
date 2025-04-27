from fastapi import APIRouter, HTTPException
from models.schemas import AppRequest, AnalysisResponse
from services import play_store_service, sentiment_service
from config import settings

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_app_reviews(request: AppRequest):
    try:
        # Get app ID from name
        app_id = await play_store_service.get_app_id(request.appName)
        
        # Get reviews
        reviews = await play_store_service.get_app_reviews(
            app_id, 
            count=settings.DEFAULT_REVIEWS_COUNT
        )
        
        if not reviews:
            raise HTTPException(status_code=404, detail="No reviews found for this app")
        
        # Analyze sentiment of reviews
        analyzed_reviews = await sentiment_service.analyze_reviews_batch(
            reviews,
            batch_size=settings.BATCH_SIZE,
            batch_delay=settings.BATCH_DELAY
        )
        
        # Calculate average sentiment
        average_sentiment = sentiment_service.calculate_average_sentiment(analyzed_reviews)
        
        # Return sample of 5 reviews for display purposes
        sample_reviews = analyzed_reviews[:5]
        
        return AnalysisResponse(
            average_sentiment=average_sentiment,
            reviews_analyzed=len(analyzed_reviews),
            sample_reviews=sample_reviews
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/search-apps/{query}")
async def search_app_names(query: str):
    if len(query) < 2:
        return []
    
    try:
        return await play_store_service.search_apps(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching apps: {str(e)}")

#home route for testing
@router.get("/")
async def home():
    return {"message": "Play Store Analyzer API is running"}


