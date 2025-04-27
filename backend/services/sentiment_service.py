import asyncio
from typing import List, Dict, Any
from transformers import pipeline

_sentiment = pipeline("sentiment-analysis")

async def analyze_reviews_batch(
    reviews: List[Dict[str, Any]],
    batch_size: int = 10,
    batch_delay: float = 1.0
) -> List[Dict[str, Any]]:
    analyzed: List[Dict[str, Any]] = []
    for i in range(0, len(reviews), batch_size):
        batch = reviews[i : i + batch_size]
        texts = [r.get("content", "") for r in batch]

        results = await asyncio.to_thread(_sentiment, texts)

        for review, res in zip(batch, results):
            label = res.get("label", "").upper()
            score = res.get("score", 0.0)
            sentiment_score = score if label == "POSITIVE" else -score
            analyzed.append({
                "review_text": review.get("content", ""),
                "sentiment_score": sentiment_score
            })

        if i + batch_size < len(reviews):
            await asyncio.sleep(batch_delay)

    return analyzed

def calculate_average_sentiment(analyzed_reviews: List[Dict[str, Any]]) -> float:
    if not analyzed_reviews:
        return 0.0
    return sum(r["sentiment_score"] for r in analyzed_reviews) / len(analyzed_reviews)
