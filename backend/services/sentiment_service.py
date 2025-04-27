import asyncio
from typing import List, Dict, Any
from transformers import pipeline
from aiolimiter import AsyncLimiter

_sentiment = pipeline("sentiment-analysis")

MAX_CONCURRENT_WORKERS = 5                # max simultaneous model inferences
RATE_LIMIT_CALLS = 10                     # max calls per time period
RATE_LIMIT_PERIOD = 1.0                   # seconds

_semaphore = asyncio.Semaphore(MAX_CONCURRENT_WORKERS)
_rate_limiter = AsyncLimiter(RATE_LIMIT_CALLS, RATE_LIMIT_PERIOD)

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

async def analyze_reviews_concurrent(
    reviews: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Analyze a list of reviews concurrently with rate limiting.
    """
    tasks = [asyncio.create_task(_analyze_single(r.get("content", ""))) for r in reviews]
    analyzed = await asyncio.gather(*tasks)
    return analyzed


def calculate_average_sentiment(analyzed_reviews: List[Dict[str, Any]]) -> float:
    if not analyzed_reviews:
        return 0.0
    return sum(r["sentiment_score"] for r in analyzed_reviews) / len(analyzed_reviews)
