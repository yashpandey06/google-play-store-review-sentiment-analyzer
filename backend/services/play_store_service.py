from fastapi import HTTPException
from google_play_scraper import search
from google_play_scraper.features.reviews import Sort, reviews_all
from typing import List, Dict, Any
from models.schemas import AppInfo

async def search_apps(query: str) -> List[AppInfo]:
    """Search for apps by name"""
    try:
        results = search(query)
        return [AppInfo(appId=app["appId"], title=app["title"]) for app in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching apps: {str(e)}")

async def get_app_id(app_name: str) -> str:
    """Get app ID from name"""
    search_results = await search_apps(app_name)
    if not search_results:
        raise HTTPException(status_code=404, detail=f"No apps found with name: {app_name}")
    
    # Return the app ID of the first result
    return search_results[0].appId

async def get_app_reviews(app_id: str, count: int = 100) -> List[Dict[str, Any]]:
    """Get reviews for an app"""
    try:
        result, continuation_token = reviews_all(
            app_id,
            lang='en',
            country='us',
            sort=Sort.NEWEST,
            count=count
        )
        return result[:count]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching reviews: {str(e)}")
