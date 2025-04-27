from pydantic import BaseModel
from typing import List, Optional

class AppRequest(BaseModel):
    appName: str

class ReviewSentiment(BaseModel):
    review_text: str
    sentiment_score: float

class AnalysisResponse(BaseModel):
    average_sentiment: float
    reviews_analyzed: int
    sample_reviews: List[ReviewSentiment] = []

class AppInfo(BaseModel):
    appId: str
    title: str
