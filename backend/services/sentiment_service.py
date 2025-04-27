import aiohttp
import asyncio
import statistics
from typing import List, Dict, Any
from fastapi import HTTPException
from models.schemas import ReviewSentiment
from config import settings

async def analyze_sentiment(session: aiohttp.ClientSession, review_text: str) -> float:
    """Analyze sentiment of a review using Google Gemini"""
    API_KEY = settings.GEMINI_API_KEY
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key not found")
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={API_KEY}"
    
    prompt = f"""
    Analyze the sentiment of the following review and return a single number between 0 and 1, 
    where 0 is extremely negative, 0.5 is neutral, and 1 is extremely positive.
    
    Review: "{review_text}"
    
    Return only the number, nothing else.
    """
    
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }
    
    try:
        async with session.post(url, json=payload) as response:
            if response.status != 200:
                error_text = await response.text()
                raise HTTPException(status_code=500, detail=f"Error from Gemini API: {error_text}")
            
            data = await response.json()
            text_response = data["candidates"][0]["content"]["parts"][0]["text"].strip()
            
            # Extract the number from the response
            try:
                sentiment_score = float(text_response)
                return sentiment_score
            except ValueError:
                # If the model didn't return just a number, try to extract it
                import re
                number_match = re.search(r'(\d+\.\d+|\d+)', text_response)
                if number_match:
                    return float(number_match.group(1))
                else:
                    return 0.5  # Default to neutral if we can't parse a number
    except Exception as e:
        print(f"Error analyzing sentiment: {str(e)}")
        return 0.5  # Default to neutral on error

async def analyze_reviews_batch(
    reviews: List[Dict[str, Any]], 
    batch_size: int = 5,
    batch_delay: float = 1.0
) -> List[ReviewSentiment]:
    """Analyze reviews in batches with rate limiting"""
    results = []
    
    # Process reviews in batches to avoid overwhelming the API
    for i in range(0, len(reviews), batch_size):
        batch = reviews[i:i+batch_size]
        
        async with aiohttp.ClientSession() as session:
            tasks = []
            for review in batch:
                task = asyncio.create_task(analyze_sentiment(session, review['content']))
                tasks.append((review, task))
            
            for review, task in tasks:
                sentiment_score = await task
                results.append(ReviewSentiment(
                    review_text=review['content'],
                    sentiment_score=sentiment_score
                ))
        
        # Add a small delay between batches to respect rate limits
        if i + batch_size < len(reviews):
            await asyncio.sleep(batch_delay)
    
    return results

def calculate_average_sentiment(reviews: List[ReviewSentiment]) -> float:
    """Calculate average sentiment score"""
    sentiment_scores = [review.sentiment_score for review in reviews]
    return statistics.mean(sentiment_scores) if sentiment_scores else 0
